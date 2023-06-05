<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\RoomReservation;
use App\Repository\RoomReservation\RoomReservationRepoInterface;
use App\Services\RoomReservation\RoomReservationServiceInterface;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class RoomReservationController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    private  $roomReservationRepo, $roomReservationService;
    public function __construct(RoomReservationRepoInterface $roomReservationRepo, RoomReservationServiceInterface $reservationService)
    {
        $this->roomReservationService = $reservationService;
        $this->roomReservationRepo =  $roomReservationRepo;
    }
    public function index()

    {
        try {
            $reservation = $this->roomReservationRepo->get();
            return $this->sendResponse($reservation, 'Data Show Successfully');
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
            $validateReservation = Validator::make($request->all(), [
                'user_id' => 'required',
                'title' => 'required',
                'description' => 'nullable',
                'start_time' => 'required|date_format:H:i:s',
                'end_time' => 'required|after:start_time|date_format:H:i:s',
                'date' => 'required',
                'room_id' => 'required',
            ]);

            if ($validateReservation->fails()) {
                return $this->sendError($validateReservation->errors(), "Validation Error", 405);
            }

            $reservation = $this->roomReservationService->store($request->all());

            if ($reservation === "overlap") {
                return $this->sendError(['overlap' => 'Reservation already exists within that time!'], "Validation Error", 405);
            }
            if ($reservation === "errorDate") {
                return $this->sendError(['errorDate' => 'Please select the time greater than current time!'], "Validation Error", 405);
            }
            if ($reservation === "endTimeError") {
                return $this->sendError(['endTimeError' => 'The end time must be a time after start time!'], "Validation Error", 405);
            }
            return $this->sendResponse($reservation, 'Created Successfully');
        } catch (Exception $e) {
            return $this->sendError($e->getMessage(), 'Error', 500);
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
            $data = $this->roomReservationRepo->show($id);
            return $this->sendResponse($data, 'Data Show Successfully');
        } catch (Exception $e) {
            return $this->sendError('Error', $e->getMessage(), 500);
        }
    }
    public function searchByDate(Request $request)
    {
        try {

            $data = $this->roomReservationRepo->searchByDate($request->date);
            return $this->sendResponse($data, 'Data show by selected date');
        } catch (Exception $e) {
            return $this->sendError('Error', $e->getMessage(), 500);
        }
    }
    public function searchByUserAndDate(Request $request, $user_id)
    {
        try {
            $data = $this->roomReservationRepo->searchByUserAndDate($user_id, $request->date);
            return $this->sendResponse($data, 'Data show by selected user and date');
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

            $validateReservation = Validator::make($request->all(), [
                'user_id' => 'required',
                'title' => 'required',
                'description' => 'nullable',
                'start_time' => 'required|date_format:H:i:s',
                'end_time' => 'required|after:start_time|date_format:H:i:s',
                'date' => 'required',
                'room_id' => 'required',
            ]);

            if ($validateReservation->fails()) {
                return $this->sendError($validateReservation->errors(), "Validation Error", 405);
            }

            $reservation = $this->roomReservationService->update($request->all(), $id);

            if ($reservation === "overlap") {

                return $this->sendError(['overlap' => 'Reservation already exists within that time!'], "Validation Error", 405);
            }
            if ($reservation === "errorDate") {

                return $this->sendError(['errorDate' => 'Please select the time greater than current time!'], "Validation Error", 405);
            }

            return $this->sendResponse($reservation, 'Updated Successfully');
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
            $data = $this->roomReservationService->delete($id);
            return $this->sendResponse($data, 'Deleted Successfully');
        } catch (Exception $e) {
            return $this->sendError('Error', $e->getMessage(), 500);
        }
    }

    public function getRoomReserveCount()
    {
        try {
            $data = $this->roomReservationRepo->getRoomReserveCount();
            return $this->sendResponse($data, 'Room Reservation Count');
        } catch (Exception $e) {
            return $this->sendError('Error', $e->getMessage(), 500);
        }
    }


    public function getRoomReserveCountByTeam()
    {
        try {
            $data = $this->roomReservationRepo->getRoomReserveCountByTeam();
            return $this->sendResponse($data, 'Room Reserve Count by Team');
        } catch (Exception $e) {
            return $this->sendError('Error', $e->getMessage(), 500);
        }
    }

    public function getRoomReserveCountById($id)
    {
        try {
            $data = $this->roomReservationRepo->getRoomReserveCountById($id);
            return $this->sendResponse($data, 'Room Count by Id');
        } catch (Exception $e) {
            return $this->sendError('Error', $e->getMessage(), 500);
        }
    }
    public function getRoomReservationCountByMonth()
    {
        try {
            $data = $this->roomReservationRepo->getRoomReservationCountByMonth();
            return $this->sendResponse($data, 'Room Count by Month');
        } catch (Exception $e) {
            return $this->sendError('Error', $e->getMessage(), 500);
        }
    }
}
