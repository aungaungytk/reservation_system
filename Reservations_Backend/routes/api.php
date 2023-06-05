<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CarController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\RoomController;
use App\Http\Controllers\Api\TeamController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\CarReservationController;
use App\Http\Controllers\Api\RoomReservationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware(['cors'])->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::get('teams', [TeamController::class, 'index']);
});
Route::middleware(['cors', 'auth:sanctum'])->group(function () {
    Route::post('teams', [TeamController::class, 'store']);
    Route::patch('teams/{id}', [TeamController::class, 'update']);
    Route::delete('teams/{id}', [TeamController::class, 'destroy']);


    Route::apiResource('roles', RoleController::class);


    Route::patch('status_change/{id}', [UserController::class, 'statusChange']);

    Route::apiResource('users', UserController::class);
    Route::apiResource('rooms', RoomController::class);
    Route::apiResource('cars', CarController::class);
    Route::apiResource('car_reservation', CarReservationController::class);
    Route::apiResource('room_reservation', RoomReservationController::class);
    Route::get('pro_user', [UserController::class, 'getProUser']);
    Route::get('staff', [UserController::class, 'getStaff']);
    Route::post('room_reservation/searchByDate', [RoomReservationController::class, 'searchByDate'])->name('room_reservation.searchByDate');
    Route::get('room_reservation/searchByUserAndDate/{id}/{date}', [RoomReservationController::class, 'searchByUserAndDate'])->name('room_reservation.searchByUserAndDate');
    Route::get('car_count', [CarController::class, 'getCarCount']);
    Route::get('room_count', [RoomController::class, 'getRoomCount']);
    Route::get('car_reserve_count', [CarReservationController::class, 'getCarReserveCount']);
    Route::get('room_reserve_count', [RoomReservationController::class, 'getRoomReserveCount']);
    Route::get('room_reserve_count_by_team', [RoomReservationController::class, 'getRoomReserveCountByTeam']);
    Route::get('car_reserve_count_by_team', [CarReservationController::class, 'getCarReserveCountByTeam']);
    Route::get('room_reserve_count_by_id/{id}', [RoomReservationController::class, 'getRoomReserveCountById']);
    Route::get('car_reserve_count_by_id/{id}', [CarReservationController::class, 'getCarReserveCountById']);
    Route::get('room_reserve_count_by_month', [RoomReservationController::class, 'getRoomReservationCountByMonth']);
    Route::get('car_reserve_count_by_month', [CarReservationController::class, 'getCarReservationCountByMonth']);
    Route::get('getCarReservationSearchByDate/{date}', [CarReservationController::class, 'getCarReservationSearchByDate']);
    Route::patch('password_change/{id}', [UserController::class, 'passwordChange']);
});
