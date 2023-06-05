<?php

namespace App\Repository\Car;

use App\Models\Car;

class CarRepository implements CarRepoInterface
{
    public function get()
    {
        return Car::all();
    }
    public function show($id)
    {
        $data = Car::where('id', $id)->first();
        return $data;
    }
    public function getCarCount()
    {
        $data = Car::count();
        return $data;
    }
}
