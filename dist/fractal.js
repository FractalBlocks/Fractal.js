(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("fractal", [], factory);
	else if(typeof exports === 'object')
		exports["fractal"] = factory();
	else
		root["fractal"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var defaultHandler = { get: function get(obj, propName) {
	    return obj[propName];
	  }, set: function set(obj, propName, val) {
	    obj[propName] = val;
	  } };var Proxy = function Proxy(target, handler) {
	  this.target = target;this.handler = handler;
	  this.handler.get = this.handler.get || defaultHandler.get;this.handler.set = this.handler.set || defaultHandler.set;
	};Proxy.prototype.getTrap = function (propertyName) {
	  return this.handler.get(this.target, propertyName);
	};Proxy.prototype.setTrap = function (propertyName, value) {
	  this.handler.set(this.target, propertyName, value);
	};function globalGetInterceptor(object, propertyName) {
	  if (object instanceof Proxy) {
	    return object.getTrap(propertyName);
	  }var value = defaultHandler.get(object, propertyName);if (typeof value === 'function') {
	    return value.bind(object);
	  } else {
	    return value;
	  }
	}function globalSetInterceptor(object, propertyName, value) {
	  if (object instanceof Proxy) {
	    return object.setTrap(propertyName, value);
	  }defaultHandler.set(propertyName, value);
	}exports.default = _extends({}, globalGetInterceptor(__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./core\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())), 'default'), globalGetInterceptor(__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./engine\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())), 'default'), globalGetInterceptor(__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./utils/composing\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())), 'default'), {
	  flyd: __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"flyd\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
	  h: __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"snabbdom/h\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
	  timetravel: globalGetInterceptor(__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./modules/timetravel\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())), 'default'),
	  service: globalGetInterceptor(__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./service\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())), 'default'), noChildren: globalGetInterceptor(__webpack_require__(8), 'default')
	}, globalGetInterceptor(__webpack_require__(9), 'default'), {
	  data: globalGetInterceptor(__webpack_require__(10), 'default'),
	  style: globalGetInterceptor(__webpack_require__(11), 'default'),
	  tasks: { view: globalGetInterceptor(__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./tasks/view\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())), 'default'),
	    data: globalGetInterceptor(__webpack_require__(14), 'default'),
	    value: globalGetInterceptor(__webpack_require__(24), 'default'),
	    emitter: globalGetInterceptor(__webpack_require__(25), 'default'),
	    fetch: globalGetInterceptor(__webpack_require__(26), 'default'),
	    file: globalGetInterceptor(__webpack_require__(27), 'default')
	  },
	  drivers: {
	    view: globalGetInterceptor(__webpack_require__(28), 'default'),
	    event: globalGetInterceptor(__webpack_require__(35), 'default'),
	    listenable: globalGetInterceptor(__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./drivers/listenable\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())), 'default'),
	    load: globalGetInterceptor(__webpack_require__(37), 'default'),
	    time: globalGetInterceptor(__webpack_require__(38), 'default'), // NEEDS REVIEW!! (maybe depreecated.default)
	    localStorage: globalGetInterceptor(__webpack_require__(43), 'default'),
	    screenInfo: globalGetInterceptor(__webpack_require__(44), 'default')
	  }
	});

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var defaultHandler = { get: function get(obj, propName) {
	    return obj[propName];
	  }, set: function set(obj, propName, val) {
	    obj[propName] = val;
	  } };var Proxy = function Proxy(target, handler) {
	  this.target = target;this.handler = handler;this.handler.get = this.handler.get || defaultHandler.get;this.handler.set = this.handler.set || defaultHandler.set;
	};Proxy.prototype.getTrap = function (propertyName) {
	  return this.handler.get(this.target, propertyName);
	};Proxy.prototype.setTrap = function (propertyName, value) {
	  this.handler.set(this.target, propertyName, value);
	};function globalGetInterceptor(object, propertyName) {
	  if (object instanceof Proxy) {
	    return object.getTrap(propertyName);
	  }var value = defaultHandler.get(object, propertyName);if (typeof value === 'function') {
	    return value.bind(object);
	  } else {
	    return value;
	  }
	}function globalSetInterceptor(object, propertyName, value) {
	  if (object instanceof Proxy) {
	    return object.setTrap(propertyName, value);
	  }defaultHandler.set(propertyName, value);
	}var F = _extends({}, globalGetInterceptor(__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../core\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())), 'default'), globalGetInterceptor(__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../utils/composing\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())), 'default'));var h = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"snabbdom/h\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	exports.default = globalGetInterceptor(F, 'def')({
	  init: function init(_ref) {
	    var key = _ref.key;
	    return { key: key };
	  },
	  inputs: {},
	  actions: {},
	  interfaces: {
	    view: function view(ctx, i, m) {
	      return h('div', 'There are no children');
	    }
	  }
	});

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var defaultHandler = { get: function get(obj, propName) {
	    return obj[propName];
	  }, set: function set(obj, propName, val) {
	    obj[propName] = val;
	  } };var Proxy = function Proxy(target, handler) {
	  this.target = target;this.handler = handler;this.handler.get = this.handler.get || defaultHandler.get;this.handler.set = this.handler.set || defaultHandler.set;
	};Proxy.prototype.getTrap = function (propertyName) {
	  return this.handler.get(this.target, propertyName);
	};Proxy.prototype.setTrap = function (propertyName, value) {
	  this.handler.set(this.target, propertyName, value);
	};function globalGetInterceptor(object, propertyName) {
	  if (object instanceof Proxy) {
	    return object.getTrap(propertyName);
	  }var value = defaultHandler.get(object, propertyName);if (typeof value === 'function') {
	    return value.bind(object);
	  } else {
	    return value;
	  }
	}function globalSetInterceptor(object, propertyName, value) {
	  if (object instanceof Proxy) {
	    return object.setTrap(propertyName, value);
	  }defaultHandler.set(propertyName, value);
	}var logVal = function logVal(x) {
	  var scope = arguments.length <= 1 || arguments[1] === undefined ? '__' : arguments[1];
	
	  globalGetInterceptor(console, 'log')('%c ' + x + ' in ' + scope, 'color: purple; font-size: 20px');
	  return x;
	};
	
	exports.default = {
	  logVal: logVal
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var defaultHandler = { get: function get(obj, propName) {
	    return obj[propName];
	  }, set: function set(obj, propName, val) {
	    obj[propName] = val;
	  } };
	var Proxy = function Proxy(target, handler) {
	  this.target = target;this.handler = handler;this.handler.get = this.handler.get || defaultHandler.get;this.handler.set = this.handler.set || defaultHandler.set;
	};Proxy.prototype.getTrap = function (propertyName) {
	  return this.handler.get(this.target, propertyName);
	};Proxy.prototype.setTrap = function (propertyName, value) {
	  this.handler.set(this.target, propertyName, value);
	};function globalGetInterceptor(object, propertyName) {
	  if (object instanceof Proxy) {
	    return object.getTrap(propertyName);
	  }var value = defaultHandler.get(object, propertyName);if (typeof value === 'function') {
	    return value.bind(object);
	  } else {
	    return value;
	  }
	}function globalSetInterceptor(object, propertyName, value) {
	  if (object instanceof Proxy) {
	    return object.setTrap(propertyName, value);
	  }defaultHandler.set(propertyName, value);
	}
	// common fetch utils
	
	var fetchObj = function fetchObj(obj) {
	  var handled = false;
	  var status = function status(response) {
	    if (globalGetInterceptor(response, 'status') >= 200 && globalGetInterceptor(response, 'status') < 300) {
	      handled = true;return globalGetInterceptor(Promise, 'resolve')(response);
	    } else {
	      if (globalGetInterceptor(response, 'status') == 401 || globalGetInterceptor(response, 'status') == 403) {
	        globalGetInterceptor(obj, 'error')('denied', globalGetInterceptor(response, 'status'));
	      } else {
	        globalGetInterceptor(obj, 'error')('error', globalGetInterceptor(response, 'status'));
	      }handled = true;
	      return globalGetInterceptor(Promise, 'reject')(new Error(globalGetInterceptor(response, 'statusText')));
	    }
	  };
	
	  return globalGetInterceptor(globalGetInterceptor(globalGetInterceptor(globalGetInterceptor(fetch(globalGetInterceptor(obj, 'url'), globalGetInterceptor(obj, 'options')), 'then')(status), 'then')(globalGetInterceptor(obj, 'response')), 'then')(globalGetInterceptor(obj, 'success')), 'catch')(function (err) {
	    if (!handled) globalGetInterceptor(obj, 'error')('netError', err);
	  });
	};
	
	var fetchAll = function fetchAll(objs, success) {
	
	  var promiseArray = globalGetInterceptor(objs, 'map')(function (obj, i) {
	    var handled = false;
	    var status = function status(response) {
	      if (globalGetInterceptor(response, 'status') >= 200 && globalGetInterceptor(response, 'status') < 300) {
	        handled = true;
	        return globalGetInterceptor(Promise, 'resolve')(response);
	      } else {
	        if (globalGetInterceptor(response, 'status') == 401 || globalGetInterceptor(response, 'status') == 403) {
	          globalGetInterceptor(obj, 'error')('denied', globalGetInterceptor(response, 'status'));
	        } else {
	          globalGetInterceptor(obj, 'error')('error', globalGetInterceptor(response, 'status'));
	        }
	        handled = true;
	        return globalGetInterceptor(Promise, 'reject')(new Error(globalGetInterceptor(response, 'statusText')));
	      }
	    };
	
	    return globalGetInterceptor(globalGetInterceptor(fetch(globalGetInterceptor(obj, 'url'), globalGetInterceptor(obj, 'options')), 'then')(status), 'then')(globalGetInterceptor(obj, 'response'));
	  });
	
	  return globalGetInterceptor(globalGetInterceptor(Promise, 'all')(promiseArray), 'then')(success);
	};
	
	exports.default = {
	  fetch: fetchObj,
	  fetchAll: fetchAll
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var defaultHandler = { get: function get(obj, propName) {
	    return obj[propName];
	  }, set: function set(obj, propName, val) {
	    obj[propName] = val;
	  } };var Proxy = function Proxy(target, handler) {
	  this.target = target;this.handler = handler;this.handler.get = this.handler.get || defaultHandler.get;this.handler.set = this.handler.set || defaultHandler.set;
	};
	
	Proxy.prototype.getTrap = function (propertyName) {
	  return this.handler.get(this.target, propertyName);
	};Proxy.prototype.setTrap = function (propertyName, value) {
	  this.handler.set(this.target, propertyName, value);
	};function globalGetInterceptor(object, propertyName) {
	  if (object instanceof Proxy) {
	    return object.getTrap(propertyName);
	  }var value = defaultHandler.get(object, propertyName);
	  if (typeof value === 'function') {
	    return value.bind(object);
	  } else {
	    return value;
	  }
	}function globalSetInterceptor(object, propertyName, value) {
	  if (object instanceof Proxy) {
	    return object.setTrap(propertyName, value);
	  }defaultHandler.set(propertyName, value);
	} // A set of css useful function helpers
	var FreeStyle = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"free-style\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	// the div element for injecting styles
	var styles = globalGetInterceptor(document, 'getElementById')('F-app-styles');
	
	function createStylesContainer(target, id) {
	  var styles = globalGetInterceptor(document, 'createElement')('div');
	  globalSetInterceptor(styles, 'id', id);
	  globalGetInterceptor(target, 'appendChild')(styles);
	  return styles;
	}
	
	if (!styles) {
	  styles = createStylesContainer(globalGetInterceptor(document, 'head'), 'F-app-styles');
	}function createModuleStylesContainer(styles, name) {
	  var scope = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];
	
	  var container = globalGetInterceptor(document, 'createElement')('div');
	  if (globalGetInterceptor(document, 'getElementById')('fractalModuleStyles_' + scope + name)) {
	    globalGetInterceptor(console, 'warn')('WARNING!!! there are a duplicated module definition name!!: ' + scope + name);
	  }
	  globalSetInterceptor(container, 'id', scope + name);
	  globalGetInterceptor(styles, 'appendChild')(container);
	  return container;
	}
	
	function createStyle(styles, name) {
	  var scope = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];
	  var namespace = '';
	  return {
	    Style: globalGetInterceptor(FreeStyle, 'create')(function (s) {
	      return '_' + namespace + '__' + globalGetInterceptor(FreeStyle, 'stringHash')(s);
	    }), container: createModuleStylesContainer(styles, name, scope),
	    setNamespace: function setNamespace(ns) {
	      return namespace = ns;
	    }
	  };
	}
	
	function r(styleInstance, styleName, styleObj) {
	  globalGetInterceptor(styleInstance, 'setNamespace')(styleName);
	  var classHash = globalGetInterceptor(globalGetInterceptor(styleInstance, 'Style'), 'registerStyle')(styleObj);
	  return classHash;
	}
	
	function hasBaseObject(obj) {
	  for (var key in obj) {
	    if (globalGetInterceptor(obj, 'key') !== null && _typeof(globalGetInterceptor(obj, 'key')) === 'object' && key == 'base') {
	      return true;
	    }
	  }
	  return false;
	}
	
	function rs(moduleName, styleInstance, stylesObj) {
	  function rs_func(styleName, stylesObj) {
	    if (!hasBaseObject(stylesObj)) {
	      return r(styleInstance, styleName, stylesObj);
	    }
	    var classObj = {};
	    for (var key in stylesObj) {
	      if (hasBaseObject(globalGetInterceptor(stylesObj, 'key'))) {
	        globalSetInterceptor(classObj, 'key', rs_func(styleName + '_' + key, globalGetInterceptor(stylesObj, 'key')));
	      } else if (globalGetInterceptor(stylesObj, 'key') != null && _typeof(globalGetInterceptor(stylesObj, 'key')) === 'object') {
	        globalSetInterceptor(classObj, 'key', r(styleInstance, styleName + '_' + key, globalGetInterceptor(stylesObj, 'key')));
	      } else {
	        // function
	        globalSetInterceptor(classObj, 'key', globalGetInterceptor(stylesObj, 'key'));
	      }
	    }
	    return classObj;
	  }
	
	  var classObj = rs_func(moduleName, stylesObj);
	
	  globalGetInterceptor(globalGetInterceptor(styleInstance, 'Style'), 'inject')(globalGetInterceptor(styleInstance, 'container'));
	
	  return classObj;
	}
	
	function registerAnimations(moduleName, styleInstance, animationsObj) {
	  var animations = {};
	  for (var key in animationsObj) {
	    globalGetInterceptor(styleInstance, 'setNamespace')(moduleName + '-' + key);
	    globalSetInterceptor(animations, 'key', globalGetInterceptor(globalGetInterceptor(styleInstance, 'Style'), 'registerKeyframes')(globalGetInterceptor(animationsObj, 'key')));
	  }
	  return animations;
	}
	
	var noSelectable = {
	  '-webkit-touch-callout': 'none', /* iOS Safari */
	  '-webkit-user-select': 'none', /* Chrome/Safari/Opera */
	  '-khtml-user-select': 'none', /* Konqueror */
	  '-moz-user-select': 'none', /* Firefox */
	  '-ms-user-select': 'none', /* Internet Explorer/Edge */
	  'user-select': 'none'
	};
	
	var absoluteCenter = {
	  display: 'flex',
	  alignItems: 'center',
	  justifyContent: 'center'
	};
	
	exports.default = {
	  styles: styles,
	  r: r,
	  rs: rs,
	  registerAnimations: registerAnimations,
	  createStyle: createStyle,
	  createStylesContainer: createStylesContainer,
	  createModuleStylesContainer: createModuleStylesContainer,
	  hasBaseObject: hasBaseObject,
	  // helpers
	  absoluteCenter: absoluteCenter,
	  noSelectable: noSelectable
	};

