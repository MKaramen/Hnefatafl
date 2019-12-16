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
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/boardGame.js":
/*!********************************!*\
  !*** ./assets/js/boardGame.js ***!
  \********************************/
/*! exports provided: selection, printTable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selection", function() { return selection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "printTable", function() { return printTable; });
/* harmony import */ var _chess__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chess */ "./assets/js/chess.js");
/* harmony import */ var _kingCase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./kingCase */ "./assets/js/kingCase.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game */ "./assets/js/game.js");




const board9X9 = [
    [4, 0, 0, 1, 1, 1, 0, 0, 4],
    [0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0],
    [1, 0, 0, 0, 2, 0, 0, 0, 1],
    [1, 1, 2, 2, 3, 2, 2, 1, 1],
    [1, 0, 0, 0, 2, 0, 0, 0, 1],
    [0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0],
    [4, 0, 0, 1, 1, 1, 0, 0, 4]
  ];

const black = "assets/img/black_piece.svg";
const white = "assets/img/white_piece.svg";
const white_king = "assets/img/white_king.svg";
const kingCase = "assets/img/win_condition.svg";

let game;

const selection = (id) => {
  // let number = entireBoard[x][y];
  console.log(id);
  console.log(game.getPiecesByCoordinate(id));

  if (true){

  }

  // switch (number) {
  //   case 0:
  //     move(number, x, y);
  //     break;
  //   case 4:
  //     if (selectedPiece.color == 3) {
  //       move(number, x, y);
  //       if (x != 4 && y != 4) {
  //         checkWin(x, y);
  //       }
  //     }
  //     break;
  //   default:
  //     currentPiece(number, x, y);
  // }

  // killKing();
};

//Parcourir tableau
const printTable = () => {
  game = new _game__WEBPACK_IMPORTED_MODULE_2__["Game"]();
  board9X9.forEach((row, i) => {
      row.forEach((cell, j) => {
        let img = document.createElement("img");
        switch (cell) {
          case 1:
            img.setAttribute("src", black);
            game.addPiece(i, j, new _chess__WEBPACK_IMPORTED_MODULE_0__["Chess"]("black", black, false));
            break;
          case 2:
            img.setAttribute("src", white);
            game.addPiece(i, j, new _chess__WEBPACK_IMPORTED_MODULE_0__["Chess"]("white", white, false));
            break;
          case 3:
            img.setAttribute("src", white_king);
            game.addPiece(i, j, new _chess__WEBPACK_IMPORTED_MODULE_0__["Chess"]("white", white_king, true));
            break;
          case 4:
            img.setAttribute("src", kingCase);
            game.addKingCase(i, j, new _kingCase__WEBPACK_IMPORTED_MODULE_1__["KingCase"](kingCase));
            break;
        }
        document
          .getElementById("board")
          .querySelectorAll("tr")
          [i].querySelectorAll("td")
          [j].appendChild(img);
      });
    });
  console.log(game);
  console.log(game._pieces['4 4'] instanceof _chess__WEBPACK_IMPORTED_MODULE_0__["Chess"]);
  
}

/***/ }),

/***/ "./assets/js/chess.js":
/*!****************************!*\
  !*** ./assets/js/chess.js ***!
  \****************************/
/*! exports provided: Chess */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Chess", function() { return Chess; });
class Chess{
    constructor(color, img, king){
        this._color = color;
        this._img = img;
        this._king = king;
    }
}

/***/ }),

/***/ "./assets/js/game.js":
/*!***************************!*\
  !*** ./assets/js/game.js ***!
  \***************************/
/*! exports provided: Game */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Game", function() { return Game; });
class Game{
    constructor(){
      this._pieces = {};
      this._kingCase = {};
    }
    addPiece(x, y, chess){
      this._pieces[`${x} ${y}`] = chess;
    }
  
    addKingCase(x, y, kCase){
      this._kingCase[`${x} ${y}`] = kCase;
    }

    getPiecesByCoordinate(coord) {
      return this._pieces[coord];
    }
  }

/***/ }),

/***/ "./assets/js/kingCase.js":
/*!*******************************!*\
  !*** ./assets/js/kingCase.js ***!
  \*******************************/
/*! exports provided: KingCase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KingCase", function() { return KingCase; });
class KingCase{
    constructor(img){
        this._img = img;
    }
}

/***/ }),

/***/ "./assets/js/main.js":
/*!***************************!*\
  !*** ./assets/js/main.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _table__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./table */ "./assets/js/table.js");
/* harmony import */ var _boardGame__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./boardGame */ "./assets/js/boardGame.js");



(() => {

    Object(_table__WEBPACK_IMPORTED_MODULE_0__["default"])();
    Object(_boardGame__WEBPACK_IMPORTED_MODULE_1__["printTable"])();
})();

/***/ }),

/***/ "./assets/js/table.js":
/*!****************************!*\
  !*** ./assets/js/table.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _boardGame__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./boardGame */ "./assets/js/boardGame.js");


//Creat table inside board id
/* harmony default export */ __webpack_exports__["default"] = (() => {
    let board = document.getElementById("board");
    let table = document.createElement("table");

    for (let i = 0; i < 9; i++) {
    let row = document.createElement("tr");
    for (let j = 0; j < 9; j++) {
        let column = document.createElement("td");
        row.appendChild(column);
        if ((i + j) % 2 == 0) {
        column.setAttribute("class", "bg_board1");
        } else {
        column.setAttribute("class", "bg_board2");
        }
        column.setAttribute("id", `${i} ${j}`);
        column.addEventListener("click", () => {
            Object(_boardGame__WEBPACK_IMPORTED_MODULE_0__["selection"])(column.id);
        });
    }
    table.appendChild(row);
    }
    board.appendChild(table);
});

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map