<?php

namespace App\Services\Room;

use App\Models\Room;
use Illuminate\Support\Facades\Storage;

class RoomService implements RoomServiceInterface
{
    public function store($data)
    {
        return Room::create($data);
    }
    public function update($data, $id)
    {
        $room = Room::where('id', $id)->first();

        return $room->update($data);
    }
    public function delete($id)
    {
        $room = Room::where('id', $id)->first();
        return $room->delete();
    }
}
