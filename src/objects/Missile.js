import { GameConfig } from '../config/GameConfig.js';

export class Missile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'missile');
    }

    fire(x, y, target) {
        this.enableBody(true, x, y, true, true);
        this.target = target;
        this.accel = 0; // Current speed
        this.maxSpeed = 500;
        this.turnSpeed = 2.5 * Math.PI; // Radians per second

        // Initial rotation: facing up (-90 degrees)
        this.setRotation(-Math.PI / 2);

        // Scale down the missile
        this.setScale(0.06);
    }

    update(time, delta) {
        if (!this.active) return;

        // Accelerate
        if (this.accel < this.maxSpeed) {
            this.accel += 10;
        }

        if (this.target && this.target.active) {
            // Calculate angle to target
            const targetAngle = Phaser.Math.Angle.Between(this.x, this.y, this.target.x, this.target.y);

            // Smoothly rotate towards target
            // RotateTo(currentAngle, targetAngle, speed) - speed is max change in radians
            let newRotation = Phaser.Math.Angle.RotateTo(this.rotation, targetAngle, this.turnSpeed * (delta / 1000));

            this.setRotation(newRotation);
        }

        // Move in the direction of current rotation
        this.scene.physics.velocityFromRotation(this.rotation, this.accel, this.body.velocity);

        // Out of bounds check
        if (this.y < -50 || this.y > this.scene.scale.height + 50 ||
            this.x < -50 || this.x > this.scene.scale.width + 50) {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}
