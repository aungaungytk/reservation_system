<?php

namespace App\Services\CarReservation;

use App\Mail\CarApprovedEmail;
use App\Mail\CarReservationApprove;
use App\Models\CarReservation;
use App\Models\Car;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

use function PHPSTORM_META\map;

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

        $cars = Car::get();

        if ($inputDate > $currentDateTime || $formattedInput >= $formattedTime) {
            if ($data['start_time'] < $data['end_time']) {
                if ($data['car_id'] != null && isset($data['car_id'])) {
                    foreach ($cars as $car) {
                        if ($car['id'] == $data['car_id']) {
                            if ($data['no_of_traveller'] <= $car['capacity']) {
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
        $carReservation = CarReservation::with('user')->where('id', $id)->first();
        $user = $carReservation->user;

        if ($data['status'] == 1) {
            Mail::to($user->email)->send(new CarReservationApprove($user));
        }
        return $carReservation->update($data);
    }

    public function delete($id)
    {
        $user = Auth::user();
        $user_id = $user['id'];
        return CarReservation::where('id', $id)->where('user_id', $user_id)->delete();
    }
}
