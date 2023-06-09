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
        //console.log()
    }
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    public start(x: number) {
        //console.log
    }
    public render(deltaTime: number, isStop = false) {
        Graphics.add(this.sprite.getCurrent(), this.x, this.y, this.width, this.height)
        if (!isStop) this.sprite.goToNext(deltaTime)
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
