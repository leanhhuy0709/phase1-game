//import { gameSpeed } from './TRexJump'
import Graphics from './Graphics'

let gameSpeed = 0
//Score: manage score and high score
export default class Score {
    score: number
    level: number
    maxScore: number
    public constructor() {
        this.maxScore = 0
        this.start()
    }
    public start() {
        this.score = 0
        this.level = 1000
    }
    public update(isStop = false) {
        if (!isStop) {
            this.score += gameSpeed / 5
            if (this.score > this.level) {
                gameSpeed += 1
                this.level += 1000
            }
        } else {
            this.maxScore = this.maxScore > this.score ? this.maxScore : this.score
        }
        if (Graphics.ctx) {
            Graphics.ctx.font = '30px Cambria'
            Graphics.ctx.textAlign = 'start'
            Graphics.ctx.fillText(Math.floor(this.score).toString(), 20, 30)
        }
    }
}
