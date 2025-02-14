export class TaskRenderer {
    constructor() {
        this.taskLists = {
            ToDo: document.querySelector('[data-status="ToDo"]'),
            InProgress: document.querySelector('[data-status="InProgress"]'),
            Complete: document.querySelector('[data-status="Complete"]')
        };
    }

    createTaskElement(task) {
        const taskElement = document.createElement('div');
        taskElement.className = 'task-card';
        taskElement.draggable = true;
        taskElement.dataset.taskId = task.id;

        taskElement.innerHTML = `
            <h3>${task.name}</h3>
            <p>${task.description}</p>
            <div class="task-meta">
                <span class="priority-${task.priority}">Priority: ${task.priority}</span>
                <span>Due: ${task.dueDate}</span>
            </div>
            <div class="task-actions">
                <button class="btn primary edit-task" data-task-id="${task.id}">Edit</button>
                <button class="btn danger delete-task" data-task-id="${task.id}">Delete</button>
            </div>
        `;

        return taskElement;
    }

    render(tasks) {
        Object.values(this.taskLists).forEach(list => {
            list.innerHTML = '';
        });

        const tasksByStatus = {
            ToDo: tasks.filter(task => task.status === 'ToDo'),
            InProgress: tasks.filter(task => task.status === 'InProgress'),
            Complete: tasks.filter(task => task.status === 'Complete')
        };

        Object.entries(tasksByStatus).forEach(([status, statusTasks]) => {
            const taskList = this.taskLists[status];
            if (!taskList) return;

            statusTasks.forEach(task => {
                const taskElement = this.createTaskElement(task);
                taskList.appendChild(taskElement);
            });
        });
    }
}