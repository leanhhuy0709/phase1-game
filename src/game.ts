import TRexJump from './TRexJump'

class Game {
    tRexJump: TRexJump
    public constructor() {
        this.tRexJump = new TRexJump()
    }
    public update(currentTime: number) {
        const nextTime = Date.now()
        this.tRexJump.update(nextTime - currentTime)
        currentTime = Date.now()
        requestAnimationFrame(() => this.update(currentTime))
    }

    public start() {
        requestAnimationFrame(() => this.update(Date.now()))
    }
}

const game = new Game()
game.start()