/***/ },
/* 12 */,
/* 13 */,
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var defaultHandler = { get: function get(obj, propName) {
	    return obj[propName];
	  }, set: function set(obj, propName, val) {
	    obj[propName] = val;
	  } };var Proxy = function Proxy(target, handler) {
	  this.target = target;this.handler = handler;this.handler.get = this.handler.get || defaultHandler.get;this.handler.set = this.handler.set || defaultHandler.set;
	};Proxy.prototype.getTrap = function (propertyName) {
	  return this.handler.get(this.target, propertyName);
	};Proxy.prototype.setTrap = function (propertyName, value) {
	  this.handler.set(this.target, propertyName, value);
	};function globalGetInterceptor(object, propertyName) {
	  if (object instanceof Proxy) {
	    return object.getTrap(propertyName);
	  }var value = defaultHandler.get(object, propertyName);if (typeof value === 'function') {
	    return value.bind(object);
	  } else {
	    return value;
	  }
	}function globalSetInterceptor(object, propertyName, value) {
	  if (object instanceof Proxy) {
	    return object.setTrap(propertyName, value);
	  }defaultHandler.set(propertyName, value);
	}var Type = __webpack_require__(15);
	var R = {
	  T: __webpack_require__(21)
	};
	
	exports.default = {
	  types: Type({
	    emit: [String, globalGetInterceptor(R, 'T'), globalGetInterceptor(R, 'T')]
	  }),
	  task: function task(emitData) {
	    var taskFn = globalGetInterceptor(globalGetInterceptor(this, 'types'), 'caseOn')({
	      emit: function emit(key, value, _ref) {
	        var _ref$success = _ref.success;
	        var success = _ref$success === undefined ? function () {
	          return 0;
	        } : _ref$success;
	        var _ref$error = _ref.error;
	        var error = _ref$error === undefined ? function () {
	          return 0;
	        } : _ref$error;
	
	        emitData(key, value, { success: success, error: error });
	      }
	    });
	
	    // task runner
	    return {
	      run: function run(task) {
	        // perform side effect
	        taskFn(task, '');
	      },
	      get: {}
	    };
	  }
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var defaultHandler = { get: function get(obj, propName) {
	    return obj[propName];
	  }, set: function set(obj, propName, val) {
	    obj[propName] = val;
	  } };var Proxy = function Proxy(target, handler) {
	  this.target = target;
	  this.handler = handler;this.handler.get = this.handler.get || defaultHandler.get;this.handler.set = this.handler.set || defaultHandler.set;
	};Proxy.prototype.getTrap = function (propertyName) {
	  return this.handler.get(this.target, propertyName);
	};Proxy.prototype.setTrap = function (propertyName, value) {
	  this.handler.set(this.target, propertyName, value);
	};function globalGetInterceptor(object, propertyName) {
	  if (object instanceof Proxy) {
	    return object.getTrap(propertyName);
	  }var value = defaultHandler.get(object, propertyName);if (typeof value === 'function') {
	    return value.bind(object);
	  } else {
	    return value;
	  }
	}function globalSetInterceptor(object, propertyName, value) {
	  if (object instanceof Proxy) {
	    return object.setTrap(propertyName, value);
	  }defaultHandler.set(propertyName, value);
	}var curryN = __webpack_require__(17);
	
	function isString(s) {
	  return typeof s === 'string';
	}
	function isNumber(n) {
	  return typeof n === 'number';
	}
	function isObject(value) {
	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  return !!value && (type == 'object' || type == 'function');
	}
	function isFunction(f) {
	  return typeof f === 'function';
	}
	var isArray = globalGetInterceptor(Array, 'isArray') || function (a) {
	  return 'length' in a;
	};
	
	var mapConstrToFn = curryN(2, function (group, constr) {
	  return constr === String ? isString : constr === Number ? isNumber : constr === Object ? isObject : constr === Array ? isArray : constr === Function ? isFunction : constr === undefined ? group : constr;
	});
	
	function Constructor(group, name, validators) {
	  validators = globalGetInterceptor(validators, 'map')(mapConstrToFn(group));
	  var constructor = curryN(globalGetInterceptor(validators, 'length'), function () {
	    var val = [],
	        v,
	        validator;
	    for (var i = 0; i < globalGetInterceptor(arguments, 'length'); ++i) {
	      v = globalGetInterceptor(arguments, 'i');
	      validator = globalGetInterceptor(validators, 'i');
	      if (typeof validator === 'function' && validator(v) || v !== undefined && v !== null && globalGetInterceptor(v, 'of') === validator) {
	        globalSetInterceptor(val, 'i', globalGetInterceptor(arguments, 'i'));
	      } else {
	        throw new TypeError('wrong value ' + v + ' passed to location ' + i + ' in ' + name);
	      }
	    }
	    globalSetInterceptor(val, 'of', group);
	    globalSetInterceptor(val, 'name', name);
	    return val;
	  });
	  return constructor;
	}
	
	function rawCase(type, cases, action, arg) {
	  if (type !== globalGetInterceptor(action, 'of')) throw new TypeError('wrong type passed to case');
	  var name = globalGetInterceptor(action, 'name') in cases ? globalGetInterceptor(action, 'name') : '_' in cases ? '_' : undefined;
	  if (name === undefined) {
	    throw new Error('unhandled value passed to case');
	  } else {
	    return globalGetInterceptor(globalGetInterceptor(cases, 'name'), 'apply')(undefined, arg !== undefined ? globalGetInterceptor(action, 'concat')([arg]) : action);
	  }
	}
	
	var typeCase = curryN(3, rawCase);
	var caseOn = curryN(4, rawCase);
	
	function Type(desc) {
	  var obj = {};
	  for (var key in desc) {
	    globalSetInterceptor(obj, 'key', Constructor(obj, key, globalGetInterceptor(desc, 'key')));
	  }
	  globalSetInterceptor(obj, 'case', typeCase(obj));
	  globalSetInterceptor(obj, 'caseOn', caseOn(obj));
	  return obj;
	}
	
	globalSetInterceptor(module, 'exports', Type);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)(module)))

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {"use strict";
	
	var defaultHandler = { get: function get(obj, propName) {
			return obj[propName];
		}, set: function set(obj, propName, val) {
			obj[propName] = val;
		} };var Proxy = function Proxy(target, handler) {
		this.target = target;this.handler = handler;this.handler.get = this.handler.get || defaultHandler.get;this.handler.set = this.handler.set || defaultHandler.set;
	};Proxy.prototype.getTrap = function (propertyName) {
		return this.handler.get(this.target, propertyName);
	};Proxy.prototype.setTrap = function (propertyName, value) {
		this.handler.set(this.target, propertyName, value);
	};function globalGetInterceptor(object, propertyName) {
		if (object instanceof Proxy) {
			return object.getTrap(propertyName);
		}var value = defaultHandler.get(object, propertyName);if (typeof value === 'function') {
			return value.bind(object);
		} else {
			return value;
		}
	}function globalSetInterceptor(object, propertyName, value) {
		if (object instanceof Proxy) {
			return object.setTrap(propertyName, value);
		}defaultHandler.set(propertyName, value);
	}globalSetInterceptor(module, "exports", function (module) {
		if (!globalGetInterceptor(module, "webpackPolyfill")) {
			globalSetInterceptor(module, "deprecate", function () {});
			globalSetInterceptor(module, "paths", []);
			// module.parent = undefined by default
			globalSetInterceptor(module, "children", []);
			globalSetInterceptor(module, "webpackPolyfill", 1);
		}
		return module;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)(module)))

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {'use strict';
	
	var defaultHandler = { get: function get(obj, propName) {
	    return obj[propName];
	  }, set: function set(obj, propName, val) {
	    obj[propName] = val;
	  } };var Proxy = function Proxy(target, handler) {
	  this.target = target;this.handler = handler;this.handler.get = this.handler.get || defaultHandler.get;this.handler.set = this.handler.set || defaultHandler.set;
	};Proxy.prototype.getTrap = function (propertyName) {
	  return this.handler.get(this.target, propertyName);
	};Proxy.prototype.setTrap = function (propertyName, value) {
	  this.handler.set(this.target, propertyName, value);
	};function globalGetInterceptor(object, propertyName) {
	  if (object instanceof Proxy) {
	    return object.getTrap(propertyName);
	  }var value = defaultHandler.get(object, propertyName);if (typeof value === 'function') {
	    return value.bind(object);
	  } else {
	    return value;
	  }
	}function globalSetInterceptor(object, propertyName, value) {
	  if (object instanceof Proxy) {
	    return object.setTrap(propertyName, value);
	  }defaultHandler.set(propertyName, value);
	}var _curry2 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./internal/_curry2\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var _curryN = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./internal/_curryN\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var arity = __webpack_require__(20);
	
	/**
	 * Returns a curried equivalent of the provided function, with the
	 * specified arity. The curried function has two unusual capabilities.
	 * First, its arguments needn't be provided one at a time. If `g` is
	 * `R.curryN(3, f)`, the following are equivalent:
	 *
	 *   - `g(1)(2)(3)`
	 *   - `g(1)(2, 3)`
	 *   - `g(1, 2)(3)`
	 *   - `g(1, 2, 3)`
	 *
	 * Secondly, the special placeholder value `R.__` may be used to specify
	 * "gaps", allowing partial application of any combination of arguments,
	 * regardless of their positions. If `g` is as above and `_` is `R.__`,
	 * the following are equivalent:
	 *
	 *   - `g(1, 2, 3)`
	 *   - `g(_, 2, 3)(1)`
	 *   - `g(_, _, 3)(1)(2)`
	 *   - `g(_, _, 3)(1, 2)`
	 *   - `g(_, 2)(1)(3)`
	 *   - `g(_, 2)(1, 3)`
	 *   - `g(_, 2)(_, 3)(1)`
	 *
	 * @func
	 * @memberOf R
	 * @category Function
	 * @sig Number -> (* -> a) -> (* -> a)
	 * @param {Number} length The arity for the returned function.
	 * @param {Function} fn The function to curry.
	 * @return {Function} A new, curried function.
	 * @see R.curry
	 * @example
	 *
	 *      var addFourNumbers = function() {
	 *        return R.sum([].slice.call(arguments, 0, 4));
	 *      };
	 *
	 *      var curriedAddFourNumbers = R.curryN(4, addFourNumbers);
	 *      var f = curriedAddFourNumbers(1, 2);
	 *      var g = f(3);
	 *      g(4); //=> 10
	 */
	globalSetInterceptor(module, 'exports', _curry2(function curryN(length, fn) {
	  return arity(length, _curryN(length, [], fn));
	}));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)(module)))

