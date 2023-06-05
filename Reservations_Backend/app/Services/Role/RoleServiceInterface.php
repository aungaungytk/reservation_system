<?php

namespace App\Services\Role;

interface RoleServiceInterface{

    public function store($data);
    public function update($data, $id);
    public function destroy($id);

}
