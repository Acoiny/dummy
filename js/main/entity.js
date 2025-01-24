class Drawable{
    constructor(x, y, size, color){
        this.position = {x, y};
        this.size = size;
        this.color = color;
    }

    draw(ctx){
        ctx.fillStyle = this.color;
        // console.table(this.position);
        ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
    }
}

export class SnakeTile extends Drawable{
    constructor(x, y, size, color = "yellow"){
        super(x, y, size, color);
    }
}

export class Food extends Drawable{
    constructor(x, y, size){
        super(x, y, size, "red");
    }
}