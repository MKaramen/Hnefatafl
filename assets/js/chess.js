export class Chess{
    constructor(color, img){
        this._color = color;
        this._img = img;
    }
}

export class King extends Chess{
    constructor(color, img) {
        super(color, img);
        this._king = true;
    }
}