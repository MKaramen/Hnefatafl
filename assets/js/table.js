import {selection} from "./boardGame";

//Creat table inside board id
export default () => {
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

