//Graphics: Use to draw image synchronically
export default class Graphics {
    public static canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('game')
    public static ctx: CanvasRenderingContext2D | null = Graphics.canvas.getContext('2d')
    private static imagesString: string[] = []
    private static imagesStat: number[][] = []
    private static images: HTMLImageElement[] = [] //Images array
    private static text: string[] = []
    private static textFont: string[] = []
    private static textAlign: CanvasTextAlign[] = []
    private static textStat: number[][] = []
    private static isDrawPlayButton = false
    public static add(image: string, x = 0, y = 0, w = -1, h = -1) {
        Graphics.imagesString.push(image)
        Graphics.imagesStat.push([x, y, w, h])
    }
    public static addText(text: string, font: string, align: CanvasTextAlign, x = 0, y = 0) {
        Graphics.text.push(text)
        Graphics.textFont.push(font)
        Graphics.textAlign.push(align)
        Graphics.textStat.push([x, y])
        if (Graphics.ctx) {
            Graphics.ctx.font = font
            Graphics.ctx.textAlign = align
            Graphics.ctx.fillText(text, x, y)
        }
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
                    Graphics.drawAll()
                }
            }
        }
    }
    private static drawAll() {
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

        for (let i = 0; i < Graphics.text.length; i++) {
            if (Graphics.ctx) {
                Graphics.ctx.font = Graphics.textFont[i]
                Graphics.ctx.textAlign = Graphics.textAlign[i]
                Graphics.ctx.fillText(
                    Graphics.text[i],
                    Graphics.textStat[i][0],
                    Graphics.textStat[i][1]
                )
            }
        }
        if (Graphics.isDrawPlayButton) {
            Graphics.drawPlayButton()
            Graphics.setDrawPlayButton(false)
        }
        Graphics.text.length = 0
        Graphics.textFont.length = 0
        Graphics.textAlign.length = 0
        Graphics.textStat.length = 0

        Graphics.imagesString.length = 0
        Graphics.imagesStat.length = 0
    }
    public static setDrawPlayButton(isDraw: boolean) {
        Graphics.isDrawPlayButton = isDraw
    }
    private static drawPlayButton() {
        if (Graphics.ctx) {
            //tRexJump.score.update(true);
            Graphics.ctx.beginPath()
            Graphics.ctx.arc(350, 260, 40, 0, 2 * Math.PI)

            Graphics.ctx.stroke()

            Graphics.ctx.beginPath()
            Graphics.ctx.moveTo(340, 240)
            Graphics.ctx.lineTo(340, 280)
            Graphics.ctx.lineTo(370, 260)
            Graphics.ctx.fill()
        }
    }
}
