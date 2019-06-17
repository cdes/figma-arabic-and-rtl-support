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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/code.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/direction/index.js":
/*!*****************************************!*\
  !*** ./node_modules/direction/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = direction

var RTL = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC'
var LTR =
  'A-Za-z\u00C0-\u00D6\u00D8-\u00F6' +
  '\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF\u200E\u2C00-\uFB1C' +
  '\uFE00-\uFE6F\uFEFD-\uFFFF'

var rtl = new RegExp('^[^' + LTR + ']*[' + RTL + ']')
var ltr = new RegExp('^[^' + RTL + ']*[' + LTR + ']')

function direction(value) {
  value = String(value || '')

  if (rtl.test(value)) {
    return 'rtl'
  }

  if (ltr.test(value)) {
    return 'ltr'
  }

  return 'neutral'
}


/***/ }),

/***/ "./node_modules/fix-arabic-numbers/index.js":
/*!**************************************************!*\
  !*** ./node_modules/fix-arabic-numbers/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



exports = module.exports = search;
exports.connect = connect;
exports.params = params;



function search(val) {

  if (!val)
    return val;

  var type = typeof val;

  if (type === 'string') {
    val = fix(val);
  } else if (type === 'object' && val.constructor === Array) {
    for (var i = 0; i < val.length; i++) {
      val[i] = search(val[i]);
    }
  } else if (type === 'object') {
    var keys = Object.keys(val);
    for (var i = 0; i < keys.length; i++) {
      val[keys[i]] = search(val[keys[i]]);
    }
  }

  return val;

}



function fix(val) {

  return String(val)
          .replace(/٠/g, '0')
          .replace(/١/g, '1')
          .replace(/٢/g, '2')
          .replace(/٣/g, '3')
          .replace(/٤/g, '4')
          .replace(/٥/g, '5')
          .replace(/٦/g, '6')
          .replace(/٧/g, '7')
          .replace(/٨/g, '8')
          .replace(/٩/g, '9')
          .replace(/٪/g, '%');

}



function connect(req, res, next) {

  req.body = search(req.body);
  req.query = search(req.query);
  req.params = search(req.params);

  next();

}



function params(req, res, next) {

  req.params = search(req.params);

  next();

}


/***/ }),

/***/ "./node_modules/is-number/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-number/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-number <https://github.com/jonschlinkert/is-number>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Released under the MIT License.
 */



module.exports = function(num) {
  if (typeof num === 'number') {
    return num - num === 0;
  }
  if (typeof num === 'string' && num.trim() !== '') {
    return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
  }
  return false;
};


/***/ }),

/***/ "./node_modules/reverse-string/reverse-string.js":
/*!*******************************************************!*\
  !*** ./node_modules/reverse-string/reverse-string.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var regexUnicode = /([\0-\u02FF\u0370-\u1AAF\u1B00-\u1DBF\u1E00-\u20CF\u2100-\uD7FF\uE000-\uFE1F\uFE30-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])([\u0300-\u036F\u1AB0-\u1AFF\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F]+)/g;
var regexAstral = /([\uD800-\uDBFF])([\uDC00-\uDFFF])/g;

function reverse(string) {
	if (typeof string !== 'string') {
		throw new TypeError('Expected a string');
	}

	string = string.replace(regexUnicode, function ($0, $1, $2) {
		return reverse($2) + $1;
	}).replace(regexAstral, '$2$1');

	var result = '';
	for (var i = string.length - 1; i >= 0; i--) {
		result += string[i];
	}
	return result;
}

if ( true && module.exports) {
	module.exports = reverse;
}


/***/ }),

/***/ "./src/code.ts":
/*!*********************!*\
  !*** ./src/code.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
exports.__esModule = true;
var transform_1 = __importDefault(__webpack_require__(/*! ./transform */ "./src/transform.ts"));
figma.showUI(__html__, { width: 400, height: 300, });
function init() {
    var selection = figma.currentPage.selection;
    if (selection.length > 0) {
        var element = selection[0];
        var data = element.getPluginData("original-data");
        figma.ui.postMessage({
            type: 'init',
            data: data.length > 0 ? JSON.parse(data) : null
        });
    }
}
init();
figma.ui.onmessage = function (msg) { return __awaiter(_this, void 0, void 0, function () {
    var selection, element;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(msg.type === 'fix-text')) return [3 /*break*/, 2];
                selection = figma.currentPage.selection;
                if (!(selection.length > 0)) return [3 /*break*/, 2];
                if (!(selection[0].type === 'TEXT')) return [3 /*break*/, 2];
                element = selection[0];
                return [4 /*yield*/, figma.loadFontAsync(element.fontName)];
            case 1:
                _a.sent();
                element.characters = transform_1["default"](msg.text, msg.options);
                element.setPluginData("original-data", JSON.stringify(msg));
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); };


/***/ }),

