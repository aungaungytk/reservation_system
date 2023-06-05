<?php

namespace App\Repository\Car;

interface CarRepoInterface
{
    public function get();
    public function show($id);
    public function getCarCount();
}
