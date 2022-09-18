<?php

use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Affichage de la liste
Route::get('/tasks', [TaskController::class, 'list']);
// Affichage d'une tâche en particulier
Route::get('/tasks/{id}', [TaskController::class, 'read']);
// Route pour ajouter une tâche dans la BDD
Route::post('/tasks', [TaskController::class, 'create']);
// Route pour modifier une tâche dans la BDD
Route::put('/tasks/{id}', [TaskController::class, 'update']);
// Route pour supprimer une tâche dans la BDD
Route::delete('/tasks/{id}', [TaskController::class, 'delete']);


