import Graphics from './Graphics'
import Sprite from './Sprite'

const DINOSAUR_1 = 'assets/dinosaur-sprites/Jump (1).png'
const DINOSAUR_2 = 'assets/dinosaur-sprites/Jump (2).png'
const DINOSAUR_3 = 'assets/dinosaur-sprites/Jump (3).png'
const DINOSAUR_4 = 'assets/dinosaur-sprites/Jump (4).png'
const DINOSAUR_5 = 'assets/dinosaur-sprites/Jump (5).png'
const DINOSAUR_6 = 'assets/dinosaur-sprites/Jump (6).png'
const DINOSAUR_7 = 'assets/dinosaur-sprites/Jump (7).png'
const DINOSAUR_8 = 'assets/dinosaur-sprites/Jump (8).png'
const DINOSAUR_9 = 'assets/dinosaur-sprites/Jump (9).png'
const DINOSAUR_10 = 'assets/dinosaur-sprites/Jump (10).png'
const DINOSAUR_11 = 'assets/dinosaur-sprites/Jump (11).png'
const DINOSAUR_12 = 'assets/dinosaur-sprites/Jump (12).png'

const DINOSAUR_MOVE_1 = 'assets/dinosaur-sprites/Run (1).png'
const DINOSAUR_MOVE_2 = 'assets/dinosaur-sprites/Run (2).png'
const DINOSAUR_MOVE_3 = 'assets/dinosaur-sprites/Run (3).png'
const DINOSAUR_MOVE_4 = 'assets/dinosaur-sprites/Run (4).png'
const DINOSAUR_MOVE_5 = 'assets/dinosaur-sprites/Run (5).png'
const DINOSAUR_MOVE_6 = 'assets/dinosaur-sprites/Run (6).png'
const DINOSAUR_MOVE_7 = 'assets/dinosaur-sprites/Run (7).png'
const DINOSAUR_MOVE_8 = 'assets/dinosaur-sprites/Run (8).png'

const DINOSAUR_DEAD_1 = 'assets/dinosaur-sprites/Dead (6).png'
const DINOSAUR_IDLE_1 = 'assets/dinosaur-sprites/Idle (1).png'
const DINOSAUR_DUCK_1 = 'assets/dinosaur-sprites/Duck (1).png'

const GRAVITY = 1

