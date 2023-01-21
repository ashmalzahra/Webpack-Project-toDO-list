import './style.css';
import TodoList from './modules/tasks';
import toggleStatus from './modules/clear';

let todolist = [];
if (JSON.parse(localStorage.getItem('todolist'))) {
  todolist = JSON.parse(localStorage.getItem('todolist')).todolist;
}
const newTodoList = new TodoList(todolist);
const todoItems = document.getElementsByClassName('to-do-list')[0];

const sortedTodoList = todolist.sort((a, b) => a.index - b.index);

sortedTodoList.forEach((todo) => {
  const task = document.createElement('li');
  // task.classList.add('task');
  task.id = todo.index;
  task.innerHTML = `<span class="task"><input type="checkbox" name="${todo.index}" class="check">
  <label class = "${todo.index} task-desc black" for="${todo.index}">${todo.description}</label>
  </span>
  <div class="remove-button">
    <i class='fa fa-trash ash'></i>
  <div>`;
  todoItems.appendChild(task);
});

const enter = document.querySelector('.enter');

const addTask = (e) => {
  e.preventDefault();
  const newItem = document.getElementById('data');
  if (newItem.value) {
    const description = newItem.value.trim();
    const index = todolist.length + 1;
    newTodoList.addTask(description, index);
    localStorage.setItem('todolist', JSON.stringify(newTodoList));
    newItem.value = '';
  }
  window.location.reload();
};

enter.addEventListener('click', addTask);

const editTaskButton = document.querySelectorAll('.task');
editTaskButton.forEach((elm) => {
  const element = elm.children[1];
  element.addEventListener('click', () => {
    element.contentEditable = true;
    element.focus();
  });

  element.addEventListener('focusout', () => {
    if (element.innerHTML) {
      newTodoList.editTask(element.innerHTML, element.className);
      localStorage.setItem('todolist', JSON.stringify(newTodoList));
      element.contentEditable = false;
    }
  });
  element.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && element.innerHTML) {
      newTodoList.editTask(element.innerHTML, element.className);
      localStorage.setItem('todolist', JSON.stringify(newTodoList));
      element.contentEditable = false;
    }
  });
});

const removeButton = document.querySelectorAll('.remove-button');

const removeTask = (e) => {
  const index = e.target.parentNode.parentNode.id;
  newTodoList.removeTask(index);
  localStorage.setItem('todolist', JSON.stringify(newTodoList));
  window.location.reload();
};

removeButton.forEach((element) => element.addEventListener('click', removeTask));

const checkBox = (e) => {
  const i = e.target.name;
  const task = newTodoList.getTaskByIndex(i);
  toggleStatus(task);
  newTodoList.todolist[i - 1] = task;
  localStorage.setItem('todolist', JSON.stringify(newTodoList));
};

const tasks = document.querySelectorAll('.task');
tasks.forEach((e) => {
  const checkInput = e.childNodes[0];
  checkInput.addEventListener('change', checkBox);
});

const clearButton = document.getElementById('clear');

const clearCompleted = () => {
  const filteredList = newTodoList.todolist.filter((e) => e.completed === false);
  const sortedList = filteredList.map((object, i) => {
    const index = i + 1;
    return { ...object, index };
  });
  newTodoList.todolist = sortedList;
  localStorage.setItem('todolist', JSON.stringify(newTodoList));
  window.location.reload();
};

clearButton.addEventListener('click', clearCompleted);