const DINOSAUR_1 = '../assets/dinosaur-sprites/Jump (1).png';
const DINOSAUR_2 = '../assets/dinosaur-sprites/Jump (2).png';
const DINOSAUR_3 = '../assets/dinosaur-sprites/Jump (3).png';
const DINOSAUR_4 = '../assets/dinosaur-sprites/Jump (4).png';
const DINOSAUR_5 = '../assets/dinosaur-sprites/Jump (5).png';
const DINOSAUR_6 = '../assets/dinosaur-sprites/Jump (6).png';
const DINOSAUR_7 = '../assets/dinosaur-sprites/Jump (7).png';
const DINOSAUR_8 = '../assets/dinosaur-sprites/Jump (8).png';
const DINOSAUR_9 = '../assets/dinosaur-sprites/Jump (9).png';
const DINOSAUR_10 = '../assets/dinosaur-sprites/Jump (10).png';
const DINOSAUR_11 = '../assets/dinosaur-sprites/Jump (11).png';
const DINOSAUR_12 = '../assets/dinosaur-sprites/Jump (12).png';

const DINOSAUR_MOVE_1 = '../assets/dinosaur-sprites/Run (1).png';
const DINOSAUR_MOVE_2 = '../assets/dinosaur-sprites/Run (2).png';
const DINOSAUR_MOVE_3 = '../assets/dinosaur-sprites/Run (3).png';
const DINOSAUR_MOVE_4 = '../assets/dinosaur-sprites/Run (4).png';
const DINOSAUR_MOVE_5 = '../assets/dinosaur-sprites/Run (5).png';
const DINOSAUR_MOVE_6 = '../assets/dinosaur-sprites/Run (6).png';
const DINOSAUR_MOVE_7 = '../assets/dinosaur-sprites/Run (7).png';
const DINOSAUR_MOVE_8 = '../assets/dinosaur-sprites/Run (8).png';

const DINOSAUR_DEAD_1 = '../assets/dinosaur-sprites/Dead (6).png';
const DINOSAUR_IDLE_1 = '../assets/dinosaur-sprites/Idle (1).png';

const BACKGROUND_LIST = ['../assets/background/1.png', '../assets/background/2.png', '../assets/background/3.png']

const DELAY_SPRITE = 10;



var gameSpeed = 5;

enum GAME_STATE
{
    GAME_MENU = 1,
    GAME_PLAY = 2,
    GAME_OVER = 3
}

class Graphics
{
    static canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('game');
    static ctx: CanvasRenderingContext2D | null = Graphics.canvas.getContext('2d');
    static imagesString: string[] = [];
    static imagesStat: number[][] = [];
    private static images = new Array();//Images array
    public static add(image: string, x: number = 0, y: number = 0, w: number = -1, h: number = -1)
    {
        Graphics.imagesString.push(image);
        Graphics.imagesStat.push([x, y, w, h]);
    }
    public static draw()
    {
        var imageCount = Graphics.imagesString.length;
        var imagesLoaded = 0;

        for(var i = 0; i < imageCount; i++){
            Graphics.images[i] = new Image();
            Graphics.images[i].src = Graphics.imagesString[i];
            Graphics.images[i].onload = function(){
                imagesLoaded++;
                if(imagesLoaded == imageCount){
                    Graphics.drawImage();
                }
            }
        }
    }
    private static drawImage()
    {
        for(var i = 0; i < Graphics.imagesString.length; i++)
        {
            if (Graphics.imagesStat[i][2] == -1)
                Graphics.ctx?.drawImage(Graphics.images[i], Graphics.imagesStat[i][0], Graphics.imagesStat[i][1]);
            else 
                Graphics.ctx?.drawImage(Graphics.images[i], Graphics.imagesStat[i][0], Graphics.imagesStat[i][1],
                    Graphics.imagesStat[i][2], Graphics.imagesStat[i][3]);
        }
        Graphics.imagesString.length = 0;
        Graphics.imagesStat.length = 0;
    }
}

