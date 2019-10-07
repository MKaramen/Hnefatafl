import {Chess, King} from "./chess";
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

export const selection = (id) => {
  // let number = entireBoard[x][y];
  console.log(id);

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
export const printTable = () => {
  game = new Game();
  board9X9.forEach((row, i) => {
      row.forEach((cell, j) => {
        let img = document.createElement("img");
        switch (cell) {
          case 1:
            img.setAttribute("src", black);
            game.addPiece(i, j, new Chess("black", black));
            break;
          case 2:
            img.setAttribute("src", white);
            game.addPiece(i, j, new Chess("white", white));
            break;
          case 3:
            img.setAttribute("src", white_king);
            game.addPiece(i, j, new King("white", white_king));
            break;
          case 4:
            img.setAttribute("src", kingCase);
            game.addKingCase(i, j, new KingCase(kingCase));
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
  console.log(game._pieces['4 4'] instanceof Chess);
  
}