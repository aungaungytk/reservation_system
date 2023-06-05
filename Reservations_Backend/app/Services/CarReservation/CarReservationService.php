<?php

namespace App\Services\CarReservation;

use App\Mail\CarReservationApprove;
use App\Models\CarReservation;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;


class CarReservationService implements CarReservationServiceInterface
{
    public function store($data)
    {
        $currentDateTime = Carbon::now();
        $inputDate = Carbon::parse($data['date']);
        $inputTime = Carbon::parse($data['start_time']);
        $currentTime = Carbon::now();
        $currentTime->setTimezone('Asia/Yangon');
        $formattedTime = $currentTime->format('H:i:s');
        $formattedInput = $inputTime->format('H:i:s');

        $car = CarReservation::with('car')->where('car_id', $data['car_id'])->get();

        if ($inputDate > $currentDateTime || $formattedInput >= $formattedTime) {
            if ($data['start_time'] < $data['end_time']) {
                if ($data['car_id'] != null && isset($data['car_id'])) {
                    if ($data['no_of_traveller'] <= $car[0]->car->capacity) {
                        $inputCar = $data['car_id'];

                        $existingReservation = CarReservation::all();
                        $inputStartTime = $data['start_time'];
                        $inputEndTime = $data['end_time'];
                        foreach ($existingReservation as $reservation) {
                            $overlap = $this->checkCarReservationOverlap($inputStartTime, $inputEndTime, $inputDate, $inputCar);
                            if ($overlap) {
                                return "overlap";
                            }
                        }
                        return CarReservation::create($data);
                    } else {
                        return "capacityError";
                    }
                }
            } else {
                return "endTimeError";
            }
        } else {
            return "errorDate";
        }
    }
    public function checkCarReservationOverlap($inputStartTime, $inputEndTime, $inputDate, $inputCar)
    {
        $overlap = CarReservation::where('car_id', $inputCar)->where('date', '=', $inputDate)->where(function ($query) use ($inputStartTime, $inputEndTime) {
            $query->where(function ($query) use ($inputStartTime, $inputEndTime) {
                $query->where('start_time', '>=', $inputEndTime)
                    ->where('end_time', '<=', $inputStartTime);
            })
                ->orWhere(function ($query) use ($inputStartTime, $inputEndTime) {
                    $query->where('start_time', '<', $inputStartTime)
                        ->where('end_time', '>', $inputEndTime);
                })
                ->orWhere(function ($query) use ($inputStartTime, $inputEndTime) {
                    $query->where('start_time', '>', $inputStartTime)
                        ->where('end_time', '<', $inputEndTime);
                })
                ->orWhere(function ($query) use ($inputStartTime, $inputEndTime) {
                    $query->where('start_time', '<', $inputStartTime)
                        ->where('end_time', '=', $inputEndTime);
                })
                ->orWhere(function ($query) use ($inputStartTime, $inputEndTime) {
                    $query->where('start_time', '>', $inputStartTime)
                        ->where('start_time', '<', $inputEndTime);
                })
                ->orWhere(function ($query) use ($inputStartTime, $inputEndTime) {
                    $query->where('start_time', '=', $inputStartTime)
                        ->where('start_time', '<=', $inputEndTime);
                })
                ->orWhere(function ($query) use ($inputStartTime, $inputEndTime) {
                    $query->where('end_time', '>', $inputStartTime)
                        ->where('end_time', '<', $inputEndTime);
                })
                ->orWhere(function ($query) use ($inputStartTime, $inputEndTime) {
                    $query->where('end_time', '>=', $inputStartTime)
                        ->where('end_time', '=', $inputEndTime);
                });
        })->exists();
        return $overlap;
    }
    public function update($data, $id)
    {
        $currentDateTime = Carbon::now();
        $inputDate = Carbon::parse($data['date']);

        if ($inputDate < $currentDateTime) {
            return "Please select the date greater than current date.";
        }
        $inputCarId = $data['car_id'];
        $existingReservation = CarReservation::where('car_id', $inputCarId)
            ->where('date', $inputDate)
            ->where('status', 1)
            ->first();

        if ($existingReservation) {
            return "Unable to make reservation within this time.";
            exit();
        }
        $carReservation = CarReservation::where('id', $id)->first();
        if($data['status']== 1){
            Mail::to($carReservation->email)->send(new CarReservationApprove($carReservation));
        }
        return $carReservation->update($data);
    }
    public function delete($id)
    {
        return CarReservation::where('id', $id)->delete();
    }
}
