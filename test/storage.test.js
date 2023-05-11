import storage from '../src/modules/storage.js';

describe('Storage Module Test Suit', () => {
  beforeEach(() => {
    storage.createlocalStorage();
  });

  afterEach(() => {
    localStorage.removeItem(storage.getCollectionName());
  });

  test('storage class must always create a local storage', () => {
    expect(storage.localStorage.collectionOfTasks).toBe('[]');
  });

  test('isLocalStorage', () => {
    localStorage.removeItem(storage.getCollectionName());
    expect(!storage.isLocalStorage()).toBe(true);
  });

  const mockId = storage.readLocalStorage().length;
  const mockTask = {
    description: 'Clean my work place',
    completed: false,
    index: 0,
  };

  test('isLocalStorage', () => {
    storage.saveAsLocalSorage(mockTask);
    expect(storage.isLocalStorage().length).toBeGreaterThan(0);
  });

  test('saveAsLocalSorage', () => {
    storage.saveAsLocalSorage(mockTask);
    expect(!storage.isLocalStorage()).toBe(false);
  });

  test('isLocalStorage', () => {
    storage.saveAsLocalSorage(mockTask);
    expect(storage.isLocalStorage().length).toBeGreaterThan(0);
  });

  test('saveAsLocalSorage', () => {
    storage.saveAsLocalSorage(mockTask);
    expect(!storage.isLocalStorage()).toBe(false);
  });

  test('readLocalStorage', () => {
    localStorage.removeItem(storage.getCollectionName());
    expect(storage.readLocalStorage()).toBe(null);
    storage.createlocalStorage();
    expect(storage.readLocalStorage()).not.toBe(null);
    expect(storage.readLocalStorage().length).toBe(0);
    storage.saveToLocalStorage(mockTask);
    expect(storage.readLocalStorage().length).toBeGreaterThan(0);
  });

  test('saveToLocalStorage', () => {
    const tmpSaveToLocalStorage = () => {
      storage.saveToLocalStorage();
    };
    expect(tmpSaveToLocalStorage).toThrow(new Error('Empty Task'));
  
    storage.saveToLocalStorage(mockTask);
    expect(storage.saveToLocalStorage(mockTask).length).not.toBe(0);
  });

  test('deleteFromLocalStorage', () => {
    // Delete from empty localStorage
    const tmpDelete = () => {
      localStorage.removeItem(storage.getCollectionName());
      storage.deleteFromLocalStorage(mockId);
    };
    expect(tmpDelete).toThrow(new Error('Unable To Delete From Empty Task Storage'));

    // Create a local storage and delete from them
    storage.createlocalStorage();
    const idToDelete = mockTask.index;
    storage.saveToLocalStorage(mockTask);
    mockTask.index = storage.readLocalStorage().length;
    mockTask.description = `${mockTask.description} - ${storage.readLocalStorage().length}`;
    storage.saveToLocalStorage(mockTask);
    mockTask.index = storage.readLocalStorage().length;
    mockTask.description = `${mockTask.description} - ${storage.readLocalStorage().length}`;
    storage.saveToLocalStorage(mockTask);

    expect(storage.readLocalStorage().length).toBe(3);
    // delete task and expected returned results
    expect(storage.deleteFromLocalStorage(idToDelete).length).toBe(2);
  });

  test('deleteAllCompleteFromLocalStorage', () => {
    // save task to the local storage
    mockTask.index = storage.readLocalStorage().length;
    mockTask.description = `${mockTask.description} - ${storage.readLocalStorage().length}`;
    storage.saveToLocalStorage(mockTask);
    mockTask.index = storage.readLocalStorage().length;
    mockTask.description = `${mockTask.description} - ${storage.readLocalStorage().length}`;
    storage.saveToLocalStorage(mockTask);
    mockTask.index = storage.readLocalStorage().length;
    mockTask.description = `${mockTask.description} - ${storage.readLocalStorage().length}`;
    storage.saveToLocalStorage(mockTask);

    // update task with index 2, as completed
    storage.updateTaskCompleteStatus(2);
    expect(storage.deleteAllCompleteFromLocalStorage().length).toBe(2);
  });

  test('updateTaskDescription', () => {
    // save task to the local storage
    storage.saveToLocalStorage(mockTask);
    mockTask.index = storage.readLocalStorage().length;
    mockTask.description = `${mockTask.description} - ${storage.readLocalStorage().length}`;
    storage.saveToLocalStorage(mockTask);
    mockTask.index = storage.readLocalStorage().length;
    mockTask.description = `${mockTask.description} - ${storage.readLocalStorage().length}`;
    storage.saveToLocalStorage(mockTask);
    mockTask.index = storage.readLocalStorage().length;
    mockTask.description = `${mockTask.description} - ${storage.readLocalStorage().length}`;
    storage.saveToLocalStorage(mockTask);

    const idToUpdate = storage.readLocalStorage().length;
    // Update task with id of idToUpdate
    expect(storage.updateTaskDescription(idToUpdate, 'description updated').description).toBe('description updated');
  });

  // test updateTaskCompleteStatus function
  test('updateTaskCompleteStatus', () => {
    // create an entry record
    storage.saveToLocalStorage(mockTask);
    const idToComplete = storage.readLocalStorage()[0].index;

    // test the function
    expect(storage.updateTaskCompleteStatus(idToComplete).completed).toBe(undefined);
    expect(storage.updateTaskCompleteStatus(idToComplete)[0].completed).toBe(false);
    expect(storage.updateTaskCompleteStatus(idToComplete)[0].completed).toBe(true);
  });
});