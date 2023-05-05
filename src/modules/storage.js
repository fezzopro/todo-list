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
    this.localStorage.setItem(this.TASK_COLLECTION_NAME,
      JSON.stringify([...this.readLocalStorage(), task]));
  }

  saveAsLocalSorage = (tasks) => {
    this.localStorage.setItem(this.TASK_COLLECTION_NAME, JSON.stringify(tasks));
  }

  deleteFromLocalStorage = (taskId) => {
    const fileteredtasks = this.readLocalStorage().filter((task) => task.index != taskId);
    for (let index = 0; index < fileteredtasks.length; index++) {
      fileteredtasks[index].index = index;
    }
    this.saveAsLocalSorage(fileteredtasks);
  };

  getCollectionName = () => this.TASK_COLLECTION_NAME;
}
export default new Storage();