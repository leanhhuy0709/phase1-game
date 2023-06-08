import GameState, { GameMenuState } from './GameState'
import TRexJump from './TRexJump'

export default class StateManager {
    private currentState: GameState
    public constructor(tRexJump: TRexJump) {
        this.currentState = new GameMenuState(tRexJump)
    }
    public setCurrentState(state: GameState) {
        this.currentState = state
    }
    public getCurrentState() {
        return this.currentState
    }

    public updateCurrentState(tRexJump: TRexJump, deltaTime: number) {
        this.currentState.update(tRexJump, deltaTime)
    }

    public displayCurrentState(tRexJump: TRexJump) {
        this.currentState.display(tRexJump)
    }
}
