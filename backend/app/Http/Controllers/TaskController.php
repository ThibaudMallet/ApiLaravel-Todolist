<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;


/**
 * Gestion des routes pour les tâches
 * Hérite de Controller :
 * https://laravel.com/docs/8.x/controllers#basic-controllers
 */
class TaskController extends Controller
{

    /**
     * Undocumented function
     *
     * @return void
     */
    /**
     * Récupère la liste des Task
     *
     * @return JSON
     */
    public function list()
    {
        // Utilise la méthode all hérité de la classe Model
        // https://laravel.com/docs/8.x/eloquent#retrieving-models
        $tasks = Task::all();

        // Retourne la réponse sous forme de json
        // https://laravel.com/docs/8.x/responses#json-responses
        return response()->json($tasks);
    }

    /**
     * Récupération d'une tâche en particulier
     *
     * @param [type] $id identifiant unique de la taĉhe
     * @return Task
     */
    public function read($id)
    {
        // Récupère une tache en fonction de son id
        // https://laravel.com/docs/8.x/eloquent#retrieving-single-models
        $task = Task::find($id);

        if (!$task) {
            // Retourne une réponse null avec un code erreur 404
            // https://laravel.com/docs/8.x/responses#response-objects
            return response(null, 404);
        } else {
            return response()->json($task);
        }
    }

    /**
     * Creation d'une nouvelle tâche
     *
     * @param Request $request
     * @return la nouvelle tâche en format Json
     */
    public function create (Request $request)
    {
        // Extraire la donnée title du POST
        $newTask = $request->input('title');

        // Si le champ est vide je retourne une erreur 500
        if (empty($newTask)) return response(null, 500);

        // Création d'une intance de Task et insertion des données réçues
        $task = new Task();
        $task->title = $newTask;

        // Insertion des données dans la db, et retour du résultat
        $result = $task->save();
        if (!$result) return response (null, 500);
        else return response()->json($task, 201);
    }

    /**
     * Mise à jour d'une tâche
     *
     * @param Request $request, $id
     * @return la tâche mise à jour en format Json
     */
    public function update ($id, Request $request)
    {
        // Extraire la donnée title du POST
        $newTask = $request->input('title');

        // Si le champ est vide je retourne une erreur 500
        if (empty($newTask)) return response("Le tâche n'est pas renseignée", 500);

        // Recherche de la tâche à mettre à jour et insertion du nouveau titre de celle ci
        $task = Task::find($id);
        if (!$task) return response("Nous n'avons pas trouvé la tâche que vous souhaitez mette à jour", 404);
        $task->title = $newTask;

        // Mise à jour des données dans la bdd et retour du résultat
        $result = $task->save();
        if (!$result) return response("Nous n'avons pas réussi à mettre à jour la tâche", 500);
        else return response()->json($task, 200);
    }

    public function delete ($id)
    {
        // Chargement de la tâche à supprimer
        $task = Task::find($id);
        if (!$task) return response("Nous n'avons pas trouvé la tâche à supprimer", 404);

        // Suppression de la tâche et retour du résultat
        $result = $task->delete();
        if (!$task) return response("Nous n'avons pas réussi à supprimer la tâche", 500);
        else return response(null, 200);
    }
}
