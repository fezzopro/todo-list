import storage from '../src/modules/storage';

describe('Storage Module Test Suit', () => {
  beforeEach(() => {
    localStorage.removeItem(storage.getCollectionName());
  });

  afterEach(() => {
    localStorage.removeItem(storage.getCollectionName());
  });

  test('isLocalStorage', () => {
    expect(!storage.isLocalStorage()).toBe(true);
  });
});