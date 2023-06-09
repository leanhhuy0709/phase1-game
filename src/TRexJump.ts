import Graphics from './Graphics'
import TRex from './TRex'
import ObstacleManager from './ObstacleManager'
import Score from './Score'
import Background from './Background'
import StateManager from './StateManager'
import CloudManager from './CloudManager'

//Canvas
const CANVAS_WIDTH = 700
const CANVAS_HEIGHT = 400

//Image width
export const BACKGROUND_WIDTH = 1000
//const IMAGE_HEIGHT = 400

// Game Speed
export const GAME_SPEED_DEFAULT = 4

//TRexJump: Main class, manage GAME_STATE
export default class TRexJump {
    private tRex: TRex
    private obstacleManager: ObstacleManager
    private cloudManager: CloudManager
    private sceneNum: number
    private score: Score
    private background: Background
    private stateManager: StateManager
    private static gameSpeed: number
    public constructor() {
        console.log('TRexJump created')
        Graphics.canvas.width = CANVAS_WIDTH
        Graphics.canvas.height = CANVAS_HEIGHT
        Graphics.canvas.setAttribute('style', 'margin: auto; position: fixed')
        this.background = new Background()
        this.stateManager = new StateManager(this)
        this.tRex = new TRex()
        this.obstacleManager = new ObstacleManager()
        this.score = new Score()
        this.cloudManager = new CloudManager()
        this.start()
    }
    public start() {
        this.tRex.start()
        this.obstacleManager.start()
        this.cloudManager.start()
        this.score.start()
        this.sceneNum = 0
        TRexJump.gameSpeed = GAME_SPEED_DEFAULT
    }
    public update(deltaTime: number) {
        //console.log(deltaTime)
        deltaTime /= 10
        this.stateManager.displayCurrentState(this, deltaTime)
        this.stateManager.updateCurrentState(this, deltaTime)

        Graphics.draw()
    }
    public static setGameSpeed(speed: number) {
        TRexJump.gameSpeed = speed
    }
    public static getGameSpeed() {
        return TRexJump.gameSpeed
    }
    public getBackground() {
        return this.background
    }
    public getSceneNum() {
        return this.sceneNum
    }
    public setSceneNum(sceneNum: number) {
        this.sceneNum = sceneNum
    }
    public getTRex() {
        return this.tRex
    }
    public getObstacleManager() {
        return this.obstacleManager
    }
    public getScore() {
        return this.score
    }
    public getStateManager() {
        return this.stateManager
    }
    public getCloudManager() {
        return this.cloudManager
    }
}

/*
- Road (Ground),
- ObstacleManager (cactus, birds),
- Clouds (background),
- Score, High Score
- Scenes: GAME_PLAY (có nút play), GAME_OVER (show: score, high score, include **restart** button)
*/
