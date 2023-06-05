<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;
    protected $fillable = [
        'start_time',
        'end_time',
        'date',
        'user_id',
        'room_id',
        'car_id',
    ];

    public function rooms()
    {
        return $this->hasMany(Room::class, 'id');
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
