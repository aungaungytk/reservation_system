<?php

namespace App\Repository\CarReservation;

interface CarReservationRepoInterface
{
    public function get();
    public function show($id);
    public function getCarReserveCount();
    public function getCarReserveCountByTeam();
    public function getCarReserveCountById($id);
    public function getCarReservationCountByMonth();
    public function getCarReservationSearchByDate($date);
}
