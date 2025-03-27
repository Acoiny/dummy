import { Food, SnakeTile } from "./entity.js";

/**
 * Convert arrow keys to WASD
 * @param {string} key
 */
function arrowToWASD(key) {
    switch (key) {
        case "ArrowUp":
            return "w";
        case "ArrowLeft":
            return "a";
        case "ArrowDown":
            return "s";
        case "ArrowRight":
            return "d";
        default:
            return key;
    }
}

export class Game {
    constructor(canvas) {
        // state
        this.gameState = "stopped";

        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.size = { x: canvas.width, y: canvas.height };

        this.numLines = 20;

        this.#buildGame();

        addEventListener("keydown", (event) => {
            const k = arrowToWASD(event.key);

            if (k === "w" || k === "a" || k === "s" || k === "d") {
                // prevent the snake from going in the opposite direction
                switch (this.dir) {
                    case "w":
                        if (k === "s") return;
                        break;
                    case "a":
                        if (k === "d") return;
                        break;
                    case "s":
                        if (k === "w") return;
                        break;
                    case "d":
                        if (k === "a") return;
                        break;
                }
                this.ndir = k;
            }
        });
    }

    loopIteration() {
        const currentTime = performance.now() / 1000;

        const dt = currentTime - this.previousTime;

        // if not enough time has elapsed, return
        if (dt < this.gameSpeed) return;

        // console.log("step: ", dt);

        this.#update();
        this.previousTime = currentTime;

        this.#draw();
    }

    start() {
        this.#buildGame();
        this.gameState = "running";
    }

    restart() {
        this.#buildGame();
        this.gameState = "running";
    }

    drawPauseScreen() {
        this.#draw();
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        this.ctx.fillRect(0, 0, this.size.x, this.size.y);

        this.ctx.fillStyle = "white";
        this.ctx.font = "30px Arial";
        this.ctx.fillText("Paused", this.size.x / 2 - 50, this.size.y / 2);
    }

    drawLostScreen() {
        this.#draw();
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        this.ctx.fillRect(0, 0, this.size.x, this.size.y);

        this.ctx.fillStyle = "white";
        this.ctx.font = "30px Arial";
        this.ctx.fillText("You lost!", this.size.x / 2 - 50, this.size.y / 2);
    }

    #buildGame() {
        document.getElementById("highscore").innerHTML =
            localStorage.getItem("highscore") || 0;

        this.tilesize = this.size.y / this.numLines;
        const ts = this.tilesize;

        this.elements = [
            new SnakeTile(ts * 4, ts * 2, ts, "orange"),
            new SnakeTile(ts * 3, ts * 2, ts),
            new SnakeTile(ts * 2, ts * 2, ts),
        ];

        this.previousTime = 0;

        this.gameSpeed = 0.5;

        this.dir = "d";
        this.ndir = "d";
        this.score = 0;

        this.lost = false;

        this.#spawnPellet();
    }

    #looseGame() {
        this.gameState = "lost";
        const prevScore = localStorage.getItem("highscore") || 0;
        if (this.score > prevScore) {
            localStorage.setItem("highscore", this.score);
            document.getElementById("highscore").innerHTML = this.score;
        }
    }

    #draw() {
        this.ctx.clearRect(0, 0, this.size.x, this.size.y);

        // draw something
        this.#drawElements();
        // drawing the grid after, because tiles should only color the cells
        this.#drawGrid();

        // draw score
        this.ctx.fillStyle = "black";
        this.ctx.font = "30px Arial";
        this.ctx.fillText("Score: " + this.score, 10, 30);
    }

    #checkPosition() {
        const head = this.elements[0];

        if (head.position.x < 0) head.position.x = this.size.x - this.tilesize;
        else if (head.position.x > this.size.x - this.tilesize)
            head.position.x = 0;

        if (head.position.y < 0) head.position.y = this.size.y - this.tilesize;
        else if (head.position.y > this.size.y - this.tilesize)
            head.position.y = 0;

        // check if head collides with any other part
        for (const el of this.elements) {
            if (el === head) continue;

            if (
                el.position.x === head.position.x &&
                el.position.y === head.position.y
            ) {
                this.#looseGame();
            }
        }

        // check if head collides with pellet
        if (
            head.position.x === this.pellet.position.x &&
            head.position.y === this.pellet.position.y
        ) {
            this.elongate = true;
            this.#spawnPellet();
            this.score++;

            // increase speed every 10 points
            if (this.score % 10 === 0) this.gameSpeed *= 0.8;
        }
    }

    #update() {
        // update snake
        const head = this.elements[0];

        let prevPos = { x: head.position.x, y: head.position.y };

        switch (this.ndir) {
            case "w":
                head.position.y -= this.tilesize;
                break;
            case "a":
                head.position.x -= this.tilesize;
                break;
            case "s":
                head.position.y += this.tilesize;
                break;
            case "d":
                head.position.x += this.tilesize;
                break;
        }

        this.dir = this.ndir;

        this.#checkPosition();

        for (let i = 1; i < this.elements.length; i++) {
            const el = this.elements[i];

            const elPos = { x: el.position.x, y: el.position.y };

            el.position.x = prevPos.x;
            el.position.y = prevPos.y;

            prevPos = { x: elPos.x, y: elPos.y };
        }

        // if the elongate flag is set, append new tile
        if (this.elongate) {
            this.elements.push(
                new SnakeTile(prevPos.x, prevPos.y, this.tilesize),
            );
            this.elongate = false;
        }
    }

    /**
     * Draw a grid on the canvas
     */
    #drawGrid() {
        for (let i = 0; i < this.numLines; i++) {
            this.ctx.fillStyle = "black";
            this.ctx.moveTo(0, (i * this.size.y) / this.numLines);
            this.ctx.lineTo(this.size.y, (i * this.size.y) / this.numLines);

            this.ctx.moveTo((i * this.size.x) / this.numLines, 0);
            this.ctx.lineTo((i * this.size.x) / this.numLines, this.size.x);
        }

        // stroke only gets called once at the end
        // of the loop
        // before it got called for every line and it slowed
        // down the game TREMENDOUSLY (from 60fps to less than 10fps)
        this.ctx.stroke();
    }

    #drawElements() {
        const len = this.elements.length;

        for (let i = len - 1; i >= 0; i--) {
            this.elements[i].draw(this.ctx);
        }

        this.pellet.draw(this.ctx);
    }

    /**
     * Spawns a pellet at a random position
     */
    #spawnPellet() {
        let x, y;

        outer: while (1) {
            x = Math.floor(Math.random() * this.numLines) * this.tilesize;
            y = Math.floor(Math.random() * this.numLines) * this.tilesize;

            // check if the position is already occupied
            for (const el of this.elements) {
                if (el.position.x === x && el.position.y === y) {
                    // if it is, continue the loop and reroll
                    continue outer;
                }
            }

            break;
        }

        // could be optimized, by not creating new pellets,
        // but instead repositioning the old one
        this.pellet = new Food(x, y, this.tilesize, "red");
    }
}
