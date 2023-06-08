// Delay sprite speed
const DELAY_SPRITE = 10
//Sprite: use to load sprite of object
export default class Sprite {
    sprites: string[]
    idx: number
    delay: number
    public constructor(sprites: string[]) {
        this.sprites = sprites
        this.idx = 0
        this.delay = 0
    }
    public getSprite() {
        if (this.idx >= this.sprites.length) console.log('Error Sprites')
        return this.sprites[this.idx]
    }
    public addStt() {
        this.delay++
        if (this.delay > DELAY_SPRITE) {
            this.idx++
            this.delay = 0
        }
        this.idx %= this.sprites.length
        return this.idx
    }
}
