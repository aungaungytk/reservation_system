<?php

namespace App\Services\RoomReservation;

use App\Models\Room;
use App\Models\RoomReservation;
use Carbon\Carbon;


class RoomReservationService implements RoomReservationServiceInterface
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


        if ($inputDate > $currentDateTime ||  $formattedInput >= $formattedTime) {

            if ($data['start_time'] < $data['end_time']) {
                if ($data['room_id'] != null && isset($data['room_id'])) {

                    $reservations = RoomReservation::all();
                    $inputStartTime = $data['start_time'];
                    $inputEndTime = $data['end_time'];

                    $inputRoom = $data['room_id'];
                    if (!empty($reservations)) {

                        foreach ($reservations as $reservation) {
                            $overlap = $this->checkRoomReservationOverlap($inputStartTime, $inputEndTime, $inputDate, $inputRoom);

                            if ($overlap) {
                                return "overlap";
                            } else {

                                return $this->makeRoomReservation($data);
                            }
                        }
                    }
                    return $this->makeRoomReservation($data);
                }
            } else {
                return "endTimeError";
            }
        } else {
            return "errorDate";
        }
    }

    public function update($data, $id)
    {
        $result = RoomReservation::where('id', $id)->first();

        $currentDateTime = Carbon::now();
        $inputDate = Carbon::parse($data['date']);
        $inputTime = Carbon::parse($data['start_time']);
        $currentTime = Carbon::now();
        $currentTime->setTimezone('Asia/Yangon');
        $formattedTime = $currentTime->format('H:i:s');
        $formattedInput = $inputTime->format('H:i:s');


        if ($inputDate > $currentDateTime ||  $formattedInput >= $formattedTime) {
            $reservations = RoomReservation::all();
            $inputStartTime = $data['start_time'];
            $inputEndTime = $data['end_time'];

            $inputRoom = $data['room_id'];
            foreach ($reservations as $reservation) {

                $overlap = $this->checkRoomReservationUpdateOverlap($id, $inputStartTime, $inputEndTime, $inputDate, $inputRoom);

                if ($overlap) {
                    return "overlap";
                } else {
                    return $result->update([
                        'title' => $data['title'],
                        'description' => $data['description'],
                        'start_time' => $data['start_time'],
                        'end_time' => $data['end_time'],
                        'date' => $data['date'],
                        'user_id' => $data['user_id'],
                        'room_id' => $data['room_id'],
                    ]);
                }
            }
        } else {
            return "errorDate";
        }
    }

    public function delete($id)
    {
        $data = RoomReservation::where('id', $id)->first();
        return $data->delete();
    }


    public function makeRoomReservation($data)
    {
        return RoomReservation::create([
            'title' => $data['title'],
            'description' => $data['description'],
            'start_time' => $data['start_time'],
            'end_time' => $data['end_time'],
            'date' => $data['date'],
            'user_id' => $data['user_id'],
            'room_id' => $data['room_id'],
        ]);
    }
    public function checkRoomReservationOverlap($inputStartTime, $inputEndTime, $inputDate, $inputRoom)
    {
        $overlap = RoomReservation::where('room_id', $inputRoom)->where('date', '=', $inputDate)->where(function ($query) use ($inputStartTime, $inputEndTime) {
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
    public function checkRoomReservationUpdateOverlap($id, $inputStartTime, $inputEndTime, $inputDate, $inputRoom)
    {
        $overlap = RoomReservation::where('id', '<>', $id)->where('room_id', $inputRoom)->where('date', '=', $inputDate)->where(function ($query) use ($inputStartTime, $inputEndTime) {
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
}
