const BACKGROUND_LIST = ['assets/background/1.png', 'assets/background/3.png']
//    'assets/background/2.png',
//Background
export default class Background {
    private list: string[]
    private idx: number
    public constructor() {
        this.list = []
        this.idx = 0
        for (let i = 0; i < 6; i++) {
            const tmp = BACKGROUND_LIST[Math.floor(Math.random() * BACKGROUND_LIST.length)]
            for (let j = 0; j < 5; j++) this.list.push(tmp) // Make background long = 5 * BACKGROUND_WIDTH
        }
    }
    public getCurrent() {
        return this.list[this.idx]
    }
    public getNext() {
        return this.list[(this.idx + 1) % this.list.length]
    }
    public setIdx(newIdx: number) {
        this.idx = newIdx % this.list.length
    }
    public getIdx() {
        return this.idx
    }
    public goToNext() {
        this.idx = (this.idx + 1) % this.list.length
    }
}
