export class TaskManager {
    constructor() {
        this.tasks = this.loadTasks();
    }

    loadTasks() {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    generateId() {
        return Date.now().toString();
    }

    getAllTasks() {
        return [...this.tasks];
    }

    getTask(taskId) {
        return this.tasks.find(task => task.id === taskId);
    }

    addTask(taskData) {
        const newTask = {
            id: this.generateId(),
            ...taskData,
            createdAt: new Date().toISOString()
        };

        this.tasks.push(newTask);
        this.saveTasks();
        return newTask;
    }

    updateTask(taskId, taskData) {
        const index = this.tasks.findIndex(task => task.id === taskId);
        if (index === -1) return false;

        this.tasks[index] = {
            ...this.tasks[index],
            ...taskData,
            updatedAt: new Date().toISOString()
        };

        this.saveTasks();
        return true;
    }

    deleteTask(taskId) {
        const index = this.tasks.findIndex(task => task.id === taskId);
        if (index === -1) return false;

        this.tasks.splice(index, 1);
        this.saveTasks();
        return true;
    }

    getTasksByStatus(status) {
        return this.tasks.filter(task => task.status === status);
    }
}