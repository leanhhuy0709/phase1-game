export interface SpriteInterface {
    getCurrent(): string
    goToNext(deltaTime: number): number
    setIdx(idx: number): void
    getLength(): number
    getIdx(): number
}
