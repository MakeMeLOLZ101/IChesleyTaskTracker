import { TaskManager } from './TaskManager.js';
import { TaskRenderer } from './TaskRenderer.js';
import { DragAndDrop } from './DragAndDrop.js';

class App {
    constructor() {
        this.taskManager = new TaskManager();
        this.taskRenderer = new TaskRenderer();
        this.dragAndDrop = new DragAndDrop(this.taskManager, this.taskRenderer);
        
        this.currentlyEditing = null;
        
        this.initializeElements();
        this.attachEventListeners();
        this.render();
    }

    initializeElements() {
        this.form = {
            name: document.getElementById('taskName'),
            description: document.getElementById('taskDescription'),
            status: document.getElementById('taskStatus'),
            priority: document.getElementById('taskPriority'),
            dueDate: document.getElementById('taskDueDate'),
            addButton: document.getElementById('addTaskBtn'),
            updateButton: document.getElementById('updateTaskBtn')
        };
    }

    attachEventListeners() {
        this.form.addButton.addEventListener('click', () => this.handleAddTask());
        this.form.updateButton.addEventListener('click', () => this.handleUpdateTask());

        document.addEventListener('click', (e) => {
            if (e.target.matches('.edit-task')) {
                this.handleEditClick(e.target.dataset.taskId);
            } else if (e.target.matches('.delete-task')) {
                this.handleDeleteClick(e.target.dataset.taskId);
            }
        });
    }

    getFormData() {
        return {
            name: this.form.name.value,
            description: this.form.description.value,
            status: this.form.status.value,
            priority: this.form.priority.value,
            dueDate: this.form.dueDate.value
        };
    }

    clearForm() {
        this.form.name.value = '';
        this.form.description.value = '';
        this.form.status.value = 'ToDo';
        this.form.priority.value = 'Low';
        this.form.dueDate.value = '';
    }

    handleAddTask() {
        const taskData = this.getFormData();
        
        if (!taskData.name) {
            alert('Task name is required!');
            return;
        }

        this.taskManager.addTask(taskData);
        this.clearForm();
        this.render();
    }

    handleUpdateTask() {
        if (!this.currentlyEditing) return;

        const taskData = this.getFormData();
        
        if (!taskData.name) {
            alert('Task name is required!');
            return;
        }

        this.taskManager.updateTask(this.currentlyEditing, taskData);
        this.currentlyEditing = null;
        this.clearForm();
        
        this.form.addButton.style.display = 'block';
        this.form.updateButton.style.display = 'none';
        
        this.render();
    }

    handleEditClick(taskId) {
        const task = this.taskManager.getTask(taskId);
        if (!task) return;

        this.currentlyEditing = taskId;
        
        this.form.name.value = task.name;
        this.form.description.value = task.description;
        this.form.status.value = task.status;
        this.form.priority.value = task.priority;
        this.form.dueDate.value = task.dueDate;
        
        this.form.addButton.style.display = 'none';
        this.form.updateButton.style.display = 'block';
    }

    handleDeleteClick(taskId) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.taskManager.deleteTask(taskId);
            this.render();
        }
    }

    render() {
        const tasks = this.taskManager.getAllTasks();
        this.taskRenderer.render(tasks);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
});