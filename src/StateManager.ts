import GameState, { GameMenuState } from './GameState'
import TRexJump from './TRexJump'

export default class StateManager {
    private currentState: GameState
    public constructor() {
        this.currentState = new GameMenuState()
    }
    public setCurrentState(state: GameState) {
        this.currentState = state
    }

    public updateCurrentState(tRexJump: TRexJump) {
        this.currentState.update(tRexJump)
    }

    public displayCurrentState(tRexJump: TRexJump) {
        this.currentState.display(tRexJump)
    }
}
