<?php

namespace App\Http\Controllers\Api;


use Exception;
use App\Models\Car;
use Illuminate\Http\Request;
use App\Http\Requests\CarRequest;
use Illuminate\Support\Facades\Auth;
use App\Repository\Car\CarRepository;
use App\Services\Car\CarServiceInterface;
use Illuminate\Support\Facades\Validator;

class CarController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private $carRepo, $carService;
    public function __construct(CarRepository $carRepo, CarServiceInterface $carService)
    {
        $this->carService = $carService;
        $this->carRepo = $carRepo;
    }
    public function index()
    {
        try {
            $data = $this->carRepo->get();
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

            if (!$user->can('car-create')) {
                return $this->sendError('Error!', ['error' => 'You do not have permission to create new car'], 403);
            }
            $validateCar = Validator::make($request->all(), [
                'brand' => 'required',
                'licence_no' => 'required|unique:cars,licence_no',
                'capacity' => 'required',
            ]);
            if ($validateCar->fails()) {
                return $this->sendError($validateCar->errors(), "Validation Error", 405);
            }
            $data = $this->carService->store($request->all());
            return $this->sendResponse($data, 'Register successfully.');
        } catch (Exception $e) {
            return $this->sendError('Error in registration', $e->getMessage(), 500);
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
            $data = $this->carRepo->show($id);
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

            if (!$user->can('car-update')) {
                return $this->sendError('Error!', ['error' => 'You do not have permission to update car'], 403);
            }
            $validateCar = Validator::make($request->all(), [
                'brand' => 'required',
                'licence_no' => 'required|unique:cars,licence_no,' . $id,
                'capacity' => 'required',
            ]);
            if ($validateCar->fails()) {
                return $this->sendError($validateCar->errors(), "Validation Error", 405);
            }
            $data = $this->carService->update($request->all(), $id);
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
            if (!$user->can('car-delete')) {
                return $this->sendError('Error!', ['error' => 'You do not have permission to delete car'], 403);
            }
            $data = $this->carService->delete($id);
            return $this->sendResponse($data, 'Deleted successfully.');
        } catch (Exception $e) {
            return $this->sendError('Error', $e->getMessage(), 500);
        }
    }

    public function getCarCount()
    {
        try {
            $data = $this->carRepo->getCarCount();
            return $this->sendResponse($data, 'Car Count');
        } catch (Exception $e) {
            return $this->sendError('Error', $e->getMessage(), 500);
        }
    }
}
