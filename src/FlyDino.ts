import Obstacle from './Obstacle'
import Sprite from './Sprite'

//const FLY_DINO_1 = 'assets/fly-dinosaur/1.png'
//const FLY_DINO_2 = 'assets/fly-dinosaur/2.png'
const FLY_DINO_3 = 'assets/fly-dinosaur/3.png'
const FLY_DINO_4 = 'assets/fly-dinosaur/4.png'
const FLY_DINO_5 = 'assets/fly-dinosaur/5.png'

export default class FlyDino extends Obstacle {
    public constructor(x: number) {
        super()
        this.sprite = new Sprite([
            FLY_DINO_3,
            FLY_DINO_3,
            FLY_DINO_3,
            FLY_DINO_4,
            FLY_DINO_4,
            FLY_DINO_4,
            FLY_DINO_5,
            FLY_DINO_5,
            FLY_DINO_5,
            FLY_DINO_4,
            FLY_DINO_4,
            FLY_DINO_4,
        ])
        this.start(x)
    }
    public start(x: number) {
        this.sprite.setIdx(0)
        this.x = x
        this.width = 90
        this.height = 80
        const arr = [50, 150, 190]
        this.y = arr[Math.floor(Math.random() * 3)] //150 or 220
        this.moveSpeed = 2
    }
}
