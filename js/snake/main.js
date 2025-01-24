import { Game } from "./game.js";

let game;

let running = false;

let id = 0;

function loop() {
    game.loopIteration();
    id = requestAnimationFrame(loop);
}

console.log("main.js loaded");

window.start = function () {
    if (!running) {
        // create game if not existent
        if (!game) {
            game = new Game(document.getElementById("game"));
        } else {
            game.buildGame();
        }

        running = true;
        id = requestAnimationFrame(loop);

        document.getElementById("btn").innerHTML = "Stop";
    } else {
        cancelAnimationFrame(id);
        running = false;

        document.getElementById("btn").innerHTML = "Start";

        game.ctx.clearRect(0, 0, game.size.x, game.size.y);
    }
};
