import _ from 'lodash';
import '../css/style.css';

const ul = document.querySelector('.todo-lists ul');
const tasks = [
  {
    description: 'Organize your workspace',
    completed: false,
    index: 0
  },
  {
    description: 'Catch up on household chores',
    completed: false,
    index: 1
  },
  {
    description: 'Schedule time for self-care',
    completed: true,
    index: 2
  },
  {
    description: 'Connect with loved ones',
    completed: false,
    index: 5
  },
  {
    description: 'Complete a project at work',
    completed: false,
    index: 6
  }
];

const createTaskList = (tasks) => {
  if (tasks.length === 0 ) {
    return null;
  }

  tasks.forEach(task => {
    ul.appendChild(createTaskListItem(task));
  });
};

const createTaskListItem = (singleTak) => {
  const li = document.createElement('li');
  li.className = 'list-item border-bottom';
  const taskCkecksSpan = document.createElement('span');
  taskCkecksSpan.className = 'task-ckecks';

  const checkboxInput = document.createElement('input');
  checkboxInput.type = 'checkbox';
  checkboxInput.className = 'check-box';
  (singleTak.completed === true) ? checkboxInput.setAttribute('checked','') : '';
  checkboxInput.value = singleTak.index;

  const descriptionSpan = document.createElement('span');
  descriptionSpan.className = (singleTak.completed === false) ? 'description' : 'description completed';
  descriptionSpan.textContent = singleTak.description;

  const taskInfoSpan = document.createElement('span');
  taskInfoSpan.className = 'task-info';

  taskCkecksSpan.appendChild(checkboxInput);
  taskCkecksSpan.appendChild(descriptionSpan);
  li.appendChild(taskCkecksSpan);
  li.appendChild(taskInfoSpan);

  return li;
};

createTaskList(tasks);