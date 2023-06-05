<?php

namespace App\Services\RoomReservation;

interface RoomReservationServiceInterface
{
    public function store($data);
    public function update($data, $id);
    public function delete($id);
}