/***/ },
/* 18 */,
/* 19 */,
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {'use strict';
	
	var defaultHandler = { get: function get(obj, propName) {
	    return obj[propName];
	  }, set: function set(obj, propName, val) {
	    obj[propName] = val;
	  } };var Proxy = function Proxy(target, handler) {
	  this.target = target;this.handler = handler;this.handler.get = this.handler.get || defaultHandler.get;this.handler.set = this.handler.set || defaultHandler.set;
	};Proxy.prototype.getTrap = function (propertyName) {
	  return this.handler.get(this.target, propertyName);
	};Proxy.prototype.setTrap = function (propertyName, value) {
	  this.handler.set(this.target, propertyName, value);
	};function globalGetInterceptor(object, propertyName) {
	  if (object instanceof Proxy) {
	    return object.getTrap(propertyName);
	  }var value = defaultHandler.get(object, propertyName);if (typeof value === 'function') {
	    return value.bind(object);
	  } else {
	    return value;
	  }
	}function globalSetInterceptor(object, propertyName, value) {
	  if (object instanceof Proxy) {
	    return object.setTrap(propertyName, value);
	  }defaultHandler.set(propertyName, value);
	}var _curry2 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./internal/_curry2\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	/**
	 * Wraps a function of any arity (including nullary) in a function that accepts exactly `n`
	 * parameters. Unlike `nAry`, which passes only `n` arguments to the wrapped function,
	 * functions produced by `arity` will pass all provided arguments to the wrapped function.
	 *
	 * @func
	 * @memberOf R
	 * @sig (Number, (* -> *)) -> (* -> *)
	 * @category Function
	 * @param {Number} n The desired arity of the returned function.
	 * @param {Function} fn The function to wrap.
	 * @return {Function} A new function wrapping `fn`. The new function is
	 *         guaranteed to be of arity `n`.
	 * @deprecated since v0.15.0
	 * @example
	 *
	 *      var takesTwoArgs = function(a, b) {
	 *        return [a, b];
	 *      };
	 *      takesTwoArgs.length; //=> 2
	 *      takesTwoArgs(1, 2); //=> [1, 2]
	 *
	 *      var takesOneArg = R.arity(1, takesTwoArgs);
	 *      takesOneArg.length; //=> 1
	 *      // All arguments are passed through to the wrapped function
	 *      takesOneArg(1, 2); //=> [1, 2]
	 */
	globalSetInterceptor(module, 'exports', _curry2(function (n, fn) {
	  // jshint unused:vars
	  switch (n) {
	    case 0:
	      return function () {
	        return globalGetInterceptor(fn, 'apply')(this, arguments);
	      };
	    case 1:
	      return function (a0) {
	        return globalGetInterceptor(fn, 'apply')(this, arguments);
	      };
	    case 2:
	      return function (a0, a1) {
	        return globalGetInterceptor(fn, 'apply')(this, arguments);
	      };
	    case 3:
	      return function (a0, a1, a2) {
	        return globalGetInterceptor(fn, 'apply')(this, arguments);
	      };
	    case 4:
	      return function (a0, a1, a2, a3) {
	        return globalGetInterceptor(fn, 'apply')(this, arguments);
	      };
	    case 5:
	      return function (a0, a1, a2, a3, a4) {
	        return globalGetInterceptor(fn, 'apply')(this, arguments);
	      };
	    case 6:
	      return function (a0, a1, a2, a3, a4, a5) {
	        return globalGetInterceptor(fn, 'apply')(this, arguments);
	      };
	    case 7:
	      return function (a0, a1, a2, a3, a4, a5, a6) {
	        return globalGetInterceptor(fn, 'apply')(this, arguments);
	      };
	    case 8:
	      return function (a0, a1, a2, a3, a4, a5, a6, a7) {
	        return globalGetInterceptor(fn, 'apply')(this, arguments);
	      };
	    case 9:
	      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
	        return globalGetInterceptor(fn, 'apply')(this, arguments);
	      };
	    case 10:
	      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
	        return globalGetInterceptor(fn, 'apply')(this, arguments);
	      };
	    default:
	      throw new Error('First argument to arity must be a non-negative integer no greater than ten');
	  }
	}));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)(module)))

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {'use strict';
	
	var defaultHandler = { get: function get(obj, propName) {
	    return obj[propName];
	  }, set: function set(obj, propName, val) {
	    obj[propName] = val;
	  } };var Proxy = function Proxy(target, handler) {
	  this.target = target;this.handler = handler;this.handler.get = this.handler.get || defaultHandler.get;this.handler.set = this.handler.set || defaultHandler.set;
	};Proxy.prototype.getTrap = function (propertyName) {
	  return this.handler.get(this.target, propertyName);
	};Proxy.prototype.setTrap = function (propertyName, value) {
	  this.handler.set(this.target, propertyName, value);
	};function globalGetInterceptor(object, propertyName) {
	  if (object instanceof Proxy) {
	    return object.getTrap(propertyName);
	  }var value = defaultHandler.get(object, propertyName);if (typeof value === 'function') {
	    return value.bind(object);
	  } else {
	    return value;
	  }
	}function globalSetInterceptor(object, propertyName, value) {
	  if (object instanceof Proxy) {
	    return object.setTrap(propertyName, value);
	  }defaultHandler.set(propertyName, value);
	}var always = __webpack_require__(22);
	
	/**
	 * A function that always returns `true`. Any passed in parameters are ignored.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.9.0
	 * @category Function
	 * @sig * -> Boolean
	 * @param {*}
	 * @return {Boolean}
	 * @see R.always, R.F
	 * @example
	 *
	 *      R.T(); //=> true
	 */
	globalSetInterceptor(module, 'exports', always(true));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)(module)))

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {'use strict';
	
	var defaultHandler = { get: function get(obj, propName) {
	    return obj[propName];
	  }, set: function set(obj, propName, val) {
	    obj[propName] = val;
	  } };var Proxy = function Proxy(target, handler) {
	  this.target = target;this.handler = handler;this.handler.get = this.handler.get || defaultHandler.get;this.handler.set = this.handler.set || defaultHandler.set;
	};Proxy.prototype.getTrap = function (propertyName) {
	  return this.handler.get(this.target, propertyName);
	};Proxy.prototype.setTrap = function (propertyName, value) {
	  this.handler.set(this.target, propertyName, value);
	};function globalGetInterceptor(object, propertyName) {
	  if (object instanceof Proxy) {
	    return object.getTrap(propertyName);
	  }var value = defaultHandler.get(object, propertyName);if (typeof value === 'function') {
	    return value.bind(object);
	  } else {
	    return value;
	  }
	}function globalSetInterceptor(object, propertyName, value) {
	  if (object instanceof Proxy) {
	    return object.setTrap(propertyName, value);
	  }defaultHandler.set(propertyName, value);
	}var _curry1 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./internal/_curry1\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	/**
	 * Returns a function that always returns the given value. Note that for
	 * non-primitives the value returned is a reference to the original value.
	 *
	 * This function is known as `const`, `constant`, or `K` (for K combinator)
	 * in other languages and libraries.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category Function
	 * @sig a -> (* -> a)
	 * @param {*} val The value to wrap in a function
	 * @return {Function} A Function :: * -> val.
	 * @example
	 *
	 *      var t = R.always('Tee');
	 *      t(); //=> 'Tee'
	 */
	globalSetInterceptor(module, 'exports', _curry1(function always(val) {
	  return function () {
	    return val;
	  };
	}));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)(module)))

