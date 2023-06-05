<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use App\Repository\User\UserRepoInterface;
use App\Services\User\UserServiceInterface;
use Exception;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private $userService, $userRepo;
    public function __construct(UserServiceInterface $userService, UserRepoInterface $userRepo)
    {

        $this->userService = $userService;
        $this->userRepo = $userRepo;
    }

    public function index()
    {
        try {
            // $roles = Role::all();
            $user = Auth::user();
            if (!$user->can('user-list')) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'You do not have permission to view user lists',
                ], 403);
            }
            $data = $this->userRepo->get();
            return response()->json([
                'status' => 'success',
                'message' => "user list all",
                'data' => $data
                // 'roles' => $roles,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => $data
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UserRequest $request)
    {
        try {
            $data = $this->userService->store($request->validated());
            return response()->json([
                'status' => 'success',
                'message' => 'New user store',
                'data' => $data
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => $data
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $data = $this->userRepo->show($id);
            return response()->json([
                'status' => 'success',
                'message' => "user select",
                'data' => $data,
                'role' => $data->getRoleNames(),
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => $data
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        try {
            $request->validate([
                'name' => 'required',
                'email' => 'required|email|unique:users,email,' . $id,
                'phone' => 'required',
                'status' => 'required',
                'team_id' => 'required',
                'role_id' => 'required',
            ]);

            $user = Auth::user();

            if ($user->can('update-admin')) {
                $userToUpdate = User::find($id);
                if (!$userToUpdate) {
                    return response()->json(['message' => 'User not found'], 404);
                }

                if ($userToUpdate->hasRole('SuperAdmin')) {
                    return response()->json(['message' => 'Cannot update a user with SuperAdmin role'], 403);
                }

                $data = $this->userService->update($request->all(), $id);
                return response()->json([
                    'status' => 'success',
                    'message' => 'user update successful',
                    'data' => $data
                ], 200);
            } else if ($user->can('update-user')) {
                $userToUpdate = User::find($id);
                if (!$userToUpdate) {
                    return response()->json(['message' => 'User not found'], 404);
                }

                if ($userToUpdate->hasRole('SuperAdmin')) {
                    return response()->json(['message' => 'Cannot update a user with SuperAdmin role'], 403);
                }

                if ($userToUpdate->hasRole('Admin')) {
                    if ($user->id !== $userToUpdate->id) {
                        return response()->json(['message' => 'Cannot update a user with Admin role'], 403);
                    } else {
                        $data = $this->userService->update($request->all(), $id);
                        return response()->json([
                            'status' => 'success',
                            'message' => 'user update successful',
                            'data' => $data
                        ], 200);
                    }
                }
                $data = $this->userService->update($request->all(), $id);
                return response()->json([
                    'status' => 'success',
                    'message' => 'user update successful',
                    'data' => $data
                ], 200);
            } else {
                return response()->json([
                    'status' => 'error',
                    'message' => 'You do not have permission to update a user',
                ], 403);
            }
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {

            $user = Auth::user();

            if ($user->can('delete-admin')) {
                $userToDelete = User::find($id);
                if (!$userToDelete) {
                    return response()->json(['message' => 'User not found'], 404);
                }

                if ($userToDelete->hasRole('SuperAdmin')) {
                    return response()->json(['message' => 'Cannot delete a user with SuperAdmin role'], 403);
                }

                $data = $this->userService->destroy($id);
                return response()->json([
                    'status' => 'success',
                    'message' => 'Admin delete successful',
                    'data' => $data
                ], 200);
            } else if ($user->can('delete-user')) {
                $userToDelete = User::find($id);
                if (!$userToDelete) {
                    return response()->json(['message' => 'User not found'], 404);
                }

                if ($userToDelete->hasRole('SuperAdmin')) {
                    return response()->json(['message' => 'Cannot delete a user with SuperAdmin role'], 403);
                }

                if ($userToDelete->hasRole('Admin')) {
                    if ($user->id !== $userToDelete->id) {
                        return response()->json(['message' => 'Cannot delete a user with Admin role'], 403);
                    }
                }
                $data = $this->userService->destroy($id);
                return response()->json([
                    'status' => 'success',
                    'message' => 'user delete successful',
                    'data' => $data
                ], 200);
            } else {
                return response()->json([
                    'status' => 'error',
                    'message' => 'You do not have permission to delete a user',
                ], 403);
            }
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
    public function getProUser()
    {
        try {
            $data = $this->userRepo->getProUser();
            return response()->json([
                'status' => 'success',
                'message' => "get admin user",
                'data' => $data
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => $data
            ], 500);
        }
    }

    public function getStaff()
    {
        try {
            $data = $this->userRepo->getStaff();
            return response()->json([
                'status' => 'success',
                'message' => "get staff",
                'data' => $data
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => $data
            ], 500);
        }
    }

    public function statusChange(Request $request, $id)
    {
        try {
            $request->validate([
                'name' => 'required',
                'email' => 'required|email|unique:users,email,' . $id,
                'phone' => 'required',
                'status' => 'required',
                'team_id' => 'required',
                'role_id' => 'required',
            ]);
            $user = Auth::user();

            if ($user->can('admin-status')) {
                $userToDelete = User::find($id);
                if (!$userToDelete) {
                    return response()->json(['message' => 'User not found'], 404);
                }

                if ($userToDelete->hasRole('SuperAdmin')) {
                    return response()->json(['message' => 'Cannot change status with superadmin role'], 403);
                }

                $data = $this->userService->update($request->all(), $id);
                return response()->json([
                    'status' => 'success',
                    'message' => 'user update successful',
                    'data' => $data
                ], 200);
            } else if ($user->can('user-status')) {
                $userToDelete = User::find($id);
                if (!$userToDelete) {
                    return response()->json(['message' => 'User not found'], 404);
                }

                if ($userToDelete->hasRole('SuperAdmin')) {
                    return response()->json(['message' => 'Cannot update a user with SuperAdmin role'], 403);
                }

                if ($userToDelete->hasRole('Admin')) {
                    return response()->json(['message' => 'Cannot update a user with Admin role'], 403);
                }
                $data = $this->userService->update($request->all(), $id);
                return response()->json([
                    'status' => 'success',
                    'message' => 'user update successful',
                    'data' => $data
                ], 200);
            } else {
                return response()->json([
                    'status' => 'error',
                    'message' => 'You do not have permission to update status',
                ], 403);
            }
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
    public function passwordChange(Request $request, $id)
    {
        try {
            $request->validate([
                'password' => 'required',
            ]);
            $data = $this->userService->passwordChange($request->all(), $id);
            return response()->json([
                'status' => 'success',
                'message' => 'Password change successful',
                'data' => $data
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
