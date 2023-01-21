import Todo from './todo';

export default class TodoList {
  constructor(todolist) {
    this.todolist = todolist;
  }

  addTask(description, index) {
    const newTask = new Todo(description, index);
    this.todolist.push(newTask);
  }

  removeTask(index) {
    this.todolist.splice((index - 1), 1);
    const updatedTodoList = this.todolist.map((object) => {
      if (object.index > index) {
        const ind = object.index - 1;
        return { ...object, index: ind };
      }
      return object;
    });
    this.todolist = updatedTodoList;
  }

  editTask(description, index) {
    const updatedTodoList = this.todolist.map((object) => {
      if (parseInt(object.index, 10) === parseInt(index, 10)) {
        return { ...object, description };
      }
      return object;
    });
    this.todolist = updatedTodoList;
  }

  getTaskByIndex(index) {
    return this.todolist.filter((obj) => parseInt(obj.index, 10) === parseInt(index, 10))[0];
  }
}