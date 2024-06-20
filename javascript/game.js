class Game{
    constructor(){
        this.pauseButton = document.querySelector('.pause--btn');
        this.pause = false;
        this.zombie = new Zombie(100, 750);
        this.zombie2 = new Zombie(1400, 750,'left');
        this.player = new Player(900, 750);
        this.activatePauseGameBtn();
        this.refreshScreen();
        // this.gameMovement = setInterval(this.refreshScreen.bind(this), 1000/10);
    }

    activatePauseGameBtn(){
        this.pauseButton.addEventListener('click', () => {
            if (this.pause) {
                this.refreshScreen();
                this.player.resumePlayer();
                this.pauseButton.textContent = 'Pause';
            } else {
                this.refreshScreen(true);
                this.player.pausePlayer();
                this.pauseButton.textContent = 'Play';
            }
            this.pause = !this.pause;
        });
    }

    refreshScreen(pause=false){
        if (pause){
            console.log('About to pause game')
            clearInterval(this.I50);
            clearInterval(this.I300);
        }
        else{
            this.I50 = setInterval(()=>{
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                this.player.draw();
                this.zombie2.draw(false);
                this.zombie.draw(false);
                this.player.bullet?.update();
            },50);
            this.I300 = setInterval(()=>{
                this.zombie2.draw();
                this.zombie.draw();
                this.zombie2.move('left');
            },300);
        }
    }
}