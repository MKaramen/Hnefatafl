export class Game{
    constructor(){
      this._pieces = {};
      this._kingCase = {};
    }
    addPiece(x, y, chess){
      this._pieces[`${x} ${y}`] = chess;
    }
  
    addKingCase(x, y, kCase){
      this._kingCase[`${x} ${y}`] = kCase;
    }
  }