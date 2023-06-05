<?php

namespace App\Http\Controllers\Api;

use Exception;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Repository\Room\RoomRepoInterface;
use App\Services\Room\RoomServiceInterface;
use Illuminate\Support\Facades\Validator;

class RoomController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private $roomService, $roomRepo;

    public function __construct(RoomServiceInterface $roomService, RoomRepoInterface $roomRepo)
    {
        $this->roomService = $roomService;
        $this->roomRepo = $roomRepo;
    }
    public function index()
    {
        try {
            $data = $this->roomRepo->get();
            return $this->sendResponse($data, 'All Data.');
        } catch (Exception $e) {
            return $this->sendError('Error', $e->getMessage(), 500);
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

            if (!$user->can('room-create')) {
                return $this->sendError('Error!', ['error' => 'You do not have permission to create new room'], 403);
            }
            $validateRoom = Validator::make($request->all(), [
                'name' => 'required',
                'capacity' => 'required',
                'amenities' => 'nullable',
            ]);
            if ($validateRoom->fails()) {
                return $this->sendError($validateRoom->errors(), "Validation Error", 405);
            }

            $data = $this->roomService->store($request->all());
            return $this->sendResponse($data, 'Register successfully.');
        } catch (Exception $e) {
            return $this->sendError('Error in register!', $e->getMessage(), 500);
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
            $data = $this->roomRepo->show($id);
            return $this->sendResponse($data, 'Data Show');
        } catch (Exception $e) {
            return $this->sendError('Error', $e->getMessage(), 500);
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

            if (!$user->can('room-update')) {
                return $this->sendError('Error!', ['error' => 'You do not have permission to update room'], 403);
            }

            $validateRoom = Validator::make($request->all(), [
                'name' => 'required',
                'capacity' => 'required',
                'amenities' => 'nullable',
            ]);
            if ($validateRoom->fails()) {
                return $this->sendError($validateRoom->errors(), "Validation Error", 405);
            }

            $data = $this->roomService->update($request->all(), $id);
            return $this->sendResponse($data, 'Updated successfully.');
        } catch (Exception $e) {
            return $this->sendError('Error', $e->getMessage(), 500);
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

            if (!$user->can('room-delete')) {
                return $this->sendError('Error!', ['error' => 'You do not have permission to delete room'], 403);
            }
            $data = $this->roomService->delete($id);
            return $this->sendResponse($data, 'Deleted successfully.');
        } catch (Exception $e) {
            return $this->sendError('Error', $e->getMessage(), 500);
        }
    }

    public function getRoomCount()
    {
        try {
            $data = $this->roomRepo->getRoomCount();
            return $this->sendResponse($data, 'Room Count');
        } catch (Exception $e) {
            return $this->sendError('Error', $e->getMessage(), 500);
        }
    }
}
