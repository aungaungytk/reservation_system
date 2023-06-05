<?php

namespace App\Services\User;

use App\Mail\PasswordChange;
use App\Mail\WelcomeEmail;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class UserService implements UserServiceInterface
{

    public function store($data)
    {
        // return User::create($data);
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'employee_id' => $data['employee_id'],
            'phone' => $data['phone'],
            'password' => Hash::make($data['password']),
            'status' => $data['status'],
            'team_id' => $data['team_id'],
        ]);

        $user->assignRole($data['role_id']);

        return $user;
    }

    public function update($data, $id)
    {

        $result = User::where('id', $id)->first();
        $result->syncRoles($data['role_id']);
        if ($data['status'] == 1) {
            Mail::to($result->email)->send(new WelcomeEmail($result));
        }

        return $result->update($data);
    }

    public function destroy($id)
    {

        $data = User::where('id', $id)->first();
        $roles = $data->getRoleNames();

        foreach ($roles as $role) {
            $data->removeRole($role);
        }

        $data->save();
        return $data->delete();
    }
    public function passwordChange($data, $id)
    {
        $result = User::where('id', $id)->first();
        $plainPassword = $data['password'];
        $data['password'] = Hash::make($data['password']);
        Mail::to($result->email)->send(new PasswordChange($result, $plainPassword));

        return $result->update($data);
    }
}
