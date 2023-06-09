import GameState, { GameMenuState } from './GameState'
import TRexJump from './TRexJump'

export default class StateManager {
    private currentState: GameState
    public constructor(tRexJump: TRexJump) {
        this.currentState = new GameMenuState(tRexJump)
    }
    public setCurrentState(state: GameState, tRexJump: TRexJump) {
        this.currentState.clear(tRexJump)
        this.currentState = state
    }
    public getCurrentState() {
        return this.currentState
    }

    public updateCurrentState(tRexJump: TRexJump, deltaTime: number) {
        this.currentState.update(tRexJump, deltaTime)
    }

    public displayCurrentState(tRexJump: TRexJump, deltaTime: number) {
        this.currentState.display(tRexJump, deltaTime)
    }
}
