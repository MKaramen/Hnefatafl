export class Game{
  constructor(){
    this._pieces = {};
    this._kingCase = {};
    this._inGame = true;
  }
  addPiece(x, y, chess){
    this._pieces[`${x} ${y}`] = chess;
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
}