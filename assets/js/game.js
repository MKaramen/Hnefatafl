import {Chess} from "./chess";


export class Game{
  constructor(){
    this._pieces = {};
    this._kingCase = {};
    this._inGame = true;
    this._blackNumber = 0;
    this._whiteNumber = 0;
  }

  getPiecesByCoordinate(coord) {
    return this._pieces[coord];
  }

  getInGame(){
    return this._inGame;
  }
  
  getColorChess(coordinate){
    if (this._pieces[coordinate] != undefined) return this._pieces[coordinate].getColor();
    else return "";
  }

  getKingChess(coordinate){
    return this._pieces[coordinate].getKing();
  }
  
  getWhiteNumber(){
    return this._whiteNumber;
  }

  addPiece(x, y, str, path, king){
    this._pieces[`${x} ${y}`] = new Chess(str, path, king);
    switch(str){
      case "black":
        this._blackNumber++;
        break;
      case "white":
        this._whiteNumber++
        break;
    }
  }

  addKingCase(x, y, kCase){
    this._kingCase[`${x} ${y}`] = kCase;
  }

  
  inKingCase(coordinate){
    return this._kingCase[coordinate] != undefined;
  }

  isBlackChess(coordinate){
    return this._pieces[coordinate] != undefined && this._pieces[coordinate].getColor() == 'black';
  }

  changeChessCoordinate(oldCoord, newCoord){
    delete Object.assign(this._pieces, {[newCoord]: this._pieces[oldCoord]})[oldCoord];
  }

  

  delete(coordinate){
    const color = this._pieces[coordinate].getColor();
    switch(color){
      case "black":
        this._blackNumber--;
        break;
      case "white":
        this._whiteNumber--;
        break;
    }
    delete this._pieces[coordinate];
  }
}