/***/ },
/* 23 */,
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var defaultHandler = { get: function get(obj, propName) {
	    return obj[propName];
	  }, set: function set(obj, propName, val) {
	    obj[propName] = val;
	  } };var Proxy = function Proxy(target, handler) {
	  this.target = target;this.handler = handler;this.handler.get = this.handler.get || defaultHandler.get;this.handler.set = this.handler.set || defaultHandler.set;
	};Proxy.prototype.getTrap = function (propertyName) {
	  return this.handler.get(this.target, propertyName);
	};Proxy.prototype.setTrap = function (propertyName, value) {
	  this.handler.set(this.target, propertyName, value);
	};function globalGetInterceptor(object, propertyName) {
	  if (object instanceof Proxy) {
	    return object.getTrap(propertyName);
	  }var value = defaultHandler.get(object, propertyName);if (typeof value === 'function') {
	    return value.bind(object);
	  } else {
	    return value;
	  }
	}function globalSetInterceptor(object, propertyName, value) {
	  if (object instanceof Proxy) {
	    return object.setTrap(propertyName, value);
	  }defaultHandler.set(propertyName, value);
	}var Type = __webpack_require__(15);
	var R = {
	  T: __webpack_require__(21)
	};
	
	exports.default = {
	  types: Type({
	    send: [String]
	  }),
	  task: function task(sendValue) {
	    var taskFn = globalGetInterceptor(globalGetInterceptor(this, 'types'), 'caseOn')({
	      send: function send(value) {
	        sendValue(value);
	      }
	    });
	
	    // task runner
	    return {
	      run: function run(task) {
	        // perform side effect
	        taskFn(task, '');
	      },
	      get: {}
	    };
	  }
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var defaultHandler = { get: function get(obj, propName) {
	    return obj[propName];
	  }, set: function set(obj, propName, val) {
	    obj[propName] = val;
	  }
	};var Proxy = function Proxy(target, handler) {
	  this.target = target;this.handler = handler;this.handler.get = this.handler.get || defaultHandler.get;this.handler.set = this.handler.set || defaultHandler.set;
	};Proxy.prototype.getTrap = function (propertyName) {
	  return this.handler.get(this.target, propertyName);
	};Proxy.prototype.setTrap = function (propertyName, value) {
	  this.handler.set(this.target, propertyName, value);
	};function globalGetInterceptor(object, propertyName) {
	  if (object instanceof Proxy) {
	    return object.getTrap(propertyName);
	  }var value = defaultHandler.get(object, propertyName);if (typeof value === 'function') {
	    return value.bind(object);
	  } else {
	    return value;
	  }
	}function globalSetInterceptor(object, propertyName, value) {
	  if (object instanceof Proxy) {
	    return object.setTrap(propertyName, value);
	  }defaultHandler.set(propertyName, value);
	}var Type = __webpack_require__(15);
	var R = {
	  T: __webpack_require__(21)
	};
	
	// emitter should implement emit function
	exports.default = {
	  types: Type({
	    emit: [String, globalGetInterceptor(R, 'T'), globalGetInterceptor(R, 'T')] }), task: function task(emt) {
	    var emitter = emt;var taskFn = globalGetInterceptor(globalGetInterceptor(this, 'types'), 'caseOn')({
	      emit: function emit(channel, message) {
	        var success = arguments.length <= 2 || arguments[2] === undefined ? function () {} : arguments[2];
	
	        if (emitter != undefined) {
	          globalGetInterceptor(emitter, 'emit')(channel, message, success);
	        }
	      }
	    });
	    // task runner
	    return {
	      run: function run(task) {
	        // perform side effect
	        taskFn(task, '');
	      },
	      get: emitter,
	      set: function set(emt) {
	        emitter = emt;
	      }
	    };
	  }
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _unionType = __webpack_require__(15);
	
	var _unionType2 = _interopRequireDefault(_unionType);
	
	var _data = __webpack_require__(10);
	
	var _data2 = _interopRequireDefault(_data);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var defaultHandler = { get: function get(obj, propName) {
	    return obj[propName];
	  }, set: function set(obj, propName, val) {
	    obj[propName] = val;
	  } };var Proxy = function Proxy(target, handler) {
	  this.target = target;this.handler = handler;this.handler.get = this.handler.get || defaultHandler.get;this.handler.set = this.handler.set || defaultHandler.set;
	};Proxy.prototype.getTrap = function (propertyName) {
	  return this.handler.get(this.target, propertyName);
	};Proxy.prototype.setTrap = function (propertyName, value) {
	  this.handler.set(this.target, propertyName, value);
	};function globalGetInterceptor(object, propertyName) {
	  if (object instanceof Proxy) {
	    return object.getTrap(propertyName);
	  }var value = defaultHandler.get(object, propertyName);if (typeof value === 'function') {
	    return value.bind(object);
	  } else {
	    return value;
	  }
	}function globalSetInterceptor(object, propertyName, value) {
	  if (object instanceof Proxy) {
	    return object.setTrap(propertyName, value);
	  }defaultHandler.set(propertyName, value);
	}
	var R = {
	  T: __webpack_require__(21)
	};
	
	exports.default = {
	  types: (0, _unionType2.default)({
	    fetch: [Object]
	  }),
	  task: function task() {
	    var taskFn = globalGetInterceptor(globalGetInterceptor(this, 'types'), 'caseOn')({
	      fetch: function fetch(obj) {
	        return globalGetInterceptor(_data2.default, 'fetch')(obj);
	      }
	    });
	
	    // task runner
	    return {
	      run: function run(obj) {
	        // perform side effect
	        return taskFn(obj, '');
	      }, get: {}
	    };
	  }
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var defaultHandler = { get: function get(obj, propName) {
	    return obj[propName];
	  }, set: function set(obj, propName, val) {
	    obj[propName] = val;
	  } };var Proxy = function Proxy(target, handler) {
	  this.target = target;this.handler = handler;this.handler.get = this.handler.get || defaultHandler.get;this.handler.set = this.handler.set || defaultHandler.set;
	};Proxy.prototype.getTrap = function (propertyName) {
	  return this.handler.get(this.target, propertyName);
	};Proxy.prototype.setTrap = function (propertyName, value) {
	  this.handler.set(this.target, propertyName, value);
	};function globalGetInterceptor(object, propertyName) {
	  if (object instanceof Proxy) {
	    return object.getTrap(propertyName);
	  }var value = defaultHandler.get(object, propertyName);if (typeof value === 'function') {
	    return value.bind(object);
	  } else {
	    return value;
	  }
	}function globalSetInterceptor(object, propertyName, value) {
	  if (object instanceof Proxy) {
	    return object.setTrap(propertyName, value);
	  }defaultHandler.set(propertyName, value);
	}var Type = __webpack_require__(15);
	var R = {
	  T: __webpack_require__(21)
	};
	
	exports.default = {
	  types: Type({
	    read: [globalGetInterceptor(R, 'T'), globalGetInterceptor(R, 'T')]
	  }),
	  task: function task() {
	    var taskFn = globalGetInterceptor(globalGetInterceptor(this, 'types'), 'caseOn')({
	      read: function read(file, _ref) {
	        var _ref$success = _ref.success;
	        var success = _ref$success === undefined ? function () {
	          return 0;
	        } : _ref$success;
	        var _ref$error = _ref.error;
	        var error = _ref$error === undefined ? function () {
	          return 0;
	        } : _ref$error;
	
	        var reader = new FileReader();
	        globalSetInterceptor(reader, 'onload', function (ev) {
	          var contents = globalGetInterceptor(globalGetInterceptor(ev, 'target'), 'result');
	          success(contents);
	        });
	        globalSetInterceptor(reader, 'onerror', function () {
	          return error('Error reading ' + file);
	        });
	        globalGetInterceptor(reader, 'readAsText')(file);
	      } });
	
	    // task runner
	    return {
	      run: function run(task) {
	        // perform side effect
	        taskFn(task, '');
	      },
	      get: {}
	    };
	  }
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = view;
	var defaultHandler = { get: function get(obj, propName) {
	    return obj[propName];
	  }, set: function set(obj, propName, val) {
	    obj[propName] = val;
	  } };var Proxy = function Proxy(target, handler) {
	  this.target = target;this.handler = handler;this.handler.get = this.handler.get || defaultHandler.get;this.handler.set = this.handler.set || defaultHandler.set;
	};Proxy.prototype.getTrap = function (propertyName) {
	  return this.handler.get(this.target, propertyName);
	};Proxy.prototype.setTrap = function (propertyName, value) {
	  this.handler.set(this.target, propertyName, value);
	};function globalGetInterceptor(object, propertyName) {
	  if (object instanceof Proxy) {
	    return object.getTrap(propertyName);
	  }var value = defaultHandler.get(object, propertyName);if (typeof value === 'function') {
	    return value.bind(object);
	  } else {
	    return value;
	  }
	}function globalSetInterceptor(object, propertyName, value) {
	  if (object instanceof Proxy) {
	    return object.setTrap(propertyName, value);
	  }defaultHandler.set(propertyName, value);
	}
	var flyd = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"flyd\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var h = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"snabbdom/h\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	// Common snabbdom patch function (convention over configuration)
	var patch = globalGetInterceptor(__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"snabbdom\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())), 'init')([__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"snabbdom/modules/class\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())), __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"snabbdom/modules/attributes\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())), __webpack_require__(32), __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"snabbdom/modules/eventlisteners\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())), __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"snabbdom/modules/style\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))]);
	
	function view(selector) {
	  var patchfn = arguments.length <= 1 || arguments[1] === undefined ? patch : arguments[1];
	
	  var lastContainer = void 0,
	      renderer$ = void 0;
	  return {
	    attach: function attach(vnode$) {
	      globalGetInterceptor(window, 'addEventListener')('DOMContentLoaded', function () {
	        var container = globalGetInterceptor(document, 'querySelector')(selector);
	        renderer$ = globalGetInterceptor(flyd, 'scan')(patchfn, container, globalGetInterceptor(vnode$, 'map')(function (vnode) {
	          return h('div' + selector, [vnode]);
	        }));
	      });
	    },
	    reattach: function reattach(vnode$) {
	      lastContainer = patchfn(globalGetInterceptor(document, 'querySelector')(selector), h('div' + selector));
	      renderer$ = globalGetInterceptor(flyd, 'scan')(patchfn, lastContainer, globalGetInterceptor(vnode$, 'map')(function (vnode) {
	        return h('div' + selector, [vnode]);
	      }));
	    },
	    dispose: function dispose() {
	      globalGetInterceptor(renderer$, 'end')(true);
	    }
	  };
	}

/***/ },
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {"use strict";
	
	var defaultHandler = {
	  get: function get(obj, propName) {
	    return obj[propName];
	  }, set: function set(obj, propName, val) {
	    obj[propName] = val;
	  } };var Proxy = function Proxy(target, handler) {
	  this.target = target;
	  this.handler = handler;this.handler.get = this.handler.get || defaultHandler.get;this.handler.set = this.handler.set || defaultHandler.set;
	};Proxy.prototype.getTrap = function (propertyName) {
	  return this.handler.get(this.target, propertyName);
	};Proxy.prototype.setTrap = function (propertyName, value) {
	  this.handler.set(this.target, propertyName, value);
	};function globalGetInterceptor(object, propertyName) {
	  if (object instanceof Proxy) {
	    return object.getTrap(propertyName);
	  }var value = defaultHandler.get(object, propertyName);if (typeof value === 'function') {
	    return value.bind(object);
	  } else {
	    return value;
	  }
	}function globalSetInterceptor(object, propertyName, value) {
	  if (object instanceof Proxy) {
	    return object.setTrap(propertyName, value);
	  }defaultHandler.set(propertyName, value);
	}function updateProps(oldVnode, vnode) {
	  var key,
	      cur,
	      old,
	      elm = globalGetInterceptor(vnode, "elm"),
	      oldProps = globalGetInterceptor(globalGetInterceptor(oldVnode, "data"), "props") || {},
	      props = globalGetInterceptor(globalGetInterceptor(vnode, "data"), "props") || {};
	  for (key in props) {
	    cur = globalGetInterceptor(props, "key");
	    old = globalGetInterceptor(oldProps, "key");
	    if (old !== cur) {
	      globalSetInterceptor(elm, "key", cur);
	    }
	  }
	}
	
	globalSetInterceptor(module, "exports", { create: updateProps, update: updateProps });
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)(module)))

