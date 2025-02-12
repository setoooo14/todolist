document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    updateTaskCounter();
    updateProgressBar();
    const addTaskButton = document.getElementById('add-task');
    const newTaskInput = document.getElementById('new-task');
    const taskList = document.getElementById('tasks');
    const taskCounter = document.getElementById('task-counter');
    const progressBar = document.getElementById('progress-bar');

    addTaskButton.addEventListener('click', () => {
        const taskText = newTaskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            newTaskInput.value = '';
        }
    });

    const editTaskModal = document.getElementById('edit-task-modal');
    const editTaskInput = document.getElementById('edit-task-input');
    const saveButton = document.getElementById('save-task');
    const cancelButton = document.getElementById('cancel-task');
    let currentEditTaskId = null;

    taskList.addEventListener('click', (event) => {
        if (event.target.classList.contains('edit-task')) {
            openEditTaskModal(event.target.closest('li'));
        }
    });

    document.querySelectorAll('.close-button').forEach(button => {
        button.addEventListener('click', () => {
            editTaskModal.style.display = 'none';
        });
    });

    saveButton.addEventListener('click', () => {
        const updatedText = editTaskInput.value.trim();
        if (updatedText && currentEditTaskId) {
            updateTask(currentEditTaskId, updatedText);
            editTaskModal.style.display = 'none';
        }
    });

    cancelButton.addEventListener('click', () => {
        editTaskModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === editTaskModal) {
            editTaskModal.style.display = 'none';
        }
    });

    function openEditTaskModal(taskElement) {
        const taskId = taskElement.dataset.id;
        const task = getTask(taskId);
        currentEditTaskId = taskId;
        editTaskInput.value = task.text;
        editTaskModal.style.display = 'block';
    }

    function updateTask(taskId, updatedText) {
        const task = getTask(taskId);
        task.text = updatedText;
        saveTask(task);
        const taskElement = document.querySelector(`li[data-id='${taskId}'] .task-text`);
        taskElement.textContent = updatedText;
    }

    newTaskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTaskButton.click();
        }
    });

    taskList.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-task')) {
            deleteTask(event.target.closest('li'));
        } else if (event.target.classList.contains('toggle-complete')) {
            toggleTaskComplete(event.target.closest('li'));
        }
    });


    loadTasks();
    updateTaskCounter();
    updateProgressBar();
});

function addTask(taskText) {
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };
    saveTask(task);
    renderTask(task);
    updateTaskCounter();
    updateProgressBar();
}

function renderTask(task) {
    const taskList = document.getElementById('tasks');
    const taskItem = document.createElement('li');
    taskItem.dataset.id = task.id;
    taskItem.innerHTML = `
        <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
        <div class="task-buttons">
            <button class="toggle-complete">${task.completed ? 'Undo' : 'Complete'}</button>
            <button class="edit-task">Edit</button>
            <button class="delete-task">Delete</button>
        </div>
    `;
    taskList.appendChild(taskItem);
}

function deleteTask(taskElement) {
    const taskId = taskElement.dataset.id;
    removeTask(taskId);
    taskElement.remove();
    updateTaskCounter();
    updateProgressBar();
}

function toggleTaskComplete(taskElement) {
    const taskId = taskElement.dataset.id;
    const taskText = taskElement.querySelector('.task-text');
    const task = getTask(taskId);
    task.completed = !task.completed;
    saveTask(task);
    taskText.classList.toggle('completed');
    taskElement.querySelector('.toggle-complete').textContent = task.completed ? 'Undo' : 'Complete';
    updateTaskCounter();
    updateProgressBar();
}


function updateTaskCounter() {
    const tasks = getTasks();
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const taskCounter = document.getElementById('task-counter');
    taskCounter.textContent = `${completedTasks} tasks completed out of ${totalTasks}`;
}

function updateProgressBar() {
    const tasks = getTasks();
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progressBar = document.getElementById('progress-bar');
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    progressBar.style.width = `${progress}%`;
}
