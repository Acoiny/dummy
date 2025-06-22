import { Entity } from './entity.js';

export class Physics {

    #entities = [];

    constructor() {}

    /**
     * Registers a new entity to the physics engine
     * @param {Entity} ent entity to register 
     */
    register(ent) {
        this.#entities.push(ent);
    }

    updatePhysics(dt) {
        for (const ent of this.#entities) {
            ent.update(dt);
        }

        this.checkCollisions();
    }

    checkCollisions() {
        for (let i = 0; i < this.#entities.length; i++) {
            for (let j = i + 1; j < this.#entities.length; j++) {
                const ent1 = this.#entities[i];
                const ent2 = this.#entities[j];

                if (ent1._position.x < ent2._position.x + ent2._size.x &&
                    ent1._position.x + ent1._size.x > ent2._position.x &&
                    ent1._position.y < ent2._position.y + ent2._size.y &&
                    ent1._position.y + ent1._size.y > ent2._position.y) {
                    ent1.onCollision(ent2);
                    ent2.onCollision(ent1);
                }
            }
        }
    }
}