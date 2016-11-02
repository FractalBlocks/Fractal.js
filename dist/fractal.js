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
	
	exports.default = _extends({}, __webpack_require__(1).default, __webpack_require__(56).default, __webpack_require__(10).default, {
	  flyd: __webpack_require__(11),
	  h: __webpack_require__(66),
	  timetravel: __webpack_require__(59).default,
	  service: __webpack_require__(75).default,
	  noChildren: __webpack_require__(78).default
	}, __webpack_require__(79).default, {
	  data: __webpack_require__(76).default,
	  style: __webpack_require__(2).default,
	  tasks: {
	    view: __webpack_require__(80).default,
	    data: __webpack_require__(81).default,
	    value: __webpack_require__(82).default,
	    emitter: __webpack_require__(83).default,
	    fetch: __webpack_require__(84).default,
	    file: __webpack_require__(85).default
	  },
	  drivers: {
	    view: __webpack_require__(86).default,
	    event: __webpack_require__(93).default,
	    listenable: __webpack_require__(94).default,
	    load: __webpack_require__(95).default,
	    time: __webpack_require__(96).default, // NEEDS REVIEW!! (maybe depreecated.default)
	    localStorage: __webpack_require__(97).default,
	    screenInfo: __webpack_require__(98).default
	  }
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _style = __webpack_require__(2);
	
	var _style2 = _interopRequireDefault(_style);
	
	var _unionType = __webpack_require__(4);
	
	var _unionType2 = _interopRequireDefault(_unionType);
	
	var _composing = __webpack_require__(10);
	
	var _composing2 = _interopRequireDefault(_composing);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var R = {
	  clone: __webpack_require__(29),
	  evolve: __webpack_require__(48),
	  adjust: __webpack_require__(49),
	  append: __webpack_require__(52),
	  remove: __webpack_require__(53),
	  T: __webpack_require__(54)
	};
	
	var def = function def(moduleDef) {
	  var mDef = R.clone(moduleDef);
	  mDef.name = mDef.hasOwnProperty('name') ? mDef.name : 'UnamedModule';
	  mDef.log = mDef.hasOwnProperty('log') ? mDef.log : false;
	  mDef.logAll = mDef.hasOwnProperty('logAll') ? mDef.logAll : false;
	
	  // 'ns' is the namespace for keyFrames and may be other stuff
	  var ns = { animation: {} };
	  if (mDef.styles) {
	    mDef.styleInstance = _style2.default.createStyle(_style2.default.styles, mDef.name);
	  }
	  if (mDef.animations) {
	    ns.animations = _style2.default.registerAnimations(mDef.name, mDef.styleInstance, mDef.animations);
	  }
	  if (mDef.styles) {
	    mDef.styles = _style2.default.rs(mDef.name, mDef.styleInstance, typeof mDef.styles === 'function' ? mDef.styles(ns) : mDef.styles);
	    mDef.dispose = function () {
	      mDef.styleInstance.Style.remove(mDef.styleInstance.Style);
	      mDef.styleInstance.container.remove();
	    };
	  } else {
	    mDef.styles = {};
	    mDef.dispose = function () {
	      return 0;
	    };
	  }
	
	  if (!mDef.actions) {
	    mDef.actions = {};
	  }
	  // default actions
	  mDef.actions._ChildAction = [[String, R.T, Array], function (name, update, a, m) {
	    return R.evolve(_defineProperty({}, name, update(a)), m);
	  }];
	  mDef.actions._ChildActionScoped = [[String, String, R.T, Array], function (scope, name, update, a, m) {
	    return R.evolve(_defineProperty({}, scope, R.evolve(_defineProperty({}, name, update(a)))), m);
	  }];
	  mDef.actions._DynamicChildAction = [[String, R.T, Number, Array], function (scope, update, idx, a, m) {
	    return R.evolve(_defineProperty({}, scope, R.adjust(update(a), idx)), m);
	  }];
	  mDef.actions._DynamicChildAdd = [[String, R.T], function (scope, initialState, m) {
	    return R.evolve(_defineProperty({}, scope, R.append(initialState)), m);
	  }];
	  mDef.actions._DynamicChildRemove = [[String, Number], function (scope, idx, m) {
	    return R.evolve(_defineProperty({}, scope, R.remove(idx, 1)), m);
	  }];
	  mDef.Action = {};
	  mDef.update = {};
	  for (var actionName in mDef.actions) {
	    mDef.Action[actionName] = mDef.actions[actionName][0];
	    mDef.update[actionName] = mDef.actions[actionName][1];
	  }
	  mDef.Action = (0, _unionType2.default)(mDef.Action);
	  mDef.update = mDef.Action.caseOn(mDef.update);
	  if (!mDef.inputs) {
	    mDef.inputs = {};
	  }
	  // -- default inputs
	  // static inputs
	  mDef.inputs._action = function (ctx, Action, name, data) {
	    return Action[name].length > 0 ? Action[name](data) : Action[name]();
	  };
	  mDef.inputs._childAction = function (ctx, Action, name, update, a) {
	    return Action._ChildAction(name, update, a);
	  };
	  mDef.inputs._childActionScoped = function (ctx, Action, scope, name, update, a) {
	    return Action._ChildActionScoped(scope, name, update, a);
	  };
	  // dynamic inputs
	  mDef.inputs._dynamicChildAction = function (ctx, Action, scope, update, idx, a) {
	    return Action._DynamicChildAction(scope, update, idx, a);
	  };
	  mDef.inputs._dynamicChildAdd = function (ctx, Action, scope, initialState) {
	    return Action._DynamicChildAdd(scope, initialState);
	  };
	  mDef.inputs._dynamicChildRemove = function (ctx, Action, scope, idx) {
	    return Action._DynamicChildRemove(scope, idx);
	  };
	  if (!mDef.outputNames) {
	    mDef.outputNames = [];
	  }
	  if (!mDef.load) {
	    mDef.load = function (ctx, i, Action) {
	      return {};
	    };
	  }
	  if (!mDef.loadAfter) {
	    mDef.loadAfter = function (ctx, i, Action, md) {
	      return md({});
	    };
	  }
	  // Composition
	  if (mDef.modules || mDef.groupedModules || mDef.dynamicModules) {
	    (function () {
	      var wrappableInit = mDef.init;
	      mDef.init = function () {
	        var state = _extends({}, wrappableInit.apply(undefined, arguments), mDef.modules ? _composing2.default.mergeModels(mDef.modules) : {});
	        if (mDef.groupedModules) {
	          for (var scope in mDef.groupedModules) {
	            state[scope] = _composing2.default.mergeModels(mDef.groupedModules[scope]);
	          }
	        }
	        if (mDef.dynamicModules) {
	          for (var _scope in mDef.dynamicModules) {
	            if (!state[_scope]) {
	              state[_scope] = [];
	            }
	          }
	        }
	        return state;
	      };
	      var wrappableLoad = mDef.load;
	      mDef.load = function (ctx, i, Action) {
	        var mds = _extends({}, wrappableLoad(ctx, i, Action), mDef.modules ? _composing2.default.mergeAll(mDef.modules, i) : {});
	        if (mDef.groupedModules) {
	          for (var scope in mDef.groupedModules) {
	            mds[scope] = _composing2.default.mergeAll(mDef.groupedModules[scope], i, scope);
	          }
	        }
	        if (mDef.dynamicModules) {
	          mds.dynamicModules = {};
	          for (var _scope2 in mDef.dynamicModules) {
	            mds.dynamicModules[_scope2] = mDef.dynamicModules[_scope2].root ? mDef.dynamicModules[_scope2].root : mDef.dynamicModules[_scope2];
	          }
	        }
	        return mds;
	      };
	    })();
	  }
	  mDef.mDef = moduleDef;
	  return mDef;
	};
	
	exports.default = {
	  def: def
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	// A set of css useful function helpers
	var FreeStyle = __webpack_require__(3);
	
	// the div element for injecting styles
	var styles = document.getElementById('F-app-styles');
	
	function createStylesContainer(target, id) {
	  var styles = document.createElement('div');
	  styles.id = id;
	  target.appendChild(styles);
	  return styles;
	}
	
	if (!styles) {
	  styles = createStylesContainer(document.head, 'F-app-styles');
	}
	
	function createModuleStylesContainer(styles, name) {
	  var scope = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];
	
	  var container = document.createElement('div');
	  if (document.getElementById('fractalModuleStyles_' + scope + name)) {
	    console.warn('WARNING!!! there are a duplicated module definition name!!: ' + scope + name);
	  }
	  container.id = scope + name;
	  styles.appendChild(container);
	  return container;
	}
	
	function createStyle(styles, name) {
	  var scope = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];
	
	  var namespace = '';
	  return {
	    Style: FreeStyle.create(function (s) {
	      return '_' + namespace + '__' + FreeStyle.stringHash(s);
	    }),
	    container: createModuleStylesContainer(styles, name, scope),
	    setNamespace: function setNamespace(ns) {
	      return namespace = ns;
	    }
	  };
	}
	
	function r(styleInstance, styleName, styleObj) {
	  styleInstance.setNamespace(styleName);
	  var classHash = styleInstance.Style.registerStyle(styleObj);
	  return classHash;
	}
	
	function hasBaseObject(obj) {
	  for (var key in obj) {
	    if (obj[key] !== null && _typeof(obj[key]) === 'object' && key == 'base') {
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
	      if (hasBaseObject(stylesObj[key])) {
	        classObj[key] = rs_func(styleName + '_' + key, stylesObj[key]);
	      } else if (stylesObj[key] != null && _typeof(stylesObj[key]) === 'object') {
	        classObj[key] = r(styleInstance, styleName + '_' + key, stylesObj[key]);
	      } else {
	        // function
	        classObj[key] = stylesObj[key];
	      }
	    }
	    return classObj;
	  }
	
	  var classObj = rs_func(moduleName, stylesObj);
	
	  styleInstance.Style.inject(styleInstance.container);
	
	  return classObj;
	}
	
	function registerAnimations(moduleName, styleInstance, animationsObj) {
	  var animations = {};
	  for (var key in animationsObj) {
	    styleInstance.setNamespace(moduleName + '-' + key);
	    animations[key] = styleInstance.Style.registerKeyframes(animationsObj[key]);
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
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * Increment through IDs for FreeStyle, which can't generate hashed IDs.
	 */
	var instanceId = 0;
	/**
	 * CSS properties that are valid unit-less numbers.
	 */
	var CSS_NUMBER = {
	    'box-flex': true,
	    'box-flex-group': true,
	    'column-count': true,
	    'flex': true,
	    'flex-grow': true,
	    'flex-positive': true,
	    'flex-shrink': true,
	    'flex-negative': true,
	    'font-weight': true,
	    'line-clamp': true,
	    'line-height': true,
	    'opacity': true,
	    'order': true,
	    'orphans': true,
	    'tab-size': true,
	    'widows': true,
	    'z-index': true,
	    'zoom': true,
	    // SVG properties.
	    'fill-opacity': true,
	    'stroke-dashoffset': true,
	    'stroke-opacity': true,
	    'stroke-width': true
	};
	/**
	 * CSS vendor prefixes.
	 */
	var VENDOR_PREFIXES = ['-webkit-', '-ms-', '-moz-', '-o-'];
	// Add vendor prefixes to all unit-less properties.
	for (var _i = 0, _a = Object.keys(CSS_NUMBER); _i < _a.length; _i++) {
	    var property = _a[_i];
	    for (var _b = 0; _b < VENDOR_PREFIXES.length; _b++) {
	        var prefix = VENDOR_PREFIXES[_b];
	        CSS_NUMBER[prefix + property] = true;
	    }
	}
	/**
	 * Transform a JavaScript property into a CSS property.
	 */
	function hyphenate(propertyName) {
	    return propertyName.replace(/([A-Z])/g, '-$1').replace(/^ms-/, '-ms-') // Internet Explorer vendor prefix.
	    .toLowerCase();
	}
	/**
	 * Check if a property name should pop to the top level of CSS.
	 */
	function isAtRule(propertyName) {
	    return propertyName.charAt(0) === '@';
	}
	/**
	 * Check if a value is a nested style definition.
	 */
	function isNestedStyle(value) {
	    return value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && !Array.isArray(value);
	}
	/**
	 * Generate a hash value from a string.
	 */
	function stringHash(str) {
	    var value = 5381;
	    var i = str.length;
	    while (i) {
	        value = value * 33 ^ str.charCodeAt(--i);
	    }
	    return (value >>> 0).toString(36);
	}
	exports.stringHash = stringHash;
	/**
	 * Transform a style string to a CSS string.
	 */
	function styleStringToString(name, value) {
	    if (value == null) {
	        return '';
	    }
	    if (typeof value === 'number' && value !== 0 && !CSS_NUMBER[name]) {
	        value += 'px';
	    }
	    return name + ":" + String(value).replace(/([\{\}\[\]])/g, '\\$1');
	}
	/**
	 * Transform a style into a CSS string.
	 */
	function styleToString(name, value) {
	    if (Array.isArray(value)) {
	        return value.map(function (value) {
	            return styleStringToString(name, value);
	        }).join(';');
	    }
	    return styleStringToString(name, value);
	}
	/**
	 * Sort an array of tuples by first value.
	 */
	function sortTuples(value) {
	    return value.sort(function (a, b) {
	        return a[0] > b[0] ? 1 : -1;
	    });
	}
	/**
	 * Categorize user styles.
	 */
	function parseUserStyles(styles, hasNestedStyles) {
	    var properties = [];
	    var nestedStyles = [];
	    // Sort keys before adding to styles.
	    for (var _i = 0, _a = Object.keys(styles); _i < _a.length; _i++) {
	        var key = _a[_i];
	        var value = styles[key];
	        if (isNestedStyle(value)) {
	            nestedStyles.push([key.trim(), value]);
	        } else {
	            properties.push([hyphenate(key.trim()), value]);
	        }
	    }
	    return {
	        properties: sortTuples(properties),
	        nestedStyles: hasNestedStyles ? nestedStyles : sortTuples(nestedStyles)
	    };
	}
	/**
	 * Stringify an array of property tuples.
	 */
	function stringifyProperties(properties) {
	    return properties.map(function (p) {
	        return styleToString(p[0], p[1]);
	    }).join(';');
	}
	/**
	 * Interpolate CSS selectors.
	 */
	function interpolate(selector, parent) {
	    if (selector.indexOf('&') > -1) {
	        return selector.replace(/&/g, parent);
	    }
	    return parent + " " + selector;
	}
	/**
	 * Register all styles, but collect for post-selector correction using the hash.
	 */
	function collectHashedStyles(container, styles, hasNestedStyles) {
	    var instances = [];
	    var hashString = '';
	    function stylize(container, styles, selector) {
	        var _a = parseUserStyles(styles, hasNestedStyles),
	            properties = _a.properties,
	            nestedStyles = _a.nestedStyles;
	        var styleString = stringifyProperties(properties);
	        var style = container.add(new Style(styleString, container.hash));
	        hashString += styleString;
	        instances.push([selector, style]);
	        for (var _i = 0; _i < nestedStyles.length; _i++) {
	            var _b = nestedStyles[_i],
	                name_1 = _b[0],
	                value = _b[1];
	            hashString += name_1;
	            if (isAtRule(name_1)) {
	                stylize(container.add(new Rule(name_1, undefined, container.hash)), value, selector);
	            } else {
	                stylize(container, value, hasNestedStyles ? interpolate(name_1, selector) : name_1);
	            }
	        }
	    }
	    stylize(container, styles, '&');
	    return { hashString: hashString, instances: instances };
	}
	/**
	 * Recursively register styles on a container instance.
	 */
	function registerUserStyles(container, styles) {
	    var _a = collectHashedStyles(container, styles, true),
	        hashString = _a.hashString,
	        instances = _a.instances;
	    var currentClassName = "f" + container.hash(hashString);
	    var currentSelector = "." + currentClassName;
	    for (var _i = 0; _i < instances.length; _i++) {
	        var _b = instances[_i],
	            selector = _b[0],
	            style = _b[1];
	        style.add(new Selector(interpolate(selector, currentSelector), style.hash, undefined, hashString));
	    }
	    return currentClassName;
	}
	/**
	 * Create user rule. Simplified collect styles, since it doesn't need hashing.
	 */
	function registerUserRule(container, selector, styles) {
	    var _a = parseUserStyles(styles, false),
	        properties = _a.properties,
	        nestedStyles = _a.nestedStyles;
	    // Throw when using properties and nested styles together in rule.
	    if (properties.length && nestedStyles.length) {
	        throw new TypeError("Registering a CSS rule can not use properties with nested styles");
	    }
	    var styleString = stringifyProperties(properties);
	    var rule = container.add(new Rule(selector, styleString, container.hash));
	    for (var _i = 0; _i < nestedStyles.length; _i++) {
	        var _b = nestedStyles[_i],
	            name_2 = _b[0],
	            value = _b[1];
	        registerUserRule(rule, name_2, value);
	    }
	}
	/**
	 * Parse and register keyframes on the current instance.
	 */
	function registerUserHashedRule(container, selector, styles) {
	    var bucket = new Cache(container.hash);
	    var _a = collectHashedStyles(bucket, styles, false),
	        hashString = _a.hashString,
	        instances = _a.instances;
	    for (var _i = 0; _i < instances.length; _i++) {
	        var _b = instances[_i],
	            rule = _b[0],
	            style = _b[1];
	        style.add(new Selector(rule, style.hash, undefined, hashString));
	    }
	    var currentIdentifier = "h" + container.hash(hashString);
	    var atRule = container.add(new Rule("@" + selector + " " + currentIdentifier, undefined, container.hash, undefined, hashString));
	    atRule.merge(bucket);
	    return currentIdentifier;
	}
	/**
	 * Get the styles string for a container class.
	 */
	function getStyles(container) {
	    return container.values().map(function (style) {
	        return style.getStyles();
	    }).join('');
	}
	/**
	 * Implement a cache/event emitter.
	 */
	var Cache = function () {
	    function Cache(hash) {
	        var _this = this;
	        if (hash === void 0) {
	            hash = stringHash;
	        }
	        this.hash = hash;
	        this._children = {};
	        this._keys = [];
	        this._counts = {};
	        this._listeners = [];
	        this._mergeListener = function (type, path) {
	            var finalItem = path.pop();
	            var item = _this;
	            for (var _i = 0; _i < path.length; _i++) {
	                var cacheItem = path[_i];
	                item = _this.get(cacheItem);
	            }
	            return type === 'add' ? item.add(finalItem) : _this.remove(finalItem);
	        };
	        this._childListener = function (type, path, parent) {
	            _this.emitChange(type, [parent].concat(path));
	        };
	    }
	    Cache.prototype.values = function () {
	        var _this = this;
	        return this._keys.map(function (x) {
	            return _this._children[x];
	        });
	    };
	    Cache.prototype.empty = function () {
	        for (var _i = 0, _a = this._keys; _i < _a.length; _i++) {
	            var key = _a[_i];
	            var item = this._children[key];
	            var len = this.count(item);
	            while (len--) {
	                this.remove(item);
	            }
	        }
	    };
	    Cache.prototype.add = function (style) {
	        var count = this._counts[style.id] || 0;
	        var item = this._children[style.id];
	        this._counts[style.id] = count + 1;
	        if (count === 0) {
	            item = style.clone();
	            this._keys.push(item.id);
	            this._children[item.id] = item;
	            this.emitChange('add', [item]);
	        } else {
	            this._keys.splice(this._keys.indexOf(style.id), 1);
	            this._keys.push(style.id);
	            // Check if contents are different.
	            if (item.getIdentifier() !== style.getIdentifier()) {
	                throw new TypeError("Hash collision: " + style.getStyles() + " === " + item.getStyles());
	            }
	        }
	        if (style instanceof Cache) {
	            if (count === 0) {
	                item.addChangeListener(this._childListener);
	            }
	            for (var _i = 0, _a = style.values(); _i < _a.length; _i++) {
	                var cacheItem = _a[_i];
	                item.add(cacheItem);
	            }
	        }
	        return item;
	    };
	    Cache.prototype.get = function (style) {
	        return this._children[style.id];
	    };
	    Cache.prototype.count = function (style) {
	        return this._counts[style.id] || 0;
	    };
	    Cache.prototype.remove = function (style) {
	        var count = this._counts[style.id];
	        if (count > 0) {
	            this._counts[style.id] = count - 1;
	            var item = this._children[style.id];
	            if (count === 1) {
	                delete this._counts[style.id];
	                delete this._children[style.id];
	                this._keys.splice(this._keys.indexOf(style.id), 1);
	                this.emitChange('remove', [style]);
	            }
	            if (style instanceof Cache) {
	                if (count === 1) {
	                    item.removeChangeListener(this._childListener);
	                }
	                for (var _i = 0, _a = style.values(); _i < _a.length; _i++) {
	                    var cacheItem = _a[_i];
	                    item.remove(cacheItem);
	                }
	            }
	        }
	    };
	    Cache.prototype.addChangeListener = function (fn) {
	        this._listeners.push(fn);
	    };
	    Cache.prototype.removeChangeListener = function (fn) {
	        var listeners = this._listeners;
	        var index = listeners.indexOf(fn);
	        if (index > -1) {
	            listeners.splice(index, 1);
	        }
	    };
	    Cache.prototype.emitChange = function (type, path) {
	        for (var _i = 0, _a = this._listeners; _i < _a.length; _i++) {
	            var listener = _a[_i];
	            listener(type, path, this);
	        }
	    };
	    Cache.prototype.merge = function (style) {
	        for (var _i = 0, _a = style.values(); _i < _a.length; _i++) {
	            var cacheItem = _a[_i];
	            this.add(cacheItem);
	        }
	        style.addChangeListener(this._mergeListener);
	    };
	    Cache.prototype.unmerge = function (style) {
	        for (var _i = 0, _a = style.values(); _i < _a.length; _i++) {
	            var cacheItem = _a[_i];
	            this.remove(cacheItem);
	        }
	        style.removeChangeListener(this._mergeListener);
	    };
	    return Cache;
	}();
	exports.Cache = Cache;
	/**
	 * Selector is a dumb class made to represent nested CSS selectors.
	 */
	var Selector = function () {
	    function Selector(selector, hash, id, identifier) {
	        if (hash === void 0) {
	            hash = stringHash;
	        }
	        if (id === void 0) {
	            id = "s" + hash(selector);
	        }
	        if (identifier === void 0) {
	            identifier = '';
	        }
	        this.selector = selector;
	        this.hash = hash;
	        this.id = id;
	        this.identifier = identifier;
	    }
	    Selector.prototype.getStyles = function () {
	        return this.selector;
	    };
	    Selector.prototype.getIdentifier = function () {
	        return this.identifier + "_" + this.selector;
	    };
	    Selector.prototype.clone = function () {
	        return new Selector(this.selector, this.hash, this.id, this.identifier);
	    };
	    return Selector;
	}();
	exports.Selector = Selector;
	/**
	 * The style container registers a style string with selectors.
	 */
	var Style = function (_super) {
	    __extends(Style, _super);
	    function Style(style, hash, id) {
	        if (hash === void 0) {
	            hash = stringHash;
	        }
	        if (id === void 0) {
	            id = "c" + hash(style);
	        }
	        _super.call(this);
	        this.style = style;
	        this.hash = hash;
	        this.id = id;
	    }
	    Style.prototype.getStyles = function () {
	        return this.style ? this.values().map(function (x) {
	            return x.selector;
	        }).join(',') + "{" + this.style + "}" : '';
	    };
	    Style.prototype.getIdentifier = function () {
	        return this.style;
	    };
	    Style.prototype.clone = function () {
	        return new Style(this.style, this.hash, this.id);
	    };
	    return Style;
	}(Cache);
	exports.Style = Style;
	/**
	 * Implement rule logic for style output.
	 */
	var Rule = function (_super) {
	    __extends(Rule, _super);
	    function Rule(rule, style, hash, id, identifier) {
	        if (style === void 0) {
	            style = '';
	        }
	        if (hash === void 0) {
	            hash = stringHash;
	        }
	        if (id === void 0) {
	            id = "a" + hash(rule + style);
	        }
	        if (identifier === void 0) {
	            identifier = '';
	        }
	        _super.call(this);
	        this.rule = rule;
	        this.style = style;
	        this.hash = hash;
	        this.id = id;
	        this.identifier = identifier;
	    }
	    Rule.prototype.getStyles = function () {
	        return this.rule + "{" + this.style + getStyles(this) + "}";
	    };
	    Rule.prototype.getIdentifier = function () {
	        return this.identifier + "_" + this.rule + "_" + this.style;
	    };
	    Rule.prototype.clone = function () {
	        return new Rule(this.rule, this.style, this.hash, this.id, this.identifier);
	    };
	    return Rule;
	}(Cache);
	exports.Rule = Rule;
	/**
	 * The FreeStyle class implements the API for everything else.
	 */
	var FreeStyle = function (_super) {
	    __extends(FreeStyle, _super);
	    function FreeStyle(hash, id) {
	        if (hash === void 0) {
	            hash = stringHash;
	        }
	        if (id === void 0) {
	            id = "f" + (++instanceId).toString(36);
	        }
	        _super.call(this, hash);
	        this.hash = hash;
	        this.id = id;
	    }
	    FreeStyle.prototype.url = function (url) {
	        return 'url("' + encodeURI(url) + '")';
	    };
	    FreeStyle.prototype.join = function () {
	        var classList = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            classList[_i - 0] = arguments[_i];
	        }
	        var classNames = [];
	        for (var _a = 0; _a < classList.length; _a++) {
	            var value = classList[_a];
	            if (typeof value === 'string') {
	                classNames.push(value);
	            } else if (Array.isArray(value)) {
	                classNames.push(this.join.apply(this, value));
	            } else if (value != null) {
	                for (var _b = 0, _c = Object.keys(value); _b < _c.length; _b++) {
	                    var key = _c[_b];
	                    if (value[key]) {
	                        classNames.push(key);
	                    }
	                }
	            }
	        }
	        return classNames.join(' ');
	    };
	    FreeStyle.prototype.registerStyle = function (styles) {
	        return registerUserStyles(this, styles);
	    };
	    FreeStyle.prototype.registerRule = function (rule, styles) {
	        return registerUserRule(this, rule, styles);
	    };
	    FreeStyle.prototype.registerKeyframes = function (keyframes) {
	        return registerUserHashedRule(this, 'keyframes', keyframes);
	    };
	    /* istanbul ignore next */
	    FreeStyle.prototype.inject = function (target) {
	        target = target || document.head;
	        var node = document.createElement('style');
	        node.innerHTML = this.getStyles();
	        target.appendChild(node);
	        return node;
	    };
	    FreeStyle.prototype.getStyles = function () {
	        return getStyles(this);
	    };
	    FreeStyle.prototype.getIdentifier = function () {
	        return this.id;
	    };
	    FreeStyle.prototype.clone = function () {
	        return new FreeStyle(this.hash, this.id);
	    };
	    return FreeStyle;
	}(Cache);
	exports.FreeStyle = FreeStyle;
	/**
	 * Exports a simple function to create a new instance.
	 */
	function create(hash) {
	    return new FreeStyle(hash);
	}
	exports.create = create;
	//# sourceMappingURL=free-style.js.map

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var curryN = __webpack_require__(5);
	
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
	var isArray = Array.isArray || function (a) {
	  return 'length' in a;
	};
	
	var mapConstrToFn = curryN(2, function (group, constr) {
	  return constr === String ? isString : constr === Number ? isNumber : constr === Object ? isObject : constr === Array ? isArray : constr === Function ? isFunction : constr === undefined ? group : constr;
	});
	
	function Constructor(group, name, validators) {
	  validators = validators.map(mapConstrToFn(group));
	  var constructor = curryN(validators.length, function () {
	    var val = [],
	        v,
	        validator;
	    for (var i = 0; i < arguments.length; ++i) {
	      v = arguments[i];
	      validator = validators[i];
	      if (typeof validator === 'function' && validator(v) || v !== undefined && v !== null && v.of === validator) {
	        val[i] = arguments[i];
	      } else {
	        throw new TypeError('wrong value ' + v + ' passed to location ' + i + ' in ' + name);
	      }
	    }
	    val.of = group;
	    val.name = name;
	    return val;
	  });
	  return constructor;
	}
	
	function rawCase(type, cases, action, arg) {
	  if (type !== action.of) throw new TypeError('wrong type passed to case');
	  var name = action.name in cases ? action.name : '_' in cases ? '_' : undefined;
	  if (name === undefined) {
	    throw new Error('unhandled value passed to case');
	  } else {
	    return cases[name].apply(undefined, arg !== undefined ? action.concat([arg]) : action);
	  }
	}
	
	var typeCase = curryN(3, rawCase);
	var caseOn = curryN(4, rawCase);
	
	function Type(desc) {
	  var obj = {};
	  for (var key in desc) {
	    obj[key] = Constructor(obj, key, desc[key]);
	  }
	  obj.case = typeCase(obj);
	  obj.caseOn = caseOn(obj);
	  return obj;
	}
	
	module.exports = Type;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _curry2 = __webpack_require__(6);
	var _curryN = __webpack_require__(8);
	var arity = __webpack_require__(9);
	
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
	module.exports = _curry2(function curryN(length, fn) {
	  return arity(length, _curryN(length, [], fn));
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _curry1 = __webpack_require__(7);
	
	/**
	 * Optimized internal two-arity curry function.
	 *
	 * @private
	 * @category Function
	 * @param {Function} fn The function to curry.
	 * @return {Function} The curried function.
	 */
	module.exports = function _curry2(fn) {
	  return function f2(a, b) {
	    var n = arguments.length;
	    if (n === 0) {
	      return f2;
	    } else if (n === 1 && a != null && a['@@functional/placeholder'] === true) {
	      return f2;
	    } else if (n === 1) {
	      return _curry1(function (b) {
	        return fn(a, b);
	      });
	    } else if (n === 2 && a != null && a['@@functional/placeholder'] === true && b != null && b['@@functional/placeholder'] === true) {
	      return f2;
	    } else if (n === 2 && a != null && a['@@functional/placeholder'] === true) {
	      return _curry1(function (a) {
	        return fn(a, b);
	      });
	    } else if (n === 2 && b != null && b['@@functional/placeholder'] === true) {
	      return _curry1(function (b) {
	        return fn(a, b);
	      });
	    } else {
	      return fn(a, b);
	    }
	  };
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Optimized internal two-arity curry function.
	 *
	 * @private
	 * @category Function
	 * @param {Function} fn The function to curry.
	 * @return {Function} The curried function.
	 */
	module.exports = function _curry1(fn) {
	  return function f1(a) {
	    if (arguments.length === 0) {
	      return f1;
	    } else if (a != null && a['@@functional/placeholder'] === true) {
	      return f1;
	    } else {
	      return fn(a);
	    }
	  };
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var arity = __webpack_require__(9);
	
	/**
	 * Internal curryN function.
	 *
	 * @private
	 * @category Function
	 * @param {Number} length The arity of the curried function.
	 * @return {array} An array of arguments received thus far.
	 * @param {Function} fn The function to curry.
	 */
	module.exports = function _curryN(length, received, fn) {
	  return function () {
	    var combined = [];
	    var argsIdx = 0;
	    var left = length;
	    var combinedIdx = 0;
	    while (combinedIdx < received.length || argsIdx < arguments.length) {
	      var result;
	      if (combinedIdx < received.length && (received[combinedIdx] == null || received[combinedIdx]['@@functional/placeholder'] !== true || argsIdx >= arguments.length)) {
	        result = received[combinedIdx];
	      } else {
	        result = arguments[argsIdx];
	        argsIdx += 1;
	      }
	      combined[combinedIdx] = result;
	      if (result == null || result['@@functional/placeholder'] !== true) {
	        left -= 1;
	      }
	      combinedIdx += 1;
	    }
	    return left <= 0 ? fn.apply(this, combined) : arity(left, _curryN(length, combined, fn));
	  };
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _curry2 = __webpack_require__(6);
	
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
	module.exports = _curry2(function (n, fn) {
	  // jshint unused:vars
	  switch (n) {
	    case 0:
	      return function () {
	        return fn.apply(this, arguments);
	      };
	    case 1:
	      return function (a0) {
	        return fn.apply(this, arguments);
	      };
	    case 2:
	      return function (a0, a1) {
	        return fn.apply(this, arguments);
	      };
	    case 3:
	      return function (a0, a1, a2) {
	        return fn.apply(this, arguments);
	      };
	    case 4:
	      return function (a0, a1, a2, a3) {
	        return fn.apply(this, arguments);
	      };
	    case 5:
	      return function (a0, a1, a2, a3, a4) {
	        return fn.apply(this, arguments);
	      };
	    case 6:
	      return function (a0, a1, a2, a3, a4, a5) {
	        return fn.apply(this, arguments);
	      };
	    case 7:
	      return function (a0, a1, a2, a3, a4, a5, a6) {
	        return fn.apply(this, arguments);
	      };
	    case 8:
	      return function (a0, a1, a2, a3, a4, a5, a6, a7) {
	        return fn.apply(this, arguments);
	      };
	    case 9:
	      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
	        return fn.apply(this, arguments);
	      };
	    case 10:
	      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
	        return fn.apply(this, arguments);
	      };
	    default:
	      throw new Error('First argument to arity must be a non-negative integer no greater than ten');
	  }
	});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _flyd = __webpack_require__(11);
	
	var _flyd2 = _interopRequireDefault(_flyd);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var R = {
	  mapObjIndexed: __webpack_require__(18),
	  clone: __webpack_require__(29),
	  map: __webpack_require__(33),
	  merge: __webpack_require__(42),
	  curryN: __webpack_require__(40),
	  equals: __webpack_require__(43),
	  dissoc: __webpack_require__(47)
	};
	
	var connectInterface = function connectInterface(md, name, state, connections) {
	  return md.interfaces[name] ? merge(md, connections).interfaces[name](state) : {};
	};
	
	// childModuleDefsObj -> childModuleModelsObj via mDef_key -> mDef_value.init({key: mDef_key})
	// or via root mDef_key -> mDef_value.root.init({key: mDef_key, ...mDef_value[key]})
	var mergeModels = function mergeModels(mds) {
	  var obj = {};
	  for (var key in mds) {
	    obj[key] = mds[key].root ? mds[key].root.init(_extends({ key: key }, R.dissoc('root', mds[key]))) : mds[key].init({ key: key });
	  }
	  return obj;
	};
	
	/* Merge child interfaces, flatten
	  childs : Array[Object]
	  interfaceName : String
	  scope : String // use scope if use this function uses two or more times in an interface
	*/
	var mergeChilds = function mergeChilds(childs, md) {
	  var scope = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];
	  var interfaceName = arguments[3];
	  var connections = arguments[4];
	
	  var objs = {};
	  R.mapObjIndexed(function (state, idx) {
	    R.mapObjIndexed(function (obj, name) {
	      objs[scope + idx + '_' + name] = obj;
	    }, connectInterface(md, interfaceName, state, connections(+idx)));
	  }, childs);
	  return objs;
	};
	
	var mergeChild = function mergeChild(state, md, scope, interfaceName, connections) {
	  var objs = {};
	  R.mapObjIndexed(function (obj, name) {
	    objs[scope + '_' + name] = obj;
	  }, connectInterface(md, interfaceName, state, connections));
	  return objs;
	};
	
	function addModuleInfo(mDef, obj) {
	  obj._moduleName = mDef.name;
	  obj._log = mDef.log;
	  obj._logAll = mDef.logAll;
	  return obj;
	}
	
	// Composition for Fractal core, (mDefinition, connections = {}) -> ContextualizedModule
	var merge = function merge(mDefinition) {
	  var connections = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	  var mDef = R.clone(mDefinition);
	
	  var ctx = {
	    action$: _flyd2.default.stream(),
	    task$: _flyd2.default.stream(),
	    styles: !!mDef.styles ? mDef.styles : {}
	  };
	  ctx.dispatch$ = function (tasks) {
	    if (tasks != undefined && tasks instanceof Array) {
	      if (tasks.of == undefined && typeof tasks[0] !== 'string') {
	        // verify that is not a task in the form [String, TaskAction]
	        // multiple action-task syntax
	        tasks.forEach(function (t) {
	          if (R.equals(t.of, mDef.Action)) {
	            ctx.action$(t);
	          } else {
	            ctx.task$(t);
	          }
	        });
	      } else if (R.equals(tasks.of, mDef.Action)) {
	        // single action syntax for an action
	        ctx.action$(tasks);
	      } else if (tasks instanceof Array) {
	        // single action syntax for a task
	        ctx.task$(tasks);
	      }
	    } else {
	      // none sense return
	      // ctx.task$('undefined') // DEBUG
	    }
	  };
	  // append the outputs in the context
	  for (var name in mDef.outputNames) {
	    ctx[mDef.outputNames[name]] = _flyd2.default.stream();
	  }
	
	  // connection with the context
	
	  var _loop = function _loop(_name) {
	    if (!!ctx[_name]) {
	      if (_name === 'action$') {
	        _flyd2.default.on(function (d) {
	          return connections[_name](addModuleInfo(mDef, d));
	        }, ctx[_name]);
	      } else {
	        _flyd2.default.on(connections[_name], ctx[_name]);
	      }
	    }
	  };
	
	  for (var _name in connections) {
	    _loop(_name);
	  }
	
	  // contextualize inputs
	  var inputs = R.map(function (i) {
	    return R.curryN(i.length, function () {
	      // wrapper function for tasks
	      var tasks = i.apply(undefined, arguments);
	      ctx.dispatch$(tasks);
	    })(ctx, mDef.Action);
	  }, mDef.inputs);
	  ctx._md = mDef.load(ctx, inputs, mDef.Action) || {};
	
	  // connect task$
	  connectTasksToModules(ctx._md);
	
	  function connectTasksToModules(mds) {
	    function connectTasks(md) {
	      if (md.mDef) {
	        _flyd2.default.on(function (task) {
	          return ctx.task$(addModuleInfo(mDef, task));
	        }, md.ctx.task$);
	      } else {
	        // connect categorized modules
	        for (var subName in md) {
	          _flyd2.default.on(function (task) {
	            return ctx.task$(addModuleInfo(mDef, task));
	          }, md[subName].ctx.task$);
	        }
	      }
	    }
	    function connectTasksToModules_func(mds) {
	      for (var _name2 in mds) {
	        if (mds[_name2].mDef) {
	          connectTasks(mds[_name2]);
	        } else if (!_name2 === 'dynamicModules') {
	          connectTasksToModules_func(mds[_name2]);
	        }
	      }
	    }
	    return connectTasksToModules_func(mds);
	  }
	
	  var md = function md(mds) {
	    // connect task$
	    connectTasksToModules(mds);
	    ctx._md = R.merge(ctx._md, mds);
	  };
	  setTimeout(function () {
	    return mDef.loadAfter(ctx, inputs, mDef.Action, md);
	  }, 0);
	  // contextualize interfaces
	  mDef.interfaces = R.map(function (i) {
	    return R.curryN(3, i)(ctx)(inputs);
	  }, mDef.interfaces);
	
	  return _extends({}, mDef, {
	    ctx: ctx,
	    inputs: inputs
	  });
	};
	
	// merge a list of modules
	var mergeList = function mergeList(moduleNames, _md, interfaceName) {
	  var f = arguments.length <= 3 || arguments[3] === undefined ? function (interfaceObj) {
	    return interfaceObj;
	  } : arguments[3];
	  var rootModel = arguments[4];
	  return R.map(function (name) {
	    return f(_md[name].interfaces[interfaceName](rootModel[name]), name);
	  }, moduleNames);
	};
	
	// merge a list of groups
	var mergeGroup = function mergeGroup(groupName, _md, interfaceName) {
	  var f = arguments.length <= 3 || arguments[3] === undefined ? function (interfaceObj) {
	    return interfaceObj;
	  } : arguments[3];
	  var rootModel = arguments[4];
	
	  var moduleNames = Object.keys(rootModel[groupName]);
	  return R.map(function (name) {
	    return f(_md[groupName][name].interfaces[interfaceName](rootModel[groupName][name]), name);
	  }, moduleNames);
	};
	
	var mapObjToArray = function mapObjToArray(fn, obj) {
	  var arr = [];
	  for (var key in obj) {
	    arr.push(fn(obj[key], key));
	  }return arr;
	};
	
	// TODO: implement funtion that takes [list] -> ( (key, value) -> ({key, value}) ) -> {[key]: value}
	// Useful for optional styles
	
	var mergeAll = function mergeAll(childDefs, i) {
	  var scope = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];
	  var connectionsFn = arguments.length <= 3 || arguments[3] === undefined ? function (md, name) {
	    return {};
	  } : arguments[3];
	
	  var connectionsMiddleFn = function connectionsMiddleFn(connections, md, name) {
	    if (!connections.action$) {
	      if (scope == '') {
	        connections.action$ = i._childAction(name, md.update);
	      } else {
	        connections.action$ = i._childActionScoped(scope, name, md.update);
	      }
	    }
	    return connections;
	  };
	  return R.mapObjIndexed(function (md, name) {
	    var _module = md.root ? md.root : md;
	    return merge(_module, connectionsMiddleFn(connectionsFn(_module, name), _module, name));
	  }, childDefs);
	};
	
	var mergeDynamicList = function mergeDynamicList(scope, i, mds, interfaceName) {
	  var interfaceFn = arguments.length <= 4 || arguments[4] === undefined ? function (md, idx) {
	    return view;
	  } : arguments[4];
	  var m = arguments[5];
	
	  return m[scope].map(function (item, idx) {
	    return interfaceFn(merge(mds.dynamicModules[scope], {
	      action$: i._dynamicChildAction(scope, mds.dynamicModules[scope].update, idx),
	      remove$: function remove$() {
	        return i._dynamicChildRemove(scope, idx);
	      }
	    }).interfaces[interfaceName](item), idx);
	  });
	};
	
	exports.default = {
	  merge: merge,
	  mergeAll: mergeAll,
	  mergeDynamicList: mergeDynamicList,
	  mergeModels: mergeModels,
	  mergeList: mergeList,
	  mergeGroup: mergeGroup,
	  addModuleInfo: addModuleInfo,
	  // TODO: review the next
	  mergeChild: mergeChild,
	  mergeChilds: mergeChilds,
	  connectInterface: connectInterface,
	  mapObjToArray: mapObjToArray
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var curryN = __webpack_require__(12);
	
	// Utility
	function isFunction(obj) {
	  return !!(obj && obj.constructor && obj.call && obj.apply);
	}
	function trueFn() {
	  return true;
	}
	
	// Globals
	var toUpdate = [];
	var inStream;
	var order = [];
	var orderNextIdx = -1;
	var flushing = false;
	
	/** @namespace */
	var flyd = {};
	
	// /////////////////////////// API ///////////////////////////////// //
	
	/**
	 * Creates a new stream
	 *
	 * __Signature__: `a -> Stream a`
	 *
	 * @name flyd.stream
	 * @param {*} initialValue - (Optional) the initial value of the stream
	 * @return {stream} the stream
	 *
	 * @example
	 * var n = flyd.stream(1); // Stream with initial value `1`
	 * var s = flyd.stream(); // Stream with no initial value
	 */
	flyd.stream = function (initialValue) {
	  var endStream = createDependentStream([], trueFn);
	  var s = createStream();
	  s.end = endStream;
	  s.fnArgs = [];
	  endStream.listeners.push(s);
	  if (arguments.length > 0) s(initialValue);
	  return s;
	};
	
	/**
	 * Create a new dependent stream
	 *
	 * __Signature__: `(...Stream * -> Stream b -> b) -> [Stream *] -> Stream b`
	 *
	 * @name flyd.combine
	 * @param {Function} fn - the function used to combine the streams
	 * @param {Array<stream>} dependencies - the streams that this one depends on
	 * @return {stream} the dependent stream
	 *
	 * @example
	 * var n1 = flyd.stream(0);
	 * var n2 = flyd.stream(0);
	 * var max = flyd.combine(function(n1, n2, self, changed) {
	 *   return n1() > n2() ? n1() : n2();
	 * }, [n1, n2]);
	 */
	flyd.combine = curryN(2, combine);
	function combine(fn, streams) {
	  var i, s, deps, depEndStreams;
	  var endStream = createDependentStream([], trueFn);
	  deps = [];depEndStreams = [];
	  for (i = 0; i < streams.length; ++i) {
	    if (streams[i] !== undefined) {
	      deps.push(streams[i]);
	      if (streams[i].end !== undefined) depEndStreams.push(streams[i].end);
	    }
	  }
	  s = createDependentStream(deps, fn);
	  s.depsChanged = [];
	  s.fnArgs = s.deps.concat([s, s.depsChanged]);
	  s.end = endStream;
	  endStream.listeners.push(s);
	  addListeners(depEndStreams, endStream);
	  endStream.deps = depEndStreams;
	  updateStream(s);
	  return s;
	}
	
	/**
	 * Returns `true` if the supplied argument is a Flyd stream and `false` otherwise.
	 *
	 * __Signature__: `* -> Boolean`
	 *
	 * @name flyd.isStream
	 * @param {*} value - the value to test
	 * @return {Boolean} `true` if is a Flyd streamn, `false` otherwise
	 *
	 * @example
	 * var s = flyd.stream(1);
	 * var n = 1;
	 * flyd.isStream(s); //=> true
	 * flyd.isStream(n); //=> false
	 */
	flyd.isStream = function (stream) {
	  return isFunction(stream) && 'hasVal' in stream;
	};
	
	/**
	 * Invokes the body (the function to calculate the value) of a dependent stream
	 *
	 * By default the body of a dependent stream is only called when all the streams
	 * upon which it depends has a value. `immediate` can circumvent this behaviour.
	 * It immediately invokes the body of a dependent stream.
	 *
	 * __Signature__: `Stream a -> Stream a`
	 *
	 * @name flyd.immediate
	 * @param {stream} stream - the dependent stream
	 * @return {stream} the same stream
	 *
	 * @example
	 * var s = flyd.stream();
	 * var hasItems = flyd.immediate(flyd.combine(function(s) {
	 *   return s() !== undefined && s().length > 0;
	 * }, [s]);
	 * console.log(hasItems()); // logs `false`. Had `immediate` not been
	 *                          // used `hasItems()` would've returned `undefined`
	 * s([1]);
	 * console.log(hasItems()); // logs `true`.
	 * s([]);
	 * console.log(hasItems()); // logs `false`.
	 */
	flyd.immediate = function (s) {
	  if (s.depsMet === false) {
	    s.depsMet = true;
	    updateStream(s);
	  }
	  return s;
	};
	
	/**
	 * Changes which `endsStream` should trigger the ending of `s`.
	 *
	 * __Signature__: `Stream a -> Stream b -> Stream b`
	 *
	 * @name flyd.endsOn
	 * @param {stream} endStream - the stream to trigger the ending
	 * @param {stream} stream - the stream to be ended by the endStream
	 * @param {stream} the stream modified to be ended by endStream
	 *
	 * @example
	 * var n = flyd.stream(1);
	 * var killer = flyd.stream();
	 * // `double` ends when `n` ends or when `killer` emits any value
	 * var double = flyd.endsOn(flyd.merge(n.end, killer), flyd.combine(function(n) {
	 *   return 2 * n();
	 * }, [n]);
	*/
	flyd.endsOn = function (endS, s) {
	  detachDeps(s.end);
	  endS.listeners.push(s.end);
	  s.end.deps.push(endS);
	  return s;
	};
	
	/**
	 * Map a stream
	 *
	 * Returns a new stream consisting of every value from `s` passed through
	 * `fn`. I.e. `map` creates a new stream that listens to `s` and
	 * applies `fn` to every new value.
	 * __Signature__: `(a -> result) -> Stream a -> Stream result`
	 *
	 * @name flyd.map
	 * @param {Function} fn - the function that produces the elements of the new stream
	 * @param {stream} stream - the stream to map
	 * @return {stream} a new stream with the mapped values
	 *
	 * @example
	 * var numbers = flyd.stream(0);
	 * var squaredNumbers = flyd.map(function(n) { return n*n; }, numbers);
	 */
	// Library functions use self callback to accept (null, undefined) update triggers.
	flyd.map = curryN(2, function (f, s) {
	  return combine(function (s, self) {
	    self(f(s.val));
	  }, [s]);
	});
	
	/**
	 * Listen to stream events
	 *
	 * Similar to `map` except that the returned stream is empty. Use `on` for doing
	 * side effects in reaction to stream changes. Use the returned stream only if you
	 * need to manually end it.
	 *
	 * __Signature__: `(a -> result) -> Stream a -> Stream undefined`
	 *
	 * @name flyd.on
	 * @param {Function} cb - the callback
	 * @param {stream} stream - the stream
	 * @return {stream} an empty stream (can be ended)
	 */
	flyd.on = curryN(2, function (f, s) {
	  return combine(function (s) {
	    f(s.val);
	  }, [s]);
	});
	
	/**
	 * Creates a new stream with the results of calling the function on every incoming
	 * stream with and accumulator and the incoming value.
	 *
	 * __Signature__: `(a -> b -> a) -> a -> Stream b -> Stream a`
	 *
	 * @name flyd.scan
	 * @param {Function} fn - the function to call
	 * @param {*} val - the initial value of the accumulator
	 * @param {stream} stream - the stream source
	 * @return {stream} the new stream
	 *
	 * @example
	 * var numbers = flyd.stream();
	 * var sum = flyd.scan(function(sum, n) { return sum+n; }, 0, numbers);
	 * numbers(2)(3)(5);
	 * sum(); // 10
	 */
	flyd.scan = curryN(3, function (f, acc, s) {
	  var ns = combine(function (s, self) {
	    self(acc = f(acc, s.val));
	  }, [s]);
	  if (!ns.hasVal) ns(acc);
	  return ns;
	});
	
	/**
	 * Creates a new stream down which all values from both `stream1` and `stream2`
	 * will be sent.
	 *
	 * __Signature__: `Stream a -> Stream a -> Stream a`
	 *
	 * @name flyd.merge
	 * @param {stream} source1 - one stream to be merged
	 * @param {stream} source2 - the other stream to be merged
	 * @return {stream} a stream with the values from both sources
	 *
	 * @example
	 * var btn1Clicks = flyd.stream();
	 * button1Elm.addEventListener(btn1Clicks);
	 * var btn2Clicks = flyd.stream();
	 * button2Elm.addEventListener(btn2Clicks);
	 * var allClicks = flyd.merge(btn1Clicks, btn2Clicks);
	 */
	flyd.merge = curryN(2, function (s1, s2) {
	  var s = flyd.immediate(combine(function (s1, s2, self, changed) {
	    if (changed[0]) {
	      self(changed[0]());
	    } else if (s1.hasVal) {
	      self(s1.val);
	    } else if (s2.hasVal) {
	      self(s2.val);
	    }
	  }, [s1, s2]));
	  flyd.endsOn(combine(function () {
	    return true;
	  }, [s1.end, s2.end]), s);
	  return s;
	});
	
	/**
	 * Creates a new stream resulting from applying `transducer` to `stream`.
	 *
	 * __Signature__: `Transducer -> Stream a -> Stream b`
	 *
	 * @name flyd.transduce
	 * @param {Transducer} xform - the transducer transformation
	 * @param {stream} source - the stream source
	 * @return {stream} the new stream
	 *
	 * @example
	 * var t = require('transducers.js');
	 *
	 * var results = [];
	 * var s1 = flyd.stream();
	 * var tx = t.compose(t.map(function(x) { return x * 2; }), t.dedupe());
	 * var s2 = flyd.transduce(tx, s1);
	 * flyd.combine(function(s2) { results.push(s2()); }, [s2]);
	 * s1(1)(1)(2)(3)(3)(3)(4);
	 * results; // => [2, 4, 6, 8]
	 */
	flyd.transduce = curryN(2, function (xform, source) {
	  xform = xform(new StreamTransformer());
	  return combine(function (source, self) {
	    var res = xform['@@transducer/step'](undefined, source.val);
	    if (res && res['@@transducer/reduced'] === true) {
	      self.end(true);
	      return res['@@transducer/value'];
	    } else {
	      return res;
	    }
	  }, [source]);
	});
	
	/**
	 * Returns `fn` curried to `n`. Use this function to curry functions exposed by
	 * modules for Flyd.
	 *
	 * @name flyd.curryN
	 * @function
	 * @param {Integer} arity - the function arity
	 * @param {Function} fn - the function to curry
	 * @return {Function} the curried function
	 *
	 * @example
	 * function add(x, y) { return x + y; };
	 * var a = flyd.curryN(2, add);
	 * a(2)(4) // => 6
	 */
	flyd.curryN = curryN;
	
	/**
	 * Returns a new stream identical to the original except every
	 * value will be passed through `f`.
	 *
	 * _Note:_ This function is included in order to support the fantasy land
	 * specification.
	 *
	 * __Signature__: Called bound to `Stream a`: `(a -> b) -> Stream b`
	 *
	 * @name stream.map
	 * @param {Function} function - the function to apply
	 * @return {stream} a new stream with the values mapped
	 *
	 * @example
	 * var numbers = flyd.stream(0);
	 * var squaredNumbers = numbers.map(function(n) { return n*n; });
	 */
	function boundMap(f) {
	  return flyd.map(f, this);
	}
	
	/**
	 * Returns a new stream which is the result of applying the
	 * functions from `this` stream to the values in `stream` parameter.
	 *
	 * `this` stream must be a stream of functions.
	 *
	 * _Note:_ This function is included in order to support the fantasy land
	 * specification.
	 *
	 * __Signature__: Called bound to `Stream (a -> b)`: `a -> Stream b`
	 *
	 * @name stream.ap
	 * @param {stream} stream - the values stream
	 * @return {stream} a new stram with the functions applied to values
	 *
	 * @example
	 * var add = flyd.curryN(2, function(x, y) { return x + y; });
	 * var numbers1 = flyd.stream();
	 * var numbers2 = flyd.stream();
	 * var addToNumbers1 = flyd.map(add, numbers1);
	 * var added = addToNumbers1.ap(numbers2);
	 */
	function ap(s2) {
	  var s1 = this;
	  return combine(function (s1, s2, self) {
	    self(s1.val(s2.val));
	  }, [s1, s2]);
	}
	
	/**
	 * Get a human readable view of a stream
	 * @name stream.toString
	 * @return {String} the stream string representation
	 */
	function streamToString() {
	  return 'stream(' + this.val + ')';
	}
	
	/**
	 * @name stream.end
	 * @memberof stream
	 * A stream that emits `true` when the stream ends. If `true` is pushed down the
	 * stream the parent stream ends.
	 */
	
	/**
	 * @name stream.of
	 * @function
	 * @memberof stream
	 * Returns a new stream with `value` as its initial value. It is identical to
	 * calling `flyd.stream` with one argument.
	 *
	 * __Signature__: Called bound to `Stream (a)`: `b -> Stream b`
	 *
	 * @param {*} value - the initial value
	 * @return {stream} the new stream
	 *
	 * @example
	 * var n = flyd.stream(1);
	 * var m = n.of(1);
	 */
	
	// /////////////////////////// PRIVATE ///////////////////////////////// //
	/**
	 * @private
	 * Create a stream with no dependencies and no value
	 * @return {Function} a flyd stream
	 */
	function createStream() {
	  function s(n) {
	    if (arguments.length === 0) return s.val;
	    updateStreamValue(s, n);
	    return s;
	  }
	  s.hasVal = false;
	  s.val = undefined;
	  s.vals = [];
	  s.listeners = [];
	  s.queued = false;
	  s.end = undefined;
	  s.map = boundMap;
	  s.ap = ap;
	  s.of = flyd.stream;
	  s.toString = streamToString;
	  return s;
	}
	
	/**
	 * @private
	 * Create a dependent stream
	 * @param {Array<stream>} dependencies - an array of the streams
	 * @param {Function} fn - the function used to calculate the new stream value
	 * from the dependencies
	 * @return {stream} the created stream
	 */
	function createDependentStream(deps, fn) {
	  var s = createStream();
	  s.fn = fn;
	  s.deps = deps;
	  s.depsMet = false;
	  s.depsChanged = deps.length > 0 ? [] : undefined;
	  s.shouldUpdate = false;
	  addListeners(deps, s);
	  return s;
	}
	
	/**
	 * @private
	 * Check if all the dependencies have values
	 * @param {stream} stream - the stream to check depencencies from
	 * @return {Boolean} `true` if all dependencies have vales, `false` otherwise
	 */
	function initialDepsNotMet(stream) {
	  stream.depsMet = stream.deps.every(function (s) {
	    return s.hasVal;
	  });
	  return !stream.depsMet;
	}
	
	/**
	 * @private
	 * Update a dependent stream using its dependencies in an atomic way
	 * @param {stream} stream - the stream to update
	 */
	function updateStream(s) {
	  if (s.depsMet !== true && initialDepsNotMet(s) || s.end !== undefined && s.end.val === true) return;
	  if (inStream !== undefined) {
	    toUpdate.push(s);
	    return;
	  }
	  inStream = s;
	  if (s.depsChanged) s.fnArgs[s.fnArgs.length - 1] = s.depsChanged;
	  var returnVal = s.fn.apply(s.fn, s.fnArgs);
	  if (returnVal !== undefined) {
	    s(returnVal);
	  }
	  inStream = undefined;
	  if (s.depsChanged !== undefined) s.depsChanged = [];
	  s.shouldUpdate = false;
	  if (flushing === false) flushUpdate();
	}
	
	/**
	 * @private
	 * Update the dependencies of a stream
	 * @param {stream} stream
	 */
	function updateDeps(s) {
	  var i, o, list;
	  var listeners = s.listeners;
	  for (i = 0; i < listeners.length; ++i) {
	    list = listeners[i];
	    if (list.end === s) {
	      endStream(list);
	    } else {
	      if (list.depsChanged !== undefined) list.depsChanged.push(s);
	      list.shouldUpdate = true;
	      findDeps(list);
	    }
	  }
	  for (; orderNextIdx >= 0; --orderNextIdx) {
	    o = order[orderNextIdx];
	    if (o.shouldUpdate === true) updateStream(o);
	    o.queued = false;
	  }
	}
	
	/**
	 * @private
	 * Add stream dependencies to the global `order` queue.
	 * @param {stream} stream
	 * @see updateDeps
	 */
	function findDeps(s) {
	  var i;
	  var listeners = s.listeners;
	  if (s.queued === false) {
	    s.queued = true;
	    for (i = 0; i < listeners.length; ++i) {
	      findDeps(listeners[i]);
	    }
	    order[++orderNextIdx] = s;
	  }
	}
	
	/**
	 * @private
	 */
	function flushUpdate() {
	  flushing = true;
	  while (toUpdate.length > 0) {
	    var s = toUpdate.shift();
	    if (s.vals.length > 0) s.val = s.vals.shift();
	    updateDeps(s);
	  }
	  flushing = false;
	}
	
	/**
	 * @private
	 * Push down a value into a stream
	 * @param {stream} stream
	 * @param {*} value
	 */
	function updateStreamValue(s, n) {
	  if (n !== undefined && n !== null && isFunction(n.then)) {
	    n.then(s);
	    return;
	  }
	  s.val = n;
	  s.hasVal = true;
	  if (inStream === undefined) {
	    flushing = true;
	    updateDeps(s);
	    if (toUpdate.length > 0) flushUpdate();else flushing = false;
	  } else if (inStream === s) {
	    markListeners(s, s.listeners);
	  } else {
	    s.vals.push(n);
	    toUpdate.push(s);
	  }
	}
	
	/**
	 * @private
	 */
	function markListeners(s, lists) {
	  var i, list;
	  for (i = 0; i < lists.length; ++i) {
	    list = lists[i];
	    if (list.end !== s) {
	      if (list.depsChanged !== undefined) {
	        list.depsChanged.push(s);
	      }
	      list.shouldUpdate = true;
	    } else {
	      endStream(list);
	    }
	  }
	}
	
	/**
	 * @private
	 * Add dependencies to a stream
	 * @param {Array<stream>} dependencies
	 * @param {stream} stream
	 */
	function addListeners(deps, s) {
	  for (var i = 0; i < deps.length; ++i) {
	    deps[i].listeners.push(s);
	  }
	}
	
	/**
	 * @private
	 * Removes an stream from a dependency array
	 * @param {stream} stream
	 * @param {Array<stream>} dependencies
	 */
	function removeListener(s, listeners) {
	  var idx = listeners.indexOf(s);
	  listeners[idx] = listeners[listeners.length - 1];
	  listeners.length--;
	}
	
	/**
	 * @private
	 * Detach a stream from its dependencies
	 * @param {stream} stream
	 */
	function detachDeps(s) {
	  for (var i = 0; i < s.deps.length; ++i) {
	    removeListener(s, s.deps[i].listeners);
	  }
	  s.deps.length = 0;
	}
	
	/**
	 * @private
	 * Ends a stream
	 */
	function endStream(s) {
	  if (s.deps !== undefined) detachDeps(s);
	  if (s.end !== undefined) detachDeps(s.end);
	}
	
	/**
	 * @private
	 * transducer stream transformer
	 */
	function StreamTransformer() {}
	StreamTransformer.prototype['@@transducer/init'] = function () {};
	StreamTransformer.prototype['@@transducer/result'] = function () {};
	StreamTransformer.prototype['@@transducer/step'] = function (s, v) {
	  return v;
	};
	
	module.exports = flyd;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _arity = __webpack_require__(13);
	var _curry1 = __webpack_require__(14);
	var _curry2 = __webpack_require__(16);
	var _curryN = __webpack_require__(17);
	
	/**
	 * Returns a curried equivalent of the provided function, with the specified
	 * arity. The curried function has two unusual capabilities. First, its
	 * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the
	 * following are equivalent:
	 *
	 *   - `g(1)(2)(3)`
	 *   - `g(1)(2, 3)`
	 *   - `g(1, 2)(3)`
	 *   - `g(1, 2, 3)`
	 *
	 * Secondly, the special placeholder value `R.__` may be used to specify
	 * "gaps", allowing partial application of any combination of arguments,
	 * regardless of their positions. If `g` is as above and `_` is `R.__`, the
	 * following are equivalent:
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
	 * @since v0.5.0
	 * @category Function
	 * @sig Number -> (* -> a) -> (* -> a)
	 * @param {Number} length The arity for the returned function.
	 * @param {Function} fn The function to curry.
	 * @return {Function} A new, curried function.
	 * @see R.curry
	 * @example
	 *
	 *      var sumArgs = (...args) => R.sum(args);
	 *
	 *      var curriedAddFourNumbers = R.curryN(4, sumArgs);
	 *      var f = curriedAddFourNumbers(1, 2);
	 *      var g = f(3);
	 *      g(4); //=> 10
	 */
	module.exports = _curry2(function curryN(length, fn) {
	  if (length === 1) {
	    return _curry1(fn);
	  }
	  return _arity(length, _curryN(length, [], fn));
	});

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function _arity(n, fn) {
	  /* eslint-disable no-unused-vars */
	  switch (n) {
	    case 0:
	      return function () {
	        return fn.apply(this, arguments);
	      };
	    case 1:
	      return function (a0) {
	        return fn.apply(this, arguments);
	      };
	    case 2:
	      return function (a0, a1) {
	        return fn.apply(this, arguments);
	      };
	    case 3:
	      return function (a0, a1, a2) {
	        return fn.apply(this, arguments);
	      };
	    case 4:
	      return function (a0, a1, a2, a3) {
	        return fn.apply(this, arguments);
	      };
	    case 5:
	      return function (a0, a1, a2, a3, a4) {
	        return fn.apply(this, arguments);
	      };
	    case 6:
	      return function (a0, a1, a2, a3, a4, a5) {
	        return fn.apply(this, arguments);
	      };
	    case 7:
	      return function (a0, a1, a2, a3, a4, a5, a6) {
	        return fn.apply(this, arguments);
	      };
	    case 8:
	      return function (a0, a1, a2, a3, a4, a5, a6, a7) {
	        return fn.apply(this, arguments);
	      };
	    case 9:
	      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
	        return fn.apply(this, arguments);
	      };
	    case 10:
	      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
	        return fn.apply(this, arguments);
	      };
	    default:
	      throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
	  }
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _isPlaceholder = __webpack_require__(15);
	
	/**
	 * Optimized internal one-arity curry function.
	 *
	 * @private
	 * @category Function
	 * @param {Function} fn The function to curry.
	 * @return {Function} The curried function.
	 */
	module.exports = function _curry1(fn) {
	  return function f1(a) {
	    if (arguments.length === 0 || _isPlaceholder(a)) {
	      return f1;
	    } else {
	      return fn.apply(this, arguments);
	    }
	  };
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	module.exports = function _isPlaceholder(a) {
	       return a != null && (typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object' && a['@@functional/placeholder'] === true;
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _curry1 = __webpack_require__(14);
	var _isPlaceholder = __webpack_require__(15);
	
	/**
	 * Optimized internal two-arity curry function.
	 *
	 * @private
	 * @category Function
	 * @param {Function} fn The function to curry.
	 * @return {Function} The curried function.
	 */
	module.exports = function _curry2(fn) {
	  return function f2(a, b) {
	    switch (arguments.length) {
	      case 0:
	        return f2;
	      case 1:
	        return _isPlaceholder(a) ? f2 : _curry1(function (_b) {
	          return fn(a, _b);
	        });
	      default:
	        return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function (_a) {
	          return fn(_a, b);
	        }) : _isPlaceholder(b) ? _curry1(function (_b) {
	          return fn(a, _b);
	        }) : fn(a, b);
	    }
	  };
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _arity = __webpack_require__(13);
	var _isPlaceholder = __webpack_require__(15);
	
	/**
	 * Internal curryN function.
	 *
	 * @private
	 * @category Function
	 * @param {Number} length The arity of the curried function.
	 * @param {Array} received An array of arguments received thus far.
	 * @param {Function} fn The function to curry.
	 * @return {Function} The curried function.
	 */
	module.exports = function _curryN(length, received, fn) {
	  return function () {
	    var combined = [];
	    var argsIdx = 0;
	    var left = length;
	    var combinedIdx = 0;
	    while (combinedIdx < received.length || argsIdx < arguments.length) {
	      var result;
	      if (combinedIdx < received.length && (!_isPlaceholder(received[combinedIdx]) || argsIdx >= arguments.length)) {
	        result = received[combinedIdx];
	      } else {
	        result = arguments[argsIdx];
	        argsIdx += 1;
	      }
	      combined[combinedIdx] = result;
	      if (!_isPlaceholder(result)) {
	        left -= 1;
	      }
	      combinedIdx += 1;
	    }
	    return left <= 0 ? fn.apply(this, combined) : _arity(left, _curryN(length, combined, fn));
	  };
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _curry2 = __webpack_require__(19);
	var _reduce = __webpack_require__(21);
	var keys = __webpack_require__(27);
	
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
	module.exports = _curry2(function mapObjIndexed(fn, obj) {
	  return _reduce(function (acc, key) {
	    acc[key] = fn(obj[key], key, obj);
	    return acc;
	  }, {}, keys(obj));
	});

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _curry1 = __webpack_require__(20);
	
	/**
	 * Optimized internal two-arity curry function.
	 *
	 * @private
	 * @category Function
	 * @param {Function} fn The function to curry.
	 * @return {Function} The curried function.
	 */
	module.exports = function _curry2(fn) {
	  return function f2(a, b) {
	    var n = arguments.length;
	    if (n === 0) {
	      return f2;
	    } else if (n === 1 && a != null && a['@@functional/placeholder'] === true) {
	      return f2;
	    } else if (n === 1) {
	      return _curry1(function (b) {
	        return fn(a, b);
	      });
	    } else if (n === 2 && a != null && a['@@functional/placeholder'] === true && b != null && b['@@functional/placeholder'] === true) {
	      return f2;
	    } else if (n === 2 && a != null && a['@@functional/placeholder'] === true) {
	      return _curry1(function (a) {
	        return fn(a, b);
	      });
	    } else if (n === 2 && b != null && b['@@functional/placeholder'] === true) {
	      return _curry1(function (b) {
	        return fn(a, b);
	      });
	    } else {
	      return fn(a, b);
	    }
	  };
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Optimized internal one-arity curry function.
	 *
	 * @private
	 * @category Function
	 * @param {Function} fn The function to curry.
	 * @return {Function} The curried function.
	 */
	module.exports = function _curry1(fn) {
	  return function f1(a) {
	    if (arguments.length === 0) {
	      return f1;
	    } else if (a != null && a['@@functional/placeholder'] === true) {
	      return f1;
	    } else {
	      return fn.apply(this, arguments);
	    }
	  };
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _xwrap = __webpack_require__(22);
	var bind = __webpack_require__(23);
	var isArrayLike = __webpack_require__(25);
	
	module.exports = function () {
	  function _arrayReduce(xf, acc, list) {
	    var idx = 0,
	        len = list.length;
	    while (idx < len) {
	      acc = xf['@@transducer/step'](acc, list[idx]);
	      if (acc && acc['@@transducer/reduced']) {
	        acc = acc['@@transducer/value'];
	        break;
	      }
	      idx += 1;
	    }
	    return xf['@@transducer/result'](acc);
	  }
	
	  function _iterableReduce(xf, acc, iter) {
	    var step = iter.next();
	    while (!step.done) {
	      acc = xf['@@transducer/step'](acc, step.value);
	      if (acc && acc['@@transducer/reduced']) {
	        acc = acc['@@transducer/value'];
	        break;
	      }
	      step = iter.next();
	    }
	    return xf['@@transducer/result'](acc);
	  }
	
	  function _methodReduce(xf, acc, obj) {
	    return xf['@@transducer/result'](obj.reduce(bind(xf['@@transducer/step'], xf), acc));
	  }
	
	  var symIterator = typeof Symbol !== 'undefined' ? Symbol.iterator : '@@iterator';
	  return function _reduce(fn, acc, list) {
	    if (typeof fn === 'function') {
	      fn = _xwrap(fn);
	    }
	    if (isArrayLike(list)) {
	      return _arrayReduce(fn, acc, list);
	    }
	    if (typeof list.reduce === 'function') {
	      return _methodReduce(fn, acc, list);
	    }
	    if (list[symIterator] != null) {
	      return _iterableReduce(fn, acc, list[symIterator]());
	    }
	    if (typeof list.next === 'function') {
	      return _iterableReduce(fn, acc, list);
	    }
	    throw new TypeError('reduce: list must be array or iterable');
	  };
	}();

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function () {
	  function XWrap(fn) {
	    this.f = fn;
	  }
	  XWrap.prototype['@@transducer/init'] = function () {
	    throw new Error('init not implemented on XWrap');
	  };
	  XWrap.prototype['@@transducer/result'] = function (acc) {
	    return acc;
	  };
	  XWrap.prototype['@@transducer/step'] = function (acc, x) {
	    return this.f(acc, x);
	  };
	
	  return function _xwrap(fn) {
	    return new XWrap(fn);
	  };
	}();

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _arity = __webpack_require__(24);
	var _curry2 = __webpack_require__(19);
	
	/**
	 * Creates a function that is bound to a context.
	 * Note: `R.bind` does not provide the additional argument-binding capabilities of
	 * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
	 *
	 * @func
	 * @memberOf R
	 * @since v0.6.0
	 * @category Function
	 * @category Object
	 * @see R.partial
	 * @sig (* -> *) -> {*} -> (* -> *)
	 * @param {Function} fn The function to bind to context
	 * @param {Object} thisObj The context to bind `fn` to
	 * @return {Function} A function that will execute in the context of `thisObj`.
	 */
	module.exports = _curry2(function bind(fn, thisObj) {
	  return _arity(fn.length, function () {
	    return fn.apply(thisObj, arguments);
	  });
	});

/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function _arity(n, fn) {
	  // jshint unused:vars
	  switch (n) {
	    case 0:
	      return function () {
	        return fn.apply(this, arguments);
	      };
	    case 1:
	      return function (a0) {
	        return fn.apply(this, arguments);
	      };
	    case 2:
	      return function (a0, a1) {
	        return fn.apply(this, arguments);
	      };
	    case 3:
	      return function (a0, a1, a2) {
	        return fn.apply(this, arguments);
	      };
	    case 4:
	      return function (a0, a1, a2, a3) {
	        return fn.apply(this, arguments);
	      };
	    case 5:
	      return function (a0, a1, a2, a3, a4) {
	        return fn.apply(this, arguments);
	      };
	    case 6:
	      return function (a0, a1, a2, a3, a4, a5) {
	        return fn.apply(this, arguments);
	      };
	    case 7:
	      return function (a0, a1, a2, a3, a4, a5, a6) {
	        return fn.apply(this, arguments);
	      };
	    case 8:
	      return function (a0, a1, a2, a3, a4, a5, a6, a7) {
	        return fn.apply(this, arguments);
	      };
	    case 9:
	      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
	        return fn.apply(this, arguments);
	      };
	    case 10:
	      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
	        return fn.apply(this, arguments);
	      };
	    default:
	      throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
	  }
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _curry1 = __webpack_require__(20);
	var _isArray = __webpack_require__(26);
	
	/**
	 * Tests whether or not an object is similar to an array.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.5.0
	 * @category Type
	 * @category List
	 * @sig * -> Boolean
	 * @param {*} x The object to test.
	 * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
	 * @example
	 *
	 *      R.isArrayLike([]); //=> true
	 *      R.isArrayLike(true); //=> false
	 *      R.isArrayLike({}); //=> false
	 *      R.isArrayLike({length: 10}); //=> false
	 *      R.isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
	 */
	module.exports = _curry1(function isArrayLike(x) {
	  if (_isArray(x)) {
	    return true;
	  }
	  if (!x) {
	    return false;
	  }
	  if ((typeof x === 'undefined' ? 'undefined' : _typeof(x)) !== 'object') {
	    return false;
	  }
	  if (x instanceof String) {
	    return false;
	  }
	  if (x.nodeType === 1) {
	    return !!x.length;
	  }
	  if (x.length === 0) {
	    return true;
	  }
	  if (x.length > 0) {
	    return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
	  }
	  return false;
	});

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Tests whether or not an object is an array.
	 *
	 * @private
	 * @param {*} val The object to test.
	 * @return {Boolean} `true` if `val` is an array, `false` otherwise.
	 * @example
	 *
	 *      _isArray([]); //=> true
	 *      _isArray(null); //=> false
	 *      _isArray({}); //=> false
	 */
	module.exports = Array.isArray || function _isArray(val) {
	  return val != null && val.length >= 0 && Object.prototype.toString.call(val) === '[object Array]';
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _curry1 = __webpack_require__(20);
	var _has = __webpack_require__(28);
	
	/**
	 * Returns a list containing the names of all the enumerable own
	 * properties of the supplied object.
	 * Note that the order of the output array is not guaranteed to be
	 * consistent across different JS platforms.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category Object
	 * @sig {k: v} -> [k]
	 * @param {Object} obj The object to extract properties from
	 * @return {Array} An array of the object's own properties.
	 * @example
	 *
	 *      R.keys({a: 1, b: 2, c: 3}); //=> ['a', 'b', 'c']
	 */
	module.exports = function () {
	  // cover IE < 9 keys issues
	  var hasEnumBug = !{ toString: null }.propertyIsEnumerable('toString');
	  var nonEnumerableProps = ['constructor', 'valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];
	
	  var contains = function contains(list, item) {
	    var idx = 0;
	    while (idx < list.length) {
	      if (list[idx] === item) {
	        return true;
	      }
	      idx += 1;
	    }
	    return false;
	  };
	
	  return typeof Object.keys === 'function' ? _curry1(function keys(obj) {
	    return Object(obj) !== obj ? [] : Object.keys(obj);
	  }) : _curry1(function keys(obj) {
	    if (Object(obj) !== obj) {
	      return [];
	    }
	    var prop,
	        ks = [],
	        nIdx;
	    for (prop in obj) {
	      if (_has(prop, obj)) {
	        ks[ks.length] = prop;
	      }
	    }
	    if (hasEnumBug) {
	      nIdx = nonEnumerableProps.length - 1;
	      while (nIdx >= 0) {
	        prop = nonEnumerableProps[nIdx];
	        if (_has(prop, obj) && !contains(ks, prop)) {
	          ks[ks.length] = prop;
	        }
	        nIdx -= 1;
	      }
	    }
	    return ks;
	  });
	}();

/***/ },
/* 28 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function _has(prop, obj) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _clone = __webpack_require__(30);
	var _curry1 = __webpack_require__(20);
	
	/**
	 * Creates a deep copy of the value which may contain (nested) `Array`s and `Object`s, `Number`s,
	 * `String`s, `Boolean`s and `Date`s. `Function`s are not copied, but assigned by their
	 * reference. Dispatches to a `clone` method if present.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category Object
	 * @sig {*} -> {*}
	 * @param {*} value The object or array to clone
	 * @return {*} A new object or array.
	 * @example
	 *
	 *      var objects = [{}, {}, {}];
	 *      var objectsClone = R.clone(objects);
	 *      objects[0] === objectsClone[0]; //=> false
	 */
	module.exports = _curry1(function clone(value) {
	  return value != null && typeof value.clone === 'function' ? value.clone() : _clone(value, [], []);
	});

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _cloneRegExp = __webpack_require__(31);
	var type = __webpack_require__(32);
	
	/**
	 * Copies an object.
	 *
	 * @private
	 * @param {*} value The value to be copied
	 * @param {Array} refFrom Array containing the source references
	 * @param {Array} refTo Array containing the copied source references
	 * @return {*} The copied value.
	 */
	module.exports = function _clone(value, refFrom, refTo) {
	  var copy = function copy(copiedValue) {
	    var len = refFrom.length;
	    var idx = 0;
	    while (idx < len) {
	      if (value === refFrom[idx]) {
	        return refTo[idx];
	      }
	      idx += 1;
	    }
	    refFrom[idx + 1] = value;
	    refTo[idx + 1] = copiedValue;
	    for (var key in value) {
	      copiedValue[key] = _clone(value[key], refFrom, refTo);
	    }
	    return copiedValue;
	  };
	  switch (type(value)) {
	    case 'Object':
	      return copy({});
	    case 'Array':
	      return copy([]);
	    case 'Date':
	      return new Date(value);
	    case 'RegExp':
	      return _cloneRegExp(value);
	    default:
	      return value;
	  }
	};

/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function _cloneRegExp(pattern) {
	                                  return new RegExp(pattern.source, (pattern.global ? 'g' : '') + (pattern.ignoreCase ? 'i' : '') + (pattern.multiline ? 'm' : '') + (pattern.sticky ? 'y' : '') + (pattern.unicode ? 'u' : ''));
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _curry1 = __webpack_require__(20);
	
	/**
	 * Gives a single-word string description of the (native) type of a value, returning such
	 * answers as 'Object', 'Number', 'Array', or 'Null'.  Does not attempt to distinguish user
	 * Object types any further, reporting them all as 'Object'.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.8.0
	 * @category Type
	 * @sig (* -> {*}) -> String
	 * @param {*} val The value to test
	 * @return {String}
	 * @example
	 *
	 *      R.type({}); //=> "Object"
	 *      R.type(1); //=> "Number"
	 *      R.type(false); //=> "Boolean"
	 *      R.type('s'); //=> "String"
	 *      R.type(null); //=> "Null"
	 *      R.type([]); //=> "Array"
	 *      R.type(/[A-z]/); //=> "RegExp"
	 */
	module.exports = _curry1(function type(val) {
	  return val === null ? 'Null' : val === undefined ? 'Undefined' : Object.prototype.toString.call(val).slice(8, -1);
	});

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _curry2 = __webpack_require__(19);
	var _dispatchable = __webpack_require__(34);
	var _map = __webpack_require__(37);
	var _reduce = __webpack_require__(21);
	var _xmap = __webpack_require__(38);
	var curryN = __webpack_require__(40);
	var keys = __webpack_require__(27);
	
	/**
	 * Returns a new list, constructed by applying the supplied function to every element of the
	 * supplied list.
	 *
	 * Note: `R.map` does not skip deleted or unassigned indices (sparse arrays), unlike the
	 * native `Array.prototype.map` method. For more details on this behavior, see:
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map#Description
	 *
	 * Dispatches to the `map` method of the second argument, if present.
	 *
	 * Acts as a transducer if a transformer is given in list position.
	 * @see R.transduce
	 *
	 * Map treats also treats functions as functors and will compose them together.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category List
	 * @sig Functor f => (a -> b) -> f a -> f b
	 * @param {Function} fn The function to be called on every element of the input `list`.
	 * @param {Array} list The list to be iterated over.
	 * @return {Array} The new list.
	 * @example
	 *
	 *      var double = x => x * 2;
	 *
	 *      R.map(double, [1, 2, 3]); //=> [2, 4, 6]
	 *
	 *      R.map(double, {x: 1, y: 2, z: 3}); //=> {x: 2, y: 4, z: 6}
	 */
	module.exports = _curry2(_dispatchable('map', _xmap, function map(fn, functor) {
	  switch (Object.prototype.toString.call(functor)) {
	    case '[object Function]':
	      return curryN(functor.length, function () {
	        return fn.call(this, functor.apply(this, arguments));
	      });
	    case '[object Object]':
	      return _reduce(function (acc, key) {
	        acc[key] = fn(functor[key]);
	        return acc;
	      }, {}, keys(functor));
	    default:
	      return _map(fn, functor);
	  }
	}));

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _isArray = __webpack_require__(26);
	var _isTransformer = __webpack_require__(35);
	var _slice = __webpack_require__(36);
	
	/**
	 * Returns a function that dispatches with different strategies based on the
	 * object in list position (last argument). If it is an array, executes [fn].
	 * Otherwise, if it has a  function with [methodname], it will execute that
	 * function (functor case). Otherwise, if it is a transformer, uses transducer
	 * [xf] to return a new transformer (transducer case). Otherwise, it will
	 * default to executing [fn].
	 *
	 * @private
	 * @param {String} methodname property to check for a custom implementation
	 * @param {Function} xf transducer to initialize if object is transformer
	 * @param {Function} fn default ramda implementation
	 * @return {Function} A function that dispatches on object in list position
	 */
	module.exports = function _dispatchable(methodname, xf, fn) {
	  return function () {
	    var length = arguments.length;
	    if (length === 0) {
	      return fn();
	    }
	    var obj = arguments[length - 1];
	    if (!_isArray(obj)) {
	      var args = _slice(arguments, 0, length - 1);
	      if (typeof obj[methodname] === 'function') {
	        return obj[methodname].apply(obj, args);
	      }
	      if (_isTransformer(obj)) {
	        var transducer = xf.apply(null, args);
	        return transducer(obj);
	      }
	    }
	    return fn.apply(this, arguments);
	  };
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function _isTransformer(obj) {
	  return typeof obj['@@transducer/step'] === 'function';
	};

/***/ },
/* 36 */
/***/ function(module, exports) {

	"use strict";
	
	/**
	 * An optimized, private array `slice` implementation.
	 *
	 * @private
	 * @param {Arguments|Array} args The array or arguments object to consider.
	 * @param {Number} [from=0] The array index to slice from, inclusive.
	 * @param {Number} [to=args.length] The array index to slice to, exclusive.
	 * @return {Array} A new, sliced array.
	 * @example
	 *
	 *      _slice([1, 2, 3, 4, 5], 1, 3); //=> [2, 3]
	 *
	 *      var firstThreeArgs = function(a, b, c, d) {
	 *        return _slice(arguments, 0, 3);
	 *      };
	 *      firstThreeArgs(1, 2, 3, 4); //=> [1, 2, 3]
	 */
	module.exports = function _slice(args, from, to) {
	  switch (arguments.length) {
	    case 1:
	      return _slice(args, 0, args.length);
	    case 2:
	      return _slice(args, from, args.length);
	    default:
	      var list = [];
	      var idx = 0;
	      var len = Math.max(0, Math.min(args.length, to) - from);
	      while (idx < len) {
	        list[idx] = args[from + idx];
	        idx += 1;
	      }
	      return list;
	  }
	};

/***/ },
/* 37 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function _map(fn, functor) {
	  var idx = 0;
	  var len = functor.length;
	  var result = Array(len);
	  while (idx < len) {
	    result[idx] = fn(functor[idx]);
	    idx += 1;
	  }
	  return result;
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _curry2 = __webpack_require__(19);
	var _xfBase = __webpack_require__(39);
	
	module.exports = function () {
	  function XMap(f, xf) {
	    this.xf = xf;
	    this.f = f;
	  }
	  XMap.prototype['@@transducer/init'] = _xfBase.init;
	  XMap.prototype['@@transducer/result'] = _xfBase.result;
	  XMap.prototype['@@transducer/step'] = function (result, input) {
	    return this.xf['@@transducer/step'](result, this.f(input));
	  };
	
	  return _curry2(function _xmap(f, xf) {
	    return new XMap(f, xf);
	  });
	}();

/***/ },
/* 39 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
	  init: function init() {
	    return this.xf['@@transducer/init']();
	  },
	  result: function result(_result) {
	    return this.xf['@@transducer/result'](_result);
	  }
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _arity = __webpack_require__(24);
	var _curry1 = __webpack_require__(20);
	var _curry2 = __webpack_require__(19);
	var _curryN = __webpack_require__(41);
	
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
	 * @since v0.5.0
	 * @category Function
	 * @sig Number -> (* -> a) -> (* -> a)
	 * @param {Number} length The arity for the returned function.
	 * @param {Function} fn The function to curry.
	 * @return {Function} A new, curried function.
	 * @see R.curry
	 * @example
	 *
	 *      var sumArgs = (...args) => R.sum(args);
	 *
	 *      var curriedAddFourNumbers = R.curryN(4, sumArgs);
	 *      var f = curriedAddFourNumbers(1, 2);
	 *      var g = f(3);
	 *      g(4); //=> 10
	 */
	module.exports = _curry2(function curryN(length, fn) {
	  if (length === 1) {
	    return _curry1(fn);
	  }
	  return _arity(length, _curryN(length, [], fn));
	});

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _arity = __webpack_require__(24);
	
	/**
	 * Internal curryN function.
	 *
	 * @private
	 * @category Function
	 * @param {Number} length The arity of the curried function.
	 * @return {array} An array of arguments received thus far.
	 * @param {Function} fn The function to curry.
	 */
	module.exports = function _curryN(length, received, fn) {
	  return function () {
	    var combined = [];
	    var argsIdx = 0;
	    var left = length;
	    var combinedIdx = 0;
	    while (combinedIdx < received.length || argsIdx < arguments.length) {
	      var result;
	      if (combinedIdx < received.length && (received[combinedIdx] == null || received[combinedIdx]['@@functional/placeholder'] !== true || argsIdx >= arguments.length)) {
	        result = received[combinedIdx];
	      } else {
	        result = arguments[argsIdx];
	        argsIdx += 1;
	      }
	      combined[combinedIdx] = result;
	      if (result == null || result['@@functional/placeholder'] !== true) {
	        left -= 1;
	      }
	      combinedIdx += 1;
	    }
	    return left <= 0 ? fn.apply(this, combined) : _arity(left, _curryN(length, combined, fn));
	  };
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _curry2 = __webpack_require__(19);
	var keys = __webpack_require__(27);
	
	/**
	 * Create a new object with the own properties of `a`
	 * merged with the own properties of object `b`.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category Object
	 * @sig {k: v} -> {k: v} -> {k: v}
	 * @param {Object} a
	 * @param {Object} b
	 * @return {Object}
	 * @example
	 *
	 *      R.merge({ 'name': 'fred', 'age': 10 }, { 'age': 40 });
	 *      //=> { 'name': 'fred', 'age': 40 }
	 *
	 *      var resetToDefault = R.merge(R.__, {x: 0});
	 *      resetToDefault({x: 5, y: 2}); //=> {x: 0, y: 2}
	 */
	module.exports = _curry2(function merge(a, b) {
	  var result = {};
	  var ks = keys(a);
	  var idx = 0;
	  while (idx < ks.length) {
	    result[ks[idx]] = a[ks[idx]];
	    idx += 1;
	  }
	  ks = keys(b);
	  idx = 0;
	  while (idx < ks.length) {
	    result[ks[idx]] = b[ks[idx]];
	    idx += 1;
	  }
	  return result;
	});

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _curry2 = __webpack_require__(19);
	var _equals = __webpack_require__(44);
	
	/**
	 * Returns `true` if its arguments are equivalent, `false` otherwise.
	 * Dispatches to an `equals` method if present. Handles cyclical data
	 * structures.
	 *
	 * Dispatches to the `equals` method of both arguments, if present.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.15.0
	 * @category Relation
	 * @sig a -> b -> Boolean
	 * @param {*} a
	 * @param {*} b
	 * @return {Boolean}
	 * @example
	 *
	 *      R.equals(1, 1); //=> true
	 *      R.equals(1, '1'); //=> false
	 *      R.equals([1, 2, 3], [1, 2, 3]); //=> true
	 *
	 *      var a = {}; a.v = a;
	 *      var b = {}; b.v = b;
	 *      R.equals(a, b); //=> true
	 */
	module.exports = _curry2(function equals(a, b) {
	  return _equals(a, b, [], []);
	});

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _arrayFromIterator = __webpack_require__(45);
	var _has = __webpack_require__(28);
	var identical = __webpack_require__(46);
	var keys = __webpack_require__(27);
	var type = __webpack_require__(32);
	
	module.exports = function _equals(a, b, stackA, stackB) {
	  if (identical(a, b)) {
	    return true;
	  }
	
	  if (type(a) !== type(b)) {
	    return false;
	  }
	
	  if (a == null || b == null) {
	    return false;
	  }
	
	  if (typeof a.equals === 'function' || typeof b.equals === 'function') {
	    return typeof a.equals === 'function' && a.equals(b) && typeof b.equals === 'function' && b.equals(a);
	  }
	
	  switch (type(a)) {
	    case 'Arguments':
	    case 'Array':
	    case 'Object':
	      break;
	    case 'Boolean':
	    case 'Number':
	    case 'String':
	      if (!((typeof a === 'undefined' ? 'undefined' : _typeof(a)) === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && identical(a.valueOf(), b.valueOf()))) {
	        return false;
	      }
	      break;
	    case 'Date':
	      if (!identical(a.valueOf(), b.valueOf())) {
	        return false;
	      }
	      break;
	    case 'RegExp':
	      if (!(a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline && a.sticky === b.sticky && a.unicode === b.unicode)) {
	        return false;
	      }
	      break;
	    case 'Map':
	    case 'Set':
	      if (!_equals(_arrayFromIterator(a.entries()), _arrayFromIterator(b.entries()), stackA, stackB)) {
	        return false;
	      }
	      break;
	    case 'Int8Array':
	    case 'Uint8Array':
	    case 'Uint8ClampedArray':
	    case 'Int16Array':
	    case 'Uint16Array':
	    case 'Int32Array':
	    case 'Uint32Array':
	    case 'Float32Array':
	    case 'Float64Array':
	      break;
	    case 'ArrayBuffer':
	      break;
	    default:
	      // Values of other types are only equal if identical.
	      return false;
	  }
	
	  var keysA = keys(a);
	  if (keysA.length !== keys(b).length) {
	    return false;
	  }
	
	  var idx = stackA.length - 1;
	  while (idx >= 0) {
	    if (stackA[idx] === a) {
	      return stackB[idx] === b;
	    }
	    idx -= 1;
	  }
	
	  stackA.push(a);
	  stackB.push(b);
	  idx = keysA.length - 1;
	  while (idx >= 0) {
	    var key = keysA[idx];
	    if (!(_has(key, b) && _equals(b[key], a[key], stackA, stackB))) {
	      return false;
	    }
	    idx -= 1;
	  }
	  stackA.pop();
	  stackB.pop();
	  return true;
	};

/***/ },
/* 45 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function _arrayFromIterator(iter) {
	  var list = [];
	  var next;
	  while (!(next = iter.next()).done) {
	    list.push(next.value);
	  }
	  return list;
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _curry2 = __webpack_require__(19);
	
	/**
	 * Returns true if its arguments are identical, false otherwise. Values are
	 * identical if they reference the same memory. `NaN` is identical to `NaN`;
	 * `0` and `-0` are not identical.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.15.0
	 * @category Relation
	 * @sig a -> a -> Boolean
	 * @param {*} a
	 * @param {*} b
	 * @return {Boolean}
	 * @example
	 *
	 *      var o = {};
	 *      R.identical(o, o); //=> true
	 *      R.identical(1, 1); //=> true
	 *      R.identical(1, '1'); //=> false
	 *      R.identical([], []); //=> false
	 *      R.identical(0, -0); //=> false
	 *      R.identical(NaN, NaN); //=> true
	 */
	module.exports = _curry2(function identical(a, b) {
	  // SameValue algorithm
	  if (a === b) {
	    // Steps 1-5, 7-10
	    // Steps 6.b-6.e: +0 != -0
	    return a !== 0 || 1 / a === 1 / b;
	  } else {
	    // Step 6.a: NaN == NaN
	    return a !== a && b !== b;
	  }
	});

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _curry2 = __webpack_require__(19);
	
	/**
	 * Returns a new object that does not contain a `prop` property.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.10.0
	 * @category Object
	 * @sig String -> {k: v} -> {k: v}
	 * @param {String} prop the name of the property to dissociate
	 * @param {Object} obj the object to clone
	 * @return {Object} a new object similar to the original but without the specified property
	 * @see R.assoc
	 * @example
	 *
	 *      R.dissoc('b', {a: 1, b: 2, c: 3}); //=> {a: 1, c: 3}
	 */
	module.exports = _curry2(function dissoc(prop, obj) {
	  var result = {};
	  for (var p in obj) {
	    if (p !== prop) {
	      result[p] = obj[p];
	    }
	  }
	  return result;
	});

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _curry2 = __webpack_require__(19);
	
	/**
	 * Creates a new object by recursively evolving a shallow copy of `object`, according to the
	 * `transformation` functions. All non-primitive properties are copied by reference.
	 *
	 * A `transformation` function will not be invoked if its corresponding key does not exist in
	 * the evolved object.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.9.0
	 * @category Object
	 * @sig {k: (v -> v)} -> {k: v} -> {k: v}
	 * @param {Object} transformations The object specifying transformation functions to apply
	 *        to the object.
	 * @param {Object} object The object to be transformed.
	 * @return {Object} The transformed object.
	 * @example
	 *
	 *      var tomato  = {firstName: '  Tomato ', data: {elapsed: 100, remaining: 1400}, id:123};
	 *      var transformations = {
	 *        firstName: R.trim,
	 *        lastName: R.trim, // Will not get invoked.
	 *        data: {elapsed: R.add(1), remaining: R.add(-1)}
	 *      };
	 *      R.evolve(transformations, tomato); //=> {firstName: 'Tomato', data: {elapsed: 101, remaining: 1399}, id:123}
	 */
	module.exports = _curry2(function evolve(transformations, object) {
	  var transformation,
	      key,
	      type,
	      result = {};
	  for (key in object) {
	    transformation = transformations[key];
	    type = typeof transformation === 'undefined' ? 'undefined' : _typeof(transformation);
	    result[key] = type === 'function' ? transformation(object[key]) : type === 'object' ? evolve(transformations[key], object[key]) : object[key];
	  }
	  return result;
	});

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _concat = __webpack_require__(50);
	var _curry3 = __webpack_require__(51);
	
	/**
	 * Applies a function to the value at the given index of an array,
	 * returning a new copy of the array with the element at the given
	 * index replaced with the result of the function application.
	 * @see R.update
	 *
	 * @func
	 * @memberOf R
	 * @since v0.14.0
	 * @category List
	 * @sig (a -> a) -> Number -> [a] -> [a]
	 * @param {Function} fn The function to apply.
	 * @param {Number} idx The index.
	 * @param {Array|Arguments} list An array-like object whose value
	 *        at the supplied index will be replaced.
	 * @return {Array} A copy of the supplied array-like object with
	 *         the element at index `idx` replaced with the value
	 *         returned by applying `fn` to the existing element.
	 * @example
	 *
	 *      R.adjust(R.add(10), 1, [0, 1, 2]);     //=> [0, 11, 2]
	 *      R.adjust(R.add(10))(1)([0, 1, 2]);     //=> [0, 11, 2]
	 */
	module.exports = _curry3(function adjust(fn, idx, list) {
	  if (idx >= list.length || idx < -list.length) {
	    return list;
	  }
	  var start = idx < 0 ? list.length : 0;
	  var _idx = start + idx;
	  var _list = _concat(list);
	  _list[_idx] = fn(list[_idx]);
	  return _list;
	});

/***/ },
/* 50 */
/***/ function(module, exports) {

	"use strict";
	
	/**
	 * Private `concat` function to merge two array-like objects.
	 *
	 * @private
	 * @param {Array|Arguments} [set1=[]] An array-like object.
	 * @param {Array|Arguments} [set2=[]] An array-like object.
	 * @return {Array} A new, merged array.
	 * @example
	 *
	 *      _concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
	 */
	module.exports = function _concat(set1, set2) {
	  set1 = set1 || [];
	  set2 = set2 || [];
	  var idx;
	  var len1 = set1.length;
	  var len2 = set2.length;
	  var result = [];
	
	  idx = 0;
	  while (idx < len1) {
	    result[result.length] = set1[idx];
	    idx += 1;
	  }
	  idx = 0;
	  while (idx < len2) {
	    result[result.length] = set2[idx];
	    idx += 1;
	  }
	  return result;
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _curry1 = __webpack_require__(20);
	var _curry2 = __webpack_require__(19);
	
	/**
	 * Optimized internal three-arity curry function.
	 *
	 * @private
	 * @category Function
	 * @param {Function} fn The function to curry.
	 * @return {Function} The curried function.
	 */
	module.exports = function _curry3(fn) {
	  return function f3(a, b, c) {
	    var n = arguments.length;
	    if (n === 0) {
	      return f3;
	    } else if (n === 1 && a != null && a['@@functional/placeholder'] === true) {
	      return f3;
	    } else if (n === 1) {
	      return _curry2(function (b, c) {
	        return fn(a, b, c);
	      });
	    } else if (n === 2 && a != null && a['@@functional/placeholder'] === true && b != null && b['@@functional/placeholder'] === true) {
	      return f3;
	    } else if (n === 2 && a != null && a['@@functional/placeholder'] === true) {
	      return _curry2(function (a, c) {
	        return fn(a, b, c);
	      });
	    } else if (n === 2 && b != null && b['@@functional/placeholder'] === true) {
	      return _curry2(function (b, c) {
	        return fn(a, b, c);
	      });
	    } else if (n === 2) {
	      return _curry1(function (c) {
	        return fn(a, b, c);
	      });
	    } else if (n === 3 && a != null && a['@@functional/placeholder'] === true && b != null && b['@@functional/placeholder'] === true && c != null && c['@@functional/placeholder'] === true) {
	      return f3;
	    } else if (n === 3 && a != null && a['@@functional/placeholder'] === true && b != null && b['@@functional/placeholder'] === true) {
	      return _curry2(function (a, b) {
	        return fn(a, b, c);
	      });
	    } else if (n === 3 && a != null && a['@@functional/placeholder'] === true && c != null && c['@@functional/placeholder'] === true) {
	      return _curry2(function (a, c) {
	        return fn(a, b, c);
	      });
	    } else if (n === 3 && b != null && b['@@functional/placeholder'] === true && c != null && c['@@functional/placeholder'] === true) {
	      return _curry2(function (b, c) {
	        return fn(a, b, c);
	      });
	    } else if (n === 3 && a != null && a['@@functional/placeholder'] === true) {
	      return _curry1(function (a) {
	        return fn(a, b, c);
	      });
	    } else if (n === 3 && b != null && b['@@functional/placeholder'] === true) {
	      return _curry1(function (b) {
	        return fn(a, b, c);
	      });
	    } else if (n === 3 && c != null && c['@@functional/placeholder'] === true) {
	      return _curry1(function (c) {
	        return fn(a, b, c);
	      });
	    } else {
	      return fn(a, b, c);
	    }
	  };
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _concat = __webpack_require__(50);
	var _curry2 = __webpack_require__(19);
	
	/**
	 * Returns a new list containing the contents of the given list, followed by the given
	 * element.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category List
	 * @sig a -> [a] -> [a]
	 * @param {*} el The element to add to the end of the new list.
	 * @param {Array} list The list whose contents will be added to the beginning of the output
	 *        list.
	 * @return {Array} A new list containing the contents of the old list followed by `el`.
	 * @see R.prepend
	 * @example
	 *
	 *      R.append('tests', ['write', 'more']); //=> ['write', 'more', 'tests']
	 *      R.append('tests', []); //=> ['tests']
	 *      R.append(['tests'], ['write', 'more']); //=> ['write', 'more', ['tests']]
	 */
	module.exports = _curry2(function append(el, list) {
	  return _concat(list, [el]);
	});

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _concat = __webpack_require__(50);
	var _curry3 = __webpack_require__(51);
	var _slice = __webpack_require__(36);
	
	/**
	 * Removes the sub-list of `list` starting at index `start` and containing
	 * `count` elements.  _Note that this is not destructive_: it returns a
	 * copy of the list with the changes.
	 * <small>No lists have been harmed in the application of this function.</small>
	 *
	 * @func
	 * @memberOf R
	 * @since v0.2.2
	 * @category List
	 * @sig Number -> Number -> [a] -> [a]
	 * @param {Number} start The position to start removing elements
	 * @param {Number} count The number of elements to remove
	 * @param {Array} list The list to remove from
	 * @return {Array} A new Array with `count` elements from `start` removed.
	 * @example
	 *
	 *      R.remove(2, 3, [1,2,3,4,5,6,7,8]); //=> [1,2,6,7,8]
	 */
	module.exports = _curry3(function remove(start, count, list) {
	  return _concat(_slice(list, 0, Math.min(start, list.length)), _slice(list, Math.min(list.length, start + count)));
	});

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var always = __webpack_require__(55);
	
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
	module.exports = always(true);

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _curry1 = __webpack_require__(20);
	
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
	module.exports = _curry1(function always(val) {
	  return function () {
	    return val;
	  };
	});

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _flyd = __webpack_require__(11);
	
	var _flyd2 = _interopRequireDefault(_flyd);
	
	var _unionType = __webpack_require__(4);
	
	var _unionType2 = _interopRequireDefault(_unionType);
	
	var _logdiff = __webpack_require__(57);
	
	var _composing = __webpack_require__(10);
	
	var _composing2 = _interopRequireDefault(_composing);
	
	var _timetravel = __webpack_require__(59);
	
	var _timetravel2 = _interopRequireDefault(_timetravel);
	
	var _style = __webpack_require__(2);
	
	var _style2 = _interopRequireDefault(_style);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var R = {
	  pipe: __webpack_require__(69),
	  equals: __webpack_require__(43)
	};
	
	// Attach architecture to the main module
	var run = function run(engineDef) {
	
	  var ctx = void 0,
	      state$ = void 0,
	      driverStreams = {},
	      module = void 0;
	  var middleUpdatesArr = [],
	      middleware = engineDef.middleware || {},
	      log = engineDef.log || false;
	  engineDef.logAll = engineDef.hasOwnProperty('logAll') ? engineDef.logAll : false;
	
	  for (var key in middleware) {
	    middleUpdatesArr.push(middleware[key]);
	  }
	
	  // TODO: Document that middleware can slow programs
	  var middleUpdates = middleUpdatesArr.length == 0 ? function (m) {
	    return m;
	  } : R.pipe.apply(undefined, middleUpdatesArr);
	
	  var moduleDef = engineDef.timetravel ? (0, _timetravel2.default)(engineDef.root) : engineDef.root;
	
	  var attach = function attach(state) {
	    // state is used for webpack HMR
	
	    module = _composing2.default.merge(moduleDef, {});
	    ctx = module.ctx;
	
	    function log(m, newState) {
	      var action = arguments.length <= 2 || arguments[2] === undefined ? { _initial: true, _log: engineDef.log || engineDef.logAll, _moduleName: module.name } : arguments[2];
	
	      var actionInfo = (0, _logdiff.actionModuleInfo)(action);
	      if (engineDef.log && actionInfo.log || engineDef.logAll) {
	        if (!action._initial) {
	          (0, _logdiff.logAction)(action);
	          (0, _logdiff.displayFromDiff)((0, _logdiff.diff)(m, newState));
	        } else {
	          console.log('%c Fractal is initializing your app.', 'color: purple; font-size: 14px');
	          console.log('%c Initial state computed ...', 'color: purple; font-size: 14px');
	          console.log('%c Connecting machines to external world ...', 'color: purple; font-size: 14px');
	          console.log('%c Done. Have a nice day!! :)', 'color: purple; font-size: 14px');
	        }
	        console.log(newState);
	      }
	      return newState;
	    }
	
	    state$ = _flyd2.default.scan(function (m, a) {
	      return log(m, middleUpdates(module.update(a, m)), _composing2.default.addModuleInfo(module, a));
	    }, log({}, middleUpdates(state ? state : module.init({ key: 'mainModule' }))), ctx.action$); // state
	
	    // automerge services
	    if (!engineDef.tasks) {
	      engineDef.tasks = {};
	    }
	    if (!engineDef.drivers) {
	      engineDef.drivers = {};
	    }
	    for (var serviceName in engineDef.services) {
	      for (var taskName in engineDef.services[serviceName].tasks) {
	        if (taskName == '_') {
	          engineDef.tasks[serviceName] = engineDef.services[serviceName].tasks[taskName];
	        } else {
	          engineDef.tasks[serviceName + '_' + taskName] = engineDef.services[serviceName].tasks[taskName];
	        }
	      }
	      for (var driverName in engineDef.services[serviceName].drivers) {
	        if (driverName == '_') {
	          engineDef.drivers[serviceName] = engineDef.services[serviceName].drivers[driverName];
	        } else {
	          engineDef.drivers[serviceName + '_' + driverName] = engineDef.services[serviceName].drivers[driverName];
	        }
	      }
	    }
	
	    // connect tasks handlers to interfaces
	    _flyd2.default.on(function (t) {
	      var task = _composing2.default.addModuleInfo(moduleDef, t);
	      if (engineDef.tasks[task[0]]) {
	        engineDef.tasks[task[0]].run(task[1]);
	      } else if (engineDef.log && task._log || engineDef.logAll) {
	        console.warn('There are no handler for ' + task[0] + ' task, sended by ' + task._moduleName + ' module');
	      }
	    }, ctx.task$);
	
	    // attach drivers to interfaces
	    for (var _driverName in engineDef.drivers) {
	      if (module.interfaces[_driverName]) {
	        // TODO: evaluate error handling, maybe an error$ stream
	        // driverStreams[driverName] =
	        //   flyd.map(state => e('driverExecution', {name: driverName, state}, () => module.interfaces[driverName](state)), state$)
	        driverStreams[_driverName] = _flyd2.default.map(module.interfaces[_driverName], state$);
	        if (state) {
	          engineDef.drivers[_driverName].reattach(driverStreams[_driverName]);
	        } else {
	          engineDef.drivers[_driverName].attach(driverStreams[_driverName]);
	        }
	      }
	    }
	  };
	
	  var disposeConnections = function disposeConnections() {
	    ctx.action$.end(true);
	    ctx.task$.end(true);
	    state$.end(true);
	    for (var driverName in driverStreams) {
	      driverStreams[driverName].end(true);
	      engineDef.drivers[driverName].dispose();
	    }
	  };
	
	  var dispose = function dispose() {
	    disposeConnections();
	    _style2.default.dispose();
	  };
	
	  var reattach = function reattach(reModule) {
	    // TODO: this can be optimized for hot realoading with a diff-patch algorithm
	    disposeConnections();
	    var newState = R.equals(moduleDef.init({ key: 'mainModule' }), reModule.init({ key: 'mainModule' })) ? state$() : reModule.init({ key: 'mainModule' });
	    moduleDef = reModule;
	    attach(newState);
	  };
	
	  attach();
	
	  return {
	    ctx: ctx,
	    inputs: module.inputs,
	    tasks: engineDef.tasks,
	    drivers: engineDef.drivers,
	    reattach: reattach,
	    dispose: dispose
	  };
	};
	
	exports.default = {
	  run: run
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.diff = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.prettyAction = prettyAction;
	exports.prettyActionDetailed = prettyActionDetailed;
	exports.actionModuleInfo = actionModuleInfo;
	exports.prettyParams = prettyParams;
	exports.prettyDiff = prettyDiff;
	exports.logAction = logAction;
	exports.displayFromDiff = displayFromDiff;
	
	var _deepDiff = __webpack_require__(58);
	
	var _deepDiff2 = _interopRequireDefault(_deepDiff);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var diff = exports.diff = _deepDiff2.default.diff;
	
	function prettyAction(action) {
	  var actionInfo = actionModuleInfo(action);
	  return actionInfo.modulePath.join(' -> ') + ' / ' + actionInfo.lastAction.name + ': ' + prettyParams(actionInfo.lastAction);
	}
	
	function prettyActionDetailed(action) {
	  var path = [],
	      nested = action;
	  while (nested[nested.length - 1] != undefined && nested[nested.length - 1].of != undefined) {
	    if (nested.length == 0) {
	      path.push(nested.name);
	    } else {
	      path.push(nested.name + ' ' + prettyParams(nested));
	    }
	    nested = nested[nested.length - 1];
	  }
	  path.push(nested.name);
	  return path.join(' -> ') + ' : ' + prettyParams(nested);
	}
	
	// deep extract info from an Action: log, modulePath, lastAction
	function actionModuleInfo(action) {
	  var modulePath = [],
	      nested = action,
	      log = void 0,
	      logAll = false;
	  while (nested[nested.length - 1] != undefined && nested[nested.length - 1].of != undefined) {
	    logAll = logAll || nested._logAll;
	    modulePath.push(nested._moduleName);
	    nested = nested[nested.length - 1];
	  }
	  log = logAll || nested._log || nested._logAll;
	  modulePath.push(nested._moduleName);
	  return {
	    log: log,
	    modulePath: modulePath,
	    lastAction: nested
	  };
	}
	
	function prettyParams(params) {
	  var paramString = params.map(function (param) {
	    if (typeof param === 'function' || (typeof param === 'undefined' ? 'undefined' : _typeof(param)) === 'object') {
	      if (Array.isArray(param)) {
	        return 'array';
	      } else {
	        return typeof param === 'undefined' ? 'undefined' : _typeof(param);
	      }
	    }
	    return param;
	  }).join(', ');
	  return paramString === '' ? 'none' : paramString;
	}
	
	function prettyDiff(diffArray) {
	  diffArray = diffArray || [];
	  var logs = [];
	  diffArray.forEach(function (diff) {
	    var getType = function getType(diff) {
	      if (diff.kind == 'N') return 'added';else if (diff.kind == 'D') return 'deleted';else if (diff.kind == 'E') return 'edited';else if (diff.kind == 'A') return 'array';
	    };
	
	    var type = getType(diff);
	
	    if (type == 'array') // if an array is modified
	      logs.push(type + ' ' + diff.path.join('.') + ' : index ' + diff.index + ' ' + getType(diff.item));else logs.push(type + ' ' + diff.path.join('.') + ' : ' + diff.lhs + ' -> ' + diff.rhs);
	  });
	  return logs;
	}
	
	function logAction(action) {
	  console.log('%c' + prettyAction(action), 'color: green');
	}
	
	function displayFromDiff(diffArray) {
	  prettyDiff(diffArray).forEach(function (log) {
	    return console.log('%c' + log, 'color: darkblue');
	  });
	}

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*!
	 * deep-diff.
	 * Licensed under the MIT License.
	 */
	;(function (root, factory) {
	  'use strict';
	
	  if (true) {
	    // AMD. Register as an anonymous module.
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return factory();
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
	    // Node. Does not work with strict CommonJS, but
	    // only CommonJS-like environments that support module.exports,
	    // like Node.
	    module.exports = factory();
	  } else {
	    // Browser globals (root is window)
	    root.DeepDiff = factory();
	  }
	})(undefined, function (undefined) {
	  'use strict';
	
	  var $scope,
	      conflict,
	      conflictResolution = [];
	  if ((typeof global === 'undefined' ? 'undefined' : _typeof(global)) === 'object' && global) {
	    $scope = global;
	  } else if (typeof window !== 'undefined') {
	    $scope = window;
	  } else {
	    $scope = {};
	  }
	  conflict = $scope.DeepDiff;
	  if (conflict) {
	    conflictResolution.push(function () {
	      if ('undefined' !== typeof conflict && $scope.DeepDiff === accumulateDiff) {
	        $scope.DeepDiff = conflict;
	        conflict = undefined;
	      }
	    });
	  }
	
	  // nodejs compatible on server side and in the browser.
	  function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  }
	
	  function Diff(kind, path) {
	    Object.defineProperty(this, 'kind', {
	      value: kind,
	      enumerable: true
	    });
	    if (path && path.length) {
	      Object.defineProperty(this, 'path', {
	        value: path,
	        enumerable: true
	      });
	    }
	  }
	
	  function DiffEdit(path, origin, value) {
	    DiffEdit.super_.call(this, 'E', path);
	    Object.defineProperty(this, 'lhs', {
	      value: origin,
	      enumerable: true
	    });
	    Object.defineProperty(this, 'rhs', {
	      value: value,
	      enumerable: true
	    });
	  }
	  inherits(DiffEdit, Diff);
	
	  function DiffNew(path, value) {
	    DiffNew.super_.call(this, 'N', path);
	    Object.defineProperty(this, 'rhs', {
	      value: value,
	      enumerable: true
	    });
	  }
	  inherits(DiffNew, Diff);
	
	  function DiffDeleted(path, value) {
	    DiffDeleted.super_.call(this, 'D', path);
	    Object.defineProperty(this, 'lhs', {
	      value: value,
	      enumerable: true
	    });
	  }
	  inherits(DiffDeleted, Diff);
	
	  function DiffArray(path, index, item) {
	    DiffArray.super_.call(this, 'A', path);
	    Object.defineProperty(this, 'index', {
	      value: index,
	      enumerable: true
	    });
	    Object.defineProperty(this, 'item', {
	      value: item,
	      enumerable: true
	    });
	  }
	  inherits(DiffArray, Diff);
	
	  function arrayRemove(arr, from, to) {
	    var rest = arr.slice((to || from) + 1 || arr.length);
	    arr.length = from < 0 ? arr.length + from : from;
	    arr.push.apply(arr, rest);
	    return arr;
	  }
	
	  function realTypeOf(subject) {
	    var type = typeof subject === 'undefined' ? 'undefined' : _typeof(subject);
	    if (type !== 'object') {
	      return type;
	    }
	
	    if (subject === Math) {
	      return 'math';
	    } else if (subject === null) {
	      return 'null';
	    } else if (Array.isArray(subject)) {
	      return 'array';
	    } else if (Object.prototype.toString.call(subject) === '[object Date]') {
	      return 'date';
	    } else if (typeof subject.toString !== 'undefined' && /^\/.*\//.test(subject.toString())) {
	      return 'regexp';
	    }
	    return 'object';
	  }
	
	  function deepDiff(lhs, rhs, changes, prefilter, path, key, stack) {
	    path = path || [];
	    var currentPath = path.slice(0);
	    if (typeof key !== 'undefined') {
	      if (prefilter) {
	        if (typeof prefilter === 'function' && prefilter(currentPath, key)) {
	          return;
	        } else if ((typeof prefilter === 'undefined' ? 'undefined' : _typeof(prefilter)) === 'object') {
	          if (prefilter.prefilter && prefilter.prefilter(currentPath, key)) {
	            return;
	          }
	          if (prefilter.normalize) {
	            var alt = prefilter.normalize(currentPath, key, lhs, rhs);
	            if (alt) {
	              lhs = alt[0];
	              rhs = alt[1];
	            }
	          }
	        }
	      }
	      currentPath.push(key);
	    }
	
	    // Use string comparison for regexes
	    if (realTypeOf(lhs) === 'regexp' && realTypeOf(rhs) === 'regexp') {
	      lhs = lhs.toString();
	      rhs = rhs.toString();
	    }
	
	    var ltype = typeof lhs === 'undefined' ? 'undefined' : _typeof(lhs);
	    var rtype = typeof rhs === 'undefined' ? 'undefined' : _typeof(rhs);
	    if (ltype === 'undefined') {
	      if (rtype !== 'undefined') {
	        changes(new DiffNew(currentPath, rhs));
	      }
	    } else if (rtype === 'undefined') {
	      changes(new DiffDeleted(currentPath, lhs));
	    } else if (realTypeOf(lhs) !== realTypeOf(rhs)) {
	      changes(new DiffEdit(currentPath, lhs, rhs));
	    } else if (Object.prototype.toString.call(lhs) === '[object Date]' && Object.prototype.toString.call(rhs) === '[object Date]' && lhs - rhs !== 0) {
	      changes(new DiffEdit(currentPath, lhs, rhs));
	    } else if (ltype === 'object' && lhs !== null && rhs !== null) {
	      stack = stack || [];
	      if (stack.indexOf(lhs) < 0) {
	        stack.push(lhs);
	        if (Array.isArray(lhs)) {
	          var i,
	              len = lhs.length;
	          for (i = 0; i < lhs.length; i++) {
	            if (i >= rhs.length) {
	              changes(new DiffArray(currentPath, i, new DiffDeleted(undefined, lhs[i])));
	            } else {
	              deepDiff(lhs[i], rhs[i], changes, prefilter, currentPath, i, stack);
	            }
	          }
	          while (i < rhs.length) {
	            changes(new DiffArray(currentPath, i, new DiffNew(undefined, rhs[i++])));
	          }
	        } else {
	          var akeys = Object.keys(lhs);
	          var pkeys = Object.keys(rhs);
	          akeys.forEach(function (k, i) {
	            var other = pkeys.indexOf(k);
	            if (other >= 0) {
	              deepDiff(lhs[k], rhs[k], changes, prefilter, currentPath, k, stack);
	              pkeys = arrayRemove(pkeys, other);
	            } else {
	              deepDiff(lhs[k], undefined, changes, prefilter, currentPath, k, stack);
	            }
	          });
	          pkeys.forEach(function (k) {
	            deepDiff(undefined, rhs[k], changes, prefilter, currentPath, k, stack);
	          });
	        }
	        stack.length = stack.length - 1;
	      }
	    } else if (lhs !== rhs) {
	      if (!(ltype === 'number' && isNaN(lhs) && isNaN(rhs))) {
	        changes(new DiffEdit(currentPath, lhs, rhs));
	      }
	    }
	  }
	
	  function accumulateDiff(lhs, rhs, prefilter, accum) {
	    accum = accum || [];
	    deepDiff(lhs, rhs, function (diff) {
	      if (diff) {
	        accum.push(diff);
	      }
	    }, prefilter);
	    return accum.length ? accum : undefined;
	  }
	
	  function applyArrayChange(arr, index, change) {
	    if (change.path && change.path.length) {
	      var it = arr[index],
	          i,
	          u = change.path.length - 1;
	      for (i = 0; i < u; i++) {
	        it = it[change.path[i]];
	      }
	      switch (change.kind) {
	        case 'A':
	          applyArrayChange(it[change.path[i]], change.index, change.item);
	          break;
	        case 'D':
	          delete it[change.path[i]];
	          break;
	        case 'E':
	        case 'N':
	          it[change.path[i]] = change.rhs;
	          break;
	      }
	    } else {
	      switch (change.kind) {
	        case 'A':
	          applyArrayChange(arr[index], change.index, change.item);
	          break;
	        case 'D':
	          arr = arrayRemove(arr, index);
	          break;
	        case 'E':
	        case 'N':
	          arr[index] = change.rhs;
	          break;
	      }
	    }
	    return arr;
	  }
	
	  function applyChange(target, source, change) {
	    if (target && source && change && change.kind) {
	      var it = target,
	          i = -1,
	          last = change.path ? change.path.length - 1 : 0;
	      while (++i < last) {
	        if (typeof it[change.path[i]] === 'undefined') {
	          it[change.path[i]] = typeof change.path[i] === 'number' ? [] : {};
	        }
	        it = it[change.path[i]];
	      }
	      switch (change.kind) {
	        case 'A':
	          applyArrayChange(change.path ? it[change.path[i]] : it, change.index, change.item);
	          break;
	        case 'D':
	          delete it[change.path[i]];
	          break;
	        case 'E':
	        case 'N':
	          it[change.path[i]] = change.rhs;
	          break;
	      }
	    }
	  }
	
	  function revertArrayChange(arr, index, change) {
	    if (change.path && change.path.length) {
	      // the structure of the object at the index has changed...
	      var it = arr[index],
	          i,
	          u = change.path.length - 1;
	      for (i = 0; i < u; i++) {
	        it = it[change.path[i]];
	      }
	      switch (change.kind) {
	        case 'A':
	          revertArrayChange(it[change.path[i]], change.index, change.item);
	          break;
	        case 'D':
	          it[change.path[i]] = change.lhs;
	          break;
	        case 'E':
	          it[change.path[i]] = change.lhs;
	          break;
	        case 'N':
	          delete it[change.path[i]];
	          break;
	      }
	    } else {
	      // the array item is different...
	      switch (change.kind) {
	        case 'A':
	          revertArrayChange(arr[index], change.index, change.item);
	          break;
	        case 'D':
	          arr[index] = change.lhs;
	          break;
	        case 'E':
	          arr[index] = change.lhs;
	          break;
	        case 'N':
	          arr = arrayRemove(arr, index);
	          break;
	      }
	    }
	    return arr;
	  }
	
	  function revertChange(target, source, change) {
	    if (target && source && change && change.kind) {
	      var it = target,
	          i,
	          u;
	      u = change.path.length - 1;
	      for (i = 0; i < u; i++) {
	        if (typeof it[change.path[i]] === 'undefined') {
	          it[change.path[i]] = {};
	        }
	        it = it[change.path[i]];
	      }
	      switch (change.kind) {
	        case 'A':
	          // Array was modified...
	          // it will be an array...
	          revertArrayChange(it[change.path[i]], change.index, change.item);
	          break;
	        case 'D':
	          // Item was deleted...
	          it[change.path[i]] = change.lhs;
	          break;
	        case 'E':
	          // Item was edited...
	          it[change.path[i]] = change.lhs;
	          break;
	        case 'N':
	          // Item is new...
	          delete it[change.path[i]];
	          break;
	      }
	    }
	  }
	
	  function applyDiff(target, source, filter) {
	    if (target && source) {
	      var onChange = function onChange(change) {
	        if (!filter || filter(target, source, change)) {
	          applyChange(target, source, change);
	        }
	      };
	      deepDiff(target, source, onChange);
	    }
	  }
	
	  Object.defineProperties(accumulateDiff, {
	
	    diff: {
	      value: accumulateDiff,
	      enumerable: true
	    },
	    observableDiff: {
	      value: deepDiff,
	      enumerable: true
	    },
	    applyDiff: {
	      value: applyDiff,
	      enumerable: true
	    },
	    applyChange: {
	      value: applyChange,
	      enumerable: true
	    },
	    revertChange: {
	      value: revertChange,
	      enumerable: true
	    },
	    isConflict: {
	      value: function value() {
	        return 'undefined' !== typeof conflict;
	      },
	      enumerable: true
	    },
	    noConflict: {
	      value: function value() {
	        if (conflictResolution) {
	          conflictResolution.forEach(function (it) {
	            it();
	          });
	          conflictResolution = null;
	        }
	        return accumulateDiff;
	      },
	      enumerable: true
	    }
	  });
	
	  return accumulateDiff;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _logdiff = __webpack_require__(57);
	
	var _logdiff2 = _interopRequireDefault(_logdiff);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var R = {
	  T: __webpack_require__(54),
	  evolve: __webpack_require__(48),
	  not: __webpack_require__(60),
	  always: __webpack_require__(55),
	  F: __webpack_require__(61),
	  inc: __webpack_require__(62),
	  ifElse: __webpack_require__(64),
	  update: __webpack_require__(65),
	  append: __webpack_require__(52),
	  mapObjIndexed: __webpack_require__(18)
	};
	var h = __webpack_require__(66);
	var F = _extends({}, __webpack_require__(1).default, __webpack_require__(10).default);
	
	
	var timetravel = function timetravel(child) {
	  var log = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	
	
	  return F.def({
	    logAll: true,
	    init: function init() {
	      return {
	        time: 0,
	        active: true,
	        playing: false,
	        frameTime: 0,
	        opened: false,
	        state: child.init(),
	        history: [{ state: child.init(), timestamp: new Date().getTime() }]
	      };
	    },
	    // inputs
	    inputs: {
	      toggleTimeTravel: function toggleTimeTravel(ctx, Action, _) {
	        return ctx.action$(Action.ToggleTimeTravel());
	      },
	      setTime: function setTime(ctx, Action, time) {
	        return ctx.action$(Action.SetTime(time));
	      },
	      childAction: function childAction(ctx, Action, a) {
	        return ctx.action$(Action.ChildAction(a));
	      },
	      setActive: function setActive(ctx, Action, bool) {
	        return ctx.action$(Action.SetActive(bool));
	      },
	      clearHistory: function clearHistory(ctx, Action, _) {
	        return ctx.action$(Action.ClearHistory());
	      },
	      play: function play(ctx, Action, playing) {
	        return ctx.action$(Action.Play(playing));
	      },
	      frame: function frame(ctx, Action, _) {
	        return ctx.action$(Action.Frame());
	      }
	    },
	    load: function load(ctx, i, Action) {
	      return {
	        child: F.createContext(child, { action$: s.active ? i.childAction : function (a) {
	            if (log) {
	              (0, _logdiff2.default)(a);
	            }
	          } })
	      };
	    },
	    Action: {
	      ToggleTimeTravel: [],
	      Frame: [],
	      Play: [R.T],
	      SetActive: [R.T],
	      SetTime: [Number],
	      ClearHistory: [],
	      ChildAction: [Array]
	    },
	    update: {
	      ToggleTimeTravel: R.evolve({ opened: R.not }),
	      SetActive: function SetActive(bool, s) {
	        return R.evolve({ active: R.always(bool) }, s);
	      },
	      SetTime: function SetTime(time, s) {
	        var validTime = time;
	        if (time >= s.history.length) validTime = s.history.length - 1;else if (time < 0) validTime = 0;
	        var nextState = s.history[validTime].state;
	        return R.evolve({
	          active: R.F,
	          state: R.always(nextState),
	          time: R.always(validTime)
	        }, s);
	      },
	      ClearHistory: function ClearHistory(s) {
	        var step = R.evolve({ timestamp: R.always(new Date().getTime()) }, s.history[s.time]);
	        return R.evolve({
	          time: R.always(0),
	          state: R.always(step.state),
	          history: R.always([step])
	        }, s);
	      },
	      ChildAction: function ChildAction(action, s) {
	        var evolveFn = R.evolve({
	          state: child.update(action),
	          timestamp: R.always(new Date().getTime())
	        }, s.history[s.time]);
	        var newState = R.evolve({
	          time: R.inc,
	          state: R.always(evolveFn.state),
	          history: R.ifElse(function (h) {
	            return !!h[s.time + 1];
	          }, // exist that registry in history?
	          R.update(s.time + 1, evolveFn), // rescribe history
	          R.append(evolveFn) // create history
	          )
	        }, s);
	        if (newState.history.length == 2) {
	          // casse for large time witout an update
	          newState.history[0].timestamp = newState.history[1].timestamp;
	        }
	        return newState;
	      },
	
	      Play: function Play(playing, s) {
	        if (playing) {
	          if (s.time != s.history.length - 1) return R.evolve({
	            active: R.F,
	            playing: R.T,
	            frameTime: R.always(s.history[s.time + 1].timestamp - s.history[s.time].timestamp)
	          }, s);else return R.evolve({
	            active: R.F,
	            playing: R.F
	          }, s);
	        } else {
	          return R.evolve({
	            active: R.F,
	            playing: R.F
	          }, s);
	        }
	      },
	      Frame: function Frame(s) {
	        if (s.time != s.history.length - 1) {
	          var frameTime = s.time < s.history.length - 2 ? R.always(s.history[s.time + 2].timestamp - s.history[s.time + 1].timestamp) : R.always(0);
	          var nextState = s.history[s.time + 1].state;
	          return R.evolve({
	            active: R.F,
	            time: R.inc,
	            playing: frameTime >= 0,
	            state: R.always(nextState),
	            frameTime: frameTime
	          }, s);
	        } else return R.evolve({
	          active: R.F,
	          playing: R.F
	        }, s);
	      }
	    },
	    interfaces: {
	      view: function view(ctx, i, s) {
	        // inputs, outputs and state
	        return h('div', { style: {
	            width: '100%',
	            height: '100%',
	            overflow: 'auto'
	          } }, [ctx._md.child.interfaces.view(s.history[s.time].state), h('button', {
	          style: styles.toggleButton,
	          on: { click: i.toggleTimeTravel }
	        }, 'tt'), h('footer', { style: _extends({}, styles.base, { display: s.opened ? 'flex' : 'none' }) }, [h('div', { style: styles.controls }, [h('button', { style: styles.button, on: { click: function click() {
	              return i.setTime(s.time - 1);
	            } } }, 'Back'), h('button', { style: styles.button, on: { click: function click() {
	              return i.setTime(s.time + 1);
	            } } }, 'Forward'), h('button', { style: styles.button, on: { click: function click() {
	              return i.setActive(!s.active);
	            } } }, s.active ? 'Pause' : 'Unpause'), h('button', { style: styles.button, on: { click: function click() {
	              return i.clearHistory(undefined);
	            } } }, 'Clear history'), h('button', { style: styles.button, on: { click: function click() {
	              return i.play(!s.playing);
	            } } }, s.playing ? 'Pause replay' : 'Replay'), h('span', { style: styles.time }, s.time)]), h('input', {
	          style: styles.slider,
	          props: { type: 'range', max: s.history.length - 1, min: 0, value: s.time },
	          on: {
	            input: function input(ev) {
	              return i.setTime(parseInt(ev.target.value));
	            }
	          }
	        })])]);
	      },
	      // TODO: update this interface mergers
	      time: function time(ctx, i, s) {
	        return _extends({
	          timer: {
	            periodic: false,
	            active: s.playing,
	            time: s.frameTime,
	            on: i.frame
	          }
	        }, function () {
	          // mergin child interfaces
	          var timers = {};
	          if (child.interfaces.time) {
	            R.mapObjIndexed(function (obj, name) {
	              timers['child' + name] = obj;
	              if (!s.active) timers['child' + name].active = false;
	            }, ctx._md.child.interfaces.time(s.history[s.time].state));
	          }
	          return timers;
	        }());
	      },
	      fetch: function fetch(ctx, i, s) {
	        return _extends({}, function () {
	          // mergin child interfaces
	          var fetches = {};
	          if (child.interfaces.fetch) {
	            R.mapObjIndexed(function (obj, name) {
	              fetches['child' + name] = obj;
	              if (!s.active) fetches['child' + name].active = false;
	            }, ctx._md.child.interfaces.fetch(s.history[s.time].state));
	          }
	          return fetches;
	        }());
	      }
	    }
	
	  });
	};
	
	exports.default = timetravel;
	
	
	var styles = {
	  base: {
	    position: 'fixed',
	    width: '100%',
	    minHeight: '100px',
	    bottom: '0px',
	    display: 'flex',
	    'flex-direction': 'column',
	    'justify-content': 'center',
	    'align-items': 'center',
	    zIndex: '99999'
	  },
	  toggleButton: {
	    position: 'fixed',
	    bottom: '0px',
	    left: '0px',
	    zIndex: '10000'
	  },
	  controls: {
	    width: '100%',
	    minHeight: '30px',
	    'margin-bottom': '5px',
	    display: 'flex',
	    flexWrap: 'wrap',
	    'justify-content': 'space-around'
	  },
	  time: {
	    float: 'right'
	  },
	  slider: {
	    width: '90%'
	  }
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _curry1 = __webpack_require__(20);
	
	/**
	 * A function that returns the `!` of its argument. It will return `true` when
	 * passed false-y value, and `false` when passed a truth-y one.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category Logic
	 * @sig * -> Boolean
	 * @param {*} a any value
	 * @return {Boolean} the logical inverse of passed argument.
	 * @see R.complement
	 * @example
	 *
	 *      R.not(true); //=> false
	 *      R.not(false); //=> true
	 *      R.not(0); => true
	 *      R.not(1); => false
	 */
	module.exports = _curry1(function not(a) {
	  return !a;
	});

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var always = __webpack_require__(55);
	
	/**
	 * A function that always returns `false`. Any passed in parameters are ignored.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.9.0
	 * @category Function
	 * @sig * -> Boolean
	 * @param {*}
	 * @return {Boolean}
	 * @see R.always, R.T
	 * @example
	 *
	 *      R.F(); //=> false
	 */
	module.exports = always(false);

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var add = __webpack_require__(63);
	
	/**
	 * Increments its argument.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.9.0
	 * @category Math
	 * @sig Number -> Number
	 * @param {Number} n
	 * @return {Number}
	 * @see R.dec
	 * @example
	 *
	 *      R.inc(42); //=> 43
	 */
	module.exports = add(1);

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _curry2 = __webpack_require__(19);
	
	/**
	 * Adds two numbers. Equivalent to `a + b` but curried.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category Math
	 * @sig Number -> Number -> Number
	 * @param {Number} a
	 * @param {Number} b
	 * @return {Number}
	 * @see R.subtract
	 * @example
	 *
	 *      R.add(2, 3);       //=>  5
	 *      R.add(7)(10);      //=> 17
	 */
	module.exports = _curry2(function add(a, b) {
	  return a + b;
	});

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _curry3 = __webpack_require__(51);
	var curryN = __webpack_require__(40);
	
	/**
	 * Creates a function that will process either the `onTrue` or the `onFalse` function depending
	 * upon the result of the `condition` predicate.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.8.0
	 * @category Logic
	 * @see R.unless, R.when
	 * @sig (*... -> Boolean) -> (*... -> *) -> (*... -> *) -> (*... -> *)
	 * @param {Function} condition A predicate function
	 * @param {Function} onTrue A function to invoke when the `condition` evaluates to a truthy value.
	 * @param {Function} onFalse A function to invoke when the `condition` evaluates to a falsy value.
	 * @return {Function} A new unary function that will process either the `onTrue` or the `onFalse`
	 *                    function depending upon the result of the `condition` predicate.
	 * @example
	 *
	 *      var incCount = R.ifElse(
	 *        R.has('count'),
	 *        R.over(R.lensProp('count'), R.inc),
	 *        R.assoc('count', 1)
	 *      );
	 *      incCount({});           //=> { count: 1 }
	 *      incCount({ count: 1 }); //=> { count: 2 }
	 */
	module.exports = _curry3(function ifElse(condition, onTrue, onFalse) {
	  return curryN(Math.max(condition.length, onTrue.length, onFalse.length), function _ifElse() {
	    return condition.apply(this, arguments) ? onTrue.apply(this, arguments) : onFalse.apply(this, arguments);
	  });
	});

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _curry3 = __webpack_require__(51);
	var adjust = __webpack_require__(49);
	var always = __webpack_require__(55);
	
	/**
	 * Returns a new copy of the array with the element at the
	 * provided index replaced with the given value.
	 * @see R.adjust
	 *
	 * @func
	 * @memberOf R
	 * @since v0.14.0
	 * @category List
	 * @sig Number -> a -> [a] -> [a]
	 * @param {Number} idx The index to update.
	 * @param {*} x The value to exist at the given index of the returned array.
	 * @param {Array|Arguments} list The source array-like object to be updated.
	 * @return {Array} A copy of `list` with the value at index `idx` replaced with `x`.
	 * @example
	 *
	 *      R.update(1, 11, [0, 1, 2]);     //=> [0, 11, 2]
	 *      R.update(1)(11)([0, 1, 2]);     //=> [0, 11, 2]
	 */
	module.exports = _curry3(function update(idx, x, list) {
	  return adjust(always(x), idx, list);
	});

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var VNode = __webpack_require__(67);
	var is = __webpack_require__(68);
	
	function addNS(data, children) {
	  data.ns = 'http://www.w3.org/2000/svg';
	  if (children !== undefined) {
	    for (var i = 0; i < children.length; ++i) {
	      addNS(children[i].data, children[i].children);
	    }
	  }
	}
	
	module.exports = function h(sel, b, c) {
	  var data = {},
	      children,
	      text,
	      i;
	  if (arguments.length === 3) {
	    data = b;
	    if (is.array(c)) {
	      children = c;
	    } else if (is.primitive(c)) {
	      text = c;
	    }
	  } else if (arguments.length === 2) {
	    if (is.array(b)) {
	      children = b;
	    } else if (is.primitive(b)) {
	      text = b;
	    } else {
	      data = b;
	    }
	  }
	  if (is.array(children)) {
	    for (i = 0; i < children.length; ++i) {
	      if (is.primitive(children[i])) children[i] = VNode(undefined, undefined, undefined, children[i]);
	    }
	  }
	  if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g') {
	    addNS(data, children);
	  }
	  return VNode(sel, data, children, text, undefined);
	};

/***/ },
/* 67 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function (sel, data, children, text, elm) {
	  var key = data === undefined ? undefined : data.key;
	  return { sel: sel, data: data, children: children,
	    text: text, elm: elm, key: key };
	};

/***/ },
/* 68 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
	  array: Array.isArray,
	  primitive: function primitive(s) {
	    return typeof s === 'string' || typeof s === 'number';
	  }
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _arity = __webpack_require__(24);
	var _pipe = __webpack_require__(70);
	var reduce = __webpack_require__(71);
	var tail = __webpack_require__(72);
	
	/**
	 * Performs left-to-right function composition. The leftmost function may have
	 * any arity; the remaining functions must be unary.
	 *
	 * In some libraries this function is named `sequence`.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category Function
	 * @sig (((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)) -> ((a, b, ..., n) -> z)
	 * @param {...Function} functions
	 * @return {Function}
	 * @see R.compose
	 * @example
	 *
	 *      var f = R.pipe(Math.pow, R.negate, R.inc);
	 *
	 *      f(3, 4); // -(3^4) + 1
	 */
	module.exports = function pipe() {
	  if (arguments.length === 0) {
	    throw new Error('pipe requires at least one argument');
	  }
	  return _arity(arguments[0].length, reduce(_pipe, arguments[0], tail(arguments)));
	};

/***/ },
/* 70 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function _pipe(f, g) {
	  return function () {
	    return g.call(this, f.apply(this, arguments));
	  };
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _curry3 = __webpack_require__(51);
	var _reduce = __webpack_require__(21);
	
	/**
	 * Returns a single item by iterating through the list, successively calling the iterator
	 * function and passing it an accumulator value and the current value from the array, and
	 * then passing the result to the next call.
	 *
	 * The iterator function receives two values: *(acc, value)*.  It may use `R.reduced` to
	 * shortcut the iteration.
	 *
	 * Note: `R.reduce` does not skip deleted or unassigned indices (sparse arrays), unlike
	 * the native `Array.prototype.reduce` method. For more details on this behavior, see:
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
	 * @see R.reduced
	 *
	 * Dispatches to the `reduce` method of the third argument, if present.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category List
	 * @sig (a,b -> a) -> a -> [b] -> a
	 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
	 *        current element from the array.
	 * @param {*} acc The accumulator value.
	 * @param {Array} list The list to iterate over.
	 * @return {*} The final, accumulated value.
	 * @example
	 *
	 *      var numbers = [1, 2, 3];
	 *      var add = (a, b) => a + b;
	 *
	 *      R.reduce(add, 10, numbers); //=> 16
	 */
	module.exports = _curry3(_reduce);

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _checkForMethod = __webpack_require__(73);
	var slice = __webpack_require__(74);
	
	/**
	 * Returns all but the first element of the given list or string (or object
	 * with a `tail` method).
	 *
	 * Dispatches to the `slice` method of the first argument, if present.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category List
	 * @see R.head, R.init, R.last
	 * @sig [a] -> [a]
	 * @sig String -> String
	 * @param {*} list
	 * @return {*}
	 * @example
	 *
	 *      R.tail([1, 2, 3]);  //=> [2, 3]
	 *      R.tail([1, 2]);     //=> [2]
	 *      R.tail([1]);        //=> []
	 *      R.tail([]);         //=> []
	 *
	 *      R.tail('abc');  //=> 'bc'
	 *      R.tail('ab');   //=> 'b'
	 *      R.tail('a');    //=> ''
	 *      R.tail('');     //=> ''
	 */
	module.exports = _checkForMethod('tail', slice(1, Infinity));

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _isArray = __webpack_require__(26);
	var _slice = __webpack_require__(36);
	
	/**
	 * Similar to hasMethod, this checks whether a function has a [methodname]
	 * function. If it isn't an array it will execute that function otherwise it will
	 * default to the ramda implementation.
	 *
	 * @private
	 * @param {Function} fn ramda implemtation
	 * @param {String} methodname property to check for a custom implementation
	 * @return {Object} Whatever the return value of the method is.
	 */
	module.exports = function _checkForMethod(methodname, fn) {
	  return function () {
	    var length = arguments.length;
	    if (length === 0) {
	      return fn();
	    }
	    var obj = arguments[length - 1];
	    return _isArray(obj) || typeof obj[methodname] !== 'function' ? fn.apply(this, arguments) : obj[methodname].apply(obj, _slice(arguments, 0, length - 1));
	  };
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _checkForMethod = __webpack_require__(73);
	var _curry3 = __webpack_require__(51);
	
	/**
	 * Returns the elements of the given list or string (or object with a `slice`
	 * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
	 *
	 * Dispatches to the `slice` method of the third argument, if present.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.4
	 * @category List
	 * @sig Number -> Number -> [a] -> [a]
	 * @sig Number -> Number -> String -> String
	 * @param {Number} fromIndex The start index (inclusive).
	 * @param {Number} toIndex The end index (exclusive).
	 * @param {*} list
	 * @return {*}
	 * @example
	 *
	 *      R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
	 *      R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
	 *      R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
	 *      R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
	 *      R.slice(0, 3, 'ramda');                     //=> 'ram'
	 */
	module.exports = _curry3(_checkForMethod('slice', function slice(fromIndex, toIndex, list) {
	  return Array.prototype.slice.call(list, fromIndex, toIndex);
	}));

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = service;
	// abstractions for a service
	var F = {
	  data: __webpack_require__(76)
	};
	var R = {
	  curry: __webpack_require__(77)
	};
	
	// serverName, store, events, init, connect
	function service(defObj) {
	
	  var isQueued = !!defObj.isQueued;
	
	  var log = defObj.hasOwnProperty('log') || true;
	
	  // TODO: fix this bug
	  // let subscribed = defObj.subscribed || () => 0
	  var subscribed = true;
	
	  var serverName = defObj.serverName;
	  var store = defObj.store;
	  // TODO: document store._initialNotify
	  store._initialNotify = store.hasOwnProperty('_initialNotify') ? store._initialNotify : true;
	  var eventQueue = [];
	
	  var subscribers = -1;
	
	  var events = defObj.events(data, notify);
	  function emit(name, value, cbObj) {
	    if (events[name]) {
	      if (data.connected || !isQueued) {
	        events[name](value, cbObj);
	      } else {
	        eventQueue.push({ name: name, value: value, cbObj: cbObj });
	      }
	    } else if (log) {
	      console.warn('There are no event handler for ' + name + ' in this service');
	    }
	  }
	  var init = R.curry(defObj.init)(data, emit);
	  defObj.connect = R.curry(defObj.connect)(data, emit);
	
	  function notify(name, data) {
	    for (var subscriber in subscribers) {
	      var parts = subscriber.split('_');
	      if (parts[parts.length - 1] === name) {
	        subscribers[subscriber](data);
	      }
	    }
	  }
	
	  function subscribeAll(subs) {
	    // avoid a bug with flyd.on TODO: needs review
	    if (subs != undefined) {
	      if (subscribers == -1 && data._initialNotify) {
	        // Fixed needs review
	        subscribers = subs;
	      } else {
	        subscribers = subs;
	      }
	    }
	  }
	
	  // merge tasks and drivers to store
	  if (defObj.tasks) {
	    defObj.tasks = defObj.tasks(emit);
	    store._tasks = defObj.tasks;
	  }
	  if (defObj.drivers) {
	    defObj.drivers = defObj.drivers(emit, subscribeAll);
	    store._drivers = defObj.drivers;
	  }
	
	  return {
	    serverName: serverName,
	    get: function get(key) {
	      return data[key];
	    },
	    emit: emit,
	    connect: function connect(connectionInfo) {
	      function success() {
	        var promises = [];
	        var ev = void 0;
	        while (ev = eventQueue.pop()) {
	          promises.push(new Promise(function (resolve, reject) {
	            events[ev.name](ev.value, resolve, reject);
	          }));
	        }
	        // TODO: handle errors
	        Promise.all(promises).then(function () {
	          return init(function () {
	            return 0;
	          }, function () {
	            return 0;
	          });
	        });
	      }
	
	      defObj.connect(connectionInfo, isQueued ? success : init(function () {
	        return 0;
	      }, function () {
	        return 0;
	      }));
	    },
	    tasks: defObj.tasks,
	    drivers: defObj.drivers,
	    subscribeAll: subscribeAll
	  };
	}

/***/ },
/* 76 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	// common fetch utils
	
	var fetchObj = function fetchObj(obj) {
	  var handled = false;
	  var status = function status(response) {
	    if (response.status >= 200 && response.status < 300) {
	      handled = true;
	      return Promise.resolve(response);
	    } else {
	      if (response.status == 401 || response.status == 403) {
	        obj.error('denied', response.status);
	      } else {
	        obj.error('error', response.status);
	      }
	      handled = true;
	      return Promise.reject(new Error(response.statusText));
	    }
	  };
	
	  return fetch(obj.url, obj.options).then(status).then(obj.response).then(obj.success).catch(function (err) {
	    if (!handled) obj.error('netError', err);
	  });
	};
	
	var fetchAll = function fetchAll(objs, success) {
	
	  var promiseArray = objs.map(function (obj, i) {
	    var handled = false;
	    var status = function status(response) {
	      if (response.status >= 200 && response.status < 300) {
	        handled = true;
	        return Promise.resolve(response);
	      } else {
	        if (response.status == 401 || response.status == 403) {
	          obj.error('denied', response.status);
	        } else {
	          obj.error('error', response.status);
	        }
	        handled = true;
	        return Promise.reject(new Error(response.statusText));
	      }
	    };
	
	    return fetch(obj.url, obj.options).then(status).then(obj.response);
	  });
	
	  return Promise.all(promiseArray).then(success);
	};
	
	exports.default = {
	  fetch: fetchObj,
	  fetchAll: fetchAll
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _curry1 = __webpack_require__(20);
	var curryN = __webpack_require__(40);
	
	/**
	 * Returns a curried equivalent of the provided function. The curried
	 * function has two unusual capabilities. First, its arguments needn't
	 * be provided one at a time. If `f` is a ternary function and `g` is
	 * `R.curry(f)`, the following are equivalent:
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
	 * @since v0.1.0
	 * @category Function
	 * @sig (* -> a) -> (* -> a)
	 * @param {Function} fn The function to curry.
	 * @return {Function} A new, curried function.
	 * @see R.curryN
	 * @example
	 *
	 *      var addFourNumbers = (a, b, c, d) => a + b + c + d;
	 *
	 *      var curriedAddFourNumbers = R.curry(addFourNumbers);
	 *      var f = curriedAddFourNumbers(1, 2);
	 *      var g = f(3);
	 *      g(4); //=> 10
	 */
	module.exports = _curry1(function curry(fn) {
	  return curryN(fn.length, fn);
	});

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var F = _extends({}, __webpack_require__(1).default, __webpack_require__(10).default);
	var h = __webpack_require__(66);
	
	exports.default = F.def({
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
/* 79 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var logVal = function logVal(x) {
	  var scope = arguments.length <= 1 || arguments[1] === undefined ? '__' : arguments[1];
	
	  console.log('%c ' + x + ' in ' + scope, 'color: purple; font-size: 20px');
	  return x;
	};
	
	exports.default = {
	  logVal: logVal
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Type = __webpack_require__(4);
	var R = {
	  T: __webpack_require__(54)
	};
	
	exports.default = {
	  types: Type({
	    setFocused: [String, R.T, R.T],
	    addWindowListener: [String, R.T],
	    removeWindowListener: [String, R.T]
	  }),
	  task: function task(rootSelector) {
	    var taskFn = this.types.caseOn({
	      setFocused: function setFocused(elementSelector, focused, _ref) {
	        var _ref$success = _ref.success;
	        var success = _ref$success === undefined ? function () {
	          return 0;
	        } : _ref$success;
	        var _ref$error = _ref.error;
	        var error = _ref$error === undefined ? function () {
	          return 0;
	        } : _ref$error;
	
	        var elements = document.querySelectorAll(rootSelector + ' ' + elementSelector);
	        if (elements.length === 1) {
	          if (focused) {
	            elements[0].focus();
	          } else {
	            elements[0].blur();
	          }
	          return success();
	        }
	        error('No element selected at: ' + rootSelector + ' ' + elementSelector);
	      },
	      addWindowListener: function addWindowListener(eventName, subsfn) {
	        window.addEventListener(eventName, subsfn);
	      },
	      removeWindowListener: function removeWindowListener(eventName, subsfn) {
	        window.removeEventListener(eventName, subsfn);
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
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Type = __webpack_require__(4);
	var R = {
	  T: __webpack_require__(54)
	};
	
	exports.default = {
	  types: Type({
	    emit: [String, R.T, R.T]
	  }),
	  task: function task(emitData) {
	    var taskFn = this.types.caseOn({
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
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Type = __webpack_require__(4);
	var R = {
	  T: __webpack_require__(54)
	};
	
	exports.default = {
	  types: Type({
	    send: [String]
	  }),
	  task: function task(sendValue) {
	    var taskFn = this.types.caseOn({
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
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Type = __webpack_require__(4);
	var R = {
	  T: __webpack_require__(54)
	};
	
	// emitter should implement emit function
	exports.default = {
	  types: Type({
	    emit: [String, R.T, R.T]
	  }),
	  task: function task(emt) {
	    var emitter = emt;
	    var taskFn = this.types.caseOn({
	      emit: function emit(channel, message) {
	        var success = arguments.length <= 2 || arguments[2] === undefined ? function () {} : arguments[2];
	
	        if (emitter != undefined) {
	          emitter.emit(channel, message, success);
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
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _unionType = __webpack_require__(4);
	
	var _unionType2 = _interopRequireDefault(_unionType);
	
	var _data = __webpack_require__(76);
	
	var _data2 = _interopRequireDefault(_data);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var R = {
	  T: __webpack_require__(54)
	};
	
	exports.default = {
	  types: (0, _unionType2.default)({
	    fetch: [Object]
	  }),
	  task: function task() {
	    var taskFn = this.types.caseOn({
	      fetch: function fetch(obj) {
	        return _data2.default.fetch(obj);
	      }
	    });
	
	    // task runner
	    return {
	      run: function run(obj) {
	        // perform side effect
	        return taskFn(obj, '');
	      },
	      get: {}
	    };
	  }
	};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Type = __webpack_require__(4);
	var R = {
	  T: __webpack_require__(54)
	};
	
	exports.default = {
	  types: Type({
	    read: [R.T, R.T]
	  }),
	  task: function task() {
	    var taskFn = this.types.caseOn({
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
	        reader.onload = function (ev) {
	          var contents = ev.target.result;
	          success(contents);
	        };
	        reader.onerror = function () {
	          return error('Error reading ' + file);
	        };
	        reader.readAsText(file);
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
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = view;
	
	var flyd = __webpack_require__(11);
	var h = __webpack_require__(66);
	
	// Common snabbdom patch function (convention over configuration)
	var patch = __webpack_require__(87).init([__webpack_require__(88), __webpack_require__(89), __webpack_require__(90), __webpack_require__(91), __webpack_require__(92)]);
	
	function view(selector) {
	  var patchfn = arguments.length <= 1 || arguments[1] === undefined ? patch : arguments[1];
	
	  var lastContainer = void 0,
	      renderer$ = void 0;
	  return {
	    attach: function attach(vnode$) {
	      window.addEventListener('DOMContentLoaded', function () {
	        var container = document.querySelector(selector);
	        renderer$ = flyd.scan(patchfn, container, vnode$.map(function (vnode) {
	          return h('div' + selector, [vnode]);
	        }));
	      });
	    },
	    reattach: function reattach(vnode$) {
	      lastContainer = patchfn(document.querySelector(selector), h('div' + selector));
	      renderer$ = flyd.scan(patchfn, lastContainer, vnode$.map(function (vnode) {
	        return h('div' + selector, [vnode]);
	      }));
	    },
	    dispose: function dispose() {
	      renderer$.end(true);
	    }
	  };
	}

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	// jshint newcap: false
	/* global require, module, document, Element */
	'use strict';
	
	var VNode = __webpack_require__(67);
	var is = __webpack_require__(68);
	
	function isUndef(s) {
	  return s === undefined;
	}
	function isDef(s) {
	  return s !== undefined;
	}
	
	function emptyNodeAt(elm) {
	  return VNode(elm.tagName, {}, [], undefined, elm);
	}
	
	var emptyNode = VNode('', {}, [], undefined, undefined);
	
	function sameVnode(vnode1, vnode2) {
	  return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
	}
	
	function createKeyToOldIdx(children, beginIdx, endIdx) {
	  var i,
	      map = {},
	      key;
	  for (i = beginIdx; i <= endIdx; ++i) {
	    key = children[i].key;
	    if (isDef(key)) map[key] = i;
	  }
	  return map;
	}
	
	function createRmCb(childElm, listeners) {
	  return function () {
	    if (--listeners === 0) childElm.parentElement.removeChild(childElm);
	  };
	}
	
	var hooks = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];
	
	function init(modules) {
	  var i,
	      j,
	      cbs = {};
	  for (i = 0; i < hooks.length; ++i) {
	    cbs[hooks[i]] = [];
	    for (j = 0; j < modules.length; ++j) {
	      if (modules[j][hooks[i]] !== undefined) cbs[hooks[i]].push(modules[j][hooks[i]]);
	    }
	  }
	
	  function createElm(vnode, insertedVnodeQueue) {
	    var i,
	        data = vnode.data;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.init)) i(vnode);
	      if (isDef(i = data.vnode)) vnode = i;
	    }
	    var elm,
	        children = vnode.children,
	        sel = vnode.sel;
	    if (isDef(sel)) {
	      // Parse selector
	      var hashIdx = sel.indexOf('#');
	      var dotIdx = sel.indexOf('.', hashIdx);
	      var hash = hashIdx > 0 ? hashIdx : sel.length;
	      var dot = dotIdx > 0 ? dotIdx : sel.length;
	      var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
	      elm = vnode.elm = isDef(data) && isDef(i = data.ns) ? document.createElementNS(i, tag) : document.createElement(tag);
	      if (hash < dot) elm.id = sel.slice(hash + 1, dot);
	      if (dotIdx > 0) elm.className = sel.slice(dot + 1).replace(/\./g, ' ');
	      if (is.array(children)) {
	        for (i = 0; i < children.length; ++i) {
	          elm.appendChild(createElm(children[i], insertedVnodeQueue));
	        }
	      } else if (is.primitive(vnode.text)) {
	        elm.appendChild(document.createTextNode(vnode.text));
	      }
	      for (i = 0; i < cbs.create.length; ++i) {
	        cbs.create[i](emptyNode, vnode);
	      }i = vnode.data.hook; // Reuse variable
	      if (isDef(i)) {
	        if (i.create) i.create(emptyNode, vnode);
	        if (i.insert) insertedVnodeQueue.push(vnode);
	      }
	    } else {
	      elm = vnode.elm = document.createTextNode(vnode.text);
	    }
	    return vnode.elm;
	  }
	
	  function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      parentElm.insertBefore(createElm(vnodes[startIdx], insertedVnodeQueue), before);
	    }
	  }
	
	  function invokeDestroyHook(vnode) {
	    var i = vnode.data,
	        j;
	    if (isDef(i)) {
	      if (isDef(i = i.hook) && isDef(i = i.destroy)) i(vnode);
	      for (i = 0; i < cbs.destroy.length; ++i) {
	        cbs.destroy[i](vnode);
	      }if (isDef(i = vnode.children)) {
	        for (j = 0; j < vnode.children.length; ++j) {
	          invokeDestroyHook(vnode.children[j]);
	        }
	      }
	    }
	  }
	
	  function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      var i,
	          listeners,
	          rm,
	          ch = vnodes[startIdx];
	      if (isDef(ch)) {
	        if (isDef(ch.sel)) {
	          invokeDestroyHook(ch);
	          listeners = cbs.remove.length + 1;
	          rm = createRmCb(ch.elm, listeners);
	          for (i = 0; i < cbs.remove.length; ++i) {
	            cbs.remove[i](ch, rm);
	          }if (isDef(i = ch.data) && isDef(i = i.hook) && isDef(i = i.remove)) {
	            i(ch, rm);
	          } else {
	            rm();
	          }
	        } else {
	          // Text node
	          parentElm.removeChild(ch.elm);
	        }
	      }
	    }
	  }
	
	  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
	    var oldStartIdx = 0,
	        newStartIdx = 0;
	    var oldEndIdx = oldCh.length - 1;
	    var oldStartVnode = oldCh[0];
	    var oldEndVnode = oldCh[oldEndIdx];
	    var newEndIdx = newCh.length - 1;
	    var newStartVnode = newCh[0];
	    var newEndVnode = newCh[newEndIdx];
	    var oldKeyToIdx, idxInOld, elmToMove, before;
	
	    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
	      if (isUndef(oldStartVnode)) {
	        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
	      } else if (isUndef(oldEndVnode)) {
	        oldEndVnode = oldCh[--oldEndIdx];
	      } else if (sameVnode(oldStartVnode, newStartVnode)) {
	        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
	        oldStartVnode = oldCh[++oldStartIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else if (sameVnode(oldEndVnode, newEndVnode)) {
	        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldStartVnode, newEndVnode)) {
	        // Vnode moved right
	        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
	        parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
	        oldStartVnode = oldCh[++oldStartIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldEndVnode, newStartVnode)) {
	        // Vnode moved left
	        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
	        parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else {
	        if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
	        idxInOld = oldKeyToIdx[newStartVnode.key];
	        if (isUndef(idxInOld)) {
	          // New element
	          parentElm.insertBefore(createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
	          newStartVnode = newCh[++newStartIdx];
	        } else {
	          elmToMove = oldCh[idxInOld];
	          patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
	          oldCh[idxInOld] = undefined;
	          parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm);
	          newStartVnode = newCh[++newStartIdx];
	        }
	      }
	    }
	    if (oldStartIdx > oldEndIdx) {
	      before = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
	      addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
	    } else if (newStartIdx > newEndIdx) {
	      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
	    }
	  }
	
	  function patchVnode(oldVnode, vnode, insertedVnodeQueue) {
	    var i, hook;
	    if (isDef(i = vnode.data) && isDef(hook = i.hook) && isDef(i = hook.prepatch)) {
	      i(oldVnode, vnode);
	    }
	    if (isDef(i = oldVnode.data) && isDef(i = i.vnode)) oldVnode = i;
	    if (isDef(i = vnode.data) && isDef(i = i.vnode)) vnode = i;
	    var elm = vnode.elm = oldVnode.elm,
	        oldCh = oldVnode.children,
	        ch = vnode.children;
	    if (oldVnode === vnode) return;
	    if (isDef(vnode.data)) {
	      for (i = 0; i < cbs.update.length; ++i) {
	        cbs.update[i](oldVnode, vnode);
	      }i = vnode.data.hook;
	      if (isDef(i) && isDef(i = i.update)) i(oldVnode, vnode);
	    }
	    if (isUndef(vnode.text)) {
	      if (isDef(oldCh) && isDef(ch)) {
	        if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue);
	      } else if (isDef(ch)) {
	        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
	      } else if (isDef(oldCh)) {
	        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
	      }
	    } else if (oldVnode.text !== vnode.text) {
	      elm.textContent = vnode.text;
	    }
	    if (isDef(hook) && isDef(i = hook.postpatch)) {
	      i(oldVnode, vnode);
	    }
	  }
	
	  return function (oldVnode, vnode) {
	    var i;
	    var insertedVnodeQueue = [];
	    for (i = 0; i < cbs.pre.length; ++i) {
	      cbs.pre[i]();
	    }if (oldVnode instanceof Element) {
	      if (oldVnode.parentElement !== null) {
	        createElm(vnode, insertedVnodeQueue);
	        oldVnode.parentElement.replaceChild(vnode.elm, oldVnode);
	      } else {
	        oldVnode = emptyNodeAt(oldVnode);
	        patchVnode(oldVnode, vnode, insertedVnodeQueue);
	      }
	    } else {
	      patchVnode(oldVnode, vnode, insertedVnodeQueue);
	    }
	    for (i = 0; i < insertedVnodeQueue.length; ++i) {
	      insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
	    }
	    for (i = 0; i < cbs.post.length; ++i) {
	      cbs.post[i]();
	    }return vnode;
	  };
	}
	
	module.exports = { init: init };

/***/ },
/* 88 */
/***/ function(module, exports) {

	'use strict';
	
	function updateClass(oldVnode, vnode) {
	  var cur,
	      name,
	      elm = vnode.elm,
	      oldClass = oldVnode.data.class || {},
	      klass = vnode.data.class || {};
	  for (name in klass) {
	    cur = klass[name];
	    if (cur !== oldClass[name]) {
	      elm.classList[cur ? 'add' : 'remove'](name);
	    }
	  }
	}
	
	module.exports = { create: updateClass, update: updateClass };

/***/ },
/* 89 */
/***/ function(module, exports) {

	"use strict";
	
	var booleanAttrs = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "compact", "controls", "declare", "default", "defaultchecked", "defaultmuted", "defaultselected", "defer", "disabled", "draggable", "enabled", "formnovalidate", "hidden", "indeterminate", "inert", "ismap", "itemscope", "loop", "multiple", "muted", "nohref", "noresize", "noshade", "novalidate", "nowrap", "open", "pauseonexit", "readonly", "required", "reversed", "scoped", "seamless", "selected", "sortable", "spellcheck", "translate", "truespeed", "typemustmatch", "visible"];
	
	var booleanAttrsDict = {};
	for (var i = 0, len = booleanAttrs.length; i < len; i++) {
	  booleanAttrsDict[booleanAttrs[i]] = true;
	}
	
	function updateAttrs(oldVnode, vnode) {
	  var key,
	      cur,
	      old,
	      elm = vnode.elm,
	      oldAttrs = oldVnode.data.attrs || {},
	      attrs = vnode.data.attrs || {};
	
	  // update modified attributes, add new attributes
	  for (key in attrs) {
	    cur = attrs[key];
	    old = oldAttrs[key];
	    if (old !== cur) {
	      // TODO: add support to namespaced attributes (setAttributeNS)
	      if (!cur && booleanAttrsDict[key]) elm.removeAttribute(key);else elm.setAttribute(key, cur);
	    }
	  }
	  //remove removed attributes
	  // use `in` operator since the previous `for` iteration uses it (.i.e. add even attributes with undefined value)
	  // the other option is to remove all attributes with value == undefined
	  for (key in oldAttrs) {
	    if (!(key in attrs)) {
	      elm.removeAttribute(key);
	    }
	  }
	}
	
	module.exports = { create: updateAttrs, update: updateAttrs };

/***/ },
/* 90 */
/***/ function(module, exports) {

	"use strict";
	
	function updateProps(oldVnode, vnode) {
	  var key,
	      cur,
	      old,
	      elm = vnode.elm,
	      oldProps = oldVnode.data.props || {},
	      props = vnode.data.props || {};
	  for (key in props) {
	    cur = props[key];
	    old = oldProps[key];
	    if (old !== cur) {
	      elm[key] = cur;
	    }
	  }
	}
	
	module.exports = { create: updateProps, update: updateProps };

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var is = __webpack_require__(68);
	
	function arrInvoker(arr) {
	  return function () {
	    // Special case when length is two, for performance
	    arr.length === 2 ? arr[0](arr[1]) : arr[0].apply(undefined, arr.slice(1));
	  };
	}
	
	function fnInvoker(o) {
	  return function (ev) {
	    o.fn(ev);
	  };
	}
	
	function updateEventListeners(oldVnode, vnode) {
	  var name,
	      cur,
	      old,
	      elm = vnode.elm,
	      oldOn = oldVnode.data.on || {},
	      on = vnode.data.on;
	  if (!on) return;
	  for (name in on) {
	    cur = on[name];
	    old = oldOn[name];
	    if (old === undefined) {
	      if (is.array(cur)) {
	        elm.addEventListener(name, arrInvoker(cur));
	      } else {
	        cur = { fn: cur };
	        on[name] = cur;
	        elm.addEventListener(name, fnInvoker(cur));
	      }
	    } else if (is.array(old)) {
	      // Deliberately modify old array since it's captured in closure created with `arrInvoker`
	      old.length = cur.length;
	      for (var i = 0; i < old.length; ++i) {
	        old[i] = cur[i];
	      }on[name] = old;
	    } else {
	      old.fn = cur;
	      on[name] = old;
	    }
	  }
	}
	
	module.exports = { create: updateEventListeners, update: updateEventListeners };

/***/ },
/* 92 */
/***/ function(module, exports) {

	'use strict';
	
	var raf = requestAnimationFrame || setTimeout;
	var nextFrame = function nextFrame(fn) {
	  raf(function () {
	    raf(fn);
	  });
	};
	
	function setNextFrame(obj, prop, val) {
	  nextFrame(function () {
	    obj[prop] = val;
	  });
	}
	
	function updateStyle(oldVnode, vnode) {
	  var cur,
	      name,
	      elm = vnode.elm,
	      oldStyle = oldVnode.data.style || {},
	      style = vnode.data.style || {},
	      oldHasDel = 'delayed' in oldStyle;
	  for (name in style) {
	    cur = style[name];
	    if (name === 'delayed') {
	      for (name in style.delayed) {
	        cur = style.delayed[name];
	        if (!oldHasDel || cur !== oldStyle.delayed[name]) {
	          setNextFrame(elm.style, name, cur);
	        }
	      }
	    } else if (name !== 'remove' && cur !== oldStyle[name]) {
	      elm.style[name] = cur;
	    }
	  }
	}
	
	function applyDestroyStyle(vnode) {
	  var style,
	      name,
	      elm = vnode.elm,
	      s = vnode.data.style;
	  if (!s || !(style = s.destroy)) return;
	  for (name in style) {
	    elm.style[name] = style[name];
	  }
	}
	
	function applyRemoveStyle(vnode, rm) {
	  var s = vnode.data.style;
	  if (!s || !s.remove) {
	    rm();
	    return;
	  }
	  var name,
	      elm = vnode.elm,
	      idx,
	      i = 0,
	      maxDur = 0,
	      compStyle,
	      style = s.remove,
	      amount = 0,
	      applied = [];
	  for (name in style) {
	    applied.push(name);
	    elm.style[name] = style[name];
	  }
	  compStyle = getComputedStyle(elm);
	  var props = compStyle['transition-property'].split(', ');
	  for (; i < props.length; ++i) {
	    if (applied.indexOf(props[i]) !== -1) amount++;
	  }
	  elm.addEventListener('transitionend', function (ev) {
	    if (ev.target === elm) --amount;
	    if (amount === 0) rm();
	  });
	}
	
	module.exports = { create: updateStyle, update: updateStyle, destroy: applyDestroyStyle, remove: applyRemoveStyle };

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = event;
	var flyd = __webpack_require__(11);
	
	function event(cb) {
	  return {
	    listener$: null,
	    attach: function attach(event$) {
	      this.listener$ = flyd.on(cb, event$);
	    },
	    reattach: function reattach(event$) {
	      this.listener$ = flyd.on(cb, event$);
	    },
	    dispose: function dispose() {
	      this.listener$.end(true);
	    }
	  };
	}

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = listenable;
	// WORKING
	var flyd = __webpack_require__(11);
	
	// l should implement removeAllListeners and on functions
	function listenable(l) {
	
	  var listenable = l || {};
	
	  /* In the form: {
	    listenerName1: [listenerFn1, listenerFn2, ...],
	    listenerName2: [listenerFn1, listenerFn2, ...],
	  }
	  */
	  var listeners = void 0;
	
	  if (!listenable.removeAllListeners) {
	    listenable.removeAllListeners = function () {};
	  }
	
	  function setSubscribers(subs) {
	
	    listeners = {};
	
	    for (var subscriber in subs) {
	      var parts = subscriber.split('_');
	      var name = parts[parts.length - 1];
	      if (listeners[name]) {
	        listeners[name].push(subs[subscriber]);
	      } else {
	        listeners[name] = [subs[subscriber]];
	      }
	    }
	
	    setListeners();
	  }
	
	  function setListeners() {
	    for (var listenerName in listeners) {
	      var listenerArr = listeners[listenerName];
	      if (listenerArr.length > 0 && listenable != undefined) {
	        listenable.removeAllListeners(listenerName);
	        for (var i = listenerArr.length - 1; i >= 0; i--) {
	          listenable.on(listenerName, listenerArr[i]);
	        }
	      }
	    }
	  }
	
	  return {
	    listener$: null,
	    attach: function attach(event$) {
	      this.listener$ = flyd.on(setSubscribers, event$);
	    },
	    reattach: function reattach(event$) {
	      this.listener$ = flyd.on(setSubscribers, event$);
	    },
	    dispose: function dispose() {
	      this.listener$.end(true);
	    },
	    get: function get() {
	      return listenable;
	    },
	    set: function set(s) {
	      listenable = s;
	      setListeners();
	    }
	  };
	}

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = load;
	
	var flyd = __webpack_require__(11);
	
	function load() {
	  return {
	    attach: function attach(vnode$) {
	      flyd.on(function (f) {
	        f();
	        vnode$.end(true);
	      }, vnode$);
	    },
	    reattach: function reattach(vnode$) {},
	    dispose: function dispose() {}
	  };
	}

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = time;
	var R = {
	  mapObjIndexed: __webpack_require__(18)
	};
	var flyd = __webpack_require__(11);
	
	//// time driver module ----
	var stateNames = ['pending', 'running', 'paused'];
	var timerPatch = function timerPatch(timeData, obj) {
	  // TODO: Do a better implementation of this driver
	  var id = timeData.id;
	  if (obj.periodic) {
	    if (obj.active && obj.active != timeData.active) {
	      id = setInterval(function () {
	        return obj.on(timeData);
	      }, obj.time);
	    } else if (!obj.active && obj.active != timeData.active) {
	      clearInterval(id);
	      id = null;
	    } else if (obj.time != timeData.time) {
	      clearInterval(id);
	      id = setInterval(function () {
	        return obj.on(timeData);
	      }, obj.time);
	    } else if (id && obj.periodic != timeData.periodic) {
	      clearTimeout(id);
	      id = setInterval(function () {
	        return obj.on(timeData);
	      }, obj.time);
	    }
	  } else {
	    if (obj.active && obj.active != timeData.active) {
	      id = setTimeout(function () {
	        return obj.on(timeData);
	      }, obj.time);
	    } else if (!obj.active && obj.active != timeData.active) {
	      clearTimeout(id);
	      id = null;
	    } else if (obj.time != timeData.time) {
	      clearTimeout(id);
	      id = setTimeout(function () {
	        return obj.on(timeData);
	      }, obj.time);
	    } else if (obj.periodic != timeData.periodic) {
	      clearInterval(id);
	      id = setTimeout(function () {
	        return obj.on(timeData);
	      }, obj.time);
	    }
	  }
	  return {
	    id: id,
	    periodic: obj.periodic,
	    active: obj.active,
	    time: obj.time,
	    on: obj.on,
	    state: obj.state
	  };
	};
	
	var timerListPatch = function timerListPatch(lastList, list) {
	  // dispose removed timers
	  for (var name in lastList) {
	    if (!list[name]) {
	      if (lastList[name].periodic) clearInterval(lastList[name].id);else clearTimeout(lastList[name].id);
	    }
	  }
	
	  return R.mapObjIndexed(function (obj, name) {
	    return timerPatch(lastList[name] || {}, obj);
	  }, list);
	};
	
	function time() {
	  // babel or JS bug the stack is deleted and listener$ in not accesible from attach
	  // solution use normal functions (not arrows) and merge listener$ in the object
	  // let listener$
	  return {
	    listener$: null,
	    attach: function attach(time$) {
	      this.listener$ = flyd.scan(timerListPatch, {}, time$);
	    },
	    reattach: function reattach(time$) {
	      this.listener$ = flyd.scan(timerListPatch, {}, time$);
	    },
	    dispose: function dispose() {
	      this.listener$.end(true);
	    }
	  };
	}

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = localStorage;
	var flyd = __webpack_require__(11);
	
	function localStorage(name) {
	  var listener$ = void 0;
	  return {
	    attach: function attach(data$) {
	      listener$ = flyd.on(function (data) {
	        localStorage.setItem(name, JSON.stringify(data));
	      }, data$);
	    },
	    reattach: function reattach(data$) {
	      listener$.end(true);
	      listener$ = flyd.on(function (data) {
	        localStorage.setItem(name, JSON.stringify(data));
	      }, data$);
	    },
	    dispose: function dispose() {
	      localStorage.removeItem(name);
	      listener$.end(true);
	    }
	  };
	}

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = screenInfoDriver;
	var flyd = __webpack_require__(11);
	
	var _require = __webpack_require__(99);
	
	var screenInfo = _require.screenInfo;
	
	// difing is not necesary beacuse there is no use case in that the screen size has a bunch of changes
	
	function screenInfoDriver() {
	  return {
	    listener$: null,
	    screenListener: null,
	    attach: function attach(screen$) {
	      var _this = this;
	
	      this.listener$ = flyd.on(function (list) {
	        _this.screenListener = function () {
	          var info = screenInfo();
	          for (var key in list) {
	            list[key].on(info);
	          }
	        };
	        window.addEventListener('resize', _this.screenListener);
	      }, screen$);
	    },
	    reattach: function reattach(screen$) {
	      var _this2 = this;
	
	      this.listener$ = flyd.on(function (list) {
	        _this2.screenListener = function () {
	          var info = screenInfo();
	          for (var key in list) {
	            list[key].on(info);
	          }
	        };
	        window.addEventListener('resize', _this2.screenListener);
	      }, screen$);
	    },
	    dispose: function dispose() {
	      this.listener$.end(true);
	      window.removeEventListener('resize', this.screenListener);
	      this.screenListener = null;
	    }
	  };
	}

/***/ },
/* 99 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// Helper functions taken from https://github.com/garth/snabbdom-material/tree/master/src/helpers
	
	var screenSize = function screenSize() {
	  return {
	    width: !!window && (window.innerWidth || document.body.clientWidth) || 1024,
	    height: !!window && (window.innerHeight || document.body.clientHeight) || 768
	  };
	};
	
	var types = ['xs', 'sm', 'md', 'lg'];
	
	var screenInfo = function screenInfo() {
	  var _screenSize = screenSize();
	
	  var width = _screenSize.width;
	  var height = _screenSize.height;
	
	  var size = width >= 1200 ? 4 : width >= 992 ? 3 : width >= 768 ? 2 : 1;
	
	  return {
	    size: size,
	    type: types[size - 1],
	    isLandscape: width >= height,
	    isPortrait: width < height
	  };
	};
	
	exports.default = {
	  screenSize: screenSize,
	  screenInfo: screenInfo
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=fractal.map