const Task = {

    // Propriétés
    // Element HTML contenant les taches
    view: null,
    modal: null,
    input: null,
    hiddenId: null,

    init: function () {
        // Récupère le conteneur HTML de nos tâches
        Task.view = document.querySelector('.tasklist');

        // Affiche la liste
        Task.showList();
        
        // Récupère l'élément HTML modal-dialog et l'input
        Task.modal = document.querySelector('.modal-dialog')
        Task.input = Task.modal.querySelector('#task-title')

        // Branche le listener sur le bouton "Ajouter une tache"
        document.querySelector('.create-task-container > button')
            .addEventListener('click', Task.toggleModal);
        // Branche le listener sur le bouton "Ajouter"
        document.querySelector('.modal-dialog button')
            .addEventListener('click', Task.submitModal);

        // La méthode shwoList est asynchrone, donc JS continue les autres instructions
        console.log("j'ai terminé");
    },


    
    showList: function () {
        // Enlève toutes les tâches potentielles présente dans la vue
        Task.clearView();

        fetch('http://127.0.0.1:8000/api/tasks')
            .then( response => {
                console.log("response", response);
                return response.json();
            } )
            .then( tasks => {
                console.log("json", tasks);

                // Parcours toutes les tâches et les ajoute à la vue
                for (const task of tasks) {
                    Task.addTask(task)
                }
            } )

        console.log("terminé");
    },

    asyncShowList: async function () {
        // Enlève toutes les tâches potentielles présente dans la vue
        Task.clearView();

        // Appelle l'api pour récupérer les informations
        const response = await fetch('http://127.0.0.1:8000/api/tasks')

        // Extrait les infos de la réponse
        const tasks = await response.json()

        // Parcours toutes les tâches et les ajoute à la vue
        for (const task of tasks) {
            Task.addTask(task)
        }
    },


    clearView: function () {
        // Supprime tout !
        Task.view.textContent = '';
    },

    addTask: function (task) {
        // Recrée la structure HTML d'une tache
        const element = document.createElement('li')

        // HTML data-id
        // JS .dataset.id
        element.dataset.id = task.id;

        const p = document.createElement('p')
        p.textContent = task.title

        const d = document.createElement('div')
        d.classList.add('delete')

        // Ajout du listener pour supprimer une tache
        d.addEventListener('click', Task.delete);
        // TODO : montrer avec une fonction flèchée
        // Le scope est maintenu ! je peux fournir directement l'element
        // d.addEventListener('click', () => {
        //     console.log(element);
        //     Task.deleteElement(element);
        // });

        const e = document.createElement('div')
        e.classList.add('edit')

        e.addEventListener('click', Task.edit)

        // Imbrique les éléments
        element.append(p, d, e)

        // Ajoute à la vue (page)
        Task.view.append(element)
    },

    delete: async function (event) {
        // Remonte et récupère le parent li le plus proche
        const task = event.currentTarget.closest('li')

        // Appel de la requete avec await
        const url = "http://127.0.0.1:8000/api/tasks/" + task.dataset.id;
        const response = await fetch(url, {
            method: "DELETE"
        });

        // Supprime la tache du DOM uniquement si le code réponse est 200
        if ( response.status === 200 ) task.remove()
        else console.log("Attention, problème dans la requete !");
    },


    /**
     * Affiche ou cache la modal d'ajout/modification
     */
    toggleModal: function () {
        Task.modal.classList.toggle('show')
    },

    edit: function(event) {
        Task.toggleModal();
    },

    /**
     * Soumission de la modale (formulaire)
     * @param {PointerEvent} event 
     */
    submitModal: async function (event) {
        event.preventDefault();

        // Extrait le titre de l'input
        const value = Task.input.value;

        // Je cache la modal
        Task.toggleModal();

        // Appel l'api
        const response = await fetch("http://127.0.0.1:8000/api/tasks", {
            method: "POST",             
            headers: {          
                'Content-Type': 'application/json',       
            },
            body: JSON.stringify({      
                title: value
            })
        });
        // Extrait le json
        const newTask = await response.json();
        
        // Ici j'ai en main la nouvelle tache, je peux l'ajouter directement au DOM
        console.log(newTask);
        Task.addTask(newTask);

        // J'aurais aussi pu recharger directement la liste (perf moins satisfaisante ^^)
        // Task.showList();
    }
}


// setTimeout(() => {
//     Task.asyncShowList()
// }, 2000);