export default class TRexJump
{
    tRex: TRex;
    obtacles: Obstacles;
    sceneNum: number;
    score: Score;
    backgroundList: string[];
    backgroundStt: number;
    state: GAME_STATE;
    public constructor()
    {
        this.start();
    }
    public start() {
        console.log('TRexJump created');
        Graphics.canvas.width = 700;
        Graphics.canvas.height = 400;
        Graphics.canvas.setAttribute('style', 'margin: auto');
        this.tRex = new TRex();
        this.sceneNum = 0;
        this.obtacles = new Obstacles();
        this.score = new Score();
        gameSpeed = 5;
        this.backgroundStt = 0;
        this.state = GAME_STATE.GAME_MENU;

        Graphics.canvas.addEventListener('keydown', (event) => {
            event.preventDefault();
            var name = event.key;
            var code = event.code;
            //console.log(name, code);
            switch(code)
            {
                case 'ArrowUp':
                case 'Space':
                    if (this.tRex.state != TREX_STATE.FALL)
                    this.tRex.state = TREX_STATE.JUMP;
                    break;
                case 'ArrowDown':
                    if (this.tRex.state == TREX_STATE.JUMP || this.tRex.state == TREX_STATE.FALL)
                    {
                        this.tRex.jumpSize *= 3;
                        this.tRex.state = TREX_STATE.FALL;
                        
                    }
                    break;
            

            }
        }, false);
        Graphics.canvas.addEventListener('keyup', (event) => {
            event.preventDefault();
            var name = event.key;
            var code = event.code;
            
            switch(code)
            {
                case 'ArrowUp':
                case 'Space':
                    if (this.tRex.state == TREX_STATE.JUMP)
                        this.tRex.state = TREX_STATE.FALL;
                    break;
            }
        }, false);
        Graphics.canvas.addEventListener('mousedown', (event) => {
            let rect = Graphics.canvas.getBoundingClientRect();
            let x = event.clientX - rect.left;
            let y = event.clientY - rect.top;
            //console.log("Coordinate x: " + x, "Coordinate y: " + y);
            
            if (this.state == GAME_STATE.GAME_PLAY)
            {
                if (this.tRex.state != TREX_STATE.FALL)
                this.tRex.state = TREX_STATE.JUMP;
            }
            
            if (this.state == GAME_STATE.GAME_OVER || this.state == GAME_STATE.GAME_MENU) {
                if ((x - 350) * (x - 350) + (y - 260) * (y - 260) < 40 * 40)
                {
                    this.tRex.start();
                    this.obtacles.start();
                    this.score.start();
                    this.sceneNum = 0;
                    this.changeState(GAME_STATE.GAME_PLAY);
                }
            }
        }, false);

        this.backgroundList = [];

        for(let i = 0; i < 4; i++)
        {
            let tmp = BACKGROUND_LIST[Math.floor(Math.random() * BACKGROUND_LIST.length)];
            //let tmp = BACKGROUND_LIST[0];
            for(let j = 0; j < 10; j++) this.backgroundList.push(tmp);
        }
    }
    public update()
    {
        //console.log("TRexJump update!");
        /*
        const image = new Image(), image2 = new Image();
        image.src = this.backgroundList[this.backgroundStt];
        image2.src = this.backgroundList[(this.backgroundStt + 1) % this.backgroundList.length];

        let tRex = this;
        image.onload = function() {
            if (Graphics.ctx) {
                Graphics.ctx.drawImage(image, tRex.sceneNum, 0);
                if (tRex.sceneNum <= Graphics.canvas.width - image.width)
                {
                    Graphics.ctx.drawImage(image2, tRex.sceneNum + image2.width, 0);
                }
            }
        };
        */
        let image1 = this.backgroundList[this.backgroundStt];
        let image2 = this.backgroundList[(this.backgroundStt + 1) % this.backgroundList.length];

        Graphics.add(image1, this.sceneNum, 0);
        if (this.sceneNum <= Graphics.canvas.width - 1000)
        {
            Graphics.add(image2, this.sceneNum + 1000, 0);
        }

        
        
        
        switch(this.state)
        {
            case GAME_STATE.GAME_PLAY:
                this.sceneNum -= gameSpeed;
                if (this.sceneNum <= -1000)
                {
                    //while(this.sceneNum <= -image.width) this.sceneNum += image.width;
                    this.sceneNum += 1000;
                    this.backgroundStt = (this.backgroundStt + 1) % this.backgroundList.length;
                }
                this.tRex.update();
                this.score.update();
                this.obtacles.update();
                if (this.obtacles.checkCollision(this.tRex))
                {
                    this.changeState(GAME_STATE.GAME_OVER);
                }
                break;
            
            case GAME_STATE.GAME_OVER:
                if (Graphics.ctx)
                {
                    Graphics.ctx.font = "bold 50px Cambria";
                    Graphics.ctx.textAlign = "center";
                    Graphics.ctx.fillText("GAME OVER", 350, 150);
                    Graphics.ctx.font = "30px Cambria";
                    Graphics.ctx.fillText(`Highscore: ${this.score.maxScore}`, 350, 200);
                    this.tRex.state = TREX_STATE.DEAD;
                    this.tRex.update();
                    this.obtacles.update(true);
                    this.score.update(true);

                    Graphics.ctx.beginPath();
                    Graphics.ctx.arc(350, 260, 40, 0, 2 * Math.PI);
                    

                    Graphics.ctx.stroke();

                    Graphics.ctx.beginPath();
                    Graphics.ctx.moveTo(340, 240);
                    Graphics.ctx.lineTo(340, 280);
                    Graphics.ctx.lineTo(370, 260);
                    Graphics.ctx.fill();
                    this.tRex.update();
                }
                break;
            
            case GAME_STATE.GAME_MENU:
                if (Graphics.ctx)
                {
                    Graphics.ctx.font = "bold 50px Cambria";
                    Graphics.ctx.textAlign = "center";
                    Graphics.ctx.fillText("T-Rex Jump", 350, 150);
                    Graphics.ctx.font = "30px Cambria";
                    Graphics.ctx.fillText(`Highscore: ${this.score.maxScore}`, 350, 200);
                    this.tRex.state = TREX_STATE.IDLE;
                    this.tRex.update();
                    this.obtacles.update(true);
                    //this.score.update(true);

                    Graphics.ctx.beginPath();
                    Graphics.ctx.arc(350, 260, 40, 0, 2 * Math.PI);
                    

                    Graphics.ctx.stroke();

                    Graphics.ctx.beginPath();
                    Graphics.ctx.moveTo(340, 240);
                    Graphics.ctx.lineTo(340, 280);
                    Graphics.ctx.lineTo(370, 260);
                    Graphics.ctx.fill();
                    this.tRex.update();
                }
                break;
            default: break;
        }

        Graphics.draw();
        
    }
    public changeState(newState: GAME_STATE)
    {
        this.state = newState;
    }

}

