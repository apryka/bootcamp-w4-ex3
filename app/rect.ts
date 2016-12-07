import { Point } from './point'

export class Rect {
    topLeft : Point;
    bottomRight : Point;

    constructor(left : number, top: number, right: number, bottom: number) {
        this.topLeft = new Point(left, top);
        this.bottomRight = new Point(right, bottom);
    }

    clone() : Rect {
        return new Rect(this.topLeft.x, this.topLeft.y, this.bottomRight.x, this.bottomRight.y);
    }

    add(point: Point) {
        this.topLeft.add(point);
        this.bottomRight.add(point);
    }

    moveTo(rect: Rect) {
        this.topLeft.x = rect.topLeft.x;
        this.topLeft.y = rect.topLeft.y;
        this.bottomRight.x = rect.bottomRight.x;
        this.bottomRight.y = rect.bottomRight.y;
    }

    moveCenterXTo(centerX : number) {
        var left = centerX - this.width() / 2;
        var right = left + this.width();
        this.topLeft.x = left;
        this.bottomRight.x = right;
    }

    moveBottomTo(bottom: number) {
        this.topLeft.y = bottom - this.height();
        this.bottomRight.y = bottom; 
    }

    width() {
        return this.bottomRight.x - this.topLeft.x;
    }

    height() {
        return this.bottomRight.y - this.topLeft.y;
    }

    centerX() {
        return (this.topLeft.x + this.bottomRight.x) / 2;
    }

    centerY() {
        return (this.topLeft.y + this.bottomRight.y) / 2;
    }

    moveLeft(step: number) {
        this.topLeft.x -= step;
        this.bottomRight.x -= step;
    }

    moveRight(step: number) {
        this.topLeft.x += step;
        this.bottomRight.x += step;
    }
}