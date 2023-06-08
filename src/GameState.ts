import TRexJump from './TRexJump'
import Graphics from './Graphics'
import { BACKGROUND_WIDTH } from './TRexJump'

export default class GameState {
    public constructor() {
        console.log('Game state created!')
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
    public update(tRexJump: TRexJump) {
        //console.log('Update')
    }
}

export class GameMenuState extends GameState {
    public constructor() {
        super()
    }
    public display(tRexJump: TRexJump) {
        super.display(tRexJump)
    }
    public update(tRexJump: TRexJump) {
        console.log('Update')
    }
}

export class GameOverState extends GameState {
    public display(tRexJump: TRexJump) {
        super.display(tRexJump)
    }
    public update(tRexJump: TRexJump) {
        console.log('Update')
    }
}

export class GamePlayState extends GameState {
    public display(tRexJump: TRexJump) {
        super.display(tRexJump)
    }
    public update(tRexJump: TRexJump) {
        console.log('Update')
    }
}
