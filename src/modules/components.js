import eventHandlers from "./eventHandlers";

class Components {
  constructor() { 
    this.clearCompletedListner();
  }
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
    
    const taskDescriptionInput = document.createElement('input');
    taskDescriptionInput.setAttribute('type', 'hidden');
    taskDescriptionInput.value = singleTak.index;

    const taskInfoSpan = document.createElement('span');
    taskInfoSpan.className = 'task-info';

    descriptionSpan.appendChild(taskDescriptionInput);

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
    this.editEventListner();
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

  clearCompletedListner = () => {
    document.querySelector('.clear-btn').addEventListener('click', (event) => {
      event.preventDefault();
      eventHandlers.clearAllTaskEvent();
    });
  };

  editEventListner = () =>{
    const descriptions = document.querySelectorAll('.description');

    descriptions.forEach(description => {
      description.addEventListener('keyup', (event)=>{ 
        if (event.key !== 'Enter') {
          eventHandlers.updateTaskEvent(description.childNodes); 
        }
      });
    });
  };
}

export default new Components();