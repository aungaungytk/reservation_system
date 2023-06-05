<?php

namespace App\Repository\Role;
use Spatie\Permission\Models\Role;


interface RoleRepoInterface {

    public function get();

    public function show($id);
}
