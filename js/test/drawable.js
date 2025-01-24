export class Drawable {
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {number} size 
     * @param {string} color 
     */
    constructor(x, y, size, color) {
        this._position = {
            x,
            y,
        };
        this._size = { x: size.x, y: size.y };
        this._color = color;
    }

    /**
     * Draws the object onto the canvas
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
        ctx.fillStyle = this._color;
        ctx.fillRect(
            Math.floor(this._position.x),
            Math.floor(this._position.y),
            this._size.x,
            this._size.y,
        );
    }
}
