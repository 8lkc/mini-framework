export const storage = {
    tasks: [],
    availableId: 0,
    addTask(label, status) {this.tasks.push({id: this.availableId++, label: label, completed: status === true ? status : false})},
    broadcast() {localStorage.setItem('tasks', JSON.stringify(this.tasks))},
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
    get taskCount() {return this.tasks.length},
    getTaskAtPosition(index) {return this.tasks[index] || undefined},
    removeTask(id) {
        const index = this.findTask(id);
        if(index < 0) {console.error('⚠️ task not found !'); return}
        this.tasks.splice(index, 1);
        this.broadcast();
    },
    update() {this.tasks = JSON.parse(localStorage.getItem('tasks'))},
};
