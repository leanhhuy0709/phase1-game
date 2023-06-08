import Obstacle from './Obstacle'
import Cactus from './Cactus'
import TRex from './TRex'
import TRexJump from './TRexJump'
import FlyDino from './FlyDino'
import { BACKGROUND_WIDTH } from './TRexJump'

//ObstacleManager: manage obstacle and handle collision
export default class ObstacleManager {
    private obstacles: Obstacle[]
    public constructor() {
        this.obstacles = []
        const randNum = [1, 2, 4, 4, 5, 6, 6, 8, 8, 10]
        randNum.sort(() => Math.random())
        for (let i = 0; i < 10; i++) {
            if (randNum[i] % 2) this.obstacles.push(new FlyDino(0))
            else this.obstacles.push(new Cactus(0))
        }
        this.start()
    }
    public start() {
        let tmp = 0
        for (let i = 0; i < 10; i++) {
            tmp = Math.floor(Math.random() * 1000) + 400 + tmp
            this.obstacles[i].setX(tmp)
        }
    }
    public update(deltaTime: number, isStop = false) {
        const listObstacleNeedToReset = []
        for (let i = 0; i < this.obstacles.length; i++) {
            if (this.obstacles[i].getX() <= BACKGROUND_WIDTH) {
                this.obstacles[i].render()
            }
            if (!isStop) {
                if (this.obstacles[i].getX() <= BACKGROUND_WIDTH)
                    this.obstacles[i].setX(
                        this.obstacles[i].getX() - this.obstacles[i].getMoveSpeed() * deltaTime
                    )
                this.obstacles[i].setX(
                    this.obstacles[i].getX() - TRexJump.getGameSpeed() * deltaTime
                )
            }

            if (this.obstacles[i].getX() < -this.obstacles[i].getWidth() && !isStop) {
                listObstacleNeedToReset.push(i)
            }
        }
        if (isStop) return

        let maxX = 0
        for (let i = 0; i < this.obstacles.length; i++)
            maxX = maxX > this.obstacles[i].getX() ? maxX : this.obstacles[i].getX()
        for (let i = 0, j = 0; i < listObstacleNeedToReset.length; i++) {
            j = listObstacleNeedToReset[i]
            maxX += Math.floor(Math.random() * 1000) + 400
            this.obstacles[j].setX(maxX)
        }
    }
    public checkCollision(tRex: TRex) {
        let x2, y2, w2
        const x1 = tRex.getX()
        const y1 = tRex.getY()
        const w1 = tRex.getWidth() - 20
        //const h1 = tRex.height - 20
        for (let i = 0; i < this.obstacles.length; i++) {
            x2 = this.obstacles[i].getX()
            y2 = this.obstacles[i].getY()
            w2 = this.obstacles[i].getWidth() - 10
            //h2 = this.obstacles[i].height - 10
            if (x1 + w1 >= x2 && x2 + w2 >= x1 && y1 + w1 >= y2 && y2 + w2 >= y1) {
                //console.log("tRex Dead!");
                return true
            }
        }
        return false
    }
}
