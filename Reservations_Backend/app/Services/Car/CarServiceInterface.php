<?php

namespace App\Services\Car;

interface CarServiceInterface
{
    public function store($data);
    public function update($data, $id);
    public function delete($id);
}
