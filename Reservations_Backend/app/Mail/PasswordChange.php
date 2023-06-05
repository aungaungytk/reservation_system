<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PasswordChange extends Mailable
{
    use Queueable, SerializesModels;
    protected $user;
    protected $password;
    /*

Create a new message instance.*
@return void*/

    public function __construct(User $user, $password)
    {
        $this->user = $user;
        $this->password = $password;
    }

    /*

Get the message envelope.*
@return \Illuminate\Mail\Mailables\Envelope*/
    public function envelope()
    {
        return new Envelope(
            subject: 'Password Change',
        );
    }

    /*

Get the message
content definition.*
@return \Illuminate\Mail\Mailables\Content
*/
    public function build()
    {
        return $this->subject('Welcome to Our Website')->view('password_change')->with(['user' => $this->user, 'password' => $this->password,]);
    }

    /*

Get the attachments for the message.*
@return array*/
    public function attachments()
    {
        return [];
    }
}
