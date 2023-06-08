import Obstacle from './Obstacle'
import Cactus from './Cactus'
import FlyDino from './FlyDino'
import TRex from './TRex'
import TRexJump from './TRexJump'

//ObstacleManager: manage obstacle and handle collision
export default class ObstacleManager {
    obtacles: Obstacle[]
    public constructor() {
        this.start()
    }
    public start() {
        this.obtacles = [new FlyDino(1000), new Cactus(1500)]
    }
    public update(isStop = false) {
        let countDel = 0
        for (let i = 0; i < this.obtacles.length; i++) {
            if (this.obtacles[i].x <= 1210) {
                this.obtacles[i].render()
            }
            if (!isStop) this.obtacles[i].x -= TRexJump.getGameSpeed() + this.obtacles[i].moveSpeed
            if (this.obtacles[i].x < -this.obtacles[i].width) {
                countDel++
            }
        }
        if (isStop) return
        this.obtacles = this.obtacles.slice(countDel, this.obtacles.length)
        for (let i = 0; i < countDel; i++) {
            const randNumber = Math.floor(Math.random() * 4)
            switch (randNumber) {
                case 0:
                case 1:
                case 2:
                    this.obtacles.push(
                        new Cactus(
                            this.obtacles[this.obtacles.length - 1].x +
                                Math.floor(Math.random() * 1000) +
                                500
                        )
                    )
                    break
                default:
                    this.obtacles.push(
                        new FlyDino(
                            this.obtacles[this.obtacles.length - 1].x +
                                Math.floor(Math.random() * 1000) +
                                500
                        )
                    )
                    break
            }
        }
    }
    public checkCollision(tRex: TRex) {
        let x2, y2, w2
        const x1 = tRex.x
        const y1 = tRex.y
        const w1 = tRex.width - 20
        //const h1 = tRex.height - 20
        for (let i = 0; i < this.obtacles.length; i++) {
            x2 = this.obtacles[i].x
            y2 = this.obtacles[i].y
            w2 = this.obtacles[i].width - 10
            //h2 = this.obtacles[i].height - 10
            if (x1 + w1 >= x2 && x2 + w2 >= x1 && y1 + w1 >= y2 && y2 + w2 >= y1) {
                //console.log("tRex Dead!");
                return true
            }
        }
        return false
    }
}
