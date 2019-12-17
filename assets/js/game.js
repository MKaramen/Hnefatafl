import {Chess} from "./chess";


export class Game{
  constructor(){
    this._pieces = {};
    this._kingCase = {};
    this._inGame = true;
  }
  addPiece(x, y, str, path, king){
    this._pieces[`${x} ${y}`] = new Chess(str, path, king);
  }

  addKingCase(x, y, kCase){
    this._kingCase[`${x} ${y}`] = kCase;
  }

  getPiecesByCoordinate(coord) {
    return this._pieces[coord];
  }
  inKingCase(coordinate){
    return this._kingCase[coordinate] != undefined 
  }
  getInGame(){
    return this._inGame;
  }

  changeChessCoordinate(oldCoord, newCoord){
    delete Object.assign(this._pieces, {[newCoord]: this._pieces[oldCoord]})[oldCoord];
  }

  getColorChess(coordinate){
    if (this._pieces[coordinate] != undefined) return this._pieces[coordinate].getColor();
    else return "";
  }

  getKingChess(coordinate){
    return this._pieces[coordinate].getKing();
  }

  delete(coordinate){
    delete this._pieces[coordinate];
  }
}