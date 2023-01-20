import './style.css';
import {
  updateIndexes, addTask, removeTask, editTask,
} from './tasks';

const data = document.querySelector('.to-do-list');

let tasks = [];

function updateTasksArray() {
  tasks = JSON.parse(window.localStorage.getItem('tasks'));
}

function populateHTML(tasks) {
  const lis = document.querySelectorAll('.li');
  lis.forEach((li) => li.remove());

  for (let i = 1; i <= tasks.length; i += 1) {
    const li = document.createElement('div');
    li.classList.add('li');
    let taskToAdd = {};
    tasks.forEach((task) => {
      if (task.index === i) {
        taskToAdd = task;
      }
    });

    li.innerHTML = `
      <span class="task">
      <input type="checkbox"  name="${taskToAdd.index}" >
      <input type="text" id="${taskToAdd.index}" value="${taskToAdd.description}">
      <button type="button" id="${taskToAdd.index}button"> remove </button>
      </span>
    `;
    data.appendChild(li);

    const removebtn = document.getElementById(`${taskToAdd.index}button`);
    removebtn.addEventListener('click', () => { li.remove(); removeTask(); updateTasksArray(); });

    const htmlTask = document.getElementById(`${taskToAdd.index}`);
    htmlTask.addEventListener('keypress', () => {
      editTask(htmlTask, taskToAdd);
    });
  }
}

window.addEventListener('load', () => {
  if (window.localStorage.getItem('tasks') !== null && JSON.parse(window.localStorage.getItem('tasks')) !== []) {
    updateIndexes(JSON.parse(window.localStorage.getItem('tasks')));
    tasks = JSON.parse(window.localStorage.getItem('tasks'));
    populateHTML(JSON.parse(window.localStorage.getItem('tasks')));
  }
});

const addData = document.getElementById('data');
addData.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && addData.value !== '') {
    addTask(tasks);
    populateHTML(tasks);
  }
});