import Cloud from './Cloud'
import { BACKGROUND_WIDTH } from './TRexJump'
import TRexJump from './TRexJump'

export default class CloudManager {
    private clouds: Cloud[]
    public constructor() {
        this.clouds = []
        for (let i = 0; i < 10; i++) {
            this.clouds.push(new Cloud(0))
        }
        this.start()
    }
    public start() {
        let tmp = 0,
            tmp2 = 0
        for (let i = 0; i < 10; i++) {
            tmp = Math.floor(Math.random() * 400) + 100 + tmp
            tmp2 = Math.floor(Math.random() * 100) + 50
            this.clouds[i].start(tmp, tmp2)
        }
    }
    public update(deltaTime: number, isStop = false) {
        const listObstacleNeedToReset = []
        for (let i = 0; i < this.clouds.length; i++) {
            if (this.clouds[i].getX() <= BACKGROUND_WIDTH) {
                this.clouds[i].render(deltaTime, isStop)
            }
            if (!isStop) {
                if (this.clouds[i].getX() <= BACKGROUND_WIDTH)
                    this.clouds[i].setX(
                        this.clouds[i].getX() - this.clouds[i].getMoveSpeed() * deltaTime
                    )
                this.clouds[i].setX(this.clouds[i].getX() - TRexJump.getGameSpeed() * deltaTime)
                if (this.clouds[i].getX() < -this.clouds[i].getWidth() && !isStop) {
                    listObstacleNeedToReset.push(i)
                }
            }
        }

        if (isStop) return

        let maxX = 0,
            tmp2 = 0
        for (let i = 0; i < this.clouds.length; i++)
            maxX = maxX > this.clouds[i].getX() ? maxX : this.clouds[i].getX()
        for (let i = 0, j = 0; i < listObstacleNeedToReset.length; i++) {
            j = listObstacleNeedToReset[i]
            maxX += Math.floor(Math.random() * 400) + 50
            tmp2 = Math.floor(Math.random() * 100) + 50
            this.clouds[j].setX(maxX)
            this.clouds[j].setY(tmp2)
        }
    }
}
