(() => {

  let pieces = [];

  class Piece {
    constructor(color, x, y, image) {
      this._color = color;
      this._x = x;
      this._y = y;
      this._image = image;
    }
  }

  class Black extends Piece {
    constructor(x, y, image) {
      super("black", x, y, image);
    }
  }

  class White extends Piece {
    constructor(king, x, y, image) {
      super("white", x, y, image)
      this._king = king;
    }
  }

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

  function create_pieces(nbr) {
    /*
      create the pieces for the board
    */
    for (let i=0; i<nbr; i++) {
      let pieces[i] = new Black(0, 0, "");
    }

  }
})();
