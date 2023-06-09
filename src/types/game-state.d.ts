export interface GameStateInterface {
    display(tRexJump: TRexJump): void
    update(tRexJump: TRexJump, deltaTime: number): void
    clear(tRexJump: TRexJump): void
}
