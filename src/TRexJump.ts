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
    }
    public update()
    {
        document.body.innerHTML = '';
        document.body.setAttribute('style', 'background: white; width: 70%; height: 50%; position: relative;top: 25%;left: 15%');
        console.log('TRexJump updated');
        this.tRex.update();
    }
}

class TRex{
    moveSprites: string[];
    jumpSprites: string[];
    moveStt: number;
    jumpStt: number;
    width: number;
    height: number;
    x: string;
    y: string;
    isJump: boolean;
    public constructor() {
        console.log('TRex created');
        this.moveSprites = [DINOSAUR_MOVE_1, DINOSAUR_MOVE_2, DINOSAUR_MOVE_3, DINOSAUR_MOVE_4, DINOSAUR_MOVE_5, DINOSAUR_MOVE_6, DINOSAUR_MOVE_7, DINOSAUR_MOVE_8];
        this.jumpSprites = [DINOSAUR_1, DINOSAUR_2, DINOSAUR_3, DINOSAUR_4, DINOSAUR_5, DINOSAUR_6, DINOSAUR_7, DINOSAUR_8, DINOSAUR_9, DINOSAUR_10, DINOSAUR_11, DINOSAUR_12];
        this.moveStt = 0;
        this.jumpStt = 0;
        this.width = 72;
        this.height = 50;
        this.x = "30px";
        this.y = "80%";
        this.isJump = false;
    }
    public update() {
        var img = document.createElement('img');
        if (!this.isJump)
        {
            this.moveStt = (this.moveStt + 1) % this.moveSprites.length;
            img.setAttribute('src', this.moveSprites[this.moveStt]);
        }
        else 
        {
            this.jumpStt = (this.jumpStt + 1) % this.jumpSprites.length;
            img.setAttribute('src', this.jumpSprites[this.jumpStt]);
        }
        img.setAttribute('style', `position: inherit;left: ${this.x};top: ${this.y};width: ${this.width}px; height:  ${this.height}px`);
        img.setAttribute('alt', 'TRex Image');
        document.body.appendChild(img);
    }
}

class Background
{
    public constructor() {
        console.log('Background created');
    }
    public update()
    {

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