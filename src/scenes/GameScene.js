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
    }

    create() {
        const { width, height } = this.scale;
        this.bg = this.add.tileSprite(width / 2, height / 2, width, height, 'bg');

        this.player = this.physics.add.sprite(width / 2, height - 200, 'plane');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        // Animations
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

        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 10
        });

        // Touch controls
        this.isLeftMoving = false;
        this.isRightMoving = false;

        const leftBtn = this.add.image(70, height - 70, 'left_btn').setInteractive();
        const rightBtn = this.add.image(width - 70, height - 70, 'right_btn').setInteractive();
        const fireBtn = this.add.image(width / 2, height - 70, 'fire_btn').setInteractive();

        // Scale buttons
        leftBtn.setScale(0.5);
        rightBtn.setScale(0.5);
        fireBtn.setScale(0.5);
        
        // Ensure buttons stay on top
        leftBtn.setDepth(1);
        rightBtn.setDepth(1);
        fireBtn.setDepth(1);

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


    update() {
        this.bg.tilePositionY -= 2; // Scroll background

        if (this.cursors.left.isDown || this.isLeftMoving) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown || this.isRightMoving) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);
            this.player.anims.play('straight');
        }

        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.fireBullet();
        }

        this.bullets.children.iterate((bullet) => {
            if (bullet.active && bullet.y < -50) {
                this.bullets.killAndHide(bullet);
            }
        });
    }

    fireBullet() {
        const bullet = this.bullets.get(this.player.x, this.player.y - 40);

        if (bullet) {
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.body.enable = true;
            bullet.setVelocityY(-400);
            bullet.setScale(0.025);
        }
    }
}
