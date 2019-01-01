/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/jagu.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/jagu.js":
/*!*********************!*\
  !*** ./src/jagu.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _stack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stack */ \"./src/stack.js\");\n\n\nwindow.jagu = {\n  stack: _stack__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n};\n\n\n//# sourceURL=webpack:///./src/jagu.js?");

/***/ }),

/***/ "./src/stack.js":
/*!**********************!*\
  !*** ./src/stack.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/**\n * datastructures-js/stack\n * @copyright 2018 Eyas Ranjous <eyas.ranjous@gmail.com>\n * @license MIT\n */\n\nconst stack = () => {\n  let top = 0;\n  let elements = [];\n\n  /**\n   * @returns {number}\n   */\n  const length = () => top;\n\n  /**\n   * @returns {boolean}\n   */\n  const isEmpty = () => top === 0;\n\n  /**\n   * @param {object} el\n   */\n  const push = (el) => {\n    elements.push(el);\n    top += 1;\n  };\n\n  /**\n   * removes popped elements only when reaching half the stack\n   * to improve performance for high frequency data\n   */\n  const removedPopped = () => {\n    if (top * 2 <= elements.length) {\n      elements = elements.slice(0, top);\n    }\n  };\n\n  /**\n   * @returns {object}\n   */\n  const pop = () => {\n    if (!isEmpty()) {\n      top -= 1;\n      const last = elements[top];\n      removedPopped();\n      return last;\n    }\n    return null;\n  };\n\n  /**\n   * @returns {object}\n   */\n  const peek = () => {\n    if (!isEmpty()) {\n      return elements[top - 1];\n    }\n    return null;\n  };\n\n  /**\n   * clears the stack\n   */\n  const clear = () => {\n    top = 0;\n    elements = [];\n  };\n\n  // stack api\n  return {\n    length,\n    isEmpty,\n    push,\n    pop,\n    peek,\n    clear\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (stack);\n\n\n//# sourceURL=webpack:///./src/stack.js?");

/***/ })

/******/ });