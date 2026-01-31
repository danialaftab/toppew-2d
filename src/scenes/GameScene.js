
import { GameConfig } from '../config/GameConfig.js';
import { Enemy } from '../objects/Enemy.js';

export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        this.load.image('bg', 'assets/background.png');
        this.load.spritesheet('plane',
            'assets/plane_sprite_sheet.png',
            { frameWidth: 100, frameHeight: 100 }
        );
        this.load.image('left_btn', 'assets/left_btn.png');
        this.load.image('right_btn', 'assets/right_btn.png');
        this.load.image('fire_btn', 'assets/fire_btn.png');
        this.load.image('bullet', 'assets/bullet.png');

        // Enemy Assets
        this.load.spritesheet('enemy', 'assets/plane_enemy.png', {
            frameWidth: 512,
            frameHeight: 750
        });
        this.load.image('fighter', 'assets/plane_enemy_fighter.png');
        this.load.spritesheet('bomber', 'assets/bomber_enemy.png', {
            frameWidth: 512,
            frameHeight: 379,
        });

        this.load.spritesheet('explosion', 'assets/explosion.png', {
            frameWidth: 256,
            frameHeight: 624
        });
    }

    create() {
        this.createBackground();
        this.createPlayer();
        this.createAnimations();
        this.createEnemies();
        this.createBullets();
        this.createInput();
        this.createUI();
        this.createColliders();
        this.createTimers();
    }

    createBackground() {
        const { width, height } = this.scale;
        this.bg = this.add.tileSprite(width / 2, height / 2, width, height, 'bg');
    }

    createPlayer() {
        const { width, height } = this.scale;
        this.player = this.physics.add.sprite(width / 2, height - GameConfig.PLAYER.START_Y_OFFSET, 'plane');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
    }

    createAnimations() {
        // Player Animations
        if (!this.anims.exists('left')) {
            this.anims.create({
                key: 'left',
                frames: this.anims.generateFrameNumbers('plane', { start: 2, end: 2 }),
                frameRate: 10,
                repeat: -1
            });
        }
        if (!this.anims.exists('straight')) {
            this.anims.create({
                key: 'straight',
                frames: this.anims.generateFrameNumbers('plane', { start: 1, end: 1 }),
                frameRate: 10,
                repeat: -1
            });
        }
        if (!this.anims.exists('right')) {
            this.anims.create({
                key: 'right',
                frames: this.anims.generateFrameNumbers('plane', { start: 0, end: 0 }),
                frameRate: 10,
                repeat: -1
            });
        }

        // Explosion
        if (!this.anims.exists('explode')) {
            this.anims.create({
                key: 'explode',
                frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 3 }),
                frameRate: 20,
                hideOnComplete: true
            });
        }

        // Enemy Animations
        if (!this.anims.exists('fly')) {
            this.anims.create({
                key: 'fly',
                frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 2 }),
                frameRate: 10,
                repeat: -1
            });
        }
        if (!this.anims.exists('fly_bomber')) {
            this.anims.create({
                key: 'fly_bomber',
                frames: this.anims.generateFrameNumbers('bomber', { start: 0, end: 2 }),
                frameRate: 10,
                repeat: -1
            });
        }
    }

    createEnemies() {
        this.enemies = this.physics.add.group({
            classType: Enemy,
            maxSize: GameConfig.ENEMY.MAX_ENEMIES,
            runChildUpdate: true // Important for custom classes to have update() called
        });
    }

    createBullets() {
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 10
        });
    }

    createInput() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Touch controls state
        this.isLeftMoving = false;
        this.isRightMoving = false;

        const { width, height } = this.scale;
        const leftBtn = this.add.image(70, height - 70, 'left_btn').setInteractive();
        const rightBtn = this.add.image(200, height - 70, 'right_btn').setInteractive();
        const fireBtn = this.add.image(width - 70, height - 70, 'fire_btn').setInteractive();

        leftBtn.setScale(0.7).setDepth(1);
        rightBtn.setScale(0.7).setDepth(1);
        fireBtn.setScale(0.15).setDepth(1);

        leftBtn.on('pointerdown', () => { this.isLeftMoving = true; });
        leftBtn.on('pointerup', () => { this.isLeftMoving = false; });
        leftBtn.on('pointerout', () => { this.isLeftMoving = false; });

        rightBtn.on('pointerdown', () => { this.isRightMoving = true; });
        rightBtn.on('pointerup', () => { this.isRightMoving = false; });
        rightBtn.on('pointerout', () => { this.isRightMoving = false; });

        fireBtn.on('pointerdown', () => {
            this.fireBullet();
        });
    }

    createUI() {
        const { width } = this.scale;

        // Score
        this.score = 0;
        this.scoreText = this.add.text(width - 20, 20, 'Score: 0', {
            fontFamily: '"Lato", sans-serif',
            fontSize: '32px',
            fill: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(1, 0).setDepth(2);

        // Lives
        this.lives = 3;
        this.livesText = this.add.text(width - 20, 60, 'Lives: 3', {
            fontFamily: '"Lato", sans-serif',
            fontSize: '32px',
            fill: '#ff0000',
            fontStyle: 'bold'
        }).setOrigin(1, 0).setDepth(2);
    }

    createColliders() {
        this.physics.add.overlap(this.bullets, this.enemies, this.hitEnemy, null, this);
        this.physics.add.overlap(this.player, this.enemies, this.hitPlayer, null, this);
    }

    createTimers() {
        this.time.addEvent({
            delay: GameConfig.ENEMY.SPAWN_RATE,
            callback: this.spawnEnemy,
            callbackScope: this,
            loop: true
        });

        this.scoreTimer = this.time.addEvent({
            delay: 500,
            callback: this.incrementScore,
            callbackScope: this,
            loop: true
        });
    }

    update() {
        if (this.lives <= 0) return; // Stop update if game over

        this.bg.tilePositionY -= GameConfig.SCENE.BG_SCROLL_SPEED;

        this.handlePlayerMovement();

        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.fireBullet();
        }

        this.bullets.children.iterate((bullet) => {
            if (bullet.active && bullet.y < -50) {
                this.bullets.killAndHide(bullet);
            }
        });

        this.enemies.children.iterate((enemy) => {
            if (enemy.active && enemy.y > this.scale.height + 50) {
                this.handleEnemyPass(enemy);
            }
        });
    }

    handlePlayerMovement() {
        if (this.cursors.left.isDown || this.isLeftMoving) {
            this.player.setVelocityX(-GameConfig.PLAYER.SPEED);
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown || this.isRightMoving) {
            this.player.setVelocityX(GameConfig.PLAYER.SPEED);
            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);
            this.player.anims.play('straight');
        }
    }

    handleEnemyPass(enemy) {
        this.lives -= 1;
        this.livesText.setText('Lives: ' + this.lives);

        // Disable enemy without explosion
        enemy.setActive(false);
        enemy.setVisible(false);
        enemy.body.enable = false; // Important: disable body to prevent further collisions

        if (this.lives <= 0) {
            this.gameOver();
        }
    }

    fireBullet() {
        if (this.lives <= 0) return;

        const bullet = this.bullets.get(this.player.x, this.player.y - 40);

        if (bullet) {
            bullet.enableBody(true, this.player.x, this.player.y - 40, true, true);
            bullet.setVelocityY(GameConfig.PLAYER.BULLET_SPEED);
            bullet.setScale(GameConfig.PLAYER.BULLET_SCALE);
        }
    }

    incrementScore() {
        if (this.lives > 0) {
            this.score += 1;
            this.scoreText.setText('Score: ' + this.score);
        }
    }

    spawnEnemy() {
        if (this.lives <= 0) return;

        if (this.enemies.countActive() >= GameConfig.ENEMY.MAX_ENEMIES) {
            return;
        }

        const x = Phaser.Math.Between(50, this.scale.width - 50);

        // Randomly select enemy type
        const typeKey = Phaser.Math.RND.pick(Object.keys(GameConfig.ENEMY.TYPES));

        const typeConfig = GameConfig.ENEMY.TYPES[typeKey];

        const enemy = this.enemies.get();

        if (enemy) {
            enemy.spawn(x, -50, typeConfig);
        }
    }

    hitEnemy(bullet, enemy) {
        // Disable bullet for pooling
        bullet.disableBody(true, true);

        if (enemy.takeDamage()) {
            enemy.die();
        }
    }

    hitPlayer(player, enemy) {
        enemy.die(); // Enemy explodes

        this.lives -= 1;
        this.livesText.setText('Lives: ' + this.lives);

        // Optional: Player hurt animation or flash
        player.setTint(0xff0000);
        this.time.delayedCall(200, () => {
            player.clearTint();
        });

        if (this.lives <= 0) {
            // Create player explosion
            const explosion = this.add.sprite(player.x, player.y, 'explosion');
            explosion.play('explode');
            player.setVisible(false);
            player.disableBody(true, true);

            this.gameOver();
        }
    }

    gameOver() {
        this.scoreTimer.remove();
        // Delay sightly to show explosion
        this.time.delayedCall(1000, () => {
            this.scene.start('GameOverScene', { score: this.score });
        });
    }
}
