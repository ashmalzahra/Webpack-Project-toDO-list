const domContainer = () => {
  document.body.innerHTML = `<div id="to-do">
      <ul id="list">
        <li id="task-0">
          <input id='to-do-0' type='checkbox'></input>
          <input id='text-0' type='text' value='this is a new'></input>
        </li>
        <li id="task-1">
          <input id='to-do-1' type='checkbox'></input>
          <input id='text-1' type='text' value='this is a second new'></input>
        </li>
      </ul>
    </div>`;
  const ulList = document.getElementById('list');
  return ulList;
};

module.exports = domContainer;