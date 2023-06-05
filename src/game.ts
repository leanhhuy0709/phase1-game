class Game {
    constructor() {
        console.log('Game created');
    }
    render() {
        console.log('Game rendered');




        setTimeout(() => {
            requestAnimationFrame(() => this.render());
        }, 1000);
    }
}

let game = new Game();
game.render();
