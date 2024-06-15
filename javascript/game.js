class Game{
    constructor(){
        this.pauseButton = document.querySelector('.pause--btn');
        this.pause = false;
        this.zombie = new Zombie(100, 750);
        this.player = new Player(900, 750);
        this.activatePauseGameBtn();
        this.gameMovement = setInterval(this.refreshScreen.bind(this), 1000/10);
    }

    activatePauseGameBtn(){
        this.pauseButton.addEventListener('click', () => {
            if (this.pause) {
                this.gameMovement = setInterval(this.refreshScreen.bind(this), 1000/10);
                this.player.resumeGame();
                this.pauseButton.textContent = 'Pause';
            } else {
                clearInterval(this.gameMovement);
                this.player.pauseGame();
                this.pauseButton.textContent = 'Play';
            }
            this.pause = !this.pause;
        });
    }

    refreshScreen(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.zombie.draw();
        this.player.draw();
    }
}