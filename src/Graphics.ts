//Graphics: Use to draw image synchronically
export default class Graphics {
    static canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('game')
    static ctx: CanvasRenderingContext2D | null = Graphics.canvas.getContext('2d')
    static imagesString: string[] = []
    static imagesStat: number[][] = []
    private static images: HTMLImageElement[] = [] //Images array
    public static add(image: string, x = 0, y = 0, w = -1, h = -1) {
        Graphics.imagesString.push(image)
        Graphics.imagesStat.push([x, y, w, h])
    }
    public static draw() {
        const imageCount = Graphics.imagesString.length
        let imagesLoaded = 0

        for (let i = 0; i < imageCount; i++) {
            Graphics.images[i] = new Image()
            Graphics.images[i].src = Graphics.imagesString[i]
            Graphics.images[i].onload = function () {
                imagesLoaded++
                if (imagesLoaded == imageCount) {
                    Graphics.drawImage()
                }
            }
        }
    }
    private static drawImage() {
        for (let i = 0; i < Graphics.imagesString.length; i++) {
            if (Graphics.imagesStat[i][2] == -1)
                Graphics.ctx?.drawImage(
                    Graphics.images[i],
                    Graphics.imagesStat[i][0],
                    Graphics.imagesStat[i][1]
                )
            else
                Graphics.ctx?.drawImage(
                    Graphics.images[i],
                    Graphics.imagesStat[i][0],
                    Graphics.imagesStat[i][1],
                    Graphics.imagesStat[i][2],
                    Graphics.imagesStat[i][3]
                )
        }
        Graphics.imagesString.length = 0
        Graphics.imagesStat.length = 0
    }
}
