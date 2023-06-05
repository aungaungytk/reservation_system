<?php

namespace App\Services\User;

interface UserServiceInterface
{

    public function store($data);
    public function update($data, $id);
    public function destroy($id);
    public function passwordChange($data, $id);
}
