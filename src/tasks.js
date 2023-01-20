export function updateLocalStorageFromHTML(tasks) {
  const newTasks = [];
  let i = 1;
  document.querySelectorAll('.task').forEach((HTMLtask) => {
    const object = {};
    object.description = HTMLtask.querySelector('[type="text"]').value;
    object.index = i;
    object.completed = HTMLtask.querySelector('[type="checkbox"]').checked;
    newTasks.push(object);
    i += 1;
  });
  tasks = newTasks;
  window.localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function updateIndexes(tasks) {
  tasks.forEach((task) => {
    task.index = tasks.indexOf(task) + 1;
  });
  window.localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function addTask(tasks) {
  const addData = document.getElementById('data');
  if (addData.value !== '') {
    const taskItem = {
      index: tasks.length + 1,
      description: addData.value,
      completed: false,
    };
    tasks.push(taskItem);
    if (tasks[0].description !== '') { window.localStorage.setItem('tasks', JSON.stringify(tasks)); }
  }
  addData.value = null;
}

export function removeTask(tasks) {
  updateLocalStorageFromHTML(tasks);
}

export function editTask(htmlTask, Item, tasks) {
  Item.description = htmlTask.value;
  window.localStorage.setItem('tasks', JSON.stringify(tasks));
}