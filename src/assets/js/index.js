import storage from '../../modules/storage.js';
import components from '../../modules/components.js';
import '../css/style.css';

components.createTaskList(storage.readLocalStorage());