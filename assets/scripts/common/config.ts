export enum EventType {
    SHOOT = 'shoot',
    HIT = 'hit',
    GAME_OVER = 'game_over',
    GAME_START = 'game_start',
    MOVE = 'move',
    STOP = 'stop',
    SKILL1 = 'skill1',
    SKILL2 = 'skill2'
}

export enum GameState {
    LOADING,
    START,
    PLAYING,
    GAME_OVER
}

export const Config = {
    GAME_WIDTH: 800,
    GAME_HEIGHT: 600,
    BULLET_STRAIGHT: 1600,
    
}

