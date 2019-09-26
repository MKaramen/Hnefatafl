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
