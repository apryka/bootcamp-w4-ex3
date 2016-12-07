import { Brick } from './brick'

export class SuperHardBrick extends Brick {

    constructor(sprite: HTMLElement) {
        super(sprite)

        {
            this.hit = Infinity;
            this.score = 0;
        }

    }

}