enum TREX_STATE {
    MOVE = 1,
    JUMP,
    FALL,
    DEAD,
    IDLE
}

class Sprite 
{
    sprites: string[];
    stt: number;
    delay: number;
    public constructor(sprites: string[])
    {
        this.sprites = sprites;
        this.stt = 0;
        this.delay = 0;
    }
    public getSprite()
    {
        if (this.stt >= this.sprites.length) console.log("Error Sprites");
        return this.sprites[this.stt];
    }
    public addStt()
    {
        this.delay++;
        if (this.delay > DELAY_SPRITE)
        {
            this.stt++;
            this.delay = 0;
        }
        this.stt %= this.sprites.length;
        return this.stt;
    }
}

class TRex{
    moveSprite: Sprite;
    jumpSprite: Sprite;
    fallSprite: Sprite;
    deadSprite: Sprite;
    idleSprite: Sprite;
    width: number;
    height: number;
    x: number;
    xDefault: number;
    y: number;
    yDefault: number;
    jumpSize: number;
    jumpSizeDefault: number;
    state: TREX_STATE;
    public constructor()
    {
        this.start();
    }
    public start() {
        console.log('TRex created');
        this.moveSprite = new Sprite([DINOSAUR_MOVE_1, DINOSAUR_MOVE_2, DINOSAUR_MOVE_3, DINOSAUR_MOVE_4, DINOSAUR_MOVE_5, DINOSAUR_MOVE_6, DINOSAUR_MOVE_7, DINOSAUR_MOVE_8]);
        this.jumpSprite = new Sprite([DINOSAUR_1, DINOSAUR_2, DINOSAUR_3, DINOSAUR_4, DINOSAUR_5, DINOSAUR_6, DINOSAUR_7, DINOSAUR_8]);//, 
        this.fallSprite = new Sprite([DINOSAUR_9, DINOSAUR_10, DINOSAUR_11, DINOSAUR_12]);
        this.deadSprite = new Sprite([DINOSAUR_DEAD_1]);
        this.idleSprite = new Sprite([DINOSAUR_IDLE_1]);
        this.xDefault = 10;
        this.yDefault = 250;
        this.jumpSizeDefault = 5;
        
        this.width = 100;
        this.height = 100;
        this.x = this.xDefault;
        this.y = this.yDefault;
        this.jumpSize = this.jumpSizeDefault;
        this.state = TREX_STATE.MOVE;
    }
    public update() {
        const image = new Image();
        let w = this.width;
        let h = this.height;
        let x = this.x;
        let y = this.y;
        switch(this.state)
        {
        case TREX_STATE.MOVE:
            this.jumpSprite.stt = this.fallSprite.stt = 0;
            this.moveSprite.addStt();
            image.src = this.moveSprite.getSprite();
            break;
        case TREX_STATE.JUMP:
            this.jumpSize = this.jumpSizeDefault;
            this.moveSprite.stt = this.fallSprite.stt = 0;
            this.y -= this.jumpSize;
            if (this.jumpSprite.stt + 1 < this.jumpSprite.sprites.length) this.jumpSprite.addStt();
            image.src = this.jumpSprite.getSprite();
            if (this.y <= this.yDefault - 30 * this.jumpSize)
                this.state = TREX_STATE.FALL;
            break;
        case TREX_STATE.FALL:
            this.jumpSprite.stt = this.moveSprite.stt = 0;
            this.y += this.jumpSize / 2;
            if (this.fallSprite.stt + 2 < this.fallSprite.sprites.length) this.fallSprite.addStt();
            image.src = this.fallSprite.getSprite();

            if (this.y + this.jumpSize * 10 >= this.yDefault) 
                this.fallSprite.stt = this.fallSprite.sprites.length - 2;

            if (this.y + this.jumpSize * 20 >= this.yDefault) 
                this.fallSprite.stt = this.fallSprite.sprites.length - 1;
            if (this.y >= this.yDefault) 
            {
                this.y = this.yDefault;
                this.state = TREX_STATE.MOVE;
                this.fallSprite.stt = 0;
            }
            break;
        case TREX_STATE.DEAD: 
            this.y = this.yDefault;
            image.src = this.deadSprite.getSprite();
            w = w * 4 / 3;
            h = h * 2 / 3;
            y += this.height - h + 10;
            break;
        case TREX_STATE.IDLE:
            this.y = this.yDefault;
            image.src = this.idleSprite.getSprite();
            break;
        }

        Graphics.add(image.src, x, y, w, h);
        /*
        image.onload = function() {
            if (Graphics.ctx) {
                Graphics.ctx.drawImage(image, x, y, w, h);
            }
        };*/
    }
}

