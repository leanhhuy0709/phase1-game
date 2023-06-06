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

export default class TRexJump
{
    tRex: TRex;
    public constructor() {
        console.log('TRexJump created');
        this.tRex = new TRex();
        document.addEventListener('keydown', (event) => {
            var name = event.key;
            var code = event.code;
            //alert(`Key pressed ${name} \r\n Key code value: ${code}`);
            if(code == 'Space')
            {
                if (this.tRex.state != TRexState.Fall)
                    this.tRex.state = TRexState.Jump;
            }
        }, false);
        document.addEventListener('keyup', (event) => {
            var name = event.key;
            var code = event.code;
            //alert(`Key pressed ${name} \r\n Key code value: ${code}`);
            if(code == 'Space')
            {
                if (this.tRex.state == TRexState.Jump)
                    this.tRex.state = TRexState.Fall;
            }
        }, false);
    }
    public update()
    {
        document.body.innerHTML = '';
        document.body.setAttribute('style', 'background: white; width: 70%; height: 50%; position: relative;top: 25%;left: 15%');
        
        console.log('TRexJump updated');
        this.tRex.update();
    }
}

enum TRexState {
    Move = 1,
    Jump,
    Fall,
    Die
}

class Sprite 
{
    sprites: string[];
    stt: number;
    public constructor(sprites: string[])
    {
        this.sprites = sprites;
        this.stt = 0;
    }
    public getSprite()
    {
        return this.sprites[this.stt];
    }
}

class TRex{
    moveSprite: Sprite;
    jumpSprite: Sprite;
    fallSprite: Sprite;
    width: number;
    height: number;
    x: number;
    xDefault: number;
    y: number;
    yDefault: number;
    jumpSize: number;
    state: TRexState;
    public constructor() {
        console.log('TRex created');
        this.moveSprite = new Sprite([DINOSAUR_MOVE_1, DINOSAUR_MOVE_2, DINOSAUR_MOVE_3, DINOSAUR_MOVE_4, DINOSAUR_MOVE_5, DINOSAUR_MOVE_6, DINOSAUR_MOVE_7, DINOSAUR_MOVE_8]);
        this.jumpSprite = new Sprite([DINOSAUR_1, DINOSAUR_2, DINOSAUR_3, DINOSAUR_4, DINOSAUR_5, DINOSAUR_5, DINOSAUR_5, DINOSAUR_6, DINOSAUR_6, DINOSAUR_6, DINOSAUR_7]);//, 
        this.fallSprite = new Sprite([DINOSAUR_8, DINOSAUR_9, DINOSAUR_9, DINOSAUR_9, DINOSAUR_10, DINOSAUR_10, DINOSAUR_10, DINOSAUR_11, DINOSAUR_12]);
        this.xDefault = 30;
        this.yDefault = 330;
        this.jumpSize = 10;
        
        this.width = 145;
        this.height = 100;
        this.x = this.xDefault;
        this.y = this.yDefault;
        this.state = TRexState.Move;
    }
    public update() {
        var img = document.createElement('img');
        switch(this.state)
        {
        case TRexState.Move:
            this.moveSprite.stt = (this.moveSprite.stt + 1) % this.moveSprite.sprites.length;
            img.setAttribute('src', this.moveSprite.getSprite());
            break;
        case TRexState.Jump:
            this.y -= this.jumpSize;
            if (this.jumpSprite.stt + 1 < this.jumpSprite.sprites.length) this.jumpSprite.stt++;
            img.setAttribute('src', this.jumpSprite.getSprite());
            if (this.y <= this.yDefault - 15 * this.jumpSize)
                this.state = TRexState.Fall;
            break;
        case TRexState.Fall:
            this.jumpSprite.stt = 0;
            this.y += 2 * this.jumpSize;
            if (this.fallSprite.stt + 2 < this.fallSprite.sprites.length) this.fallSprite.stt = this.fallSprite.stt + 1;
            if (this.y + 2 * this.jumpSize * 5 >= this.yDefault) this.fallSprite.stt = this.fallSprite.sprites.length - 1;
            img.setAttribute('src', this.fallSprite.getSprite());
            if (this.y >= this.yDefault) 
            {
                this.y = this.yDefault;
                this.state = TRexState.Move;
                this.fallSprite.stt = 0;
            }
            break;
        case TRexState.Die: 
            break;
        }
        img.setAttribute('style', `position: inherit;left: ${this.x}px;top: ${this.y}px;width: ${this.width}px; height:  ${this.height}px`);
        img.setAttribute('alt', 'TRex Image');
        document.body.appendChild(img);
    }
}



class Road{}
class Obstacles{}
class Clouds{}
class Scenes{}
class Score{}

/*
- Road (Ground),
- Obstacles (cactus, birds),
- Clouds (background),
- Score, High Score
- Scenes: Gameplay (có nút play), GameOver (show: score, high score, include **restart** button)
*/