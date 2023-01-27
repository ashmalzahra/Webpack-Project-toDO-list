export default class ToDoList {
  constructor(list) {
    this.toDoList = list;
  }

  addToDo(task, container) {
    const newTask = {
      description: task,
      completed: false,
      index: 0,
    };
    this.toDoList.push(newTask);
    this.update(container);
  }

  update(container) {
    this.toDoList.map((item, i) => {
      item.index = i;
      return item;
    });
    this.toLocalStorage();
    this.print(container);
  }

  toLocalStorage() {
    const stringToDoList = JSON.stringify(this.toDoList);
    localStorage.setItem('toDoList', stringToDoList);
  }

  getLocalStorage() {
    if (localStorage.toDoList) {
      const from = JSON.parse(localStorage.toDoList);
      this.toDoList = from;
    }
  }

  remove(index, container) {
    this.toDoList.splice(index, 1);
    this.update(container);
  }

  print(container) {
    container.innerHTML = '';
    let checked = 0;
    this.getLocalStorage();
    this.toDoList.map((item) => {
      const toDo = document.createElement('li');
      if (item.completed) {
        toDo.classList.add('item-to-do', 'checked');
        checked += 1;
      } else {
        toDo.className = 'item-to-do';
      }
      const checkBox = document.createElement('input');
      checkBox.setAttribute('type', 'checkbox');
      checkBox.id = `to-do-${item.index}`;
      checkBox.checked = item.completed;
      checkBox.addEventListener('change', () => {
        toDo.classList.toggle('checked');
        item.completed = checkBox.checked;
        this.update(container);
      });
      toDo.append(checkBox);
      const inputText = document.createElement('input');
      inputText.value = item.description;
      inputText.className = 'input-to-do';
      inputText.addEventListener('focusin', () => {
        toDo.classList.toggle('edit');
      });
      inputText.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          toDo.classList.toggle('edit');
          item.description = event.currentTarget.value;
          this.update(container);
        }
      });
      toDo.append(inputText);
      const toDoListIcon = document.createElement('div');
      toDoListIcon.innerHTML = `<i class="fa-solid fa-ellipsis-vertical"></i>
        `;
      toDoListIcon.classList.add('to-do-icon', 'drag');
      toDo.append(toDoListIcon);
      const removeBtn = document.createElement('div');
      removeBtn.classList.add('to-do-icon', 'remove');
      removeBtn.innerHTML = `<i class="fa-solid fa-trash"></i>
        `;
      removeBtn.addEventListener('click', () => {
        this.remove(item.index, container);
      });
      toDo.append(removeBtn);
      return container.append(toDo);
    });
    if (checked >= 1) {
      const clearAll = document.getElementById('clear-all');
      if (clearAll.classList.contains('disabled')) {
        clearAll.classList.remove('disabled');
      }
    } else {
      const clearAll = document.getElementById('clear-all');
      if (!clearAll.classList.contains('disabled')) {
        clearAll.classList.add('disabled');
      }
    }
  }

  clearAllCompleted(container) {
    container.innerHTML = '';
    const newArray = this.toDoList.filter((item) => !item.completed);
    this.toDoList = newArray;
    this.update(container);
  }
}