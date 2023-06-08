import TRexJump from './TRexJump'

class Game {
    tRexJump: TRexJump
    public constructor() {
        this.tRexJump = new TRexJump()
    }
    public update() {
        this.tRexJump.update()
        requestAnimationFrame(() => this.update())
    }

    public start() {
        requestAnimationFrame(() => this.update())
    }
}

const game = new Game()
game.start()
