function saveTask(task) {
    const tasks = getTasks();
    const existingTaskIndex = tasks.findIndex(t => t.id === task.id);
    if (existingTaskIndex > -1) {
        tasks[existingTaskIndex] = task;
    } else {
        tasks.push(task);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function getTask(taskId) {
    return getTasks().find(task => task.id == taskId);
}

function removeTask(taskId) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.id != taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = getTasks();
    tasks.forEach(task => renderTask(task));
}
