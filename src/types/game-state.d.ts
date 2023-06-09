export interface GameStateInterface {
    display(tRexJump: TRexJump, deltaTime): void
    update(tRexJump: TRexJump, deltaTime: number): void
    clear(tRexJump: TRexJump): void
}