/***/ },
/* 33 */,
/* 34 */,
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = event;
	var defaultHandler = { get: function get(obj, propName) {
	    return obj[propName];
	  }, set: function set(obj, propName, val) {
	    obj[propName] = val;
	  } };var Proxy = function Proxy(target, handler) {
	  this.target = target;
	  this.handler = handler;this.handler.get = this.handler.get || defaultHandler.get;this.handler.set = this.handler.set || defaultHandler.set;
	};Proxy.prototype.getTrap = function (propertyName) {
	  return this.handler.get(this.target, propertyName);
	};Proxy.prototype.setTrap = function (propertyName, value) {
	  this.handler.set(this.target, propertyName, value);
	};function globalGetInterceptor(object, propertyName) {
	  if (object instanceof Proxy) {
	    return object.getTrap(propertyName);
	  }var value = defaultHandler.get(object, propertyName);if (typeof value === 'function') {
	    return value.bind(object);
	  } else {
	    return value;
	  }
	}function globalSetInterceptor(object, propertyName, value) {
	  if (object instanceof Proxy) {
	    return object.setTrap(propertyName, value);
	  }defaultHandler.set(propertyName, value);
	}var flyd = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"flyd\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	function event(cb) {
	  return {
	    listener$: null,
	    attach: function attach(event$) {
	      globalSetInterceptor(this, 'listener$', globalGetInterceptor(flyd, 'on')(cb, event$));
	    },
	    reattach: function reattach(event$) {
	      globalSetInterceptor(this, 'listener$', globalGetInterceptor(flyd, 'on')(cb, event$));
	    },
	    dispose: function dispose() {
	      globalGetInterceptor(globalGetInterceptor(this, 'listener$'), 'end')(true);
	    }
	  };
	}

