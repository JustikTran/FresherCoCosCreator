import { IState } from '../utils/StateManage';
export enum EventType {
    SHOOT = 'shoot',
    HIT = 'hit',
    GAME_OVER = 'game_over',
    GAME_START = 'game_start',
    MOVE = 'move',
    STOP = 'stop',
    SKILL1 = 'skill1',
    SKILL2 = 'skill2',
    SPAWN_BULLET = 'spawn_bullet',
    UPDATE_ENEMY_PROGRESS = 'update_enemy_progress',
    UPDATE_TOWER_HP = 'update_tower_hp',
    CALL_SCENE = 'callScene',
    ENEMY_ATTACK = 'enemy_attack',
    BOSS_ATTACK = 'boss_attack'
}

export const GameState = {
    START: {
        from: 'loading',
        to: 'start'
    },
    HOME: {
        from: 'start',
        to: 'home'
    },
    BACK: {
        from: 'game_room',
        to: 'home'
    },
    PlAY: {
        from: 'home',
        to: 'game_room'
    }
}

export enum EnemyType {
    ABSOLUTE = 'absolute_enemies',
    RELATIVE = 'relative_enemies',
    BOSS = 'bosses'
}

export const Config = {
    GAME_WIDTH: 800,
    GAME_HEIGHT: 600,
    BULLET_STRAIGHT: 1600,
    SPAWN_ENEMY_TIME: 5,
    SPAWN_BOSS_TIME: 10
}

