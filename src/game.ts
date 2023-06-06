import FlappyBird from './TRexJump';

class Game {
    flappyBird: FlappyBird;
    public constructor() {
        console.log('Game created');
        this.flappyBird = new FlappyBird();
    }
    public update()
    {
        this.flappyBird.update();

        setTimeout(() => {
            requestAnimationFrame(() => this.update());
        }, 100);
    }
}

let game = new Game();
game.update();
