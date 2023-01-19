import './style.css';

const data = document.querySelector('.to-do-list');

const tasks = [{
  description: 'wash the dishes',
  completed: false,
  index: 1,
},
{
  description: 'complete To Do list project',
  completed: false,
  index: 2,
},

];

function createTask() {
  for (let i = 1; i <= tasks.length; i += 1) {
    const li = document.createElement('div');
    li.classList.add('li');
    li.id = 'list-item';
    let taskToAdd = {};
    tasks.forEach((task) => {
      if (task.index === i) {
        taskToAdd = task;
      }
    });

    li.innerHTML = `
            <span>
            <input type="checkbox" id="${taskToAdd.index}">
            <label for="${taskToAdd.index}"> ${taskToAdd.description}</label>
            </span>
            <i class="fa-solid fa-ellipsis-vertical"></i>
        `;

    data.appendChild(li);
  }
}

window.addEventListener('load', createTask());
