<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repository\Reservation\ReservationRepoInterface;
use App\Services\Reservation\ReservationServiceInterface;
use Exception;
use Illuminate\Http\Request;

class ReservationController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    private  $reservationRepo, $reservationService;
    public function __construct(ReservationRepoInterface $reservationRepo, ReservationServiceInterface $reservationService)
    {
        $this->reservationService = $reservationService;
        $this->reservationRepo = $reservationRepo;
    }
    public function index()

    {
        try {
            $reservation = $this->reservationRepo->get();
            return $this->sendResponse($reservation, 'Created Successfully');
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
            $request->validate([
                'start_time' => 'required',
                'end_time' => 'required|after:start_time',
                'date' => 'required',
                'user_id' => 'required',
            ]);

            $reservation = $this->reservationService->store($request->all());
            return $this->sendResponse($reservation, 'Created Successfully');
        } catch (Exception $e) {
            return $this->sendError('Error', $e->getMessage(), 500);
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
            $reservation = $this->reservationRepo->show($id);
            return $this->sendResponse($reservation, 'Data Show Successfully');
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
            $input = $request->validate([
                'start_time' => 'required',
                'end_time' => 'required',
                'date' => 'required',
                'user_id' => 'required',
                'room_id' => 'nullable',
                'car_id' => 'nullable'
            ]);

            $data = $this->reservationService->update($input, $id);
            return $this->sendResponse($data, 'Updated Successfully');
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
            $data = $this->reservationService->delete($id);
            return $this->sendResponse($data, 'Deleted Successfully');
        } catch (Exception $e) {
            return $this->sendError('Error', $e->getMessage(), 500);
        }
    }
}
