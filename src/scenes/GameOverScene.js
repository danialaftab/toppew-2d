export class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(data) {
        this.score = data.score || 0;
    }

    create() {
        const { width, height } = this.scale;

        // Game Over Text
        this.add.text(width / 2, height / 3, 'GAME OVER', {
            fontSize: '48px',
            fontStyle: 'bold',
            fill: '#ff0000'
        }).setOrigin(0.5);

        // Score Text
        this.add.text(width / 2, height / 2, `Final Score: ${this.score}`, {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // Restart Button
        const restartText = this.add.text(width / 2, height * 0.75, 'RESTART', {
            fontSize: '32px',
            fill: '#00ff00',
            backgroundColor: '#000000'
        })
            .setOrigin(0.5)
            .setPadding(10)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.scene.start('GameScene');
            })
            .on('pointerover', () => restartText.setStyle({ fill: '#ffff00' }))
            .on('pointerout', () => restartText.setStyle({ fill: '#00ff00' }));
    }
}
