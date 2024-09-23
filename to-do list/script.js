const app = Vue.createApp({
    data() {
        
        return {
            tasks: [],      // Array para armazenar as tarefas
            newTask: '',    // Para armazenar o texto da nova tarefa
            taskIndexToDelete: null,
        }
    },
    methods: {
        
        openModal(index) {
            this.taskIndexToDelete = index
            this.$refs.modalRemoveTask.showModal(); 
        },

        closemodalRemove() {
            this.$refs.modalRemoveTask.close()
        },

        openmodalremovealltask() {
            this.$refs.modalremovealltask.showModal()
        },

        createTask() {
            if (this.newTask !== '') {
                this.tasks.push({
                    text: this.newTask,
                    completed: false
                })
                this.newTask = '' 
                localStorage.setItem("tasks", JSON.stringify(this.tasks));   //envia as terefas para o localstorage em forma de json
            }
        },

        deletetask(index) {
            if (index !== null) {
                this.tasks.splice(index, 1);
                this.$refs.modalRemoveTask.close(); // Fecha o modal
                this.taskIndexToDelete = null; // Reseta o índice após a exclusão
            }
        },

        deleteAllTasks() {
            this.tasks = []
            this.$refs.modalremovealltask.close()   
        },
        
        closemomodalremovealltask() {
            this.$refs.modalremovealltask.close()
        }
    },

    created() {
        this.tasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : this.tasks; //pegando as tarefas salvas no localstorage
    },
    updated() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks)); //atualiza o localstorage
    },

    computed: {
        tasksComplets() {
            return this.tasks.filter(tasks => tasks.completed).length;
            
        }
    }
});


app.mount('#app'); 