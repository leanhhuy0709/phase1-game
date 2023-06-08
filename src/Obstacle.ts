import Sprite from './Sprite'
import Graphics from './Graphics'

export default class Obstacle {
    sprite: Sprite
    location: number[]
    width: number
    height: number
    y: number
    x: number
    moveSpeed: number
    public constructor() {
        console.log('Nothing')
    }
    public render() {
        const image = new Image()
        image.src = this.sprite.getSprite()
        const w = this.width,
            h = this.height,
            y = this.y,
            x = this.x
        Graphics.add(image.src, x, y, w, h)
        /*
        image.onload = function() {
            if (Graphics.ctx) {
                Graphics.ctx.drawImage(image, x, y, w, h);
            }
        };*/
    }
}
