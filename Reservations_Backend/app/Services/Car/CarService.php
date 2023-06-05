<?php

namespace App\Services\Car;

use App\Models\Car;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;


class CarService implements CarServiceInterface
{
    public function store($data)
    {
        return Car::create($data);
    }
    public function update($data, $id)
    {
        $car = Car::where('id', $id)->first();

        return $car->update($data);
    }
    public function delete($id)
    {
        $car = Car::where('id', $id)->first();
        return $car->delete();
    }
}
