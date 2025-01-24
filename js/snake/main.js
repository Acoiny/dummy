import { Game } from "./game.js";

let game = new Game(document.getElementById("game"));

let id = requestAnimationFrame(loop);

function loop() {
    switch (game.gameState) {
        case "stopped":
            break;
        case "running":
            game.loopIteration();
            break;
        case "paused":
            game.drawPauseScreen();
            break;
        case "lost":
            game.drawLostScreen();
            document.getElementById("btn").innerHTML = "Restart";
            break;
    }

    id = requestAnimationFrame(loop);
}

window.start = () => {
    switch (game.gameState) {
        case "stopped":
            game.start();
            document.getElementById("btn").innerHTML = "Pause";
            break;
        case "running":
            game.gameState = "paused";
            document.getElementById("btn").innerHTML = "Resume";
            break;
        case "paused":
            game.gameState = "running";
            document.getElementById("btn").innerHTML = "Pause";
            break;
        case "lost":
            game.restart();
            document.getElementById("btn").innerHTML = "Pause";
            break;
    }
};