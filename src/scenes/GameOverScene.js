export class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(data) {
        this.score = data.score || 0;
    }

    preload() {
        this.load.image('avatar', 'assets/avatar.png');
    }

    create() {
        const { width, height } = this.scale;

        // Custom Font Style
        const fontStyle = {
            fontFamily: '"Lato", sans-serif',
            fontSize: '64px',
            fill: '#ff0000',
            stroke: '#000000',
            strokeThickness: 6
        };

        // Game Over Text
        this.add.text(width / 2, height * 0.1, 'GAME OVER', fontStyle).setOrigin(0.5);

        // Avatar
        const avatar = this.add.image(width / 2, height * 0.48, 'avatar');
        avatar.setScale(0.4); // Adjust scale as needed based on image size

        // "Nice Try!" Message
        this.add.text(width / 2, height * 0.73, 'Nice try Ace!', {
            ...fontStyle,
            fontSize: '48px',
            fill: '#ffffff',
            strokeThickness: 4
        }).setOrigin(0.5);

        // Score Text
        this.add.text(width / 2, height * 0.80, `Score: ${this.score}`, {
            ...fontStyle,
            fontSize: '32px',
            fill: '#ffffff',
            strokeThickness: 4
        }).setOrigin(0.5);

        // Restart Button
        const restartText = this.add.text(width / 2, height * 0.9, 'RESTART', {
            ...fontStyle,
            fontSize: '48px',
            fill: '#00ff00',
            strokeThickness: 4
        })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.scene.start('GameScene');
            })
            .on('pointerover', () => restartText.setStyle({ fill: '#ffff00' }))
            .on('pointerout', () => restartText.setStyle({ fill: '#00ff00' }));
    }
}
