<?php

namespace App\Repository\Role;
use Spatie\Permission\Models\Role;

class RoleRepository implements RoleRepoInterface{

    public function get() {
        $data = Role::all();
        return $data;
    }

    public function show($id) {
        $data = Role::where('id', $id)->first();
        return $data;
    }
}
