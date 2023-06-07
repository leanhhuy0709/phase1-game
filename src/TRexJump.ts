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

const BACKGROUND_LIST = ['../assets/background/1.png', '../assets/background/2.png']

const canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('game');
const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');

var gameSpeed = 5;

var check = true;

export default class TRexJump
{
    tRex: TRex;
    obtacles: Obstacles;
    sceneNum: number;
    score: Score;
    isGameOver: boolean;
    backgroundStt: number;
    scene: Scene;
    public constructor()
    {
        this.start();
    }
    public start() {
        console.log('TRexJump created');
        canvas.width = 700;
        canvas.height = 400;
        canvas.setAttribute('style', 'margin: auto');
        this.tRex = new TRex();
        canvas.addEventListener('keydown', (event) => {
            event.preventDefault();
            var name = event.key;
            var code = event.code;
            console.log(name, code);
            switch(code)
            {
                case 'ArrowUp':
                case 'Space':
                    if (this.tRex.state != TRexState.Fall)
                    this.tRex.state = TRexState.Jump;
                    break;
                case 'ArrowDown':
                    if (this.tRex.state == TRexState.Jump)
                    {
                        this.tRex.state = TRexState.Fall;
                    }
                    break;
                case 'A': check = false;break;
            

            }
        }, false);
        canvas.addEventListener('keyup', (event) => {
            event.preventDefault();
            var name = event.key;
            var code = event.code;
            
            switch(code)
            {
                case 'ArrowUp':
                case 'Space':
                    if (this.tRex.state == TRexState.Jump)
                        this.tRex.state = TRexState.Fall;
                    break;
            }
        }, false);
        canvas.addEventListener('mousedown', (event) => {
            let rect = canvas.getBoundingClientRect();
            let x = event.clientX - rect.left;
            let y = event.clientY - rect.top;
            console.log("Coordinate x: " + x, "Coordinate y: " + y);
            if (this.isGameOver) {
                if ((x - 350) * (x - 350) + (y - 260) * (y - 260) < 40 * 40)
                {
                    this.tRex.start();
                    this.obtacles.start();
                    this.score.start();
                    this.sceneNum = 0;
                    this.isGameOver = false;
                }
            }
        }, false);
        canvas.addEventListener('mouseup', (event) => {
            let rect = canvas.getBoundingClientRect();
            let x = event.clientX - rect.left;
            let y = event.clientY - rect.top;
            console.log("Coordinate x: " + x, "Coordinate y: " + y);
            if (this.isGameOver) {
                if ((x - 350) * (x - 350) + (y - 260) * (y - 260) < 40 * 40)
                {
                    this.tRex.start();
                    this.obtacles.start();
                    this.score.start();
                    this.sceneNum = 0;
                    this.isGameOver = false;
                }
            }
        }, false);
        this.sceneNum = 0;
        this.obtacles = new Obstacles();
        this.score = new Score();
        gameSpeed = 5;
        this.backgroundStt = 0;
        this.scene = new GamePlay();
    }
    public update()
    {
        this.scene.update(this);
        /*
        const image = new Image(), image2 = new Image();
        //image.src = BACKGROUND_LIST[Math.floor(Math.random() * BACKGROUND_LIST.length)];
        image.src = BACKGROUND_LIST[this.backgroundStt];
        image2.src = BACKGROUND_LIST[(this.backgroundStt + 1) % BACKGROUND_LIST.length];

        let c = this.sceneNum;
        image.onload = function() {
            if (ctx) {
                ctx.drawImage(image, c, 0);
                if (c <= canvas.width - image.width)
                {
                    ctx.drawImage(image2, c + image2.width, 0);
                }
            }
        };
 
        if (this.isGameOver)
        {
            if (ctx)
            {
                ctx.font = "50px Cambria";
                ctx.textAlign = "center";
                ctx.fillText("GAME OVER", 350, 200);
                this.tRex.state = TRexState.Die;
                this.tRex.update();
                this.obtacles.update(true);
                this.score.update(true);

                ctx.beginPath();
                ctx.arc(350, 260, 40, 0, 2 * Math.PI);
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(340, 240);
                ctx.lineTo(340, 280);
                ctx.lineTo(370, 260);
                ctx.fill();
            }
        }
        else 
        {
            this.sceneNum -= gameSpeed;
            if (this.sceneNum <= -image.width)
            {
                this.sceneNum = 0;
                this.backgroundStt = (this.backgroundStt + 1) % BACKGROUND_LIST.length;
            }
            this.tRex.update();
            this.score.update();
            this.obtacles.update();
            if (this.obtacles.checkCollision(this.tRex))
            {
                this.isGameOver = true;
            }
        }
        */
    }
}

