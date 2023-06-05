<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $superAdmin = Role::create(['name' => 'SuperAdmin']);
        $admin = Role::create(['name' => 'Admin']);
        $staff = Role::create(['name' => 'Staff']);

        $dashboard = Permission::create(['name' => 'dashboard']);
        $deleteUser = Permission::create(['name' => 'delete-user']);
        $deleteAdmin = Permission::create(['name' => 'delete-admin']);
        $updateUser = Permission::create(['name' => 'update-user']);
        $updateAdmin = Permission::create(['name' => 'update-admin']);
        $userList = Permission::create(['name' => 'user-list']);

        $teamDelete = Permission::create(['name' => 'team-delete']);
        $teamUpdate = Permission::create(['name' => 'team-update']);
        $teamCreate = Permission::create(['name' => 'team-create']);

        $roomDelete = Permission::create(['name' => 'room-delete']);
        $roomUpdate = Permission::create(['name' => 'room-update']);
        $roomCreate = Permission::create(['name' => 'room-create']);

        $carDelete = Permission::create(['name' => 'car-delete']);
        $carUpdate = Permission::create(['name' => 'car-update']);
        $carCreate = Permission::create(['name' => 'car-create']);

        $userStatus = Permission::create(['name' => 'user-status']);
        $adminStatus = Permission::create(['name' => 'admin-status']);

        $carReserveApprove = Permission::create(['name' => 'car-reserve-approve']);

        $superAdmin->givePermissionTo([$dashboard, $deleteAdmin, $userList, $teamDelete, $teamUpdate, $teamCreate, $roomDelete, $roomUpdate, $roomCreate, $carDelete, $carUpdate, $carCreate, $carReserveApprove, $updateAdmin, $updateUser, $adminStatus, $userStatus]);
        $admin->givePermissionTo([$dashboard, $deleteUser, $userList, $teamDelete, $teamUpdate, $teamCreate, $roomDelete, $roomUpdate, $roomCreate, $carDelete, $carUpdate, $carCreate, $carReserveApprove, $updateUser, $userStatus]);
        $staff->givePermissionTo([$dashboard]);
    }
}
