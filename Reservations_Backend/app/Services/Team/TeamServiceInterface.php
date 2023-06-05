<?php

namespace App\Services\Team;

interface TeamServiceInterface{

    public function store($data);
    public function update($data, $id);
    public function destroy($id);

}
