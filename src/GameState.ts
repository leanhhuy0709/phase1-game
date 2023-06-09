import TRexJump from './TRexJump'
import Graphics from './Graphics'
import { BACKGROUND_WIDTH } from './TRexJump'
import { TREX_STATE } from './TRex'
import { GameStateInterface } from './types/game-state'

export default class GameState implements GameStateInterface {
    public constructor() {
        //console.log('Game state created!')
    }
    public display(tRexJump: TRexJump) {
        //console.log("TRexJump update!");
        const image1 = tRexJump.getBackground().getCurrent()
        const image2 = tRexJump.getBackground().getNext()

        Graphics.add(image1, tRexJump.getSceneNum(), 0)
        if (tRexJump.getSceneNum() <= Graphics.canvas.width - BACKGROUND_WIDTH) {
            Graphics.add(image2, tRexJump.getSceneNum() + BACKGROUND_WIDTH, 0)
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public update(tRexJump: TRexJump, deltaTime: number) {
        //console.log('Update called')
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public clear(tRexJump: TRexJump) {
        //console.log('Clear called')
    }
}

export class GameMenuState extends GameState {
    public constructor(tRexJump: TRexJump) {
        super()
        Graphics.canvas.addEventListener(
            'mousedown',
            (event) => this.handleMouseDown(event, tRexJump),
            false
        )
    }
    public display(tRexJump: TRexJump) {
        super.display(tRexJump)
        Graphics.addText('T-Rex Jump', 'bold 50px Cambria', 'center', 350, 150)
        Graphics.addText(
            `Highscore: ${tRexJump.getScore().getMaxScore()}`,
            '30px Cambria',
            'center',
            350,
            200
        )
        Graphics.setDrawPlayButton(true)
    }
    public update(tRexJump: TRexJump, deltaTime: number) {
        //console.log('Update')
        tRexJump.getTRex().setState(TREX_STATE.IDLE)
        tRexJump.getTRex().update(deltaTime)
        tRexJump.getObstacleManager().update(deltaTime, true)
        tRexJump.getTRex().update(deltaTime)
    }
    private handleMouseDown(event: MouseEvent, tRexJump: TRexJump) {
        const rect = Graphics.canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        if ((x - 350) * (x - 350) + (y - 260) * (y - 260) < 40 * 40) {
            tRexJump.start()
            tRexJump.getStateManager().getCurrentState().clear(tRexJump)
            tRexJump.getStateManager().setCurrentState(new GamePlayState(tRexJump))
        }
    }
    public clear(tRexJump: TRexJump) {
        Graphics.canvas.removeEventListener(
            'mousedown',
            (event) => this.handleMouseDown(event, tRexJump),
            false
        )
    }
}

export class GameOverState extends GameState {
    public constructor(tRexJump: TRexJump) {
        super()
        Graphics.canvas.addEventListener(
            'mousedown',
            (event) => this.handleMouseDown(event, tRexJump),
            false
        )
    }
    public display(tRexJump: TRexJump) {
        super.display(tRexJump)
        Graphics.addText('GAME OVER', 'bold 50px Cambria', 'center', 350, 150)
        Graphics.addText(
            `Highscore: ${Math.floor(tRexJump.getScore().getMaxScore())}`,
            '30px Cambria',
            'center',
            350,
            200
        )
        Graphics.setDrawPlayButton(true)
    }
    public update(tRexJump: TRexJump, deltaTime: number) {
        tRexJump.getTRex().setState(TREX_STATE.DEAD)
        tRexJump.getTRex().update(deltaTime)
        tRexJump.getObstacleManager().update(deltaTime, true)
        tRexJump.getScore().update(deltaTime, true)
        tRexJump.getTRex().update(deltaTime)
    }
    private handleMouseDown(event: MouseEvent, tRexJump: TRexJump) {
        const rect = Graphics.canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        if ((x - 350) * (x - 350) + (y - 260) * (y - 260) < 40 * 40) {
            tRexJump.start()
            tRexJump.getStateManager().getCurrentState().clear(tRexJump)
            tRexJump.getStateManager().setCurrentState(new GamePlayState(tRexJump))
        }
    }
    public clear(tRexJump: TRexJump) {
        Graphics.canvas.removeEventListener(
            'mousedown',
            (event) => this.handleMouseDown(event, tRexJump),
            false
        )
    }
}

export class GamePlayState extends GameState {
    private touchStart: number[]
    private touchEnd: number[]

    public constructor(tRexJump: TRexJump) {
        super()
        this.touchStart = []
        this.touchEnd = []
        Graphics.canvas.addEventListener(
            'keydown',
            (event) => this.handleKeyDown(event, tRexJump),
            true
        )
        Graphics.canvas.addEventListener(
            'keyup',
            (event) => this.handleKeyUp(event, tRexJump),
            true
        )
        Graphics.canvas.addEventListener(
            'touchstart',
            (event) => this.handleTouchStart(event),
            false
        )
        Graphics.canvas.addEventListener(
            'touchend',
            (event) => this.handleTouchEnd(event, tRexJump),
            false
        )
    }
    public display(tRexJump: TRexJump) {
        super.display(tRexJump)
    }
    public update(tRexJump: TRexJump, deltaTime: number) {
        //console.log('Update')
        //tRexJump.getCloudManager().update(deltaTime)
        tRexJump.getCloudManager().update(deltaTime)
        tRexJump.setSceneNum(tRexJump.getSceneNum() - TRexJump.getGameSpeed() * deltaTime)
        if (tRexJump.getSceneNum() <= -BACKGROUND_WIDTH) {
            tRexJump.setSceneNum(tRexJump.getSceneNum() + BACKGROUND_WIDTH)
            tRexJump.getBackground().goToNext()
        }
        tRexJump.getTRex().update(deltaTime)
        tRexJump.getScore().update(deltaTime)
        tRexJump.getObstacleManager().update(deltaTime)

        if (tRexJump.getObstacleManager().checkCollision(tRexJump.getTRex())) {
            tRexJump.getStateManager().getCurrentState().clear(tRexJump)
            tRexJump.getStateManager().setCurrentState(new GameOverState(tRexJump))
        }
    }

    public clear(tRexJump: TRexJump) {
        Graphics.canvas.removeEventListener(
            'keydown',
            (event) => this.handleKeyDown(event, tRexJump),
            true
        )
        Graphics.canvas.removeEventListener(
            'keyup',
            (event) => this.handleKeyUp(event, tRexJump),
            true
        )
        Graphics.canvas.removeEventListener(
            'touchstart',
            (event) => this.handleTouchStart(event),
            false
        )
        Graphics.canvas.removeEventListener(
            'touchend',
            (event) => this.handleTouchEnd(event, tRexJump),
            false
        )
    }

    private handleKeyDown(event: KeyboardEvent, tRexJump: TRexJump) {
        const code = event.code
        switch (code) {
            case 'ArrowUp':
            case 'Space':
                if (tRexJump.getTRex().getState() !== TREX_STATE.FALL)
                    tRexJump.getTRex().setState(TREX_STATE.JUMP)
                break
            case 'ArrowDown':
                if (
                    tRexJump.getTRex().getState() === TREX_STATE.JUMP ||
                    tRexJump.getTRex().getState() === TREX_STATE.FALL
                ) {
                    tRexJump.getTRex().setJumpSize(tRexJump.getTRex().getJumpSize() * 1.5)
                    tRexJump.getTRex().setState(TREX_STATE.FALL)
                }
                if (tRexJump.getTRex().getState() === TREX_STATE.MOVE) {
                    tRexJump.getTRex().setState(TREX_STATE.DUCK)
                }
                break
        }
    }

    private handleKeyUp(event: KeyboardEvent, tRexJump: TRexJump) {
        event.preventDefault()
        //const name = event.key
        const code = event.code

        switch (code) {
            case 'ArrowUp':
            case 'Space':
                if (tRexJump.getTRex().getState() == TREX_STATE.JUMP)
                    tRexJump.getTRex().setState(TREX_STATE.FALL)
                break
            case 'ArrowDown':
                if (tRexJump.getTRex().getState() == TREX_STATE.DUCK) {
                    tRexJump.getTRex().setState(TREX_STATE.MOVE)
                }
        }
    }

    private handleTouchStart(event: TouchEvent) {
        const touch = event.touches[0]
        const x = touch.clientX
        const y = touch.clientY
        this.touchStart[0] = x
        this.touchStart[1] = y
    }

    private handleTouchEnd(event: TouchEvent, tRexJump: TRexJump) {
        const touch = event.changedTouches[0]
        const x = touch.clientX
        const y = touch.clientY
        this.touchEnd[0] = x
        this.touchEnd[1] = y

        const tmp = this.getDirection()
        switch (tmp) {
            case 'U':
                if (tRexJump.getTRex().getState() !== TREX_STATE.FALL)
                    tRexJump.getTRex().setState(TREX_STATE.JUMP)
                break
            case 'D':
                if (
                    tRexJump.getTRex().getState() === TREX_STATE.JUMP ||
                    tRexJump.getTRex().getState() === TREX_STATE.FALL
                ) {
                    tRexJump.getTRex().setJumpSize(tRexJump.getTRex().getJumpSize() * 1.5)
                    tRexJump.getTRex().setState(TREX_STATE.FALL)
                }
                if (tRexJump.getTRex().getState() === TREX_STATE.MOVE) {
                    tRexJump.getTRex().setState(TREX_STATE.DUCK)
                }
                break
            case 'L':
            case 'R':
            default:
                break
        }
        this.touchStart.length = this.touchEnd.length = 0
    }

    private getDirection() {
        if (this.touchStart.length != 2 || this.touchEnd.length != 2) {
            return 'N'
        }
        const x = this.touchEnd[0] - this.touchStart[0]
        const y = this.touchEnd[1] - this.touchStart[1]
        if (x < 0 && y < 0) {
            if (Math.abs(x) < Math.abs(y)) return 'U'
            else return 'L'
        }
        if (x < 0 && y > 0) {
            if (Math.abs(x) < Math.abs(y)) return 'D'
            else return 'L'
        }
        if (x > 0 && y < 0) {
            if (Math.abs(x) < Math.abs(y)) return 'U'
            else return 'R'
        }
        if (x > 0 && y > 0) {
            if (Math.abs(x) < Math.abs(y)) return 'D'
            else return 'R'
        }
        return 'N'
    }
}
