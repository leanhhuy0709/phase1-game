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

//const GRAVITY = 1

enum TREX_STATE {
    MOVE = 1,
    JUMP,
    FALL,
    DEAD,
    IDLE,
    DUCK,
}
//TRex: compare (sprite, x, y, width, ...)
export default class TRex {
    moveSprite: Sprite
    jumpSprite: Sprite
    fallSprite: Sprite
    deadSprite: Sprite
    idleSprite: Sprite
    duckSprite: Sprite
    width: number
    widthDefault: number
    height: number
    heightDefault: number
    x: number
    xDefault: number
    y: number
    yDefault: number
    jumpSize: number
    jumpSizeDefault: number
    state: TREX_STATE
    public constructor() {
        this.start()
    }
    public start() {
        console.log('TRex created')
        //DINOSAUR_DUCK_1
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
    public update() {
        const image = new Image()
        let w = this.width
        let h = this.height
        const x = this.x
        let y = this.y
        switch (this.state) {
            case TREX_STATE.MOVE:
                this.width = this.widthDefault
                this.height = this.heightDefault
                this.x = this.xDefault
                this.y = this.yDefault
                this.jumpSprite.idx = this.fallSprite.idx = 0
                this.moveSprite.addStt()
                image.src = this.moveSprite.getSprite()
                break
            case TREX_STATE.JUMP:
                this.width = this.widthDefault
                this.height = this.heightDefault
                this.jumpSize = this.jumpSizeDefault
                this.moveSprite.idx = this.fallSprite.idx = 0
                this.y -= this.jumpSize
                if (this.jumpSprite.idx + 1 < this.jumpSprite.sprites.length)
                    this.jumpSprite.addStt()
                image.src = this.jumpSprite.getSprite()
                if (this.y <= this.yDefault - 30 * this.jumpSize) this.state = TREX_STATE.FALL
                break
            case TREX_STATE.FALL:
                this.width = this.widthDefault
                this.height = this.heightDefault
                this.jumpSprite.idx = this.moveSprite.idx = 0
                this.y += this.jumpSize / 2
                if (this.fallSprite.idx + 2 < this.fallSprite.sprites.length)
                    this.fallSprite.addStt()
                image.src = this.fallSprite.getSprite()

                if (this.y + this.jumpSize * 10 >= this.yDefault)
                    this.fallSprite.idx = this.fallSprite.sprites.length - 2

                if (this.y + this.jumpSize * 20 >= this.yDefault)
                    this.fallSprite.idx = this.fallSprite.sprites.length - 1
                if (this.y >= this.yDefault) {
                    this.y = this.yDefault
                    this.state = TREX_STATE.MOVE
                    this.fallSprite.idx = 0
                }
                break
            case TREX_STATE.DEAD:
                this.y = this.yDefault
                image.src = this.deadSprite.getSprite()
                w = (this.widthDefault * 4) / 3 - 10
                h = (this.heightDefault * 2) / 3 - 10
                y = this.heightDefault - h + 10 + this.yDefault
                this.width = w
                this.height = h
                this.y = y
                break
            case TREX_STATE.IDLE:
                this.y = this.yDefault
                image.src = this.idleSprite.getSprite()
                break
            case TREX_STATE.DUCK:
                this.y = this.yDefault
                image.src = this.duckSprite.getSprite()
                w = (this.widthDefault * 4) / 3 - 10
                h = (this.heightDefault * 2) / 3 - 10
                y = this.heightDefault - h + 10 + this.yDefault
                this.width = w
                this.height = h
                this.y = y
                break
        }

        Graphics.add(image.src, x, y, w, h)
        /*
        image.onload = function() {
            if (Graphics.ctx) {
                Graphics.ctx.drawImage(image, x, y, w, h);
            }
        };*/
    }
}
