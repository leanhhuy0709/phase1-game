import Sprite from './Sprite'
import Graphics from './Graphics'

export default class Obstacle {
    protected sprite: Sprite
    protected width: number
    protected height: number
    protected y: number
    protected x: number
    protected moveSpeed: number
    public constructor() {
        //console.log('Nothing')
    }
    public render() {
        const image = new Image()
        image.src = this.sprite.getSprite()
        const w = this.width,
            h = this.height,
            y = this.y,
            x = this.x
        Graphics.add(image.src, x, y, w, h)
    }
    public getX() {
        return this.x
    }
    public getY() {
        return this.y
    }
    public getWidth() {
        return this.width
    }
    public setX(x: number) {
        this.x = x
    }

    public getMoveSpeed() {
        return this.moveSpeed
    }
}
