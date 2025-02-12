document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('#task-filter button');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterTasks(button.id);
        });
    });
});

function filterTasks(filter) {
    const tasks = document.querySelectorAll('#tasks li');
    tasks.forEach(task => {
        switch (filter) {
            case 'filter-all':
                task.style.display = '';
                break;
            case 'filter-completed':
                task.style.display = task.querySelector('.task-text').classList.contains('completed') ? '' : 'none';
                break;
            case 'filter-pending':
                task.style.display = task.querySelector('.task-text').classList.contains('completed') ? 'none' : '';
                break;
        }
    });
}
