class Storage {
  constructor() {
    this.TASK_COLLECTION_NAME = 'collectionOfTasks';
    this.localStorage = localStorage;
    if (!this.isLocalStorage()) {
      this.createlocalStorage();
    }
  }

  isLocalStorage = () => {
    const storage = this.localStorage.getItem(this.TASK_COLLECTION_NAME);
    return storage;
  }

  readLocalStorage = () => {
    const storage = JSON.parse(this.localStorage.getItem(this.TASK_COLLECTION_NAME));
    return storage;
  }

  createlocalStorage = () => {
    this.localStorage.setItem(this.TASK_COLLECTION_NAME, JSON.stringify([]));
  }

  saveToLocalStorage = (task) => {
    if (!task) {
      throw new Error('Empty Task');
    }
    this.localStorage.setItem(this.TASK_COLLECTION_NAME,
      JSON.stringify([...this.readLocalStorage(), task]));
    return this.readLocalStorage();
  }

  saveAsLocalSorage = (tasks) => {
    this.localStorage.setItem(this.TASK_COLLECTION_NAME, JSON.stringify(tasks));
  }

  deleteFromLocalStorage = (taskId) => {
    if (this.readLocalStorage() === null) {
      throw new Error('Unable To Delete From Empty Task Storage');
    }
    const fileteredtasks = this.readLocalStorage()
      .filter((task) => task.index !== Number.parseInt(taskId, 10));
    for (let index = 0; index < fileteredtasks.length; index += 1) {
      fileteredtasks[index].index = index + 1;
    }
    this.saveAsLocalSorage(fileteredtasks);
    return fileteredtasks;
  };

  deleteAllCompleteFromLocalStorage = () => {
    const fileteredtasks = this.readLocalStorage().filter((task) => task.completed === false);
    for (let index = 0; index < fileteredtasks.length; index += 1) {
      fileteredtasks[index].index = index + 1;
    }
    this.saveAsLocalSorage(fileteredtasks);
    return this.readLocalStorage();
  };

  getCollectionName = () => this.TASK_COLLECTION_NAME;

  updateTaskDescription = (index, description) => {
    const updatedTasks = this.readLocalStorage();
    updatedTasks[index - 1].description = description;
    this.saveAsLocalSorage(updatedTasks);
    return this.readLocalStorage()[index - 1];
  };

  updateTaskCompleteStatus = (index) => {
    const updatedTasks = this.readLocalStorage();
    updatedTasks.find((object, i) => { // eslint-disable-line array-callback-return
      if (object.index === Number.parseInt(index, 10)) {
        updatedTasks[i]
          .completed = (object.completed) ? false : true; // eslint-disable-line no-unneeded-ternary
      }
    });
    this.saveAsLocalSorage(updatedTasks);
    return this.readLocalStorage();
  };
}
export default new Storage();