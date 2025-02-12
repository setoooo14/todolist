document.addEventListener('DOMContentLoaded', () => {
    const addTaskButton = document.getElementById('add-task');
    const newTaskInput = document.getElementById('new-task');
    const taskList = document.getElementById('tasks');

    addTaskButton.addEventListener('click', () => {
        const taskText = newTaskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            newTaskInput.value = '';
        }
    });

    taskList.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-task')) {
            deleteTask(event.target.parentElement);
        } else if (event.target.classList.contains('toggle-complete')) {
            toggleTaskComplete(event.target.parentElement);
        }
    });

    loadTasks();
});

function addTask(taskText) {
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };
    saveTask(task);
    renderTask(task);
}

function renderTask(task) {
    const taskList = document.getElementById('tasks');
    const taskItem = document.createElement('li');
    taskItem.dataset.id = task.id;
    taskItem.innerHTML = `
        <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
        <button class="toggle-complete">${task.completed ? 'Undo' : 'Complete'}</button>
        <button class="delete-task">Delete</button>
    `;
    taskList.appendChild(taskItem);
}

function deleteTask(taskElement) {
    const taskId = taskElement.dataset.id;
    removeTask(taskId);
    taskElement.remove();
}

function toggleTaskComplete(taskElement) {
    const taskId = taskElement.dataset.id;
    const taskText = taskElement.querySelector('.task-text');
    const task = getTask(taskId);
    task.completed = !task.completed;
    saveTask(task);
    taskText.classList.toggle('completed');
    taskElement.querySelector('.toggle-complete').textContent = task.completed ? 'Undo' : 'Complete';
}
