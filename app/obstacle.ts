import { Rect } from './rect'
import { Side } from './side'

export class Obstacle extends Rect {
    checkCollision(anotherRect : Rect) : Side {
        var w = 0.5 * (this.width() + anotherRect.width());
        var h = 0.5 * (this.height() + anotherRect.height());
        var dx = this.centerX() - anotherRect.centerX();
        var dy = this.centerY() - anotherRect.centerY();

        if (Math.abs(dx) <= w && Math.abs(dy) <= h) {
            var wy = w * dy;
            var hx = h * dx;
            if (wy > hx) {
                return wy > -hx ? Side.Top : Side.Left;
            } else {
                return wy > -hx ? Side.Right : Side.Bottom;
            }
        } else {
            return Side.None;
        }
    }
}