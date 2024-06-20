class Game{
    constructor(){
        this.pauseButton = document.querySelector('.pause--btn');
        this.gameIsPaused = false;
        this.basement = canvas.height -200;
        this.zombies = [];
        this.difficulty = 'medium';
        // this.zombie = new Zombie(100, 750);
        // this.zombie2 = new Zombie(1400, 750,'left');
        this.player = new Player(900, 750);
        this.playerHealthFactor = 90;
        this.points = 0;
        this.tempCounter = 0;
        this.activatePauseGameBtn();
        this.refreshScreen();
        this.pushZombiesToScreen();
        // this.gameMovement = setInterval(this.refreshScreen.bind(this), 1000/10);
    }

    activatePauseGameBtn(){
        this.pauseButton.addEventListener('click', () => {
            if (this.gameIsPaused) {
                this.refreshScreen();
                this.player.resumePlayer();
                this.pauseButton.textContent = 'Pause';
            } else {
                this.refreshScreen(true);
                this.player.pausePlayer();
                this.pauseButton.textContent = 'Play';
            }
            this.gameIsPaused = !this.gameIsPaused;
        });
    }

    refreshScreen(pause=false){
        if (pause){
            console.log('About to gameIsPaused game')
            clearInterval(this.I50);
            clearInterval(this.I300);
        }
        else{
            this.I50 = setInterval(()=>{
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                this.player.draw();
                this.checkBulletCollision();
                this.checkPlayerCollision();
                this.zombies.forEach(zombie => {
                    zombie.draw(false);
                });
                this.player.bullet?.update();
            },50);
            this.I300 = setInterval(()=>{
                this.zombies.forEach(zombie => {
                    zombie.draw();
                    // zombie.move(zombie.direction);
                });
            },200);
        }
    }

    pushZombiesToScreen(){
        let time = randomInt([1000,4000]);
        // if (this.difficulty === "medium") time = time*1;
        if (this.difficulty === "hard") time = time*0.5;
        else if (this.difficulty === "extreme") time = time*0.1;
        else if (this.difficulty === "easy") time = time*2;
        setTimeout(this.createZombieObject.bind(this),time);
        setTimeout(this.pushZombiesToScreen.bind(this),time);
    }

    createZombieObject(){
        const playerArea = canvas.width/3;

        // const direction = Math.floor(Math.random()*2) ? 'left' : 'right';
        let direction;
        const x = randomInt([0,canvas.width]);
        if (x<playerArea){
            direction = `right`;
        }
        else if ( x > playerArea*2){
            direction = `left`;
        }
        else{
            return
        }
        this.zombies.push(new Zombie(x, this.basement, direction));
    }

    checkBulletCollision(){
        this.zombies.forEach((zombie, zombieIndex) => {
            if (this.player.bullet){
                const bullet = this.player.bullet;
                const distance = Math.sqrt((zombie.x - bullet.x)**2 + (zombie.y - bullet.y)**2);
                if (distance < zombie.width){
                    zombie.update('Dead','zombie-1');

                    setTimeout(()=>this.zombies.splice(zombieIndex,1),0)
                    console.log(`☠ Zombie with ID:${zombieIndex} has been killed ☠`);

                    this.player.bullet = null;
                    this.points += 10;
                }
            }
        });
    }

    checkPlayerCollision(){
        this.zombies.forEach((zombie, zombieIndex) => {
            const distance = Math.sqrt((zombie.x - this.player.x)**2 + (zombie.y - this.player.y)**2);
            if (distance < zombie.width){
                this.tempCounter+=1;
            }
            if (this.tempCounter > this.playerHealthFactor )
            {
                this.player.life -= 1;
                this.tempCounter = 0;
            }
        });
    }
}