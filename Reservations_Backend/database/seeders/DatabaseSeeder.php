<?php

namespace Database\Seeders;

use App\Models\Car;
use App\Models\CarReservation;
use App\Models\Room;
use App\Models\RoomReservation;
use App\Models\Team;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $this->call([
            RoleAndPermissionSeeder::class,
        ]);

        $this->call(AdminSeeder::class);

        $team1 = Team::create(
            [
                'name' => 'Team1',

            ]
        );
        $team2 = Team::create(
            [
                'name' => 'Team2',

            ]
        );
        $team3 = Team::create(
            [
                'name' => 'Team3',


            ]
        );
        $team4 = Team::create(
            [
                'name' => 'Team4',


            ]
        );
        $team5 = Team::create(
            [
                'name' => 'Team5',


            ]
        );
        $room1 = Room::create(
            [
                'name' => 'Infinity Room',
                'capacity' => 20,
                'amenities' => "Projector, WhiteBoard"

            ]
        );
        $room2 = Room::create(
            [
                'name' => 'Room 1',
                'capacity' => 5,
                'amenities' => "TV"

            ]
        );
        $room3 = Room::create(
            [
                'name' => 'Room 2',
                'capacity' => 5,
                'amenities' => "TV"

            ]
        );
        $room4 = Room::create(
            [
                'name' => 'Room 3',
                'capacity' => 5,
                'amenities' => "TV"

            ]
        );
        $room5 = Room::create(
            [
                'name' => 'Room 4',
                'capacity' => 5,
                'amenities' => "TV"

            ]
        );

        $roomReservation1 = RoomReservation::create(
            [
                'title' => 'Meeting One',
                'description' => 'Meeting Agenda One',
                'date' => '2023-05-28',
                'start_time' => '10:0:0',
                'end_time' => '11:0:0',
                'room_id' => 1,
                'user_id' => 3,
            ]
        );
        $roomReservation2 = RoomReservation::create(
            [
                'title' => 'Meeting Four',
                'description' => 'Meeting Agenda Four',
                'date' => '2023-05-28',
                'start_time' => '11:0:0',
                'end_time' => '12:0:0',
                'room_id' => 2,
                'user_id' => 4,
            ]
        );
        $roomReservation3 = RoomReservation::create(
            [
                'title' => 'Meeting Tow',
                'description' => 'Meeting Agenda Two ',
                'date' => '2023-06-01',
                'start_time' => '10:0:0',
                'end_time' => '11:0:0',
                'room_id' => 3,
                'user_id' => 5,
            ]
        );
        $roomReservation4 = RoomReservation::create(
            [
                'title' => 'Management Meeting',
                'description' => 'Meeting Agenda Two ',
                'date' => '2023-06-02',
                'start_time' => '10:0:0',
                'end_time' => '11:0:0',
                'room_id' => 3,
                'user_id' => 5,
            ]
        );
        $roomReservation4 = RoomReservation::create(
            [
                'title' => 'Weekly Meeting',
                'description' => 'Meeting Agenda Two ',
                'date' => '2023-06-03',
                'start_time' => '10:0:0',
                'end_time' => '11:0:0',
                'room_id' => 4,
                'user_id' => 4,
            ]
        );
        $roomReservation5 = RoomReservation::create(
            [
                'title' => 'Weekly Meeting',
                'description' => 'Weekly Meeting ',
                'date' => '2023-06-04',
                'start_time' => '14:0:0',
                'end_time' => '15:0:0',
                'room_id' => 4,
                'user_id' => 4,
            ]
        );
        $roomReservation6 = RoomReservation::create(
            [
                'title' => 'Knowledge Meeting',
                'description' => 'Knowledge Meeting ',
                'date' => '2023-06-05',
                'start_time' => '15:0:0',
                'end_time' => '16:0:0',
                'room_id' => 4,
                'user_id' => 3,
            ]
        );
        $roomReservation7 = RoomReservation::create(
            [
                'title' => 'Something Meeting',
                'description' => 'Something Meeting ',
                'date' => '2023-06-06',
                'start_time' => '9:0:0',
                'end_time' => '10:0:0',
                'room_id' => 1,
                'user_id' => 3,
            ]
        );
        $roomReservation7 = RoomReservation::create(
            [
                'title' => 'Project Meeting',
                'description' => 'Project Meeting ',
                'date' => '2023-06-06',
                'start_time' => '10:0:0',
                'end_time' => '11:0:0',
                'room_id' => 2,
                'user_id' => 4,
            ]
        );


        $car1 = Car::create(
            [
                'brand' => 'Toyota',
                'licence_no' => '4F-09522',
                'capacity' => 5,

            ]
        );
        $car2 = Car::create(
            [
                'brand' => 'Honda',
                'licence_no' => '4H-09022',
                'capacity' => 5,
            ]
        );
        $car3 = Car::create(
            [
                'brand' => 'KIA',
                'licence_no' => '4E-59512',
                'capacity' => 5,
            ]
        );
        $carReservation1 = CarReservation::create(
            [
                'title' => 'To Meet with Client One',
                'date' => '2023-05-28',
                'start_time' => '10:0:0',
                'end_time' => '11:0:0',
                'no_of_traveller' => 5,
                'destination' => 'Thingankyun',
                'car_id' => 1,
                'user_id' => 2,
            ]
        );
        $carReservation2 = CarReservation::create(
            [
                'title' => 'To Meet with Client Two',
                'date' => '2023-05-28',
                'start_time' => '10:0:0',
                'end_time' => '11:0:0',
                'no_of_traveller' => 5,
                'destination' => 'Kamayut',
                'car_id' => 2,
                'user_id' => 2,
            ]
        );
        $carReservation3 =  CarReservation::create(
            [
                'title' => 'To Meet with Client Three',
                'date' => '2023-05-28',
                'start_time' => '14:0:0',
                'end_time' => '17:0:0',
                'no_of_traveller' => 5,
                'destination' => 'Latha',
                'car_id' => 2,
                'user_id' => 2,
            ]
        );
        $carReservation4 =  CarReservation::create(
            [
                'title' => 'To Meet with Client Three',
                'date' => '2023-06-01',
                'start_time' => '9:0:0',
                'end_time' => '11:0:0',
                'no_of_traveller' => 5,
                'destination' => 'Latha',
                'car_id' => 3,
                'user_id' => 3,
            ]
        );
        $carReservation5 =  CarReservation::create(
            [
                'title' => 'To Meet with Client Three',
                'date' => '2023-06-02',
                'start_time' => '10:0:0',
                'end_time' => '12:0:0',
                'no_of_traveller' => 5,
                'destination' => 'Latha',
                'car_id' => 1,
                'user_id' => 4,
            ]
        );
        $carReservation6 =  CarReservation::create(
            [
                'title' => 'To Meet with Client Three',
                'date' => '2023-06-03',
                'start_time' => '12:0:0',
                'end_time' => '3:0:0',
                'no_of_traveller' => 5,
                'destination' => 'Latha',
                'car_id' => 2,
                'user_id' => 2,
            ]
        );
        $carReservation7 =  CarReservation::create(
            [
                'title' => 'To Meet with Client Three',
                'date' => '2023-06-03',
                'start_time' => '12:0:0',
                'end_time' => '2:0:0',
                'no_of_traveller' => 5,
                'destination' => 'Inno City',
                'car_id' => 3,
                'user_id' => 4,
            ]
        );
        $carReservation8 =  CarReservation::create(
            [
                'title' => 'To Meet with Client Three',
                'date' => '2023-06-04',
                'start_time' => '12:0:0',
                'end_time' => '2:0:0',
                'no_of_traveller' => 5,
                'destination' => 'Myanmar Plaza',
                'car_id' => 2,
                'user_id' => 5,
            ]
        );
        $carReservation9 =  CarReservation::create(
            [
                'title' => 'To Meet with Client Three',
                'date' => '2023-06-05',
                'start_time' => '12:0:0',
                'end_time' => '2:0:0',
                'no_of_traveller' => 5,
                'destination' => 'Time City',
                'car_id' => 1,
                'user_id' => 3,
            ]
        );
        $carReservation10 =  CarReservation::create(
            [
                'title' => 'To Meet with Client Three',
                'date' => '2023-06-05',
                'start_time' => '9:0:0',
                'end_time' => '11:0:0',
                'no_of_traveller' => 5,
                'destination' => 'Time City',
                'car_id' => 2,
                'user_id' => 4,
            ]
        );
        $carReservation11 =  CarReservation::create(
            [
                'title' => 'To Meet with Client Three',
                'date' => '2023-06-06',
                'start_time' => '12:0:0',
                'end_time' => '14:0:0',
                'no_of_traveller' => 5,
                'destination' => 'Novotel Yangon',
                'car_id' => 3,
                'user_id' => 5,
            ]
        );
        $carReservation12 =  CarReservation::create(
            [
                'title' => 'To Meet with Client Three',
                'date' => '2023-06-06',
                'start_time' => '15:0:0',
                'end_time' => '17:0:0',
                'no_of_traveller' => 5,
                'destination' => 'True Coffee Yangon',
                'car_id' => 2,
                'user_id' => 4,
            ]
        );
    }
}
