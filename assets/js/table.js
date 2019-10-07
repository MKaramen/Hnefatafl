import {selection} from "./boardGame";

//Creat table inside board id
export const createTable = () => {
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
            selection(column.id);
        });
    }
    table.appendChild(row);
    }
    board.appendChild(table);
}