const padding = 3;

class Drawable {
    constructor(x, y, size, color) {
        this.position = { x, y };
        this.size = size;
        this.color = color;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        // console.table(this.position);
        ctx.fillRect(
            this.position.x + padding,
            this.position.y + padding,
            this.size - padding * 2,
            this.size - padding * 2,
        );
    }
}

export class SnakeTile extends Drawable {
    constructor(x, y, size, color = "#fff47a") {
        super(x, y, size, color);
    }
}

export class Food extends Drawable {
    constructor(x, y, size) {
        super(x, y, size, "#86e334");
    }
}
