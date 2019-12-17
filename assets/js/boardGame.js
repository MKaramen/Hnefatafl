import {KingCase} from "./kingCase";
import {Game} from "./game";

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

export const selection = (coordinate) => {
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
      
      
    }
    else{
      move(coordinate);
    }
  }
  console.log('currentPiece', currentPiece);
  console.log('game', game);
  
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
  // }

  // killKing();
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
  const top_border = anchor[0]  + x >= 0 && anchor[0] + (2 * x) >= 0;
  const bottom_border = anchor[0] + x < board_length && anchor[0] +(2 * x) < board_length;
  const left_border = anchor[1] + y >= 0 && anchor[1] + (2 * y) >= 0;
  const right_border = anchor[1] + y < board_length && anchor[1] + (2 * y) < board_length;

  if (top_border && bottom_border && left_border && right_border) {
    const anchor_color = game.getColorChess(`${anchor[0]} ${anchor[1]}`);
    const enemy_color =  game.getColorChess(`${anchor[0] + x} ${anchor[1] + y}`);
    
    if (enemy_color !== "" && anchor_color !== enemy_color){
      const enemy_king = game.getKingChess(`${anchor[0] + x} ${anchor[1] + y}`);
      const ally_color = game.getColorChess(`${anchor[0] + (2 * x)} ${anchor[1] + (2 * y)}`)
      
      if (enemy_king){
        //kill king
      }
      else if (ally_color === anchor_color || game.inKingCase(`${anchor[0] + (2 * x)} ${anchor[1] + (2 * y)}`)) {
        const img = document.getElementById(`${anchor[0] + x} ${anchor[1] + y}`).firstChild;
        img.remove();
        game.delete(`${anchor[0] + x} ${anchor[1] + y}`)
      }
      
    }
    
    
    
    
  }

};

const isEmpty = (currentPiece) => {
  for(let item in currentPiece) return false;
  return true; 
};

//Parcourir tableau
export const printTable = () => {
  game = new Game();
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
  game.addKingCase(x, y, new KingCase(kingCase));
};