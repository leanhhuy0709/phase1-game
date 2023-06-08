// Delay sprite speed
const DELAY_SPRITE = 10
//Sprite: use to load sprite of object
export default class Sprite {
    private sprites: string[]
    private idx: number
    private delay: number
    public constructor(sprites: string[]) {
        this.sprites = sprites
        this.idx = 0
        this.delay = 0
    }
    public getSprite() {
        if (this.idx >= this.sprites.length) console.log('Error Sprites')
        return this.sprites[this.idx]
    }
    public goToNext(dentaTime: number) {
        this.delay += 1 / dentaTime
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
    public getSpritesLength() {
        return this.sprites.length
    }
    public getIdx() {
        return this.idx
    }
}
