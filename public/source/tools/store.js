export const storage = {
    tasks: [],
    availableId: 0,
    addTask(label, status) {this.tasks.push({id: this.availableId++, label: label, completed: status === true ? status : false})},
    broadcast() {localStorage.setItem('tasks', JSON.stringify(this.tasks)); localStorage.setItem('availableId', this.availableId)},
    clearCompletedTasks() {this.tasks = this.filter('pending'); this.broadcast()},
	filter(targetStatus) {
        if (targetStatus === 'pending') return this.tasks.filter(task => !task.completed);
        if (targetStatus === 'completed') return this.tasks.filter(task => task.completed);
        return this.tasks; // All tasks
    },
    findTask(id) {
        this.update();
        let index = -1;
        const length = this.taskCount;
        for(let i = 0; i < length; i++) {if(this.tasks[i].id === id) {index = i; break}}
        return index;
    },
    get completedTasks() {return this.filter('completed').length},
    get remainingTasks() {return this.filter('pending').length},
    get taskCount() {return this.tasks.length},
    getTaskAtPosition(index) {return this.tasks[index] || undefined},
    removeTask(id) {
        const index = this.findTask(id);
        if(index < 0) {console.error('⚠️ task not found !'); return}
        this.tasks.splice(index, 1);
        if(this.taskCount === 0) this.availableId = 0; this.broadcast();
    },
    toggleState(id) {const i = this.findTask(id); this.tasks[i].completed = !this.tasks[i].completed; this.broadcast()},
    update() {this.tasks = JSON.parse(localStorage.getItem('tasks')); this.availableId = localStorage.getItem('availableId')},
    updateTaskLabel(id, newLabel) {
        const taskIndex = this.findTask(id); if (taskIndex === -1) {console.error('Task not found'); return}
        this.tasks[taskIndex].label = newLabel; this.broadcast();
    },
};
