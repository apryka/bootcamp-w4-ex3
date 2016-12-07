import { Obstacle } from './obstacle'
import { Rect } from './rect'
import { Side } from './side'

export class Sprite extends Obstacle {
    sprite: HTMLElement;
    isVisible: Boolean;

    constructor(sprite: HTMLElement, left? : number, top?: number, right?: number, bottom?: number) {
        bottom = bottom || sprite.offsetTop + sprite.offsetHeight;
        right = right || sprite.offsetLeft + sprite.offsetWidth;
        top = top || sprite.offsetTop;
        left = left || sprite.offsetLeft;

        super(left, top, right, bottom);
        this.sprite = sprite;
        this.isVisible = true;
    }

    moveTo(rect : Rect) {
        super.moveTo(rect);

        let {x: posX, y: posY} = this.topLeft;

	    this.sprite.style.left = posX + 'px';
        this.sprite.style.top = posY + 'px';         
    }

    hide() {
        this.sprite.style.display = 'none';
        this.isVisible = false;
    }    

    show() {
        this.sprite.style.display = 'block';
        this.isVisible = true;
    }    

    checkCollision(anotherRect : Rect) : Side {
        if (!this.isVisible) {
            return Side.None;
        }
        return super.checkCollision(anotherRect);
    }
}