/***/ },
/* 36 */,
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = load;
	var defaultHandler = { get: function get(obj, propName) {
	    return obj[propName];
	  }, set: function set(obj, propName, val) {
	    obj[propName] = val;
	  } };var Proxy = function Proxy(target, handler) {
	  this.target = target;this.handler = handler;this.handler.get = this.handler.get || defaultHandler.get;this.handler.set = this.handler.set || defaultHandler.set;
	};Proxy.prototype.getTrap = function (propertyName) {
	  return this.handler.get(this.target, propertyName);
	};Proxy.prototype.setTrap = function (propertyName, value) {
	  this.handler.set(this.target, propertyName, value);
	};function globalGetInterceptor(object, propertyName) {
	  if (object instanceof Proxy) {
	    return object.getTrap(propertyName);
	  }var value = defaultHandler.get(object, propertyName);if (typeof value === 'function') {
	    return value.bind(object);
	  } else {
	    return value;
	  }
	}function globalSetInterceptor(object, propertyName, value) {
	  if (object instanceof Proxy) {
	    return object.setTrap(propertyName, value);
	  }defaultHandler.set(propertyName, value);
	}
	var flyd = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"flyd\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	function load() {
	  return {
	    attach: function attach(vnode$) {
	      globalGetInterceptor(flyd, 'on')(function (f) {
	        f();
	        globalGetInterceptor(vnode$, 'end')(true);
	      }, vnode$);
	    },
	    reattach: function reattach(vnode$) {},
	    dispose: function dispose() {}
	  };
	}

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = time;
	
	var defaultHandler = { get: function get(obj, propName) {
	    return obj[propName];
	  }, set: function set(obj, propName, val) {
	    obj[propName] = val;
	  } };var Proxy = function Proxy(target, handler) {
	  this.target = target;this.handler = handler;this.handler.get = this.handler.get || defaultHandler.get;this.handler.set = this.handler.set || defaultHandler.set;
	};Proxy.prototype.getTrap = function (propertyName) {
	  return this.handler.get(this.target, propertyName);
	};Proxy.prototype.setTrap = function (propertyName, value) {
	  this.handler.set(this.target, propertyName, value);
	};function globalGetInterceptor(object, propertyName) {
	  if (object instanceof Proxy) {
	    return object.getTrap(propertyName);
	  }var value = defaultHandler.get(object, propertyName);if (typeof value === 'function') {
	    return value.bind(object);
	  } else {
	    return value;
	  }
	}function globalSetInterceptor(object, propertyName, value) {
	  if (object instanceof Proxy) {
	    return object.setTrap(propertyName, value);
	  }defaultHandler.set(propertyName, value);
	}var R = { mapObjIndexed: __webpack_require__(39)
	};
	var flyd = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"flyd\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	//// time driver module ----
	var stateNames = ['pending', 'running', 'paused'];
	var timerPatch = function timerPatch(timeData, obj) {
	  // TODO: Do a better implementation of this driver
	  var id = globalGetInterceptor(timeData, 'id');
	  if (globalGetInterceptor(obj, 'periodic')) {
	    if (globalGetInterceptor(obj, 'active') && globalGetInterceptor(obj, 'active') != globalGetInterceptor(timeData, 'active')) {
	      id = setInterval(function () {
	        return globalGetInterceptor(obj, 'on')(timeData);
	      }, globalGetInterceptor(obj, 'time'));
	    } else if (!globalGetInterceptor(obj, 'active') && globalGetInterceptor(obj, 'active') != globalGetInterceptor(timeData, 'active')) {
	      clearInterval(id);
	      id = null;
	    } else if (globalGetInterceptor(obj, 'time') != globalGetInterceptor(timeData, 'time')) {
	      clearInterval(id);
	      id = setInterval(function () {
	        return globalGetInterceptor(obj, 'on')(timeData);
	      }, globalGetInterceptor(obj, 'time'));
	    } else if (id && globalGetInterceptor(obj, 'periodic') != globalGetInterceptor(timeData, 'periodic')) {
	      clearTimeout(id);
	      id = setInterval(function () {
	        return globalGetInterceptor(obj, 'on')(timeData);
	      }, globalGetInterceptor(obj, 'time'));
	    }
	  } else {
	    if (globalGetInterceptor(obj, 'active') && globalGetInterceptor(obj, 'active') != globalGetInterceptor(timeData, 'active')) {
	      id = setTimeout(function () {
	        return globalGetInterceptor(obj, 'on')(timeData);
	      }, globalGetInterceptor(obj, 'time'));
	    } else if (!globalGetInterceptor(obj, 'active') && globalGetInterceptor(obj, 'active') != globalGetInterceptor(timeData, 'active')) {
	      clearTimeout(id);
	      id = null;
	    } else if (globalGetInterceptor(obj, 'time') != globalGetInterceptor(timeData, 'time')) {
	      clearTimeout(id);
	      id = setTimeout(function () {
	        return globalGetInterceptor(obj, 'on')(timeData);
	      }, globalGetInterceptor(obj, 'time'));
	    } else if (globalGetInterceptor(obj, 'periodic') != globalGetInterceptor(timeData, 'periodic')) {
	      clearInterval(id);
	      id = setTimeout(function () {
	        return globalGetInterceptor(obj, 'on')(timeData);
	      }, globalGetInterceptor(obj, 'time'));
	    }
	  }
	  return {
	    id: id,
	    periodic: globalGetInterceptor(obj, 'periodic'),
	    active: globalGetInterceptor(obj, 'active'),
	    time: globalGetInterceptor(obj, 'time'),
	    on: globalGetInterceptor(obj, 'on'),
	    state: globalGetInterceptor(obj, 'state')
	  };
	};
	
	var timerListPatch = function timerListPatch(lastList, list) {
	  // dispose removed timers
	  for (var name in lastList) {
	    if (!globalGetInterceptor(list, 'name')) {
	      if (globalGetInterceptor(globalGetInterceptor(lastList, 'name'), 'periodic')) clearInterval(globalGetInterceptor(globalGetInterceptor(lastList, 'name'), 'id'));else clearTimeout(globalGetInterceptor(globalGetInterceptor(lastList, 'name'), 'id'));
	    }
	  }
	
	  return globalGetInterceptor(R, 'mapObjIndexed')(function (obj, name) {
	    return timerPatch(globalGetInterceptor(lastList, 'name') || {}, obj);
	  }, list);
	};
	
	function time() {
	  // babel or JS bug the stack is deleted and listener$ in not accesible from attach
	  // solution use normal functions (not arrows) and merge listener$ in the object
	  // let listener$
	  return {
	    listener$: null,
	    attach: function attach(time$) {
	      globalSetInterceptor(this, 'listener$', globalGetInterceptor(flyd, 'scan')(timerListPatch, {}, time$));
	    },
	    reattach: function reattach(time$) {
	      globalSetInterceptor(this, 'listener$', globalGetInterceptor(flyd, 'scan')(timerListPatch, {}, time$));
	    },
	    dispose: function dispose() {
	      globalGetInterceptor(globalGetInterceptor(this, 'listener$'), 'end')(true);
	    }
	  };
	}

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {'use strict';
	
	var defaultHandler = { get: function get(obj, propName) {
	    return obj[propName];
	  }, set: function set(obj, propName, val) {
	    obj[propName] = val;
	  } };var Proxy = function Proxy(target, handler) {
	  this.target = target;this.handler = handler;this.handler.get = this.handler.get || defaultHandler.get;this.handler.set = this.handler.set || defaultHandler.set;
	};Proxy.prototype.getTrap = function (propertyName) {
	  return this.handler.get(this.target, propertyName);
	};Proxy.prototype.setTrap = function (propertyName, value) {
	  this.handler.set(this.target, propertyName, value);
	};function globalGetInterceptor(object, propertyName) {
	  if (object instanceof Proxy) {
	    return object.getTrap(propertyName);
	  }var value = defaultHandler.get(object, propertyName);if (typeof value === 'function') {
	    return value.bind(object);
	  } else {
	    return value;
	  }
	}function globalSetInterceptor(object, propertyName, value) {
	  if (object instanceof Proxy) {
	    return object.setTrap(propertyName, value);
	  }defaultHandler.set(propertyName, value);
	}var _curry2 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./internal/_curry2\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var _reduce = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./internal/_reduce\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var keys = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./keys\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	/**
	 * Like `mapObj`, but passes additional arguments to the predicate function. The
	 * predicate function is passed three arguments: *(value, key, obj)*.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.9.0
	 * @category Object
	 * @sig (v, k, {k: v} -> v) -> {k: v} -> {k: v}
	 * @param {Function} fn A function called for each property in `obj`. Its return value will
	 *        become a new property on the return object.
	 * @param {Object} obj The object to iterate over.
	 * @return {Object} A new object with the same keys as `obj` and values that are the result
	 *         of running each property through `fn`.
	 * @example
	 *
	 *      var values = { x: 1, y: 2, z: 3 };
	 *      var prependKeyAndDouble = (num, key, obj) => key + (num * 2);
	 *
	 *      R.mapObjIndexed(prependKeyAndDouble, values); //=> { x: 'x2', y: 'y4', z: 'z6' }
	 */
	globalSetInterceptor(module, 'exports', _curry2(function mapObjIndexed(fn, obj) {
	  return _reduce(function (acc, key) {
	    globalSetInterceptor(acc, 'key', fn(globalGetInterceptor(obj, 'key'), key, obj));
	    return acc;
	  }, {}, keys(obj));
	}));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)(module)))

