import { Entity } from "./entity.js";
import { Physics } from "./physics.js";
import { addControls } from "./controls.js";

const canvas = document.getElementById("game2");
const ctx = canvas.getContext("2d");

function run() {
    const player = new Entity(100, 100, {x: 20, y: 20}, "orange", { width: canvas.width, height: canvas.height });
    const player2 = new Entity(300, 200, {x: 500, y: 50}, "green", { width: canvas.width, height: canvas.height });

    player2.accY = -8000;

    const physics = new Physics();
    physics.register(player);
    physics.register(player2);

    let lastTime = 0;

    addControls(player, {up: "w", down: "s", left: "a", right: "d", hover: " "});

    

    function loop() {
        const currentTime = performance.now() / 1000;
        const dt = currentTime - lastTime;

        lastTime = currentTime;
        
        physics.updatePhysics(dt);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        player.draw(ctx);
        player2.draw(ctx);

        requestAnimationFrame(loop);
    }

    loop();
}

run();
