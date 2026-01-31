export const GameConfig = {
    PLAYER: {
        SPEED: 160,
        FIRE_RATE: 200,
        START_Y_OFFSET: 200,
        BULLET_SPEED: -400,
        BULLET_SCALE: 0.025
    },
    ENEMY: {
        SPAWN_RATE: 1000,
        MAX_ENEMIES: 6,
        TYPES: {
            drone: { hp: 1, scale: 0.15, velocity: 200, key: 'enemy', anim: 'fly' },
            fighter: { hp: 2, scale: 0.05, velocity: 200, key: 'fighter', anim: null },
            bomber: { hp: 4, scale: 0.35, velocity: 150, key: 'bomber', anim: 'fly_bomber' }
        }
    },
    SCENE: {
        BG_SCROLL_SPEED: 2
    }
};
