import { GameState } from './gamestate'
import { Ball } from './ball'
import { Paddle } from './paddle'
import { Brick } from './brick'
import { HardBrick } from './hardbrick'
import { SuperHardBrick } from './superhardbrick'
import { Obstacle } from './obstacle'
import { Vector } from './vector'
import { KeyCodes } from './keycodes'
import { Side } from './side' 

export class Game {
    loopInterval: number = 10;
    gameState: GameState;
    ball: Ball;
    paddle: Paddle;
    bricks: Array<Brick> = [];

    keyMap = {};

    wallLeft : Obstacle;
    wallTop: Obstacle;
    wallRight: Obstacle;
    wallBottom: Obstacle;    

    livesLeft : number;
    score: number;

    constructor(ballElement : HTMLElement, paddle: HTMLElement, bricks: HTMLCollection, boardElement : HTMLElement, public livesLabel : HTMLElement,
        public scoreLabel: HTMLElement, public newGameBtn: HTMLElement) {
        this.gameState = GameState.Running;
        this.paddle = new Paddle(paddle, boardElement.offsetWidth);

        this.ball = new Ball(
            ballElement,            
            new Vector(3, -3) 
        );


        let hardBricks:number = 10;
        let superHardBricks:number = 2;
        let randomNumbers:number[] = [];

        while(randomNumbers.length < (hardBricks + superHardBricks)) {
            let random = Math.round(Math.random() * bricks.length);

            if (randomNumbers.indexOf(random) == -1) randomNumbers.push(random);
        }

        let randomHardBricks:number[] = randomNumbers.slice(0,hardBricks);
        let randomSuperHardBricks:number[] = randomNumbers.slice(hardBricks, bricks.length);
        console.log('bricks-length', bricks.length);
        console.log('hard-bricks', randomHardBricks);
        console.log('super-hard-bricks', randomSuperHardBricks);

        for (let i = 0; i < bricks.length; i++) {

            if (randomHardBricks.indexOf(i) != -1) {
                this.bricks.push(new HardBrick(<HTMLElement>bricks[i]));
                this.bricks[i].sprite.className += ' hard-brick';
            } else if (randomSuperHardBricks.indexOf(i) != -1) {
                this.bricks.push(new SuperHardBrick(<HTMLElement>bricks[i]));
                this.bricks[i].sprite.className += ' super-hard-brick';
            } else {
                this.bricks.push(new Brick(<HTMLElement>bricks[i]));
            }
            
        }


        this.createWalls(this.ball.radius, boardElement.offsetWidth, boardElement.offsetHeight);

        this.newGame();

        this.newGameBtn.addEventListener('click', () => this.newGame());
    }  

    createWalls(radius : number, maxX : number, maxY : number) {
        this.wallLeft = new Obstacle(-radius, -radius, 0, maxY + radius);
        this.wallTop = new Obstacle(-radius, -radius, maxX + radius, 0);
        this.wallRight = new Obstacle(maxX, -radius, maxX + radius, maxY + radius);
        this.wallBottom = new Obstacle(-radius, maxY, maxX + radius, maxY + radius);        
    }

    resetBricks(bricks: Array<Brick>) {
        bricks.forEach(function(brick) {
            if (brick.sprite.classList.contains('hard-brick')) {
                brick.hit = 2;
            } else if (brick.sprite.classList.contains('super-hard-brick')) {
                brick.hit = Infinity;
            } else {
                brick.hit = 1;
            }
            
            brick.show();
        });
    }

    newGame() {
        this.newGameBtn.style.display = 'none';
        this.score = 0;
        this.livesLeft = 3;
        this.livesLabel.innerText = '' + this.livesLeft;
        this.score = 0;
        this.scoreLabel.innerText = '' + this.score;
        this.ball.show();
        this.ball.bounceWithAngle(60);
        var ballPosition = this.ball.clone();
        ballPosition.moveCenterXTo(this.paddle.centerX());
        ballPosition.moveBottomTo(this.paddle.topLeft.y - 4);
        this.ball.moveTo(ballPosition);
        this.gameState = GameState.Running;
        this.resetBricks(this.bricks);
    }

    lostLive() {
        if (--this.livesLeft) {
            this.ball.bounceWithAngle(60);
            var ballPosition = this.ball.clone();
            ballPosition.moveCenterXTo(this.paddle.centerX());
            ballPosition.moveBottomTo(this.paddle.topLeft.y - 4);
            this.ball.moveTo(ballPosition);
        } else {
            this.gameState = GameState.GameOver;
            this.ball.hide();          
            this.newGameBtn.style.display = 'block';  
        }
        this.livesLabel.innerText = '' + this.livesLeft;
    }

    run() {
        document.addEventListener('keyup', (e) => this.keyMap[e.keyCode] = false);
        document.addEventListener('keydown', (e) => this.keyMap[e.keyCode] = true);

       setInterval(() => {
            if (this.gameState !== GameState.Running) {
                return;
            }
            var newBallPosition = this.ball.calculateNewPosition();

            if (this.keyMap[KeyCodes.LEFT]) {
                this.paddle.moveLeft(5);
            } else if (this.keyMap[KeyCodes.RIGHT]) {
                this.paddle.moveRight(5);
            }

            if (this.wallBottom.checkCollision(newBallPosition)) {
                this.lostLive();
                return;
            }

            if (this.wallLeft.checkCollision(newBallPosition) || this.wallRight.checkCollision(newBallPosition)) {
                this.ball.bounceVertical();
            }
            if (this.wallTop.checkCollision(newBallPosition)) {
                this.ball.bounceHorizontal();
            }     

            for (let brick of this.bricks) {
                let wasHit = false;

                switch (brick.checkCollision(newBallPosition)) {
                    case (Side.Left):
                    case (Side.Right):
                        this.ball.bounceVertical();
                        wasHit = true;
                        break;

                    case (Side.Top):
                    case (Side.Bottom):                    
                        this.ball.bounceHorizontal();
                        wasHit = true;
                }

                if (wasHit) {
                    if (!--brick.hit) {
                        this.score += brick.score;
                        brick.hide();
                    }
                    
                    this.scoreLabel.innerText = '' + this.score;
                    break;
                }
            }

            if (this.paddle.checkCollision(newBallPosition)) {
                this.ball.bounceWithAngle(this.paddle.calculateHitAngle(this.ball.centerX(), this.ball.radius));
            }

            this.ball.moveTo(this.ball.calculateNewPosition());
       }, this.loopInterval) 
    }
}