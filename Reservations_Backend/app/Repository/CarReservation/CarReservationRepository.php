<?php

namespace App\Repository\CarReservation;

use App\Models\Team;
use App\Models\CarReservation;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class CarReservationRepository implements CarReservationRepoInterface
{
    public function get()
    {
        return CarReservation::with(['car', 'user'])
        ->orderByDesc('date')
        ->get();
    }
    public function show($id)
    {
        return CarReservation::where('id', $id)->get();
    }

    public function getCarReserveCount()
    {
        return CarReservation::count();
    }

    public function getCarReserveCountByTeam()
    {
        $teamCarReservations = Team::select('teams.id', 'teams.name', DB::raw('COUNT(car_reservations.id) as car_reservation_count'))
            ->leftJoin('users', 'users.team_id', '=', 'teams.id')
            ->leftJoin('car_reservations', 'car_reservations.user_id', '=', 'users.id')
            ->groupBy('teams.id', 'teams.name')
            ->get();

        return $teamCarReservations;
    }

    public function getCarReserveCountById($id)
    {
        $data = count(CarReservation::where('user_id', $id)->get());
        return $data;
    }
    public function getCarReservationCountByMonth()
    {
        $currentYear = date('Y');
        $results = DB::table('car_reservations')
            ->select(DB::raw('DATE_FORMAT(date, "%m") as month'), DB::raw('COUNT(*) as count'))
            ->whereYear('date', $currentYear)
            ->groupBy('month')
            ->get();
        return $results;
    }
    public function getCarReservationSearchByDate($date)
    {
        $currentDate = Carbon::now()->toDateString();
        $results = CarReservation::with(['car', 'user'])->where('date', $date)->get();
        return $results;
    }
}
