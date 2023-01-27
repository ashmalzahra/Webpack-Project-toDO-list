import './style.css';
import ToDoList from './toDoList.js';

const ToDoListArray = new ToDoList([]);

const init = () => {
  const toDoList = document.getElementById('to-do-list');
  const toDoHeader = document.createElement('div');
  toDoHeader.className = 'to-do-header';
  toDoHeader.innerHTML = `<h4>Today's To Do</h4>
    <div class="icon-container">
    <i class="fa-solid fa-arrows-rotate"></i>
    </div>`;
  toDoList.append(toDoHeader);
  const inputToDoContainer = document.createElement('div');
  const inputToDo = document.createElement('input');
  inputToDo.id = 'to-do-input';
  inputToDo.setAttribute('type', 'text');
  inputToDo.setAttribute('placeholder', 'add to your list...');
  const clearAllBtn = document.createElement('div');
  clearAllBtn.classList.add('remove-btn', 'disabled');
  clearAllBtn.id = 'clear-all';
  clearAllBtn.innerHTML = 'Clear all completed';
  const ulList = document.createElement('ul');
  ulList.id = 'list';
  inputToDoContainer.id = 'to-do-input-container';
  inputToDoContainer.innerHTML = `
  <i class="fa-solid fa-arrow-right-to-bracket ash icon n-icon enter"></i>`;
  inputToDo.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      ToDoListArray.addToDo(event.currentTarget.value, ulList);
      event.currentTarget.value = '';
    }
  });
  clearAllBtn.addEventListener('click', () => {
    ToDoListArray.clearAllCompleted(ulList);
  });
  inputToDoContainer.prepend(inputToDo);
  toDoList.append(inputToDo);
  toDoList.append(ulList);
  toDoList.append(clearAllBtn);
  ToDoListArray.print(ulList);
};

init();