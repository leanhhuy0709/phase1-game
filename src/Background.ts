const BACKGROUND_LIST = [
    'assets/background/1.png',
    'assets/background/2.png',
    'assets/background/3.png',
]
//Background
export default class Background {
    list: string[]
    idx: number
    public constructor() {
        this.list = []
        this.idx = 0
        for (
            let i = 0;
            i < 6;
            i++ //Make more background random
        ) {
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
}
