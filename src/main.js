import { GameScene } from './scenes/GameScene.js';
import { HomeScene } from './scenes/HomeScene.js';

const config = {
    type: Phaser.AUTO,
    width: 500,
    height: 800,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [HomeScene, GameScene], // Start with HomeScene
    physics: {
        default: 'arcade',
    }
};

const game = new Phaser.Game(config);
