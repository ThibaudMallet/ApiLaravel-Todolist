const App = {

    /**
     * Initialisation du DOM puis lancer de task.init
     */
    init: function() {
        Task.init()
    },
}

document.addEventListener('DOMContentLoaded', App.init);