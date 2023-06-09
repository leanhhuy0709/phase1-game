import { SpriteInterface } from './types/sprite'
import TRexJump, { GAME_SPEED_DEFAULT } from './TRexJump'

// Delay sprite speed
const DELAY_SPRITE = 6
//Sprite: use to load sprite of object
export default class Sprite implements SpriteInterface {
    private sprites: string[]
    private idx: number
    private delay: number
    public constructor(sprites: string[]) {
        this.sprites = sprites
        this.idx = 0
        this.delay = 0
    }
    public getCurrent() {
        if (this.idx >= this.sprites.length) console.log('Error Sprites')
        return this.sprites[this.idx]
    }
    public goToNext(deltaTime: number) {
        this.delay += 1 * deltaTime * (TRexJump.getGameSpeed() / 2 - GAME_SPEED_DEFAULT / 2 + 1)
        if (this.delay > DELAY_SPRITE) {
            this.idx++
            this.delay = 0
        }
        this.idx %= this.sprites.length
        return this.idx
    }
    public setIdx(idx: number) {
        this.idx = idx % this.sprites.length
    }
    public getLength() {
        return this.sprites.length
    }
    public getIdx() {
        return this.idx
    }
}
