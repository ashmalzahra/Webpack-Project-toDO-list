import './style.css';
import { updateIndexes , addTask, removeTasks, removeTask, editTask } from './tasks';

const data = document.querySelector('.to-do-list');

let tasks = [];
if (tasks !== []) { addTask(tasks); }
const button = document.querySelector('button');
button.addEventListener('click', () => {
  removeTasks(tasks); console.log(tasks);
  updateIndexes(tasks);
});

function createTask() {
  const list = document.querySelectorAll('.li');
  list.forEach((li) => li.remove());

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
            <button type="button" id="${taskToAdd.index}button"> remove </button>
            </span>
            <i class="fa-solid fa-ellipsis-vertical"></i>

        `;

    data.appendChild(li);
    const removebtn = document.getElementById(`${taskToAdd.index}button`);
    removebtn.addEventListener('click', () => { li.remove(); removeTask(taskToAdd, tasks); });
    const htmlTask = document.getElementById(`${taskToAdd.index}`);
    htmlTask.addEventListener('keypress', () => {
      editTask(htmlTask, taskToAdd, tasks);
    });
  }
}

window.addEventListener('load', () => {
  console.log(window.localStorage.getItem('tasks'));
  if (window.localStorage.getItem('tasks') !== null) {
    tasks = JSON.parse(window.localStorage.getItem('tasks'));
    createTask(tasks);
  }
});

const addData = document.getElementById('addTask');
addData.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && addData.value !== '') {
    addTask(tasks);
    createTask(tasks);
  }
});