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

let selectedPiece = {
  color: -1,
  x: -1,
  y: -1
}

const selection = (x, y) => {
  let number = entireBoard[x][y];
  // console.log(x + " " + y);

  switch (number) {
    case 0:
      move(number, x, y);
      break;
    case 4:
      console.log("I'm a corner");
      break;
    default:
      currentPiece(number, x, y);
  }
};

const checkMove = (x, y) => {
  return selectedPiece.color != -1 && selectedPiece.x == x || selectedPiece.y == y;
}

const checkValidMove = (pieceX, pieceY, x, y) => {
  res = true;
  let i=pieceX;
  while (i <= x && res) {
    let j=pieceY;
    while (j <= y && res) {
      
      if (entireBoard[i][j] != 0 && entireBoard[i][j] != 4) {
        res = false;
      }
      j++;
    }
    i++;
  }
  return res;
}

const move = (number, x, y) => {
  if (checkMove(x, y)) {
    // console.log("yes");
    let validMove;
    if (selectedPiece.x == x) {
      if (selectedPiece.y < y){
        validMove = checkValidMove(x, selectedPiece.y+1, x, y);
      }
      else {
        validMove = checkValidMove(x, y, x, selectedPiece.y-1);

      }
    }
    else if (selectedPiece.y == y){
      if (selectedPiece.x < x){
        validMove = checkValidMove(selectedPiece.x+1, y, x, y);
      }
      else {
        validMove = checkValidMove(x, y, selectedPiece.x-1, y);
      }
    }

    if (validMove) {
      let img = document
                        .getElementById("board")
                        .querySelectorAll("tr")
                        [selectedPiece.x].querySelectorAll("td")
                        [selectedPiece.y].querySelector("img")
      img.setAttribute("src", "")

      if (selectedPiece.x == parseInt(entireBoard.length/2) && selectedPiece.y == parseInt(entireBoard.length/2)){
        number = 4;
        img.setAttribute("src", "assets/img/win_condition.svg")
      }
      console.log(number, parseInt(entireBoard.length/2));
      entireBoard[selectedPiece.x][selectedPiece.y] = number;
      entireBoard[x][y] = selectedPiece.color;
      
      img = document
                    .getElementById("board")
                    .querySelectorAll("tr")
                    [x].querySelectorAll("td")
                    [y].querySelector("img")

      switch (selectedPiece.color) {
        case 1:
          img.setAttribute("src", "assets/img/black_piece.svg");
          break;
        case 2:
          img.setAttribute("src", "assets/img/white_piece.svg");
          break;
        case 3:
          img.setAttribute("src", "assets/img/white_king.svg");
          break;
      }

    selectedPiece.color = -1;
    selectedPiece.x = -1;
    selectedPiece.y = -1;
    }

  }
  else {
    console.log("nope");
    
  }
}

const currentPiece = (number, x, y) => {
  if (selectedPiece.color == -1) {
    selectedPiece.color = number;
    selectedPiece.x = x;
    selectedPiece.y = y;
  }
  else if (selectedPiece.x == x && selectedPiece.y == y) {
    selectedPiece.color = -1;
    selectedPiece.x = -1;
    selectedPiece.y = -1;
  }
  let color = number == 1 ? "black" :number == 2? "white": "king";
  console.log(color, selectedPiece);
}



(() => {
  let board = document.getElementById("board");
  let table = document.createElement("table");

  //Creat table inside board id
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
      column.addEventListener("click", () => {
        selection(i, j);
      });
    }
    table.appendChild(row);
  }
  board.appendChild(table);

  //Parcourir tableau
  entireBoard.forEach((row, i) => {
    row.forEach((cell, j) => {
      let img = document.createElement("img");
      switch (cell) {
        case 1:
          img.setAttribute("src", "assets/img/black_piece.svg");
          break;
        case 2:
          img.setAttribute("src", "assets/img/white_piece.svg");
          break;
        case 3:
          img.setAttribute("src", "assets/img/white_king.svg");
          break;
        case 4:
          img.setAttribute("src", "assets/img/win_condition.svg");
          break;
      }
      document
            .getElementById("board")
            .querySelectorAll("tr")
            [i].querySelectorAll("td")
            [j].appendChild(img);
    });
  });
})();
