import eventHandlers from "./eventHandlers";

class Components {
  constructor() { }
  createTaskListItem = (singleTak) => {
    const li = document.createElement('li');
    li.className = 'list-item border-bottom';
    const taskCkecksSpan = document.createElement('span');
    taskCkecksSpan.className = 'task-ckecks';

    const checkboxInput = document.createElement('input');
    checkboxInput.type = 'checkbox';
    checkboxInput.className = 'check-box';
    if (singleTak.completed === true) { checkboxInput.setAttribute('checked', ''); }
    checkboxInput.value = singleTak.index;

    const descriptionSpan = document.createElement('span');
    descriptionSpan.className = (singleTak.completed === false) ? 'description' : 'description completed';
    descriptionSpan.setAttribute('contenteditable', true)
    descriptionSpan.textContent = singleTak.description;

    const iconsSpan = document.createElement('span');
    iconsSpan.className = 'task-icons';

    const taskBin = document.createElement('span');
    taskBin.className = 'task-bin';
    
    const taskBinInput = document.createElement('input');
    taskBinInput.setAttribute('type', 'hidden');
    taskBinInput.value = singleTak.index;

    const taskInfoSpan = document.createElement('span');
    taskInfoSpan.className = 'task-info';

    taskBin.appendChild(taskBinInput);

    taskCkecksSpan.appendChild(checkboxInput);
    taskCkecksSpan.appendChild(descriptionSpan);
    li.appendChild(taskCkecksSpan);
    iconsSpan.appendChild(taskBin);
    iconsSpan.appendChild(taskInfoSpan);
    li.appendChild(iconsSpan);
    return li;
  }

  createTaskList = (StoredTasks) => {
    const ul = document.querySelector('.todo-lists ul');
    ul.textContent ='';
    if (StoredTasks.length > 0) {
      StoredTasks.forEach((singleTask) => {
        ul.appendChild(this.createTaskListItem(singleTask));
      });
    }

    this.eventListners();
  }
  
  eventListners = () => {
    this.formEventListner();
    this.deleteEventListner();
  };

  formEventListner = () => {
    const form = document.querySelector('.input-section');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      eventHandlers.newTaskEvent();
    });
    form.reset();
  };

  deleteEventListner = () => {
    const bins = document.querySelectorAll('.task-bin');

    bins.forEach((bin) => {
      bin.addEventListener('click', () => {
        eventHandlers.deleteTaskEvent(bin);
      });
    });
    
  };
}

export default new Components();