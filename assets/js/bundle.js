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
/* harmony import */ var _kingCase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./kingCase */ "./assets/js/kingCase.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ "./assets/js/game.js");



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
let currentPiece = {};
let board_length = 9;

const selection = (coordinate) => {
  const cell = game.getPiecesByCoordinate(coordinate);

  //select one piece of the board
  if (cell != undefined){
    // if (isEmpty(currentPiece)) {
    currentPiece = cell.copy_chess();
    currentPiece.coordinate = coordinate;
    // }
  }
  else if (!isEmpty(currentPiece)){
    if (game.inKingCase(coordinate)){
      if(currentPiece._king){
        move(coordinate);
        const coord_list = coordinate.split(' ');
        console.log('yes', coord_list);
        if (coord_list[0] !== '4' && coord_list[1] !== '4'){
          alert('White win!');
        }
      }
    }
    else{
      move(coordinate);
    }
  }
  console.log('currentPiece', currentPiece);
  console.log('game', game);
};

const move = (coordinate) => {
  if (checkMove(coordinate)){
    const validMove = checkPath(coordinate);
    if (validMove){
      moveImg(coordinate)
      currentPiece = {};
      selectArea(coordinate);
    }
  }
};

const checkMove = (coordinate) => {
  const piece_coord = currentPiece.coordinate.split(' ');
  const move = coordinate.split(' ');
  return (piece_coord[0] == move[0] || piece_coord[1] == move[1]) && game.getInGame();
}

const checkPath = (coordinate) => {
  //convert coordinate in string to integer
  const piece = currentPiece.coordinate.split(' ').map(elem => parseInt(elem));
  const move = coordinate.split(' ').map(elem => parseInt(elem));
  let result = true;

  for(let i=(piece[0] < move[0]? piece[0] + 1: move[0]), end_i=(piece[0] > move[0]? piece[0] - 1: move[0]); i <= end_i && result; i++){    
    for(let j=(piece[1] < move[1]? piece[1] + 1: move[1]), end_j=(piece[1] > move[1]? piece[1] - 1: move[1]); j <= end_j && result; j++){
      
      if(game.getPiecesByCoordinate(`${i} ${j}`) != undefined){
        result = false;
      }
    }
  }  
  return result;
};

const moveImg = (coordinate) => {
  const img = document.getElementById(currentPiece.coordinate).firstChild;
  const parentMove = document.getElementById(coordinate);
  img.remove();
  parentMove.appendChild(img);
  game.changeChessCoordinate(currentPiece.coordinate, coordinate);
};

const selectArea = (coordinate) => {
  const anchor = coordinate.split(' ').map(elem => parseInt(elem));
  for(let i = -1; i < 2; i++){
    const start_j =  i ? 0 : -1;
    const end_j = i ? 1 : 2;
    for(let j = start_j; j < end_j; j += end_j){
      kill(anchor, i, j);
    }
  }
};

const kill = (anchor, x, y) => {

  const anchor_color = game.getColorChess(`${anchor[0]} ${anchor[1]}`);
  const enemy_color =  game.getColorChess(`${anchor[0] + x} ${anchor[1] + y}`);
  
  if (enemy_color !== "" && anchor_color !== enemy_color){
    const enemy_king = game.getKingChess(`${anchor[0] + x} ${anchor[1] + y}`);
    const ally_color = game.getColorChess(`${anchor[0] + (2 * x)} ${anchor[1] + (2 * y)}`)
    
    if (enemy_king){
      killKing(anchor[0] + x, anchor[1] + y);
    }
    else if (ally_color === anchor_color || game.inKingCase(`${anchor[0] + (2 * x)} ${anchor[1] + (2 * y)}`)) {
      const img = document.getElementById(`${anchor[0] + x} ${anchor[1] + y}`).firstChild;
      img.remove();
      game.delete(`${anchor[0] + x} ${anchor[1] + y}`)
    }
  }
};

