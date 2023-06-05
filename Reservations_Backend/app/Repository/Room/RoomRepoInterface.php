<?php

namespace App\Repository\Room;

interface RoomRepoInterface
{
    public function get();
    public function show($id);
    public function getRoomCount();
}