/***/ "./src/js-arabic-reshaper.ts":
/*!***********************************!*\
  !*** ./src/js-arabic-reshaper.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// This work is licensed under the GNU Public License (GPL).
exports.__esModule = true;
// Written by Nick Doiron (@mapmeld)
// Ported from python-arabic-reshaper by Abdullah Diab (mpcabd)
// Which was ported and tweaked from Java to Python, from Better Arabic Reshaper
// [https://github.com/agawish/Better-Arabic-Reshaper/]
exports.LIGATURES = [
    // Sentences
    // Ligature BISMILLAH AR-RAHMAN AR-RAHEEM
    {
        matches: [
            '\u0628\u0633\u0645\u0020',
            '\u0627\u0644\u0644\u0647\u0020',
            '\u0627\u0644\u0631\u062D\u0645\u0646\u0020',
            '\u0627\u0644\u0631\u062D\u064A\u0645'
        ],
        forms: { isolated: '\uFDFD' }
    },
    // Ligature JALLAJALALOUHOU
    {
        matches: ['\u062C\u0644\u0020\u062C\u0644\u0627\u0644\u0647'],
        forms: { isolated: '\uFDFB' }
    },
    // Ligature SALLALLAHOU ALAYHE WASALLAM
    {
        matches: [
            '\u0635\u0644\u0649\u0020',
            '\u0627\u0644\u0644\u0647\u0020',
            '\u0639\u0644\u064A\u0647\u0020',
            '\u0648\u0633\u0644\u0645'
        ],
        forms: { isolated: '\uFDFA' }
    },
    // Words
    // Ligature ALLAH
    {
        matches: ['\u0627\u0644\u0644\u0647'],
        forms: { isolated: '\uFDF2' }
    },
    //Ligature AKBAR
    {
        matches: ['\u0623\u0643\u0628\u0631'],
        forms: { isolated: '\uFDF3' }
    },
    // Ligature ALAYHE
    {
        matches: ['\u0639\u0644\u064A\u0647'],
        forms: { isolated: '\uFDF7' }
    },
    // Ligature MOHAMMAD
    {
        matches: ['\u0645\u062D\u0645\u062F'],
        forms: { isolated: '\uFDF4' }
    },
    // Ligature RASOUL
    {
        matches: ['\u0631\u0633\u0648\u0644'],
        forms: { isolated: '\uFDF6' }
    },
    // Ligature SALAM
    {
        matches: ['\u0635\u0644\u0639\u0645'],
        forms: { isolated: '\uFDF5' }
    },
    // Ligature SALLA
    {
        matches: ['\u0635\u0644\u0649'],
        forms: { isolated: '\uFDF9' }
    },
    // Ligature WASALLAM
    {
        matches: ['\u0648\u0633\u0644\u0645'],
        forms: { isolated: '\uFDF8' }
    },
    // RIAL SIGN
    {
        matches: ['\u0631[\u06CC\u064A]\u0627\u0644'],
        forms: { isolated: '\uFDFC' }
    },
    // Letters
    // Ligature AIN WITH ALEF MAKSURA
    {
        matches: ['\u0639\u0649'],
        forms: { isolated: '\uFCF7', final: '\uFD13' }
    },
    // Ligature AIN WITH JEEM
    {
        matches: ['\u0639\u062C'],
        forms: { isolated: '\uFC29', initial: '\uFCBA' }
    },
    // Ligature AIN WITH JEEM WITH MEEM
    {
        matches: ['\u0639\u062C\u0645'],
        forms: { initial: '\uFDC4', final: '\uFD75' }
    },
    // Ligature AIN WITH MEEM
    {
        matches: ['\u0639\u0645'],
        forms: { isolated: '\uFC2A', initial: '\uFCBB' }
    },
    // Ligature AIN WITH MEEM WITH ALEF MAKSURA
    {
        matches: ['\u0639\u0645\u0649'],
        forms: { final: '\uFD78' }
    },
    // Ligature AIN WITH MEEM WITH MEEM
    {
        matches: ['\u0639\u0645\u0645'],
        forms: { initial: '\uFD77', final: '\uFD76' }
    },
    // Ligature AIN WITH MEEM WITH YEH
    {
        matches: ['\u0639\u0645\u064A'],
        forms: { final: '\uFDB6' }
    },
    // Ligature AIN WITH YEH
    {
        matches: ['\u0639\u064A'],
        forms: { isolated: '\uFCF8', final: '\uFD14' }
    },
    // Ligature ALEF MAKSURA WITH SUPERSCRIPT ALEF
    {
        matches: ['\u0649\u0670'],
        forms: { isolated: '\uFC5D', final: '\uFC90' }
    },
    // Ligature ALEF WITH FATHATAN
    {
        matches: ['\u0627\u064B'],
        forms: { isolated: '\uFD3D', final: '\uFD3C' }
    },
    // Ligature BEH WITH ALEF MAKSURA
    {
        matches: ['\u0628\u0649'],
        forms: { isolated: '\uFC09', final: '\uFC6E' }
    },
    // Ligature BEH WITH HAH
    {
        matches: ['\u0628\u062D'],
        forms: { isolated: '\uFC06', initial: '\uFC9D' }
    },
    // Ligature BEH WITH HAH WITH YEH
    {
        matches: ['\u0628\u062D\u064A'],
        forms: { final: '\uFDC2' }
    },
    // Ligature BEH WITH HEH
    {
        matches: ['\u0628\u0647'],
        forms: { initial: '\uFCA0', medial: '\uFCE2' }
    },
    // Ligature BEH WITH JEEM
    {
        matches: ['\u0628\u062C'],
        forms: { isolated: '\uFC05', initial: '\uFC9C' }
    },
    // Ligature BEH WITH KHAH
    {
        matches: ['\u0628\u062E'],
        forms: { isolated: '\uFC07', initial: '\uFC9E' }
    },
    // Ligature BEH WITH KHAH WITH YEH
    {
        matches: ['\u0628\u062E\u064A'],
        forms: { final: '\uFD9E' }
    },
    // Ligature BEH WITH MEEM
    {
        matches: ['\u0628\u0645'],
        forms: { isolated: '\uFC08', initial: '\uFC9F', medial: '\uFCE1', final: '\uFC6C' }
    },
    // Ligature BEH WITH NOON
    {
        matches: ['\u0628\u0646'],
        forms: { final: '\uFC6D' }
    },
    // Ligature BEH WITH REH
    {
        matches: ['\u0628\u0631'],
        forms: { final: '\uFC6A' }
    },
    // Ligature AIN WITH ALEF MAKSURA
    {
        matches: ['\u0639\u0649'],
        forms: { isolated: '\uFCF7', final: '\uFD13' }
    },
    // Ligature AIN WITH JEEM
    {
        matches: ['\u0639\u062C'],
        forms: { isolated: '\uFC29', initial: '\uFCBA' }
    },
    // Ligature AIN WITH JEEM WITH MEEM
    {
        matches: ['\u0639\u062C\u0645'],
        forms: { inital: '\uFDC4', final: '\uFD75' }
    },
    // Ligature AIN WITH MEEM
    {
        matches: ['\u0639\u0645'],
        forms: { isolated: '\uFC2A', initial: '\uFCBB' }
    },
    // Ligature AIN WITH MEEM WITH ALEF MAKSURA
    {
        matches: ['\u0639\u0645\u0649'],
        forms: { final: '\uFD78' }
    },
    // Ligature AIN WITH MEEM WITH MEEM
    {
        matches: ['\u0639\u0645\u0645'],
        forms: { initial: '\uFD77', final: '\uFD76' }
    },
    // Ligature AIN WITH MEEM WITH YEH
    {
        matches: ['\u0639\u0645\u064A'],
        forms: { final: '\uFDB6' }
    },
    // Ligature AIN WITH YEH
    {
        matches: ['\u0639\u064A'],
        forms: { isolated: '\uFCF8', final: '\uFD14' }
    },
    // Ligature ALEF MAKSURA WITH SUPERSCRIPT ALEF
    {
        matches: ['\u0649\u0670'],
        forms: { isolated: '\uFC5D', final: '\uFC90' }
    },
    // Ligature ALEF WITH FATHATAN
    {
        matches: ['\u0627\u064B'],
        forms: { isolated: '\uFD3D', final: '\uFD3C' }
    },
    // Ligature BEH WITH ALEF MAKSURA
    {
        matches: ['\u0628\u0649'],
        forms: { isolated: '\uFC09', final: '\uFC6E' }
    },
    // Ligature BEH WITH HAH
    {
        matches: ['\u0628\u062D'],
        forms: { isolated: '\uFC06', initial: '\uFC9D' }
    },
    // Ligature BEH WITH HAH WITH YEH
    {
        matches: ['\u0628\u062D\u064A'],
        forms: { final: '\uFDC2' }
    },
    // Ligature BEH WITH HEH
    {
        matches: ['\u0628\u0647'],
        forms: { initial: '\uFCA0', medial: '\uFCE2' }
    },
    // Ligature BEH WITH JEEM
    {
        matches: ['\u0628\u062C'],
        forms: { isolated: '\uFC05', initial: '\uFC9C' }
    },
    // Ligature BEH WITH KHAH
    {
        matches: ['\u0628\u062E'],
        forms: { isolated: '\uFC07', initial: '\uFC9E' }
    },
    // Ligature BEH WITH KHAH WITH YEH
    {
        matches: ['\u0628\u062E\u064A'],
        forms: { final: '\uFD9E' }
    },
    // Ligature BEH WITH MEEM
    {
        matches: ['\u0628\u0645'],
        forms: { isolated: '\uFC08', initial: '\uFC9F', medial: '\uFCE1', final: '\uFC6C' }
    },
    // Ligature BEH WITH NOON
    {
        matches: ['\u0628\u0646'],
        forms: { final: '\uFC6D' }
    },
    // Ligature BEH WITH REH
    {
        matches: ['\u0628\u0631'],
        forms: { final: '\uFC6A' }
    },
    // Ligature BEH WITH YEH
    {
        matches: ['\u0628\u064A'],
        forms: { isolated: '\uFC0A', final: '\uFC6F' }
    },
    // Ligature BEH WITH ZAIN
    {
        matches: ['\u0628\u0632'],
        forms: { final: '\uFC6B' }
    },
    // Ligature DAD WITH ALEF MAKSURA
    {
        matches: ['\u0636\u0649'],
        forms: { isolated: '\uFD07', final: '\uFD23' }
    },
    // Ligature DAD WITH HAH
    {
        matches: ['\u0636\u062D'],
        forms: { isolated: '\uFC23', initial: '\uFCB5' }
    },
    // Ligature DAD WITH HAH WITH ALEF MAKSURA
    {
        matches: ['\u0636\u062D\u0649'],
        forms: { final: '\uFD6E' }
    },
    // Ligature DAD WITH HAH WITH YEH
    {
        matches: ['\u0636\u062D\u064A'],
        forms: { final: '\uFDAB' }
    },
    // Ligature DAD WITH JEEM
    {
        matches: ['\u0636\u062C'],
        forms: { isolated: '\uFC22', initial: '\uFCB4' }
    },
    // Ligature DAD WITH KHAH
    {
        matches: ['\u0636\u062E'],
        forms: { isolated: '\uFC24', initial: '\uFCB6' }
    },
    // Ligature DAD WITH KHAH WITH MEEM
    {
        matches: ['\u0636\u062E\u0645'],
        forms: { initial: '\uFD70', final: '\uFD6F' }
    },
    // Ligature DAD WITH MEEM
    {
        matches: ['\u0636\u0645'],
        forms: { isolated: '\uFC25', initial: '\uFCB7' }
    },
    // Ligature DAD WITH REH
    {
        matches: ['\u0636\u0631'],
        forms: { isolated: '\uFD10', final: '\uFD2C' }
    },
    // Ligature DAD WITH YEH
    {
        matches: ['\u0636\u064A'],
        forms: { isolated: '\uFD08', final: '\uFD24' }
    },
    // Ligature FEH WITH ALEF MAKSURA
    {
        matches: ['\u0641\u0649'],
        forms: { isolated: '\uFC31', final: '\uFC7C' }
    },
    // Ligature FEH WITH HAH
    {
        matches: ['\u0641\u062D'],
        forms: { isolated: '\uFC2E', initial: '\uFCBF' }
    },
    // Ligature FEH WITH JEEM
    {
        matches: ['\u0641\u062C'],
        forms: { isolated: '\uFC2D', initial: '\uFCBE' }
    },
    // Ligature FEH WITH KHAH
    {
        matches: ['\u0641\u062E'],
        forms: { isolated: '\uFC2F', initial: '\uFCC0' }
    },
    // Ligature FEH WITH KHAH WITH MEEM
    {
        matches: ['\u0641\u062E\u0645'],
        forms: { initial: '\uFD7D', final: '\uFD7C' }
    },
    // Ligature FEH WITH MEEM
    {
        matches: ['\u0641\u0645'],
        forms: { isolated: '\uFC30', initial: '\uFCC1' }
    },
    // Ligature FEH WITH MEEM WITH YEH
    {
        matches: ['\u0641\u0645\u064A'],
        forms: { final: '\uFDC1' }
    },
    // Ligature FEH WITH YEH
    {
        matches: ['\u0641\u064A'],
        forms: { isolated: '\uFC32', final: '\uFC7D' }
    },
    // Ligature GHAIN WITH ALEF MAKSURA
    {
        matches: ['\u063A\u0649'],
        forms: { isolated: '\uFCF9', final: '\uFD15' }
    },
    // Ligature GHAIN WITH JEEM
    {
        matches: ['\u063A\u062C'],
        forms: { isolated: '\uFC2B', initial: '\uFCBC' }
    },
    // Ligature GHAIN WITH MEEM
    {
        matches: ['\u063A\u0645'],
        forms: { isolated: '\uFC2C', initial: '\uFCBD' }
    },
    // Ligature GHAIN WITH MEEM WITH ALEF MAKSURA
    {
        matches: ['\u063A\u0645\u0649'],
        forms: { final: '\uFD7B' }
    },
    // Ligature GHAIN WITH MEEM WITH MEEM
    {
        matches: ['\u063A\u0645\u0645'],
        forms: { final: '\uFD79' }
    },
    // Ligature GHAIN WITH MEEM WITH YEH
    {
        matches: ['\u063A\u0645\u064A'],
        forms: { final: '\uFD7A' }
    },
    // Ligature GHAIN WITH YEH
    {
        matches: ['\u063A\u064A'],
        forms: { isolated: '\uFCFA', final: '\uFD16' }
    },
    // Ligature HAH WITH ALEF MAKSURA
    {
        matches: ['\u062D\u0649'],
        forms: { isolated: '\uFCFF', final: '\uFD1B' }
    },
    // Ligature HAH WITH JEEM
    {
        matches: ['\u062D\u062C'],
        forms: { isolated: '\uFC17', initial: '\uFCA9' }
    },
    // Ligature HAH WITH JEEM WITH YEH
    {
        matches: ['\u062D\u062C\u064A'],
        forms: { final: '\uFDBF' }
    },
    // Ligature HAH WITH MEEM
    {
        matches: ['\u062D\u0645'],
        forms: { isolated: '\uFC18', initial: '\uFCAA' }
    },
    // Ligature HAH WITH MEEM WITH ALEF MAKSURA
    {
        matches: ['\u062D\u0645\u0649'],
        forms: { final: '\uFD5B' }
    },
    // Ligature HAH WITH MEEM WITH YEH
    {
        matches: ['\u062D\u0645\u064A'],
        forms: { final: '\uFD5A' }
    },
    // Ligature HAH WITH YEH
    {
        matches: ['\u062D\u064A'],
        forms: { isolated: '\uFD00', final: '\uFD1C' }
    },
    // Ligature HEH WITH ALEF MAKSURA
    {
        matches: ['\u0647\u0649'],
        forms: { isolated: '\uFC53' }
    },
    // Ligature HEH WITH JEEM
    {
        matches: ['\u0647\u062C'],
        forms: { isolated: '\uFC51', initial: '\uFCD7' }
    },
    // Ligature HEH WITH MEEM
    {
        matches: ['\u0647\u0645'],
        forms: { isolated: '\uFC52', initial: '\uFCD8' }
    },
    // Ligature HEH WITH MEEM WITH JEEM
    {
        matches: ['\u0647\u0645\u062C'],
        forms: { initial: '\uFD93' }
    },
    // Ligature HEH WITH MEEM WITH MEEM
    {
        matches: ['\u0647\u0645\u0645'],
        forms: { initial: '\uFD94' }
    },
    // Ligature HEH WITH SUPERSCRIPT ALEF
    {
        matches: ['\u0647\u0670'],
        forms: { initial: '\uFCD9' }
    },
    // Ligature HEH WITH YEH
    {
        matches: ['\u0647\u064A'],
        forms: { isolated: '\uFC54' }
    },
    // Ligature JEEM WITH ALEF MAKSURA
    {
        matches: ['\u062C\u0649'],
        forms: { isolated: '\uFD01', final: '\uFD1D' }
    },
    // Ligature JEEM WITH HAH
    {
        matches: ['\u062C\u062D'],
        forms: { isolated: '\uFC15', initial: '\uFCA7' }
    },
    // Ligature JEEM WITH HAH WITH ALEF MAKSURA
    {
        matches: ['\u062C\u062D\u0649'],
        forms: { final: '\uFDA6' }
    },
    // Ligature JEEM WITH HAH WITH YEH
    {
        matches: ['\u062C\u062D\u064A'],
        forms: { final: '\uFDBE' }
    },
    // Ligature JEEM WITH MEEM
    {
        matches: ['\u062C\u0645'],
        forms: { isolated: '\uFC16', initial: '\uFCA8' }
    },
    // Ligature JEEM WITH MEEM WITH ALEF MAKSURA
    {
        matches: ['\u062C\u0645\u0649'],
        forms: { final: '\uFDA7' }
    },
    // Ligature JEEM WITH MEEM WITH HAH
    {
        matches: ['\u062C\u0645\u062D'],
        forms: { initial: '\uFD59', final: '\uFD58' }
    },
    // Ligature JEEM WITH MEEM WITH YEH
    {
        matches: ['\u062C\u0645\u064A'],
        forms: { final: '\uFDA5' }
    },
    // Ligature JEEM WITH YEH
    {
        matches: ['\u062C\u064A'],
        forms: { isolated: '\uFD02', final: '\uFD1E' }
    },
    // Ligature KAF WITH ALEF
    {
        matches: ['\u0643\u0627'],
        forms: { isolated: '\uFC37', final: '\uFC80' }
    },
    // Ligature KAF WITH ALEF MAKSURA
    {
        matches: ['\u0643\u0649'],
        forms: { isolated: '\uFC3D', final: '\uFC83' }
    },
    // Ligature KAF WITH HAH
    {
        matches: ['\u0643\u062D'],
        forms: { isolated: '\uFC39', initial: '\uFCC5' }
    },
    // Ligature KAF WITH JEEM
    {
        matches: ['\u0643\u062C'],
        forms: { isolated: '\uFC38', initial: '\uFCC4' }
    },
    // Ligature KAF WITH KHAH
    {
        matches: ['\u0643\u062E'],
        forms: { isolated: '\uFC3A', initial: '\uFCC6' }
    },
    // Ligature KAF WITH LAM
    {
        matches: ['\u0643\u0644'],
        forms: { isolated: '\uFC3B', initial: '\uFCC7', medial: '\uFCEB', final: '\uFC81' }
    },
    // Ligature KAF WITH MEEM
    {
        matches: ['\u0643\u0645'],
        forms: { isolated: '\uFC3C', initial: '\uFCC8', medial: '\uFCEC', final: '\uFC82' }
    },
    // Ligature KAF WITH MEEM WITH MEEM
    {
        matches: ['\u0643\u0645\u0645'],
        forms: { initial: '\uFDC3', final: '\uFDBB' }
    },
    // Ligature KAF WITH MEEM WITH YEH
    {
        matches: ['\u0643\u0645\u064A'],
        forms: { final: '\uFDB7' }
    },
    // Ligature KAF WITH YEH
    {
        matches: ['\u0643\u064A'],
        forms: { isolated: '\uFC3E', final: '\uFC84' }
    },
    // Ligature KHAH WITH ALEF MAKSURA
    {
        matches: ['\u062E\u0649'],
        forms: { isolated: '\uFD03', final: '\uFD1F' }
    },
    // Ligature KHAH WITH HAH
    {
        matches: ['\u062E\u062D'],
        forms: { isolated: '\uFC1A' }
    },
    // Ligature KHAH WITH JEEM
    {
        matches: ['\u062E\u062C'],
        forms: { isolated: '\uFC19', initial: '\uFCAB' }
    },
    // Ligature KHAH WITH MEEM
    {
        matches: ['\u062E\u0645'],
        forms: { isolated: '\uFC1B', initial: '\uFCAC' }
    },
    // Ligature KHAH WITH YEH
    {
        matches: ['\u062E\u064A'],
        forms: { isolated: '\uFD04', final: '\uFD20' }
    },
    // Ligature LAM WITH ALEF
    {
        matches: ['\u0644\u0627'],
        forms: { isolated: '\uFEFB', final: '\uFEFC' }
    },
    // Ligature LAM WITH ALEF MAKSURA
    {
        matches: ['\u0644\u0649'],
        forms: { isolated: '\uFC43', final: '\uFC86' }
    },
    // Ligature LAM WITH ALEF WITH HAMZA ABOVE
    {
        matches: ['\u0644\u0623'],
        forms: { isolated: '\uFEF7', final: '\uFEF8' }
    },
    // Ligature LAM WITH ALEF WITH HAMZA BELOW
    {
        matches: ['\u0644\u0625'],
        forms: { isolated: '\uFEF9', final: '\uFEFA' }
    },
    // Ligature LAM WITH ALEF WITH MADDA ABOVE
    {
        matches: ['\u0644\u0622'],
        forms: { isolated: '\uFEF5', final: '\uFEF6' }
    },
    // Ligature LAM WITH HAH
    {
        matches: ['\u0644\u062D'],
        forms: { isolated: '\uFC40', initial: '\uFCCA' }
    },
    // Ligature LAM WITH HAH WITH ALEF MAKSURA
    {
        matches: ['\u0644\u062D\u0649'],
        forms: { final: '\uFD82' }
    },
    // Ligature LAM WITH HAH WITH MEEM
    {
        matches: ['\u0644\u062D\u0645'],
        forms: { initial: '\uFDB5', final: '\uFD80' }
    },
    // Ligature LAM WITH HAH WITH YEH
    {
        matches: ['\u0644\u062D\u064A'],
        forms: { final: '\uFD81' }
    },
    // Ligature LAM WITH HEH
    {
        matches: ['\u0644\u0647'],
        forms: { initial: '\uFCCD' }
    },
    // Ligature LAM WITH JEEM
    {
        matches: ['\u0644\u062C'],
        forms: { isolated: '\uFC3F', initial: '\uFCC9' }
    },
    // Ligature LAM WITH JEEM WITH JEEM
    {
        matches: ['\u0644\u062C\u062C'],
        forms: { initial: '\uFD83', final: '\uFD84' }
    },
    // Ligature LAM WITH JEEM WITH MEEM
    {
        matches: ['\u0644\u062C\u0645'],
        forms: { initial: '\uFDBA', final: '\uFDBC' }
    },
    // Ligature LAM WITH JEEM WITH YEH
    {
        matches: ['\u0644\u062C\u064A'],
        forms: { final: '\uFDAC' }
    },
    // Ligature LAM WITH KHAH
    {
        matches: ['\u0644\u062E'],
        forms: { isolated: '\uFC41', initial: '\uFCCB' }
    },
    // Ligature LAM WITH KHAH WITH MEEM
    {
        matches: ['\u0644\u062E\u0645'],
        forms: { initial: '\uFD86', final: '\uFD85' }
    },
    // Ligature LAM WITH MEEM
    {
        matches: ['\u0644\u0645'],
        forms: { isolated: '\uFC42', initial: '\uFCCC', medial: '\uFCED', final: '\uFC85' }
    },
    // Ligature LAM WITH MEEM WITH HAH
    {
        matches: ['\u0644\u0645\u062D'],
        forms: { initial: '\uFD88', final: '\uFD87' }
    },
    // Ligature LAM WITH MEEM WITH YEH
    {
        matches: ['\u0644\u0645\u064A'],
        forms: { final: '\uFDAD' }
    },
    // Ligature LAM WITH YEH
    {
        matches: ['\u0644\u064A'],
        forms: { isolated: '\uFC44', final: '\uFC87' }
    },
    // Ligature MEEM WITH ALEF
    {
        matches: ['\u0645\u0627'],
        forms: { final: '\uFC88' }
    },
    // Ligature MEEM WITH ALEF MAKSURA
    {
        matches: ['\u0645\u0649'],
        forms: { isolated: '\uFC49' }
    },
    // Ligature MEEM WITH HAH
    {
        matches: ['\u0645\u062D'],
        forms: { isolated: '\uFC46', initial: '\uFCCF' }
    },
    // Ligature MEEM WITH HAH WITH JEEM
    {
        matches: ['\u0645\u062D\u062C'],
        forms: { initial: '\uFD89' }
    },
    // Ligature MEEM WITH HAH WITH MEEM
    {
        matches: ['\u0645\u062D\u0645'],
        forms: { initial: '\uFD8A' }
    },
    // Ligature MEEM WITH HAH WITH YEH
    {
        matches: ['\u0645\u062D\u064A'],
        forms: { final: '\uFD8B' }
    },
    // Ligature MEEM WITH JEEM
    {
        matches: ['\u0645\u062C'],
        forms: { isolated: '\uFC45', initial: '\uFCCE' }
    },
    // Ligature MEEM WITH JEEM WITH HAH
    {
        matches: ['\u0645\u062C\u062D'],
        forms: { initial: '\uFD8C' }
    },
    // Ligature MEEM WITH JEEM WITH KHAH
    {
        matches: ['\u0645\u062C\u062E'],
        forms: { initial: '\uFD92' }
    },
    // Ligature MEEM WITH JEEM WITH MEEM
    {
        matches: ['\u0645\u062C\u0645'],
        forms: { initial: '\uFD8D' }
    },
    // Ligature MEEM WITH JEEM WITH YEH
    {
        matches: ['\u0645\u062C\u064A'],
        forms: { final: '\uFDC0' }
    },
    // Ligature MEEM WITH KHAH
    {
        matches: ['\u0645\u062E'],
        forms: { isolated: '\uFC47', initial: '\uFCD0' }
    },
    // Ligature MEEM WITH KHAH WITH JEEM
    {
        matches: ['\u0645\u062E\u062C'],
        forms: { initial: '\uFD8E' }
    },
    // Ligature MEEM WITH KHAH WITH MEEM
    {
        matches: ['\u0645\u062E\u0645'],
        forms: { initial: '\uFD8F' }
    },
    // Ligature MEEM WITH KHAH WITH YEH
    {
        matches: ['\u0645\u062E\u064A'],
        forms: { final: '\uFDB9' }
    },
    // Ligature MEEM WITH MEEM
    {
        matches: ['\u0645\u0645'],
        forms: { isolated: '\uFC48', initial: '\uFCD1', final: '\uFC89' }
    },
    // Ligature MEEM WITH MEEM WITH YEH
    {
        matches: ['\u0645\u0645\u064A'],
        forms: { final: '\uFDB1' }
    },
    // Ligature MEEM WITH YEH
    {
        matches: ['\u0645\u064A'],
        forms: { isolated: '\uFC4A' }
    },
    // Ligature NOON WITH ALEF MAKSURA
    {
        matches: ['\u0646\u0649'],
        forms: { isolated: '\uFC4F', final: '\uFC8E' }
    },
    // Ligature NOON WITH HAH
    {
        matches: ['\u0646\u062D'],
        forms: { isolated: '\uFC4C', initial: '\uFCD3' }
    },
    // Ligature NOON WITH HAH WITH ALEF MAKSURA
    {
        matches: ['\u0646\u062D\u0649'],
        forms: { final: '\uFD96' }
    },
    // Ligature NOON WITH HAH WITH MEEM
    {
        matches: ['\u0646\u062D\u0645'],
        forms: { initial: '\uFD95' }
    },
    // Ligature NOON WITH HAH WITH YEH
    {
        matches: ['\u0646\u062D\u064A'],
        forms: { final: '\uFDB3' }
    },
    // Ligature NOON WITH HEH
    {
        matches: ['\u0646\u0647'],
        forms: { initial: '\uFCD6', medial: '\uFCEF' }
    },
    // Ligature NOON WITH JEEM
    {
        matches: ['\u0646\u062C'],
        forms: { isolated: '\uFC4B', initial: '\uFCD2' }
    },
    // Ligature NOON WITH JEEM WITH ALEF MAKSURA
    {
        matches: ['\u0646\u062C\u0649'],
        forms: { final: '\uFD99' }
    },
    // Ligature NOON WITH JEEM WITH HAH
    {
        matches: ['\u0646\u062C\u062D'],
        forms: { initial: '\uFDB8', final: '\uFDBD' }
    },
    // Ligature NOON WITH JEEM WITH MEEM
    {
        matches: ['\u0646\u062C\u0645'],
        forms: { initial: '\uFD98', final: '\uFD97' }
    },
    // Ligature NOON WITH JEEM WITH YEH
    {
        matches: ['\u0646\u062C\u064A'],
        forms: { final: '\uFDC7' }
    },
    // Ligature NOON WITH KHAH
    {
        matches: ['\u0646\u062E'],
        forms: { isolated: '\uFC4D', initial: '\uFCD4' }
    },
    // Ligature NOON WITH MEEM
    {
        matches: ['\u0646\u0645'],
        forms: { isolated: '\uFC4E', initial: '\uFCD5', medial: '\uFCEE', final: '\uFC8C' }
    },
    // Ligature NOON WITH MEEM WITH ALEF MAKSURA
    {
        matches: ['\u0646\u0645\u0649'],
        forms: { final: '\uFD9B' }
    },
    // Ligature NOON WITH MEEM WITH YEH
    {
        matches: ['\u0646\u0645\u064A'],
        forms: { final: '\uFD9A' }
    },
    // Ligature NOON WITH NOON
    {
        matches: ['\u0646\u0646'],
        forms: { final: '\uFC8D' }
    },
    // Ligature NOON WITH REH
    {
        matches: ['\u0646\u0631'],
        forms: { final: '\uFC8A' }
    },
    // Ligature NOON WITH YEH
    {
        matches: ['\u0646\u064A'],
        forms: { isolated: '\uFC50', final: '\uFC8F' }
    },
    // Ligature NOON WITH ZAIN
    {
        matches: ['\u0646\u0632'],
        forms: { final: '\uFC8B' }
    },
    // Ligature QAF WITH ALEF MAKSURA
    {
        matches: ['\u0642\u0649'],
        forms: { isolated: '\uFC35', final: '\uFC7E' }
    },
    // Ligature QAF WITH HAH
    {
        matches: ['\u0642\u062D'],
        forms: { isolated: '\uFC33', initial: '\uFCC2' }
    },
    // Ligature QAF WITH MEEM
    {
        matches: ['\u0642\u0645'],
        forms: { isolated: '\uFC34', initial: '\uFCC3' }
    },
    // Ligature QAF WITH MEEM WITH HAH
    {
        matches: ['\u0642\u0645\u062D'],
        forms: { initial: '\uFDB4', final: '\uFD7E' }
    },
    // Ligature QAF WITH MEEM WITH MEEM
    {
        matches: ['\u0642\u0645\u0645'],
        forms: { final: '\uFD7F' }
    },
    // Ligature QAF WITH MEEM WITH YEH
    {
        matches: ['\u0642\u0645\u064A'],
        forms: { final: '\uFDB2' }
    },
    // Ligature QAF WITH YEH
    {
        matches: ['\u0642\u064A'],
        forms: { isolated: '\uFC36', final: '\uFC7F' }
    },
    // Ligature REH WITH SUPERSCRIPT ALEF
    {
        matches: ['\u0631\u0670'],
        forms: { isolated: '\uFC5C' }
    },
    // Ligature SAD WITH ALEF MAKSURA
    {
        matches: ['\u0635\u0649'],
        forms: { isolated: '\uFD05', final: '\uFD21' }
    },
    // Ligature SAD WITH HAH
    {
        matches: ['\u0635\u062D'],
        forms: { isolated: '\uFC20', initial: '\uFCB1' }
    },
    // Ligature SAD WITH HAH WITH HAH
    {
        matches: ['\u0635\u062D\u062D'],
        forms: { initial: '\uFD65', final: '\uFD64' }
    },
    // Ligature SAD WITH HAH WITH YEH
    {
        matches: ['\u0635\u062D\u064A'],
        forms: { final: '\uFDA9' }
    },
    // Ligature SAD WITH KHAH
    {
        matches: ['\u0635\u062E'],
        forms: { initial: '\uFCB2' }
    },
    // Ligature SAD WITH MEEM
    {
        matches: ['\u0635\u0645'],
        forms: { isolated: '\uFC21', initial: '\uFCB3' }
    },
    // Ligature SAD WITH MEEM WITH MEEM
    {
        matches: ['\u0635\u0645\u0645'],
        forms: { initial: '\uFDC5', final: '\uFD66' }
    },
    // Ligature SAD WITH REH
    {
        matches: ['\u0635\u0631'],
        forms: { isolated: '\uFD0F', final: '\uFD2B' }
    },
    // Ligature SAD WITH YEH
    {
        matches: ['\u0635\u064A'],
        forms: { isolated: '\uFD06', final: '\uFD22' }
    },
    // Ligature SEEN WITH ALEF MAKSURA
    {
        matches: ['\u0633\u0649'],
        forms: { isolated: '\uFCFB', final: '\uFD17' }
    },
    // Ligature SEEN WITH HAH
    {
        matches: ['\u0633\u062D'],
        forms: { isolated: '\uFC1D', initial: '\uFCAE', medial: '\uFD35' }
    },
    // Ligature SEEN WITH HAH WITH JEEM
    {
        matches: ['\u0633\u062D\u062C'],
        forms: { initial: '\uFD5C' }
    },
    // Ligature SEEN WITH HEH
    {
        matches: ['\u0633\u0647'],
        forms: { initial: '\uFD31', medial: '\uFCE8' }
    },
    // Ligature SEEN WITH JEEM
    {
        matches: ['\u0633\u062C'],
        forms: { isolated: '\uFC1C', initial: '\uFCAD', medial: '\uFD34' }
    },
    // Ligature SEEN WITH JEEM WITH ALEF MAKSURA
    {
        matches: ['\u0633\u062C\u0649'],
        forms: { final: '\uFD5E' }
    },
    // Ligature SEEN WITH JEEM WITH HAH
    {
        matches: ['\u0633\u062C\u062D'],
        forms: { initial: '\uFD5D' }
    },
    // Ligature SEEN WITH KHAH
    {
        matches: ['\u0633\u062E'],
        forms: { isolated: '\uFC1E', initial: '\uFCAF', medial: '\uFD36' }
    },
    // Ligature SEEN WITH KHAH WITH ALEF MAKSURA
    {
        matches: ['\u0633\u062E\u0649'],
        forms: { final: '\uFDA8' }
    },
    // Ligature SEEN WITH KHAH WITH YEH
    {
        matches: ['\u0633\u062E\u064A'],
        forms: { final: '\uFDC6' }
    },
    // Ligature SEEN WITH MEEM
    {
        matches: ['\u0633\u0645'],
        forms: { isolated: '\uFC1F', initial: '\uFCB0', medial: '\uFCE7' }
    },
    // Ligature SEEN WITH MEEM WITH HAH
    {
        matches: ['\u0633\u0645\u062D'],
        forms: { initial: '\uFD60', final: '\uFD5F' }
    },
    // Ligature SEEN WITH MEEM WITH JEEM
    {
        matches: ['\u0633\u0645\u062C'],
        forms: { initial: '\uFD61' }
    },
    // Ligature SEEN WITH MEEM WITH MEEM
    {
        matches: ['\u0633\u0645\u0645'],
        forms: { initial: '\uFD63', final: '\uFD62' }
    },
    // Ligature SEEN WITH REH
    {
        matches: ['\u0633\u0631'],
        forms: { isolated: '\uFD0E', final: '\uFD2A' }
    },
    // Ligature SEEN WITH YEH
    {
        matches: ['\u0633\u064A'],
        forms: { isolated: '\uFCFC', final: '\uFD18' }
    },
    // Ligature SHADDA WITH DAMMA
    {
        matches: ['\u0640\u064F\u0651'],
        forms: { medial: '\uFCF3' }
    },
    // Ligature SHADDA WITH FATHA
    {
        matches: ['\u0640\u064E\u0651'],
        forms: { medial: '\uFCF2' }
    },
    // Ligature SHADDA WITH KASRA
    {
        matches: ['\u0640\u0650\u0651'],
        forms: { medial: '\uFCF4' }
    },
    // Ligature SHEEN WITH ALEF MAKSURA
    {
        matches: ['\u0634\u0649'],
        forms: { isolated: '\uFCFD', final: '\uFD19' }
    },
    // Ligature SHEEN WITH HAH
    {
        matches: ['\u0634\u062D'],
        forms: { isolated: '\uFD0A', initial: '\uFD2E', medial: '\uFD38', final: '\uFD26' }
    },
    // Ligature SHEEN WITH HAH WITH MEEM
    {
        matches: ['\u0634\u062D\u0645'],
        forms: { initial: '\uFD68', final: '\uFD67' }
    },
    // Ligature SHEEN WITH HAH WITH YEH
    {
        matches: ['\u0634\u062D\u064A'],
        forms: { final: '\uFDAA' }
    },
    // Ligature SHEEN WITH HEH
    {
        matches: ['\u0634\u0647'],
        forms: { initial: '\uFD32', medial: '\uFCEA' }
    },
    // Ligature SHEEN WITH JEEM
    {
        matches: ['\u0634\u062C'],
        forms: { isolated: '\uFD09', initial: '\uFD2D', medial: '\uFD37', final: '\uFD25' }
    },
    // Ligature SHEEN WITH JEEM WITH YEH
    {
        matches: ['\u0634\u062C\u064A'],
        forms: { final: '\uFD69' }
    },
    // Ligature SHEEN WITH KHAH
    {
        matches: ['\u0634\u062E'],
        forms: { isolated: '\uFD0B', initial: '\uFD2F', medial: '\uFD39', final: '\uFD27' }
    },
    // Ligature SHEEN WITH MEEM
    {
        matches: ['\u0634\u0645'],
        forms: { isolated: '\uFD0C', initial: '\uFD30', medial: '\uFCE9', final: '\uFD28' }
    },
    // Ligature SHEEN WITH MEEM WITH KHAH
    {
        matches: ['\u0634\u0645\u062E'],
        forms: { initial: '\uFD6B', final: '\uFD6A' }
    },
    // Ligature SHEEN WITH MEEM WITH MEEM
    {
        matches: ['\u0634\u0645\u0645'],
        forms: { initial: '\uFD6D', final: '\uFD6C' }
    },
    // Ligature SHEEN WITH REH
    {
        matches: ['\u0634\u0631'],
        forms: { isolated: '\uFD0D', final: '\uFD29' }
    },
    // Ligature SHEEN WITH YEH
    {
        matches: ['\u0634\u064A'],
        forms: { isolated: '\uFCFE', final: '\uFD1A' }
    },
    // Ligature TAH WITH ALEF MAKSURA
    {
        matches: ['\u0637\u0649'],
        forms: { isolated: '\uFCF5', final: '\uFD11' }
    },
    // Ligature TAH WITH HAH
    {
        matches: ['\u0637\u062D'],
        forms: { isolated: '\uFC26', initial: '\uFCB8' }
    },
    // Ligature TAH WITH MEEM
    {
        matches: ['\u0637\u0645'],
        forms: { isolated: '\uFC27', initial: '\uFD33', medial: '\uFD3A' }
    },
    // Ligature TAH WITH MEEM WITH HAH
    {
        matches: ['\u0637\u0645\u062D'],
        forms: { initial: '\uFD72', final: '\uFD71' }
    },
    // Ligature TAH WITH MEEM WITH MEEM
    {
        matches: ['\u0637\u0645\u0645'],
        forms: { initial: '\uFD73' }
    },
    // Ligature TAH WITH MEEM WITH YEH
    {
        matches: ['\u0637\u0645\u064A'],
        forms: { final: '\uFD74' }
    },
    // Ligature TAH WITH YEH
    {
        matches: ['\u0637\u064A'],
        forms: { isolated: '\uFCF6', final: '\uFD12' }
    },
    // Ligature TEH WITH ALEF MAKSURA
    {
        matches: ['\u062A\u0649'],
        forms: { isolated: '\uFC0F', final: '\uFC74' }
    },
    // Ligature TEH WITH HAH
    {
        matches: ['\u062A\u062D'],
        forms: { isolated: '\uFC0C', initial: '\uFCA2' }
    },
    // Ligature TEH WITH HAH WITH JEEM
    {
        matches: ['\u062A\u062D\u062C'],
        forms: { initial: '\uFD52', final: '\uFD51' }
    },
    // Ligature TEH WITH HAH WITH MEEM
    {
        matches: ['\u062A\u062D\u0645'],
        forms: { initial: '\uFD53' }
    },
    // Ligature TEH WITH HEH
    {
        matches: ['\u062A\u0647'],
        forms: { initial: '\uFCA5', medial: '\uFCE4' }
    },
    // Ligature TEH WITH JEEM
    {
        matches: ['\u062A\u062C'],
        forms: { isolated: '\uFC0B', initial: '\uFCA1' }
    },
    // Ligature TEH WITH JEEM WITH ALEF MAKSURA
    {
        matches: ['\u062A\u062C\u0649'],
        forms: { final: '\uFDA0' }
    },
    // Ligature TEH WITH JEEM WITH MEEM
    {
        matches: ['\u062A\u062C\u0645'],
        forms: { initial: '\uFD50' }
    },
    // Ligature TEH WITH JEEM WITH YEH
    {
        matches: ['\u062A\u062C\u064A'],
        forms: { final: '\uFD9F' }
    },
    // Ligature TEH WITH KHAH
    {
        matches: ['\u062A\u062E'],
        forms: { isolated: '\uFC0D', initial: '\uFCA3' }
    },
    // Ligature TEH WITH KHAH WITH ALEF MAKSURA
    {
        matches: ['\u062A\u062E\u0649'],
        forms: { final: '\uFDA2' }
    },
    // Ligature TEH WITH KHAH WITH MEEM
    {
        matches: ['\u062A\u062E\u0645'],
        forms: { initial: '\uFD54' }
    },
    // Ligature TEH WITH KHAH WITH YEH
    {
        matches: ['\u062A\u062E\u064A'],
        forms: { final: '\uFDA1' }
    },
    // Ligature TEH WITH MEEM
    {
        matches: ['\u062A\u0645'],
        forms: { isolated: '\uFC0E', initial: '\uFCA4', medial: '\uFCE3', final: '\uFC72' }
    },
    // Ligature TEH WITH MEEM WITH ALEF MAKSURA
    {
        matches: ['\u062A\u0645\u0649'],
        forms: { final: '\uFDA4' }
    },
    // Ligature TEH WITH MEEM WITH HAH
    {
        matches: ['\u062A\u0645\u062D'],
        forms: { initial: '\uFD56' }
    },
    // Ligature TEH WITH MEEM WITH JEEM
    {
        matches: ['\u062A\u0645\u062C'],
        forms: { initial: '\uFD55' }
    },
    // Ligature TEH WITH MEEM WITH KHAH
    {
        matches: ['\u062A\u0645\u062E'],
        forms: { initial: '\uFD57' }
    },
    // Ligature TEH WITH MEEM WITH YEH
    {
        matches: ['\u062A\u0645\u064A'],
        forms: { final: '\uFDA3' }
    },
    // Ligature TEH WITH NOON
    {
        matches: ['\u062A\u0646'],
        forms: { final: '\uFC73' }
    },
    // Ligature TEH WITH REH
    {
        matches: ['\u062A\u0631'],
        forms: { final: '\uFC70' }
    },
    // Ligature TEH WITH YEH
    {
        matches: ['\u062A\u064A'],
        forms: { isolated: '\uFC10', final: '\uFC75' }
    },
    // Ligature TEH WITH ZAIN
    {
        matches: ['\u062A\u0632'],
        forms: { final: '\uFC71' }
    },
    // Ligature THAL WITH SUPERSCRIPT ALEF
    {
        matches: ['\u0630\u0670'],
        forms: { isolated: '\uFC5B' }
    },
    // Ligature THEH WITH ALEF MAKSURA
    {
        matches: ['\u062B\u0649'],
        forms: { isolated: '\uFC13', final: '\uFC7A' }
    },
    // Ligature THEH WITH HEH
    {
        matches: ['\u062B\u0647'],
        forms: { medial: '\uFCE6' }
    },
    // Ligature THEH WITH JEEM
    {
        matches: ['\u062B\u062C'],
        forms: { isolated: '\uFC11' }
    },
    // Ligature THEH WITH MEEM
    {
        matches: ['\u062B\u0645'],
        forms: { isolated: '\uFC12', initial: '\uFCA6', medial: '\uFCE5', final: '\uFC78' }
    },
    // Ligature THEH WITH NOON
    {
        matches: ['\u062B\u0646'],
        forms: { final: '\uFC79' }
    },
    // Ligature THEH WITH REH
    {
        matches: ['\u062B\u0631'],
        forms: { final: '\uFC76' }
    },
    // Ligature THEH WITH YEH
    {
        matches: ['\u062B\u064A'],
        forms: { isolated: '\uFC14', final: '\uFC7B' }
    },
    // Ligature THEH WITH ZAIN
    {
        matches: ['\u062B\u0632'],
        forms: { final: '\uFC77' }
    },
    // Ligature UIGHUR KIRGHIZ YEH WITH HAMZA ABOVE WITH ALEF MAKSURA
    {
        matches: ['\u0626\u0649'],
        forms: { isolated: '\uFBF9', initial: '\uFBFB', final: '\uFBFA' }
    },
    // Ligature YEH WITH ALEF MAKSURA
    {
        matches: ['\u064A\u0649'],
        forms: { isolated: '\uFC59', final: '\uFC95' }
    },
    // Ligature YEH WITH HAH
    {
        matches: ['\u064A\u062D'],
        forms: { isolated: '\uFC56', initial: '\uFCDB' }
    },
    // Ligature YEH WITH HAH WITH YEH
    {
        matches: ['\u064A\u062D\u064A'],
        forms: { final: '\uFDAE' }
    },
    // Ligature YEH WITH HAMZA ABOVE WITH AE
    {
        matches: ['\u0626\u06D5'],
        forms: { isolated: '\uFBEC', final: '\uFBED' }
    },
    // Ligature YEH WITH HAMZA ABOVE WITH ALEF
    {
        matches: ['\u0626\u0627'],
        forms: { isolated: '\uFBEA', final: '\uFBEB' }
    },
    // Ligature YEH WITH HAMZA ABOVE WITH ALEF MAKSURA
    {
        matches: ['\u0626\u0649'],
        forms: { isolated: '\uFC03', final: '\uFC68' }
    },
    // Ligature YEH WITH HAMZA ABOVE WITH E
    {
        matches: ['\u0626\u06D0'],
        forms: { isolated: '\uFBF6', initial: '\uFBF8', final: '\uFBF7' }
    },
    // Ligature YEH WITH HAMZA ABOVE WITH HAH
    {
        matches: ['\u0626\u062D'],
        forms: { isolated: '\uFC01', initial: '\uFC98' }
    },
    // Ligature YEH WITH HAMZA ABOVE WITH HEH
    {
        matches: ['\u0626\u0647'],
        forms: { initial: '\uFC9B', medial: '\uFCE0' }
    },
    // Ligature YEH WITH HAMZA ABOVE WITH JEEM
    {
        matches: ['\u0626\u062C'],
        forms: { isolated: '\uFC00', initial: '\uFC97' }
    },
    // Ligature YEH WITH HAMZA ABOVE WITH KHAH
    {
        matches: ['\u0626\u062E'],
        forms: { initial: '\uFC99' }
    },
    // Ligature YEH WITH HAMZA ABOVE WITH MEEM
    {
        matches: ['\u0626\u0645'],
        forms: { isolated: '\uFC02', initial: '\uFC9A', medial: '\uFCDF', final: '\uFC66' }
    },
    // Ligature YEH WITH HAMZA ABOVE WITH NOON
    {
        matches: ['\u0626\u0646'],
        forms: { final: '\uFC67' }
    },
    // Ligature YEH WITH HAMZA ABOVE WITH OE
    {
        matches: ['\u0626\u06C6'],
        forms: { isolated: '\uFBF2', final: '\uFBF3' }
    },
    // Ligature YEH WITH HAMZA ABOVE WITH REH
    {
        matches: ['\u0626\u0631'],
        forms: { final: '\uFC64' }
    },
    // Ligature YEH WITH HAMZA ABOVE WITH U
    {
        matches: ['\u0626\u06C7'],
        forms: { isolated: '\uFBF0', final: '\uFBF1' }
    },
    // Ligature YEH WITH HAMZA ABOVE WITH WAW
    {
        matches: ['\u0626\u0648'],
        forms: { isolated: '\uFBEE', final: '\uFBEF' }
    },
    // Ligature YEH WITH HAMZA ABOVE WITH YEH
    {
        matches: ['\u0626\u064A'],
        forms: { isolated: '\uFC04', final: '\uFC69' }
    },
    // Ligature YEH WITH HAMZA ABOVE WITH YU
    {
        matches: ['\u0626\u06C8'],
        forms: { isolated: '\uFBF4', final: '\uFBF5' }
    },
    // Ligature YEH WITH HAMZA ABOVE WITH ZAIN
    {
        matches: ['\u0626\u0632'],
        forms: { final: '\uFC65' }
    },
    // Ligature YEH WITH HEH
    {
        matches: ['\u064A\u0647'],
        forms: { initial: '\uFCDE', medial: '\uFCF1' }
    },
    // Ligature YEH WITH JEEM
    {
        matches: ['\u064A\u062C'],
        forms: { isolated: '\uFC55', initial: '\uFCDA' }
    },
    // Ligature YEH WITH JEEM WITH YEH
    {
        matches: ['\u064A\u062C\u064A'],
        forms: { final: '\uFDAF' }
    },
    // Ligature YEH WITH KHAH
    {
        matches: ['\u064A\u062E'],
        forms: { isolated: '\uFC57', initial: '\uFCDC' }
    },
    // Ligature YEH WITH MEEM
    {
        matches: ['\u064A\u0645'],
        forms: { isolated: '\uFC58', initial: '\uFCDD', medial: '\uFCF0', final: '\uFC93' }
    },
    // Ligature YEH WITH MEEM WITH MEEM
    {
        matches: ['\u064A\u0645\u0645'],
        forms: { initial: '\uFD9D', final: '\uFD9C' }
    },
    // Ligature YEH WITH MEEM WITH YEH
    {
        matches: ['\u064A\u0645\u064A'],
        forms: { final: '\uFDB0' }
    },
    // Ligature YEH WITH NOON
    {
        matches: ['\u064A\u0646'],
        forms: { final: '\uFC94' }
    },
    // Ligature YEH WITH REH
    {
        matches: ['\u064A\u0631'],
        forms: { final: '\uFC91' },
    },
    // Ligature YEH WITH YEH
    {
        matches: ['\u064A\u064A'],
        forms: { isolated: '\uFC5A', final: '\uFC96' },
    },
    // Ligature YEH WITH ZAIN
    {
        matches: ['\u064A\u0632'],
        forms: { final: '\uFC92' }
    },
    // Ligature ZAH WITH MEEM
    {
        matches: ['\u0638\u0645'],
        forms: { isolated: '\uFC28', initial: '\uFCB9', medial: '\uFD3B' }
    }
];
exports.LETTERS = {
    // Letter HAMZA
    '\u0621': { isolated: '\uFE80' },
    // Letter ALEF WITH MADDA ABOVE
    '\u0622': { isolated: '\uFE81', final: '\uFE82' },
    // Letter ALEF WITH HAMZA ABOVE
    '\u0623': { isolated: '\uFE83', final: '\uFE84' },
    // Letter WAW WITH HAMZA ABOVE
    '\u0624': { isolated: '\uFE85', final: '\uFE86' },
    // Letter ALEF WITH HAMZA BELOW
    '\u0625': { isolated: '\uFE87', final: '\uFE88' },
    // Letter YEH WITH HAMZA ABOVE
    '\u0626': { isolated: '\uFE89', initial: '\uFE8B', medial: '\uFE8C', final: '\uFE8A' },
    // Letter ALEF
    '\u0627': { isolated: '\uFE8D', final: '\uFE8E' },
    // Letter BEH
    '\u0628': { isolated: '\uFE8F', initial: '\uFE91', medial: '\uFE92', final: '\uFE90' },
    // Letter TEH MARBUTA
    '\u0629': { isolated: '\uFE93', final: '\uFE94' },
    // Letter TEH
    '\u062A': { isolated: '\uFE95', initial: '\uFE97', medial: '\uFE98', final: '\uFE96' },
    // Letter THEH
    '\u062B': { isolated: '\uFE99', initial: '\uFE9B', medial: '\uFE9C', final: '\uFE9A' },
    // Letter JEEM
    '\u062C': { isolated: '\uFE9D', initial: '\uFE9F', medial: '\uFEA0', final: '\uFE9E' },
    // Letter HAH
    '\u062D': { isolated: '\uFEA1', initial: '\uFEA3', medial: '\uFEA4', final: '\uFEA2' },
    // Letter KHAH
    '\u062E': { isolated: '\uFEA5', initial: '\uFEA7', medial: '\uFEA8', final: '\uFEA6' },
    // Letter DAL
    '\u062F': { isolated: '\uFEA9', final: '\uFEAA' },
    // Letter THAL
    '\u0630': { isolated: '\uFEAB', final: '\uFEAC' },
    // Letter REH
    '\u0631': { isolated: '\uFEAD', final: '\uFEAE' },
    // Letter ZAIN
    '\u0632': { isolated: '\uFEAF', final: '\uFEB0' },
    // Letter SEEN
    '\u0633': { isolated: '\uFEB1', initial: '\uFEB3', medial: '\uFEB4', final: '\uFEB2' },
    // Letter SHEEN
    '\u0634': { isolated: '\uFEB5', initial: '\uFEB7', medial: '\uFEB8', final: '\uFEB6' },
    // Letter SAD
    '\u0635': { isolated: '\uFEB9', initial: '\uFEBB', medial: '\uFEBC', final: '\uFEBA' },
    // Letter DAD
    '\u0636': { isolated: '\uFEBD', initial: '\uFEBF', medial: '\uFEC0', final: '\uFEBE' },
    // Letter TAH
    '\u0637': { isolated: '\uFEC1', initial: '\uFEC3', medial: '\uFEC4', final: '\uFEC2' },
    // Letter ZAH
    '\u0638': { isolated: '\uFEC5', initial: '\uFEC7', medial: '\uFEC8', final: '\uFEC6' },
    // Letter AIN
    '\u0639': { isolated: '\uFEC9', initial: '\uFECB', medial: '\uFECC', final: '\uFECA' },
    // Letter GHAIN
    '\u063A': { isolated: '\uFECD', initial: '\uFECF', medial: '\uFED0', final: '\uFECE' },
    // TATWEEL
    '\u0640': { isolated: '\u0640', initial: '\u0640', medial: '\u0640', final: '\u0640' },
    // Letter FEH
    '\u0641': { isolated: '\uFED1', initial: '\uFED3', medial: '\uFED4', final: '\uFED2' },
    // Letter QAF
    '\u0642': { isolated: '\uFED5', initial: '\uFED7', medial: '\uFED8', final: '\uFED6' },
    // Letter KAF
    '\u0643': { isolated: '\uFED9', initial: '\uFEDB', medial: '\uFEDC', final: '\uFEDA' },
    // Letter LAM
    '\u0644': { isolated: '\uFEDD', initial: '\uFEDF', medial: '\uFEE0', final: '\uFEDE' },
    // Letter MEEM
    '\u0645': { isolated: '\uFEE1', initial: '\uFEE3', medial: '\uFEE4', final: '\uFEE2' },
    // Letter NOON
    '\u0646': { isolated: '\uFEE5', initial: '\uFEE7', medial: '\uFEE8', final: '\uFEE6' },
    // Letter HEH
    '\u0647': { isolated: '\uFEE9', initial: '\uFEEB', medial: '\uFEEC', final: '\uFEEA' },
    // Letter WAW
    '\u0648': { isolated: '\uFEED', final: '\uFEEE' },
    // Letter ALEF MAKSURA
    '\u0649': { isolated: '\uFEEF', final: '\uFEF0' },
    // Letter YEH
    '\u064A': { isolated: '\uFEF1', initial: '\uFEF3', medial: '\uFEF4', final: '\uFEF2' },
    // Letter ALEF WASLA
    '\u0671': { isolated: '\uFB50', final: '\uFB51' },
    // Letter U WITH HAMZA ABOVE
    '\u0677': { isolated: '\uFBDD' },
    // Letter TTEH
    '\u0679': { isolated: '\uFB66', initial: '\uFB68', medial: '\uFB69', final: '\uFB67' },
    // Letter TTEHEH
    '\u067A': { isolated: '\uFB5E', initial: '\uFB60', medial: '\uFB61', final: '\uFB5F' },
    // Letter BEEH
    '\u067B': { isolated: '\uFB52', initial: '\uFB54', medial: '\uFB55', final: '\uFB53' },
    // Letter PEH
    '\u067E': { isolated: '\uFB56', initial: '\uFB58', medial: '\uFB59', final: '\uFB57' },
    // Letter TEHEH
    '\u067F': { isolated: '\uFB62', initial: '\uFB64', medial: '\uFB65', final: '\uFB63' },
    // Letter BEHEH
    '\u0680': { isolated: '\uFB5A', initial: '\uFB5C', medial: '\uFB5D', final: '\uFB5B' },
    // Letter NYEH
    '\u0683': { isolated: '\uFB76', initial: '\uFB78', medial: '\uFB79', final: '\uFB77' },
    // Letter DYEH
    '\u0684': { isolated: '\uFB72', initial: '\uFB74', medial: '\uFB75', final: '\uFB73' },
    // Letter TCHEH
    '\u0686': { isolated: '\uFB7A', initial: '\uFB7C', medial: '\uFB7D', final: '\uFB7B' },
    // Letter TCHEHEH
    '\u0687': { isolated: '\uFB7E', initial: '\uFB80', medial: '\uFB81', final: '\uFB7F' },
    // Letter DDAL
    '\u0688': { isolated: '\uFB88', final: '\uFB89' },
    // Letter DAHAL
    '\u068C': { isolated: '\uFB84', final: '\uFB85' },
    // Letter DDAHAL
    '\u068D': { isolated: '\uFB82', final: '\uFB83' },
    // Letter DUL
    '\u068E': { isolated: '\uFB86', final: '\uFB87' },
    // Letter RREH
    '\u0691': { isolated: '\uFB8C', final: '\uFB8D' },
    // Letter JEH
    '\u0698': { isolated: '\uFB8A', final: '\uFB8B' },
    // Letter VEH
    '\u06A4': { isolated: '\uFB6A', initial: '\uFB6C', medial: '\uFB6D', final: '\uFB6B' },
    // Letter PEHEH
    '\u06A6': { isolated: '\uFB6E', initial: '\uFB70', medial: '\uFB71', final: '\uFB6F' },
    // Letter KEHEH
    '\u06A9': { isolated: '\uFB8E', initial: '\uFB90', medial: '\uFB91', final: '\uFB8F' },
    // Letter NG
    '\u06AD': { isolated: '\uFBD3', initial: '\uFBD5', medial: '\uFBD6', final: '\uFBD4' },
    // Letter GAF
    '\u06AF': { isolated: '\uFB92', initial: '\uFB94', medial: '\uFB95', final: '\uFB93' },
    // Letter NGOEH
    '\u06B1': { isolated: '\uFB9A', initial: '\uFB9C', medial: '\uFB9D', final: '\uFB9B' },
    // Letter GUEH
    '\u06B3': { isolated: '\uFB96', initial: '\uFB98', medial: '\uFB99', final: '\uFB97' },
    // Letter NOON GHUNNA
    '\u06BA': { isolated: '\uFB9E', final: '\uFB9F' },
    // Letter RNOON
    '\u06BB': { isolated: '\uFBA0', initial: '\uFBA2', medial: '\uFBA3', final: '\uFBA1' },
    // Letter HEH DOACHASHMEE
    '\u06BE': { isolated: '\uFBAA', initial: '\uFBAC', medial: '\uFBAD', final: '\uFBAB' },
    // Letter HEH WITH YEH ABOVE
    '\u06C0': { isolated: '\uFBA4', final: '\uFBA5' },
    // Letter HEH GOAL
    '\u06C1': { isolated: '\uFBA6', initial: '\uFBA8', medial: '\uFBA9', final: '\uFBA7' },
    // Letter KIRGHIZ OE
    '\u06C5': { isolated: '\uFBE0', final: '\uFBE1' },
    // Letter OE
    '\u06C6': { isolated: '\uFBD9', final: '\uFBDA' },
    // Letter U
    '\u06C7': { isolated: '\uFBD7', final: '\uFBD8' },
    // Letter YU
    '\u06C8': { isolated: '\uFBDB', final: '\uFBDC' },
    // Letter KIRGHIZ YU
    '\u06C9': { isolated: '\uFBE2', final: '\uFBE3' },
    // Letter VE
    '\u06CB': { isolated: '\uFBDE', final: '\uFBDF' },
    // Letter FARSI YEH
    '\u06CC': { isolated: '\uFBFC', initial: '\uFBFE', medial: '\uFBFF', final: '\uFBFD' },
    // Letter E
    '\u06D0': { isolated: '\uFBE4', initial: '\uFBE6', medial: '\uFBE7', final: '\uFBE5' },
    // Letter YEH BARREE
    '\u06D2': { isolated: '\uFBAE', final: '\uFBAF' },
    // Letter YEH BARREE WITH HAMZA ABOVE
    '\u06D3': { isolated: '\uFBB0', final: '\uFBB1' }
};
// accent / vowel marks
var HARAKAT_RE = new RegExp('[\u0610-\u061a\u064b-\u065f\u0670\u06d6-\u06dc\u06df-\u06e8\u06ea-\u06ed\u08d4-\u08e1\u08d4-\u08ed\u08e3-\u08ff]');
function _connects_with_letter_before(letter) {
    if (!exports.LETTERS[letter]) {
        return false;
    }
    var forms = exports.LETTERS[letter];
    return forms.final || forms.medial;
}
function _connects_with_letter_after(letter) {
    if (!exports.LETTERS[letter]) {
        return false;
    }
    var forms = exports.LETTERS[letter];
    return forms.initial || forms.medial;
}
function _connects_with_letters_before_and_after(letter) {
    if (!exports.LETTERS[letter]) {
        return false;
    }
    var forms = exports.LETTERS[letter];
    return forms.medial;
}
/* options
{
delete_harakat: false, // remove short vowel marks?
ligatures: true  // combine multiple letters into longer ligatures?
}
*/
function reshape(text, options) {
    if (!text) {
        return '';
    }
    if (!options) {
        options = {};
    }
    var output = [];
    var LETTER = 0;
    var FORM = 1;
    var NOT_SUPPORTED = -1;
    // harakat and letters
    var delete_harakat = options.delete_harakat || false;
    for (var i = 0; i < text.length; i++) {
        var letter = text[i];
        // handle removing harakat
        if (delete_harakat && HARAKAT_RE.exec(letter)) {
            output.push(['', NOT_SUPPORTED]);
        }
        if (!exports.LETTERS[letter]) {
            // handle non-Arabic letter
            output.push([letter, NOT_SUPPORTED]);
        }
        else if (!output.length) {
            // first Arabic letter - display isolated form
            output.push([letter, 'isolated']);
        }
        else {
            var previous_output = output[output.length - 1];
            if (previous_output[FORM] === NOT_SUPPORTED) {
                // not Arabic before this one
                output.push([letter, 'isolated']);
            }
            else if (!(_connects_with_letter_before(letter))) {
                // this letter doesn't try to connect with previous
                output.push([letter, 'isolated']);
            }
            else if (!(_connects_with_letter_after(previous_output[LETTER]))) {
                // previous letter doesn't try to connect to me
                output.push([letter, 'isolated']);
            }
            else if (previous_output[FORM] === 'final' && !_connects_with_letters_before_and_after(previous_output[LETTER])) {
                // previous letter was final and cannot be medial to connect to me
                output.push([letter, 'isolated']);
            }
            else if (previous_output[FORM] == 'isolated') {
                // previous letter was alone - we can change it to be initial of my phrase
                // for now this letter is the final of the phrase
                output[output.length - 1][1] = 'initial';
                output.push([letter, 'final']);
            }
            else {
                // previous letter can be changed to medial
                // this one can be final
                output[output.length - 1][1] = 'medial';
                output.push([letter, 'final']);
            }
        }
    }
    // ligatures
    if (options.ligatures !== false) {
        for (var x = 0; x < exports.LIGATURES.length; x++) {
            var ligature = exports.LIGATURES[x];
            for (var y = 0; y < ligature.matches.length; y++) {
                var pattern = ligature.matches[y];
                var textFragment = text;
                var textFragmentOffset = 0;
                while (textFragment.indexOf(pattern) > -1) {
                    // determine which ligature form to use
                    var a = textFragment.indexOf(pattern);
                    var start_form = output[a + textFragmentOffset][FORM];
                    var end_form = output[a + textFragmentOffset + pattern.length - 1][FORM];
                    var ligature_form = null;
                    /*
                    +-----------+----------+---------+---------+----------+
                    | a   \   b | ISOLATED | INITIAL | MEDIAL  | FINAL    |
                    +-----------+----------+---------+---------+----------+
                    | ISOLATED  | ISOLATED | INITIAL | INITIAL | ISOLATED |
                    | INITIAL   | ISOLATED | INITIAL | INITIAL | ISOLATED |
                    | MEDIAL    | FINAL    | MEDIAL  | MEDIAL  | FINAL    |
                    | FINAL     | FINAL    | MEDIAL  | MEDIAL  | FINAL    |
                    +-----------+----------+---------+---------+----------+
                    */
                    if (start_form === 'isolated' || start_form === 'initial') {
                        if (end_form === 'isolated' || end_form === 'final') {
                            ligature_form = 'isolated';
                        }
                        else {
                            ligature_form = 'initial';
                        }
                    }
                    else {
                        if (end_form === 'isolated' || end_form === 'final') {
                            ligature_form = 'final';
                        }
                        else {
                            ligature_form = 'medial';
                        }
                    }
                    if (!ligature.forms[ligature_form]) {
                        // this ligature cannot be applied in this location
                        textFragmentOffset += a + 1;
                        textFragment = textFragment.substring(textFragmentOffset);
                        continue;
                    }
                    output[a + textFragmentOffset][0] = ligature.forms[ligature_form];
                    output[a + textFragmentOffset][1] = NOT_SUPPORTED;
                    for (var z = a + textFragmentOffset + 1; z < a + textFragmentOffset + pattern.length; z++) {
                        output[z] = ['', NOT_SUPPORTED];
                    }
                    textFragmentOffset += a + 1;
                    textFragment = textFragment.substring(textFragmentOffset);
                }
            }
        }
    }
    return output.map(function (o) {
        if (o[FORM] === NOT_SUPPORTED && o[LETTER].length) {
            return o[LETTER];
        }
        else if (options.ignoreIsolates && o[FORM] === 'isolated') {
            return o[LETTER] || '';
        }
        else {
            return (exports.LETTERS[o[LETTER]] || {})[o[FORM]] || '';
        }
    }).join('');
}
exports.reshape = reshape;


