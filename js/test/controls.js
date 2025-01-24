import { Entity } from "./entity.js";

/**
 * 
 * @param {Entity} ent 
 * @param {{up: string, down: string, left: string, right: string, hover: string}} controls 
 */
export function addControls(ent, controls) {
    addEventListener("keydown", (event) => {
        const speed = 8000; // should be equal to gravity,
        // so that the player can jump and fall at the same speed

        const k = event.key;

        if (k === controls.up) {
            ent.accY = -speed * 2;
        }
        if (k === controls.left) {
            ent.accX = -speed;
        }
        if (k === controls.down) {
            ent.accY = speed;
        }
        if (k === controls.right) {
            ent.accX = speed;
        }
        if (k === controls.hover) {
            ent.accY = -speed;
        }
    });

    addEventListener("keyup", (event) => {
        const k = event.key;

        if (k === controls.up && ent.accY < 0) {
            ent.accY = 0;
        }
        if (k === controls.left && ent.accX < 0) {
            ent.accX = 0;
        }
        if (k === controls.down && ent.accY > 0) {
            ent.accY = 0;
        }
        if (k === controls.right && ent.accX > 0) {
            ent.accX = 0;
        }
    });
}