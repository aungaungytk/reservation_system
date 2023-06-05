<?php

namespace App\Services\CarReservation;

interface CarReservationServiceInterface
{
    public function store($data);
    public function update($data, $id);
    public function delete($id);
}