class Obstacles{
    obtacles: Obstacle[];
    public constructor()
    {
        this.start();
    }
    public start()
    {
        this.obtacles = [new FlyDino(1000), new Tree(1500)];
    }
    public update(isStop: boolean = false)
    {
        let countDel = 0, w = 0, h = 0, y = 0;
        for(let i = 0; i < this.obtacles.length; i++)
        {
            
            if (this.obtacles[i].x <= 1210)
            {
                this.obtacles[i].render();
            }
            if (!isStop)
                this.obtacles[i].x -= gameSpeed + this.obtacles[i].moveSpeed;
                if (this.obtacles[i].x < -this.obtacles[i].width) {
                    countDel++;
                }
        }
        if (isStop) return;
        this.obtacles = this.obtacles.slice(countDel, this.obtacles.length);
        for(let i = 0; i < countDel; i++)
        {
            let randNumber = Math.floor(Math.random() * 4);
            switch(randNumber)
            {
                case 0:
                case 1:
                    this.obtacles.push(new Tree(this.obtacles[this.obtacles.length - 1].x + Math.floor(Math.random() * 1000) + 500));
                    break;
                case 2:
                    this.obtacles.push(new FlyDino(this.obtacles[this.obtacles.length - 1].x + Math.floor(Math.random() * 1000) + 500));
                    break;
                default:
                    this.obtacles.push(new FlyDino(this.obtacles[this.obtacles.length - 1].x + Math.floor(Math.random() * 1000) + 500, '../assets/fly-dinosaur/2.png'));
                    break;
            }
            
        }
    }
    public checkCollision(tRex: TRex)
    {
        let x1, y1, w1, h1, x2, y2, w2, h2;
        x1 = tRex.x;
        y1 = tRex.y;
        w1 = tRex.width - 20;
        h1 = tRex.height - 20;
        for(let i = 0; i < this.obtacles.length; i++)
        {
            x2 = this.obtacles[i].x;
            y2 = this.obtacles[i].y;
            w2 = this.obtacles[i].width - 10;
            h2 = this.obtacles[i].height - 10;
            if (((x1 + w1 >= x2) && (x2 + w2 >= x1) && (y1 + w1 >= y2) && (y2 + w2 >= y1)))
            {
                //console.log("tRex Dead!");
                return true;
            }
        }
        return false;
    }
}

