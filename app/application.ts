import { Point } from './point'
import { Vector } from './vector'
import { Rect } from './rect'
import { Side } from './side'
import { Obstacle } from './obstacle' 
import { Sprite } from './sprite'
import { Ball } from './ball'
import { Paddle } from './paddle'
import { Brick } from './brick'
import { HardBrick } from './hardbrick' 
import { SuperHardBrick } from './superhardbrick'
import { GameState } from './gamestate' 
import { KeyCodes } from './keycodes'
import { Game } from './game'

console.log('Hello from BrickBuster !!!');

var game = new Game(
    <HTMLElement>document.getElementsByClassName("ball")[0],
    <HTMLElement>document.getElementsByClassName("paddle")[0],
    <HTMLCollection>document.getElementsByClassName("brick"),
    <HTMLElement>document.getElementsByClassName("game-board")[0],
    <HTMLElement>document.getElementById('lives'),
    <HTMLElement>document.getElementById('score'),
    <HTMLElement>document.getElementById('newGame')    
);

game.run();