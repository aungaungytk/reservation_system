<?php

namespace App\Providers;
use App\Services\Car\CarService;

use App\Services\Role\RoleService;
use App\Services\Room\RoomService;
use App\Services\Team\TeamService;
use App\Services\User\UserService;
use App\Repository\Car\CarRepository;
use App\Repository\Role\RoleRepository;
use App\Repository\Room\RoomRepository;
use App\Repository\Team\TeamRepository;
use App\Repository\User\UserRepository;
use Illuminate\Support\ServiceProvider;
use App\Repository\Car\CarRepoInterface;
use App\Services\Car\CarServiceInterface;
use App\Repository\Role\RoleRepoInterface;
use App\Repository\Room\RoomRepoInterface;
use App\Repository\Team\TeamRepoInterface;
use App\Repository\User\UserRepoInterface;
use App\Services\Role\RoleServiceInterface;
use App\Services\Room\RoomServiceInterface;
use App\Services\Team\TeamServiceInterface;
use App\Services\User\UserServiceInterface;
use App\Services\CarReservation\CarReservationService;
use App\Services\RoomReservation\RoomReservationService;
use App\Repository\CarReservation\CarReservationRepository;
use App\Repository\RoomReservation\RoomReservationRepository;
use App\Repository\CarReservation\CarReservationRepoInterface;
use App\Services\CarReservation\CarReservationServiceInterface;
use App\Repository\RoomReservation\RoomReservationRepoInterface;
use App\Services\RoomReservation\RoomReservationServiceInterface;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {

        $this->app->bind(UserRepoInterface::class, UserRepository::class);
        $this->app->bind(UserServiceInterface::class, UserService::class);

        $this->app->bind(CarRepoInterface::class, CarRepository::class);
        $this->app->bind(CarServiceInterface::class, CarService::class);

        $this->app->bind(RoleRepoInterface::class, RoleRepository::class);
        $this->app->bind(RoleServiceInterface::class, RoleService::class);

        $this->app->bind(RoomRepoInterface::class, RoomRepository::class);
        $this->app->bind(RoomServiceInterface::class, RoomService::class);

        $this->app->bind(TeamRepoInterface::class, TeamRepository::class);
        $this->app->bind(TeamServiceInterface::class, TeamService::class);

        $this->app->bind(RoomReservationRepoInterface::class, RoomReservationRepository::class);
        $this->app->bind(RoomReservationServiceInterface::class, RoomReservationService::class);

        $this->app->bind(CarReservationRepoInterface::class, CarReservationRepository::class);
        $this->app->bind(CarReservationServiceInterface::class, CarReservationService::class);
    }
}
