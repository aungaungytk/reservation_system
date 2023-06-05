<?php

namespace App\Repository\Team;
use App\Models\Team;

class TeamRepository implements TeamRepoInterface{

    public function get() {
        $data = Team::all();
        return $data;
    }

    public function show($id) {
        $data = Team::where('id', $id)->first();
        return $data;
    }
}
