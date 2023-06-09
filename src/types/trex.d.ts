export interface TRexInterface {
    start(): void
    update(deltaTime: number): void
    getX(): number
    getY(): number
    getWidth(): number
    getHeight(): number
    setX(x: number): void
    setY(y: number): void
    setWidth(width: number): void
    setHeight(height: number): void
    getState(): TREX_STATE
    setState(state: TREX_STATE): void
    getJumpSize(): number
    setJumpSize(jumpSize: number): void
    resetX(): void
    resetY(): void
    resetWidth(): void
    resetHeight(): void
    resetJumpSize(): void
    move(deltaTime: number): void
    jump(deltaTime: number): void
    fall(deltaTime: number): void
    dead(): void
    idle(): void
    duck(): void
}
