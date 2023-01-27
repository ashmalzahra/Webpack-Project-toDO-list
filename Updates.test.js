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
  test('Modify the description value of the input text', () => {
    task.edit(1, ulList);
    expect(document.getElementById('text-1').value).toBe('New text');
  });
  test('Delete the complete task on list, current : 2 => expected 1', () => {
    task.clearAllCompleted(ulList);
    expect(ulList.children).toHaveLength(1);
  });
});