<?php

namespace App\Services\Room;

interface RoomServiceInterface
{
    public function store($data);
    public function update($data, $id);
}
