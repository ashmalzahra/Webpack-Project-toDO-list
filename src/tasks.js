

export function updateLocalStorageFromHTML(tasks) {
    const newTasks = [];
    document.querySelectorAll('.task').forEach((HTMLtask) => {
      const i = 0;
      newTasks.description = HTMLtask.querySelector('[type="text"]').value;
      newTasks.index = i;
      newTasks.completed = HTMLtask.querySelector('[type="checkbox"]').checked;
    });
    tasks = newTasks;
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
  }

export function updateIndexes(tasks) {
    const tasksIndex = [];
    for (let i = 1; i <= tasks.length; i++) {
      let min = tasks[0];
      for (let n = 0; n < tasks.length; n++) {
        if (min.index >= tasks[n].index) {
          min = tasks[n];
        }
      }
      min.index = i;
      tasksIndex.push(min);
      tasks.splice(tasks.indexOf(min), 1);
    }
    tasks = tasksIndex;
    if (tasksIndex !== []) {
      window.localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

export function addTask (tasks){
    const addData = document.getElementById('data')
if(addData.value !== ''){
    const taskItem = {
        index: tasks.length + 1,
        description: addData.value,
        completed: false,
    };
    tasks.push(taskItem);
    if (tasks[0].description !== '') { window.localStorage.setItem('tasks', JSON.stringify(tasks)); }
}
}

export function removeTasks(tasks) {
    function completed(object) { return object.completed === false; }
    tasks = tasks.filter(completed);
    /* update indexes */
    updateIndexes(tasks);
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  export function removeTask(task, tasks) {
    function is(object) { return object === task; }
    console.log(tasks);
    tasks.filter(is);
    console.log(tasks);
    updateLocalStorageFromHTML(tasks);
  }
  
  export function editTask(htmlTask, taskItem, tasks) {
    taskItem.description = htmlTask.value;
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
  }