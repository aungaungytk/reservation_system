<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests\RoleRequest;
use App\Http\Controllers\Controller;
use App\Repository\Role\RoleRepoInterface;
use App\Services\Role\RoleServiceInterface;
use Exception;

class RoleController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private $roleService, $roleRepo;
    public function __construct(RoleServiceInterface $roleService, RoleRepoInterface $roleRepo)
    {

        $this->roleService = $roleService;
        $this->roleRepo = $roleRepo;
    }
    public function index()
    {
        try {
            $data = $this->roleRepo->get();
            return $this->sendResponse($data, 'Role lists.');
        } catch (Exception $e) {
            return $this->sendError('Error in registration', $e->getMessage(), 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(RoleRequest $request)
    {
        try {
            $data = $this->roleService->store($request->validated());
            return $this->sendResponse($data, 'New role stored.');
        } catch (Exception $e) {
            return $this->sendError('Error in role registration!', $e->getMessage(), 500);
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
            $data = $this->roleRepo->show($id);
            return $this->sendResponse($data, 'Successfully show selected role.');
        } catch (Exception $e) {
            return $this->sendError('Error!', $e->getMessage(), 500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(RoleRequest $request, $id)
    {
        try {
            $data = $this->roleService->update($request->validated(), $id);
            return $this->sendResponse($data, 'Successfully updated the  selected role.');
        } catch (Exception $e) {
            return $this->sendError('Error!', $e->getMessage(), 500);
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
            $data = $this->roleService->destroy($id);
            return $this->sendResponse($data, 'Successfully deleted the selected role.');
        } catch (Exception $e) {
            return $this->sendError('Error!', $e->getMessage(), 500);
        }
    }
}
