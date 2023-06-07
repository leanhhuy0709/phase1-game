import TRexJump from './trex-jump';

class Game {
    tRexJump: TRexJump;
    public constructor() {
    }
    public update()
    {
        this.tRexJump.update()
        requestAnimationFrame(() => this.update());
    }

    public start() {
        this.tRexJump = new TRexJump();
        requestAnimationFrame(() => this.update());
    }
}

let game = new Game();
game.start();
