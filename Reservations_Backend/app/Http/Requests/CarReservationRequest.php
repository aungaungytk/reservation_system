<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CarReservationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'title' => 'required',
            'start_time' => 'required',
            'date' => 'required',
            'destinaiton' => 'required',
            'no_of_traveller' => 'required',
            'user_id' => 'required',
            'car_id' => 'required',
        ];
    }
}