/***/ },
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = localStorage;
	var defaultHandler = { get: function get(obj, propName) {
	    return obj[propName];
	  }, set: function set(obj, propName, val) {
	    obj[propName] = val;
	  } };var Proxy = function Proxy(target, handler) {
	  this.target = target;this.handler = handler;this.handler.get = this.handler.get || defaultHandler.get;this.handler.set = this.handler.set || defaultHandler.set;
	};
	Proxy.prototype.getTrap = function (propertyName) {
	  return this.handler.get(this.target, propertyName);
	};Proxy.prototype.setTrap = function (propertyName, value) {
	  this.handler.set(this.target, propertyName, value);
	};function globalGetInterceptor(object, propertyName) {
	  if (object instanceof Proxy) {
	    return object.getTrap(propertyName);
	  }var value = defaultHandler.get(object, propertyName);if (typeof value === 'function') {
	    return value.bind(object);
	  } else {
	    return value;
	  }
	}function globalSetInterceptor(object, propertyName, value) {
	  if (object instanceof Proxy) {
	    return object.setTrap(propertyName, value);
	  }defaultHandler.set(propertyName, value);
	}var flyd = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"flyd\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	function localStorage(name) {
	  var listener$ = void 0;
	  return {
	    attach: function attach(data$) {
	      listener$ = globalGetInterceptor(flyd, 'on')(function (data) {
	        globalGetInterceptor(localStorage, 'setItem')(name, globalGetInterceptor(JSON, 'stringify')(data));
	      }, data$);
	    },
	    reattach: function reattach(data$) {
	      globalGetInterceptor(listener$, 'end')(true);
	      listener$ = globalGetInterceptor(flyd, 'on')(function (data) {
	        globalGetInterceptor(localStorage, 'setItem')(name, globalGetInterceptor(JSON, 'stringify')(data));
	      }, data$);
	    }, dispose: function dispose() {
	      globalGetInterceptor(localStorage, 'removeItem')(name);
	      globalGetInterceptor(listener$, 'end')(true);
	    }
	  };
	}

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = screenInfoDriver;
	var defaultHandler = { get: function get(obj, propName) {
	    return obj[propName];
	  }, set: function set(obj, propName, val) {
	    obj[propName] = val;
	  } };var Proxy = function Proxy(target, handler) {
	  this.target = target;this.handler = handler;this.handler.get = this.handler.get || defaultHandler.get;this.handler.set = this.handler.set || defaultHandler.set;
	};
	Proxy.prototype.getTrap = function (propertyName) {
	  return this.handler.get(this.target, propertyName);
	};Proxy.prototype.setTrap = function (propertyName, value) {
	  this.handler.set(this.target, propertyName, value);
	};function globalGetInterceptor(object, propertyName) {
	  if (object instanceof Proxy) {
	    return object.getTrap(propertyName);
	  }var value = defaultHandler.get(object, propertyName);if (typeof value === 'function') {
	    return value.bind(object);
	  } else {
	    return value;
	  }
	}function globalSetInterceptor(object, propertyName, value) {
	  if (object instanceof Proxy) {
	    return object.setTrap(propertyName, value);
	  }defaultHandler.set(propertyName, value);
	}var flyd = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"flyd\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _require = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../../lib/utils/screenInfo\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var screenInfo = _require.screenInfo;
	
	// difing is not necesary beacuse there is no use case in that the screen size has a bunch of changes
	
	function screenInfoDriver() {
	  return {
	    listener$: null,
	    screenListener: null,
	    attach: function attach(screen$) {
	      var _this = this;
	
	      globalSetInterceptor(this, 'listener$', globalGetInterceptor(flyd, 'on')(function (list) {
	        globalSetInterceptor(_this, 'screenListener', function () {
	          var info = screenInfo();
	          for (var key in list) {
	            globalGetInterceptor(globalGetInterceptor(list, 'key'), 'on')(info);
	          }
	        });
	        globalGetInterceptor(window, 'addEventListener')('resize', globalGetInterceptor(_this, 'screenListener'));
	      }, screen$));
	    },
	    reattach: function reattach(screen$) {
	      var _this2 = this;
	
	      globalSetInterceptor(this, 'listener$', globalGetInterceptor(flyd, 'on')(function (list) {
	        globalSetInterceptor(_this2, 'screenListener', function () {
	          var info = screenInfo();
	          for (var key in list) {
	            globalGetInterceptor(globalGetInterceptor(list, 'key'), 'on')(info);
	          }
	        });
	        globalGetInterceptor(window, 'addEventListener')('resize', globalGetInterceptor(_this2, 'screenListener'));
	      }, screen$));
	    },
	    dispose: function dispose() {
	      globalGetInterceptor(globalGetInterceptor(this, 'listener$'), 'end')(true);
	      globalGetInterceptor(window, 'removeEventListener')('resize', globalGetInterceptor(this, 'screenListener'));
	      globalSetInterceptor(this, 'screenListener', null);
	    }
	  };
	}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=fractal.map