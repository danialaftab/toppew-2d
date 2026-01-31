
export class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'enemy');
        // Scene and physics adding is handled by the group usually, but if we extend, we might need to add explicitly if not using createCallback
    }

    spawn(x, y, typeConfig) {
        // 1. Update visual properties first
        this.setTexture(typeConfig.key);
        this.setScale(typeConfig.scale);

        // 2. Clear any previous tint
        this.clearTint();

        // 3. Reset physics body to the new position and enable it
        // This handles resetting position, velocity (to 0), and active/visible states
        this.enableBody(true, x, y, true, true);

        // 4. Sync the physics body with the new scale and texture to fix collider size
        // This must happen after setScale and enableBody
        // Manually set size to match scaled visual size (80% for forgiving hitbox)
        this.body.setSize(this.width, this.height);

        // 5. Apply properties
        this.hp = typeConfig.hp;

        if (typeConfig.anim) {
            this.play(typeConfig.anim);
        } else {
            this.stop(); // Stop any previous animation
        }

        // Ensure velocity is applied LAST
        this.setVelocityY(typeConfig.velocity);
    }

    takeDamage(amount = 1) {
        if (this.hp > 0) {
            this.hp -= amount;
            this.setTint(0xff0000);
            this.scene.time.delayedCall(100, () => {
                if (this.active) this.clearTint();
            });
        }
        return this.hp <= 0; // Returns true if dead
    }

    die() {
        // Create explosion at enemy position
        const explosion = this.scene.add.sprite(this.x, this.y, 'explosion');
        explosion.setScale(0.5);
        explosion.play('explode');
        explosion.on('animationcomplete', () => {
            explosion.destroy();
        });

        // Disable the body and hide/deactivate the sprite for pooling
        if (this.body) {
            this.disableBody(true, true);
        } else {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}
