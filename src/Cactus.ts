import Obstacle from './Obstacle'
import Sprite from './Sprite'

const CACTUS = 'assets/Cactus/Cactus.png'

export default class Cactus extends Obstacle {
    public constructor(x: number) {
        super()
        this.sprite = new Sprite([CACTUS])
        this.start(x)
    }
    public start(x: number) {
        this.x = x
        this.width = 60
        this.height = 80
        this.y = 280
        this.moveSpeed = 0.4
    }
}