const killKing = (x, y) => {

  let count = 0;

  if (game.isBlackChess(`${x-1} ${y}`) || game.inKingCase(`${x-1} ${y}`)){
    count++;
  }
  if (game.isBlackChess(`${x+1} ${y}`) || game.inKingCase(`${x+1} ${y}`)){
    count++;
  }
  if (game.isBlackChess(`${x} ${y-1}`) || game.inKingCase(`${x} ${y-1}`)){
    count++;
  }
  if (game.isBlackChess(`${x} ${y+1}`) || game.inKingCase(`${x} ${y+1}`)){
    count++;
  }
  
  console.log('je suis ici', count);
  
  if (count == 4 || (count == 3 && game.getWhiteNumber() == 1 && edge(x, y))) {
    alert("Black win");
  }
};

const edge = (x, y) => {
  return x == 0 || x == board_length - 1 || y == 0 || y == board_length - 1;
}

const isEmpty = (currentPiece) => {
  for(let item in currentPiece) return false;
  return true; 
};

//Parcourir tableau
const printTable = () => {
  game = new _game__WEBPACK_IMPORTED_MODULE_1__["Game"]();
  board9X9.forEach((row, i) => {
    row.forEach((cell, j) => {
      if(cell){
        switch (cell) {
          case 1:
            createImg(i, j, 'black', black, false);
            break;
          case 2:
            createImg(i, j, 'white', white, false);
            break;
          case 3:
            createImg(i, j, 'white', white_king, true);
            createKingCase(i, j);
            break;
          case 4:
            createKingCase(i, j);
            break;
        }
      }
    });
  });
}

const createImg = (x, y , str, path, king) => {
  let img = document.createElement("img");
  img.setAttribute("src", path);
  document.getElementById(`${x} ${y}`).appendChild(img);
  game.addPiece(x, y, str, path, king);
};

const createKingCase = (x, y) => {
  document.getElementById(`${x} ${y}`).classList.add('special');
  game.addKingCase(x, y, new _kingCase__WEBPACK_IMPORTED_MODULE_0__["KingCase"](kingCase));
};

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

    copy_chess(){
        let data = {}
        data._color = this._color;
        data._img = this._img;
        data._king = this._king;
        return data;
    }

    getColor(){
        return this._color;
    }

    getKing(){
        return this._king;
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
/* harmony import */ var _chess__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chess */ "./assets/js/chess.js");



class Game{
  constructor(){
    this._pieces = {};
    this._kingCase = {};
    this._inGame = true;
    this._blackNumber = 0;
    this._whiteNumber = 0;
  }

  getPiecesByCoordinate(coord) {
    return this._pieces[coord];
  }

  getInGame(){
    return this._inGame;
  }
  
  getColorChess(coordinate){
    if (this._pieces[coordinate] != undefined) return this._pieces[coordinate].getColor();
    else return "";
  }

  getKingChess(coordinate){
    return this._pieces[coordinate].getKing();
  }
  
  getWhiteNumber(){
    return this._whiteNumber;
  }

  addPiece(x, y, str, path, king){
    this._pieces[`${x} ${y}`] = new _chess__WEBPACK_IMPORTED_MODULE_0__["Chess"](str, path, king);
    switch(str){
      case "black":
        this._blackNumber++;
        break;
      case "white":
        this._whiteNumber++
        break;
    }
  }

  addKingCase(x, y, kCase){
    this._kingCase[`${x} ${y}`] = kCase;
  }

  
  inKingCase(coordinate){
    return this._kingCase[coordinate] != undefined;
  }

  isBlackChess(coordinate){
    return this._pieces[coordinate] != undefined && this._pieces[coordinate].getColor() == 'black';
  }

  changeChessCoordinate(oldCoord, newCoord){
    delete Object.assign(this._pieces, {[newCoord]: this._pieces[oldCoord]})[oldCoord];
  }

  

  delete(coordinate){
    const color = this._pieces[coordinate].getColor();
    switch(color){
      case "black":
        this._blackNumber--;
        break;
      case "white":
        this._whiteNumber--;
        break;
    }
    delete this._pieces[coordinate];
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