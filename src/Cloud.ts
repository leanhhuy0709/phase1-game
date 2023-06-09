import Sprite from './Sprite'
import Graphics from './Graphics'

const CLOUD_1 = './assets/background/cloud1.webp'

export default class Cloud {
    private sprite: Sprite
    private width: number
    private height: number
    private x: number
    private y: number
    private moveSpeed: number
    public constructor(x: number, y = 50) {
        //console.log()
        this.sprite = new Sprite([CLOUD_1])
        this.start(x, y)
    }
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    public start(x: number, y: number) {
        //console.log
        this.sprite.setIdx(0)
        this.x = x
        this.width = 90
        this.height = 80
        this.y = y
        this.moveSpeed = (Math.floor(Math.random() * 10) - 5) / 10
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
    public getHeight() {
        return this.height
    }
    public setX(x: number) {
        this.x = x
    }
    public setY(y: number) {
        this.y = y
    }
    public setWidth(width: number) {
        this.width = width
    }
    public setHeight(height: number) {
        this.height = height
    }
    public getMoveSpeed() {
        return this.moveSpeed
    }
}
