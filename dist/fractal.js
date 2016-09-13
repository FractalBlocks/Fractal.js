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

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends2 = __webpack_require__(1);

	var _extends3 = _interopRequireDefault(_extends2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = (0, _extends3.default)({}, __webpack_require__(104), __webpack_require__(116), {
	  h: __webpack_require__(173),
	  flyd: __webpack_require__(142),
	  timetravel: __webpack_require__(160),
	  log: __webpack_require__(176),
	  router: __webpack_require__(177),
	  service: __webpack_require__(196),
	  noChildren: __webpack_require__(218),
	  tasks: {
	    data: __webpack_require__(219),
	    value: __webpack_require__(220),
	    fetch: __webpack_require__(221),
	    emitter: __webpack_require__(222),
	    socketio: __webpack_require__(223)
	  },
	  drivers: {
	    view: __webpack_require__(224),
	    event: __webpack_require__(231),
	    listenable: __webpack_require__(232),
	    load: __webpack_require__(233),
	    time: __webpack_require__(234), // NEEDS REVIEW!! (maybe depreecated)
	    localStorage: __webpack_require__(235),
	    screenInfo: __webpack_require__(236),
	    socketio: __webpack_require__(238) }
	}, __webpack_require__(151), {
	  data: __webpack_require__(217),
	  style: __webpack_require__(239),
	  css: __webpack_require__(239) });

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _assign = __webpack_require__(2);

	var _assign2 = _interopRequireDefault(_assign);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	exports.default = _assign2.default || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(3), __esModule: true };

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(4);
	module.exports = __webpack_require__(7).Object.assign;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(5);

	$export($export.S + $export.F, 'Object', { assign: __webpack_require__(103) });

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(6),
	    core = __webpack_require__(7),
	    ctx = __webpack_require__(8),
	    hide = __webpack_require__(10),
	    PROTOTYPE = 'prototype';

	var $export = function $export(type, name, source) {
	  var IS_FORCED = type & $export.F,
	      IS_GLOBAL = type & $export.G,
	      IS_STATIC = type & $export.S,
	      IS_PROTO = type & $export.P,
	      IS_BIND = type & $export.B,
	      IS_WRAP = type & $export.W,
	      exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
	      expProto = exports[PROTOTYPE],
	      target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE],
	      key,
	      own,
	      out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && key in exports) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? function (C) {
	      var F = function F(a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0:
	              return new C();
	            case 1:
	              return new C(a);
	            case 2:
	              return new C(a, b);
	          }return new C(a, b, c);
	        }return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	      // make static versions for prototype methods
	    }(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1; // forced
	$export.G = 2; // global
	$export.S = 4; // static
	$export.P = 8; // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	$export.U = 64; // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	var core = module.exports = { version: '2.4.0' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// optional / simple context binding
	var aFunction = __webpack_require__(9);
	module.exports = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1:
	      return function (a) {
	        return fn.call(that, a);
	      };
	    case 2:
	      return function (a, b) {
	        return fn.call(that, a, b);
	      };
	    case 3:
	      return function (a, b, c) {
	        return fn.call(that, a, b, c);
	      };
	  }
	  return function () /* ...args */{
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var dP = __webpack_require__(11),
	    createDesc = __webpack_require__(59);
	module.exports = __webpack_require__(15) ? function (object, key, value) {
	  return dP.f(object, key, createDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _defineProperty = __webpack_require__(12);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var anObject = __webpack_require__(17),
	    IE8_DOM_DEFINE = __webpack_require__(99),
	    toPrimitive = __webpack_require__(89),
	    dP = _defineProperty2.default;

	exports.f = __webpack_require__(15) ? _defineProperty2.default : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return dP(O, P, Attributes);
	  } catch (e) {/* empty */}
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(13), __esModule: true };

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(14);
	var $Object = __webpack_require__(7).Object;
	module.exports = function defineProperty(it, key, desc) {
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(5);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(15), 'Object', { defineProperty: __webpack_require__(11).f });

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(16)(function () {
	  return Object.defineProperty({}, 'a', { get: function get() {
	      return 7;
	    } }).a != 7;
	});

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(18);
	module.exports = function (it) {
	  if (!isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof2 = __webpack_require__(19);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = function (it) {
	  return (typeof it === 'undefined' ? 'undefined' : (0, _typeof3.default)(it)) === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof3 = __webpack_require__(19);

	var _typeof4 = _interopRequireDefault2(_typeof3);

	function _interopRequireDefault2(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.__esModule = true;

	var _iterator = __webpack_require__(20);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(71);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && (0, _typeof4.default)(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : (0, _typeof4.default)(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : (0, _typeof4.default)(obj);
	};

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(21), __esModule: true };

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(22);
	__webpack_require__(66);
	module.exports = __webpack_require__(70).f('iterator');

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $at = __webpack_require__(23)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(26)(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0; // next index
	  // 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t,
	      index = this._i,
	      point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toInteger = __webpack_require__(24),
	    defined = __webpack_require__(25);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(defined(that)),
	        i = toInteger(pos),
	        l = s.length,
	        a,
	        b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";

	// 7.1.4 ToInteger
	var ceil = Math.ceil,
	    floor = Math.floor;
	module.exports = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	"use strict";

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var LIBRARY = __webpack_require__(27),
	    $export = __webpack_require__(5),
	    redefine = __webpack_require__(28),
	    hide = __webpack_require__(10),
	    has = __webpack_require__(29),
	    Iterators = __webpack_require__(30),
	    $iterCreate = __webpack_require__(31),
	    setToStringTag = __webpack_require__(60),
	    getPrototypeOf = __webpack_require__(62),
	    ITERATOR = __webpack_require__(61)('iterator'),
	    BUGGY = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	,
	    FF_ITERATOR = '@@iterator',
	    KEYS = 'keys',
	    VALUES = 'values';

	var returnThis = function returnThis() {
	  return this;
	};

	module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function getMethod(kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS:
	        return function keys() {
	          return new Constructor(this, kind);
	        };
	      case VALUES:
	        return function values() {
	          return new Constructor(this, kind);
	        };
	    }return function entries() {
	      return new Constructor(this, kind);
	    };
	  };
	  var TAG = NAME + ' Iterator',
	      DEF_VALUES = DEFAULT == VALUES,
	      VALUES_BUG = false,
	      proto = Base.prototype,
	      $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT],
	      $default = $native || getMethod(DEFAULT),
	      $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined,
	      $anyNative = NAME == 'Array' ? proto.entries || $native : $native,
	      methods,
	      key,
	      IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype) {
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() {
	      return $native.call(this);
	    };
	  }
	  // Define iterator
	  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	"use strict";

	module.exports = true;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(10);

/***/ },
/* 29 */
/***/ function(module, exports) {

	"use strict";

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	"use strict";

	module.exports = {};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var create = __webpack_require__(32),
	    descriptor = __webpack_require__(59),
	    setToStringTag = __webpack_require__(60),
	    IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(10)(IteratorPrototype, __webpack_require__(61)('iterator'), function () {
	  return this;
	});

	module.exports = function (Constructor, NAME, next) {
	  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _create = __webpack_require__(33);

	var _create2 = _interopRequireDefault(_create);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject = __webpack_require__(17),
	    dPs = __webpack_require__(36),
	    enumBugKeys = __webpack_require__(56),
	    IE_PROTO = __webpack_require__(53)('IE_PROTO'),
	    Empty = function Empty() {/* empty */},
	    PROTOTYPE = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var _createDict = function createDict() {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(57)('iframe'),
	      i = enumBugKeys.length,
	      lt = '<',
	      gt = '>',
	      iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(58).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  _createDict = iframeDocument.F;
	  while (i--) {
	    delete _createDict[PROTOTYPE][enumBugKeys[i]];
	  }return _createDict();
	};

	module.exports = _create2.default || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = _createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(34), __esModule: true };

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(35);
	var $Object = __webpack_require__(7).Object;
	module.exports = function create(P, D) {
	  return $Object.create(P, D);
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(5);
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', { create: __webpack_require__(32) });

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _defineProperties = __webpack_require__(37);

	var _defineProperties2 = _interopRequireDefault(_defineProperties);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var dP = __webpack_require__(11),
	    anObject = __webpack_require__(17),
	    getKeys = __webpack_require__(40);

	module.exports = __webpack_require__(15) ? _defineProperties2.default : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = getKeys(Properties),
	      length = keys.length,
	      i = 0,
	      P;
	  while (length > i) {
	    dP.f(O, P = keys[i++], Properties[P]);
	  }return O;
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(38), __esModule: true };

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(39);
	var $Object = __webpack_require__(7).Object;
	module.exports = function defineProperties(T, D) {
	  return $Object.defineProperties(T, D);
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(5);
	// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
	$export($export.S + $export.F * !__webpack_require__(15), 'Object', { defineProperties: __webpack_require__(36) });

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _keys = __webpack_require__(41);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys = __webpack_require__(46),
	    enumBugKeys = __webpack_require__(56);

	module.exports = _keys2.default || function keys(O) {
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(42), __esModule: true };

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(43);
	module.exports = __webpack_require__(7).Object.keys;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(44),
	    $keys = __webpack_require__(40);

	__webpack_require__(45)('keys', function () {
	  return function keys(it) {
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(25);
	module.exports = function (it) {
	  return Object(defined(it));
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(5),
	    core = __webpack_require__(7),
	    fails = __webpack_require__(16);
	module.exports = function (KEY, exec) {
	  var fn = (core.Object || {})[KEY] || Object[KEY],
	      exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function () {
	    fn(1);
	  }), 'Object', exp);
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var has = __webpack_require__(29),
	    toIObject = __webpack_require__(47),
	    arrayIndexOf = __webpack_require__(50)(false),
	    IE_PROTO = __webpack_require__(53)('IE_PROTO');

	module.exports = function (object, names) {
	  var O = toIObject(object),
	      i = 0,
	      result = [],
	      key;
	  for (key in O) {
	    if (key != IE_PROTO) has(O, key) && result.push(key);
	  } // Don't enum bug & hidden keys
	  while (names.length > i) {
	    if (has(O, key = names[i++])) {
	      ~arrayIndexOf(result, key) || result.push(key);
	    }
	  }return result;
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(48),
	    defined = __webpack_require__(25);
	module.exports = function (it) {
	  return IObject(defined(it));
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(49);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 49 */
/***/ function(module, exports) {

	"use strict";

	var toString = {}.toString;

	module.exports = function (it) {
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(47),
	    toLength = __webpack_require__(51),
	    toIndex = __webpack_require__(52);
	module.exports = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIObject($this),
	        length = toLength(O.length),
	        index = toIndex(fromIndex, length),
	        value;
	    // Array#includes uses SameValueZero equality algorithm
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      if (value != value) return true;
	      // Array#toIndex ignores holes, Array#includes - not
	    } else for (; length > index; index++) {
	      if (IS_INCLUDES || index in O) {
	        if (O[index] === el) return IS_INCLUDES || index || 0;
	      }
	    }return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(24),
	    min = Math.min;
	module.exports = function (it) {
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toInteger = __webpack_require__(24),
	    max = Math.max,
	    min = Math.min;
	module.exports = function (index, length) {
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var shared = __webpack_require__(54)('keys'),
	    uid = __webpack_require__(55);
	module.exports = function (key) {
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(6),
	    SHARED = '__core-js_shared__',
	    store = global[SHARED] || (global[SHARED] = {});
	module.exports = function (key) {
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 55 */
/***/ function(module, exports) {

	'use strict';

	var id = 0,
	    px = Math.random();
	module.exports = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 56 */
/***/ function(module, exports) {

	'use strict';

	// IE 8- don't enum bug keys
	module.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(18),
	    document = __webpack_require__(6).document
	// in old IE typeof document.createElement is 'object'
	,
	    is = isObject(document) && isObject(document.createElement);
	module.exports = function (it) {
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(6).document && document.documentElement;

/***/ },
/* 59 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var def = __webpack_require__(11).f,
	    has = __webpack_require__(29),
	    TAG = __webpack_require__(61)('toStringTag');

	module.exports = function (it, tag, stat) {
	  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var store = __webpack_require__(54)('wks'),
	    uid = __webpack_require__(55),
	    _Symbol = __webpack_require__(6).Symbol,
	    USE_SYMBOL = typeof _Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] = USE_SYMBOL && _Symbol[name] || (USE_SYMBOL ? _Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _getPrototypeOf = __webpack_require__(63);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has = __webpack_require__(29),
	    toObject = __webpack_require__(44),
	    IE_PROTO = __webpack_require__(53)('IE_PROTO'),
	    ObjectProto = Object.prototype;

	module.exports = _getPrototypeOf2.default || function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO)) return O[IE_PROTO];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  }return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(64), __esModule: true };

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(65);
	module.exports = __webpack_require__(7).Object.getPrototypeOf;

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject = __webpack_require__(44),
	    $getPrototypeOf = __webpack_require__(62);

	__webpack_require__(45)('getPrototypeOf', function () {
	  return function getPrototypeOf(it) {
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(67);
	var global = __webpack_require__(6),
	    hide = __webpack_require__(10),
	    Iterators = __webpack_require__(30),
	    TO_STRING_TAG = __webpack_require__(61)('toStringTag');

	for (var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++) {
	  var NAME = collections[i],
	      Collection = global[NAME],
	      proto = Collection && Collection.prototype;
	  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var addToUnscopables = __webpack_require__(68),
	    step = __webpack_require__(69),
	    Iterators = __webpack_require__(30),
	    toIObject = __webpack_require__(47);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(26)(Array, 'Array', function (iterated, kind) {
	  this._t = toIObject(iterated); // target
	  this._i = 0; // next index
	  this._k = kind; // kind
	  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t,
	      kind = this._k,
	      index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return step(1);
	  }
	  if (kind == 'keys') return step(0, index);
	  if (kind == 'values') return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 68 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function () {/* empty */};

/***/ },
/* 69 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (done, value) {
	  return { value: value, done: !!done };
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.f = __webpack_require__(61);

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(72), __esModule: true };

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(73);
	__webpack_require__(100);
	__webpack_require__(101);
	__webpack_require__(102);
	module.exports = __webpack_require__(7).Symbol;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim

	var _typeof2 = __webpack_require__(19);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var global = __webpack_require__(6),
	    has = __webpack_require__(29),
	    DESCRIPTORS = __webpack_require__(15),
	    $export = __webpack_require__(5),
	    redefine = __webpack_require__(28),
	    META = __webpack_require__(74).KEY,
	    $fails = __webpack_require__(16),
	    shared = __webpack_require__(54),
	    setToStringTag = __webpack_require__(60),
	    uid = __webpack_require__(55),
	    wks = __webpack_require__(61),
	    wksExt = __webpack_require__(70),
	    wksDefine = __webpack_require__(81),
	    keyOf = __webpack_require__(82),
	    enumKeys = __webpack_require__(83),
	    isArray = __webpack_require__(88),
	    anObject = __webpack_require__(17),
	    toIObject = __webpack_require__(47),
	    toPrimitive = __webpack_require__(89),
	    createDesc = __webpack_require__(59),
	    _create = __webpack_require__(32),
	    gOPNExt = __webpack_require__(90),
	    $GOPD = __webpack_require__(95),
	    $DP = __webpack_require__(11),
	    $keys = __webpack_require__(40),
	    gOPD = $GOPD.f,
	    dP = $DP.f,
	    gOPN = gOPNExt.f,
	    $Symbol = global.Symbol,
	    $JSON = global.JSON,
	    _stringify = $JSON && $JSON.stringify,
	    PROTOTYPE = 'prototype',
	    HIDDEN = wks('_hidden'),
	    TO_PRIMITIVE = wks('toPrimitive'),
	    isEnum = {}.propertyIsEnumerable,
	    SymbolRegistry = shared('symbol-registry'),
	    AllSymbols = shared('symbols'),
	    OPSymbols = shared('op-symbols'),
	    ObjectProto = Object[PROTOTYPE],
	    USE_NATIVE = typeof $Symbol == 'function',
	    QObject = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function () {
	  return _create(dP({}, 'a', {
	    get: function get() {
	      return dP(this, 'a', { value: 7 }).a;
	    }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD(ObjectProto, key);
	  if (protoDesc) delete ObjectProto[key];
	  dP(it, key, D);
	  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function wrap(tag) {
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && (0, _typeof3.default)($Symbol.iterator) == 'symbol' ? function (it) {
	  return (typeof it === 'undefined' ? 'undefined' : (0, _typeof3.default)(it)) == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D) {
	  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if (has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = _create(D, { enumerable: createDesc(0, false) });
	    }return setSymbolDesc(it, key, D);
	  }return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P)),
	      i = 0,
	      l = keys.length,
	      key;
	  while (l > i) {
	    $defineProperty(it, key = keys[i++], P[key]);
	  }return it;
	};
	var $create = function create(it, P) {
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  it = toIObject(it);
	  key = toPrimitive(key, true);
	  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
	  var D = gOPD(it, key);
	  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN(toIObject(it)),
	      result = [],
	      i = 0,
	      key;
	  while (names.length > i) {
	    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	  }return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto,
	      names = gOPN(IS_OP ? OPSymbols : toIObject(it)),
	      result = [],
	      i = 0,
	      key;
	  while (names.length > i) {
	    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
	  }return result;
	};

	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE) {
	  $Symbol = function _Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function $set(value) {
	      if (this === ObjectProto) $set.call(OPSymbols, value);
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f = $defineProperty;
	  __webpack_require__(94).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(87).f = $propertyIsEnumerable;
	  __webpack_require__(84).f = $getOwnPropertySymbols;

	  if (DESCRIPTORS && !__webpack_require__(27)) {
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function (name) {
	    return wrap(wks(name));
	  };
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

	for (var symbols =
	// 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(','), i = 0; symbols.length > i;) {
	  wks(symbols[i++]);
	}for (var symbols = $keys(wks.store), i = 0; symbols.length > i;) {
	  wksDefine(symbols[i++]);
	}$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function _for(key) {
	    return has(SymbolRegistry, key += '') ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key) {
	    if (isSymbol(key)) return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function useSetter() {
	    setter = true;
	  },
	  useSimple: function useSimple() {
	    setter = false;
	  }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it) {
	    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    var args = [it],
	        i = 1,
	        replacer,
	        $replacer;
	    while (arguments.length > i) {
	      args.push(arguments[i++]);
	    }replacer = args[1];
	    if (typeof replacer == 'function') $replacer = replacer;
	    if ($replacer || !isArray(replacer)) replacer = function replacer(key, value) {
	      if ($replacer) value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(10)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof2 = __webpack_require__(19);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _preventExtensions = __webpack_require__(75);

	var _preventExtensions2 = _interopRequireDefault(_preventExtensions);

	var _isExtensible = __webpack_require__(78);

	var _isExtensible2 = _interopRequireDefault(_isExtensible);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var META = __webpack_require__(55)('meta'),
	    isObject = __webpack_require__(18),
	    has = __webpack_require__(29),
	    setDesc = __webpack_require__(11).f,
	    id = 0;
	var isExtensible = _isExtensible2.default || function () {
	  return true;
	};
	var FREEZE = !__webpack_require__(16)(function () {
	  return isExtensible((0, _preventExtensions2.default)({}));
	});
	var setMeta = function setMeta(it) {
	  setDesc(it, META, { value: {
	      i: 'O' + ++id, // object ID
	      w: {} // weak collections IDs
	    } });
	};
	var fastKey = function fastKey(it, create) {
	  // return primitive with prefix
	  if (!isObject(it)) return (typeof it === 'undefined' ? 'undefined' : (0, _typeof3.default)(it)) == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMeta(it);
	    // return object ID
	  }return it[META].i;
	};
	var getWeak = function getWeak(it, create) {
	  if (!has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMeta(it);
	    // return hash weak collections IDs
	  }return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function onFreeze(it) {
	  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY: META,
	  NEED: false,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(76), __esModule: true };

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(77);
	module.exports = __webpack_require__(7).Object.preventExtensions;

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.2.15 Object.preventExtensions(O)
	var isObject = __webpack_require__(18),
	    meta = __webpack_require__(74).onFreeze;

	__webpack_require__(45)('preventExtensions', function ($preventExtensions) {
	  return function preventExtensions(it) {
	    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
	  };
	});

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(79), __esModule: true };

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(80);
	module.exports = __webpack_require__(7).Object.isExtensible;

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.2.11 Object.isExtensible(O)
	var isObject = __webpack_require__(18);

	__webpack_require__(45)('isExtensible', function ($isExtensible) {
	  return function isExtensible(it) {
	    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
	  };
	});

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(6),
	    core = __webpack_require__(7),
	    LIBRARY = __webpack_require__(27),
	    wksExt = __webpack_require__(70),
	    defineProperty = __webpack_require__(11).f;
	module.exports = function (name) {
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
	};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getKeys = __webpack_require__(40),
	    toIObject = __webpack_require__(47);
	module.exports = function (object, el) {
	  var O = toIObject(object),
	      keys = getKeys(O),
	      length = keys.length,
	      index = 0,
	      key;
	  while (length > index) {
	    if (O[key = keys[index++]] === el) return key;
	  }
	};

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(40),
	    gOPS = __webpack_require__(84),
	    pIE = __webpack_require__(87);
	module.exports = function (it) {
	  var result = getKeys(it),
	      getSymbols = gOPS.f;
	  if (getSymbols) {
	    var symbols = getSymbols(it),
	        isEnum = pIE.f,
	        i = 0,
	        key;
	    while (symbols.length > i) {
	      if (isEnum.call(it, key = symbols[i++])) result.push(key);
	    }
	  }return result;
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _getOwnPropertySymbols = __webpack_require__(85);

	var _getOwnPropertySymbols2 = _interopRequireDefault(_getOwnPropertySymbols);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.f = _getOwnPropertySymbols2.default;

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(86), __esModule: true };

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(73);
	module.exports = __webpack_require__(7).Object.getOwnPropertySymbols;

/***/ },
/* 87 */
/***/ function(module, exports) {

	"use strict";

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(49);
	module.exports = Array.isArray || function isArray(arg) {
	  return cof(arg) == 'Array';
	};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(18);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function (it, S) {
	  if (!isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _getOwnPropertyNames = __webpack_require__(91);

	var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

	var _typeof2 = __webpack_require__(19);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(47),
	    gOPN = __webpack_require__(94).f,
	    toString = {}.toString;

	var windowNames = (typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) == 'object' && window && _getOwnPropertyNames2.default ? (0, _getOwnPropertyNames2.default)(window) : [];

	var getWindowNames = function getWindowNames(it) {
	  try {
	    return gOPN(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it) {
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(92), __esModule: true };

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(93);
	var $Object = __webpack_require__(7).Object;
	module.exports = function getOwnPropertyNames(it) {
	  return $Object.getOwnPropertyNames(it);
	};

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.2.7 Object.getOwnPropertyNames(O)
	__webpack_require__(45)('getOwnPropertyNames', function () {
	  return __webpack_require__(90).f;
	});

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _getOwnPropertyNames = __webpack_require__(91);

	var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys = __webpack_require__(46),
	    hiddenKeys = __webpack_require__(56).concat('length', 'prototype');

	exports.f = _getOwnPropertyNames2.default || function getOwnPropertyNames(O) {
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _getOwnPropertyDescriptor = __webpack_require__(96);

	var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var pIE = __webpack_require__(87),
	    createDesc = __webpack_require__(59),
	    toIObject = __webpack_require__(47),
	    toPrimitive = __webpack_require__(89),
	    has = __webpack_require__(29),
	    IE8_DOM_DEFINE = __webpack_require__(99),
	    gOPD = _getOwnPropertyDescriptor2.default;

	exports.f = __webpack_require__(15) ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if (IE8_DOM_DEFINE) try {
	    return gOPD(O, P);
	  } catch (e) {/* empty */}
	  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(97), __esModule: true };

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(98);
	var $Object = __webpack_require__(7).Object;
	module.exports = function getOwnPropertyDescriptor(it, key) {
	  return $Object.getOwnPropertyDescriptor(it, key);
	};

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject = __webpack_require__(47),
	    $getOwnPropertyDescriptor = __webpack_require__(95).f;

	__webpack_require__(45)('getOwnPropertyDescriptor', function () {
	  return function getOwnPropertyDescriptor(it, key) {
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = !__webpack_require__(15) && !__webpack_require__(16)(function () {
	  return Object.defineProperty(__webpack_require__(57)('div'), 'a', { get: function get() {
	      return 7;
	    } }).a != 7;
	});

/***/ },
/* 100 */
/***/ function(module, exports) {

	"use strict";

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(81)('asyncIterator');

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(81)('observable');

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)

	var _keys = __webpack_require__(41);

	var _keys2 = _interopRequireDefault(_keys);

	var _symbol = __webpack_require__(71);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _assign = __webpack_require__(2);

	var _assign2 = _interopRequireDefault(_assign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var getKeys = __webpack_require__(40),
	    gOPS = __webpack_require__(84),
	    pIE = __webpack_require__(87),
	    toObject = __webpack_require__(44),
	    IObject = __webpack_require__(48),
	    $assign = _assign2.default;

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(16)(function () {
	  var A = {},
	      B = {},
	      S = (0, _symbol2.default)(),
	      K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) {
	    B[k] = k;
	  });
	  return $assign({}, A)[S] != 7 || (0, _keys2.default)($assign({}, B)).join('') != K;
	}) ? function assign(target, source) {
	  // eslint-disable-line no-unused-vars
	  var T = toObject(target),
	      aLen = arguments.length,
	      index = 1,
	      getSymbols = gOPS.f,
	      isEnum = pIE.f;
	  while (aLen > index) {
	    var S = IObject(arguments[index++]),
	        keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S),
	        length = keys.length,
	        j = 0,
	        key;
	    while (length > j) {
	      if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
	    }
	  }return T;
	} : $assign;

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var R = {
	  clone: __webpack_require__(105)
	};
	var Type = __webpack_require__(110);

	var def = function def(moduleDef) {
	  var mDef = R.clone(moduleDef);
	  mDef.name = mDef.hasOwnProperty('name') ? mDef.name : 'UnamedModule';
	  if (mDef.actions) {
	    mDef.Action = {};
	    mDef.update = {};
	    for (var actionName in mDef.actions) {
	      mDef.Action[actionName] = mDef.actions[actionName][0];
	      mDef.update[actionName] = mDef.actions[actionName][1];
	    }
	  }
	  mDef.Action = Type(mDef.Action);
	  mDef.update = mDef.Action.caseOn(mDef.update);
	  if (!mDef.inputs) {
	    mDef.inputs = {};
	  }
	  mDef.inputs._action = function (ctx, Action, name, data) {
	    return Action[name](data);
	  };
	  if (!mDef.outputNames) {
	    mDef.outputNames = [];
	  }
	  if (!mDef.load) {
	    mDef.load = function (ctx, Action) {
	      return {};
	    };
	  }
	  if (!mDef.loadAfter) {
	    mDef.loadAfter = function (ctx, i, Action, md) {
	      return md({});
	    };
	  }
	  mDef.mDef = moduleDef;
	  return mDef;
	};

	module.exports = {
	  def: def,
	  defineModule: def };

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _clone = __webpack_require__(106);
	var _curry1 = __webpack_require__(109);

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
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _cloneRegExp = __webpack_require__(107);
	var type = __webpack_require__(108);

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
/* 107 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function _cloneRegExp(pattern) {
	                                  return new RegExp(pattern.source, (pattern.global ? 'g' : '') + (pattern.ignoreCase ? 'i' : '') + (pattern.multiline ? 'm' : '') + (pattern.sticky ? 'y' : '') + (pattern.unicode ? 'u' : ''));
	};

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _curry1 = __webpack_require__(109);

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
/* 109 */
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
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof2 = __webpack_require__(19);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var curryN = __webpack_require__(111);

	function isString(s) {
	  return typeof s === 'string';
	}
	function isNumber(n) {
	  return typeof n === 'number';
	}
	function isObject(value) {
	  var type = typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value);
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
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _curry2 = __webpack_require__(112);
	var _curryN = __webpack_require__(114);
	var arity = __webpack_require__(115);

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
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _curry1 = __webpack_require__(113);

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
/* 113 */
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
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var arity = __webpack_require__(115);

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
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _curry2 = __webpack_require__(112);

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
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var R = {
	  pipe: __webpack_require__(117),
	  flip: __webpack_require__(132),
	  equals: __webpack_require__(136)
	};
	var flyd = __webpack_require__(142);
	var Type = __webpack_require__(110);

	var _require = __webpack_require__(149);

	var logAction = _require.logAction;
	var displayFromDiff = _require.displayFromDiff;
	var diff = _require.diff;

	var Helpers = __webpack_require__(151);
	// const e = require('./utils/exceptions') // DEPRECATED!!!
	var timetravel = __webpack_require__(160);

	// Attach architecture to the main module
	var run = function run(engineDef) {

	  var ctx = void 0,
	      model$ = void 0,
	      driverStreams = {},
	      module = void 0;
	  var middleUpdatesArr = [],
	      middleware = engineDef.middleware || {};

	  for (var key in middleware) {
	    middleUpdatesArr.push(middleware[key]);
	  }

	  // TODO: Document that middleware can slow programs
	  var middleUpdates = middleUpdatesArr.length == 0 ? function (m) {
	    return m;
	  } : R.pipe.apply(undefined, middleUpdatesArr);

	  var moduleDef = engineDef.timetravel ? timetravel(engineDef.root) : engineDef.root;

	  var attach = function attach(model) {
	    // model is used for webpack HMR

	    module = Helpers.createContext(moduleDef);
	    ctx = module.ctx;

	    model$ = flyd.scan(function (m, a) {
	      return middleUpdates(module.update(a, m));
	    }, middleUpdates(model ? model : module.init({ key: 'mainModule' })), ctx.action$); // state

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
	    flyd.on(function (task) {
	      if (engineDef.tasks[task[0]]) {
	        engineDef.tasks[task[0]].run(task[1]);
	      } else {
	        console.warn('There are no handler for ' + task[0] + ' task, sended by ' + task._modulePath + ' module');
	      }
	    }, ctx.task$);

	    // attach drivers to interfaces
	    for (var _driverName in engineDef.drivers) {
	      if (module.interfaces[_driverName]) {
	        // TODO: evaluate error handling, maybe an error$ stream
	        // driverStreams[driverName] =
	        //   flyd.map(model => e('driverExecution', {name: driverName, model}, () => module.interfaces[driverName](model)), model$)
	        driverStreams[_driverName] = flyd.map(module.interfaces[_driverName], model$);
	        if (model) {
	          engineDef.drivers[_driverName].reattach(driverStreams[_driverName]);
	        } else {
	          engineDef.drivers[_driverName].attach(driverStreams[_driverName]);
	        }
	      }
	    }
	  };

	  var dispose = function dispose() {
	    ctx.action$.end(true);
	    ctx.task$.end(true);
	    model$.end(true);
	    for (var driverName in driverStreams) {
	      driverStreams[driverName].end(true);
	      engineDef.drivers[driverName].dispose();
	    }
	  };

	  var reattach = function reattach(reModule) {
	    dispose();
	    // TODO: this can be optimized for hot realoading with a diff-patch algorithm
	    var newModel = R.equals(moduleDef.init({ key: 'mainModule' }), reModule.init({ key: 'mainModule' })) ? model$() : reModule.init({ key: 'mainModule' });
	    moduleDef = reModule;
	    attach(newModel);
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

	module.exports = {
	  run: run,
	  createEngine: run };

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _arity = __webpack_require__(118);
	var _pipe = __webpack_require__(119);
	var reduce = __webpack_require__(120);
	var tail = __webpack_require__(128);

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
/* 118 */
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
/* 119 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function _pipe(f, g) {
	  return function () {
	    return g.call(this, f.apply(this, arguments));
	  };
	};

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _curry3 = __webpack_require__(121);
	var _reduce = __webpack_require__(123);

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
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _curry1 = __webpack_require__(109);
	var _curry2 = __webpack_require__(122);

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
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _curry1 = __webpack_require__(109);

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
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _iterator = __webpack_require__(20);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(71);

	var _symbol2 = _interopRequireDefault(_symbol);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _xwrap = __webpack_require__(124);
	var bind = __webpack_require__(125);
	var isArrayLike = __webpack_require__(126);

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

	  var symIterator = typeof _symbol2.default !== 'undefined' ? _iterator2.default : '@@iterator';
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
/* 124 */
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
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _arity = __webpack_require__(118);
	var _curry2 = __webpack_require__(122);

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
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof2 = __webpack_require__(19);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _curry1 = __webpack_require__(109);
	var _isArray = __webpack_require__(127);

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
	  if ((typeof x === 'undefined' ? 'undefined' : (0, _typeof3.default)(x)) !== 'object') {
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
/* 127 */
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
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _checkForMethod = __webpack_require__(129);
	var slice = __webpack_require__(131);

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
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _isArray = __webpack_require__(127);
	var _slice = __webpack_require__(130);

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
/* 130 */
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
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _checkForMethod = __webpack_require__(129);
	var _curry3 = __webpack_require__(121);

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
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _curry1 = __webpack_require__(109);
	var _slice = __webpack_require__(130);
	var curry = __webpack_require__(133);

	/**
	 * Returns a new function much like the supplied one, except that the first two arguments'
	 * order is reversed.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category Function
	 * @sig (a -> b -> c -> ... -> z) -> (b -> a -> c -> ... -> z)
	 * @param {Function} fn The function to invoke with its first two parameters reversed.
	 * @return {*} The result of invoking `fn` with its first two parameters' order reversed.
	 * @example
	 *
	 *      var mergeThree = (a, b, c) => [].concat(a, b, c);
	 *
	 *      mergeThree(1, 2, 3); //=> [1, 2, 3]
	 *
	 *      R.flip(mergeThree)(1, 2, 3); //=> [2, 1, 3]
	 */
	module.exports = _curry1(function flip(fn) {
	  return curry(function (a, b) {
	    var args = _slice(arguments);
	    args[0] = b;
	    args[1] = a;
	    return fn.apply(this, args);
	  });
	});

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _curry1 = __webpack_require__(109);
	var curryN = __webpack_require__(134);

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
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _arity = __webpack_require__(118);
	var _curry1 = __webpack_require__(109);
	var _curry2 = __webpack_require__(122);
	var _curryN = __webpack_require__(135);

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
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _arity = __webpack_require__(118);

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
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _curry2 = __webpack_require__(122);
	var _equals = __webpack_require__(137);

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
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof2 = __webpack_require__(19);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _arrayFromIterator = __webpack_require__(138);
	var _has = __webpack_require__(139);
	var identical = __webpack_require__(140);
	var keys = __webpack_require__(141);
	var type = __webpack_require__(108);

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
	      if (!((typeof a === 'undefined' ? 'undefined' : (0, _typeof3.default)(a)) === (typeof b === 'undefined' ? 'undefined' : (0, _typeof3.default)(b)) && identical(a.valueOf(), b.valueOf()))) {
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
/* 138 */
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
/* 139 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function _has(prop, obj) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	};

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _curry2 = __webpack_require__(122);

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
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _keys = __webpack_require__(41);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _curry1 = __webpack_require__(109);
	var _has = __webpack_require__(139);

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

	  return typeof _keys2.default === 'function' ? _curry1(function keys(obj) {
	    return Object(obj) !== obj ? [] : (0, _keys2.default)(obj);
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
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var curryN = __webpack_require__(143);

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
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _arity = __webpack_require__(144);
	var _curry1 = __webpack_require__(145);
	var _curry2 = __webpack_require__(147);
	var _curryN = __webpack_require__(148);

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
/* 144 */
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
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _isPlaceholder = __webpack_require__(146);

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
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof2 = __webpack_require__(19);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = function _isPlaceholder(a) {
	       return a != null && (typeof a === 'undefined' ? 'undefined' : (0, _typeof3.default)(a)) === 'object' && a['@@functional/placeholder'] === true;
	};

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _curry1 = __webpack_require__(145);
	var _isPlaceholder = __webpack_require__(146);

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
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _arity = __webpack_require__(144);
	var _isPlaceholder = __webpack_require__(146);

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
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(150);

	var diff = _require.diff;


	var prettyAction = function prettyAction(action) {
	  var path = [],
	      nested = action;
	  while (nested[nested.length - 1] != undefined && nested[nested.length - 1].of != undefined) {
	    if (nested.length == 0) path.push(nested.name);else {
	      var name = '';
	      for (var i = 0; i < nested.length - 1; i++) {
	        name += nested[i] + ' ';
	      }
	      path.push(nested.name + ' ' + name);
	    }
	    nested = nested[nested.length - 1];
	  }
	  path.push(nested.name);
	  return path.join(' -> ') + ' : ' + (nested[0] ? nested[0] : 'none');
	};

	var prettyDiff = function prettyDiff(diffArray) {
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
	};

	var logAction = function logAction(action) {
	  return console.log('%c' + prettyAction(action), 'color: green');
	};

	var displayFromDiff = function displayFromDiff(diffArray) {
	  prettyDiff(diffArray).forEach(function (log) {
	    return console.log('%c' + log, 'color: darkblue');
	  });
	};

	module.exports = {
	  logAction: logAction,
	  displayFromDiff: displayFromDiff,
	  prettyDiff: prettyDiff,
	  prettyAction: prettyAction,
	  diff: diff
	};

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var _defineProperties = __webpack_require__(37);

	var _defineProperties2 = _interopRequireDefault(_defineProperties);

	var _keys = __webpack_require__(41);

	var _keys2 = _interopRequireDefault(_keys);

	var _create = __webpack_require__(33);

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = __webpack_require__(19);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	  } else if ((typeof exports === 'undefined' ? 'undefined' : (0, _typeof3.default)(exports)) === 'object') {
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
	  if ((typeof global === 'undefined' ? 'undefined' : (0, _typeof3.default)(global)) === 'object' && global) {
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
	    ctor.prototype = (0, _create2.default)(superCtor.prototype, {
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
	    var type = typeof subject === 'undefined' ? 'undefined' : (0, _typeof3.default)(subject);
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
	        } else if ((typeof prefilter === 'undefined' ? 'undefined' : (0, _typeof3.default)(prefilter)) === 'object') {
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

	    var ltype = typeof lhs === 'undefined' ? 'undefined' : (0, _typeof3.default)(lhs);
	    var rtype = typeof rhs === 'undefined' ? 'undefined' : (0, _typeof3.default)(rhs);
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
	          var akeys = (0, _keys2.default)(lhs);
	          var pkeys = (0, _keys2.default)(rhs);
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

	  (0, _defineProperties2.default)(accumulateDiff, {

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
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof2 = __webpack_require__(19);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _extends2 = __webpack_require__(1);

	var _extends3 = _interopRequireDefault(_extends2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var R = {
	  mapObjIndexed: __webpack_require__(152),
	  clone: __webpack_require__(105),
	  map: __webpack_require__(153),
	  merge: __webpack_require__(159),
	  curryN: __webpack_require__(134),
	  equals: __webpack_require__(136)
	};
	var flyd = __webpack_require__(142);

	var connectInterface = function connectInterface(md, name, model, connections) {
	  return md.interfaces[name] ? createContext(md, connections).interfaces[name](model) : {};
	};

	var mergeModels = function mergeModels(mds) {
	  var obj = {};
	  for (var key in mds) {
	    obj[key] = mds[key].root ? mds[key].root.init((0, _extends3.default)({ key: key }, mds[key])) : mds[key].init((0, _extends3.default)({ key: key }, mds[key]));
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
	  R.mapObjIndexed(function (model, idx) {
	    R.mapObjIndexed(function (obj, name) {
	      objs[scope + idx + '_' + name] = obj;
	    }, connectInterface(md, interfaceName, model, connections(+idx)));
	  }, childs);
	  return objs;
	};

	var mergeChild = function mergeChild(model, md, scope, interfaceName, connections) {
	  var objs = {};
	  R.mapObjIndexed(function (obj, name) {
	    objs[scope + '_' + name] = obj;
	  }, connectInterface(md, interfaceName, model, connections));
	  return objs;
	};

	// Composition for Fractal core, (mDefinition, connections = {}) -> ContextualizedModule
	var createContext = function createContext(mDefinition) {
	  var connections = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  var mDef = R.clone(mDefinition);
	  var ctx = {
	    action$: flyd.stream(),
	    task$: flyd.stream()
	  };
	  // append the outputs in the context
	  for (var idx in mDef.outputNames) {
	    ctx[mDef.outputNames[idx]] = flyd.stream();
	  }
	  // connect task$ by default

	  // append the outputs in the context
	  for (var _idx in connections) {
	    if (!!ctx[_idx]) flyd.on(connections[_idx], ctx[_idx]);
	  }
	  // contextualize inputs
	  var inputs = R.map(function (i) {
	    return R.curryN(i.length, function () {
	      // wrapper function for tasks
	      var tasks = i.apply(undefined, arguments);
	      if (tasks != undefined) {
	        if (tasks instanceof Array && tasks.of == undefined && !(typeof tasks[0] == 'string' && tasks[1] && (0, _typeof3.default)(tasks[1].of) == 'object')) {
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
	    })(ctx, mDef.Action);
	  }, mDef.inputs);
	  ctx._md = mDef.load(ctx, inputs, mDef.Action) || {};
	  // space for dynamic modules
	  ctx._dynamicMd = [];

	  // connect task$
	  connectTasks(ctx._md);

	  function addModulePath(task) {
	    task._modulePath = task.hasOwnProperty('_modulePath') ? task._modulePath + '->' + mDef.name : mDef.name;
	    return task;
	  }
	  function connectTasks(mds) {
	    for (var name in mds) {
	      if (mds[name].mDef) {
	        flyd.on(function (task) {
	          return ctx.task$(addModulePath(task));
	        }, mds[name].ctx.task$);
	      } else {
	        // connect categorized modules
	        for (var subName in mds[name]) {
	          flyd.on(function (task) {
	            return ctx.task$(addModulePath(task));
	          }, mds[name][subName].ctx.task$);
	        }
	      }
	    }
	  }

	  var md = function md(mds) {
	    // connect task$
	    connectTasks(mds);
	    ctx._md = R.merge(ctx._md, mds);
	  };
	  setTimeout(function () {
	    return mDef.loadAfter(ctx, inputs, mDef.Action, md);
	  }, 0);
	  // contextualize interfaces
	  mDef.interfaces = R.map(function (i) {
	    return R.curryN(3, i)(ctx)(inputs);
	  }, mDef.interfaces);
	  return (0, _extends3.default)({}, mDef, {
	    ctx: ctx,
	    inputs: inputs
	  });
	};

	// select a set of _md and map to a list of view interfaces
	var mergeChildList = function mergeChildList(ctx, rootModel, childNames) {
	  var f = arguments.length <= 3 || arguments[3] === undefined ? function (x) {
	    return x;
	  } : arguments[3];
	  return R.map(function (name) {
	    return f(ctx._md[name].interfaces.view(rootModel[name]));
	  }, childNames);
	};

	var mapObjToArray = function mapObjToArray(fn, obj) {
	  var arr = [];
	  for (var key in obj) {
	    arr.push(fn(obj[key], key));
	  }return arr;
	};
	// TODO: implement funtion that takes [list] -> ( (key, value) -> ({key, value}) ) -> {[key]: value}
	// Useful for optional styles

	var setDynamicMds = function setDynamicMds(ctxArray, ctx) {};

	module.exports = {
	  createContext: createContext,
	  mergeModels: mergeModels,
	  mergeChild: mergeChild,
	  mergeChilds: mergeChilds,
	  mergeChildList: mergeChildList,
	  connectInterface: connectInterface,
	  mapObjToArray: mapObjToArray,
	  setDynamicMds: setDynamicMds
	};

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _curry2 = __webpack_require__(122);
	var _reduce = __webpack_require__(123);
	var keys = __webpack_require__(141);

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
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _curry2 = __webpack_require__(122);
	var _dispatchable = __webpack_require__(154);
	var _map = __webpack_require__(156);
	var _reduce = __webpack_require__(123);
	var _xmap = __webpack_require__(157);
	var curryN = __webpack_require__(134);
	var keys = __webpack_require__(141);

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
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _isArray = __webpack_require__(127);
	var _isTransformer = __webpack_require__(155);
	var _slice = __webpack_require__(130);

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
/* 155 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function _isTransformer(obj) {
	  return typeof obj['@@transducer/step'] === 'function';
	};

/***/ },
/* 156 */
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
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _curry2 = __webpack_require__(122);
	var _xfBase = __webpack_require__(158);

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
/* 158 */
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
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _curry2 = __webpack_require__(122);
	var keys = __webpack_require__(141);

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
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends2 = __webpack_require__(1);

	var _extends3 = _interopRequireDefault(_extends2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var R = {
	  T: __webpack_require__(161),
	  evolve: __webpack_require__(163),
	  not: __webpack_require__(164),
	  always: __webpack_require__(162),
	  F: __webpack_require__(165),
	  inc: __webpack_require__(166),
	  ifElse: __webpack_require__(168),
	  update: __webpack_require__(169),
	  append: __webpack_require__(172),
	  mapObjIndexed: __webpack_require__(152)
	};
	var h = __webpack_require__(173);
	var F = (0, _extends3.default)({}, __webpack_require__(104), __webpack_require__(151));

	var _require = __webpack_require__(149);

	var logAction = _require.logAction;
	var displayFromDiff = _require.displayFromDiff;
	var diff = _require.diff;


	var timetravel = function timetravel(child) {
	  var log = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];


	  return F.def({
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
	        child: F.createContext(child, { action$: m.active ? i.childAction : function (a) {
	            if (log) {
	              logAction(a);
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
	      SetActive: function SetActive(bool, m) {
	        return R.evolve({ active: R.always(bool) }, m);
	      },
	      SetTime: function SetTime(time, m) {
	        var validTime = time;
	        if (time >= m.history.length) validTime = m.history.length - 1;else if (time < 0) validTime = 0;
	        var nextState = m.history[validTime].state;
	        if (log) {
	          displayFromDiff(diff(m.state, nextState));
	          console.log(nextState);
	        }
	        return R.evolve({
	          active: R.F,
	          state: R.always(nextState),
	          time: R.always(validTime)
	        }, m);
	      },
	      ClearHistory: function ClearHistory(m) {
	        var step = R.evolve({ timestamp: R.always(new Date().getTime()) }, m.history[m.time]);
	        return R.evolve({
	          time: R.always(0),
	          state: R.always(step.state),
	          history: R.always([step])
	        }, m);
	      },
	      ChildAction: function ChildAction(action, m) {
	        var evolveFn = R.evolve({
	          state: child.update(action),
	          timestamp: R.always(new Date().getTime())
	        }, m.history[m.time]);
	        if (log) {
	          logAction(action);
	          displayFromDiff(diff(m.state, evolveFn.state));
	          console.log(evolveFn.state);
	        }
	        var newModel = R.evolve({
	          time: R.inc,
	          state: R.always(evolveFn.state),
	          history: R.ifElse(function (h) {
	            return !!h[m.time + 1];
	          }, // exist that registry in history?
	          R.update(m.time + 1, evolveFn), // rescribe history
	          R.append(evolveFn) // create history
	          )
	        }, m);
	        if (newModel.history.length == 2) {
	          // casse for large time witout an update
	          newModel.history[0].timestamp = newModel.history[1].timestamp;
	        }
	        return newModel;
	      },

	      Play: function Play(playing, m) {
	        if (playing) {
	          if (m.time != m.history.length - 1) return R.evolve({
	            active: R.F,
	            playing: R.T,
	            frameTime: R.always(m.history[m.time + 1].timestamp - m.history[m.time].timestamp)
	          }, m);else return R.evolve({
	            active: R.F,
	            playing: R.F
	          }, m);
	        } else {
	          return R.evolve({
	            active: R.F,
	            playing: R.F
	          }, m);
	        }
	      },
	      Frame: function Frame(m) {
	        if (m.time != m.history.length - 1) {
	          var frameTime = m.time < m.history.length - 2 ? R.always(m.history[m.time + 2].timestamp - m.history[m.time + 1].timestamp) : R.always(0);
	          var nextState = m.history[m.time + 1].state;
	          if (log) {
	            displayFromDiff(diff(m.state, nextState));
	            console.log(nextState);
	          }
	          return R.evolve({
	            active: R.F,
	            time: R.inc,
	            playing: frameTime >= 0,
	            state: R.always(nextState),
	            frameTime: frameTime
	          }, m);
	        } else return R.evolve({
	          active: R.F,
	          playing: R.F
	        }, m);
	      }
	    },
	    interfaces: {
	      view: function view(ctx, i, m) {
	        // inputs, outputs and model
	        return h('div', { style: {
	            width: '100%',
	            height: '100%',
	            overflow: 'auto'
	          } }, [ctx._md.child.interfaces.view(m.history[m.time].state), h('button', {
	          style: styles.toggleButton,
	          on: { click: i.toggleTimeTravel }
	        }, 'tt'), h('footer', { style: (0, _extends3.default)({}, styles.base, { display: m.opened ? 'flex' : 'none' }) }, [h('div', { style: styles.controls }, [h('button', { style: styles.button, on: { click: function click() {
	              return i.setTime(m.time - 1);
	            } } }, 'Back'), h('button', { style: styles.button, on: { click: function click() {
	              return i.setTime(m.time + 1);
	            } } }, 'Forward'), h('button', { style: styles.button, on: { click: function click() {
	              return i.setActive(!m.active);
	            } } }, m.active ? 'Pause' : 'Unpause'), h('button', { style: styles.button, on: { click: function click() {
	              return i.clearHistory(undefined);
	            } } }, 'Clear history'), h('button', { style: styles.button, on: { click: function click() {
	              return i.play(!m.playing);
	            } } }, m.playing ? 'Pause replay' : 'Replay'), h('span', { style: styles.time }, m.time)]), h('input', {
	          style: styles.slider,
	          props: { type: 'range', max: m.history.length - 1, min: 0, value: m.time },
	          on: {
	            input: function input(ev) {
	              return i.setTime(parseInt(ev.target.value));
	            }
	          }
	        })])]);
	      },
	      // TODO: update this interface mergers
	      time: function time(ctx, i, m) {
	        return (0, _extends3.default)({
	          timer: {
	            periodic: false,
	            active: m.playing,
	            time: m.frameTime,
	            on: i.frame
	          }
	        }, function () {
	          // mergin child interfaces
	          var timers = {};
	          if (child.interfaces.time) {
	            R.mapObjIndexed(function (obj, name) {
	              timers['child' + name] = obj;
	              if (!m.active) timers['child' + name].active = false;
	            }, ctx._md.child.interfaces.time(m.history[m.time].state));
	          }
	          return timers;
	        }());
	      },
	      fetch: function fetch(ctx, i, m) {
	        return (0, _extends3.default)({}, function () {
	          // mergin child interfaces
	          var fetches = {};
	          if (child.interfaces.fetch) {
	            R.mapObjIndexed(function (obj, name) {
	              fetches['child' + name] = obj;
	              if (!m.active) fetches['child' + name].active = false;
	            }, ctx._md.child.interfaces.fetch(m.history[m.time].state));
	          }
	          return fetches;
	        }());
	      }
	    }

	  });
	};

	module.exports = timetravel;

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
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var always = __webpack_require__(162);

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
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _curry1 = __webpack_require__(109);

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
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof2 = __webpack_require__(19);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _curry2 = __webpack_require__(122);

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
	    type = typeof transformation === 'undefined' ? 'undefined' : (0, _typeof3.default)(transformation);
	    result[key] = type === 'function' ? transformation(object[key]) : type === 'object' ? evolve(transformations[key], object[key]) : object[key];
	  }
	  return result;
	});

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _curry1 = __webpack_require__(109);

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
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var always = __webpack_require__(162);

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
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var add = __webpack_require__(167);

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
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _curry2 = __webpack_require__(122);

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
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _curry3 = __webpack_require__(121);
	var curryN = __webpack_require__(134);

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
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _curry3 = __webpack_require__(121);
	var adjust = __webpack_require__(170);
	var always = __webpack_require__(162);

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
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _concat = __webpack_require__(171);
	var _curry3 = __webpack_require__(121);

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
/* 171 */
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
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _concat = __webpack_require__(171);
	var _curry2 = __webpack_require__(122);

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
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var VNode = __webpack_require__(174);
	var is = __webpack_require__(175);

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
/* 174 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (sel, data, children, text, elm) {
	  var key = data === undefined ? undefined : data.key;
	  return { sel: sel, data: data, children: children,
	    text: text, elm: elm, key: key };
	};

/***/ },
/* 175 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  array: Array.isArray,
	  primitive: function primitive(s) {
	    return typeof s === 'string' || typeof s === 'number';
	  }
	};

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends2 = __webpack_require__(1);

	var _extends3 = _interopRequireDefault(_extends2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*const R = require('ramda')
	const h = require('snabbdom/h')*/
	var F = (0, _extends3.default)({}, __webpack_require__(104), __webpack_require__(151));

	var _require = __webpack_require__(149);

	var logAction = _require.logAction;
	var displayFromDiff = _require.displayFromDiff;
	var diff = _require.diff;

	// TODO a more elegant form of do that?

	var log = function log(child) {

	  // merge child interfaces
	  var interfaces = {};

	  var _loop = function _loop(name) {
	    interfaces[name] = function (ctx, i, m) {
	      return ctx._md.child.interfaces[name](m);
	    };
	  };

	  for (var name in child.interfaces) {
	    _loop(name);
	  }

	  return F.def({
	    name: child.name,
	    init: child.init,
	    inputs: (0, _extends3.default)({
	      childActionLOGER1234: function childActionLOGER1234(ctx, Action, action) {
	        return Action.ChildActionLOGER1234(action);
	      }
	    }, child.mDef.inputs),
	    outputNames: child.outputNames,
	    load: function load(ctx, i, Action) {
	      var connections = {};
	      child.outputNames.forEach(function (conn) {
	        return connections[conn] = ctx[conn];
	      });
	      return {
	        child: F.createContext(child, (0, _extends3.default)({
	          action$: i.childActionLOGER1234
	        }, connections))
	      };
	    },
	    loadAfter: child.mDef.loadAfter,
	    Action: (0, _extends3.default)({
	      ChildActionLOGER1234: [Array]
	    }, child.mDef.Action),
	    update: (0, _extends3.default)({}, child.mDef.update, {
	      ChildActionLOGER1234: function ChildActionLOGER1234(action, m) {
	        var newModel = child.update(action, m);
	        logAction(action);
	        displayFromDiff(diff(m, newModel));
	        console.log(newModel);
	        return newModel;
	      }

	    }),
	    interfaces: interfaces
	  });
	};

	module.exports = log;

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends2 = __webpack_require__(1);

	var _extends3 = _interopRequireDefault(_extends2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var children = function children(ctx, m) {
	  return ctx._md.childModules && ctx._md.childModules[m.childName] ? ctx._md.childModules[m.childName].interfaces.view(m.childStates[m.childName]) : '';
	};

	module.exports = (0, _extends3.default)({
	  def: __webpack_require__(178),
	  children: children,
	  driver: __webpack_require__(194)
	}, __webpack_require__(195));

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _defineProperty2 = __webpack_require__(179);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _extends2 = __webpack_require__(1);

	var _extends3 = _interopRequireDefault(_extends2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// fractal-router based on react-router (https://github.com/reactjs/react-router/blob/master/docs/Introduction.md)
	var F = (0, _extends3.default)({}, __webpack_require__(104), __webpack_require__(151));
	var R = {
	  mapObjIndexed: __webpack_require__(152),
	  evolve: __webpack_require__(163),
	  always: __webpack_require__(162)
	};
	var addressbar = __webpack_require__(180);
	var urlMapper = __webpack_require__(186);

	// TODO: inyeccion de datos con router, esto seria genial: modelo -> router -> app , elimina los globales!!!

	function route(_ref) {
	  var path = _ref.path;
	  var module = _ref.module;
	  var props = _ref.props;
	  var childRoutes = _ref.childRoutes;

	  var urlPath = '';
	  var childs = {};

	  for (var i = 0, childRoute, moduleTemp; childRoute = childRoutes[i]; i++) {
	    childs[childRoute.path] = childRoute.module;
	  }

	  var routerDef = F.def({
	    init: function init(_ref2) {
	      var key = _ref2.key;
	      return (0, _extends3.default)({
	        childName: '/',
	        childStates: R.mapObjIndexed(function (child, name) {
	          return child.init({ key: name });
	        }, childs)
	      }, module.init({ key: key }));
	    },
	    inputs: (0, _extends3.default)({
	      changeChild: function changeChild(ctx, Action, name) {
	        return Action.ChangeChild(name);
	      },
	      childAction: function childAction(ctx, Action, name, a) {
	        return Action.ChildAction(name, a);
	      }
	    }, module.inputs),
	    load: function load(ctx, i, Action) {
	      return (0, _extends3.default)({
	        childModules: R.mapObjIndexed(function (child, name) {
	          return F.createContext(child, { action$: i.childAction(name) });
	        }, childs)
	      }, module.load(ctx, i, Action));
	    },
	    actions: (0, _extends3.default)({
	      ChangeChild: [[String], function (name, m) {
	        return R.evolve({ childName: R.always(name) }, m);
	      }],
	      ChildAction: [[String, Array], function (name, a, m) {
	        return R.evolve({ childStates: R.evolve((0, _defineProperty3.default)({}, name, childs[name].update(a))) }, m);
	      }]
	    }, module.actions),
	    interfaces: {
	      view: function view(ctx, i, m) {
	        return module.interfaces.view(ctx, i, m);
	      },
	      router: function router(ctx, i, m) {
	        return {
	          routeChange: function routeChange(path) {
	            i.changeChild(path);
	          }
	        };
	      }
	    }
	  });
	  return routerDef;
	}

	module.exports = route;

	// let matchedRoute = urlMapper.map(path, {
	//   '/foo/:id': 1,
	//   '/test/:id': 2,
	//   '*': 3,
	// })
	// console.log(matchedRoute)

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(12);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	exports.default = function (obj, key, value) {
	  if (key in obj) {
	    (0, _defineProperty2.default)(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	};

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	/* global history */

	var URL = __webpack_require__(181);
	var EventEmitter = __webpack_require__(185).EventEmitter;
	var instance = null;

	// Check if IE history polyfill is added
	var location = window.history.location || window.location;

	module.exports = function () {
	  if (instance) {
	    return instance;
	  }

	  var eventEmitter = new EventEmitter();

	  eventEmitter.addEventListener = eventEmitter.addListener;
	  eventEmitter.removeEventListener = eventEmitter.removeListener;

	  var initialUrl = location.href;
	  var uri = URL(initialUrl);
	  var origin = uri.protocol + '//' + uri.host;
	  var isPreventingDefault = false;
	  var doReplace = false;
	  var prevUrl = '';
	  // var linkClicked = false
	  var isEmitting = false;
	  var setSyncUrl = false;

	  var emitChange = function emitChange(url, event) {
	    eventEmitter.emit('change', {
	      preventDefault: function preventDefault() {
	        event && event.preventDefault();
	        isPreventingDefault = true;
	      },
	      target: {
	        value: url ? origin + url : location.href
	      }
	    });
	  };

	  var onUrlChange = function onUrlChange(type) {
	    return function (event) {
	      if (location.href === prevUrl) {
	        return;
	      }

	      // Fixes bug where trailing slash is converted to normal url
	      if (location.href[location.href.length - 1] === '/') {
	        doReplace = true;
	      }

	      isEmitting = true;
	      emitChange();
	      isEmitting = false;

	      if (!setSyncUrl && isPreventingDefault) {
	        history.replaceState({}, '', (prevUrl || initialUrl).replace(origin, ''));
	      }

	      prevUrl = location.href;
	      isPreventingDefault = false;
	      setSyncUrl = false;
	      doReplace = false;
	    };
	  };

	  // this hack resolves issue with safari
	  // see issue from Page JS for reference https://github.com/visionmedia/page.js/issues/213
	  // see also https://github.com/visionmedia/page.js/pull/240
	  if (document.readyState !== 'complete') {
	    // load event has not fired
	    global.addEventListener('load', function () {
	      setTimeout(function () {
	        global.addEventListener('popstate', onUrlChange('pop'), false);
	      }, 0);
	    }, false);
	  } else {
	    // load event has fired
	    global.addEventListener('popstate', onUrlChange('pop'), false);
	  }

	  Object.defineProperty(eventEmitter, 'value', {
	    get: function get() {
	      return location.href;
	    },
	    set: function set(value) {
	      if (typeof value !== 'string') {
	        doReplace = Boolean(value.replace);
	        value = value.value;
	      }

	      // If emitting a change we flag that we are setting
	      // a url based on the event being emitted
	      if (isEmitting) {
	        setSyncUrl = true;
	      }

	      // Ensure full url
	      if (value.indexOf(origin) === -1) {
	        value = origin + value;
	      }

	      // If it is same url, forget about it
	      if (value === location.href) {
	        return;
	      }

	      // We might need to replace the url if we are fixing
	      // for example trailing slash issue
	      if (doReplace) {
	        history.replaceState({}, '', value.replace(origin, ''));
	        doReplace = false;
	      } else {
	        history.pushState({}, '', value.replace(origin, ''));
	      }

	      prevUrl = location.href;
	      isPreventingDefault = false;
	    }
	  });

	  // expose URLUtils like API https://developer.mozilla.org/en-US/docs/Web/API/URLUtils
	  // thanks https://github.com/cofounders/urlutils for reference
	  Object.defineProperty(eventEmitter, 'origin', {
	    get: function get() {
	      var uri = URL(location.href);
	      return uri.protocol + '//' + uri.host;
	    }
	  });

	  Object.defineProperty(eventEmitter, 'protocol', {
	    get: function get() {
	      return URL(location.href).protocol;
	    }
	  });

	  Object.defineProperty(eventEmitter, 'port', {
	    get: function get() {
	      return URL(location.href).port;
	    }
	  });

	  Object.defineProperty(eventEmitter, 'hostname', {
	    get: function get() {
	      return URL(location.href).hostname;
	    }
	  });

	  Object.defineProperty(eventEmitter, 'pathname', {
	    get: function get() {
	      return URL(location.href).pathname;
	    }
	  });

	  Object.defineProperty(eventEmitter, 'hash', {
	    get: function get() {
	      return URL(location.href).hash;
	    }
	  });

	  /*
	    This code is from the Page JS source code. Amazing work on handling all
	    kinds of scenarios with hyperlinks, thanks!
	  */

	  var isSameOrigin = function isSameOrigin(href) {
	    return href && href.indexOf(origin) === 0;
	  };

	  var getClickedHref = function getClickedHref(event) {
	    // check which button
	    if ((event.which === null ? event.button : event.which) !== 1) {
	      return false;
	    }

	    // check for modifiers
	    if (event.metaKey || event.ctrlKey || event.shiftKey) {
	      return false;
	    }
	    if (event.defaultPrevented) {
	      return false;
	    }

	    // ensure link
	    var element = event.target;
	    while (element && element.nodeName !== 'A') {
	      element = element.parentNode;
	    }
	    if (!element || element.nodeName !== 'A') {
	      return false;
	    }

	    // Ignore if tag has
	    // 1. "download" attribute
	    // 2. rel="external" attribute
	    if (element.hasAttribute('download') || element.getAttribute('rel') === 'external') {
	      return false;
	    }

	    // Check for mailto: in the href
	    var href = element.getAttribute('href');
	    if (href && href.indexOf('mailto:') > -1) {
	      return false;
	    }

	    // check target
	    if (element.target) {
	      return false;
	    }

	    // x-origin
	    if (!isSameOrigin(element.href)) {
	      return false;
	    }

	    return href;
	  };

	  global.addEventListener(document.ontouchstart ? 'touchstart' : 'click', function (event) {
	    var href = getClickedHref(event);
	    if (href) {
	      // linkClicked = true
	      isEmitting = true;
	      emitChange(href, event);
	      isEmitting = false;
	      if (isPreventingDefault) {
	        // linkClicked = false
	      }
	      prevUrl = href;
	      isPreventingDefault = false;
	    }
	  });

	  instance = eventEmitter;

	  return eventEmitter;
	}();
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof2 = __webpack_require__(19);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var required = __webpack_require__(182),
	    lolcation = __webpack_require__(183),
	    qs = __webpack_require__(184),
	    relativere = /^\/(?!\/)/,
	    protocolre = /^([a-z0-9.+-]+:)?(\/\/)?(.*)$/i; // actual protocol is first match

	/**
	 * These are the parse instructions for the URL parsers, it informs the parser
	 * about:
	 *
	 * 0. The char it Needs to parse, if it's a string it should be done using
	 *    indexOf, RegExp using exec and NaN means set as current value.
	 * 1. The property we should set when parsing this value.
	 * 2. Indication if it's backwards or forward parsing, when set as number it's
	 *    the value of extra chars that should be split off.
	 * 3. Inherit from location if non existing in the parser.
	 * 4. `toLowerCase` the resulting value.
	 */
	var instructions = [['#', 'hash'], // Extract from the back.
	['?', 'query'], // Extract from the back.
	['/', 'pathname'], // Extract from the back.
	['@', 'auth', 1], // Extract from the front.
	[NaN, 'host', undefined, 1, 1], // Set left over value.
	[/\:(\d+)$/, 'port'], // RegExp the back.
	[NaN, 'hostname', undefined, 1, 1] // Set left over.
	];

	/**
	* @typedef ProtocolExtract
	* @type Object
	* @property {String} protocol Protocol matched in the URL, in lowercase
	* @property {Boolean} slashes Indicates whether the protocol is followed by double slash ("//")
	* @property {String} rest     Rest of the URL that is not part of the protocol
	*/

	/**
	 * Extract protocol information from a URL with/without double slash ("//")
	 *
	 * @param  {String} address   URL we want to extract from.
	 * @return {ProtocolExtract}  Extracted information
	 * @private
	 */
	function extractProtocol(address) {
	  var match = protocolre.exec(address);
	  return {
	    protocol: match[1] ? match[1].toLowerCase() : '',
	    slashes: !!match[2],
	    rest: match[3] ? match[3] : ''
	  };
	}

	/**
	 * The actual URL instance. Instead of returning an object we've opted-in to
	 * create an actual constructor as it's much more memory efficient and
	 * faster and it pleases my CDO.
	 *
	 * @constructor
	 * @param {String} address URL we want to parse.
	 * @param {Object|String} location Location defaults for relative paths.
	 * @param {Boolean|Function} parser Parser for the query string.
	 * @api public
	 */
	function URL(address, location, parser) {
	  if (!(this instanceof URL)) {
	    return new URL(address, location, parser);
	  }

	  var relative = relativere.test(address),
	      parse,
	      instruction,
	      index,
	      key,
	      type = typeof location === 'undefined' ? 'undefined' : (0, _typeof3.default)(location),
	      url = this,
	      i = 0;

	  //
	  // The following if statements allows this module two have compatibility with
	  // 2 different API:
	  //
	  // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
	  //    where the boolean indicates that the query string should also be parsed.
	  //
	  // 2. The `URL` interface of the browser which accepts a URL, object as
	  //    arguments. The supplied object will be used as default values / fall-back
	  //    for relative paths.
	  //
	  if ('object' !== type && 'string' !== type) {
	    parser = location;
	    location = null;
	  }

	  if (parser && 'function' !== typeof parser) {
	    parser = qs.parse;
	  }

	  location = lolcation(location);

	  // extract protocol information before running the instructions
	  var extracted = extractProtocol(address);
	  url.protocol = extracted.protocol || location.protocol || '';
	  url.slashes = extracted.slashes || location.slashes;
	  address = extracted.rest;

	  for (; i < instructions.length; i++) {
	    instruction = instructions[i];
	    parse = instruction[0];
	    key = instruction[1];

	    if (parse !== parse) {
	      url[key] = address;
	    } else if ('string' === typeof parse) {
	      if (~(index = address.indexOf(parse))) {
	        if ('number' === typeof instruction[2]) {
	          url[key] = address.slice(0, index);
	          address = address.slice(index + instruction[2]);
	        } else {
	          url[key] = address.slice(index);
	          address = address.slice(0, index);
	        }
	      }
	    } else if (index = parse.exec(address)) {
	      url[key] = index[1];
	      address = address.slice(0, address.length - index[0].length);
	    }

	    url[key] = url[key] || (instruction[3] || 'port' === key && relative ? location[key] || '' : '');

	    //
	    // Hostname, host and protocol should be lowercased so they can be used to
	    // create a proper `origin`.
	    //
	    if (instruction[4]) {
	      url[key] = url[key].toLowerCase();
	    }
	  }

	  //
	  // Also parse the supplied query string in to an object. If we're supplied
	  // with a custom parser as function use that instead of the default build-in
	  // parser.
	  //
	  if (parser) url.query = parser(url.query);

	  //
	  // We should not add port numbers if they are already the default port number
	  // for a given protocol. As the host also contains the port number we're going
	  // override it with the hostname which contains no port number.
	  //
	  if (!required(url.port, url.protocol)) {
	    url.host = url.hostname;
	    url.port = '';
	  }

	  //
	  // Parse down the `auth` for the username and password.
	  //
	  url.username = url.password = '';
	  if (url.auth) {
	    instruction = url.auth.split(':');
	    url.username = instruction[0] || '';
	    url.password = instruction[1] || '';
	  }

	  //
	  // The href is just the compiled result.
	  //
	  url.href = url.toString();
	}

	/**
	 * This is convenience method for changing properties in the URL instance to
	 * insure that they all propagate correctly.
	 *
	 * @param {String} prop          Property we need to adjust.
	 * @param {Mixed} value          The newly assigned value.
	 * @param {Boolean|Function} fn  When setting the query, it will be the function used to parse
	 *                               the query.
	 *                               When setting the protocol, double slash will be removed from
	 *                               the final url if it is true.
	 * @returns {URL}
	 * @api public
	 */
	URL.prototype.set = function set(part, value, fn) {
	  var url = this;

	  if ('query' === part) {
	    if ('string' === typeof value && value.length) {
	      value = (fn || qs.parse)(value);
	    }

	    url[part] = value;
	  } else if ('port' === part) {
	    url[part] = value;

	    if (!required(value, url.protocol)) {
	      url.host = url.hostname;
	      url[part] = '';
	    } else if (value) {
	      url.host = url.hostname + ':' + value;
	    }
	  } else if ('hostname' === part) {
	    url[part] = value;

	    if (url.port) value += ':' + url.port;
	    url.host = value;
	  } else if ('host' === part) {
	    url[part] = value;

	    if (/\:\d+/.test(value)) {
	      value = value.split(':');
	      url.hostname = value[0];
	      url.port = value[1];
	    }
	  } else if ('protocol' === part) {
	    url.protocol = value;
	    url.slashes = !fn;
	  } else {
	    url[part] = value;
	  }

	  url.href = url.toString();
	  return url;
	};

	/**
	 * Transform the properties back in to a valid and full URL string.
	 *
	 * @param {Function} stringify Optional query stringify function.
	 * @returns {String}
	 * @api public
	 */
	URL.prototype.toString = function toString(stringify) {
	  if (!stringify || 'function' !== typeof stringify) stringify = qs.stringify;

	  var query,
	      url = this,
	      protocol = url.protocol;

	  if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';

	  var result = protocol + (url.slashes ? '//' : '');

	  if (url.username) {
	    result += url.username;
	    if (url.password) result += ':' + url.password;
	    result += '@';
	  }

	  result += url.hostname;
	  if (url.port) result += ':' + url.port;

	  result += url.pathname;

	  query = 'object' === (0, _typeof3.default)(url.query) ? stringify(url.query) : url.query;
	  if (query) result += '?' !== query.charAt(0) ? '?' + query : query;

	  if (url.hash) result += url.hash;

	  return result;
	};

	//
	// Expose the URL parser and some additional properties that might be useful for
	// others.
	//
	URL.qs = qs;
	URL.location = lolcation;
	module.exports = URL;

/***/ },
/* 182 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Check if we're required to add a port number.
	 *
	 * @see https://url.spec.whatwg.org/#default-port
	 * @param {Number|String} port Port number we need to check
	 * @param {String} protocol Protocol we need to check against.
	 * @returns {Boolean} Is it a default port for the given protocol
	 * @api private
	 */

	module.exports = function required(port, protocol) {
	  protocol = protocol.split(':')[0];
	  port = +port;

	  if (!port) return false;

	  switch (protocol) {
	    case 'http':
	    case 'ws':
	      return port !== 80;

	    case 'https':
	    case 'wss':
	      return port !== 443;

	    case 'ftp':
	      return port !== 21;

	    case 'gopher':
	      return port !== 70;

	    case 'file':
	      return false;
	  }

	  return port !== 0;
	};

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var _typeof2 = __webpack_require__(19);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;

	/**
	 * These properties should not be copied or inherited from. This is only needed
	 * for all non blob URL's as a blob URL does not include a hash, only the
	 * origin.
	 *
	 * @type {Object}
	 * @private
	 */
	var ignore = { hash: 1, query: 1 },
	    URL;

	/**
	 * The location object differs when your code is loaded through a normal page,
	 * Worker or through a worker using a blob. And with the blobble begins the
	 * trouble as the location object will contain the URL of the blob, not the
	 * location of the page where our code is loaded in. The actual origin is
	 * encoded in the `pathname` so we can thankfully generate a good "default"
	 * location from it so we can generate proper relative URL's again.
	 *
	 * @param {Object|String} loc Optional default location object.
	 * @returns {Object} lolcation object.
	 * @api public
	 */
	module.exports = function lolcation(loc) {
	  loc = loc || global.location || {};
	  URL = URL || __webpack_require__(181);

	  var finaldestination = {},
	      type = typeof loc === 'undefined' ? 'undefined' : (0, _typeof3.default)(loc),
	      key;

	  if ('blob:' === loc.protocol) {
	    finaldestination = new URL(unescape(loc.pathname), {});
	  } else if ('string' === type) {
	    finaldestination = new URL(loc, {});
	    for (key in ignore) {
	      delete finaldestination[key];
	    }
	  } else if ('object' === type) {
	    for (key in loc) {
	      if (key in ignore) continue;
	      finaldestination[key] = loc[key];
	    }

	    if (finaldestination.slashes === undefined) {
	      finaldestination.slashes = slashes.test(loc.href);
	    }
	  }

	  return finaldestination;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 184 */
/***/ function(module, exports) {

	'use strict';

	var has = Object.prototype.hasOwnProperty;

	/**
	 * Simple query string parser.
	 *
	 * @param {String} query The query string that needs to be parsed.
	 * @returns {Object}
	 * @api public
	 */
	function querystring(query) {
	  var parser = /([^=?&]+)=([^&]*)/g,
	      result = {},
	      part;

	  //
	  // Little nifty parsing hack, leverage the fact that RegExp.exec increments
	  // the lastIndex property so we can continue executing this loop until we've
	  // parsed all results.
	  //
	  for (; part = parser.exec(query); result[decodeURIComponent(part[1])] = decodeURIComponent(part[2])) {}

	  return result;
	}

	/**
	 * Transform a query string to an object.
	 *
	 * @param {Object} obj Object that should be transformed.
	 * @param {String} prefix Optional prefix.
	 * @returns {String}
	 * @api public
	 */
	function querystringify(obj, prefix) {
	  prefix = prefix || '';

	  var pairs = [];

	  //
	  // Optionally prefix with a '?' if needed
	  //
	  if ('string' !== typeof prefix) prefix = '?';

	  for (var key in obj) {
	    if (has.call(obj, key)) {
	      pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
	    }
	  }

	  return pairs.length ? prefix + pairs.join('&') : '';
	}

	//
	// Expose the module.
	//
	exports.stringify = querystringify;
	exports.parse = querystring;

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof2 = __webpack_require__(19);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function (n) {
	  if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function (type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events) this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler)) return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++) {
	      listeners[i].apply(this, args);
	    }
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function (type, listener) {
	  var m;

	  if (!isFunction(listener)) throw TypeError('listener must be a function');

	  if (!this._events) this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener) this.emit('newListener', type, isFunction(listener.listener) ? listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.', this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function (type, listener) {
	  if (!isFunction(listener)) throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function (type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener)) throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type]) return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener || isFunction(list.listener) && list.listener === listener) {
	    delete this._events[type];
	    if (this._events.removeListener) this.emit('removeListener', type, listener);
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener || list[i].listener && list[i].listener === listener) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0) return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener) this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function (type) {
	  var key, listeners;

	  if (!this._events) return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0) this._events = {};else if (this._events[type]) delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length) {
	      this.removeListener(type, listeners[listeners.length - 1]);
	    }
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function (type) {
	  var ret;
	  if (!this._events || !this._events[type]) ret = [];else if (isFunction(this._events[type])) ret = [this._events[type]];else ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.prototype.listenerCount = function (type) {
	  if (this._events) {
	    var evlistener = this._events[type];

	    if (isFunction(evlistener)) return 1;else if (evlistener) return evlistener.length;
	  }
	  return 0;
	};

	EventEmitter.listenerCount = function (emitter, type) {
	  return emitter.listenerCount(type);
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return (typeof arg === 'undefined' ? 'undefined' : (0, _typeof3.default)(arg)) === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var mapper = __webpack_require__(187);
	var compileRoute = __webpack_require__(188);

	module.exports = function urlMapper(options) {
	  return mapper(compileRoute, options);
	};

/***/ },
/* 187 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function mapper(compileFn, options) {
	  if (typeof compileFn !== 'function') throw new Error('URL Mapper - function to compile a route expected as first argument');

	  options = options || {};
	  var cache = {};

	  function getCompiledRoute(route) {
	    if (!cache[route]) {
	      cache[route] = compileFn(route, options);
	    }

	    return cache[route];
	  }

	  function parse(route, url) {
	    if (arguments.length < 2) throw new Error('URL Mapper - parse method expects 2 arguments');
	    return getCompiledRoute(route).parse(url);
	  }

	  function stringify(route, values) {
	    if (arguments.length < 2) throw new Error('URL Mapper - stringify method expects 2 arguments');
	    return getCompiledRoute(route).stringify(values);
	  }

	  function map(url, routes) {
	    if (arguments.length < 2) throw new Error('URL Mapper - map method expects 2 arguments');
	    for (var route in routes) {
	      var compiled = getCompiledRoute(route);
	      var values = compiled.parse(url);
	      if (values) {
	        var match = routes[route];

	        return {
	          route: route,
	          match: match,
	          values: values
	        };
	      }
	    }
	  }

	  return {
	    parse: parse,
	    stringify: stringify,
	    map: map
	  };
	};

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof2 = __webpack_require__(19);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _keys = __webpack_require__(41);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var URLON = __webpack_require__(189);
	var pathToRegexp = __webpack_require__(190);

	function compileRoute(route, options) {
	  var re;
	  var compiled;
	  var keys = [];
	  var querySeparator = options.querySeparator || '?';

	  re = pathToRegexp(route, keys);
	  keys = keys.map(function (key) {
	    return key.name.toString();
	  });
	  compiled = pathToRegexp.compile(route);

	  return {
	    parse: function parse(url) {
	      var path = url;
	      var result = {};

	      if (~path.indexOf('#') && !~querySeparator.indexOf('#')) {
	        path = path.split('#')[0];
	      }

	      if (~path.indexOf(querySeparator)) {
	        if (options.query) {
	          var queryString = '_' + path.slice(path.indexOf(querySeparator) + querySeparator.length);
	          result = URLON.parse(queryString);
	        }
	        path = path.split(querySeparator)[0];
	      }

	      var match = re.exec(path);
	      if (!match) return null;

	      for (var i = 1; i < match.length; ++i) {
	        var key = keys[i - 1];
	        var value = decodeURIComponent(match[i]);
	        if (value[0] === ':') {
	          result[key] = URLON.parse(value);
	        } else {
	          result[key] = value;
	        }
	      }

	      return result;
	    },

	    stringify: function stringify(values) {
	      var pathParams = {};
	      var queryParams = {};

	      (0, _keys2.default)(values).forEach(function (key) {
	        if (~keys.indexOf(key)) {
	          switch ((0, _typeof3.default)(values[key])) {
	            case 'boolean':
	            case 'number':
	              pathParams[key] = URLON.stringify(values[key]);
	              break;

	            case 'object':
	              throw new Error('URL Mapper - objects are not allowed to be stringified as part of path');

	            default:
	              pathParams[key] = values[key];
	          }
	        } else {
	          if (typeof values[key] !== 'undefined') queryParams[key] = values[key];
	        }
	      });

	      var path = compiled(pathParams);
	      var queryString = '';

	      if (options.query) {
	        if ((0, _keys2.default)(queryParams).length) {
	          queryString = querySeparator + URLON.stringify(queryParams).slice(1);
	        }
	      }

	      return path + queryString;
	    }
	  };
	}

	module.exports = compileRoute;

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof2 = __webpack_require__(19);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var URLON = {
		stringify: function stringify(input) {
			function encodeString(str) {
				return encodeURI(str.replace(/([=:&@_;\/])/g, '/$1'));
			}

			function stringify(input) {
				// Number or Boolean or Null
				if (typeof input === 'number' || input === true || input === false || input === null) {
					return ':' + input;
				}
				// Array
				if (input instanceof Array) {
					var res = [];
					for (var i = 0; i < input.length; ++i) {
						res.push(stringify(input[i]));
					}
					return '@' + res.join('&') + ';';
				}
				// Object
				if ((typeof input === 'undefined' ? 'undefined' : (0, _typeof3.default)(input)) === 'object') {
					var res = [];
					for (var key in input) {
						res.push(encodeString(key) + stringify(input[key]));
					}
					return '_' + res.join('&') + ';';
				}
				// String or undefined
				return '=' + encodeString((input !== null ? input !== undefined ? input : "undefined" : "null").toString());
			}

			return stringify(input).replace(/;+$/g, '');
		},

		parse: function parse(str) {
			var pos = 0;
			str = decodeURI(str);

			function read() {
				var token = '';
				for (; pos !== str.length; ++pos) {
					if (str.charAt(pos) === '/') {
						pos += 1;
						if (pos === str.length) {
							token += ';';
							break;
						}
					} else if (str.charAt(pos).match(/[=:&@_;]/)) {
						break;
					}
					token += str.charAt(pos);
				}
				return token;
			}

			function parse() {
				var type = str.charAt(pos++);

				// String
				if (type === '=') {
					return read();
				}
				// Number or Boolean
				if (type === ':') {
					var value = read();
					if (value === 'true') {
						return true;
					}
					if (value === 'false') {
						return false;
					}
					value = parseFloat(value);
					return isNaN(value) ? null : value;
				}
				// Array
				if (type === '@') {
					var res = [];
					loop: {
						if (pos >= str.length || str.charAt(pos) === ';') {
							break loop;
						}
						while (1) {
							res.push(parse());
							if (pos >= str.length || str.charAt(pos) === ';') {
								break loop;
							}
							pos += 1;
						}
					}
					pos += 1;
					return res;
				}
				// Object
				if (type === '_') {
					var res = {};
					loop: {
						if (pos >= str.length || str.charAt(pos) === ';') {
							break loop;
						}
						while (1) {
							var name = read();
							res[name] = parse();
							if (pos >= str.length || str.charAt(pos) === ';') {
								break loop;
							}
							pos += 1;
						}
					}
					pos += 1;
					return res;
				}
				// Error
				throw 'Unexpected char ' + type;
			}

			return parse();
		}
	};

	if (true) {
		exports.stringify = URLON.stringify;
		exports.parse = URLON.parse;
	}

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _stringify = __webpack_require__(191);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _typeof2 = __webpack_require__(19);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var isarray = __webpack_require__(193);

	/**
	 * Expose `pathToRegexp`.
	 */
	module.exports = pathToRegexp;
	module.exports.parse = parse;
	module.exports.compile = compile;
	module.exports.tokensToFunction = tokensToFunction;
	module.exports.tokensToRegExp = tokensToRegExp;

	/**
	 * The main path matching regexp utility.
	 *
	 * @type {RegExp}
	 */
	var PATH_REGEXP = new RegExp([
	// Match escaped characters that would otherwise appear in future matches.
	// This allows the user to escape special characters that won't transform.
	'(\\\\.)',
	// Match Express-style parameters and un-named parameters with a prefix
	// and optional suffixes. Matches appear as:
	//
	// "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
	// "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
	// "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
	'([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'].join('|'), 'g');

	/**
	 * Parse a string for the raw tokens.
	 *
	 * @param  {string} str
	 * @return {!Array}
	 */
	function parse(str) {
	  var tokens = [];
	  var key = 0;
	  var index = 0;
	  var path = '';
	  var res;

	  while ((res = PATH_REGEXP.exec(str)) != null) {
	    var m = res[0];
	    var escaped = res[1];
	    var offset = res.index;
	    path += str.slice(index, offset);
	    index = offset + m.length;

	    // Ignore already escaped sequences.
	    if (escaped) {
	      path += escaped[1];
	      continue;
	    }

	    var next = str[index];
	    var prefix = res[2];
	    var name = res[3];
	    var capture = res[4];
	    var group = res[5];
	    var modifier = res[6];
	    var asterisk = res[7];

	    // Push the current path onto the tokens.
	    if (path) {
	      tokens.push(path);
	      path = '';
	    }

	    var partial = prefix != null && next != null && next !== prefix;
	    var repeat = modifier === '+' || modifier === '*';
	    var optional = modifier === '?' || modifier === '*';
	    var delimiter = res[2] || '/';
	    var pattern = capture || group || (asterisk ? '.*' : '[^' + delimiter + ']+?');

	    tokens.push({
	      name: name || key++,
	      prefix: prefix || '',
	      delimiter: delimiter,
	      optional: optional,
	      repeat: repeat,
	      partial: partial,
	      asterisk: !!asterisk,
	      pattern: escapeGroup(pattern)
	    });
	  }

	  // Match any characters still remaining.
	  if (index < str.length) {
	    path += str.substr(index);
	  }

	  // If the path exists, push it onto the end.
	  if (path) {
	    tokens.push(path);
	  }

	  return tokens;
	}

	/**
	 * Compile a string to a template function for the path.
	 *
	 * @param  {string}             str
	 * @return {!function(Object=, Object=)}
	 */
	function compile(str) {
	  return tokensToFunction(parse(str));
	}

	/**
	 * Prettier encoding of URI path segments.
	 *
	 * @param  {string}
	 * @return {string}
	 */
	function encodeURIComponentPretty(str) {
	  return encodeURI(str).replace(/[\/?#]/g, function (c) {
	    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	  });
	}

	/**
	 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
	 *
	 * @param  {string}
	 * @return {string}
	 */
	function encodeAsterisk(str) {
	  return encodeURI(str).replace(/[?#]/g, function (c) {
	    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	  });
	}

	/**
	 * Expose a method for transforming tokens into the path function.
	 */
	function tokensToFunction(tokens) {
	  // Compile all the tokens into regexps.
	  var matches = new Array(tokens.length);

	  // Compile all the patterns before compilation.
	  for (var i = 0; i < tokens.length; i++) {
	    if ((0, _typeof3.default)(tokens[i]) === 'object') {
	      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
	    }
	  }

	  return function (obj, opts) {
	    var path = '';
	    var data = obj || {};
	    var options = opts || {};
	    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

	    for (var i = 0; i < tokens.length; i++) {
	      var token = tokens[i];

	      if (typeof token === 'string') {
	        path += token;

	        continue;
	      }

	      var value = data[token.name];
	      var segment;

	      if (value == null) {
	        if (token.optional) {
	          // Prepend partial segment prefixes.
	          if (token.partial) {
	            path += token.prefix;
	          }

	          continue;
	        } else {
	          throw new TypeError('Expected "' + token.name + '" to be defined');
	        }
	      }

	      if (isarray(value)) {
	        if (!token.repeat) {
	          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + (0, _stringify2.default)(value) + '`');
	        }

	        if (value.length === 0) {
	          if (token.optional) {
	            continue;
	          } else {
	            throw new TypeError('Expected "' + token.name + '" to not be empty');
	          }
	        }

	        for (var j = 0; j < value.length; j++) {
	          segment = encode(value[j]);

	          if (!matches[i].test(segment)) {
	            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + (0, _stringify2.default)(segment) + '`');
	          }

	          path += (j === 0 ? token.prefix : token.delimiter) + segment;
	        }

	        continue;
	      }

	      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

	      if (!matches[i].test(segment)) {
	        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"');
	      }

	      path += token.prefix + segment;
	    }

	    return path;
	  };
	}

	/**
	 * Escape a regular expression string.
	 *
	 * @param  {string} str
	 * @return {string}
	 */
	function escapeString(str) {
	  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1');
	}

	/**
	 * Escape the capturing group by escaping special characters and meaning.
	 *
	 * @param  {string} group
	 * @return {string}
	 */
	function escapeGroup(group) {
	  return group.replace(/([=!:$\/()])/g, '\\$1');
	}

	/**
	 * Attach the keys as a property of the regexp.
	 *
	 * @param  {!RegExp} re
	 * @param  {Array}   keys
	 * @return {!RegExp}
	 */
	function attachKeys(re, keys) {
	  re.keys = keys;
	  return re;
	}

	/**
	 * Get the flags for a regexp from the options.
	 *
	 * @param  {Object} options
	 * @return {string}
	 */
	function flags(options) {
	  return options.sensitive ? '' : 'i';
	}

	/**
	 * Pull out keys from a regexp.
	 *
	 * @param  {!RegExp} path
	 * @param  {!Array}  keys
	 * @return {!RegExp}
	 */
	function regexpToRegexp(path, keys) {
	  // Use a negative lookahead to match only capturing groups.
	  var groups = path.source.match(/\((?!\?)/g);

	  if (groups) {
	    for (var i = 0; i < groups.length; i++) {
	      keys.push({
	        name: i,
	        prefix: null,
	        delimiter: null,
	        optional: false,
	        repeat: false,
	        partial: false,
	        asterisk: false,
	        pattern: null
	      });
	    }
	  }

	  return attachKeys(path, keys);
	}

	/**
	 * Transform an array into a regexp.
	 *
	 * @param  {!Array}  path
	 * @param  {Array}   keys
	 * @param  {!Object} options
	 * @return {!RegExp}
	 */
	function arrayToRegexp(path, keys, options) {
	  var parts = [];

	  for (var i = 0; i < path.length; i++) {
	    parts.push(pathToRegexp(path[i], keys, options).source);
	  }

	  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

	  return attachKeys(regexp, keys);
	}

	/**
	 * Create a path regexp from string input.
	 *
	 * @param  {string}  path
	 * @param  {!Array}  keys
	 * @param  {!Object} options
	 * @return {!RegExp}
	 */
	function stringToRegexp(path, keys, options) {
	  var tokens = parse(path);
	  var re = tokensToRegExp(tokens, options);

	  // Attach keys back to the regexp.
	  for (var i = 0; i < tokens.length; i++) {
	    if (typeof tokens[i] !== 'string') {
	      keys.push(tokens[i]);
	    }
	  }

	  return attachKeys(re, keys);
	}

	/**
	 * Expose a function for taking tokens and returning a RegExp.
	 *
	 * @param  {!Array}  tokens
	 * @param  {Object=} options
	 * @return {!RegExp}
	 */
	function tokensToRegExp(tokens, options) {
	  options = options || {};

	  var strict = options.strict;
	  var end = options.end !== false;
	  var route = '';
	  var lastToken = tokens[tokens.length - 1];
	  var endsWithSlash = typeof lastToken === 'string' && /\/$/.test(lastToken);

	  // Iterate over the tokens and create our regexp string.
	  for (var i = 0; i < tokens.length; i++) {
	    var token = tokens[i];

	    if (typeof token === 'string') {
	      route += escapeString(token);
	    } else {
	      var prefix = escapeString(token.prefix);
	      var capture = '(?:' + token.pattern + ')';

	      if (token.repeat) {
	        capture += '(?:' + prefix + capture + ')*';
	      }

	      if (token.optional) {
	        if (!token.partial) {
	          capture = '(?:' + prefix + '(' + capture + '))?';
	        } else {
	          capture = prefix + '(' + capture + ')?';
	        }
	      } else {
	        capture = prefix + '(' + capture + ')';
	      }

	      route += capture;
	    }
	  }

	  // In non-strict mode we allow a slash at the end of match. If the path to
	  // match already ends with a slash, we remove it for consistency. The slash
	  // is valid at the end of a path match, not in the middle. This is important
	  // in non-ending mode, where "/test/" shouldn't match "/test//route".
	  if (!strict) {
	    route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?';
	  }

	  if (end) {
	    route += '$';
	  } else {
	    // In non-ending mode, we need the capturing groups to match as much as
	    // possible by using a positive lookahead to the end or next path segment.
	    route += strict && endsWithSlash ? '' : '(?=\\/|$)';
	  }

	  return new RegExp('^' + route, flags(options));
	}

	/**
	 * Normalize the given path string, returning a regular expression.
	 *
	 * An empty array can be passed in for the keys, which will hold the
	 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
	 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
	 *
	 * @param  {(string|RegExp|Array)} path
	 * @param  {(Array|Object)=}       keys
	 * @param  {Object=}               options
	 * @return {!RegExp}
	 */
	function pathToRegexp(path, keys, options) {
	  keys = keys || [];

	  if (!isarray(keys)) {
	    options = /** @type {!Object} */keys;
	    keys = [];
	  } else if (!options) {
	    options = {};
	  }

	  if (path instanceof RegExp) {
	    return regexpToRegexp(path, /** @type {!Array} */keys);
	  }

	  if (isarray(path)) {
	    return arrayToRegexp( /** @type {!Array} */path, /** @type {!Array} */keys, options);
	  }

	  return stringToRegexp( /** @type {string} */path, /** @type {!Array} */keys, options);
	}

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(192), __esModule: true };

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _stringify = __webpack_require__(191);

	var _stringify2 = _interopRequireDefault(_stringify);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var core = __webpack_require__(7),
	    $JSON = core.JSON || (core.JSON = { stringify: _stringify2.default });
	module.exports = function stringify(it) {
	  // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ },
/* 193 */
/***/ function(module, exports) {

	'use strict';

	module.exports = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var flyd = __webpack_require__(142);
	var addressbar = __webpack_require__(180);

	module.exports = function () {

	  var subscribers = -1;
	  /* In the form: {
	    listenerName1: [listenerFn1, listenerFn2, ...],
	    listenerName2: [listenerFn1, listenerFn2, ...],
	  }
	  */

	  addressbar.addEventListener('change', function (ev) {
	    ev.preventDefault();
	    var url = new URL(ev.target.value);
	    var path = url.pathname == '/' && url.hash != '' ? url.hash.slice(1) : url.pathname == '' ? '/' : url.pathname;
	    for (var subscriber in subscribers) {
	      subscribers[subscriber](path);
	    }
	    addressbar.value = path == '/' ? path : '#' + path;
	  });

	  function setSubscribers(subs) {
	    subscribers = subs;
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
	    }
	  };
	};

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Type = __webpack_require__(110);
	var addressbar = __webpack_require__(180);

	function getParentPath(path) {
	  if (path[path.length - 1] == '/') {
	    return path + '#';
	  } else {
	    var arrPath = path.split('/');
	    return arrPath.slice(0, arrPath.length - 1).join('/') + '/#';
	  }
	}

	module.exports = {
	  types: Type({
	    navigateTo: [String]
	  }),
	  task: function task() {
	    var taskFn = this.types.caseOn({
	      navigateTo: function navigateTo(path, _ref) {
	        var _ref$relative = _ref.relative;
	        var relative = _ref$relative === undefined ? true : _ref$relative;
	        var _ref$success = _ref.success;
	        var success = _ref$success === undefined ? function () {
	          return 0;
	        } : _ref$success;
	        var _ref$error = _ref.error;
	        var error = _ref$error === undefined ? function () {
	          return 0;
	        } : _ref$error;

	        // relative(by default): allows infinite composing, absolute(relative: false): replace the whole path
	        addressbar.value = relative ? getParentPath(addressbar.value) + path : '#' + path;
	        // generate the event
	        var ev = {
	          target: {
	            value: addressbar.value
	          },
	          preventDefault: function preventDefault() {
	            return 0;
	          }
	        };
	        addressbar.listeners('change').forEach(function (l) {
	          return l(ev);
	        });
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
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _promise = __webpack_require__(197);

	var _promise2 = _interopRequireDefault(_promise);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// abstractions for a service
	var F = {
	  data: __webpack_require__(217)
	};
	var R = {
	  curry: __webpack_require__(133)
	};

	// serverName, store, events, init, connect
	module.exports = function (defObj) {

	  var isQueued = !!defObj.queue;

	  var log = defObj.hasOwnProperty('log') || true;

	  var serverName = defObj.serverName;
	  var store = defObj.store;
	  var eventQueue = [];

	  // data is a proxy for store that automatically notify changes
	  var data = new Proxy(store, {
	    set: function set(target, name, value) {
	      target[name] = value;
	      notify(name);
	      return true;
	    }
	  });

	  var subscribers = -1;

	  var events = defObj.events(data);
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

	  function notify(name) {
	    for (var subscriber in subscribers) {
	      var parts = subscriber.split('_');
	      if (parts[parts.length - 1] === name) {
	        subscribers[subscriber](data[name]);
	      }
	    }
	  }

	  function notifyAll() {
	    for (var subscriber in subscribers) {
	      if (data[subscriber]) {
	        subscribers[subscriber](data[subscriber]);
	      }
	    }
	  }

	  function subscribeAll(subs) {
	    // avoid a bug with flyd.on TODO: needs review
	    if (subs != undefined) {
	      if (subscribers == -1 && data.state == 'updated') {
	        // notify all incoming subscribers in the rare case
	        // that data has updated before subscribers are recolected
	        subscribers = subs;
	        notifyAll();
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
	          promises.push(new _promise2.default(function (resolve, reject) {
	            events[ev.name](ev.value, resolve, reject);
	          }));
	        }
	        // TODO: handle errors
	        _promise2.default.all(promises).then(function () {
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
	};

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(198), __esModule: true };

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(100);
	__webpack_require__(22);
	__webpack_require__(66);
	__webpack_require__(199);
	module.exports = __webpack_require__(7).Promise;

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var LIBRARY = __webpack_require__(27),
	    global = __webpack_require__(6),
	    ctx = __webpack_require__(8),
	    classof = __webpack_require__(200),
	    $export = __webpack_require__(5),
	    isObject = __webpack_require__(18),
	    aFunction = __webpack_require__(9),
	    anInstance = __webpack_require__(201),
	    forOf = __webpack_require__(202),
	    speciesConstructor = __webpack_require__(206),
	    task = __webpack_require__(207).set,
	    microtask = __webpack_require__(209)(),
	    PROMISE = 'Promise',
	    TypeError = global.TypeError,
	    process = global.process,
	    $Promise = global[PROMISE],
	    process = global.process,
	    isNode = classof(process) == 'process',
	    empty = function empty() {/* empty */},
	    Internal,
	    GenericPromiseCapability,
	    Wrapper;

	var USE_NATIVE = !!function () {
	  try {
	    // correct subclassing with @@species support
	    var promise = $Promise.resolve(1),
	        FakePromise = (promise.constructor = {})[__webpack_require__(61)('species')] = function (exec) {
	      exec(empty, empty);
	    };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch (e) {/* empty */}
	}();

	// helpers
	var sameConstructor = function sameConstructor(a, b) {
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function isThenable(it) {
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function newPromiseCapability(C) {
	  return sameConstructor($Promise, C) ? new PromiseCapability(C) : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function GenericPromiseCapability(C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject = aFunction(reject);
	};
	var perform = function perform(exec) {
	  try {
	    exec();
	  } catch (e) {
	    return { error: e };
	  }
	};
	var notify = function notify(promise, isReject) {
	  if (promise._n) return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function () {
	    var value = promise._v,
	        ok = promise._s == 1,
	        i = 0;
	    var run = function run(reaction) {
	      var handler = ok ? reaction.ok : reaction.fail,
	          resolve = reaction.resolve,
	          reject = reaction.reject,
	          domain = reaction.domain,
	          result,
	          then;
	      try {
	        if (handler) {
	          if (!ok) {
	            if (promise._h == 2) onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if (handler === true) result = value;else {
	            if (domain) domain.enter();
	            result = handler(value);
	            if (domain) domain.exit();
	          }
	          if (result === reaction.promise) {
	            reject(TypeError('Promise-chain cycle'));
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch (e) {
	        reject(e);
	      }
	    };
	    while (chain.length > i) {
	      run(chain[i++]);
	    } // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if (isReject && !promise._h) onUnhandled(promise);
	  });
	};
	var onUnhandled = function onUnhandled(promise) {
	  task.call(global, function () {
	    var value = promise._v,
	        abrupt,
	        handler,
	        console;
	    if (isUnhandled(promise)) {
	      abrupt = perform(function () {
	        if (isNode) {
	          process.emit('unhandledRejection', value, promise);
	        } else if (handler = global.onunhandledrejection) {
	          handler({ promise: promise, reason: value });
	        } else if ((console = global.console) && console.error) {
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    }promise._a = undefined;
	    if (abrupt) throw abrupt.error;
	  });
	};
	var isUnhandled = function isUnhandled(promise) {
	  if (promise._h == 1) return false;
	  var chain = promise._a || promise._c,
	      i = 0,
	      reaction;
	  while (chain.length > i) {
	    reaction = chain[i++];
	    if (reaction.fail || !isUnhandled(reaction.promise)) return false;
	  }return true;
	};
	var onHandleUnhandled = function onHandleUnhandled(promise) {
	  task.call(global, function () {
	    var handler;
	    if (isNode) {
	      process.emit('rejectionHandled', promise);
	    } else if (handler = global.onrejectionhandled) {
	      handler({ promise: promise, reason: promise._v });
	    }
	  });
	};
	var $reject = function $reject(value) {
	  var promise = this;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if (!promise._a) promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function $resolve(value) {
	  var promise = this,
	      then;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if (promise === value) throw TypeError("Promise can't be resolved itself");
	    if (then = isThenable(value)) {
	      microtask(function () {
	        var wrapper = { _w: promise, _d: false }; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch (e) {
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch (e) {
	    $reject.call({ _w: promise, _d: false }, e); // wrap
	  }
	};

	// constructor polyfill
	if (!USE_NATIVE) {
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor) {
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch (err) {
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor) {
	    this._c = []; // <- awaiting reactions
	    this._a = undefined; // <- checked in isUnhandled reactions
	    this._s = 0; // <- state
	    this._d = false; // <- done
	    this._v = undefined; // <- value
	    this._h = 0; // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false; // <- notify
	  };
	  Internal.prototype = __webpack_require__(210)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected) {
	      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if (this._a) this._a.push(reaction);
	      if (this._s) notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function _catch(onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function PromiseCapability() {
	    var promise = new Internal();
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject = ctx($reject, promise, 1);
	  };
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
	__webpack_require__(60)($Promise, PROMISE);
	__webpack_require__(211)(PROMISE);
	Wrapper = __webpack_require__(7)[PROMISE];

	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r) {
	    var capability = newPromiseCapability(this),
	        $$reject = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x) {
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if (x instanceof $Promise && sameConstructor(x.constructor, this)) return x;
	    var capability = newPromiseCapability(this),
	        $$resolve = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(212)(function (iter) {
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable) {
	    var C = this,
	        capability = newPromiseCapability(C),
	        resolve = capability.resolve,
	        reject = capability.reject;
	    var abrupt = perform(function () {
	      var values = [],
	          index = 0,
	          remaining = 1;
	      forOf(iterable, false, function (promise) {
	        var $index = index++,
	            alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (abrupt) reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable) {
	    var C = this,
	        capability = newPromiseCapability(C),
	        reject = capability.reject;
	    var abrupt = perform(function () {
	      forOf(iterable, false, function (promise) {
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if (abrupt) reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(49),
	    TAG = __webpack_require__(61)('toStringTag')
	// ES3 wrong here
	,
	    ARG = cof(function () {
	  return arguments;
	}()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function tryGet(it, key) {
	  try {
	    return it[key];
	  } catch (e) {/* empty */}
	};

	module.exports = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	  // @@toStringTag case
	  : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	  // builtinTag case
	  : ARG ? cof(O)
	  // ES3 arguments fallback
	  : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 201 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (it, Constructor, name, forbiddenField) {
	  if (!(it instanceof Constructor) || forbiddenField !== undefined && forbiddenField in it) {
	    throw TypeError(name + ': incorrect invocation!');
	  }return it;
	};

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ctx = __webpack_require__(8),
	    call = __webpack_require__(203),
	    isArrayIter = __webpack_require__(204),
	    anObject = __webpack_require__(17),
	    toLength = __webpack_require__(51),
	    getIterFn = __webpack_require__(205),
	    BREAK = {},
	    RETURN = {};
	var _exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
	  var iterFn = ITERATOR ? function () {
	    return iterable;
	  } : getIterFn(iterable),
	      f = ctx(fn, that, entries ? 2 : 1),
	      index = 0,
	      length,
	      step,
	      iterator,
	      result;
	  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if (result === BREAK || result === RETURN) return result;
	  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
	    result = call(iterator, f, step.value, entries);
	    if (result === BREAK || result === RETURN) return result;
	  }
	};
	_exports.BREAK = BREAK;
	_exports.RETURN = RETURN;

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(17);
	module.exports = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	    // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// check on default Array iterator
	var Iterators = __webpack_require__(30),
	    ITERATOR = __webpack_require__(61)('iterator'),
	    ArrayProto = Array.prototype;

	module.exports = function (it) {
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var classof = __webpack_require__(200),
	    ITERATOR = __webpack_require__(61)('iterator'),
	    Iterators = __webpack_require__(30);
	module.exports = __webpack_require__(7).getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
	};

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject = __webpack_require__(17),
	    aFunction = __webpack_require__(9),
	    SPECIES = __webpack_require__(61)('species');
	module.exports = function (O, D) {
	  var C = anObject(O).constructor,
	      S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ctx = __webpack_require__(8),
	    invoke = __webpack_require__(208),
	    html = __webpack_require__(58),
	    cel = __webpack_require__(57),
	    global = __webpack_require__(6),
	    process = global.process,
	    setTask = global.setImmediate,
	    clearTask = global.clearImmediate,
	    MessageChannel = global.MessageChannel,
	    counter = 0,
	    queue = {},
	    ONREADYSTATECHANGE = 'onreadystatechange',
	    defer,
	    channel,
	    port;
	var run = function run() {
	  var id = +this;
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function listener(event) {
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!setTask || !clearTask) {
	  setTask = function setImmediate(fn) {
	    var args = [],
	        i = 1;
	    while (arguments.length > i) {
	      args.push(arguments[i++]);
	    }queue[++counter] = function () {
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (__webpack_require__(49)(process) == 'process') {
	    defer = function defer(id) {
	      process.nextTick(ctx(run, id, 1));
	    };
	    // Browsers with MessageChannel, includes WebWorkers
	  } else if (MessageChannel) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	    // Browsers with postMessage, skip WebWorkers
	    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
	    defer = function defer(id) {
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	    // IE8-
	  } else if (ONREADYSTATECHANGE in cel('script')) {
	    defer = function defer(id) {
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	    // Rest old browsers
	  } else {
	    defer = function defer(id) {
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set: setTask,
	  clear: clearTask
	};

/***/ },
/* 208 */
/***/ function(module, exports) {

	"use strict";

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function (fn, args, that) {
	                  var un = that === undefined;
	                  switch (args.length) {
	                                    case 0:
	                                                      return un ? fn() : fn.call(that);
	                                    case 1:
	                                                      return un ? fn(args[0]) : fn.call(that, args[0]);
	                                    case 2:
	                                                      return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);
	                                    case 3:
	                                                      return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);
	                                    case 4:
	                                                      return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
	                  }return fn.apply(that, args);
	};

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(6),
	    macrotask = __webpack_require__(207).set,
	    Observer = global.MutationObserver || global.WebKitMutationObserver,
	    process = global.process,
	    Promise = global.Promise,
	    isNode = __webpack_require__(49)(process) == 'process';

	module.exports = function () {
	  var head, last, notify;

	  var flush = function flush() {
	    var parent, fn;
	    if (isNode && (parent = process.domain)) parent.exit();
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (e) {
	        if (head) notify();else last = undefined;
	        throw e;
	      }
	    }last = undefined;
	    if (parent) parent.enter();
	  };

	  // Node.js
	  if (isNode) {
	    notify = function notify() {
	      process.nextTick(flush);
	    };
	    // browsers with MutationObserver
	  } else if (Observer) {
	    var toggle = true,
	        node = document.createTextNode('');
	    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
	    notify = function notify() {
	      node.data = toggle = !toggle;
	    };
	    // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise && Promise.resolve) {
	    var promise = Promise.resolve();
	    notify = function notify() {
	      promise.then(flush);
	    };
	    // for other environments - macrotask based on:
	    // - setImmediate
	    // - MessageChannel
	    // - window.postMessag
	    // - onreadystatechange
	    // - setTimeout
	  } else {
	    notify = function notify() {
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }

	  return function (fn) {
	    var task = { fn: fn, next: undefined };
	    if (last) last.next = task;
	    if (!head) {
	      head = task;
	      notify();
	    }last = task;
	  };
	};

/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var hide = __webpack_require__(10);
	module.exports = function (target, src, safe) {
	  for (var key in src) {
	    if (safe && target[key]) target[key] = src[key];else hide(target, key, src[key]);
	  }return target;
	};

/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(6),
	    core = __webpack_require__(7),
	    dP = __webpack_require__(11),
	    DESCRIPTORS = __webpack_require__(15),
	    SPECIES = __webpack_require__(61)('species');

	module.exports = function (KEY) {
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
	    configurable: true,
	    get: function get() {
	      return this;
	    }
	  });
	};

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _from = __webpack_require__(213);

	var _from2 = _interopRequireDefault(_from);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ITERATOR = __webpack_require__(61)('iterator'),
	    SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function () {
	    SAFE_CLOSING = true;
	  };
	  (0, _from2.default)(riter, function () {
	    throw 2;
	  });
	} catch (e) {/* empty */}

	module.exports = function (exec, skipClosing) {
	  if (!skipClosing && !SAFE_CLOSING) return false;
	  var safe = false;
	  try {
	    var arr = [7],
	        iter = arr[ITERATOR]();
	    iter.next = function () {
	      return { done: safe = true };
	    };
	    arr[ITERATOR] = function () {
	      return iter;
	    };
	    exec(arr);
	  } catch (e) {/* empty */}
	  return safe;
	};

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(214), __esModule: true };

/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(22);
	__webpack_require__(215);
	module.exports = __webpack_require__(7).Array.from;

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _from = __webpack_require__(213);

	var _from2 = _interopRequireDefault(_from);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ctx = __webpack_require__(8),
	    $export = __webpack_require__(5),
	    toObject = __webpack_require__(44),
	    call = __webpack_require__(203),
	    isArrayIter = __webpack_require__(204),
	    toLength = __webpack_require__(51),
	    createProperty = __webpack_require__(216),
	    getIterFn = __webpack_require__(205);

	$export($export.S + $export.F * !__webpack_require__(212)(function (iter) {
	  (0, _from2.default)(iter);
	}), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike /*, mapfn = undefined, thisArg = undefined*/) {
	    var O = toObject(arrayLike),
	        C = typeof this == 'function' ? this : Array,
	        aLen = arguments.length,
	        mapfn = aLen > 1 ? arguments[1] : undefined,
	        mapping = mapfn !== undefined,
	        index = 0,
	        iterFn = getIterFn(O),
	        length,
	        result,
	        step,
	        iterator;
	    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
	      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for (result = new C(length); length > index; index++) {
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $defineProperty = __webpack_require__(11),
	    createDesc = __webpack_require__(59);

	module.exports = function (object, index, value) {
	  if (index in object) $defineProperty.f(object, index, createDesc(0, value));else object[index] = value;
	};

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _promise = __webpack_require__(197);

	var _promise2 = _interopRequireDefault(_promise);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// common fetch utils

	var fetchObj = function fetchObj(obj) {
	  var handled = false;
	  var status = function status(response) {
	    if (response.status >= 200 && response.status < 300) {
	      handled = true;
	      return _promise2.default.resolve(response);
	    } else {
	      if (response.status == 401 || response.status == 403) {
	        obj.error('denied', response.status);
	      } else {
	        obj.error('error', response.status);
	      }
	      handled = true;
	      return _promise2.default.reject(new Error(response.statusText));
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
	        return _promise2.default.resolve(response);
	      } else {
	        if (response.status == 401 || response.status == 403) {
	          obj.error('denied', response.status);
	        } else {
	          obj.error('error', response.status);
	        }
	        handled = true;
	        return _promise2.default.reject(new Error(response.statusText));
	      }
	    };

	    return fetch(obj.url, obj.options).then(status).then(obj.response);
	  });

	  return _promise2.default.all(promiseArray).then(success);
	};

	module.exports = {
	  fetch: fetchObj,
	  fetchAll: fetchAll
	};

/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends2 = __webpack_require__(1);

	var _extends3 = _interopRequireDefault(_extends2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var F = (0, _extends3.default)({}, __webpack_require__(104), __webpack_require__(151));
	var h = __webpack_require__(173);

	module.exports = F.def({
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
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Type = __webpack_require__(110);
	var R = {
	  T: __webpack_require__(161)
	};

	module.exports = {
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
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Type = __webpack_require__(110);
	var R = {
	  T: __webpack_require__(161)
	};

	module.exports = {
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
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Type = __webpack_require__(110);
	var data = __webpack_require__(217);
	var R = {
	  T: __webpack_require__(161)
	};

	module.exports = {
	  types: Type({
	    fetch: [Object]
	  }),
	  task: function task() {
	    var taskFn = this.types.caseOn({
	      fetch: function fetch(obj) {
	        return data.fetch(obj);
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
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Type = __webpack_require__(110);
	var R = {
	  T: __webpack_require__(161)
	};

	// emitter should implement emit function
	module.exports = {
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
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Type = __webpack_require__(110);
	var R = {
	  T: __webpack_require__(161)
	};

	module.exports = {
	  types: Type({
	    emit: [String, R.T, R.T]
	  }),
	  task: function task(s) {
	    var socket = s;
	    var taskFn = this.types.caseOn({
	      emit: function emit(channel, message) {
	        var success = arguments.length <= 2 || arguments[2] === undefined ? function () {} : arguments[2];

	        if (socket != undefined) {
	          socket.emit(channel, message, success);
	        }
	      }
	    });
	    // task runner
	    return {
	      run: function run(task) {
	        // perform side effect
	        taskFn(task, '');
	      },
	      get: socket,
	      set: function set(s) {
	        socket = s;
	      }
	    };
	  }
	};

/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var flyd = __webpack_require__(142);
	var h = __webpack_require__(173);

	// Common snabbdom patch function (convention over configuration)
	var patch = __webpack_require__(225).init([__webpack_require__(226), __webpack_require__(227), __webpack_require__(228), __webpack_require__(229), __webpack_require__(230)]);

	module.exports = function (selector) {
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
	};

/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	// jshint newcap: false
	/* global require, module, document, Element */
	'use strict';

	var VNode = __webpack_require__(174);
	var is = __webpack_require__(175);

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
/* 226 */
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
/* 227 */
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
/* 228 */
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
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var is = __webpack_require__(175);

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
/* 230 */
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
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var flyd = __webpack_require__(142);

	module.exports = function (cb) {
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
	};

/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// WORKING
	var flyd = __webpack_require__(142);

	// l should implement removeAllListeners and on functions
	module.exports = function (l) {

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
	};

/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var flyd = __webpack_require__(142);

	var viewDriver = function viewDriver() {
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
	};

	exports.default = viewDriver;

/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var R = {
	  mapObjIndexed: __webpack_require__(152)
	};
	var flyd = __webpack_require__(142);

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

	var timeDriver = function timeDriver() {
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
	};

	exports.default = timeDriver;

/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _stringify = __webpack_require__(191);

	var _stringify2 = _interopRequireDefault(_stringify);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var flyd = __webpack_require__(142);

	var localStorageDriver = function localStorageDriver(name) {
	  var listener$ = void 0;
	  return {
	    attach: function attach(data$) {
	      listener$ = flyd.on(function (data) {
	        localStorage.setItem(name, (0, _stringify2.default)(data));
	      }, data$);
	    },
	    reattach: function reattach(data$) {
	      listener$.end(true);
	      listener$ = flyd.on(function (data) {
	        localStorage.setItem(name, (0, _stringify2.default)(data));
	      }, data$);
	    },
	    dispose: function dispose() {
	      localStorage.removeItem(name);
	      listener$.end(true);
	    }
	  };
	};

	exports.default = localStorageDriver;

/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var flyd = __webpack_require__(142);

	var _require = __webpack_require__(237);

	var screenInfo = _require.screenInfo;

	// difing is not necesary beacuse there is no use case in that the screen size has a bunch of changes

	var screenInfoDriver = function screenInfoDriver() {
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
	};

	exports.default = screenInfoDriver;

/***/ },
/* 237 */
/***/ function(module, exports) {

	'use strict';

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

	module.exports = {
	  screenSize: screenSize,
	  screenInfo: screenInfo
	};

/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var flyd = __webpack_require__(142);

	// DEPRECATED!!!
	module.exports = function (s) {

	  var socket = s;

	  /* In the form: {
	    listenerName1: [listenerFn1, listenerFn2, ...],
	    listenerName2: [listenerFn1, listenerFn2, ...],
	  }
	  */
	  var listeners = void 0;

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
	      if (listenerArr.length > 0 && socket != undefined) {
	        socket.removeAllListeners(listenerName);
	        for (var i = listenerArr.length - 1; i >= 0; i--) {
	          socket.on(listenerName, listenerArr[i]);
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
	      return socket;
	    },
	    set: function set(s) {
	      socket = s;
	      setListeners();
	    }
	  };
	};

/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof2 = __webpack_require__(19);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// A set of css useful function helpers

	var FreeStyle = __webpack_require__(240);

	function r(styleObj) {

	  var Style = FreeStyle.create();

	  var classHash = Style.registerStyle(styleObj);

	  Style.inject();

	  return classHash;
	}

	function hasBaseObject(obj) {
	  for (var key in obj) {
	    if (obj[key] !== null && (0, _typeof3.default)(obj[key]) === 'object' && key == 'base') {
	      return true;
	    }
	  }
	  return false;
	}

	function rs(stylesObj) {
	  if (!hasBaseObject(stylesObj)) {
	    return r(stylesObj);
	  }
	  var classObj = {};
	  for (var key in stylesObj) {
	    if (hasBaseObject(stylesObj[key])) {
	      classObj[key] = rs(stylesObj[key]);
	    } else if (stylesObj[key] != null && (0, _typeof3.default)(stylesObj[key]) === 'object') {
	      classObj[key] = r(stylesObj[key]);
	    } else {
	      // function
	      classObj[key] = stylesObj[key];
	    }
	  }
	  return classObj;
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

	module.exports = {
	  r: r,
	  rs: rs,
	  absoluteCenter: absoluteCenter,
	  noSelectable: noSelectable
	};

/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof2 = __webpack_require__(19);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _keys = __webpack_require__(41);

	var _keys2 = _interopRequireDefault(_keys);

	var _create = __webpack_require__(33);

	var _create2 = _interopRequireDefault(_create);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? (0, _create2.default)(b) : (__.prototype = b.prototype, new __());
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
	for (var _i = 0, _a = (0, _keys2.default)(CSS_NUMBER); _i < _a.length; _i++) {
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
	    return value != null && (typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object' && !Array.isArray(value);
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
	    for (var _i = 0, _a = (0, _keys2.default)(styles); _i < _a.length; _i++) {
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
	                for (var _b = 0, _c = (0, _keys2.default)(value); _b < _c.length; _b++) {
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

/***/ }
/******/ ])
});
;