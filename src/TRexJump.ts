import Graphics from './Graphics'
import TRex from './TRex'
import ObstacleManager from './ObstacleManager'
import Score from './Score'
import Background from './Background'

//Canvas
const CANVAS_WIDTH = 700
const CANVAS_HEIGHT = 400

//Image width
const BACKGROUND_WIDTH = 1000
//const IMAGE_HEIGHT = 400

// Game Speed
const GAME_SPEED_DEFAULT = 5

enum GAME_STATE {
    GAME_MENU = 1,
    GAME_PLAY = 2,
    GAME_OVER = 3,
}
//TRexJump: Main class, manage GAME_STATE
export default class TRexJump {
    tRex: TRex
    obtacles: ObstacleManager
    sceneNum: number
    score: Score
    background: Background
    state: GAME_STATE
    static gameSpeed: number
    public constructor() {
        this.start()
    }
    public start() {
        console.log('TRexJump created')
        Graphics.canvas.width = CANVAS_WIDTH
        Graphics.canvas.height = CANVAS_HEIGHT
        Graphics.canvas.setAttribute('style', 'margin: auto')
        this.tRex = new TRex()
        this.sceneNum = 0
        this.obtacles = new ObstacleManager()
        this.score = new Score()
        TRexJump.gameSpeed = GAME_SPEED_DEFAULT
        this.state = GAME_STATE.GAME_MENU
        this.background = new Background()

        Graphics.canvas.addEventListener(
            'keydown',
            (event) => {
                event.preventDefault()
                //const name = event.key
                const code = event.code
                //console.log(name, code);
                switch (code) {
                    case 'ArrowUp':
                    case 'Space':
                        if (this.tRex.state != TREX_STATE.FALL) this.tRex.state = TREX_STATE.JUMP
                        break
                    case 'ArrowDown':
                        if (
                            this.tRex.state == TREX_STATE.JUMP ||
                            this.tRex.state == TREX_STATE.FALL
                        ) {
                            this.tRex.jumpSize *= 3
                            this.tRex.state = TREX_STATE.FALL
                        }
                        if (this.tRex.state == TREX_STATE.MOVE) {
                            this.tRex.state = TREX_STATE.DUCK
                        }
                        break
                }
            },
            false
        )
        Graphics.canvas.addEventListener(
            'keyup',
            (event) => {
                event.preventDefault()
                //const name = event.key
                const code = event.code

                switch (code) {
                    case 'ArrowUp':
                    case 'Space':
                        if (this.tRex.state == TREX_STATE.JUMP) this.tRex.state = TREX_STATE.FALL
                        break
                    case 'ArrowDown':
                        if (this.tRex.state == TREX_STATE.DUCK) {
                            this.tRex.state = TREX_STATE.MOVE
                        }
                }
            },
            false
        )
        Graphics.canvas.addEventListener(
            'mousedown',
            (event) => {
                const rect = Graphics.canvas.getBoundingClientRect()
                const x = event.clientX - rect.left
                const y = event.clientY - rect.top
                //console.log("Coordinate x: " + x, "Coordinate y: " + y);

                if (this.state == GAME_STATE.GAME_PLAY) {
                    if (this.tRex.state != TREX_STATE.FALL) this.tRex.state = TREX_STATE.JUMP
                }

                if (this.state == GAME_STATE.GAME_OVER || this.state == GAME_STATE.GAME_MENU) {
                    if ((x - 350) * (x - 350) + (y - 260) * (y - 260) < 40 * 40) {
                        this.tRex.start()
                        this.obtacles.start()
                        this.score.start()
                        this.sceneNum = 0
                        this.changeState(GAME_STATE.GAME_PLAY)
                        TRexJump.gameSpeed = GAME_SPEED_DEFAULT
                    }
                }
            },
            false
        )
    }
    public update() {
        //console.log("TRexJump update!");
        const image1 = this.background.getCurrent()
        const image2 = this.background.getNext()

        Graphics.add(image1, this.sceneNum, 0)
        if (this.sceneNum <= Graphics.canvas.width - BACKGROUND_WIDTH) {
            Graphics.add(image2, this.sceneNum + BACKGROUND_WIDTH, 0)
        }

        switch (this.state) {
            case GAME_STATE.GAME_PLAY:
                this.sceneNum -= TRexJump.gameSpeed
                if (this.sceneNum <= -BACKGROUND_WIDTH) {
                    //while(this.sceneNum <= -image.width) this.sceneNum += image.width;
                    this.sceneNum += BACKGROUND_WIDTH
                    this.background.stt = (this.background.stt + 1) % this.background.list.length
                }
                this.tRex.update()
                this.score.update()
                this.obtacles.update()
                if (this.obtacles.checkCollision(this.tRex)) {
                    this.changeState(GAME_STATE.GAME_OVER)
                }
                break

            case GAME_STATE.GAME_OVER:
                if (Graphics.ctx) {
                    Graphics.ctx.font = 'bold 50px Cambria'
                    Graphics.ctx.textAlign = 'center'
                    Graphics.ctx.fillText('GAME OVER', 350, 150)
                    Graphics.ctx.font = '30px Cambria'
                    Graphics.ctx.fillText(`Highscore: ${Math.floor(this.score.maxScore)}`, 350, 200)
                    this.tRex.state = TREX_STATE.DEAD
                    this.tRex.update()
                    this.obtacles.update(true)
                    this.score.update(true)

                    Graphics.ctx.beginPath()
                    Graphics.ctx.arc(350, 260, 40, 0, 2 * Math.PI)

                    Graphics.ctx.stroke()

                    Graphics.ctx.beginPath()
                    Graphics.ctx.moveTo(340, 240)
                    Graphics.ctx.lineTo(340, 280)
                    Graphics.ctx.lineTo(370, 260)
                    Graphics.ctx.fill()
                    this.tRex.update()
                }
                break

            case GAME_STATE.GAME_MENU:
                if (Graphics.ctx) {
                    Graphics.ctx.font = 'bold 50px Cambria'
                    Graphics.ctx.textAlign = 'center'
                    Graphics.ctx.fillText('T-Rex Jump', 350, 150)
                    Graphics.ctx.font = '30px Cambria'
                    Graphics.ctx.fillText(`Highscore: ${this.score.maxScore}`, 350, 200)
                    this.tRex.state = TREX_STATE.IDLE
                    this.tRex.update()
                    this.obtacles.update(true)
                    //this.score.update(true);

                    Graphics.ctx.beginPath()
                    Graphics.ctx.arc(350, 260, 40, 0, 2 * Math.PI)

                    Graphics.ctx.stroke()

                    Graphics.ctx.beginPath()
                    Graphics.ctx.moveTo(340, 240)
                    Graphics.ctx.lineTo(340, 280)
                    Graphics.ctx.lineTo(370, 260)
                    Graphics.ctx.fill()
                    this.tRex.update()
                }
                break
            default:
                break
        }

        Graphics.draw()
    }
    public changeState(newState: GAME_STATE) {
        this.state = newState
    }
    public static setGameSpeed(speed: number) {
        TRexJump.gameSpeed = speed
    }
    public static getGameSpeed() {
        return TRexJump.gameSpeed
    }
}

//Note to delete
enum TREX_STATE {
    MOVE = 1,
    JUMP,
    FALL,
    DEAD,
    IDLE,
    DUCK,
}

/*
- Road (Ground),
- ObstacleManager (cactus, birds),
- Clouds (background),
- Score, High Score
- Scenes: GAME_PLAY (có nút play), GAME_OVER (show: score, high score, include **restart** button)
*/
