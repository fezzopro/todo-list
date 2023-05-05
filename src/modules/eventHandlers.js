/*eslint import/no-cycle: [2, { maxDepth: 1 }]*/
import storage from './storage.js';
import components from './components.js';

class EventHandlers {
  constructor() {
    this.description = '';
    this.completed = '';
    this.index = '';
  }

  newTaskEvent = () => {
    const task = document.querySelector('.form-input').value;
    this.description = task;
    this.completed = false;
    this.index = storage.readLocalStorage().length;

    if (task.length > 0) {
      storage.saveToLocalStorage({
        description: this.description,
        completed: this.completed,
        index: this.index,
      });
      components.createTaskList(storage.readLocalStorage());
    }
  };

  deleteTaskEvent = (bin) => {
    storage.deleteFromLocalStorage(bin.firstChild.value);
    components.createTaskList(storage.readLocalStorage());
  };

  clearAllTaskEvent = () => {
    storage.deleteAllCompleteFromLocalStorage();
    components.createTaskList(storage.readLocalStorage());
  };

  updateTaskEvent = (nodes) => {
    storage.updateTaskDescription(nodes[1].value, nodes[0].textContent);
  };
}

export default new EventHandlers();