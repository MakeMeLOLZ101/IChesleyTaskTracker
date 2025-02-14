export class DragAndDrop {
    constructor(taskManager, taskRenderer) {
        this.taskManager = taskManager;
        this.taskRenderer = taskRenderer;
        this.init();
    }

    init() {
        document.addEventListener('dragstart', (e) => this.handleDragStart(e));
        document.addEventListener('dragend', (e) => this.handleDragEnd(e));
        document.addEventListener('dragover', (e) => this.handleDragOver(e));
        document.addEventListener('drop', (e) => this.handleDrop(e));
        
        document.addEventListener('dragenter', (e) => this.handleDragEnter(e));
        document.addEventListener('dragleave', (e) => this.handleDragLeave(e));
    }

    handleDragStart(e) {
        const taskCard = e.target.closest('.task-card');
        if (!taskCard) return;

        taskCard.classList.add('dragging');
        e.dataTransfer.setData('text/plain', taskCard.dataset.taskId);
        e.dataTransfer.effectAllowed = 'move';
    }

    handleDragEnd(e) {
        const taskCard = e.target.closest('.task-card');
        if (!taskCard) return;

        taskCard.classList.remove('dragging');
        document.querySelectorAll('.task-list').forEach(list => {
            list.classList.remove('drag-over');
        });
    }

    handleDragOver(e) {
        if (e.target.closest('.task-list')) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        }
    }

    handleDragEnter(e) {
        const taskList = e.target.closest('.task-list');
        if (taskList) {
            taskList.classList.add('drag-over');
        }
    }

    handleDragLeave(e) {
        const taskList = e.target.closest('.task-list');
        if (taskList) {
            taskList.classList.remove('drag-over');
        }
    }

    handleDrop(e) {
        e.preventDefault();
        
        const taskList = e.target.closest('.task-list');
        if (!taskList) return;

        const taskId = e.dataTransfer.getData('text/plain');
        const newStatus = taskList.dataset.status;
        
        const task = this.taskManager.getTask(taskId);
        if (task && task.status !== newStatus) {
            this.taskManager.updateTask(taskId, { ...task, status: newStatus });
            this.taskRenderer.render(this.taskManager.getAllTasks());
        }

        taskList.classList.remove('drag-over');
    }
}