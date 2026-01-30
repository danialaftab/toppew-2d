export class HomeScene extends Phaser.Scene {
    constructor() {
        super({ key: 'HomeScene' });
    }

    create() {
        const { width, height } = this.scale;

        // Title
        this.add.text(width / 2, height / 3, 'AERO GAME', {
            fontSize: '48px',
            fontStyle: 'bold',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // New Game Button
        const newGameText = this.add.text(width / 2, height / 2, 'NEW GAME', {
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
            .on('pointerover', () => newGameText.setStyle({ fill: '#ffff00' }))
            .on('pointerout', () => newGameText.setStyle({ fill: '#00ff00' }));
    }
}
