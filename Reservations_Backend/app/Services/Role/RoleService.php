<?php

namespace App\Services\Role;

use Spatie\Permission\Models\Role;

class RoleService implements RoleServiceInterface
{

    public function store($data)
    {

        return Role::create($data);
    }

    public function update($data, $id)
    {

        $result = Role::where('id', $id)->first();
        return $result->update($data);
    }

    public function destroy($id)
    {

        $data = Role::where('id', $id)->first();
        return $data->delete();
    }
}
