<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\donnes;
use Carbon\Carbon;
class tableau_Controller extends Controller
{

    public function test()
    {
       
        return view('management');

    }


    public function index(){
        $type_utilisateur =Auth::user()->type_utilisateur;
        if ($type_utilisateur=='0') {
            return view('admin'); 
        }
        if ($type_utilisateur=='2') {
            return view('viseur'); 
        }
        if ($type_utilisateur=='1') {
            return view('controlleur'); 
        } else {
             return view('dashboard');
        }
    }

    public function management(){
        return view('management');
    }
}
