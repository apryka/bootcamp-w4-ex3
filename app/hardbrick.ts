import { Brick } from './brick'

export class HardBrick extends Brick {

    constructor(sprite: HTMLElement) {
        super(sprite)

        {
            this.hit = 2;
            this.score = 20;
        }

    }

}