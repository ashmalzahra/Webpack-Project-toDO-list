/** @jest-environment jsdom */
const Task = require('./utils/Add&Remove.js');
const getFilledStorage = require('./__mocks__/filledTaskList.js');
const domContainer = require('./__mocks__/taskListDom.js');

const filledTaskList = getFilledStorage();

describe('TaskList', () => {
  const task = new Task(filledTaskList);
  const ulList = domContainer();

  test('Modify the li checkbox from false to true', () => {
    task.complete(1, ulList);
    expect(document.getElementById('to-do-1').checked).toBe(true);
  });

});