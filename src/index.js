import _ from 'lodash';
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
{
  description: 'organize closet',
  completed: false,
  index: 3,
},
];


let html = '';

tasks.forEach((task) => {
  html += `
        <div class="list">
            <input type="checkbox" id="${task.index}" class="item">
            <p class="item-text">${task.description}</p>
            <i class="fa-light fa-ellipsis-vertical"></i>
        </div>`;
});

data.innerHTML = html;