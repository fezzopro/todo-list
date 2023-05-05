"use strict";
(self["webpackChunkto_do_list"] = self["webpackChunkto_do_list"] || []).push([[0],[
/* 0 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _modules_components_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);




_modules_components_js__WEBPACK_IMPORTED_MODULE_1__["default"].createTaskList(_modules_storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].readLocalStorage());

/***/ }),
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
    const fileteredtasks = this.readLocalStorage()
      .filter((task) => task.index !== Number.parseInt(taskId, 10));
    for (let index = 0; index < fileteredtasks.length; index += 1) {
      fileteredtasks[index].index = index;
    }
    this.saveAsLocalSorage(fileteredtasks);
  };

  deleteAllCompleteFromLocalStorage = () => {
    const fileteredtasks = this.readLocalStorage().filter((task) => task.completed === false);
    for (let index = 0; index < fileteredtasks.length; index += 1) {
      fileteredtasks[index].index = index;
    }
    this.saveAsLocalSorage(fileteredtasks);
  };

  getCollectionName = () => this.TASK_COLLECTION_NAME;

  updateTaskDescription = (index, description) => {
    const updatedTasks = this.readLocalStorage();
    updatedTasks[index].description = description;
    this.saveAsLocalSorage(updatedTasks);
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new Storage());

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _eventHandlers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
 // eslint-disable-line import/no-cycle

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
    descriptionSpan.setAttribute('contenteditable', true);
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
    ul.textContent = '';
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
      _eventHandlers_js__WEBPACK_IMPORTED_MODULE_0__["default"].newTaskEvent();
    });
    form.reset();
  };

  deleteEventListner = () => {
    const bins = document.querySelectorAll('.task-bin');

    bins.forEach((bin) => {
      bin.addEventListener('click', () => {
        _eventHandlers_js__WEBPACK_IMPORTED_MODULE_0__["default"].deleteTaskEvent(bin);
      });
    });
  };

  clearCompletedListner = () => {
    document.querySelector('.clear-btn').addEventListener('click', (event) => {
      event.preventDefault();
      _eventHandlers_js__WEBPACK_IMPORTED_MODULE_0__["default"].clearAllTaskEvent();
    });
  };

  editEventListner = () => {
    const descriptions = document.querySelectorAll('.description');

    descriptions.forEach((description) => {
      description.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
          description.blur();
        }
        _eventHandlers_js__WEBPACK_IMPORTED_MODULE_0__["default"].updateTaskEvent(description.childNodes);
      });
    });
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new Components());

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _components_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);

 // eslint-disable-line import/no-cycle

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
    this.index = _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].readLocalStorage().length;

    if (task.length > 0) {
      _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].saveToLocalStorage({
        description: this.description,
        completed: this.completed,
        index: this.index + 1,
      });
      _components_js__WEBPACK_IMPORTED_MODULE_1__["default"].createTaskList(_storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].readLocalStorage());
    }
  };

  deleteTaskEvent = (bin) => {
    _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].deleteFromLocalStorage(bin.firstChild.value);
    _components_js__WEBPACK_IMPORTED_MODULE_1__["default"].createTaskList(_storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].readLocalStorage());
  };

  clearAllTaskEvent = () => {
    _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].deleteAllCompleteFromLocalStorage();
    _components_js__WEBPACK_IMPORTED_MODULE_1__["default"].createTaskList(_storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].readLocalStorage());
  };

  updateTaskEvent = (nodes) => {
    _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].updateTaskDescription(nodes[1].value, nodes[0].textContent);
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new EventHandlers());

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(10);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(11);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 5 */
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 6 */
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),
/* 7 */
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),
/* 8 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),
/* 9 */
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),
/* 10 */
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),
/* 11 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(15), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(16), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(17), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  font-family: 'Open Sans', 'Lucida Grande', tahoma, verdana, arial, sans-serif;\n  color: #545862;\n  display: flex;\n  justify-content: center;\n  background-color: #f1f2f5;\n  padding: 10% 0;\n}\n\n.completed {\n  text-decoration: line-through;\n  opacity: 0.7;\n}\n\n.todo-list-section {\n  display: flex;\n  flex-direction: column;\n  width: 40%;\n  box-sizing: border-box;\n  border-radius: 3px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);\n  background-color: #ffff;\n  margin-top: 1%;\n  transition: margin-top 300ms ease-in-out;\n}\n\n.todo-list-section:hover {\n  margin-top: 0;\n}\n\n.list-head {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1% 1% 1% 3%;\n}\n\n.create-todo {\n  clear: both;\n  background-image: url('https://web.archive.org/web/20180728085226im_/http://www.getminimalist.com/assets/enter-b06ec7fb441bc0e40d61ba975a0291ad.png');\n  background-color: transparent;\n  background-repeat: no-repeat;\n  background-position: center;\n  width: 40px;\n  height: 50px;\n  cursor: pointer;\n  border: 0;\n}\n\n.input-section {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.form-input {\n  width: 100%;\n  padding: 0 40px 0 1rem;\n  line-height: 50px;\n  height: 50px;\n  border: none;\n  font-style: italic;\n}\n\ninput[type=text] {\n  padding: 8px 1rem;\n  line-height: 20px;\n  height: 20px;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n  vertical-align: middle;\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.08);\n}\n\n.title-refresh {\n  content: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  width: 15px;\n  padding-right: 3%;\n  opacity: 0.5;\n}\n\n.title-refresh:hover {\n  opacity: 0.7;\n  cursor: pointer;\n}\n\n.title-refresh:active {\n  opacity: 1;\n  animation: rotate 0.8s;\n  padding-right: 0%;\n  margin-right: 3%;\n}\n\ninput:focus-visible {\n  outline-offset: 0;\n  outline: -webkit-focus-ring-color auto 0;\n}\n\n.todo-lists {\n  padding: 1% 1% 0 1rem;\n}\n\n.list-item {\n  display: flex;\n  align-items: center;\n  list-style: none;\n  padding: 0.8rem 0;\n  font-size: 0.8rem;\n  font-weight: 300;\n  justify-content: space-between;\n  line-height: 24px;\n}\n\n.egiting {\n  background-color: #fffeca;\n}\n\n.task-bin {\n  content: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n  background-repeat: no-repeat;\n  background-color: transparent;\n  width: 18px;\n  opacity: 0.5;\n}\n\n.task-bin:hover {\n  opacity: 1;\n  cursor: pointer;\n}\n\n.task-bin:active {\n  opacity: 1;\n  cursor: progress;\n}\n\n.task-info {\n  content: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ");\n  background-repeat: no-repeat;\n  background-color: transparent;\n  width: 18px;\n  opacity: 0.5;\n}\n\n.task-info:hover {\n  opacity: 1;\n  cursor: move;\n}\n\n.list {\n  padding: 0;\n  margin: 0;\n}\n\n.task-ckecks {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n\n.clear {\n  display: flex;\n  justify-content: center;\n  background-color: #f1f2f5;\n  padding: 5% 0;\n}\n\n.clear-btn {\n  outline: none;\n  border: none;\n  appearance: none;\n  opacity: 0.4;\n  font-size: 14px;\n  transition: opacity 300ms ease-in-out, text-decoration 600ms ease-in-out;\n}\n\n.clear-btn:hover {\n  text-decoration: underline;\n  opacity: 1;\n}\n\n.task-icons {\n  min-width: fit-content;\n}\n\n@keyframes rotate {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 12 */
/***/ ((module) => {



module.exports = function (i) {
  return i[1];
};

/***/ }),
/* 13 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),
/* 14 */
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),
/* 15 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "68a849ea4a040e1f1947.svg";

/***/ }),
/* 16 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "6fc8c6752b8469cfb990.svg";

/***/ }),
/* 17 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "01a21ae4782d411375db.svg";

/***/ })
],
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__(0));
/******/ }
]);