enum TRexState {
    Move = 1,
    Jump,
    Fall,
    Die
}
const DELAY_SPRITE = 10;
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
    width: number;
    height: number;
    x: number;
    xDefault: number;
    y: number;
    yDefault: number;
    jumpSize: number;
    state: TRexState;
    public constructor()
    {
        this.start();
    }
    //DINOSAUR_MOVE_1, DINOSAUR_MOVE_2, DINOSAUR_MOVE_3, DINOSAUR_MOVE_4, DINOSAUR_MOVE_5, DINOSAUR_MOVE_6, DINOSAUR_MOVE_7, DINOSAUR_MOVE_8
    public start() {
        console.log('TRex created');
        this.moveSprite = new Sprite([DINOSAUR_MOVE_1, DINOSAUR_MOVE_2, DINOSAUR_MOVE_3, DINOSAUR_MOVE_4, DINOSAUR_MOVE_5, DINOSAUR_MOVE_6, DINOSAUR_MOVE_7, DINOSAUR_MOVE_8]);
        this.jumpSprite = new Sprite([DINOSAUR_1, DINOSAUR_2, DINOSAUR_3, DINOSAUR_4, DINOSAUR_5, DINOSAUR_6, DINOSAUR_7, DINOSAUR_8]);//, 
        this.fallSprite = new Sprite([DINOSAUR_9, DINOSAUR_10, DINOSAUR_11, DINOSAUR_12]);
        this.deadSprite = new Sprite([DINOSAUR_DEAD_1]);
        this.xDefault = 10;
        this.yDefault = 250;
        this.jumpSize = 5;
        
        this.width = 100;
        this.height = 100;
        this.x = this.xDefault;
        this.y = this.yDefault;
        this.state = TRexState.Move;
    }
    public update() {
        const image = new Image();
        let w = this.width;
        let h = this.height;
        let x = this.x;
        let y = this.y;
        switch(this.state)
        {
        case TRexState.Move:
            this.jumpSprite.stt = this.fallSprite.stt = 0;
            this.moveSprite.addStt();
            image.src = this.moveSprite.getSprite();
            break;
        case TRexState.Jump:
            this.moveSprite.stt = this.fallSprite.stt = 0;
            this.y -= this.jumpSize;
            if (this.jumpSprite.stt + 1 < this.jumpSprite.sprites.length) this.jumpSprite.addStt();
            image.src = this.jumpSprite.getSprite();
            if (this.y <= this.yDefault - 30 * this.jumpSize)
                this.state = TRexState.Fall;
            break;
        case TRexState.Fall:
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
                this.state = TRexState.Move;
                this.fallSprite.stt = 0;
            }
            break;
        case TRexState.Die: 
            this.y = this.yDefault;
            image.src = this.deadSprite.getSprite();
            w = w * 4 / 3;
            h = h * 2 / 3;
            y += this.height - h;
            break;
        }

        image.onload = function() {
            if (ctx) {
                ctx.drawImage(image, x, y, w, h);
            }
        };
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
                    this.obtacles.push(new FlyDino(this.obtacles[this.obtacles.length - 1].x + Math.floor(Math.random() * 1000) + 500, '../assets/dinosaur_fly2.png'));
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
                console.log("tRex die!");
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
        image.onload = function() {
            if (ctx) {
                ctx.drawImage(image, x, y, w, h);
            }
        };
    }
    public isInFrame()
    {
        return 
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
    public constructor(x: number, sprite: string = '../assets/dinosaur_fly1.png')
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
    point: number;
    level: number;
    public constructor()
    {
        this.start();
    }
    public start()
    {
        this.point = 0;
        this.level = 1000;
    }
    public update(isStop: boolean = false)
    {
        if (!isStop) 
        {
            this.point += 1;
            if (this.point > this.level)
            {
                gameSpeed += 0.5;
                this.level += 1000;
            }
        }
        if (ctx)
        {
            ctx.font = '30px Cambria';
            ctx.textAlign = 'start';
            ctx.fillText(this.point.toString(), 20, 30);
        }
    }
}

class Scene {
    isOpen: boolean;
    public constructor(){}
    public open() {}
    public close() {}
    public handle_input() {}
    public update(tRexJump: TRexJump) {}
    public render() {}
    public removeAllEvents()
    {

    }
}

class GamePlay extends Scene
{
    public update(tRexJump: TRexJump){
        const image = new Image(), image2 = new Image();
        //image.src = BACKGROUND_LIST[Math.floor(Math.random() * BACKGROUND_LIST.length)];
        image.src = BACKGROUND_LIST[tRexJump.backgroundStt];
        image2.src = BACKGROUND_LIST[(tRexJump.backgroundStt + 1) % BACKGROUND_LIST.length];

        let c = tRexJump.sceneNum;
        image.onload = function() {
            if (ctx) {
                ctx.drawImage(image, c, 0);
                if (c <= canvas.width - image.width)
                {
                    ctx.drawImage(image2, c + image2.width, 0);
                }
            }
        };
 
        if (tRexJump.isGameOver)
        {
            if (ctx)
            {
                ctx.font = "50px Cambria";
                ctx.textAlign = "center";
                ctx.fillText("GAME OVER", 350, 200);
                tRexJump.tRex.state = TRexState.Die;
                tRexJump.tRex.update();
                tRexJump.obtacles.update(true);
                tRexJump.score.update(true);

                ctx.beginPath();
                ctx.arc(350, 260, 40, 0, 2 * Math.PI);
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(340, 240);
                ctx.lineTo(340, 280);
                ctx.lineTo(370, 260);
                ctx.fill();
            }
        }
        else 
        {
            tRexJump.sceneNum -= gameSpeed;
            if (tRexJump.sceneNum <= -image.width)
            {
                tRexJump.sceneNum += image.width;
                tRexJump.backgroundStt = (tRexJump.backgroundStt + 1) % BACKGROUND_LIST.length;
            }
            tRexJump.tRex.update();
            tRexJump.score.update();
            tRexJump.obtacles.update();
            if (tRexJump.obtacles.checkCollision(tRexJump.tRex))
            {
                tRexJump.isGameOver = true;
            }
        }
    }
}

class GameMenu extends Scene
{
    
}

class Setting extends Scene
{

}

class PauseMenu extends Scene 
{

}

class Road{}
class Clouds{}



/*
- Road (Ground),
- Obstacles (cactus, birds),
- Clouds (background),
- Score, High Score
- Scenes: Gameplay (có nút play), GameOver (show: score, high score, include **restart** button)
*/