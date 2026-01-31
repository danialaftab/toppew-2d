export class HomeScene extends Phaser.Scene {
    constructor() {
        super({ key: 'HomeScene' });
    }

    preload() {
        this.load.image('logo', 'assets/logo.png');
    }

    create() {
        const { width, height } = this.scale;

        // Logo
        this.add.image(width / 2, height / 3, 'logo')
            .setOrigin(0.5)
            .setScale(0.5); // Adjust scale as needed

        // New Game Button
        const newGameText = this.add.text(width / 2, height / 2 + 80, 'NEW GAME', {
            fontFamily: '"Lato", sans-serif',
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
