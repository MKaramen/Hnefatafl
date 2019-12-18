import {KingCase} from "./kingCase";
import {Grid} from "./game";

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

let grid;
let currentPiece = {};
let board_length = 9;

/**
 * A chaque click de l'utilisateur sur la grille, selection() applique une action selon l'endroit choisi.
 * @param {string} coordinate - la coordonnée en x et y de la case choisie sur la grille
 */
export const selection = (coordinate) => {
  const cell = grid.getPiecesByCoordinate(coordinate);

  //selectionne un pion de la grille
  if (cell != undefined){
    currentPiece = cell.copy_chess();
    currentPiece._coordinate = coordinate;
  }
  else if (!isEmpty(currentPiece)){
    if (grid.inKingCase(coordinate)){
      if(currentPiece._king){
        move(coordinate);
        const coord_list = coordinate.split(' ');
        if (coord_list[0] !== '4' && coord_list[1] !== '4'){
          alert('White win!');
        }
      }
    }
    else{
      move(coordinate);
    }
  }
};

/**
 * move() essaie de déplacer un pion de la grille. Si le movement est correct, la grille sera modifiée.
 * @param {string} coordinate - coordonnée de la case en x et y du déplacement
 */
const move = (coordinate) => {
  if (checkMove(coordinate)){
    const validMove = checkPath(coordinate);
    if (validMove){
      moveChess(coordinate)
      currentPiece = {};
      selectArea(coordinate);
    }
  }
};

/**
 * Vérifie si le déplacement peut être effectué;
 * @param {string} coordinate - coordonnée de la case en x et y du déplacement
 * @returns {boolean} - true si le déplacement est correct
 */
const checkMove = (coordinate) => {
  const piece_coord = currentPiece._coordinate.split(' ').map(item => parseInt(item));
  const move = coordinate.split(' ').map(item => parseInt(item));
  const xBorder = move[0] >= 0 && move[0] < board_length;
  const yBorder = move[1] >= 0 && move[1] < board_length;
  return (piece_coord[0] == move[0] || piece_coord[1] == move[1]) && grid.getInGame() && xBorder && yBorder;
}

/**
 * Vérifie le chemin entre le pion et sa case de déplacement
 * @param {string} coordinate - coordonnée en x et y du déplacement
 * @returns {boolean} - true si aucun pion se trouve sur le chemin vers la case d'arrivée
 */
const checkPath = (coordinate) => {
  //coverti la coordonnée en entier
  const piece = currentPiece._coordinate.split(' ').map(elem => parseInt(elem));
  const move = coordinate.split(' ').map(elem => parseInt(elem));
  let result = true;

  //Définir le départ de la boucle en fonction de la direction du déplacement
  for(let i=(piece[0] < move[0]? piece[0] + 1: move[0]), end_i=(piece[0] > move[0]? piece[0] - 1: move[0]); i <= end_i && result; i++){    
    for(let j=(piece[1] < move[1]? piece[1] + 1: move[1]), end_j=(piece[1] > move[1]? piece[1] - 1: move[1]); j <= end_j && result; j++){
      
      if(grid.getPiecesByCoordinate(`${i} ${j}`) != undefined){
        result = false;
      }
    }
  }  
  return result;
};

/**
 * Déplace l'image d'un pion et modifie son emplacement dans la grille
 * @param {string} coordinate - coordonnée en x et y du pion
 */
const moveChess = (coordinate) => {
  const currentList = currentPiece._coordinate.split(' ').map(item => parseInt(item));
  const coordList = coordinate.split(' ').map(item => parseInt(item));
  
  const img = document.querySelector('#board table').children[ currentList[0] ].children[ currentList[1] ].firstChild;
  const parentMove = document.querySelector('#board table').children[ coordList[0] ].children[ coordList[1] ];
  img.remove();
  parentMove.appendChild(img);
  grid.changeChessCoordinate(currentPiece._coordinate, coordinate);
};

/**
 * Sélectionne les cases aux alentours du pion sélectionné
 * @param {string} coordinate - coordonnée du pion en x et y
 */
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

/**
 * Vérifie et tue le pion selon les règles du jeu
 * (Rappelle: le pion meurt s'il se trouve coller entre 2 pions de couleur opposée excepté le roi)
 * @param {number[]} anchor - coordonnée du pion en x et y qui a fait un déplacement
 * @param {number} x - offset en x pour indiquer la direction de la vérification
 * @param {number} y - offset en y pour indiquer la direction de la vérification
 */
