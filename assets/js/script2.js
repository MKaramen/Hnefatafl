let entireBoard = [
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

let inGame = true;
let black = true;

let selectedPiece = {
  color: -1,
  x: -1,
  y: -1
};

let king = {
  x: 4,
  y: 4
}

const currentPiece = (number, x, y) => {
  if (selectedPiece.color == -1) {
    if ((number == 1 && black) || (number != 1 && !black)) {
      selectedPiece.color = number;
      selectedPiece.x = x;
      selectedPiece.y = y;
    }
    
  } else {
    selectedPiece.color = -1;
    selectedPiece.x = -1;
    selectedPiece.y = -1;
  }
  let color = number == 1 ? "black" : number == 2 ? "white" : "king";
  console.log(color, selectedPiece);
};

const selection = (x, y) => {
  let number = entireBoard[x][y];
  // console.log(x + " " + y);

  switch (number) {
    case 0:
      move(number, x, y);
      break;
    case 4:
      if (selectedPiece.color == 3) {
        move(number, x, y);
        if (x != 4 && y != 4) {
          checkWin(x, y);
        }
      }
      break;
    default:
      currentPiece(number, x, y);
  }

  killKing();
};

const checkMove = (x, y) =>
  (selectedPiece.color != -1 && selectedPiece.x == x) || selectedPiece.y == y;

const checkValidMove = (origineX, origineY, x, y) => {
  let res = true;
  let i = origineX;
  while (i <= x && res) {
    let j = origineY;
    while (j <= y && res) {
      if (entireBoard[i][j] != 0 && entireBoard[i][j] != 4) {
        res = false;
      }
      j++;
    }
    i++;
  }
  return res;
};

const move = (number, x, y) => {
  if (checkMove(x, y) && inGame == true) {
    // console.log("yes");
    let validMove;
    if (selectedPiece.x == x) {
      if (selectedPiece.y < y) {
        validMove = checkValidMove(x, selectedPiece.y + 1, x, y);
      } else {
        validMove = checkValidMove(x, y, x, selectedPiece.y - 1);
      }
    } else if (selectedPiece.y == y) {
      if (selectedPiece.x < x) {
        validMove = checkValidMove(selectedPiece.x + 1, y, x, y);
      } else {
        validMove = checkValidMove(x, y, selectedPiece.x - 1, y);
      }
    }

    if (validMove) {
      let img = document
        .getElementById("board")
        .querySelectorAll("tr")
        [selectedPiece.x].querySelectorAll("td")
        [selectedPiece.y].querySelector("img");
      img.setAttribute("src", "");
      if (
        selectedPiece.x == parseInt(entireBoard.length / 2) &&
        selectedPiece.y == parseInt(entireBoard.length / 2)
      ) {
        number = 4;
        img.setAttribute("src", "assets/img/win_condition.svg");
      } else if (number == 4) {
        number = 0;
      }
      entireBoard[selectedPiece.x][selectedPiece.y] = number;
      entireBoard[x][y] = selectedPiece.color;

      img = document
        .getElementById("board")
        .querySelectorAll("tr")
        [x].querySelectorAll("td")
        [y].querySelector("img");

      switch (selectedPiece.color) {
        case 1:
          img.setAttribute("src", "assets/img/black_piece.svg");
          break;
        case 2:
          img.setAttribute("src", "assets/img/white_piece.svg");
          break;
        case 3:
          img.setAttribute("src", "assets/img/white_king.svg");
          king.x = x;
          king.y = y;
          break;
      }
      checkArea(x, y);
      selectedPiece.color = -1;
      selectedPiece.x = -1;
      selectedPiece.y = -1;
      black = !black;
    }
  } else {
    console.log("nope");
  }
};

const checkArea = (x, y) => {
  let color1, color2;
  if (entireBoard[x][y] == 1) {
    color1 = 1;
    color2 = 2;
  }
  if (entireBoard[x][y] == 2 || entireBoard[x][y] == 3) {
    color1 = 2;
    color2 = 1;
  }
  // Y-1
  if (y - 1 >= 0 && y - 2 >= 0) {
    if (
      (entireBoard[x][y] == color1 || entireBoard[x][y] == 3) &&
      entireBoard[x][y - 1] == color2 &&
      (entireBoard[x][y - 2] == color1 || entireBoard[x][y - 2] == 4 || (entireBoard[x][y - 2] == 3 && entireBoard[x][y] == 2))
    ) {
      entireBoard[x][y - 1] = 0;
      document
        .querySelectorAll("tr")
        [x].querySelectorAll("td")
        [y - 1].querySelector("img")
        .setAttribute("src", "");
    }
  }
  //Y+1
  if (y + 1 < entireBoard.length && y + 2 < entireBoard.length) {
    if (
      (entireBoard[x][y] == color1 || entireBoard[x][y] == 3) &&
      entireBoard[x][y + 1] == color2 &&
      (entireBoard[x][y + 2] == color1 || entireBoard[x][y + 2] == 4 || (entireBoard[x][y + 2] == 3 && entireBoard[x][y] == 2))
    ) {
      entireBoard[x][y + 1] = 0;
      document
        .querySelectorAll("tr")
        [x].querySelectorAll("td")
        [y + 1].querySelector("img")
        .setAttribute("src", "");
    }
  }
  //X+1
  if (x + 1 < entireBoard.length && x + 2 < entireBoard.length) {
    if (
      (entireBoard[x][y] == color1 || entireBoard[x][y] == 3) &&
      entireBoard[x + 1][y] == color2 &&
      (entireBoard[x + 2][y] == color1 || entireBoard[x + 2][y] == 4 || (entireBoard[x + 2][y] == 3 && entireBoard[x][y] == 2))
    ) {
      entireBoard[x + 1][y] = 0;
      document
        .querySelectorAll("tr")
        [x + 1].querySelectorAll("td")
        [y].querySelector("img")
        .setAttribute("src", "");
    }
  }

  // X-1
  if (x - 1 >= 0 && x - 2 >= 0) {
    if (
      (entireBoard[x][y] == color1 || entireBoard[x][y] == 3) &&
      entireBoard[x - 1][y] == color2 &&
      (entireBoard[x - 2][y] == color1 || entireBoard[x - 2][y] == 4 || (entireBoard[x - 2][y] == 3 && entireBoard[x][y] == 2))
    ) {
      entireBoard[x - 1][y] = 0;
      document
        .querySelectorAll("tr")
        [x - 1].querySelectorAll("td")
        [y].querySelector("img")
        .setAttribute("src", "");
    }
  }
};

//Check if king is kill or not
const killKing = () => {

  let x = king.x, y = king.y, count = 0;
  let throne = false;

  if (inGame) {
    if (x-1>=0 && (entireBoard[x-1][y] == 1 || entireBoard[x-1][y] == 4)){
      count++;
      if (x-1 == 4 && y == 4) throne = true;
    }
    if (x+1 < entireBoard.length && (entireBoard[x+1][y] == 1 || entireBoard[x+1][y] == 4)){
      count++;
      if (x+1 == 4 && y == 4) throne = true;
    }
    if (y-1>=0 && (entireBoard[x][y-1] == 1 || entireBoard[x][y-1] == 4 )){
      count++;
      if (x == 4 && y-1 == 4) throne = true;
    }
    if (y+1 < entireBoard.length && (entireBoard[x][y+1] == 1 || entireBoard[x][y+1] == 4)){
      count++;
      if (x-1 == 4 && y == 4) throne = true;
    }
  }

  let numberWhitePiece = 0;
  entireBoard.forEach(row => {
    row.forEach(cell => {
      if (cell == 2) numberWhitePiece++;
    })
  })
  if (count == 4 || (count == 3 && numberWhitePiece == 0 && !throne)) {
    inGame = false;
    alert("Black win");
  }
};

//CHECK WIN
const checkWin = (x, y) => {
  if (entireBoard[x][y] == 3) {
    alert("White win");
    inGame = false;
  }
};

(() => {
  // let board = document.getElementById("board");
  // let table = document.createElement("table");

  // //Creat table inside board id
  // for (let i = 0; i < 9; i++) {
  //   let row = document.createElement("tr");
  //   for (let j = 0; j < 9; j++) {
  //     let column = document.createElement("td");
  //     row.appendChild(column);
  //     if ((i + j) % 2 == 0) {
  //       column.setAttribute("class", "bg_board1");
  //     } else {
  //       column.setAttribute("class", "bg_board2");
  //     }
  //     column.addEventListener("click", () => {
  //       selection(i, j);
  //     });
  //   }
  //   table.appendChild(row);
  // }
  // board.appendChild(table);

  // //Parcourir tableau
  // entireBoard.forEach((row, i) => {
  //   row.forEach((cell, j) => {
  //     let img = document.createElement("img");
  //     switch (cell) {
  //       case 1:
  //         img.setAttribute("src", "assets/img/black_piece.svg");
  //         break;
  //       case 2:
  //         img.setAttribute("src", "assets/img/white_piece.svg");
  //         break;
  //       case 3:
  //         img.setAttribute("src", "assets/img/white_king.svg");
  //         break;
  //       case 4:
  //         img.setAttribute("src", "assets/img/win_condition.svg");
  //         break;
  //     }
  //     document
  //       .getElementById("board")
  //       .querySelectorAll("tr")
  //       [i].querySelectorAll("td")
  //       [j].appendChild(img);
  //   });
  // });
})();
