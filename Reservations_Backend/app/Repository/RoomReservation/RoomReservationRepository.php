<?php

namespace App\Repository\RoomReservation;

use App\Models\Team;
use App\Models\User;
use App\Models\Reservation;
use App\Models\RoomReservation;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class RoomReservationRepository implements RoomReservationRepoInterface
{
    public function get()
    {
        return RoomReservation::with(['user', 'room'])->get();
    }
    public function show($id)
    {
        return RoomReservation::where('id', $id)->first();
    }
    public function searchByDate($date)
    {
        return  RoomReservation::with(['room', 'user'])->where('date', $date)->get();
    }

    public function searchByUserAndDate($user_id, $date)
    {
        return RoomReservation::with(['room', 'user'])->where('user_id', $user_id)->where('date', $date)->get();
    }

    public function getRoomReserveCount()
    {
        return RoomReservation::count();
    }

    public function getRoomReserveCountByTeam()
    {
        $teamRoomReservations = Team::select('teams.id', 'teams.name', DB::raw('COUNT(room_reservations.id) as reservation_count'))
            ->leftJoin('users', 'users.team_id', '=', 'teams.id')
            ->leftJoin('room_reservations', 'room_reservations.user_id', '=', 'users.id')
            ->groupBy('teams.id', 'teams.name')
            ->get();

        return $teamRoomReservations;
    }

    public function getRoomReserveCountById($id)
    {
        $data = count(RoomReservation::where('user_id', $id)->get());
        return $data;
    }
    public function getRoomReservationCountByMonth()
    {
        $currentYear = date('Y');
        $results = DB::table('room_reservations')
            ->select(DB::raw('DATE_FORMAT(date, "%m") as month'), DB::raw('COUNT(*) as count'))
            ->whereYear('date', $currentYear)
            ->groupBy('month')
            ->get();
        return $results;
    }
}
