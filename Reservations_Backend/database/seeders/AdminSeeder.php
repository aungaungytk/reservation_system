<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $superAdmin = User::create(
            [
                'name' => 'superadmin',
                'email' => 'superadmin@gmail.com',
                'employee_id' => 'ACE-001',
                'password' => Hash::make('superadmin12345'),
                'phone' => '09777666888',
                'status' => '1',
                'team_id' => '1',
            ]
        );

        $admin = User::create(
            [
                'name' => 'admin',
                'email' => 'admin@gmail.com',
                'employee_id' => 'ACE-002',
                'password' => Hash::make('admin12345'),
                'phone' => '09777666887',
                'status' => '1',
                'team_id' => '1',
            ]
        );


        $staff = User::create(
            [
                'name' => 'staff',
                'email' => 'staff@gmail.com',
                'employee_id' => 'ACE-005',
                'password' => Hash::make('staff12345'),
                'phone' => '09777666777',
                'status' => '1',
                'team_id' => '2',
            ]
        );

        $staff1 = User::create(
            [
                'name' => 'Hnin Pwint Aung',
                'email' => 'hninpwintaung001@gmail.com',
                'employee_id' => '00156',
                'password' => Hash::make('hnin12345'),
                'phone' => '0973463240',
                'status' => '1',
                'team_id' => '3',
            ]
        );
        $staff2 = User::create(
            [
                'name' => 'Aye Thandar Aung',
                'email' => 'ayethandaraung129@gmail.com',
                'employee_id' => '00157',
                'password' => Hash::make('aye12345'),
                'phone' => '0974089300',
                'status' => '1',
                'team_id' => '4',
            ]
        );
        $staff3 = User::create(
            [
                'name' => 'Myat Phyoe Phyoe Ei',
                'email' => 'hydra5581@gmail.com',
                'employee_id' => '00158',
                'password' => Hash::make('myat12345'),
                'phone' => '09743300',
                'status' => '1',
                'team_id' => '4',
            ]
        );
        $staff4 = User::create(
            [
                'name' => 'Aung Aung',
                'email' => 'yethwaykhant.it@gmail.com',
                'employee_id' => '00159',
                'password' => Hash::make('aung12345'),
                'phone' => '0974083300',
                'status' => '1',
                'team_id' => '5',
            ]
            );
        $superAdmin->assignRole('SuperAdmin');
        $admin->assignRole('Admin');
        $staff->assignRole('Staff');
        $staff1->assignRole('Staff');
        $staff2->assignRole('Staff');
        $staff3->assignRole('Staff');
        $staff4->assignRole('Staff');
    }
}
