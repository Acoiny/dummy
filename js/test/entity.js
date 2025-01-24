import { Drawable } from "./drawable.js";

export class Entity extends Drawable {
    #levelSize;
    #speed;
    #acceleration;

    /**
     *
     * @param {number} x starting position
     * @param {number} y starting position
     * @param {{x: number, y: number}} size
     * @param {string} color
     * @param {{width: number, height: number}} levelSize the levels bounds
     */
    constructor(x, y, size, color, levelSize) {
        super(x, y, size, color);

        this.#levelSize = { width: levelSize.width, height: levelSize.height };

        this.#speed = { x: 0, y: 0 };
        this.#acceleration = { x: 0, y: 0 };
    }

    onCollision(ent) {
        const collisionDirection = this.detectCollisionDirection(ent);

        if (collisionDirection === "right") {
            this._position.x = ent.posX + ent.sizeX;
            this.#speed.x = 0;
        } else if (collisionDirection === "left") {
            this._position.x = ent.posX - this._size.x;
            this.#speed.x = 0;
        } else if (collisionDirection === "bottom") {
            this._position.y = ent.posY + ent.sizeY;
            this.#speed.y = 0;
        } else if (collisionDirection === "top") {
            this._position.y = ent.posY - this._size.y;
            this.#speed.y = 0;
        }
    }

    detectCollisionDirection(ent) {
        const dx =
            this._position.x + this._size.x / 2 - (ent.posX + ent.sizeX / 2);
        const dy =
            this._position.y + this._size.y / 2 - (ent.posY + ent.sizeY / 2);
        const width = (this._size.x + ent.sizeX) / 2;
        const height = (this._size.y + ent.sizeY) / 2;
        const crossWidth = width * dy;
        const crossHeight = height * dx;

        let res = null;

        if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
            if (crossWidth > crossHeight) {
                res = crossWidth > -crossHeight ? "bottom" : "left";
            } else {
                res = crossWidth > -crossHeight ? "right" : "top";
            }
        }

        // logging the players collision direction, as its orange
        // if (this._color === "orange") console.log(res);

        return res;
    }

    /**
     * @param {number} dt elapsed time in seconds
     */
    update(dt) {
        const friction = 0.9;
        const gravity = 8000;

        this.#speed.x += this.#acceleration.x * dt;
        this.#speed.y += this.#acceleration.y * dt;

        this.#speed.y += gravity * dt;

        this.#speed.x *= friction;
        this.#speed.y *= friction;

        this._position.x += this.#speed.x * dt;
        this._position.y += this.#speed.y * dt;

        if (this._position.x < 0) {
            this._position.x = 0;
            this.#speed.x = 0;
        }
        if (this._position.x + this._size.x > this.#levelSize.width) {
            this._position.x = this.#levelSize.width - this._size.x;
            this.#speed.x = 0;
        }
        if (this._position.y < 0) {
            this._position.y = 0;
            this.#speed.y = 0;
        }
        if (this._position.y + this._size.y > this.#levelSize.height) {
            this._position.y = this.#levelSize.height - this._size.y;
            this.#speed.y = 0;
        }
    }

    get accX() {
        return this.#acceleration.x;
    }

    /**
     * @param {number} x
     */
    set accX(x) {
        this.#acceleration.x = x;
    }

    get accY() {
        return this.#acceleration.y;
    }

    /**
     * @param {number} y
     */
    set accY(y) {
        this.#acceleration.y = y;
    }

    get posX() {
        return this._position.x;
    }

    get posY() {
        return this._position.y;
    }

    get velX() {
        return this.#speed.x;
    }

    get velY() {
        return this.#speed.y;
    }

    get sizeX() {
        return this._size.x;
    }

    get sizeY() {
        return this._size.y;
    }
}