const kill = (anchor, x, y) => {

  const anchor_color = grid.getColorChess(`${anchor[0]} ${anchor[1]}`);
  const enemy_color =  grid.getColorChess(`${anchor[0] + x} ${anchor[1] + y}`);
  
  if (enemy_color !== "" && anchor_color !== enemy_color){
    const enemy_king = grid.getKingChess(`${anchor[0] + x} ${anchor[1] + y}`);
    const ally_color = grid.getColorChess(`${anchor[0] + (2 * x)} ${anchor[1] + (2 * y)}`)
    
    if (enemy_king){
      killKing(anchor[0] + x, anchor[1] + y);
    }
    else if (ally_color === anchor_color || grid.inKingCase(`${anchor[0] + (2 * x)} ${anchor[1] + (2 * y)}`)) {
      
      const img = document.querySelector('#board table').children[ anchor[0] + x ].children[ anchor[1] + y ].firstChild;
      img.remove();
      grid.delete(`${anchor[0] + x} ${anchor[1] + y}`)
    }
  }
};

/**
 * Vérifie et tue le roi selen les règles du jeu
 * @param {number} x - coordonnée du roi en x
 * @param {number} y - coordonnée du roi en y
 */
const killKing = (x, y) => {

  let count = 0;

  if (grid.isBlackChess(`${x-1} ${y}`) || grid.inKingCase(`${x-1} ${y}`)){
    count++;
  }
  if (grid.isBlackChess(`${x+1} ${y}`) || grid.inKingCase(`${x+1} ${y}`)){
    count++;
  }
  if (grid.isBlackChess(`${x} ${y-1}`) || grid.inKingCase(`${x} ${y-1}`)){
    count++;
  }
  if (grid.isBlackChess(`${x} ${y+1}`) || grid.inKingCase(`${x} ${y+1}`)){
    count++;
  }
    
  if (count == 4 || (count == 3 && grid.getWhiteNumber() == 1 && edge(x, y))) {
    alert("Black win");
  }
};

/**
 * Vérifie si le roi se trouve au bord de la grille
 * @param {number} x - coordonnée du roi en x
 * @param {number} y - coordonnée du roi en y
 * @returns {boolean} - true si le roi est au bord
 */
const edge = (x, y) => {
  return x == 0 || x == board_length - 1 || y == 0 || y == board_length - 1;
}

/**
 * Regarde si l'utilisateur a sélectionné un pion
 */
const isEmpty = () => {
  for(let item in currentPiece) return false;
  return true; 
};

/**
 * affiche les pions sur la page html
 */
export const displayChess = () => {
  grid = new Grid();
  board9X9.forEach((row, i) => {
    row.forEach((cell, j) => {
      if(cell){
        switch (cell) {
          case 1:
            createChess(i, j, 'black', black, false);
            break;
          case 2:
            createChess(i, j, 'white', white, false);
            break;
          case 3:
            createChess(i, j, 'white', white_king, true);
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

/**
 * Crée l'image du pion et le pion lui-même
 * @param {number} x - coordonnée du pion en x
 * @param {number} y - coordonnée du pion en y
 * @param {string} str - coleur du pion
 * @param {string} path - chemin de l'image du pion
 * @param {boolean} king - true si le pion est un roi
 */
const createChess = (x, y , str, path, king) => {
  let img = document.createElement("img");
  img.setAttribute("src", path);
  document.querySelector('#board table').children[x].children[y].appendChild(img);
  grid.addPiece(x, y, str, path, king);
};


/**
 * Crée une case spéciale pour le roi
 * @param {number} x - coordonnée de la case spéciale en x
 * @param {number} y - coordonnée de la case spéciale en y
 */
const createKingCase = (x, y) => {
  document.querySelector('#board table').children[x].children[y].classList.add('special');
  grid.addKingCase(x, y, new KingCase(kingCase));
};

/**
 * Crée la table html qui va contenir la grille du jeu
 */
export const createTable = () => {
  let board = document.getElementById("board");
  let table = document.createElement("table");

  for (let i = 0; i < 9; i++) {
  let row = document.createElement("tr");
  for (let j = 0; j < 9; j++) {
      let column = document.createElement("td");
      row.appendChild(column);
      if ((i + j) % 2 == 0) {
      column.className = "bg_board1";
      } else {
      column.className = "bg_board2";
      }
  }
  table.appendChild(row);
  }
  board.appendChild(table);
  
  $('#board').on('click', (event) => {
      const trIndex = event.target.closest('tr').rowIndex;
      const tdIndex = event.target.closest('td').cellIndex;
      const coordinate = `${trIndex} ${tdIndex}`;
      selection(coordinate);
      
  });
}