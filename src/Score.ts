//import { gameSpeed } from './TRexJump'
import Graphics from './Graphics'
import TRexJump from './TRexJump'

//Score: manage score and high score
export default class Score {
    private score: number
    private level: number
    private maxScore: number
    public constructor() {
        this.maxScore = 0
        this.start()
    }
    public start() {
        this.score = 0
        this.level = 1000
    }
    public update(deltaTime: number, isStop = false) {
        if (!isStop) {
            this.score += (TRexJump.getGameSpeed() / 5) * deltaTime
            if (this.score > this.level) {
                TRexJump.setGameSpeed(0.4 * deltaTime + TRexJump.getGameSpeed())
                this.level += 3000
            }
        } else {
            this.maxScore = this.maxScore > this.score ? this.maxScore : this.score
        }

        Graphics.addText(Math.floor(this.score).toString(), '30px Cambria', 'start', 20, 30)
    }
    public getScore() {
        return this.score
    }
    public getMaxScore() {
        return this.maxScore
    }
}
