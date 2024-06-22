class Game {
    constructor() {
        this.pauseButton = document.querySelector('.pause--btn');
        this.gameIsPaused = false;
        this.basement = canvas.height - 200;
        this.zombies = [];
        this.difficulty = 'medium';
        this.player = new Player(900, this.basement);
        this.playerHealthFactor = 10;
        this.points = 0;
        this.tempCounter = 0;
        this.bgPos = 1250;
        this.bg = new Image();
        this.bg.src = './assets/image/game-background.png';
        this.allElemOtherThanPlayer = [...this.zombies, this.bg]
        this.activatePauseGameBtn();
        this.refreshScreen();
        this.pushZombiesToScreen();
        // this.gameMovement = setInterval(this.refreshScreen.bind(this), 1000/10);
    }

    activatePauseGameBtn() {
        this.pauseButton.addEventListener('click', () => {
            if (this.gameIsPaused) {
                this.refreshScreen();
                this.player.resumePlayer();
                this.pauseButton.innerHTML = ' <img src="./assets/image/pause.svg" alt="pause">';
            } else {
                this.refreshScreen(true);
                this.player.pausePlayer();
                this.pauseButton.innerHTML = ' <img src="./assets/image/play.svg" alt="play">';
            }
            this.gameIsPaused = !this.gameIsPaused;
        });
    }

    refreshScreen(pause = false) {
        if (pause) {
            clearInterval(this.I50);
            clearInterval(this.I300);
        } else {
            this.I50 = setInterval(() => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                console.log(`bgPos: ${this.bgPos}`)
                ctx.drawImage(this.bg, this.bgPos, 0, 1500, 700, 0, 0, canvas.width, canvas.height);
                this.player.draw();
                this.checkBulletCollision();
                this.checkPlayerCollision();
                this.zombies.forEach(zombie => {
                    zombie.draw(false);
                });
                this.player.drawBullets();
            }, 50);
            this.I300 = setInterval(() => {
                this.zombies.forEach(zombie => {
                    zombie.draw();
                    zombie.move(zombie.direction);
                    life.textContent = this.player.life;
                    score.textContent = this.points;
                    if (this.player.life < 1) {
                        this.gameIsPaused = true;
                        this.refreshScreen(true);
                        gameOver.parentNode.parentNode.style.visibility = 'visible';
                        gameOver.textContent = `Game Over.. Your Score is ${this.points}..
                        Press F5 to restart the game..`;
                    }
                });
            }, 200);
        }

    }

    pushZombiesToScreen() {
        let time = randomInt([1000, 4000]);
        // if (this.difficulty === "medium") time = time*1;
        if (!this.gameIsPaused && this.zombies.length < 10) {
            if (this.difficulty === "hard") time = time * 0.5;
            else if (this.difficulty === "extreme") time = time * 0.1;
            else if (this.difficulty === "easy") time = time * 2;
            setTimeout(this.createZombieObject.bind(this), time);
        }
        setTimeout(this.pushZombiesToScreen.bind(this), time);
    }

    createZombieObject() {
        const playerArea = canvas.width / 3;

        // const direction = Math.floor(Math.random()*2) ? 'left' : 'right';
        let direction;
        const x = randomInt([0, canvas.width]);
        if (x < playerArea) {
            direction = `right`;
        } else if (x > playerArea * 2) {
            direction = `left`;
        } else {
            return
        }
        this.zombies.push(new Zombie(x, this.basement, direction));
    }

    checkBulletCollision() {
        for (let zombieIndex = 0; zombieIndex < this.zombies.length; zombieIndex++) {
            const zombie = this.zombies[zombieIndex];
            for (let bulletIndex = 0; bulletIndex < this.player.bullet?.length; bulletIndex++) {
                const bullet = this.player.bullet[bulletIndex];
                const distance = Math.sqrt((zombie.x - bullet.x) ** 2 + (zombie.y - bullet.y) ** 2);
                if (distance < zombie.width) {
                    canvas.removeEventListener('click', this.player.shootBulletBound);
                    this.points += 10;
                    zombie.update('Dead', 'zombie-1');
                    setTimeout(() => {
                        this.zombies.splice(zombieIndex, 1);
                        this.player.activateShoot();
                    }, 100);
                    // console.log(`☠ Zombie with ID:${zombieIndex} has been killed ☠`);
                    bullet.life = false;
                    break;
                }
            }
        }

    }

    moveBG(direction){
        if (direction === 'right') {
            if (this.bgPos >= 0)
            this.bgPos -= this.player.xMovementSpeed;
        }
        if (direction === 'left') {
            if (this.bgPos <= 2500)
                this.bgPos += this.player.xMovementSpeed;
        }
    }

    checkPlayerCollision() {
        this.zombies.forEach((zombie, zombieIndex) => {
            const distance = Math.sqrt((zombie.x - this.player.x) ** 2 + (zombie.y - this.player.y) ** 2);
            if (distance < zombie.width) {
                zombie.move('stop');
                zombie.update('Attack', 'zombie-1');
                this.tempCounter += 1;
                // console.log(this.tempCounter)
            }
            if (this.tempCounter > this.playerHealthFactor) {
                zombie.move(zombie.direction);
                zombie.update('Walk', 'zombie-1');
                this.player.life -= 1;
                this.tempCounter = 0;
            }
        });
    }
}