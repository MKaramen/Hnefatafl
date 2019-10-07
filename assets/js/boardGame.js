let board9X9 = [
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


//Parcourir tableau
export const printTable = () => {
    board9X9.forEach((row, i) => {
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
}