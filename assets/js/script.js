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

const move = (x, y) => {
  let number = entireBoard[x][y];
  console.log(x + " " + y);

  switch (number) {
    case 4:
      console.log("I'm a corner");
      break;
    case 2:
      console.log("I'm a white piece");
      break;
    case 1:
      console.log("I'm a black piece");
      break;
    case 3:
      console.log("I'm a King");
  }
};

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
        move(i, j);
      });
    }
    table.appendChild(row);
  }
  board.appendChild(table);

  //Parcourir tableau
  entireBoard.forEach((row, i) => {
    row.forEach((cell, j) => {
      switch (cell) {
        case 1:
          let imgBlack = document.createElement("img");
          imgBlack.setAttribute("src", "assets/img/black_piece.svg");
          document
            .getElementById("board")
            .querySelectorAll("tr")
            [i].querySelectorAll("td")
            [j].appendChild(imgBlack);
          break;
        case 2:
          let imgWhite = document.createElement("img");
          imgWhite.setAttribute("src", "assets/img/white_piece.svg");
          document
            .getElementById("board")
            .querySelectorAll("tr")
            [i].querySelectorAll("td")
            [j].appendChild(imgWhite);
          break;
        case 3:
          let imgKing = document.createElement("img");
          imgKing.setAttribute("src", "assets/img/white_king.svg");
          document
            .getElementById("board")
            .querySelectorAll("tr")
            [i].querySelectorAll("td")
            [j].appendChild(imgKing);
          break;
        case 4:
          let imgCorner = document.createElement("img");
          imgCorner.setAttribute("src", "assets/img/win_condition.svg");
          document
            .getElementById("board")
            .querySelectorAll("tr")
            [i].querySelectorAll("td")
            [j].appendChild(imgCorner);
          break;
      }
    });
  });
})();
