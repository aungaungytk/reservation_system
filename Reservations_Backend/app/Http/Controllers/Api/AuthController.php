<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Repository\User\UserRepoInterface;
use App\Services\User\UserServiceInterface;

class AuthController extends BaseController
{
    private $userService, $userRepo;
    public function __construct(UserServiceInterface $userService, UserRepoInterface $userRepo)
    {

        $this->userService = $userService;
        $this->userRepo = $userRepo;
    }


    public function register(Request $request)
    {

        try {
            //Validated
            $validateUser = Validator::make(
                $request->all(),
                [
                    'name' => 'required',
                    'email' => 'required|email|unique:users,email',
                    'employee_id' => 'required|unique:users,employee_id',
                    'phone' => 'required|unique:users,phone',
                    'password' => 'required|min:6|confirmed',
                    'password_confirmation' => 'required',
                    'status' => 'required',
                    'role_id' => 'required',
                    'team_id' => 'required',
                ]
            );

            if ($validateUser->fails()) {
                return $this->sendError($validateUser->errors(), "Validation Error", 403);
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'employee_id' => $request->employee_id,
                'phone' => $request->phone,
                'password' => Hash::make($request->password),
                'status' => $request->status,
                'team_id' => $request->team_id,
            ]);
            $user->assignRole($request->role_id);
            $success['token'] = $user->createToken('API TOKEN')->plainTextToken;
            $success['name'] = $user->name;

            return $this->sendResponse($success, 'User Register successfully.');
        } catch (\Throwable $th) {
            return $this->sendError('Registration Fail!.', $th->getMessage(), 500);
        }
    }

    public function login(Request $request)
    {

        try {
            $validateUser = Validator::make(
                $request->all(),
                [
                    'email' => 'required|email',
                    'password' => 'required'
                ]
            );

            if ($validateUser->fails()) {
                return $this->sendError($validateUser->errors(), ['error' => 'unathorized']);
            }

            if (!Auth::attempt($request->only(['email', 'password']))) {
                return $this->sendError(['error' => 'Email & Password does not match with our record.'], ['error' => 'unathorized']);
            }

            $user = User::where('email', $request->email)->first();

            if ($user['status'] == 0) {
                return response()->json([
                    'status' => false,
                    'message' => ['error' => 'Not available! Please wait for admin approve'],
                ], 401);
            }
            return response()->json([
                'status' => true,
                'message' => 'User Logged In Successfully',
                'token' => $user->createToken("API TOKEN")->plainTextToken,
                'user' => $user,
                'role' => $user->getRoleNames()->first()
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
