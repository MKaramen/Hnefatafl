export class Chess{
    constructor(color, img, king){
        this._color = color;
        this._img = img;
        this._king = king;
    }

    copy_chess(){
        let data = {}
        data._color = this._color;
        data._img = this._img;
        data._king = this._king;
        return data;
    }

    getColor(){
        return this._color;
    }

    getKing(){
        return this._king;
    }
}