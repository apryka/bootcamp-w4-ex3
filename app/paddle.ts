import { Sprite } from './sprite'

export class Paddle extends Sprite {
    constructor(sprite: HTMLElement, public maxRight : number) {
        super(sprite);
    }

    moveLeft(step?: number) {
        var newPosition = this.clone();
        newPosition.moveLeft(step);

        if (newPosition.topLeft.x >= 0) {
            this.moveTo(newPosition);
        }
    }

    moveRight(step? : number) {
        var newPosition = this.clone();
        newPosition.moveRight(step);

        if (newPosition.bottomRight.x <= this.maxRight) {
            this.moveTo(newPosition);
        }
    }

    calculateHitAngle(ballX : number, ballRadius : number) : number {
        var hitSpot = ballX - this.topLeft.x;
        var maxPaddle = this.width() + ballRadius;
        var minPaddle = -ballRadius;
        var paddleRange = maxPaddle - minPaddle;

        var minAngle = 160;
        var maxAngle = 20;
        var angleRange = maxAngle - minAngle;

        return ((hitSpot * angleRange) / paddleRange) + minAngle;
    }
}