module.exports = class Task {
    constructor(list) {
      this.localStorageList = list;
    }
  
    toLocalStorage = () => {
      const stringToDoList = JSON.stringify(this.localStorageList);
      localStorage.setItem('toDoList', stringToDoList);
    };
  
    print = (ulList) => {
      ulList.innerHTML = '';
      this.localStorageList.map((item) => {
        const toDo = document.createElement('li');
        if (item.completed) {
          toDo.classList.add('item-to-do', 'checked');
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
          this.update(ulList);
        });
        toDo.append(checkBox);
        const inputText = document.createElement('input');
        inputText.value = item.description;
        inputText.id = `text-${item.index}`;
        inputText.className = 'input-to-do';
        inputText.addEventListener('focusin', () => {
          toDo.classList.toggle('edit');
        });
        inputText.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            toDo.classList.toggle('edit');
            item.description = event.currentTarget.value;
            this.update(ulList);
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
        toDo.append(removeBtn);
        return ulList.append(toDo);
      });
    };
  
    update = (ulList) => {
      this.localStorageList.map((item, i) => {
        item.index = i;
        return item;
      });
      this.toLocalStorage();
      this.print(ulList);
    };
  
    addToDo = (task, ulList) => {
      const newTask = {
        description: task,
        completed: false,
        index: 0,
      };
      this.localStorageList.push(newTask);
      this.update(ulList);
    };
  
    remove = (index, ulList) => {
      this.localStorageList.splice(index, 1);
      this.update(ulList);
    };
  
    complete = (index, ulList) => {
      this.localStorageList[index].completed = true;
      this.update(ulList);
    };
  
    edit = (index, ulList) => {
      this.localStorageList[index].description = 'New text';
      this.update(ulList);
    }
  
    clearAllCompleted(ulList) {
      ulList.innerHTML = '';
      const newArray = this.localStorageList.filter((item) => !item.completed);
      this.localStorageList = newArray;
      this.update(ulList);
    }
  };