export enum TREX_STATE {
    MOVE = 1,
    JUMP,
    FALL,
    DEAD,
    IDLE,
    DUCK,
}
//TRex: compare (sprite, x, y, width, ...)
export default class TRex {
    private moveSprite: Sprite
    private jumpSprite: Sprite
    private fallSprite: Sprite
    private deadSprite: Sprite
    private idleSprite: Sprite
    private duckSprite: Sprite
    private width: number
    private widthDefault: number
    private height: number
    private heightDefault: number
    private x: number
    private xDefault: number
    private y: number
    private yDefault: number
    private jumpSize: number
    private jumpSizeDefault: number
    private state: TREX_STATE
    public constructor() {
        console.log('TRex created')
        this.moveSprite = new Sprite([
            DINOSAUR_MOVE_1,
            DINOSAUR_MOVE_2,
            DINOSAUR_MOVE_3,
            DINOSAUR_MOVE_4,
            DINOSAUR_MOVE_5,
            DINOSAUR_MOVE_6,
            DINOSAUR_MOVE_7,
            DINOSAUR_MOVE_8,
        ])
        this.jumpSprite = new Sprite([
            DINOSAUR_1,
            DINOSAUR_2,
            DINOSAUR_3,
            DINOSAUR_4,
            DINOSAUR_5,
            DINOSAUR_6,
            DINOSAUR_7,
            DINOSAUR_8,
        ]) //,
        this.fallSprite = new Sprite([DINOSAUR_9, DINOSAUR_10, DINOSAUR_11, DINOSAUR_12])
        this.deadSprite = new Sprite([DINOSAUR_DEAD_1])
        this.idleSprite = new Sprite([DINOSAUR_IDLE_1])
        this.duckSprite = new Sprite([DINOSAUR_DUCK_1])
        this.start()
    }
    public start() {
        this.xDefault = 10
        this.yDefault = 250
        this.jumpSizeDefault = 5
        this.widthDefault = 100
        this.heightDefault = 100

        this.width = this.widthDefault
        this.height = this.heightDefault
        this.x = this.xDefault
        this.y = this.yDefault
        this.jumpSize = this.jumpSizeDefault
        this.state = TREX_STATE.MOVE
    }
    public update(deltaTime: number) {
        switch (this.state) {
            case TREX_STATE.MOVE:
                this.move(deltaTime)
                break
            case TREX_STATE.JUMP:
                this.jump(deltaTime)
                break
            case TREX_STATE.FALL:
                this.fall(deltaTime)
                break
            case TREX_STATE.DEAD:
                this.dead()
                break
            case TREX_STATE.IDLE:
                this.idle()
                break
            case TREX_STATE.DUCK:
                this.duck()
                break
        }
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
    public getState() {
        return this.state
    }
    public setState(state: TREX_STATE) {
        this.state = state
    }
    public getJumpSize() {
        return this.jumpSize
    }
    public setJumpSize(jumpSize: number) {
        this.jumpSize = jumpSize
    }
    public resetX() {
        this.x = this.xDefault
    }
    public resetY() {
        this.y = this.yDefault
    }
    public resetWidth() {
        this.width = this.widthDefault
    }
    public resetHeight() {
        this.height = this.heightDefault
    }
    public resetJumpSize() {
        this.jumpSize = this.jumpSizeDefault
    }
    private move(deltaTime: number) {
        this.resetX()
        this.resetY()
        this.resetWidth()
        this.resetHeight()
        this.fallSprite.setIdx(0)
        this.jumpSprite.setIdx(0)
        this.moveSprite.goToNext(deltaTime)
        Graphics.add(this.moveSprite.getSprite(), this.x, this.y, this.width, this.height)
    }
    private jump(deltaTime: number) {
        this.resetWidth()
        this.resetHeight()
        this.resetJumpSize()
        this.moveSprite.setIdx(0)
        this.fallSprite.setIdx(0)
        this.y -= this.jumpSize * deltaTime - (1 / 2) * deltaTime * deltaTime * GRAVITY
        if (this.jumpSprite.getIdx() + 1 < this.jumpSprite.getSpritesLength())
            this.jumpSprite.goToNext(deltaTime)
        if (this.y <= this.yDefault - 50 * this.jumpSize) this.state = TREX_STATE.FALL
        Graphics.add(this.jumpSprite.getSprite(), this.x, this.y, this.width, this.height)
    }
    private fall(deltaTime: number) {
        this.resetWidth()
        this.resetHeight()
        this.jumpSprite.setIdx(0)
        this.moveSprite.setIdx(0)
        this.y += this.jumpSize * deltaTime + (1 / 2) * GRAVITY * deltaTime * deltaTime
        if (this.fallSprite.getIdx() + 2 < this.fallSprite.getSpritesLength())
            this.fallSprite.goToNext(deltaTime)
        if (this.y + this.jumpSize * 10 >= this.yDefault)
            this.fallSprite.setIdx(this.fallSprite.getSpritesLength() - 2)
        if (this.y + this.jumpSize * 20 >= this.yDefault)
            this.fallSprite.setIdx(this.fallSprite.getSpritesLength() - 1)
        if (this.y >= this.yDefault) {
            this.y = this.yDefault
            this.state = TREX_STATE.MOVE
            this.fallSprite.setIdx(0)
        }
        Graphics.add(this.fallSprite.getSprite(), this.x, this.y, this.width, this.height)
    }
    private dead() {
        this.width = (this.widthDefault * 4) / 3 - 10
        this.height = (this.heightDefault * 2) / 3 - 10
        this.y = this.heightDefault - this.height + 10 + this.yDefault
        Graphics.add(this.deadSprite.getSprite(), this.x, this.y, this.width, this.height)
    }
    private idle() {
        this.resetY()
        Graphics.add(this.idleSprite.getSprite(), this.x, this.y, this.width, this.height)
    }
    private duck() {
        this.width = (this.widthDefault * 4) / 3 - 10
        this.height = (this.heightDefault * 2) / 3 - 10
        this.y = this.heightDefault - this.height + 10 + this.yDefault
        Graphics.add(this.duckSprite.getSprite(), this.x, this.y, this.width, this.height)
    }
}
