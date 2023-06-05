<?php

namespace App\Services\Team;

use App\Models\Team;
use App\Models\User;

class TeamService implements TeamServiceInterface
{

    public function store($data)
    {

        return Team::create($data);
    }

    public function update($data, $id)
    {

        $result = Team::where('id', $id)->first();
        return $result->update($data);
    }

    public function destroy($id)
    {

        $data = Team::where('id', $id)->first();
        $user = $data->users;
        foreach ($user as $row) {
            $del = $row->id;
            $user = User::find($del)->first();
            $user->delete();
        }
        $data->delete();
        return $data;
    }
}