class Obstacle
{
    sprite: Sprite;
    location: number[];
    width: number;
    height: number;
    y: number;
    x: number;
    moveSpeed: number;
    public constructor(){}
    public render() {
        const image = new Image();
        image.src = this.sprite.getSprite();
        let w = this.width, h = this.height, y = this.y, x = this.x;
        Graphics.add(image.src, x, y, w, h);
        /*
        image.onload = function() {
            if (Graphics.ctx) {
                Graphics.ctx.drawImage(image, x, y, w, h);
            }
        };*/
    }
}

class Tree extends Obstacle
{
    public constructor(x: number)
    {
        super();
        this.sprite = new Sprite(['../assets/Cactus/Cactus.png']);
        this.x = x;
        this.width = 60;
        this.height = 80;
        this.y = 280;
        this.moveSpeed = 0;
    }
}

class FlyDino extends Obstacle
{
    public constructor(x: number, sprite: string = '../assets/fly-dinosaur/1.png')
    {
        super();
        this.sprite = new Sprite([sprite]);
        this.x = x;
        this.width = 80;
        this.height = 50;
        this.y = 150;
        this.moveSpeed = 1;
    }
}

class Score{
    score: number;
    level: number;
    maxScore: number;
    public constructor()
    {
        this.maxScore = 0;
        this.start();
    }
    public start()
    {
        this.score = 0;
        this.level = 1000;
    }
    public update(isStop: boolean = false)
    {
        if (!isStop) 
        {
            this.score += 1;
            if (this.score > this.level)
            {
                gameSpeed += 0.5;
                this.level += 1000;
            }
        }
        else 
        {
            this.maxScore = this.maxScore > this.score ? this.maxScore : this.score;
        }
        if (Graphics.ctx)
        {
            Graphics.ctx.font = '30px Cambria';
            Graphics.ctx.textAlign = 'start';
            Graphics.ctx.fillText(this.score.toString(), 20, 30);
        }
    }
}

class Road{}
class Clouds{}



/*
- Road (Ground),
- Obstacles (cactus, birds),
- Clouds (background),
- Score, High Score
- Scenes: GAME_PLAY (có nút play), GAME_OVER (show: score, high score, include **restart** button)
*/