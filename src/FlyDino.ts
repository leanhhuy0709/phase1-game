import Obstacle from './Obstacle'
import Sprite from './Sprite'

const FLY_DINO_1 = 'assets/fly-dinosaur/1.png'
const FLY_DINO_2 = 'assets/fly-dinosaur/2.png'

export default class FlyDino extends Obstacle {
    public constructor(x: number) {
        super()
        this.sprite = new Sprite([FLY_DINO_1, FLY_DINO_2])
        this.sprite.idx = Math.floor(Math.random() * 2)
        this.x = x
        this.width = 80
        this.height = 50
        this.y = Math.floor(Math.random() * 2) * (220 - 150) + 150 //150 or 220
        this.moveSpeed = 1
    }
}
