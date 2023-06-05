<?php

namespace App\Http\Controllers\Api;

use Exception;
use Illuminate\Http\Request;
use App\Http\Requests\TeamRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Repository\Team\TeamRepoInterface;
use App\Services\Team\TeamServiceInterface;
use Illuminate\Support\Facades\Validator;

class TeamController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private $teamService, $teamRepo;
    public function __construct(TeamServiceInterface $teamService, TeamRepoInterface $teamRepo)
    {

        $this->teamService = $teamService;
        $this->teamRepo = $teamRepo;
    }
    public function index()
    {
        try {
            $data = $this->teamRepo->get();
            return $this->sendResponse($data, 'Team lists.');
        } catch (Exception $e) {
            return $this->sendError('Error!', $e->getMessage(), 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $user = Auth::user();

            if (!$user->can('team-create')) {
                return $this->sendError('Error!', ['error' => 'You do not have permission to create new team'], 403);
            }
            $validateTeam = Validator::make($request->all(), [
                'name' => 'required|unique:teams,name',
            ]);
            if ($validateTeam->fails()) {
                return $this->sendError($validateTeam->errors(), "Validation Error", 405);
            }
            $data = $this->teamService->store($request->all());
            return $this->sendResponse($data, 'Successfully register new team.');
        } catch (Exception $e) {
            return $this->sendError('Error in team registration', $e->getMessage(), 500);
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
            $data = $this->teamRepo->show($id);
            return $this->sendResponse($data, 'Selected team.');
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
    public function update(Request $request, $id)
    {
        try {

            $user = Auth::user();

            if (!$user->can('team-update')) {
                return $this->sendError('Error!', ['error' => 'You do not have permission to update team'], 403);
            }
            $validateTeam = Validator::make($request->all(), [
                'name' => 'required|unique:teams,name,' . $id,
            ]);
            if ($validateTeam->fails()) {
                return $this->sendError($validateTeam->errors(), "Validation Error", 405);
            }
            $data = $this->teamService->update($request->all(), $id);
            return $this->sendResponse($data, 'Successfully updated selected team.');
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
            $user = Auth::user();
            if (!$user->can('team-delete')) {
                return $this->sendError('Error!', ['error' => 'You do not have permission to delete team'], 403);
            }
            $data = $this->teamService->destroy($id);
            return $this->sendResponse($data, 'Successfully deleted selected team.');
        } catch (Exception $e) {
            return $this->sendError('Error!', $e->getMessage(), 500);
        }
    }
}