/***/ }),

/***/ "./src/transform.ts":
/*!**************************!*\
  !*** ./src/transform.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var js_arabic_reshaper_1 = __webpack_require__(/*! ./js-arabic-reshaper */ "./src/js-arabic-reshaper.ts");
var direction_1 = __importDefault(__webpack_require__(/*! direction */ "./node_modules/direction/index.js"));
var reverse_string_1 = __importDefault(__webpack_require__(/*! reverse-string */ "./node_modules/reverse-string/reverse-string.js"));
var fix_arabic_numbers_1 = __importDefault(__webpack_require__(/*! fix-arabic-numbers */ "./node_modules/fix-arabic-numbers/index.js"));
var is_number_1 = __importDefault(__webpack_require__(/*! is-number */ "./node_modules/is-number/index.js"));
var isLTR = function (str) { return direction_1["default"](str) === 'ltr'; };
var isRTL = function (str) { return direction_1["default"](str) === 'rtl'; };
var isNeutral = function (str) { return direction_1["default"](str) === 'neutral'; };
var split = function (str, tokens) {
    var tempChar = tokens[0]; // We can use the first token as a temporary join character
    for (var i = 1; i < tokens.length; i++) {
        str = str.split(tokens[i]).join(tempChar);
    }
    var strArr = str.split(tempChar);
    return strArr;
};
var transform = function (str, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.arabic, arabic = _c === void 0 ? true : _c, _d = _b.spaceHack, spaceHack = _d === void 0 ? false : _d, _e = _b.ligatures, ligatures = _e === void 0 ? false : _e, _f = _b.isolates, isolates = _f === void 0 ? false : _f;
    var neutral = str.split('').filter(function (char) { return isNeutral(char) && !is_number_1["default"](char); });
    var reversed;
    // A single word, no need to split
    if (neutral.length === 0) {
        reversed = isLTR(str) ? str : reverse_string_1["default"](str);
    }
    else {
        reversed = split(str, neutral).map(function (word) {
            if (isLTR(word) || is_number_1["default"](word) || is_number_1["default"](fix_arabic_numbers_1["default"](word))) {
                return word;
            }
            else {
                var reshapedWord = arabic ? js_arabic_reshaper_1.reshape(word, { ligatures: ligatures, ignoreIsolates: !isolates }) : word;
                var reverseWord = reverse_string_1["default"](reshapedWord);
                return reverseWord;
            }
        });
    }
    var transformed;
    if (Array.isArray(reversed)) {
        var merged = reversed.map(function (v, i) { return [v, neutral[i]]; }).reduce(function (a, b) { return a.concat(b); });
        transformed = merged.reverse().join('');
    }
    else {
        transformed = reversed;
    }
    if (spaceHack) {
        transformed = transformed.split('').join('\u200a');
    }
    transformed = transformed.split('\n').reverse().join('\n');
    return transformed;
};
exports["default"] = transform;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RpcmVjdGlvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZml4LWFyYWJpYy1udW1iZXJzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pcy1udW1iZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JldmVyc2Utc3RyaW5nL3JldmVyc2Utc3RyaW5nLmpzIiwid2VicGFjazovLy8uL3NyYy9jb2RlLnRzIiwid2VicGFjazovLy8uL3NyYy9qcy1hcmFiaWMtcmVzaGFwZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyYW5zZm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZZOztBQUVaOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3pCYTs7O0FBR2I7QUFDQTtBQUNBOzs7O0FBSUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNILG1CQUFtQixnQkFBZ0I7QUFDbkM7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLG1CQUFtQixpQkFBaUI7QUFDcEM7QUFDQTtBQUNBOztBQUVBOztBQUVBOzs7O0FBSUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7O0FBSUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOzs7O0FBSUE7O0FBRUE7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7QUN4RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDakJBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQSxnQ0FBZ0MsUUFBUTtBQUN4QztBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJLEtBQTZCO0FBQ2pDO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNyQmE7QUFDYjtBQUNBO0FBQ0EsbUNBQW1DLE1BQU0sNkJBQTZCLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDakcsa0NBQWtDLE1BQU0saUNBQWlDLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDcEcsK0JBQStCLGlFQUFpRSx1QkFBdUIsRUFBRSw0QkFBNEI7QUFDcko7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQWEsNkJBQTZCLDBCQUEwQixhQUFhLEVBQUUscUJBQXFCO0FBQ3hHLGdCQUFnQixxREFBcUQsb0VBQW9FLGFBQWEsRUFBRTtBQUN4SixzQkFBc0Isc0JBQXNCLHFCQUFxQixHQUFHO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QyxrQ0FBa0MsU0FBUztBQUMzQyxrQ0FBa0MsV0FBVyxVQUFVO0FBQ3ZELHlDQUF5QyxjQUFjO0FBQ3ZEO0FBQ0EsNkdBQTZHLE9BQU8sVUFBVTtBQUM5SCxnRkFBZ0YsaUJBQWlCLE9BQU87QUFDeEcsd0RBQXdELGdCQUFnQixRQUFRLE9BQU87QUFDdkYsOENBQThDLGdCQUFnQixnQkFBZ0IsT0FBTztBQUNyRjtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0EsU0FBUyxZQUFZLGFBQWEsT0FBTyxFQUFFLFVBQVUsV0FBVztBQUNoRSxtQ0FBbUMsU0FBUztBQUM1QztBQUNBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLG1CQUFPLENBQUMsdUNBQWE7QUFDdkQsd0JBQXdCLDJCQUEyQjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUMsRUFBRTs7Ozs7Ozs7Ozs7OztBQzFFVTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0Isa0JBQWtCO0FBQ2xDLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0Isc0NBQXNDO0FBQ3RELEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUscUJBQXFCO0FBQ3BDO0FBQ0EsZUFBZSxzQ0FBc0M7QUFDckQ7QUFDQSxlQUFlLHNDQUFzQztBQUNyRDtBQUNBLGVBQWUsc0NBQXNDO0FBQ3JEO0FBQ0EsZUFBZSxzQ0FBc0M7QUFDckQ7QUFDQSxlQUFlLDJFQUEyRTtBQUMxRjtBQUNBLGVBQWUsc0NBQXNDO0FBQ3JEO0FBQ0EsZUFBZSwyRUFBMkU7QUFDMUY7QUFDQSxlQUFlLHNDQUFzQztBQUNyRDtBQUNBLGVBQWUsMkVBQTJFO0FBQzFGO0FBQ0EsZUFBZSwyRUFBMkU7QUFDMUY7QUFDQSxlQUFlLDJFQUEyRTtBQUMxRjtBQUNBLGVBQWUsMkVBQTJFO0FBQzFGO0FBQ0EsZUFBZSwyRUFBMkU7QUFDMUY7QUFDQSxlQUFlLHNDQUFzQztBQUNyRDtBQUNBLGVBQWUsc0NBQXNDO0FBQ3JEO0FBQ0EsZUFBZSxzQ0FBc0M7QUFDckQ7QUFDQSxlQUFlLHNDQUFzQztBQUNyRDtBQUNBLGVBQWUsMkVBQTJFO0FBQzFGO0FBQ0EsZUFBZSwyRUFBMkU7QUFDMUY7QUFDQSxlQUFlLDJFQUEyRTtBQUMxRjtBQUNBLGVBQWUsMkVBQTJFO0FBQzFGO0FBQ0EsZUFBZSwyRUFBMkU7QUFDMUY7QUFDQSxlQUFlLDJFQUEyRTtBQUMxRjtBQUNBLGVBQWUsMkVBQTJFO0FBQzFGO0FBQ0EsZUFBZSwyRUFBMkU7QUFDMUY7QUFDQSxlQUFlLDJFQUEyRTtBQUMxRjtBQUNBLGVBQWUsMkVBQTJFO0FBQzFGO0FBQ0EsZUFBZSwyRUFBMkU7QUFDMUY7QUFDQSxlQUFlLDJFQUEyRTtBQUMxRjtBQUNBLGVBQWUsMkVBQTJFO0FBQzFGO0FBQ0EsZUFBZSwyRUFBMkU7QUFDMUY7QUFDQSxlQUFlLDJFQUEyRTtBQUMxRjtBQUNBLGVBQWUsMkVBQTJFO0FBQzFGO0FBQ0EsZUFBZSxzQ0FBc0M7QUFDckQ7QUFDQSxlQUFlLHNDQUFzQztBQUNyRDtBQUNBLGVBQWUsMkVBQTJFO0FBQzFGO0FBQ0EsZUFBZSxzQ0FBc0M7QUFDckQ7QUFDQSxlQUFlLHFCQUFxQjtBQUNwQztBQUNBLGVBQWUsMkVBQTJFO0FBQzFGO0FBQ0EsZUFBZSwyRUFBMkU7QUFDMUY7QUFDQSxlQUFlLDJFQUEyRTtBQUMxRjtBQUNBLGVBQWUsMkVBQTJFO0FBQzFGO0FBQ0EsZUFBZSwyRUFBMkU7QUFDMUY7QUFDQSxlQUFlLDJFQUEyRTtBQUMxRjtBQUNBLGVBQWUsMkVBQTJFO0FBQzFGO0FBQ0EsZUFBZSwyRUFBMkU7QUFDMUY7QUFDQSxlQUFlLDJFQUEyRTtBQUMxRjtBQUNBLGVBQWUsMkVBQTJFO0FBQzFGO0FBQ0EsZUFBZSxzQ0FBc0M7QUFDckQ7QUFDQSxlQUFlLHNDQUFzQztBQUNyRDtBQUNBLGVBQWUsc0NBQXNDO0FBQ3JEO0FBQ0EsZUFBZSxzQ0FBc0M7QUFDckQ7QUFDQSxlQUFlLHNDQUFzQztBQUNyRDtBQUNBLGVBQWUsc0NBQXNDO0FBQ3JEO0FBQ0EsZUFBZSwyRUFBMkU7QUFDMUY7QUFDQSxlQUFlLDJFQUEyRTtBQUMxRjtBQUNBLGVBQWUsMkVBQTJFO0FBQzFGO0FBQ0EsZUFBZSwyRUFBMkU7QUFDMUY7QUFDQSxlQUFlLDJFQUEyRTtBQUMxRjtBQUNBLGVBQWUsMkVBQTJFO0FBQzFGO0FBQ0EsZUFBZSwyRUFBMkU7QUFDMUY7QUFDQSxlQUFlLHNDQUFzQztBQUNyRDtBQUNBLGVBQWUsMkVBQTJFO0FBQzFGO0FBQ0EsZUFBZSwyRUFBMkU7QUFDMUY7QUFDQSxlQUFlLHNDQUFzQztBQUNyRDtBQUNBLGVBQWUsMkVBQTJFO0FBQzFGO0FBQ0EsZUFBZSxzQ0FBc0M7QUFDckQ7QUFDQSxlQUFlLHNDQUFzQztBQUNyRDtBQUNBLGVBQWUsc0NBQXNDO0FBQ3JEO0FBQ0EsZUFBZSxzQ0FBc0M7QUFDckQ7QUFDQSxlQUFlLHNDQUFzQztBQUNyRDtBQUNBLGVBQWUsc0NBQXNDO0FBQ3JEO0FBQ0EsZUFBZSwyRUFBMkU7QUFDMUY7QUFDQSxlQUFlLDJFQUEyRTtBQUMxRjtBQUNBLGVBQWUsc0NBQXNDO0FBQ3JEO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGlCQUFpQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLDhCQUE4QjtBQUNyRDtBQUNBLDJCQUEyQiw2QkFBNkI7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0REFBNEQsNkNBQTZDO0FBQ3pHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9EO0FBQ3BEO0FBQ0EsS0FBSztBQUNMO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNseERhO0FBQ2I7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQTtBQUNBLDJCQUEyQixtQkFBTyxDQUFDLHlEQUFzQjtBQUN6RCxrQ0FBa0MsbUJBQU8sQ0FBQyxvREFBVztBQUNyRCx1Q0FBdUMsbUJBQU8sQ0FBQyx1RUFBZ0I7QUFDL0QsMkNBQTJDLG1CQUFPLENBQUMsc0VBQW9CO0FBQ3ZFLGtDQUFrQyxtQkFBTyxDQUFDLG9EQUFXO0FBQ3JELDRCQUE0Qiw4Q0FBOEM7QUFDMUUsNEJBQTRCLDhDQUE4QztBQUMxRSxnQ0FBZ0Msa0RBQWtEO0FBQ2xGO0FBQ0EsNkJBQTZCO0FBQzdCLG1CQUFtQixtQkFBbUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CLHdEQUF3RCx5REFBeUQsRUFBRTtBQUNuSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0ZBQWdGLGtEQUFrRDtBQUNsSTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELHdCQUF3QixFQUFFLDBCQUEwQixvQkFBb0IsRUFBRTtBQUM3SDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiY29kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2NvZGUudHNcIik7XG4iLCIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBkaXJlY3Rpb25cblxudmFyIFJUTCA9ICdcXHUwNTkxLVxcdTA3RkZcXHVGQjFELVxcdUZERkRcXHVGRTcwLVxcdUZFRkMnXG52YXIgTFRSID1cbiAgJ0EtWmEtelxcdTAwQzAtXFx1MDBENlxcdTAwRDgtXFx1MDBGNicgK1xuICAnXFx1MDBGOC1cXHUwMkI4XFx1MDMwMC1cXHUwNTkwXFx1MDgwMC1cXHUxRkZGXFx1MjAwRVxcdTJDMDAtXFx1RkIxQycgK1xuICAnXFx1RkUwMC1cXHVGRTZGXFx1RkVGRC1cXHVGRkZGJ1xuXG52YXIgcnRsID0gbmV3IFJlZ0V4cCgnXlteJyArIExUUiArICddKlsnICsgUlRMICsgJ10nKVxudmFyIGx0ciA9IG5ldyBSZWdFeHAoJ15bXicgKyBSVEwgKyAnXSpbJyArIExUUiArICddJylcblxuZnVuY3Rpb24gZGlyZWN0aW9uKHZhbHVlKSB7XG4gIHZhbHVlID0gU3RyaW5nKHZhbHVlIHx8ICcnKVxuXG4gIGlmIChydGwudGVzdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gJ3J0bCdcbiAgfVxuXG4gIGlmIChsdHIudGVzdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gJ2x0cidcbiAgfVxuXG4gIHJldHVybiAnbmV1dHJhbCdcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBzZWFyY2g7XG5leHBvcnRzLmNvbm5lY3QgPSBjb25uZWN0O1xuZXhwb3J0cy5wYXJhbXMgPSBwYXJhbXM7XG5cblxuXG5mdW5jdGlvbiBzZWFyY2godmFsKSB7XG5cbiAgaWYgKCF2YWwpXG4gICAgcmV0dXJuIHZhbDtcblxuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWw7XG5cbiAgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFsID0gZml4KHZhbCk7XG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ29iamVjdCcgJiYgdmFsLmNvbnN0cnVjdG9yID09PSBBcnJheSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YWxbaV0gPSBzZWFyY2godmFsW2ldKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHZhbCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YWxba2V5c1tpXV0gPSBzZWFyY2godmFsW2tleXNbaV1dKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdmFsO1xuXG59XG5cblxuXG5mdW5jdGlvbiBmaXgodmFsKSB7XG5cbiAgcmV0dXJuIFN0cmluZyh2YWwpXG4gICAgICAgICAgLnJlcGxhY2UoL9mgL2csICcwJylcbiAgICAgICAgICAucmVwbGFjZSgv2aEvZywgJzEnKVxuICAgICAgICAgIC5yZXBsYWNlKC/Zoi9nLCAnMicpXG4gICAgICAgICAgLnJlcGxhY2UoL9mjL2csICczJylcbiAgICAgICAgICAucmVwbGFjZSgv2aQvZywgJzQnKVxuICAgICAgICAgIC5yZXBsYWNlKC/ZpS9nLCAnNScpXG4gICAgICAgICAgLnJlcGxhY2UoL9mmL2csICc2JylcbiAgICAgICAgICAucmVwbGFjZSgv2acvZywgJzcnKVxuICAgICAgICAgIC5yZXBsYWNlKC/ZqC9nLCAnOCcpXG4gICAgICAgICAgLnJlcGxhY2UoL9mpL2csICc5JylcbiAgICAgICAgICAucmVwbGFjZSgv2aovZywgJyUnKTtcblxufVxuXG5cblxuZnVuY3Rpb24gY29ubmVjdChyZXEsIHJlcywgbmV4dCkge1xuXG4gIHJlcS5ib2R5ID0gc2VhcmNoKHJlcS5ib2R5KTtcbiAgcmVxLnF1ZXJ5ID0gc2VhcmNoKHJlcS5xdWVyeSk7XG4gIHJlcS5wYXJhbXMgPSBzZWFyY2gocmVxLnBhcmFtcyk7XG5cbiAgbmV4dCgpO1xuXG59XG5cblxuXG5mdW5jdGlvbiBwYXJhbXMocmVxLCByZXMsIG5leHQpIHtcblxuICByZXEucGFyYW1zID0gc2VhcmNoKHJlcS5wYXJhbXMpO1xuXG4gIG5leHQoKTtcblxufVxuIiwiLyohXG4gKiBpcy1udW1iZXIgPGh0dHBzOi8vZ2l0aHViLmNvbS9qb25zY2hsaW5rZXJ0L2lzLW51bWJlcj5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgSm9uIFNjaGxpbmtlcnQuXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG51bSkge1xuICBpZiAodHlwZW9mIG51bSA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gbnVtIC0gbnVtID09PSAwO1xuICB9XG4gIGlmICh0eXBlb2YgbnVtID09PSAnc3RyaW5nJyAmJiBudW0udHJpbSgpICE9PSAnJykge1xuICAgIHJldHVybiBOdW1iZXIuaXNGaW5pdGUgPyBOdW1iZXIuaXNGaW5pdGUoK251bSkgOiBpc0Zpbml0ZSgrbnVtKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuIiwidmFyIHJlZ2V4VW5pY29kZSA9IC8oW1xcMC1cXHUwMkZGXFx1MDM3MC1cXHUxQUFGXFx1MUIwMC1cXHUxREJGXFx1MUUwMC1cXHUyMENGXFx1MjEwMC1cXHVEN0ZGXFx1RTAwMC1cXHVGRTFGXFx1RkUzMC1cXHVGRkZGXXxbXFx1RDgwMC1cXHVEQkZGXVtcXHVEQzAwLVxcdURGRkZdfFtcXHVEODAwLVxcdURCRkZdKD8hW1xcdURDMDAtXFx1REZGRl0pfCg/OlteXFx1RDgwMC1cXHVEQkZGXXxeKVtcXHVEQzAwLVxcdURGRkZdKShbXFx1MDMwMC1cXHUwMzZGXFx1MUFCMC1cXHUxQUZGXFx1MURDMC1cXHUxREZGXFx1MjBEMC1cXHUyMEZGXFx1RkUyMC1cXHVGRTJGXSspL2c7XG52YXIgcmVnZXhBc3RyYWwgPSAvKFtcXHVEODAwLVxcdURCRkZdKShbXFx1REMwMC1cXHVERkZGXSkvZztcblxuZnVuY3Rpb24gcmV2ZXJzZShzdHJpbmcpIHtcblx0aWYgKHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYSBzdHJpbmcnKTtcblx0fVxuXG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlZ2V4VW5pY29kZSwgZnVuY3Rpb24gKCQwLCAkMSwgJDIpIHtcblx0XHRyZXR1cm4gcmV2ZXJzZSgkMikgKyAkMTtcblx0fSkucmVwbGFjZShyZWdleEFzdHJhbCwgJyQyJDEnKTtcblxuXHR2YXIgcmVzdWx0ID0gJyc7XG5cdGZvciAodmFyIGkgPSBzdHJpbmcubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0XHRyZXN1bHQgKz0gc3RyaW5nW2ldO1xuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59XG5cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRtb2R1bGUuZXhwb3J0cyA9IHJldmVyc2U7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG52YXIgX3RoaXMgPSB0aGlzO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciB0cmFuc2Zvcm1fMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi90cmFuc2Zvcm1cIikpO1xuZmlnbWEuc2hvd1VJKF9faHRtbF9fLCB7IHdpZHRoOiA0MDAsIGhlaWdodDogMzAwLCB9KTtcbmZ1bmN0aW9uIGluaXQoKSB7XG4gICAgdmFyIHNlbGVjdGlvbiA9IGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbjtcbiAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBzZWxlY3Rpb25bMF07XG4gICAgICAgIHZhciBkYXRhID0gZWxlbWVudC5nZXRQbHVnaW5EYXRhKFwib3JpZ2luYWwtZGF0YVwiKTtcbiAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgdHlwZTogJ2luaXQnLFxuICAgICAgICAgICAgZGF0YTogZGF0YS5sZW5ndGggPiAwID8gSlNPTi5wYXJzZShkYXRhKSA6IG51bGxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuaW5pdCgpO1xuZmlnbWEudWkub25tZXNzYWdlID0gZnVuY3Rpb24gKG1zZykgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxlY3Rpb24sIGVsZW1lbnQ7XG4gICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgaWYgKCEobXNnLnR5cGUgPT09ICdmaXgtdGV4dCcpKSByZXR1cm4gWzMgLypicmVhayovLCAyXTtcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb24gPSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb247XG4gICAgICAgICAgICAgICAgaWYgKCEoc2VsZWN0aW9uLmxlbmd0aCA+IDApKSByZXR1cm4gWzMgLypicmVhayovLCAyXTtcbiAgICAgICAgICAgICAgICBpZiAoIShzZWxlY3Rpb25bMF0udHlwZSA9PT0gJ1RFWFQnKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgMl07XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IHNlbGVjdGlvblswXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmaWdtYS5sb2FkRm9udEFzeW5jKGVsZW1lbnQuZm9udE5hbWUpXTtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jaGFyYWN0ZXJzID0gdHJhbnNmb3JtXzFbXCJkZWZhdWx0XCJdKG1zZy50ZXh0LCBtc2cub3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5zZXRQbHVnaW5EYXRhKFwib3JpZ2luYWwtZGF0YVwiLCBKU09OLnN0cmluZ2lmeShtc2cpKTtcbiAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDI7XG4gICAgICAgICAgICBjYXNlIDI6IHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgfVxuICAgIH0pO1xufSk7IH07XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8vIFRoaXMgd29yayBpcyBsaWNlbnNlZCB1bmRlciB0aGUgR05VIFB1YmxpYyBMaWNlbnNlIChHUEwpLlxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbi8vIFdyaXR0ZW4gYnkgTmljayBEb2lyb24gKEBtYXBtZWxkKVxuLy8gUG9ydGVkIGZyb20gcHl0aG9uLWFyYWJpYy1yZXNoYXBlciBieSBBYmR1bGxhaCBEaWFiIChtcGNhYmQpXG4vLyBXaGljaCB3YXMgcG9ydGVkIGFuZCB0d2Vha2VkIGZyb20gSmF2YSB0byBQeXRob24sIGZyb20gQmV0dGVyIEFyYWJpYyBSZXNoYXBlclxuLy8gW2h0dHBzOi8vZ2l0aHViLmNvbS9hZ2F3aXNoL0JldHRlci1BcmFiaWMtUmVzaGFwZXIvXVxuZXhwb3J0cy5MSUdBVFVSRVMgPSBbXG4gICAgLy8gU2VudGVuY2VzXG4gICAgLy8gTGlnYXR1cmUgQklTTUlMTEFIIEFSLVJBSE1BTiBBUi1SQUhFRU1cbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFtcbiAgICAgICAgICAgICdcXHUwNjI4XFx1MDYzM1xcdTA2NDVcXHUwMDIwJyxcbiAgICAgICAgICAgICdcXHUwNjI3XFx1MDY0NFxcdTA2NDRcXHUwNjQ3XFx1MDAyMCcsXG4gICAgICAgICAgICAnXFx1MDYyN1xcdTA2NDRcXHUwNjMxXFx1MDYyRFxcdTA2NDVcXHUwNjQ2XFx1MDAyMCcsXG4gICAgICAgICAgICAnXFx1MDYyN1xcdTA2NDRcXHUwNjMxXFx1MDYyRFxcdTA2NEFcXHUwNjQ1J1xuICAgICAgICBdLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZERkQnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIEpBTExBSkFMQUxPVUhPVVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjJDXFx1MDY0NFxcdTAwMjBcXHUwNjJDXFx1MDY0NFxcdTA2MjdcXHUwNjQ0XFx1MDY0NyddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZERkInIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFNBTExBTExBSE9VIEFMQVlIRSBXQVNBTExBTVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogW1xuICAgICAgICAgICAgJ1xcdTA2MzVcXHUwNjQ0XFx1MDY0OVxcdTAwMjAnLFxuICAgICAgICAgICAgJ1xcdTA2MjdcXHUwNjQ0XFx1MDY0NFxcdTA2NDdcXHUwMDIwJyxcbiAgICAgICAgICAgICdcXHUwNjM5XFx1MDY0NFxcdTA2NEFcXHUwNjQ3XFx1MDAyMCcsXG4gICAgICAgICAgICAnXFx1MDY0OFxcdTA2MzNcXHUwNjQ0XFx1MDY0NSdcbiAgICAgICAgXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGREZBJyB9XG4gICAgfSxcbiAgICAvLyBXb3Jkc1xuICAgIC8vIExpZ2F0dXJlIEFMTEFIXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MjdcXHUwNjQ0XFx1MDY0NFxcdTA2NDcnXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGREYyJyB9XG4gICAgfSxcbiAgICAvL0xpZ2F0dXJlIEFLQkFSXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MjNcXHUwNjQzXFx1MDYyOFxcdTA2MzEnXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGREYzJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBBTEFZSEVcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYzOVxcdTA2NDRcXHUwNjRBXFx1MDY0NyddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZERjcnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIE1PSEFNTUFEXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2NDVcXHUwNjJEXFx1MDY0NVxcdTA2MkYnXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGREY0JyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBSQVNPVUxcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYzMVxcdTA2MzNcXHUwNjQ4XFx1MDY0NCddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZERjYnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFNBTEFNXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MzVcXHUwNjQ0XFx1MDYzOVxcdTA2NDUnXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGREY1JyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBTQUxMQVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjM1XFx1MDY0NFxcdTA2NDknXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGREY5JyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBXQVNBTExBTVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjQ4XFx1MDYzM1xcdTA2NDRcXHUwNjQ1J10sXG4gICAgICAgIGZvcm1zOiB7IGlzb2xhdGVkOiAnXFx1RkRGOCcgfVxuICAgIH0sXG4gICAgLy8gUklBTCBTSUdOXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MzFbXFx1MDZDQ1xcdTA2NEFdXFx1MDYyN1xcdTA2NDQnXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGREZDJyB9XG4gICAgfSxcbiAgICAvLyBMZXR0ZXJzXG4gICAgLy8gTGlnYXR1cmUgQUlOIFdJVEggQUxFRiBNQUtTVVJBXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MzlcXHUwNjQ5J10sXG4gICAgICAgIGZvcm1zOiB7IGlzb2xhdGVkOiAnXFx1RkNGNycsIGZpbmFsOiAnXFx1RkQxMycgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgQUlOIFdJVEggSkVFTVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjM5XFx1MDYyQyddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZDMjknLCBpbml0aWFsOiAnXFx1RkNCQScgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgQUlOIFdJVEggSkVFTSBXSVRIIE1FRU1cbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYzOVxcdTA2MkNcXHUwNjQ1J10sXG4gICAgICAgIGZvcm1zOiB7IGluaXRpYWw6ICdcXHVGREM0JywgZmluYWw6ICdcXHVGRDc1JyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBBSU4gV0lUSCBNRUVNXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MzlcXHUwNjQ1J10sXG4gICAgICAgIGZvcm1zOiB7IGlzb2xhdGVkOiAnXFx1RkMyQScsIGluaXRpYWw6ICdcXHVGQ0JCJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBBSU4gV0lUSCBNRUVNIFdJVEggQUxFRiBNQUtTVVJBXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MzlcXHUwNjQ1XFx1MDY0OSddLFxuICAgICAgICBmb3JtczogeyBmaW5hbDogJ1xcdUZENzgnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIEFJTiBXSVRIIE1FRU0gV0lUSCBNRUVNXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MzlcXHUwNjQ1XFx1MDY0NSddLFxuICAgICAgICBmb3JtczogeyBpbml0aWFsOiAnXFx1RkQ3NycsIGZpbmFsOiAnXFx1RkQ3NicgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgQUlOIFdJVEggTUVFTSBXSVRIIFlFSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjM5XFx1MDY0NVxcdTA2NEEnXSxcbiAgICAgICAgZm9ybXM6IHsgZmluYWw6ICdcXHVGREI2JyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBBSU4gV0lUSCBZRUhcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYzOVxcdTA2NEEnXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGQ0Y4JywgZmluYWw6ICdcXHVGRDE0JyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBBTEVGIE1BS1NVUkEgV0lUSCBTVVBFUlNDUklQVCBBTEVGXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2NDlcXHUwNjcwJ10sXG4gICAgICAgIGZvcm1zOiB7IGlzb2xhdGVkOiAnXFx1RkM1RCcsIGZpbmFsOiAnXFx1RkM5MCcgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgQUxFRiBXSVRIIEZBVEhBVEFOXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MjdcXHUwNjRCJ10sXG4gICAgICAgIGZvcm1zOiB7IGlzb2xhdGVkOiAnXFx1RkQzRCcsIGZpbmFsOiAnXFx1RkQzQycgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgQkVIIFdJVEggQUxFRiBNQUtTVVJBXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MjhcXHUwNjQ5J10sXG4gICAgICAgIGZvcm1zOiB7IGlzb2xhdGVkOiAnXFx1RkMwOScsIGZpbmFsOiAnXFx1RkM2RScgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgQkVIIFdJVEggSEFIXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MjhcXHUwNjJEJ10sXG4gICAgICAgIGZvcm1zOiB7IGlzb2xhdGVkOiAnXFx1RkMwNicsIGluaXRpYWw6ICdcXHVGQzlEJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBCRUggV0lUSCBIQUggV0lUSCBZRUhcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYyOFxcdTA2MkRcXHUwNjRBJ10sXG4gICAgICAgIGZvcm1zOiB7IGZpbmFsOiAnXFx1RkRDMicgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgQkVIIFdJVEggSEVIXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MjhcXHUwNjQ3J10sXG4gICAgICAgIGZvcm1zOiB7IGluaXRpYWw6ICdcXHVGQ0EwJywgbWVkaWFsOiAnXFx1RkNFMicgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgQkVIIFdJVEggSkVFTVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjI4XFx1MDYyQyddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZDMDUnLCBpbml0aWFsOiAnXFx1RkM5QycgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgQkVIIFdJVEggS0hBSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjI4XFx1MDYyRSddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZDMDcnLCBpbml0aWFsOiAnXFx1RkM5RScgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgQkVIIFdJVEggS0hBSCBXSVRIIFlFSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjI4XFx1MDYyRVxcdTA2NEEnXSxcbiAgICAgICAgZm9ybXM6IHsgZmluYWw6ICdcXHVGRDlFJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBCRUggV0lUSCBNRUVNXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MjhcXHUwNjQ1J10sXG4gICAgICAgIGZvcm1zOiB7IGlzb2xhdGVkOiAnXFx1RkMwOCcsIGluaXRpYWw6ICdcXHVGQzlGJywgbWVkaWFsOiAnXFx1RkNFMScsIGZpbmFsOiAnXFx1RkM2QycgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgQkVIIFdJVEggTk9PTlxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjI4XFx1MDY0NiddLFxuICAgICAgICBmb3JtczogeyBmaW5hbDogJ1xcdUZDNkQnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIEJFSCBXSVRIIFJFSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjI4XFx1MDYzMSddLFxuICAgICAgICBmb3JtczogeyBmaW5hbDogJ1xcdUZDNkEnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIEFJTiBXSVRIIEFMRUYgTUFLU1VSQVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjM5XFx1MDY0OSddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZDRjcnLCBmaW5hbDogJ1xcdUZEMTMnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIEFJTiBXSVRIIEpFRU1cbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYzOVxcdTA2MkMnXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGQzI5JywgaW5pdGlhbDogJ1xcdUZDQkEnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIEFJTiBXSVRIIEpFRU0gV0lUSCBNRUVNXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MzlcXHUwNjJDXFx1MDY0NSddLFxuICAgICAgICBmb3JtczogeyBpbml0YWw6ICdcXHVGREM0JywgZmluYWw6ICdcXHVGRDc1JyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBBSU4gV0lUSCBNRUVNXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MzlcXHUwNjQ1J10sXG4gICAgICAgIGZvcm1zOiB7IGlzb2xhdGVkOiAnXFx1RkMyQScsIGluaXRpYWw6ICdcXHVGQ0JCJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBBSU4gV0lUSCBNRUVNIFdJVEggQUxFRiBNQUtTVVJBXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MzlcXHUwNjQ1XFx1MDY0OSddLFxuICAgICAgICBmb3JtczogeyBmaW5hbDogJ1xcdUZENzgnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIEFJTiBXSVRIIE1FRU0gV0lUSCBNRUVNXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MzlcXHUwNjQ1XFx1MDY0NSddLFxuICAgICAgICBmb3JtczogeyBpbml0aWFsOiAnXFx1RkQ3NycsIGZpbmFsOiAnXFx1RkQ3NicgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgQUlOIFdJVEggTUVFTSBXSVRIIFlFSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjM5XFx1MDY0NVxcdTA2NEEnXSxcbiAgICAgICAgZm9ybXM6IHsgZmluYWw6ICdcXHVGREI2JyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBBSU4gV0lUSCBZRUhcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYzOVxcdTA2NEEnXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGQ0Y4JywgZmluYWw6ICdcXHVGRDE0JyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBBTEVGIE1BS1NVUkEgV0lUSCBTVVBFUlNDUklQVCBBTEVGXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2NDlcXHUwNjcwJ10sXG4gICAgICAgIGZvcm1zOiB7IGlzb2xhdGVkOiAnXFx1RkM1RCcsIGZpbmFsOiAnXFx1RkM5MCcgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgQUxFRiBXSVRIIEZBVEhBVEFOXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MjdcXHUwNjRCJ10sXG4gICAgICAgIGZvcm1zOiB7IGlzb2xhdGVkOiAnXFx1RkQzRCcsIGZpbmFsOiAnXFx1RkQzQycgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgQkVIIFdJVEggQUxFRiBNQUtTVVJBXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MjhcXHUwNjQ5J10sXG4gICAgICAgIGZvcm1zOiB7IGlzb2xhdGVkOiAnXFx1RkMwOScsIGZpbmFsOiAnXFx1RkM2RScgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgQkVIIFdJVEggSEFIXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MjhcXHUwNjJEJ10sXG4gICAgICAgIGZvcm1zOiB7IGlzb2xhdGVkOiAnXFx1RkMwNicsIGluaXRpYWw6ICdcXHVGQzlEJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBCRUggV0lUSCBIQUggV0lUSCBZRUhcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYyOFxcdTA2MkRcXHUwNjRBJ10sXG4gICAgICAgIGZvcm1zOiB7IGZpbmFsOiAnXFx1RkRDMicgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgQkVIIFdJVEggSEVIXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MjhcXHUwNjQ3J10sXG4gICAgICAgIGZvcm1zOiB7IGluaXRpYWw6ICdcXHVGQ0EwJywgbWVkaWFsOiAnXFx1RkNFMicgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgQkVIIFdJVEggSkVFTVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjI4XFx1MDYyQyddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZDMDUnLCBpbml0aWFsOiAnXFx1RkM5QycgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgQkVIIFdJVEggS0hBSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjI4XFx1MDYyRSddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZDMDcnLCBpbml0aWFsOiAnXFx1RkM5RScgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgQkVIIFdJVEggS0hBSCBXSVRIIFlFSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjI4XFx1MDYyRVxcdTA2NEEnXSxcbiAgICAgICAgZm9ybXM6IHsgZmluYWw6ICdcXHVGRDlFJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBCRUggV0lUSCBNRUVNXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MjhcXHUwNjQ1J10sXG4gICAgICAgIGZvcm1zOiB7IGlzb2xhdGVkOiAnXFx1RkMwOCcsIGluaXRpYWw6ICdcXHVGQzlGJywgbWVkaWFsOiAnXFx1RkNFMScsIGZpbmFsOiAnXFx1RkM2QycgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgQkVIIFdJVEggTk9PTlxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjI4XFx1MDY0NiddLFxuICAgICAgICBmb3JtczogeyBmaW5hbDogJ1xcdUZDNkQnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIEJFSCBXSVRIIFJFSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjI4XFx1MDYzMSddLFxuICAgICAgICBmb3JtczogeyBmaW5hbDogJ1xcdUZDNkEnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIEJFSCBXSVRIIFlFSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjI4XFx1MDY0QSddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZDMEEnLCBmaW5hbDogJ1xcdUZDNkYnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIEJFSCBXSVRIIFpBSU5cbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYyOFxcdTA2MzInXSxcbiAgICAgICAgZm9ybXM6IHsgZmluYWw6ICdcXHVGQzZCJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBEQUQgV0lUSCBBTEVGIE1BS1NVUkFcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYzNlxcdTA2NDknXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGRDA3JywgZmluYWw6ICdcXHVGRDIzJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBEQUQgV0lUSCBIQUhcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYzNlxcdTA2MkQnXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGQzIzJywgaW5pdGlhbDogJ1xcdUZDQjUnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIERBRCBXSVRIIEhBSCBXSVRIIEFMRUYgTUFLU1VSQVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjM2XFx1MDYyRFxcdTA2NDknXSxcbiAgICAgICAgZm9ybXM6IHsgZmluYWw6ICdcXHVGRDZFJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBEQUQgV0lUSCBIQUggV0lUSCBZRUhcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYzNlxcdTA2MkRcXHUwNjRBJ10sXG4gICAgICAgIGZvcm1zOiB7IGZpbmFsOiAnXFx1RkRBQicgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgREFEIFdJVEggSkVFTVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjM2XFx1MDYyQyddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZDMjInLCBpbml0aWFsOiAnXFx1RkNCNCcgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgREFEIFdJVEggS0hBSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjM2XFx1MDYyRSddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZDMjQnLCBpbml0aWFsOiAnXFx1RkNCNicgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgREFEIFdJVEggS0hBSCBXSVRIIE1FRU1cbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYzNlxcdTA2MkVcXHUwNjQ1J10sXG4gICAgICAgIGZvcm1zOiB7IGluaXRpYWw6ICdcXHVGRDcwJywgZmluYWw6ICdcXHVGRDZGJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBEQUQgV0lUSCBNRUVNXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MzZcXHUwNjQ1J10sXG4gICAgICAgIGZvcm1zOiB7IGlzb2xhdGVkOiAnXFx1RkMyNScsIGluaXRpYWw6ICdcXHVGQ0I3JyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBEQUQgV0lUSCBSRUhcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYzNlxcdTA2MzEnXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGRDEwJywgZmluYWw6ICdcXHVGRDJDJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBEQUQgV0lUSCBZRUhcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYzNlxcdTA2NEEnXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGRDA4JywgZmluYWw6ICdcXHVGRDI0JyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBGRUggV0lUSCBBTEVGIE1BS1NVUkFcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDY0MVxcdTA2NDknXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGQzMxJywgZmluYWw6ICdcXHVGQzdDJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBGRUggV0lUSCBIQUhcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDY0MVxcdTA2MkQnXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGQzJFJywgaW5pdGlhbDogJ1xcdUZDQkYnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIEZFSCBXSVRIIEpFRU1cbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDY0MVxcdTA2MkMnXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGQzJEJywgaW5pdGlhbDogJ1xcdUZDQkUnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIEZFSCBXSVRIIEtIQUhcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDY0MVxcdTA2MkUnXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGQzJGJywgaW5pdGlhbDogJ1xcdUZDQzAnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIEZFSCBXSVRIIEtIQUggV0lUSCBNRUVNXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2NDFcXHUwNjJFXFx1MDY0NSddLFxuICAgICAgICBmb3JtczogeyBpbml0aWFsOiAnXFx1RkQ3RCcsIGZpbmFsOiAnXFx1RkQ3QycgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgRkVIIFdJVEggTUVFTVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjQxXFx1MDY0NSddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZDMzAnLCBpbml0aWFsOiAnXFx1RkNDMScgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgRkVIIFdJVEggTUVFTSBXSVRIIFlFSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjQxXFx1MDY0NVxcdTA2NEEnXSxcbiAgICAgICAgZm9ybXM6IHsgZmluYWw6ICdcXHVGREMxJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBGRUggV0lUSCBZRUhcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDY0MVxcdTA2NEEnXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGQzMyJywgZmluYWw6ICdcXHVGQzdEJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBHSEFJTiBXSVRIIEFMRUYgTUFLU1VSQVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjNBXFx1MDY0OSddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZDRjknLCBmaW5hbDogJ1xcdUZEMTUnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIEdIQUlOIFdJVEggSkVFTVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjNBXFx1MDYyQyddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZDMkInLCBpbml0aWFsOiAnXFx1RkNCQycgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgR0hBSU4gV0lUSCBNRUVNXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2M0FcXHUwNjQ1J10sXG4gICAgICAgIGZvcm1zOiB7IGlzb2xhdGVkOiAnXFx1RkMyQycsIGluaXRpYWw6ICdcXHVGQ0JEJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBHSEFJTiBXSVRIIE1FRU0gV0lUSCBBTEVGIE1BS1NVUkFcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYzQVxcdTA2NDVcXHUwNjQ5J10sXG4gICAgICAgIGZvcm1zOiB7IGZpbmFsOiAnXFx1RkQ3QicgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgR0hBSU4gV0lUSCBNRUVNIFdJVEggTUVFTVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjNBXFx1MDY0NVxcdTA2NDUnXSxcbiAgICAgICAgZm9ybXM6IHsgZmluYWw6ICdcXHVGRDc5JyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBHSEFJTiBXSVRIIE1FRU0gV0lUSCBZRUhcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYzQVxcdTA2NDVcXHUwNjRBJ10sXG4gICAgICAgIGZvcm1zOiB7IGZpbmFsOiAnXFx1RkQ3QScgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgR0hBSU4gV0lUSCBZRUhcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYzQVxcdTA2NEEnXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGQ0ZBJywgZmluYWw6ICdcXHVGRDE2JyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBIQUggV0lUSCBBTEVGIE1BS1NVUkFcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYyRFxcdTA2NDknXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGQ0ZGJywgZmluYWw6ICdcXHVGRDFCJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBIQUggV0lUSCBKRUVNXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MkRcXHUwNjJDJ10sXG4gICAgICAgIGZvcm1zOiB7IGlzb2xhdGVkOiAnXFx1RkMxNycsIGluaXRpYWw6ICdcXHVGQ0E5JyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBIQUggV0lUSCBKRUVNIFdJVEggWUVIXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MkRcXHUwNjJDXFx1MDY0QSddLFxuICAgICAgICBmb3JtczogeyBmaW5hbDogJ1xcdUZEQkYnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIEhBSCBXSVRIIE1FRU1cbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYyRFxcdTA2NDUnXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGQzE4JywgaW5pdGlhbDogJ1xcdUZDQUEnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIEhBSCBXSVRIIE1FRU0gV0lUSCBBTEVGIE1BS1NVUkFcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYyRFxcdTA2NDVcXHUwNjQ5J10sXG4gICAgICAgIGZvcm1zOiB7IGZpbmFsOiAnXFx1RkQ1QicgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgSEFIIFdJVEggTUVFTSBXSVRIIFlFSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjJEXFx1MDY0NVxcdTA2NEEnXSxcbiAgICAgICAgZm9ybXM6IHsgZmluYWw6ICdcXHVGRDVBJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBIQUggV0lUSCBZRUhcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYyRFxcdTA2NEEnXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGRDAwJywgZmluYWw6ICdcXHVGRDFDJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBIRUggV0lUSCBBTEVGIE1BS1NVUkFcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDY0N1xcdTA2NDknXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGQzUzJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBIRUggV0lUSCBKRUVNXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2NDdcXHUwNjJDJ10sXG4gICAgICAgIGZvcm1zOiB7IGlzb2xhdGVkOiAnXFx1RkM1MScsIGluaXRpYWw6ICdcXHVGQ0Q3JyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBIRUggV0lUSCBNRUVNXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2NDdcXHUwNjQ1J10sXG4gICAgICAgIGZvcm1zOiB7IGlzb2xhdGVkOiAnXFx1RkM1MicsIGluaXRpYWw6ICdcXHVGQ0Q4JyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBIRUggV0lUSCBNRUVNIFdJVEggSkVFTVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjQ3XFx1MDY0NVxcdTA2MkMnXSxcbiAgICAgICAgZm9ybXM6IHsgaW5pdGlhbDogJ1xcdUZEOTMnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIEhFSCBXSVRIIE1FRU0gV0lUSCBNRUVNXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2NDdcXHUwNjQ1XFx1MDY0NSddLFxuICAgICAgICBmb3JtczogeyBpbml0aWFsOiAnXFx1RkQ5NCcgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgSEVIIFdJVEggU1VQRVJTQ1JJUFQgQUxFRlxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjQ3XFx1MDY3MCddLFxuICAgICAgICBmb3JtczogeyBpbml0aWFsOiAnXFx1RkNEOScgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgSEVIIFdJVEggWUVIXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2NDdcXHUwNjRBJ10sXG4gICAgICAgIGZvcm1zOiB7IGlzb2xhdGVkOiAnXFx1RkM1NCcgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgSkVFTSBXSVRIIEFMRUYgTUFLU1VSQVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjJDXFx1MDY0OSddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZEMDEnLCBmaW5hbDogJ1xcdUZEMUQnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIEpFRU0gV0lUSCBIQUhcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYyQ1xcdTA2MkQnXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGQzE1JywgaW5pdGlhbDogJ1xcdUZDQTcnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIEpFRU0gV0lUSCBIQUggV0lUSCBBTEVGIE1BS1NVUkFcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYyQ1xcdTA2MkRcXHUwNjQ5J10sXG4gICAgICAgIGZvcm1zOiB7IGZpbmFsOiAnXFx1RkRBNicgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgSkVFTSBXSVRIIEhBSCBXSVRIIFlFSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjJDXFx1MDYyRFxcdTA2NEEnXSxcbiAgICAgICAgZm9ybXM6IHsgZmluYWw6ICdcXHVGREJFJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBKRUVNIFdJVEggTUVFTVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjJDXFx1MDY0NSddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZDMTYnLCBpbml0aWFsOiAnXFx1RkNBOCcgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgSkVFTSBXSVRIIE1FRU0gV0lUSCBBTEVGIE1BS1NVUkFcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYyQ1xcdTA2NDVcXHUwNjQ5J10sXG4gICAgICAgIGZvcm1zOiB7IGZpbmFsOiAnXFx1RkRBNycgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgSkVFTSBXSVRIIE1FRU0gV0lUSCBIQUhcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYyQ1xcdTA2NDVcXHUwNjJEJ10sXG4gICAgICAgIGZvcm1zOiB7IGluaXRpYWw6ICdcXHVGRDU5JywgZmluYWw6ICdcXHVGRDU4JyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBKRUVNIFdJVEggTUVFTSBXSVRIIFlFSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjJDXFx1MDY0NVxcdTA2NEEnXSxcbiAgICAgICAgZm9ybXM6IHsgZmluYWw6ICdcXHVGREE1JyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBKRUVNIFdJVEggWUVIXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MkNcXHUwNjRBJ10sXG4gICAgICAgIGZvcm1zOiB7IGlzb2xhdGVkOiAnXFx1RkQwMicsIGZpbmFsOiAnXFx1RkQxRScgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgS0FGIFdJVEggQUxFRlxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjQzXFx1MDYyNyddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZDMzcnLCBmaW5hbDogJ1xcdUZDODAnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIEtBRiBXSVRIIEFMRUYgTUFLU1VSQVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjQzXFx1MDY0OSddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZDM0QnLCBmaW5hbDogJ1xcdUZDODMnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIEtBRiBXSVRIIEhBSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjQzXFx1MDYyRCddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZDMzknLCBpbml0aWFsOiAnXFx1RkNDNScgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgS0FGIFdJVEggSkVFTVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjQzXFx1MDYyQyddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZDMzgnLCBpbml0aWFsOiAnXFx1RkNDNCcgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgS0FGIFdJVEggS0hBSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjQzXFx1MDYyRSddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZDM0EnLCBpbml0aWFsOiAnXFx1RkNDNicgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgS0FGIFdJVEggTEFNXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2NDNcXHUwNjQ0J10sXG4gICAgICAgIGZvcm1zOiB7IGlzb2xhdGVkOiAnXFx1RkMzQicsIGluaXRpYWw6ICdcXHVGQ0M3JywgbWVkaWFsOiAnXFx1RkNFQicsIGZpbmFsOiAnXFx1RkM4MScgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgS0FGIFdJVEggTUVFTVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjQzXFx1MDY0NSddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZDM0MnLCBpbml0aWFsOiAnXFx1RkNDOCcsIG1lZGlhbDogJ1xcdUZDRUMnLCBmaW5hbDogJ1xcdUZDODInIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIEtBRiBXSVRIIE1FRU0gV0lUSCBNRUVNXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2NDNcXHUwNjQ1XFx1MDY0NSddLFxuICAgICAgICBmb3JtczogeyBpbml0aWFsOiAnXFx1RkRDMycsIGZpbmFsOiAnXFx1RkRCQicgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgS0FGIFdJVEggTUVFTSBXSVRIIFlFSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjQzXFx1MDY0NVxcdTA2NEEnXSxcbiAgICAgICAgZm9ybXM6IHsgZmluYWw6ICdcXHVGREI3JyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBLQUYgV0lUSCBZRUhcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDY0M1xcdTA2NEEnXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGQzNFJywgZmluYWw6ICdcXHVGQzg0JyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBLSEFIIFdJVEggQUxFRiBNQUtTVVJBXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MkVcXHUwNjQ5J10sXG4gICAgICAgIGZvcm1zOiB7IGlzb2xhdGVkOiAnXFx1RkQwMycsIGZpbmFsOiAnXFx1RkQxRicgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgS0hBSCBXSVRIIEhBSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjJFXFx1MDYyRCddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZDMUEnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIEtIQUggV0lUSCBKRUVNXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MkVcXHUwNjJDJ10sXG4gICAgICAgIGZvcm1zOiB7IGlzb2xhdGVkOiAnXFx1RkMxOScsIGluaXRpYWw6ICdcXHVGQ0FCJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBLSEFIIFdJVEggTUVFTVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjJFXFx1MDY0NSddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZDMUInLCBpbml0aWFsOiAnXFx1RkNBQycgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgS0hBSCBXSVRIIFlFSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjJFXFx1MDY0QSddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZEMDQnLCBmaW5hbDogJ1xcdUZEMjAnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIExBTSBXSVRIIEFMRUZcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDY0NFxcdTA2MjcnXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGRUZCJywgZmluYWw6ICdcXHVGRUZDJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBMQU0gV0lUSCBBTEVGIE1BS1NVUkFcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDY0NFxcdTA2NDknXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGQzQzJywgZmluYWw6ICdcXHVGQzg2JyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBMQU0gV0lUSCBBTEVGIFdJVEggSEFNWkEgQUJPVkVcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDY0NFxcdTA2MjMnXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGRUY3JywgZmluYWw6ICdcXHVGRUY4JyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBMQU0gV0lUSCBBTEVGIFdJVEggSEFNWkEgQkVMT1dcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDY0NFxcdTA2MjUnXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGRUY5JywgZmluYWw6ICdcXHVGRUZBJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBMQU0gV0lUSCBBTEVGIFdJVEggTUFEREEgQUJPVkVcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDY0NFxcdTA2MjInXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGRUY1JywgZmluYWw6ICdcXHVGRUY2JyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBMQU0gV0lUSCBIQUhcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDY0NFxcdTA2MkQnXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGQzQwJywgaW5pdGlhbDogJ1xcdUZDQ0EnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIExBTSBXSVRIIEhBSCBXSVRIIEFMRUYgTUFLU1VSQVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjQ0XFx1MDYyRFxcdTA2NDknXSxcbiAgICAgICAgZm9ybXM6IHsgZmluYWw6ICdcXHVGRDgyJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBMQU0gV0lUSCBIQUggV0lUSCBNRUVNXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2NDRcXHUwNjJEXFx1MDY0NSddLFxuICAgICAgICBmb3JtczogeyBpbml0aWFsOiAnXFx1RkRCNScsIGZpbmFsOiAnXFx1RkQ4MCcgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgTEFNIFdJVEggSEFIIFdJVEggWUVIXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2NDRcXHUwNjJEXFx1MDY0QSddLFxuICAgICAgICBmb3JtczogeyBmaW5hbDogJ1xcdUZEODEnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIExBTSBXSVRIIEhFSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjQ0XFx1MDY0NyddLFxuICAgICAgICBmb3JtczogeyBpbml0aWFsOiAnXFx1RkNDRCcgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgTEFNIFdJVEggSkVFTVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjQ0XFx1MDYyQyddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZDM0YnLCBpbml0aWFsOiAnXFx1RkNDOScgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgTEFNIFdJVEggSkVFTSBXSVRIIEpFRU1cbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDY0NFxcdTA2MkNcXHUwNjJDJ10sXG4gICAgICAgIGZvcm1zOiB7IGluaXRpYWw6ICdcXHVGRDgzJywgZmluYWw6ICdcXHVGRDg0JyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBMQU0gV0lUSCBKRUVNIFdJVEggTUVFTVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjQ0XFx1MDYyQ1xcdTA2NDUnXSxcbiAgICAgICAgZm9ybXM6IHsgaW5pdGlhbDogJ1xcdUZEQkEnLCBmaW5hbDogJ1xcdUZEQkMnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIExBTSBXSVRIIEpFRU0gV0lUSCBZRUhcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDY0NFxcdTA2MkNcXHUwNjRBJ10sXG4gICAgICAgIGZvcm1zOiB7IGZpbmFsOiAnXFx1RkRBQycgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgTEFNIFdJVEggS0hBSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjQ0XFx1MDYyRSddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZDNDEnLCBpbml0aWFsOiAnXFx1RkNDQicgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgTEFNIFdJVEggS0hBSCBXSVRIIE1FRU1cbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDY0NFxcdTA2MkVcXHUwNjQ1J10sXG4gICAgICAgIGZvcm1zOiB7IGluaXRpYWw6ICdcXHVGRDg2JywgZmluYWw6ICdcXHVGRDg1JyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBMQU0gV0lUSCBNRUVNXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2NDRcXHUwNjQ1J10sXG4gICAgICAgIGZvcm1zOiB7IGlzb2xhdGVkOiAnXFx1RkM0MicsIGluaXRpYWw6ICdcXHVGQ0NDJywgbWVkaWFsOiAnXFx1RkNFRCcsIGZpbmFsOiAnXFx1RkM4NScgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgTEFNIFdJVEggTUVFTSBXSVRIIEhBSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjQ0XFx1MDY0NVxcdTA2MkQnXSxcbiAgICAgICAgZm9ybXM6IHsgaW5pdGlhbDogJ1xcdUZEODgnLCBmaW5hbDogJ1xcdUZEODcnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIExBTSBXSVRIIE1FRU0gV0lUSCBZRUhcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDY0NFxcdTA2NDVcXHUwNjRBJ10sXG4gICAgICAgIGZvcm1zOiB7IGZpbmFsOiAnXFx1RkRBRCcgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgTEFNIFdJVEggWUVIXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2NDRcXHUwNjRBJ10sXG4gICAgICAgIGZvcm1zOiB7IGlzb2xhdGVkOiAnXFx1RkM0NCcsIGZpbmFsOiAnXFx1RkM4NycgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgTUVFTSBXSVRIIEFMRUZcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDY0NVxcdTA2MjcnXSxcbiAgICAgICAgZm9ybXM6IHsgZmluYWw6ICdcXHVGQzg4JyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBNRUVNIFdJVEggQUxFRiBNQUtTVVJBXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2NDVcXHUwNjQ5J10sXG4gICAgICAgIGZvcm1zOiB7IGlzb2xhdGVkOiAnXFx1RkM0OScgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgTUVFTSBXSVRIIEhBSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjQ1XFx1MDYyRCddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZDNDYnLCBpbml0aWFsOiAnXFx1RkNDRicgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgTUVFTSBXSVRIIEhBSCBXSVRIIEpFRU1cbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDY0NVxcdTA2MkRcXHUwNjJDJ10sXG4gICAgICAgIGZvcm1zOiB7IGluaXRpYWw6ICdcXHVGRDg5JyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBNRUVNIFdJVEggSEFIIFdJVEggTUVFTVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjQ1XFx1MDYyRFxcdTA2NDUnXSxcbiAgICAgICAgZm9ybXM6IHsgaW5pdGlhbDogJ1xcdUZEOEEnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIE1FRU0gV0lUSCBIQUggV0lUSCBZRUhcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDY0NVxcdTA2MkRcXHUwNjRBJ10sXG4gICAgICAgIGZvcm1zOiB7IGZpbmFsOiAnXFx1RkQ4QicgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgTUVFTSBXSVRIIEpFRU1cbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDY0NVxcdTA2MkMnXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGQzQ1JywgaW5pdGlhbDogJ1xcdUZDQ0UnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIE1FRU0gV0lUSCBKRUVNIFdJVEggSEFIXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2NDVcXHUwNjJDXFx1MDYyRCddLFxuICAgICAgICBmb3JtczogeyBpbml0aWFsOiAnXFx1RkQ4QycgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgTUVFTSBXSVRIIEpFRU0gV0lUSCBLSEFIXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2NDVcXHUwNjJDXFx1MDYyRSddLFxuICAgICAgICBmb3JtczogeyBpbml0aWFsOiAnXFx1RkQ5MicgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgTUVFTSBXSVRIIEpFRU0gV0lUSCBNRUVNXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2NDVcXHUwNjJDXFx1MDY0NSddLFxuICAgICAgICBmb3JtczogeyBpbml0aWFsOiAnXFx1RkQ4RCcgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgTUVFTSBXSVRIIEpFRU0gV0lUSCBZRUhcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDY0NVxcdTA2MkNcXHUwNjRBJ10sXG4gICAgICAgIGZvcm1zOiB7IGZpbmFsOiAnXFx1RkRDMCcgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgTUVFTSBXSVRIIEtIQUhcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDY0NVxcdTA2MkUnXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGQzQ3JywgaW5pdGlhbDogJ1xcdUZDRDAnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIE1FRU0gV0lUSCBLSEFIIFdJVEggSkVFTVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjQ1XFx1MDYyRVxcdTA2MkMnXSxcbiAgICAgICAgZm9ybXM6IHsgaW5pdGlhbDogJ1xcdUZEOEUnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIE1FRU0gV0lUSCBLSEFIIFdJVEggTUVFTVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjQ1XFx1MDYyRVxcdTA2NDUnXSxcbiAgICAgICAgZm9ybXM6IHsgaW5pdGlhbDogJ1xcdUZEOEYnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIE1FRU0gV0lUSCBLSEFIIFdJVEggWUVIXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2NDVcXHUwNjJFXFx1MDY0QSddLFxuICAgICAgICBmb3JtczogeyBmaW5hbDogJ1xcdUZEQjknIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIE1FRU0gV0lUSCBNRUVNXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2NDVcXHUwNjQ1J10sXG4gICAgICAgIGZvcm1zOiB7IGlzb2xhdGVkOiAnXFx1RkM0OCcsIGluaXRpYWw6ICdcXHVGQ0QxJywgZmluYWw6ICdcXHVGQzg5JyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBNRUVNIFdJVEggTUVFTSBXSVRIIFlFSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjQ1XFx1MDY0NVxcdTA2NEEnXSxcbiAgICAgICAgZm9ybXM6IHsgZmluYWw6ICdcXHVGREIxJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBNRUVNIFdJVEggWUVIXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2NDVcXHUwNjRBJ10sXG4gICAgICAgIGZvcm1zOiB7IGlzb2xhdGVkOiAnXFx1RkM0QScgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgTk9PTiBXSVRIIEFMRUYgTUFLU1VSQVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjQ2XFx1MDY0OSddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZDNEYnLCBmaW5hbDogJ1xcdUZDOEUnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIE5PT04gV0lUSCBIQUhcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDY0NlxcdTA2MkQnXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGQzRDJywgaW5pdGlhbDogJ1xcdUZDRDMnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIE5PT04gV0lUSCBIQUggV0lUSCBBTEVGIE1BS1NVUkFcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDY0NlxcdTA2MkRcXHUwNjQ5J10sXG4gICAgICAgIGZvcm1zOiB7IGZpbmFsOiAnXFx1RkQ5NicgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgTk9PTiBXSVRIIEhBSCBXSVRIIE1FRU1cbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDY0NlxcdTA2MkRcXHUwNjQ1J10sXG4gICAgICAgIGZvcm1zOiB7IGluaXRpYWw6ICdcXHVGRDk1JyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBOT09OIFdJVEggSEFIIFdJVEggWUVIXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2NDZcXHUwNjJEXFx1MDY0QSddLFxuICAgICAgICBmb3JtczogeyBmaW5hbDogJ1xcdUZEQjMnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIE5PT04gV0lUSCBIRUhcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDY0NlxcdTA2NDcnXSxcbiAgICAgICAgZm9ybXM6IHsgaW5pdGlhbDogJ1xcdUZDRDYnLCBtZWRpYWw6ICdcXHVGQ0VGJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBOT09OIFdJVEggSkVFTVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjQ2XFx1MDYyQyddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZDNEInLCBpbml0aWFsOiAnXFx1RkNEMicgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgTk9PTiBXSVRIIEpFRU0gV0lUSCBBTEVGIE1BS1NVUkFcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDY0NlxcdTA2MkNcXHUwNjQ5J10sXG4gICAgICAgIGZvcm1zOiB7IGZpbmFsOiAnXFx1RkQ5OScgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgTk9PTiBXSVRIIEpFRU0gV0lUSCBIQUhcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDY0NlxcdTA2MkNcXHUwNjJEJ10sXG4gICAgICAgIGZvcm1zOiB7IGluaXRpYWw6ICdcXHVGREI4JywgZmluYWw6ICdcXHVGREJEJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBOT09OIFdJVEggSkVFTSBXSVRIIE1FRU1cbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDY0NlxcdTA2MkNcXHUwNjQ1J10sXG4gICAgICAgIGZvcm1zOiB7IGluaXRpYWw6ICdcXHVGRDk4JywgZmluYWw6ICdcXHVGRDk3JyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBOT09OIFdJVEggSkVFTSBXSVRIIFlFSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjQ2XFx1MDYyQ1xcdTA2NEEnXSxcbiAgICAgICAgZm9ybXM6IHsgZmluYWw6ICdcXHVGREM3JyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBOT09OIFdJVEggS0hBSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjQ2XFx1MDYyRSddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZDNEQnLCBpbml0aWFsOiAnXFx1RkNENCcgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgTk9PTiBXSVRIIE1FRU1cbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDY0NlxcdTA2NDUnXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGQzRFJywgaW5pdGlhbDogJ1xcdUZDRDUnLCBtZWRpYWw6ICdcXHVGQ0VFJywgZmluYWw6ICdcXHVGQzhDJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBOT09OIFdJVEggTUVFTSBXSVRIIEFMRUYgTUFLU1VSQVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjQ2XFx1MDY0NVxcdTA2NDknXSxcbiAgICAgICAgZm9ybXM6IHsgZmluYWw6ICdcXHVGRDlCJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBOT09OIFdJVEggTUVFTSBXSVRIIFlFSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjQ2XFx1MDY0NVxcdTA2NEEnXSxcbiAgICAgICAgZm9ybXM6IHsgZmluYWw6ICdcXHVGRDlBJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBOT09OIFdJVEggTk9PTlxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjQ2XFx1MDY0NiddLFxuICAgICAgICBmb3JtczogeyBmaW5hbDogJ1xcdUZDOEQnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIE5PT04gV0lUSCBSRUhcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDY0NlxcdTA2MzEnXSxcbiAgICAgICAgZm9ybXM6IHsgZmluYWw6ICdcXHVGQzhBJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBOT09OIFdJVEggWUVIXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2NDZcXHUwNjRBJ10sXG4gICAgICAgIGZvcm1zOiB7IGlzb2xhdGVkOiAnXFx1RkM1MCcsIGZpbmFsOiAnXFx1RkM4RicgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgTk9PTiBXSVRIIFpBSU5cbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDY0NlxcdTA2MzInXSxcbiAgICAgICAgZm9ybXM6IHsgZmluYWw6ICdcXHVGQzhCJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBRQUYgV0lUSCBBTEVGIE1BS1NVUkFcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDY0MlxcdTA2NDknXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGQzM1JywgZmluYWw6ICdcXHVGQzdFJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBRQUYgV0lUSCBIQUhcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDY0MlxcdTA2MkQnXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGQzMzJywgaW5pdGlhbDogJ1xcdUZDQzInIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFFBRiBXSVRIIE1FRU1cbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDY0MlxcdTA2NDUnXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGQzM0JywgaW5pdGlhbDogJ1xcdUZDQzMnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFFBRiBXSVRIIE1FRU0gV0lUSCBIQUhcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDY0MlxcdTA2NDVcXHUwNjJEJ10sXG4gICAgICAgIGZvcm1zOiB7IGluaXRpYWw6ICdcXHVGREI0JywgZmluYWw6ICdcXHVGRDdFJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBRQUYgV0lUSCBNRUVNIFdJVEggTUVFTVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjQyXFx1MDY0NVxcdTA2NDUnXSxcbiAgICAgICAgZm9ybXM6IHsgZmluYWw6ICdcXHVGRDdGJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBRQUYgV0lUSCBNRUVNIFdJVEggWUVIXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2NDJcXHUwNjQ1XFx1MDY0QSddLFxuICAgICAgICBmb3JtczogeyBmaW5hbDogJ1xcdUZEQjInIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFFBRiBXSVRIIFlFSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjQyXFx1MDY0QSddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZDMzYnLCBmaW5hbDogJ1xcdUZDN0YnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFJFSCBXSVRIIFNVUEVSU0NSSVBUIEFMRUZcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYzMVxcdTA2NzAnXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGQzVDJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBTQUQgV0lUSCBBTEVGIE1BS1NVUkFcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYzNVxcdTA2NDknXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGRDA1JywgZmluYWw6ICdcXHVGRDIxJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBTQUQgV0lUSCBIQUhcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYzNVxcdTA2MkQnXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGQzIwJywgaW5pdGlhbDogJ1xcdUZDQjEnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFNBRCBXSVRIIEhBSCBXSVRIIEhBSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjM1XFx1MDYyRFxcdTA2MkQnXSxcbiAgICAgICAgZm9ybXM6IHsgaW5pdGlhbDogJ1xcdUZENjUnLCBmaW5hbDogJ1xcdUZENjQnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFNBRCBXSVRIIEhBSCBXSVRIIFlFSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjM1XFx1MDYyRFxcdTA2NEEnXSxcbiAgICAgICAgZm9ybXM6IHsgZmluYWw6ICdcXHVGREE5JyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBTQUQgV0lUSCBLSEFIXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MzVcXHUwNjJFJ10sXG4gICAgICAgIGZvcm1zOiB7IGluaXRpYWw6ICdcXHVGQ0IyJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBTQUQgV0lUSCBNRUVNXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MzVcXHUwNjQ1J10sXG4gICAgICAgIGZvcm1zOiB7IGlzb2xhdGVkOiAnXFx1RkMyMScsIGluaXRpYWw6ICdcXHVGQ0IzJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBTQUQgV0lUSCBNRUVNIFdJVEggTUVFTVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjM1XFx1MDY0NVxcdTA2NDUnXSxcbiAgICAgICAgZm9ybXM6IHsgaW5pdGlhbDogJ1xcdUZEQzUnLCBmaW5hbDogJ1xcdUZENjYnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFNBRCBXSVRIIFJFSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjM1XFx1MDYzMSddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZEMEYnLCBmaW5hbDogJ1xcdUZEMkInIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFNBRCBXSVRIIFlFSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjM1XFx1MDY0QSddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZEMDYnLCBmaW5hbDogJ1xcdUZEMjInIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFNFRU4gV0lUSCBBTEVGIE1BS1NVUkFcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYzM1xcdTA2NDknXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGQ0ZCJywgZmluYWw6ICdcXHVGRDE3JyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBTRUVOIFdJVEggSEFIXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MzNcXHUwNjJEJ10sXG4gICAgICAgIGZvcm1zOiB7IGlzb2xhdGVkOiAnXFx1RkMxRCcsIGluaXRpYWw6ICdcXHVGQ0FFJywgbWVkaWFsOiAnXFx1RkQzNScgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgU0VFTiBXSVRIIEhBSCBXSVRIIEpFRU1cbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYzM1xcdTA2MkRcXHUwNjJDJ10sXG4gICAgICAgIGZvcm1zOiB7IGluaXRpYWw6ICdcXHVGRDVDJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBTRUVOIFdJVEggSEVIXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MzNcXHUwNjQ3J10sXG4gICAgICAgIGZvcm1zOiB7IGluaXRpYWw6ICdcXHVGRDMxJywgbWVkaWFsOiAnXFx1RkNFOCcgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgU0VFTiBXSVRIIEpFRU1cbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYzM1xcdTA2MkMnXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGQzFDJywgaW5pdGlhbDogJ1xcdUZDQUQnLCBtZWRpYWw6ICdcXHVGRDM0JyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBTRUVOIFdJVEggSkVFTSBXSVRIIEFMRUYgTUFLU1VSQVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjMzXFx1MDYyQ1xcdTA2NDknXSxcbiAgICAgICAgZm9ybXM6IHsgZmluYWw6ICdcXHVGRDVFJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBTRUVOIFdJVEggSkVFTSBXSVRIIEhBSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjMzXFx1MDYyQ1xcdTA2MkQnXSxcbiAgICAgICAgZm9ybXM6IHsgaW5pdGlhbDogJ1xcdUZENUQnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFNFRU4gV0lUSCBLSEFIXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MzNcXHUwNjJFJ10sXG4gICAgICAgIGZvcm1zOiB7IGlzb2xhdGVkOiAnXFx1RkMxRScsIGluaXRpYWw6ICdcXHVGQ0FGJywgbWVkaWFsOiAnXFx1RkQzNicgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgU0VFTiBXSVRIIEtIQUggV0lUSCBBTEVGIE1BS1NVUkFcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYzM1xcdTA2MkVcXHUwNjQ5J10sXG4gICAgICAgIGZvcm1zOiB7IGZpbmFsOiAnXFx1RkRBOCcgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgU0VFTiBXSVRIIEtIQUggV0lUSCBZRUhcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYzM1xcdTA2MkVcXHUwNjRBJ10sXG4gICAgICAgIGZvcm1zOiB7IGZpbmFsOiAnXFx1RkRDNicgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgU0VFTiBXSVRIIE1FRU1cbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYzM1xcdTA2NDUnXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGQzFGJywgaW5pdGlhbDogJ1xcdUZDQjAnLCBtZWRpYWw6ICdcXHVGQ0U3JyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBTRUVOIFdJVEggTUVFTSBXSVRIIEhBSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjMzXFx1MDY0NVxcdTA2MkQnXSxcbiAgICAgICAgZm9ybXM6IHsgaW5pdGlhbDogJ1xcdUZENjAnLCBmaW5hbDogJ1xcdUZENUYnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFNFRU4gV0lUSCBNRUVNIFdJVEggSkVFTVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjMzXFx1MDY0NVxcdTA2MkMnXSxcbiAgICAgICAgZm9ybXM6IHsgaW5pdGlhbDogJ1xcdUZENjEnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFNFRU4gV0lUSCBNRUVNIFdJVEggTUVFTVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjMzXFx1MDY0NVxcdTA2NDUnXSxcbiAgICAgICAgZm9ybXM6IHsgaW5pdGlhbDogJ1xcdUZENjMnLCBmaW5hbDogJ1xcdUZENjInIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFNFRU4gV0lUSCBSRUhcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYzM1xcdTA2MzEnXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGRDBFJywgZmluYWw6ICdcXHVGRDJBJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBTRUVOIFdJVEggWUVIXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MzNcXHUwNjRBJ10sXG4gICAgICAgIGZvcm1zOiB7IGlzb2xhdGVkOiAnXFx1RkNGQycsIGZpbmFsOiAnXFx1RkQxOCcgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgU0hBRERBIFdJVEggREFNTUFcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDY0MFxcdTA2NEZcXHUwNjUxJ10sXG4gICAgICAgIGZvcm1zOiB7IG1lZGlhbDogJ1xcdUZDRjMnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFNIQUREQSBXSVRIIEZBVEhBXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2NDBcXHUwNjRFXFx1MDY1MSddLFxuICAgICAgICBmb3JtczogeyBtZWRpYWw6ICdcXHVGQ0YyJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBTSEFEREEgV0lUSCBLQVNSQVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjQwXFx1MDY1MFxcdTA2NTEnXSxcbiAgICAgICAgZm9ybXM6IHsgbWVkaWFsOiAnXFx1RkNGNCcgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgU0hFRU4gV0lUSCBBTEVGIE1BS1NVUkFcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYzNFxcdTA2NDknXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGQ0ZEJywgZmluYWw6ICdcXHVGRDE5JyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBTSEVFTiBXSVRIIEhBSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjM0XFx1MDYyRCddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZEMEEnLCBpbml0aWFsOiAnXFx1RkQyRScsIG1lZGlhbDogJ1xcdUZEMzgnLCBmaW5hbDogJ1xcdUZEMjYnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFNIRUVOIFdJVEggSEFIIFdJVEggTUVFTVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjM0XFx1MDYyRFxcdTA2NDUnXSxcbiAgICAgICAgZm9ybXM6IHsgaW5pdGlhbDogJ1xcdUZENjgnLCBmaW5hbDogJ1xcdUZENjcnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFNIRUVOIFdJVEggSEFIIFdJVEggWUVIXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MzRcXHUwNjJEXFx1MDY0QSddLFxuICAgICAgICBmb3JtczogeyBmaW5hbDogJ1xcdUZEQUEnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFNIRUVOIFdJVEggSEVIXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MzRcXHUwNjQ3J10sXG4gICAgICAgIGZvcm1zOiB7IGluaXRpYWw6ICdcXHVGRDMyJywgbWVkaWFsOiAnXFx1RkNFQScgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgU0hFRU4gV0lUSCBKRUVNXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MzRcXHUwNjJDJ10sXG4gICAgICAgIGZvcm1zOiB7IGlzb2xhdGVkOiAnXFx1RkQwOScsIGluaXRpYWw6ICdcXHVGRDJEJywgbWVkaWFsOiAnXFx1RkQzNycsIGZpbmFsOiAnXFx1RkQyNScgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgU0hFRU4gV0lUSCBKRUVNIFdJVEggWUVIXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MzRcXHUwNjJDXFx1MDY0QSddLFxuICAgICAgICBmb3JtczogeyBmaW5hbDogJ1xcdUZENjknIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFNIRUVOIFdJVEggS0hBSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjM0XFx1MDYyRSddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZEMEInLCBpbml0aWFsOiAnXFx1RkQyRicsIG1lZGlhbDogJ1xcdUZEMzknLCBmaW5hbDogJ1xcdUZEMjcnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFNIRUVOIFdJVEggTUVFTVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjM0XFx1MDY0NSddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZEMEMnLCBpbml0aWFsOiAnXFx1RkQzMCcsIG1lZGlhbDogJ1xcdUZDRTknLCBmaW5hbDogJ1xcdUZEMjgnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFNIRUVOIFdJVEggTUVFTSBXSVRIIEtIQUhcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYzNFxcdTA2NDVcXHUwNjJFJ10sXG4gICAgICAgIGZvcm1zOiB7IGluaXRpYWw6ICdcXHVGRDZCJywgZmluYWw6ICdcXHVGRDZBJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBTSEVFTiBXSVRIIE1FRU0gV0lUSCBNRUVNXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MzRcXHUwNjQ1XFx1MDY0NSddLFxuICAgICAgICBmb3JtczogeyBpbml0aWFsOiAnXFx1RkQ2RCcsIGZpbmFsOiAnXFx1RkQ2QycgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgU0hFRU4gV0lUSCBSRUhcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYzNFxcdTA2MzEnXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGRDBEJywgZmluYWw6ICdcXHVGRDI5JyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBTSEVFTiBXSVRIIFlFSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjM0XFx1MDY0QSddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZDRkUnLCBmaW5hbDogJ1xcdUZEMUEnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFRBSCBXSVRIIEFMRUYgTUFLU1VSQVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjM3XFx1MDY0OSddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZDRjUnLCBmaW5hbDogJ1xcdUZEMTEnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFRBSCBXSVRIIEhBSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjM3XFx1MDYyRCddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZDMjYnLCBpbml0aWFsOiAnXFx1RkNCOCcgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgVEFIIFdJVEggTUVFTVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjM3XFx1MDY0NSddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZDMjcnLCBpbml0aWFsOiAnXFx1RkQzMycsIG1lZGlhbDogJ1xcdUZEM0EnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFRBSCBXSVRIIE1FRU0gV0lUSCBIQUhcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYzN1xcdTA2NDVcXHUwNjJEJ10sXG4gICAgICAgIGZvcm1zOiB7IGluaXRpYWw6ICdcXHVGRDcyJywgZmluYWw6ICdcXHVGRDcxJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBUQUggV0lUSCBNRUVNIFdJVEggTUVFTVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjM3XFx1MDY0NVxcdTA2NDUnXSxcbiAgICAgICAgZm9ybXM6IHsgaW5pdGlhbDogJ1xcdUZENzMnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFRBSCBXSVRIIE1FRU0gV0lUSCBZRUhcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYzN1xcdTA2NDVcXHUwNjRBJ10sXG4gICAgICAgIGZvcm1zOiB7IGZpbmFsOiAnXFx1RkQ3NCcgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgVEFIIFdJVEggWUVIXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MzdcXHUwNjRBJ10sXG4gICAgICAgIGZvcm1zOiB7IGlzb2xhdGVkOiAnXFx1RkNGNicsIGZpbmFsOiAnXFx1RkQxMicgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgVEVIIFdJVEggQUxFRiBNQUtTVVJBXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MkFcXHUwNjQ5J10sXG4gICAgICAgIGZvcm1zOiB7IGlzb2xhdGVkOiAnXFx1RkMwRicsIGZpbmFsOiAnXFx1RkM3NCcgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgVEVIIFdJVEggSEFIXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MkFcXHUwNjJEJ10sXG4gICAgICAgIGZvcm1zOiB7IGlzb2xhdGVkOiAnXFx1RkMwQycsIGluaXRpYWw6ICdcXHVGQ0EyJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBURUggV0lUSCBIQUggV0lUSCBKRUVNXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MkFcXHUwNjJEXFx1MDYyQyddLFxuICAgICAgICBmb3JtczogeyBpbml0aWFsOiAnXFx1RkQ1MicsIGZpbmFsOiAnXFx1RkQ1MScgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgVEVIIFdJVEggSEFIIFdJVEggTUVFTVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjJBXFx1MDYyRFxcdTA2NDUnXSxcbiAgICAgICAgZm9ybXM6IHsgaW5pdGlhbDogJ1xcdUZENTMnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFRFSCBXSVRIIEhFSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjJBXFx1MDY0NyddLFxuICAgICAgICBmb3JtczogeyBpbml0aWFsOiAnXFx1RkNBNScsIG1lZGlhbDogJ1xcdUZDRTQnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFRFSCBXSVRIIEpFRU1cbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYyQVxcdTA2MkMnXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGQzBCJywgaW5pdGlhbDogJ1xcdUZDQTEnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFRFSCBXSVRIIEpFRU0gV0lUSCBBTEVGIE1BS1NVUkFcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYyQVxcdTA2MkNcXHUwNjQ5J10sXG4gICAgICAgIGZvcm1zOiB7IGZpbmFsOiAnXFx1RkRBMCcgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgVEVIIFdJVEggSkVFTSBXSVRIIE1FRU1cbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYyQVxcdTA2MkNcXHUwNjQ1J10sXG4gICAgICAgIGZvcm1zOiB7IGluaXRpYWw6ICdcXHVGRDUwJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBURUggV0lUSCBKRUVNIFdJVEggWUVIXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MkFcXHUwNjJDXFx1MDY0QSddLFxuICAgICAgICBmb3JtczogeyBmaW5hbDogJ1xcdUZEOUYnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFRFSCBXSVRIIEtIQUhcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYyQVxcdTA2MkUnXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGQzBEJywgaW5pdGlhbDogJ1xcdUZDQTMnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFRFSCBXSVRIIEtIQUggV0lUSCBBTEVGIE1BS1NVUkFcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYyQVxcdTA2MkVcXHUwNjQ5J10sXG4gICAgICAgIGZvcm1zOiB7IGZpbmFsOiAnXFx1RkRBMicgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgVEVIIFdJVEggS0hBSCBXSVRIIE1FRU1cbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYyQVxcdTA2MkVcXHUwNjQ1J10sXG4gICAgICAgIGZvcm1zOiB7IGluaXRpYWw6ICdcXHVGRDU0JyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBURUggV0lUSCBLSEFIIFdJVEggWUVIXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MkFcXHUwNjJFXFx1MDY0QSddLFxuICAgICAgICBmb3JtczogeyBmaW5hbDogJ1xcdUZEQTEnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFRFSCBXSVRIIE1FRU1cbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYyQVxcdTA2NDUnXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGQzBFJywgaW5pdGlhbDogJ1xcdUZDQTQnLCBtZWRpYWw6ICdcXHVGQ0UzJywgZmluYWw6ICdcXHVGQzcyJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBURUggV0lUSCBNRUVNIFdJVEggQUxFRiBNQUtTVVJBXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MkFcXHUwNjQ1XFx1MDY0OSddLFxuICAgICAgICBmb3JtczogeyBmaW5hbDogJ1xcdUZEQTQnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFRFSCBXSVRIIE1FRU0gV0lUSCBIQUhcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYyQVxcdTA2NDVcXHUwNjJEJ10sXG4gICAgICAgIGZvcm1zOiB7IGluaXRpYWw6ICdcXHVGRDU2JyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBURUggV0lUSCBNRUVNIFdJVEggSkVFTVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjJBXFx1MDY0NVxcdTA2MkMnXSxcbiAgICAgICAgZm9ybXM6IHsgaW5pdGlhbDogJ1xcdUZENTUnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFRFSCBXSVRIIE1FRU0gV0lUSCBLSEFIXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MkFcXHUwNjQ1XFx1MDYyRSddLFxuICAgICAgICBmb3JtczogeyBpbml0aWFsOiAnXFx1RkQ1NycgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgVEVIIFdJVEggTUVFTSBXSVRIIFlFSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjJBXFx1MDY0NVxcdTA2NEEnXSxcbiAgICAgICAgZm9ybXM6IHsgZmluYWw6ICdcXHVGREEzJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBURUggV0lUSCBOT09OXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MkFcXHUwNjQ2J10sXG4gICAgICAgIGZvcm1zOiB7IGZpbmFsOiAnXFx1RkM3MycgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgVEVIIFdJVEggUkVIXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MkFcXHUwNjMxJ10sXG4gICAgICAgIGZvcm1zOiB7IGZpbmFsOiAnXFx1RkM3MCcgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgVEVIIFdJVEggWUVIXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MkFcXHUwNjRBJ10sXG4gICAgICAgIGZvcm1zOiB7IGlzb2xhdGVkOiAnXFx1RkMxMCcsIGZpbmFsOiAnXFx1RkM3NScgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgVEVIIFdJVEggWkFJTlxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjJBXFx1MDYzMiddLFxuICAgICAgICBmb3JtczogeyBmaW5hbDogJ1xcdUZDNzEnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFRIQUwgV0lUSCBTVVBFUlNDUklQVCBBTEVGXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MzBcXHUwNjcwJ10sXG4gICAgICAgIGZvcm1zOiB7IGlzb2xhdGVkOiAnXFx1RkM1QicgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgVEhFSCBXSVRIIEFMRUYgTUFLU1VSQVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjJCXFx1MDY0OSddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZDMTMnLCBmaW5hbDogJ1xcdUZDN0EnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFRIRUggV0lUSCBIRUhcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYyQlxcdTA2NDcnXSxcbiAgICAgICAgZm9ybXM6IHsgbWVkaWFsOiAnXFx1RkNFNicgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgVEhFSCBXSVRIIEpFRU1cbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYyQlxcdTA2MkMnXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGQzExJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBUSEVIIFdJVEggTUVFTVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjJCXFx1MDY0NSddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZDMTInLCBpbml0aWFsOiAnXFx1RkNBNicsIG1lZGlhbDogJ1xcdUZDRTUnLCBmaW5hbDogJ1xcdUZDNzgnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFRIRUggV0lUSCBOT09OXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MkJcXHUwNjQ2J10sXG4gICAgICAgIGZvcm1zOiB7IGZpbmFsOiAnXFx1RkM3OScgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgVEhFSCBXSVRIIFJFSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjJCXFx1MDYzMSddLFxuICAgICAgICBmb3JtczogeyBmaW5hbDogJ1xcdUZDNzYnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFRIRUggV0lUSCBZRUhcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYyQlxcdTA2NEEnXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGQzE0JywgZmluYWw6ICdcXHVGQzdCJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBUSEVIIFdJVEggWkFJTlxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjJCXFx1MDYzMiddLFxuICAgICAgICBmb3JtczogeyBmaW5hbDogJ1xcdUZDNzcnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFVJR0hVUiBLSVJHSElaIFlFSCBXSVRIIEhBTVpBIEFCT1ZFIFdJVEggQUxFRiBNQUtTVVJBXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MjZcXHUwNjQ5J10sXG4gICAgICAgIGZvcm1zOiB7IGlzb2xhdGVkOiAnXFx1RkJGOScsIGluaXRpYWw6ICdcXHVGQkZCJywgZmluYWw6ICdcXHVGQkZBJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBZRUggV0lUSCBBTEVGIE1BS1NVUkFcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDY0QVxcdTA2NDknXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGQzU5JywgZmluYWw6ICdcXHVGQzk1JyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBZRUggV0lUSCBIQUhcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDY0QVxcdTA2MkQnXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGQzU2JywgaW5pdGlhbDogJ1xcdUZDREInIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFlFSCBXSVRIIEhBSCBXSVRIIFlFSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjRBXFx1MDYyRFxcdTA2NEEnXSxcbiAgICAgICAgZm9ybXM6IHsgZmluYWw6ICdcXHVGREFFJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBZRUggV0lUSCBIQU1aQSBBQk9WRSBXSVRIIEFFXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MjZcXHUwNkQ1J10sXG4gICAgICAgIGZvcm1zOiB7IGlzb2xhdGVkOiAnXFx1RkJFQycsIGZpbmFsOiAnXFx1RkJFRCcgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgWUVIIFdJVEggSEFNWkEgQUJPVkUgV0lUSCBBTEVGXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MjZcXHUwNjI3J10sXG4gICAgICAgIGZvcm1zOiB7IGlzb2xhdGVkOiAnXFx1RkJFQScsIGZpbmFsOiAnXFx1RkJFQicgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgWUVIIFdJVEggSEFNWkEgQUJPVkUgV0lUSCBBTEVGIE1BS1NVUkFcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYyNlxcdTA2NDknXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGQzAzJywgZmluYWw6ICdcXHVGQzY4JyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBZRUggV0lUSCBIQU1aQSBBQk9WRSBXSVRIIEVcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYyNlxcdTA2RDAnXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGQkY2JywgaW5pdGlhbDogJ1xcdUZCRjgnLCBmaW5hbDogJ1xcdUZCRjcnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFlFSCBXSVRIIEhBTVpBIEFCT1ZFIFdJVEggSEFIXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MjZcXHUwNjJEJ10sXG4gICAgICAgIGZvcm1zOiB7IGlzb2xhdGVkOiAnXFx1RkMwMScsIGluaXRpYWw6ICdcXHVGQzk4JyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBZRUggV0lUSCBIQU1aQSBBQk9WRSBXSVRIIEhFSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjI2XFx1MDY0NyddLFxuICAgICAgICBmb3JtczogeyBpbml0aWFsOiAnXFx1RkM5QicsIG1lZGlhbDogJ1xcdUZDRTAnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFlFSCBXSVRIIEhBTVpBIEFCT1ZFIFdJVEggSkVFTVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjI2XFx1MDYyQyddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZDMDAnLCBpbml0aWFsOiAnXFx1RkM5NycgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgWUVIIFdJVEggSEFNWkEgQUJPVkUgV0lUSCBLSEFIXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MjZcXHUwNjJFJ10sXG4gICAgICAgIGZvcm1zOiB7IGluaXRpYWw6ICdcXHVGQzk5JyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBZRUggV0lUSCBIQU1aQSBBQk9WRSBXSVRIIE1FRU1cbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYyNlxcdTA2NDUnXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGQzAyJywgaW5pdGlhbDogJ1xcdUZDOUEnLCBtZWRpYWw6ICdcXHVGQ0RGJywgZmluYWw6ICdcXHVGQzY2JyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBZRUggV0lUSCBIQU1aQSBBQk9WRSBXSVRIIE5PT05cbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYyNlxcdTA2NDYnXSxcbiAgICAgICAgZm9ybXM6IHsgZmluYWw6ICdcXHVGQzY3JyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBZRUggV0lUSCBIQU1aQSBBQk9WRSBXSVRIIE9FXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MjZcXHUwNkM2J10sXG4gICAgICAgIGZvcm1zOiB7IGlzb2xhdGVkOiAnXFx1RkJGMicsIGZpbmFsOiAnXFx1RkJGMycgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgWUVIIFdJVEggSEFNWkEgQUJPVkUgV0lUSCBSRUhcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYyNlxcdTA2MzEnXSxcbiAgICAgICAgZm9ybXM6IHsgZmluYWw6ICdcXHVGQzY0JyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBZRUggV0lUSCBIQU1aQSBBQk9WRSBXSVRIIFVcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDYyNlxcdTA2QzcnXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGQkYwJywgZmluYWw6ICdcXHVGQkYxJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBZRUggV0lUSCBIQU1aQSBBQk9WRSBXSVRIIFdBV1xuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjI2XFx1MDY0OCddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZCRUUnLCBmaW5hbDogJ1xcdUZCRUYnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFlFSCBXSVRIIEhBTVpBIEFCT1ZFIFdJVEggWUVIXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2MjZcXHUwNjRBJ10sXG4gICAgICAgIGZvcm1zOiB7IGlzb2xhdGVkOiAnXFx1RkMwNCcsIGZpbmFsOiAnXFx1RkM2OScgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgWUVIIFdJVEggSEFNWkEgQUJPVkUgV0lUSCBZVVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjI2XFx1MDZDOCddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZCRjQnLCBmaW5hbDogJ1xcdUZCRjUnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFlFSCBXSVRIIEhBTVpBIEFCT1ZFIFdJVEggWkFJTlxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjI2XFx1MDYzMiddLFxuICAgICAgICBmb3JtczogeyBmaW5hbDogJ1xcdUZDNjUnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFlFSCBXSVRIIEhFSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjRBXFx1MDY0NyddLFxuICAgICAgICBmb3JtczogeyBpbml0aWFsOiAnXFx1RkNERScsIG1lZGlhbDogJ1xcdUZDRjEnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFlFSCBXSVRIIEpFRU1cbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDY0QVxcdTA2MkMnXSxcbiAgICAgICAgZm9ybXM6IHsgaXNvbGF0ZWQ6ICdcXHVGQzU1JywgaW5pdGlhbDogJ1xcdUZDREEnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFlFSCBXSVRIIEpFRU0gV0lUSCBZRUhcbiAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnXFx1MDY0QVxcdTA2MkNcXHUwNjRBJ10sXG4gICAgICAgIGZvcm1zOiB7IGZpbmFsOiAnXFx1RkRBRicgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgWUVIIFdJVEggS0hBSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjRBXFx1MDYyRSddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZDNTcnLCBpbml0aWFsOiAnXFx1RkNEQycgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgWUVIIFdJVEggTUVFTVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjRBXFx1MDY0NSddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZDNTgnLCBpbml0aWFsOiAnXFx1RkNERCcsIG1lZGlhbDogJ1xcdUZDRjAnLCBmaW5hbDogJ1xcdUZDOTMnIH1cbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFlFSCBXSVRIIE1FRU0gV0lUSCBNRUVNXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2NEFcXHUwNjQ1XFx1MDY0NSddLFxuICAgICAgICBmb3JtczogeyBpbml0aWFsOiAnXFx1RkQ5RCcsIGZpbmFsOiAnXFx1RkQ5QycgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgWUVIIFdJVEggTUVFTSBXSVRIIFlFSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjRBXFx1MDY0NVxcdTA2NEEnXSxcbiAgICAgICAgZm9ybXM6IHsgZmluYWw6ICdcXHVGREIwJyB9XG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBZRUggV0lUSCBOT09OXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2NEFcXHUwNjQ2J10sXG4gICAgICAgIGZvcm1zOiB7IGZpbmFsOiAnXFx1RkM5NCcgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgWUVIIFdJVEggUkVIXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2NEFcXHUwNjMxJ10sXG4gICAgICAgIGZvcm1zOiB7IGZpbmFsOiAnXFx1RkM5MScgfSxcbiAgICB9LFxuICAgIC8vIExpZ2F0dXJlIFlFSCBXSVRIIFlFSFxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjRBXFx1MDY0QSddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZDNUEnLCBmaW5hbDogJ1xcdUZDOTYnIH0sXG4gICAgfSxcbiAgICAvLyBMaWdhdHVyZSBZRUggV0lUSCBaQUlOXG4gICAge1xuICAgICAgICBtYXRjaGVzOiBbJ1xcdTA2NEFcXHUwNjMyJ10sXG4gICAgICAgIGZvcm1zOiB7IGZpbmFsOiAnXFx1RkM5MicgfVxuICAgIH0sXG4gICAgLy8gTGlnYXR1cmUgWkFIIFdJVEggTUVFTVxuICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydcXHUwNjM4XFx1MDY0NSddLFxuICAgICAgICBmb3JtczogeyBpc29sYXRlZDogJ1xcdUZDMjgnLCBpbml0aWFsOiAnXFx1RkNCOScsIG1lZGlhbDogJ1xcdUZEM0InIH1cbiAgICB9XG5dO1xuZXhwb3J0cy5MRVRURVJTID0ge1xuICAgIC8vIExldHRlciBIQU1aQVxuICAgICdcXHUwNjIxJzogeyBpc29sYXRlZDogJ1xcdUZFODAnIH0sXG4gICAgLy8gTGV0dGVyIEFMRUYgV0lUSCBNQUREQSBBQk9WRVxuICAgICdcXHUwNjIyJzogeyBpc29sYXRlZDogJ1xcdUZFODEnLCBmaW5hbDogJ1xcdUZFODInIH0sXG4gICAgLy8gTGV0dGVyIEFMRUYgV0lUSCBIQU1aQSBBQk9WRVxuICAgICdcXHUwNjIzJzogeyBpc29sYXRlZDogJ1xcdUZFODMnLCBmaW5hbDogJ1xcdUZFODQnIH0sXG4gICAgLy8gTGV0dGVyIFdBVyBXSVRIIEhBTVpBIEFCT1ZFXG4gICAgJ1xcdTA2MjQnOiB7IGlzb2xhdGVkOiAnXFx1RkU4NScsIGZpbmFsOiAnXFx1RkU4NicgfSxcbiAgICAvLyBMZXR0ZXIgQUxFRiBXSVRIIEhBTVpBIEJFTE9XXG4gICAgJ1xcdTA2MjUnOiB7IGlzb2xhdGVkOiAnXFx1RkU4NycsIGZpbmFsOiAnXFx1RkU4OCcgfSxcbiAgICAvLyBMZXR0ZXIgWUVIIFdJVEggSEFNWkEgQUJPVkVcbiAgICAnXFx1MDYyNic6IHsgaXNvbGF0ZWQ6ICdcXHVGRTg5JywgaW5pdGlhbDogJ1xcdUZFOEInLCBtZWRpYWw6ICdcXHVGRThDJywgZmluYWw6ICdcXHVGRThBJyB9LFxuICAgIC8vIExldHRlciBBTEVGXG4gICAgJ1xcdTA2MjcnOiB7IGlzb2xhdGVkOiAnXFx1RkU4RCcsIGZpbmFsOiAnXFx1RkU4RScgfSxcbiAgICAvLyBMZXR0ZXIgQkVIXG4gICAgJ1xcdTA2MjgnOiB7IGlzb2xhdGVkOiAnXFx1RkU4RicsIGluaXRpYWw6ICdcXHVGRTkxJywgbWVkaWFsOiAnXFx1RkU5MicsIGZpbmFsOiAnXFx1RkU5MCcgfSxcbiAgICAvLyBMZXR0ZXIgVEVIIE1BUkJVVEFcbiAgICAnXFx1MDYyOSc6IHsgaXNvbGF0ZWQ6ICdcXHVGRTkzJywgZmluYWw6ICdcXHVGRTk0JyB9LFxuICAgIC8vIExldHRlciBURUhcbiAgICAnXFx1MDYyQSc6IHsgaXNvbGF0ZWQ6ICdcXHVGRTk1JywgaW5pdGlhbDogJ1xcdUZFOTcnLCBtZWRpYWw6ICdcXHVGRTk4JywgZmluYWw6ICdcXHVGRTk2JyB9LFxuICAgIC8vIExldHRlciBUSEVIXG4gICAgJ1xcdTA2MkInOiB7IGlzb2xhdGVkOiAnXFx1RkU5OScsIGluaXRpYWw6ICdcXHVGRTlCJywgbWVkaWFsOiAnXFx1RkU5QycsIGZpbmFsOiAnXFx1RkU5QScgfSxcbiAgICAvLyBMZXR0ZXIgSkVFTVxuICAgICdcXHUwNjJDJzogeyBpc29sYXRlZDogJ1xcdUZFOUQnLCBpbml0aWFsOiAnXFx1RkU5RicsIG1lZGlhbDogJ1xcdUZFQTAnLCBmaW5hbDogJ1xcdUZFOUUnIH0sXG4gICAgLy8gTGV0dGVyIEhBSFxuICAgICdcXHUwNjJEJzogeyBpc29sYXRlZDogJ1xcdUZFQTEnLCBpbml0aWFsOiAnXFx1RkVBMycsIG1lZGlhbDogJ1xcdUZFQTQnLCBmaW5hbDogJ1xcdUZFQTInIH0sXG4gICAgLy8gTGV0dGVyIEtIQUhcbiAgICAnXFx1MDYyRSc6IHsgaXNvbGF0ZWQ6ICdcXHVGRUE1JywgaW5pdGlhbDogJ1xcdUZFQTcnLCBtZWRpYWw6ICdcXHVGRUE4JywgZmluYWw6ICdcXHVGRUE2JyB9LFxuICAgIC8vIExldHRlciBEQUxcbiAgICAnXFx1MDYyRic6IHsgaXNvbGF0ZWQ6ICdcXHVGRUE5JywgZmluYWw6ICdcXHVGRUFBJyB9LFxuICAgIC8vIExldHRlciBUSEFMXG4gICAgJ1xcdTA2MzAnOiB7IGlzb2xhdGVkOiAnXFx1RkVBQicsIGZpbmFsOiAnXFx1RkVBQycgfSxcbiAgICAvLyBMZXR0ZXIgUkVIXG4gICAgJ1xcdTA2MzEnOiB7IGlzb2xhdGVkOiAnXFx1RkVBRCcsIGZpbmFsOiAnXFx1RkVBRScgfSxcbiAgICAvLyBMZXR0ZXIgWkFJTlxuICAgICdcXHUwNjMyJzogeyBpc29sYXRlZDogJ1xcdUZFQUYnLCBmaW5hbDogJ1xcdUZFQjAnIH0sXG4gICAgLy8gTGV0dGVyIFNFRU5cbiAgICAnXFx1MDYzMyc6IHsgaXNvbGF0ZWQ6ICdcXHVGRUIxJywgaW5pdGlhbDogJ1xcdUZFQjMnLCBtZWRpYWw6ICdcXHVGRUI0JywgZmluYWw6ICdcXHVGRUIyJyB9LFxuICAgIC8vIExldHRlciBTSEVFTlxuICAgICdcXHUwNjM0JzogeyBpc29sYXRlZDogJ1xcdUZFQjUnLCBpbml0aWFsOiAnXFx1RkVCNycsIG1lZGlhbDogJ1xcdUZFQjgnLCBmaW5hbDogJ1xcdUZFQjYnIH0sXG4gICAgLy8gTGV0dGVyIFNBRFxuICAgICdcXHUwNjM1JzogeyBpc29sYXRlZDogJ1xcdUZFQjknLCBpbml0aWFsOiAnXFx1RkVCQicsIG1lZGlhbDogJ1xcdUZFQkMnLCBmaW5hbDogJ1xcdUZFQkEnIH0sXG4gICAgLy8gTGV0dGVyIERBRFxuICAgICdcXHUwNjM2JzogeyBpc29sYXRlZDogJ1xcdUZFQkQnLCBpbml0aWFsOiAnXFx1RkVCRicsIG1lZGlhbDogJ1xcdUZFQzAnLCBmaW5hbDogJ1xcdUZFQkUnIH0sXG4gICAgLy8gTGV0dGVyIFRBSFxuICAgICdcXHUwNjM3JzogeyBpc29sYXRlZDogJ1xcdUZFQzEnLCBpbml0aWFsOiAnXFx1RkVDMycsIG1lZGlhbDogJ1xcdUZFQzQnLCBmaW5hbDogJ1xcdUZFQzInIH0sXG4gICAgLy8gTGV0dGVyIFpBSFxuICAgICdcXHUwNjM4JzogeyBpc29sYXRlZDogJ1xcdUZFQzUnLCBpbml0aWFsOiAnXFx1RkVDNycsIG1lZGlhbDogJ1xcdUZFQzgnLCBmaW5hbDogJ1xcdUZFQzYnIH0sXG4gICAgLy8gTGV0dGVyIEFJTlxuICAgICdcXHUwNjM5JzogeyBpc29sYXRlZDogJ1xcdUZFQzknLCBpbml0aWFsOiAnXFx1RkVDQicsIG1lZGlhbDogJ1xcdUZFQ0MnLCBmaW5hbDogJ1xcdUZFQ0EnIH0sXG4gICAgLy8gTGV0dGVyIEdIQUlOXG4gICAgJ1xcdTA2M0EnOiB7IGlzb2xhdGVkOiAnXFx1RkVDRCcsIGluaXRpYWw6ICdcXHVGRUNGJywgbWVkaWFsOiAnXFx1RkVEMCcsIGZpbmFsOiAnXFx1RkVDRScgfSxcbiAgICAvLyBUQVRXRUVMXG4gICAgJ1xcdTA2NDAnOiB7IGlzb2xhdGVkOiAnXFx1MDY0MCcsIGluaXRpYWw6ICdcXHUwNjQwJywgbWVkaWFsOiAnXFx1MDY0MCcsIGZpbmFsOiAnXFx1MDY0MCcgfSxcbiAgICAvLyBMZXR0ZXIgRkVIXG4gICAgJ1xcdTA2NDEnOiB7IGlzb2xhdGVkOiAnXFx1RkVEMScsIGluaXRpYWw6ICdcXHVGRUQzJywgbWVkaWFsOiAnXFx1RkVENCcsIGZpbmFsOiAnXFx1RkVEMicgfSxcbiAgICAvLyBMZXR0ZXIgUUFGXG4gICAgJ1xcdTA2NDInOiB7IGlzb2xhdGVkOiAnXFx1RkVENScsIGluaXRpYWw6ICdcXHVGRUQ3JywgbWVkaWFsOiAnXFx1RkVEOCcsIGZpbmFsOiAnXFx1RkVENicgfSxcbiAgICAvLyBMZXR0ZXIgS0FGXG4gICAgJ1xcdTA2NDMnOiB7IGlzb2xhdGVkOiAnXFx1RkVEOScsIGluaXRpYWw6ICdcXHVGRURCJywgbWVkaWFsOiAnXFx1RkVEQycsIGZpbmFsOiAnXFx1RkVEQScgfSxcbiAgICAvLyBMZXR0ZXIgTEFNXG4gICAgJ1xcdTA2NDQnOiB7IGlzb2xhdGVkOiAnXFx1RkVERCcsIGluaXRpYWw6ICdcXHVGRURGJywgbWVkaWFsOiAnXFx1RkVFMCcsIGZpbmFsOiAnXFx1RkVERScgfSxcbiAgICAvLyBMZXR0ZXIgTUVFTVxuICAgICdcXHUwNjQ1JzogeyBpc29sYXRlZDogJ1xcdUZFRTEnLCBpbml0aWFsOiAnXFx1RkVFMycsIG1lZGlhbDogJ1xcdUZFRTQnLCBmaW5hbDogJ1xcdUZFRTInIH0sXG4gICAgLy8gTGV0dGVyIE5PT05cbiAgICAnXFx1MDY0Nic6IHsgaXNvbGF0ZWQ6ICdcXHVGRUU1JywgaW5pdGlhbDogJ1xcdUZFRTcnLCBtZWRpYWw6ICdcXHVGRUU4JywgZmluYWw6ICdcXHVGRUU2JyB9LFxuICAgIC8vIExldHRlciBIRUhcbiAgICAnXFx1MDY0Nyc6IHsgaXNvbGF0ZWQ6ICdcXHVGRUU5JywgaW5pdGlhbDogJ1xcdUZFRUInLCBtZWRpYWw6ICdcXHVGRUVDJywgZmluYWw6ICdcXHVGRUVBJyB9LFxuICAgIC8vIExldHRlciBXQVdcbiAgICAnXFx1MDY0OCc6IHsgaXNvbGF0ZWQ6ICdcXHVGRUVEJywgZmluYWw6ICdcXHVGRUVFJyB9LFxuICAgIC8vIExldHRlciBBTEVGIE1BS1NVUkFcbiAgICAnXFx1MDY0OSc6IHsgaXNvbGF0ZWQ6ICdcXHVGRUVGJywgZmluYWw6ICdcXHVGRUYwJyB9LFxuICAgIC8vIExldHRlciBZRUhcbiAgICAnXFx1MDY0QSc6IHsgaXNvbGF0ZWQ6ICdcXHVGRUYxJywgaW5pdGlhbDogJ1xcdUZFRjMnLCBtZWRpYWw6ICdcXHVGRUY0JywgZmluYWw6ICdcXHVGRUYyJyB9LFxuICAgIC8vIExldHRlciBBTEVGIFdBU0xBXG4gICAgJ1xcdTA2NzEnOiB7IGlzb2xhdGVkOiAnXFx1RkI1MCcsIGZpbmFsOiAnXFx1RkI1MScgfSxcbiAgICAvLyBMZXR0ZXIgVSBXSVRIIEhBTVpBIEFCT1ZFXG4gICAgJ1xcdTA2NzcnOiB7IGlzb2xhdGVkOiAnXFx1RkJERCcgfSxcbiAgICAvLyBMZXR0ZXIgVFRFSFxuICAgICdcXHUwNjc5JzogeyBpc29sYXRlZDogJ1xcdUZCNjYnLCBpbml0aWFsOiAnXFx1RkI2OCcsIG1lZGlhbDogJ1xcdUZCNjknLCBmaW5hbDogJ1xcdUZCNjcnIH0sXG4gICAgLy8gTGV0dGVyIFRURUhFSFxuICAgICdcXHUwNjdBJzogeyBpc29sYXRlZDogJ1xcdUZCNUUnLCBpbml0aWFsOiAnXFx1RkI2MCcsIG1lZGlhbDogJ1xcdUZCNjEnLCBmaW5hbDogJ1xcdUZCNUYnIH0sXG4gICAgLy8gTGV0dGVyIEJFRUhcbiAgICAnXFx1MDY3Qic6IHsgaXNvbGF0ZWQ6ICdcXHVGQjUyJywgaW5pdGlhbDogJ1xcdUZCNTQnLCBtZWRpYWw6ICdcXHVGQjU1JywgZmluYWw6ICdcXHVGQjUzJyB9LFxuICAgIC8vIExldHRlciBQRUhcbiAgICAnXFx1MDY3RSc6IHsgaXNvbGF0ZWQ6ICdcXHVGQjU2JywgaW5pdGlhbDogJ1xcdUZCNTgnLCBtZWRpYWw6ICdcXHVGQjU5JywgZmluYWw6ICdcXHVGQjU3JyB9LFxuICAgIC8vIExldHRlciBURUhFSFxuICAgICdcXHUwNjdGJzogeyBpc29sYXRlZDogJ1xcdUZCNjInLCBpbml0aWFsOiAnXFx1RkI2NCcsIG1lZGlhbDogJ1xcdUZCNjUnLCBmaW5hbDogJ1xcdUZCNjMnIH0sXG4gICAgLy8gTGV0dGVyIEJFSEVIXG4gICAgJ1xcdTA2ODAnOiB7IGlzb2xhdGVkOiAnXFx1RkI1QScsIGluaXRpYWw6ICdcXHVGQjVDJywgbWVkaWFsOiAnXFx1RkI1RCcsIGZpbmFsOiAnXFx1RkI1QicgfSxcbiAgICAvLyBMZXR0ZXIgTllFSFxuICAgICdcXHUwNjgzJzogeyBpc29sYXRlZDogJ1xcdUZCNzYnLCBpbml0aWFsOiAnXFx1RkI3OCcsIG1lZGlhbDogJ1xcdUZCNzknLCBmaW5hbDogJ1xcdUZCNzcnIH0sXG4gICAgLy8gTGV0dGVyIERZRUhcbiAgICAnXFx1MDY4NCc6IHsgaXNvbGF0ZWQ6ICdcXHVGQjcyJywgaW5pdGlhbDogJ1xcdUZCNzQnLCBtZWRpYWw6ICdcXHVGQjc1JywgZmluYWw6ICdcXHVGQjczJyB9LFxuICAgIC8vIExldHRlciBUQ0hFSFxuICAgICdcXHUwNjg2JzogeyBpc29sYXRlZDogJ1xcdUZCN0EnLCBpbml0aWFsOiAnXFx1RkI3QycsIG1lZGlhbDogJ1xcdUZCN0QnLCBmaW5hbDogJ1xcdUZCN0InIH0sXG4gICAgLy8gTGV0dGVyIFRDSEVIRUhcbiAgICAnXFx1MDY4Nyc6IHsgaXNvbGF0ZWQ6ICdcXHVGQjdFJywgaW5pdGlhbDogJ1xcdUZCODAnLCBtZWRpYWw6ICdcXHVGQjgxJywgZmluYWw6ICdcXHVGQjdGJyB9LFxuICAgIC8vIExldHRlciBEREFMXG4gICAgJ1xcdTA2ODgnOiB7IGlzb2xhdGVkOiAnXFx1RkI4OCcsIGZpbmFsOiAnXFx1RkI4OScgfSxcbiAgICAvLyBMZXR0ZXIgREFIQUxcbiAgICAnXFx1MDY4Qyc6IHsgaXNvbGF0ZWQ6ICdcXHVGQjg0JywgZmluYWw6ICdcXHVGQjg1JyB9LFxuICAgIC8vIExldHRlciBEREFIQUxcbiAgICAnXFx1MDY4RCc6IHsgaXNvbGF0ZWQ6ICdcXHVGQjgyJywgZmluYWw6ICdcXHVGQjgzJyB9LFxuICAgIC8vIExldHRlciBEVUxcbiAgICAnXFx1MDY4RSc6IHsgaXNvbGF0ZWQ6ICdcXHVGQjg2JywgZmluYWw6ICdcXHVGQjg3JyB9LFxuICAgIC8vIExldHRlciBSUkVIXG4gICAgJ1xcdTA2OTEnOiB7IGlzb2xhdGVkOiAnXFx1RkI4QycsIGZpbmFsOiAnXFx1RkI4RCcgfSxcbiAgICAvLyBMZXR0ZXIgSkVIXG4gICAgJ1xcdTA2OTgnOiB7IGlzb2xhdGVkOiAnXFx1RkI4QScsIGZpbmFsOiAnXFx1RkI4QicgfSxcbiAgICAvLyBMZXR0ZXIgVkVIXG4gICAgJ1xcdTA2QTQnOiB7IGlzb2xhdGVkOiAnXFx1RkI2QScsIGluaXRpYWw6ICdcXHVGQjZDJywgbWVkaWFsOiAnXFx1RkI2RCcsIGZpbmFsOiAnXFx1RkI2QicgfSxcbiAgICAvLyBMZXR0ZXIgUEVIRUhcbiAgICAnXFx1MDZBNic6IHsgaXNvbGF0ZWQ6ICdcXHVGQjZFJywgaW5pdGlhbDogJ1xcdUZCNzAnLCBtZWRpYWw6ICdcXHVGQjcxJywgZmluYWw6ICdcXHVGQjZGJyB9LFxuICAgIC8vIExldHRlciBLRUhFSFxuICAgICdcXHUwNkE5JzogeyBpc29sYXRlZDogJ1xcdUZCOEUnLCBpbml0aWFsOiAnXFx1RkI5MCcsIG1lZGlhbDogJ1xcdUZCOTEnLCBmaW5hbDogJ1xcdUZCOEYnIH0sXG4gICAgLy8gTGV0dGVyIE5HXG4gICAgJ1xcdTA2QUQnOiB7IGlzb2xhdGVkOiAnXFx1RkJEMycsIGluaXRpYWw6ICdcXHVGQkQ1JywgbWVkaWFsOiAnXFx1RkJENicsIGZpbmFsOiAnXFx1RkJENCcgfSxcbiAgICAvLyBMZXR0ZXIgR0FGXG4gICAgJ1xcdTA2QUYnOiB7IGlzb2xhdGVkOiAnXFx1RkI5MicsIGluaXRpYWw6ICdcXHVGQjk0JywgbWVkaWFsOiAnXFx1RkI5NScsIGZpbmFsOiAnXFx1RkI5MycgfSxcbiAgICAvLyBMZXR0ZXIgTkdPRUhcbiAgICAnXFx1MDZCMSc6IHsgaXNvbGF0ZWQ6ICdcXHVGQjlBJywgaW5pdGlhbDogJ1xcdUZCOUMnLCBtZWRpYWw6ICdcXHVGQjlEJywgZmluYWw6ICdcXHVGQjlCJyB9LFxuICAgIC8vIExldHRlciBHVUVIXG4gICAgJ1xcdTA2QjMnOiB7IGlzb2xhdGVkOiAnXFx1RkI5NicsIGluaXRpYWw6ICdcXHVGQjk4JywgbWVkaWFsOiAnXFx1RkI5OScsIGZpbmFsOiAnXFx1RkI5NycgfSxcbiAgICAvLyBMZXR0ZXIgTk9PTiBHSFVOTkFcbiAgICAnXFx1MDZCQSc6IHsgaXNvbGF0ZWQ6ICdcXHVGQjlFJywgZmluYWw6ICdcXHVGQjlGJyB9LFxuICAgIC8vIExldHRlciBSTk9PTlxuICAgICdcXHUwNkJCJzogeyBpc29sYXRlZDogJ1xcdUZCQTAnLCBpbml0aWFsOiAnXFx1RkJBMicsIG1lZGlhbDogJ1xcdUZCQTMnLCBmaW5hbDogJ1xcdUZCQTEnIH0sXG4gICAgLy8gTGV0dGVyIEhFSCBET0FDSEFTSE1FRVxuICAgICdcXHUwNkJFJzogeyBpc29sYXRlZDogJ1xcdUZCQUEnLCBpbml0aWFsOiAnXFx1RkJBQycsIG1lZGlhbDogJ1xcdUZCQUQnLCBmaW5hbDogJ1xcdUZCQUInIH0sXG4gICAgLy8gTGV0dGVyIEhFSCBXSVRIIFlFSCBBQk9WRVxuICAgICdcXHUwNkMwJzogeyBpc29sYXRlZDogJ1xcdUZCQTQnLCBmaW5hbDogJ1xcdUZCQTUnIH0sXG4gICAgLy8gTGV0dGVyIEhFSCBHT0FMXG4gICAgJ1xcdTA2QzEnOiB7IGlzb2xhdGVkOiAnXFx1RkJBNicsIGluaXRpYWw6ICdcXHVGQkE4JywgbWVkaWFsOiAnXFx1RkJBOScsIGZpbmFsOiAnXFx1RkJBNycgfSxcbiAgICAvLyBMZXR0ZXIgS0lSR0hJWiBPRVxuICAgICdcXHUwNkM1JzogeyBpc29sYXRlZDogJ1xcdUZCRTAnLCBmaW5hbDogJ1xcdUZCRTEnIH0sXG4gICAgLy8gTGV0dGVyIE9FXG4gICAgJ1xcdTA2QzYnOiB7IGlzb2xhdGVkOiAnXFx1RkJEOScsIGZpbmFsOiAnXFx1RkJEQScgfSxcbiAgICAvLyBMZXR0ZXIgVVxuICAgICdcXHUwNkM3JzogeyBpc29sYXRlZDogJ1xcdUZCRDcnLCBmaW5hbDogJ1xcdUZCRDgnIH0sXG4gICAgLy8gTGV0dGVyIFlVXG4gICAgJ1xcdTA2QzgnOiB7IGlzb2xhdGVkOiAnXFx1RkJEQicsIGZpbmFsOiAnXFx1RkJEQycgfSxcbiAgICAvLyBMZXR0ZXIgS0lSR0hJWiBZVVxuICAgICdcXHUwNkM5JzogeyBpc29sYXRlZDogJ1xcdUZCRTInLCBmaW5hbDogJ1xcdUZCRTMnIH0sXG4gICAgLy8gTGV0dGVyIFZFXG4gICAgJ1xcdTA2Q0InOiB7IGlzb2xhdGVkOiAnXFx1RkJERScsIGZpbmFsOiAnXFx1RkJERicgfSxcbiAgICAvLyBMZXR0ZXIgRkFSU0kgWUVIXG4gICAgJ1xcdTA2Q0MnOiB7IGlzb2xhdGVkOiAnXFx1RkJGQycsIGluaXRpYWw6ICdcXHVGQkZFJywgbWVkaWFsOiAnXFx1RkJGRicsIGZpbmFsOiAnXFx1RkJGRCcgfSxcbiAgICAvLyBMZXR0ZXIgRVxuICAgICdcXHUwNkQwJzogeyBpc29sYXRlZDogJ1xcdUZCRTQnLCBpbml0aWFsOiAnXFx1RkJFNicsIG1lZGlhbDogJ1xcdUZCRTcnLCBmaW5hbDogJ1xcdUZCRTUnIH0sXG4gICAgLy8gTGV0dGVyIFlFSCBCQVJSRUVcbiAgICAnXFx1MDZEMic6IHsgaXNvbGF0ZWQ6ICdcXHVGQkFFJywgZmluYWw6ICdcXHVGQkFGJyB9LFxuICAgIC8vIExldHRlciBZRUggQkFSUkVFIFdJVEggSEFNWkEgQUJPVkVcbiAgICAnXFx1MDZEMyc6IHsgaXNvbGF0ZWQ6ICdcXHVGQkIwJywgZmluYWw6ICdcXHVGQkIxJyB9XG59O1xuLy8gYWNjZW50IC8gdm93ZWwgbWFya3NcbnZhciBIQVJBS0FUX1JFID0gbmV3IFJlZ0V4cCgnW1xcdTA2MTAtXFx1MDYxYVxcdTA2NGItXFx1MDY1ZlxcdTA2NzBcXHUwNmQ2LVxcdTA2ZGNcXHUwNmRmLVxcdTA2ZThcXHUwNmVhLVxcdTA2ZWRcXHUwOGQ0LVxcdTA4ZTFcXHUwOGQ0LVxcdTA4ZWRcXHUwOGUzLVxcdTA4ZmZdJyk7XG5mdW5jdGlvbiBfY29ubmVjdHNfd2l0aF9sZXR0ZXJfYmVmb3JlKGxldHRlcikge1xuICAgIGlmICghZXhwb3J0cy5MRVRURVJTW2xldHRlcl0pIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgZm9ybXMgPSBleHBvcnRzLkxFVFRFUlNbbGV0dGVyXTtcbiAgICByZXR1cm4gZm9ybXMuZmluYWwgfHwgZm9ybXMubWVkaWFsO1xufVxuZnVuY3Rpb24gX2Nvbm5lY3RzX3dpdGhfbGV0dGVyX2FmdGVyKGxldHRlcikge1xuICAgIGlmICghZXhwb3J0cy5MRVRURVJTW2xldHRlcl0pIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgZm9ybXMgPSBleHBvcnRzLkxFVFRFUlNbbGV0dGVyXTtcbiAgICByZXR1cm4gZm9ybXMuaW5pdGlhbCB8fCBmb3Jtcy5tZWRpYWw7XG59XG5mdW5jdGlvbiBfY29ubmVjdHNfd2l0aF9sZXR0ZXJzX2JlZm9yZV9hbmRfYWZ0ZXIobGV0dGVyKSB7XG4gICAgaWYgKCFleHBvcnRzLkxFVFRFUlNbbGV0dGVyXSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciBmb3JtcyA9IGV4cG9ydHMuTEVUVEVSU1tsZXR0ZXJdO1xuICAgIHJldHVybiBmb3Jtcy5tZWRpYWw7XG59XG4vKiBvcHRpb25zXG57XG5kZWxldGVfaGFyYWthdDogZmFsc2UsIC8vIHJlbW92ZSBzaG9ydCB2b3dlbCBtYXJrcz9cbmxpZ2F0dXJlczogdHJ1ZSAgLy8gY29tYmluZSBtdWx0aXBsZSBsZXR0ZXJzIGludG8gbG9uZ2VyIGxpZ2F0dXJlcz9cbn1cbiovXG5mdW5jdGlvbiByZXNoYXBlKHRleHQsIG9wdGlvbnMpIHtcbiAgICBpZiAoIXRleHQpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICB2YXIgb3V0cHV0ID0gW107XG4gICAgdmFyIExFVFRFUiA9IDA7XG4gICAgdmFyIEZPUk0gPSAxO1xuICAgIHZhciBOT1RfU1VQUE9SVEVEID0gLTE7XG4gICAgLy8gaGFyYWthdCBhbmQgbGV0dGVyc1xuICAgIHZhciBkZWxldGVfaGFyYWthdCA9IG9wdGlvbnMuZGVsZXRlX2hhcmFrYXQgfHwgZmFsc2U7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZXh0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBsZXR0ZXIgPSB0ZXh0W2ldO1xuICAgICAgICAvLyBoYW5kbGUgcmVtb3ZpbmcgaGFyYWthdFxuICAgICAgICBpZiAoZGVsZXRlX2hhcmFrYXQgJiYgSEFSQUtBVF9SRS5leGVjKGxldHRlcikpIHtcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKFsnJywgTk9UX1NVUFBPUlRFRF0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZXhwb3J0cy5MRVRURVJTW2xldHRlcl0pIHtcbiAgICAgICAgICAgIC8vIGhhbmRsZSBub24tQXJhYmljIGxldHRlclxuICAgICAgICAgICAgb3V0cHV0LnB1c2goW2xldHRlciwgTk9UX1NVUFBPUlRFRF0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFvdXRwdXQubGVuZ3RoKSB7XG4gICAgICAgICAgICAvLyBmaXJzdCBBcmFiaWMgbGV0dGVyIC0gZGlzcGxheSBpc29sYXRlZCBmb3JtXG4gICAgICAgICAgICBvdXRwdXQucHVzaChbbGV0dGVyLCAnaXNvbGF0ZWQnXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgcHJldmlvdXNfb3V0cHV0ID0gb3V0cHV0W291dHB1dC5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIGlmIChwcmV2aW91c19vdXRwdXRbRk9STV0gPT09IE5PVF9TVVBQT1JURUQpIHtcbiAgICAgICAgICAgICAgICAvLyBub3QgQXJhYmljIGJlZm9yZSB0aGlzIG9uZVxuICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKFtsZXR0ZXIsICdpc29sYXRlZCddKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCEoX2Nvbm5lY3RzX3dpdGhfbGV0dGVyX2JlZm9yZShsZXR0ZXIpKSkge1xuICAgICAgICAgICAgICAgIC8vIHRoaXMgbGV0dGVyIGRvZXNuJ3QgdHJ5IHRvIGNvbm5lY3Qgd2l0aCBwcmV2aW91c1xuICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKFtsZXR0ZXIsICdpc29sYXRlZCddKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCEoX2Nvbm5lY3RzX3dpdGhfbGV0dGVyX2FmdGVyKHByZXZpb3VzX291dHB1dFtMRVRURVJdKSkpIHtcbiAgICAgICAgICAgICAgICAvLyBwcmV2aW91cyBsZXR0ZXIgZG9lc24ndCB0cnkgdG8gY29ubmVjdCB0byBtZVxuICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKFtsZXR0ZXIsICdpc29sYXRlZCddKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHByZXZpb3VzX291dHB1dFtGT1JNXSA9PT0gJ2ZpbmFsJyAmJiAhX2Nvbm5lY3RzX3dpdGhfbGV0dGVyc19iZWZvcmVfYW5kX2FmdGVyKHByZXZpb3VzX291dHB1dFtMRVRURVJdKSkge1xuICAgICAgICAgICAgICAgIC8vIHByZXZpb3VzIGxldHRlciB3YXMgZmluYWwgYW5kIGNhbm5vdCBiZSBtZWRpYWwgdG8gY29ubmVjdCB0byBtZVxuICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKFtsZXR0ZXIsICdpc29sYXRlZCddKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHByZXZpb3VzX291dHB1dFtGT1JNXSA9PSAnaXNvbGF0ZWQnKSB7XG4gICAgICAgICAgICAgICAgLy8gcHJldmlvdXMgbGV0dGVyIHdhcyBhbG9uZSAtIHdlIGNhbiBjaGFuZ2UgaXQgdG8gYmUgaW5pdGlhbCBvZiBteSBwaHJhc2VcbiAgICAgICAgICAgICAgICAvLyBmb3Igbm93IHRoaXMgbGV0dGVyIGlzIHRoZSBmaW5hbCBvZiB0aGUgcGhyYXNlXG4gICAgICAgICAgICAgICAgb3V0cHV0W291dHB1dC5sZW5ndGggLSAxXVsxXSA9ICdpbml0aWFsJztcbiAgICAgICAgICAgICAgICBvdXRwdXQucHVzaChbbGV0dGVyLCAnZmluYWwnXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBwcmV2aW91cyBsZXR0ZXIgY2FuIGJlIGNoYW5nZWQgdG8gbWVkaWFsXG4gICAgICAgICAgICAgICAgLy8gdGhpcyBvbmUgY2FuIGJlIGZpbmFsXG4gICAgICAgICAgICAgICAgb3V0cHV0W291dHB1dC5sZW5ndGggLSAxXVsxXSA9ICdtZWRpYWwnO1xuICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKFtsZXR0ZXIsICdmaW5hbCddKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBsaWdhdHVyZXNcbiAgICBpZiAob3B0aW9ucy5saWdhdHVyZXMgIT09IGZhbHNlKSB7XG4gICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgZXhwb3J0cy5MSUdBVFVSRVMubGVuZ3RoOyB4KyspIHtcbiAgICAgICAgICAgIHZhciBsaWdhdHVyZSA9IGV4cG9ydHMuTElHQVRVUkVTW3hdO1xuICAgICAgICAgICAgZm9yICh2YXIgeSA9IDA7IHkgPCBsaWdhdHVyZS5tYXRjaGVzLmxlbmd0aDsgeSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBhdHRlcm4gPSBsaWdhdHVyZS5tYXRjaGVzW3ldO1xuICAgICAgICAgICAgICAgIHZhciB0ZXh0RnJhZ21lbnQgPSB0ZXh0O1xuICAgICAgICAgICAgICAgIHZhciB0ZXh0RnJhZ21lbnRPZmZzZXQgPSAwO1xuICAgICAgICAgICAgICAgIHdoaWxlICh0ZXh0RnJhZ21lbnQuaW5kZXhPZihwYXR0ZXJuKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGRldGVybWluZSB3aGljaCBsaWdhdHVyZSBmb3JtIHRvIHVzZVxuICAgICAgICAgICAgICAgICAgICB2YXIgYSA9IHRleHRGcmFnbWVudC5pbmRleE9mKHBhdHRlcm4pO1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3RhcnRfZm9ybSA9IG91dHB1dFthICsgdGV4dEZyYWdtZW50T2Zmc2V0XVtGT1JNXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVuZF9mb3JtID0gb3V0cHV0W2EgKyB0ZXh0RnJhZ21lbnRPZmZzZXQgKyBwYXR0ZXJuLmxlbmd0aCAtIDFdW0ZPUk1dO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbGlnYXR1cmVfZm9ybSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgICAgICstLS0tLS0tLS0tLSstLS0tLS0tLS0tKy0tLS0tLS0tLSstLS0tLS0tLS0rLS0tLS0tLS0tLStcbiAgICAgICAgICAgICAgICAgICAgfCBhICAgXFwgICBiIHwgSVNPTEFURUQgfCBJTklUSUFMIHwgTUVESUFMICB8IEZJTkFMICAgIHxcbiAgICAgICAgICAgICAgICAgICAgKy0tLS0tLS0tLS0tKy0tLS0tLS0tLS0rLS0tLS0tLS0tKy0tLS0tLS0tLSstLS0tLS0tLS0tK1xuICAgICAgICAgICAgICAgICAgICB8IElTT0xBVEVEICB8IElTT0xBVEVEIHwgSU5JVElBTCB8IElOSVRJQUwgfCBJU09MQVRFRCB8XG4gICAgICAgICAgICAgICAgICAgIHwgSU5JVElBTCAgIHwgSVNPTEFURUQgfCBJTklUSUFMIHwgSU5JVElBTCB8IElTT0xBVEVEIHxcbiAgICAgICAgICAgICAgICAgICAgfCBNRURJQUwgICAgfCBGSU5BTCAgICB8IE1FRElBTCAgfCBNRURJQUwgIHwgRklOQUwgICAgfFxuICAgICAgICAgICAgICAgICAgICB8IEZJTkFMICAgICB8IEZJTkFMICAgIHwgTUVESUFMICB8IE1FRElBTCAgfCBGSU5BTCAgICB8XG4gICAgICAgICAgICAgICAgICAgICstLS0tLS0tLS0tLSstLS0tLS0tLS0tKy0tLS0tLS0tLSstLS0tLS0tLS0rLS0tLS0tLS0tLStcbiAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXJ0X2Zvcm0gPT09ICdpc29sYXRlZCcgfHwgc3RhcnRfZm9ybSA9PT0gJ2luaXRpYWwnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZW5kX2Zvcm0gPT09ICdpc29sYXRlZCcgfHwgZW5kX2Zvcm0gPT09ICdmaW5hbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWdhdHVyZV9mb3JtID0gJ2lzb2xhdGVkJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpZ2F0dXJlX2Zvcm0gPSAnaW5pdGlhbCc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZW5kX2Zvcm0gPT09ICdpc29sYXRlZCcgfHwgZW5kX2Zvcm0gPT09ICdmaW5hbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWdhdHVyZV9mb3JtID0gJ2ZpbmFsJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpZ2F0dXJlX2Zvcm0gPSAnbWVkaWFsJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIWxpZ2F0dXJlLmZvcm1zW2xpZ2F0dXJlX2Zvcm1dKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIGxpZ2F0dXJlIGNhbm5vdCBiZSBhcHBsaWVkIGluIHRoaXMgbG9jYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHRGcmFnbWVudE9mZnNldCArPSBhICsgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHRGcmFnbWVudCA9IHRleHRGcmFnbWVudC5zdWJzdHJpbmcodGV4dEZyYWdtZW50T2Zmc2V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dFthICsgdGV4dEZyYWdtZW50T2Zmc2V0XVswXSA9IGxpZ2F0dXJlLmZvcm1zW2xpZ2F0dXJlX2Zvcm1dO1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXRbYSArIHRleHRGcmFnbWVudE9mZnNldF1bMV0gPSBOT1RfU1VQUE9SVEVEO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciB6ID0gYSArIHRleHRGcmFnbWVudE9mZnNldCArIDE7IHogPCBhICsgdGV4dEZyYWdtZW50T2Zmc2V0ICsgcGF0dGVybi5sZW5ndGg7IHorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0W3pdID0gWycnLCBOT1RfU1VQUE9SVEVEXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0ZXh0RnJhZ21lbnRPZmZzZXQgKz0gYSArIDE7XG4gICAgICAgICAgICAgICAgICAgIHRleHRGcmFnbWVudCA9IHRleHRGcmFnbWVudC5zdWJzdHJpbmcodGV4dEZyYWdtZW50T2Zmc2V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dC5tYXAoZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgaWYgKG9bRk9STV0gPT09IE5PVF9TVVBQT1JURUQgJiYgb1tMRVRURVJdLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIG9bTEVUVEVSXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvcHRpb25zLmlnbm9yZUlzb2xhdGVzICYmIG9bRk9STV0gPT09ICdpc29sYXRlZCcpIHtcbiAgICAgICAgICAgIHJldHVybiBvW0xFVFRFUl0gfHwgJyc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gKGV4cG9ydHMuTEVUVEVSU1tvW0xFVFRFUl1dIHx8IHt9KVtvW0ZPUk1dXSB8fCAnJztcbiAgICAgICAgfVxuICAgIH0pLmpvaW4oJycpO1xufVxuZXhwb3J0cy5yZXNoYXBlID0gcmVzaGFwZTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBqc19hcmFiaWNfcmVzaGFwZXJfMSA9IHJlcXVpcmUoXCIuL2pzLWFyYWJpYy1yZXNoYXBlclwiKTtcbnZhciBkaXJlY3Rpb25fMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiZGlyZWN0aW9uXCIpKTtcbnZhciByZXZlcnNlX3N0cmluZ18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJyZXZlcnNlLXN0cmluZ1wiKSk7XG52YXIgZml4X2FyYWJpY19udW1iZXJzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImZpeC1hcmFiaWMtbnVtYmVyc1wiKSk7XG52YXIgaXNfbnVtYmVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImlzLW51bWJlclwiKSk7XG52YXIgaXNMVFIgPSBmdW5jdGlvbiAoc3RyKSB7IHJldHVybiBkaXJlY3Rpb25fMVtcImRlZmF1bHRcIl0oc3RyKSA9PT0gJ2x0cic7IH07XG52YXIgaXNSVEwgPSBmdW5jdGlvbiAoc3RyKSB7IHJldHVybiBkaXJlY3Rpb25fMVtcImRlZmF1bHRcIl0oc3RyKSA9PT0gJ3J0bCc7IH07XG52YXIgaXNOZXV0cmFsID0gZnVuY3Rpb24gKHN0cikgeyByZXR1cm4gZGlyZWN0aW9uXzFbXCJkZWZhdWx0XCJdKHN0cikgPT09ICduZXV0cmFsJzsgfTtcbnZhciBzcGxpdCA9IGZ1bmN0aW9uIChzdHIsIHRva2Vucykge1xuICAgIHZhciB0ZW1wQ2hhciA9IHRva2Vuc1swXTsgLy8gV2UgY2FuIHVzZSB0aGUgZmlyc3QgdG9rZW4gYXMgYSB0ZW1wb3Jhcnkgam9pbiBjaGFyYWN0ZXJcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBzdHIgPSBzdHIuc3BsaXQodG9rZW5zW2ldKS5qb2luKHRlbXBDaGFyKTtcbiAgICB9XG4gICAgdmFyIHN0ckFyciA9IHN0ci5zcGxpdCh0ZW1wQ2hhcik7XG4gICAgcmV0dXJuIHN0ckFycjtcbn07XG52YXIgdHJhbnNmb3JtID0gZnVuY3Rpb24gKHN0ciwgX2EpIHtcbiAgICB2YXIgX2IgPSBfYSA9PT0gdm9pZCAwID8ge30gOiBfYSwgX2MgPSBfYi5hcmFiaWMsIGFyYWJpYyA9IF9jID09PSB2b2lkIDAgPyB0cnVlIDogX2MsIF9kID0gX2Iuc3BhY2VIYWNrLCBzcGFjZUhhY2sgPSBfZCA9PT0gdm9pZCAwID8gZmFsc2UgOiBfZCwgX2UgPSBfYi5saWdhdHVyZXMsIGxpZ2F0dXJlcyA9IF9lID09PSB2b2lkIDAgPyBmYWxzZSA6IF9lLCBfZiA9IF9iLmlzb2xhdGVzLCBpc29sYXRlcyA9IF9mID09PSB2b2lkIDAgPyBmYWxzZSA6IF9mO1xuICAgIHZhciBuZXV0cmFsID0gc3RyLnNwbGl0KCcnKS5maWx0ZXIoZnVuY3Rpb24gKGNoYXIpIHsgcmV0dXJuIGlzTmV1dHJhbChjaGFyKSAmJiAhaXNfbnVtYmVyXzFbXCJkZWZhdWx0XCJdKGNoYXIpOyB9KTtcbiAgICB2YXIgcmV2ZXJzZWQ7XG4gICAgLy8gQSBzaW5nbGUgd29yZCwgbm8gbmVlZCB0byBzcGxpdFxuICAgIGlmIChuZXV0cmFsLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXZlcnNlZCA9IGlzTFRSKHN0cikgPyBzdHIgOiByZXZlcnNlX3N0cmluZ18xW1wiZGVmYXVsdFwiXShzdHIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV2ZXJzZWQgPSBzcGxpdChzdHIsIG5ldXRyYWwpLm1hcChmdW5jdGlvbiAod29yZCkge1xuICAgICAgICAgICAgaWYgKGlzTFRSKHdvcmQpIHx8IGlzX251bWJlcl8xW1wiZGVmYXVsdFwiXSh3b3JkKSB8fCBpc19udW1iZXJfMVtcImRlZmF1bHRcIl0oZml4X2FyYWJpY19udW1iZXJzXzFbXCJkZWZhdWx0XCJdKHdvcmQpKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB3b3JkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc2hhcGVkV29yZCA9IGFyYWJpYyA/IGpzX2FyYWJpY19yZXNoYXBlcl8xLnJlc2hhcGUod29yZCwgeyBsaWdhdHVyZXM6IGxpZ2F0dXJlcywgaWdub3JlSXNvbGF0ZXM6ICFpc29sYXRlcyB9KSA6IHdvcmQ7XG4gICAgICAgICAgICAgICAgdmFyIHJldmVyc2VXb3JkID0gcmV2ZXJzZV9zdHJpbmdfMVtcImRlZmF1bHRcIl0ocmVzaGFwZWRXb3JkKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmV2ZXJzZVdvcmQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB2YXIgdHJhbnNmb3JtZWQ7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocmV2ZXJzZWQpKSB7XG4gICAgICAgIHZhciBtZXJnZWQgPSByZXZlcnNlZC5tYXAoZnVuY3Rpb24gKHYsIGkpIHsgcmV0dXJuIFt2LCBuZXV0cmFsW2ldXTsgfSkucmVkdWNlKGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhLmNvbmNhdChiKTsgfSk7XG4gICAgICAgIHRyYW5zZm9ybWVkID0gbWVyZ2VkLnJldmVyc2UoKS5qb2luKCcnKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRyYW5zZm9ybWVkID0gcmV2ZXJzZWQ7XG4gICAgfVxuICAgIGlmIChzcGFjZUhhY2spIHtcbiAgICAgICAgdHJhbnNmb3JtZWQgPSB0cmFuc2Zvcm1lZC5zcGxpdCgnJykuam9pbignXFx1MjAwYScpO1xuICAgIH1cbiAgICB0cmFuc2Zvcm1lZCA9IHRyYW5zZm9ybWVkLnNwbGl0KCdcXG4nKS5yZXZlcnNlKCkuam9pbignXFxuJyk7XG4gICAgcmV0dXJuIHRyYW5zZm9ybWVkO1xufTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gdHJhbnNmb3JtO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==