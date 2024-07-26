class Game {
    constructor() {
        this.pauseButton = document.querySelector('.pause--btn');
        this.gameIsPaused = false;
        this.basement = canvas.height - 250;
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
        this.gameSettings();
        this.zombieNo = 10;
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
                // console.log(`bgPos: ${this.bgPos}`)
                ctx.drawImage(this.bg, this.bgPos, 0, 1500, 700, 0, 0, canvas.width, canvas.height);
                this.player.draw();
                // console.log(this.player.originalX)
                this.checkBulletCollision();
                this.checkPlayerCollision();
                this.player.activateShowBulletPath();
                this.player.gameLoop();
                this.zombies.forEach(zombie => {
                    zombie.draw(false);
                });
                this.player.drawBullets();
            }, 50);
            this.I300 = setInterval(() => {
                this.zombies.forEach(zombie => {
                    zombie.draw();
                    // console.log(zombie);
                    if (!zombie.nearPlayer) {
                        zombie.update('Walk', 'zombie-1');
                        zombie.move(zombie.direction)
                    }
                    ;
                    life.textContent = this.player.life;
                    score.textContent = this.points;
                    if (this.player.life < 1) {
                        this.player.pausePlayer();
                        this.gameIsPaused = true;
                        this.refreshScreen(true);
                        this.player.life = 0;
                        const gameOver = document.querySelector('.game--over--modal');
                        console.log(gameOver)
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
        if (!this.gameIsPaused && this.zombies.length < this.zombieNo) {
            if (this.difficulty === "medium") {
                time = time * 1;
                this.zombieNo = 10;
            } else if (this.difficulty === "hard") {
                time = time * 0.5
                this.zombieNo = 15;
            } else if (this.difficulty === "extreme") {
                time = time * 0.1
                this.zombieNo = 20;
            } else if (this.difficulty === "easy") {
                time = time * 2
                this.zombieNo = 10;
            }
            ;
            setTimeout(this.createZombieObject.bind(this), time);
        }
        setTimeout(this.pushZombiesToScreen.bind(this), time);
    }

    createZombieObject() {
        const playerArea = Math.floor(canvas.width / 3);

        const direction = Math.floor(Math.random() * 2) ? 'left' : 'right';
        const x = (direction === 'left') ? randomInt([500, 2000 - playerArea]) : randomInt([2000 + playerArea, 3500])
        // const x = 3500;
        const newZombie = new Zombie(x - 1250, this.basement, direction);
        newZombie.move('left')
        this.zombies.push(newZombie);
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
                    bullet.life = false;
                    setTimeout(() => {
                        this.zombies.splice(zombieIndex, 1);
                        this.player.activateShoot();
                    }, 100);
                    console.log(`☠ Zombie with ID:${zombieIndex} has been killed ☠`);
                    return;
                    // break;

                }
            }
        }

    }

    moveBG(direction) {
        if (direction === 'right') {
            if (this.bgPos >= 0) {
                this.bgPos -= this.player.xMovementSpeed;
                this.zombies.forEach((zombie) => {
                    zombie.x += this.player.xMovementSpeed;
                })
            }
        }

        if (direction === 'left') {
            if (this.bgPos <= 2500) {
                this.bgPos += this.player.xMovementSpeed;
                this.zombies.forEach((zombie) => {
                    zombie.x -= this.player.xMovementSpeed;
                })
            }

        }
    }

    checkPlayerCollision() {
        this.zombies.forEach((zombie, zombieIndex) => {
            zombie.nearPlayer = false;
            const distance = Math.sqrt((zombie.x - this.player.x) ** 2 + (zombie.y - this.player.y) ** 2);
            if (distance < zombie.width) {
                zombie.nearPlayer = true;
                if (zombie.currentState !== 'Attack')
                    zombie.update('Attack', 'zombie-1');
                this.tempCounter += 1;
                // console.log(this.tempCounter)
            } else {
                if (zombie.x > this.player.x) {
                    if (zombie.direction !== 'left') {
                        zombie.direction = 'left'
                        zombie.update('Walk', 'zombie-1');
                    }
                } else if (zombie.x < this.player.x) {
                    if (zombie.direction !== 'right') {
                        zombie.direction = 'right'
                        zombie.update('Walk', 'zombie-1');
                    }

                }
            }


            if (this.tempCounter > this.playerHealthFactor) {
                // zombie.update('Walk', 'zombie-1');
                this.player.life -= 1;
                this.tempCounter = 0;
            }
        });
    }

    gameSettings() {
        settings.addEventListener('click', () => {
            const settingsModal = document.querySelector('.modal');
            settingsModal.style.visibility = 'visible';
            const closeBtn = document.querySelector('.close');
            closeBtn.addEventListener('click', () => {
                settingsModal.style.visibility = 'hidden';
            });
            const modalContent = document.querySelector('.the-og-content');
            modalContent.innerHTML = `<h1 style="font-size: 80px;">Game Settings</h1>
            <br><br>
            <h2 style="text-align: center; font-size: 40px;">Difficulty</h2>   
            <div>
                <input type="radio" id="easy" name="difficulty" value="Easy">
                <label for="easy">Easy</label><br>
                    <input type="radio" id="medium" name="difficulty" value="Medium" checked>
                    <label for="medium">Medium</label><br>
                    <input type="radio" id="hard" name="difficulty" value="Hard">
                    <label for="hard">Hard</label><br>
                    <input type="radio" id="extreme" name="difficulty" value="Extreme">
                    <label for="extreme">Extreme</label><br>
                                </div>
                          <br>
                                <h2 style="text-align: center; font-size: 40px;">Gravity</h2>
                                 <div>
                                    <input type="radio" id="earth" name="gravity" value="Earth" checked>
                    <label for="earth">Earth</label><br>
                    <input type="radio" id="moon" name="gravity" value="Moon">
                    <label for="moon">Moon</label><br>
                    <input type="radio" id="space" name="gravity" value="Space">
                    <label for="space">Space</label><br>
                                </div>
                                <br>
                                <h2 style="text-align: center; font-size: 40px;">Recoil</h2>
                    <div>
                       <input type="radio" id="yes" name="recoil" value="Yes">
                       <label for="yes">Yes</label><br>
                       <input type="radio" id="no" name="recoil" value="No" checked>
                       <label for="no">No</label><br>
                    </div>
                    <br>
                                <h2 style="text-align: center; font-size: 40px;">Player Speed</h2>
                                    <div>
                                       <input type="radio" id="slow" name="speed" value="Slow">
                    <label for="slow">Slow</label><br>
                    <input type="radio" id="medium" name="speed" value="Medium" checked>
                    <label for="medium">Medium</label><br>
                    <input type="radio" id="fast" name="speed" value="Fast">
                    <label for="fast">Fast</label><br>
                                    </div>    
                              <p style="color:red; font-size: 10px; font-family: 'Open Sans', sans-serif;">Note: Please ensure you have checked all the options only then will the save button work</p>
                                    <button class="save">Save</button> 
`
            const saveBtn = document.querySelector('.save');
            saveBtn.addEventListener('click', () => {
                const difficulty = document.querySelector('input[name="difficulty"]:checked').value;
                const gravity = document.querySelector('input[name="gravity"]:checked').value;
                const speed = document.querySelector('input[name="speed"]:checked').value;
                const recoil = document.querySelector('input[name="recoil"]:checked').value;
                console.log(difficulty, gravity, speed);
                this.difficulty = difficulty.toLowerCase();
                if (speed === 'Medium') {
                    this.player.xMovementSpeed = 20;
                }
                else if (speed === 'Slow') {
                    this.player.xMovementSpeed = 10;
                }
                else if (speed === 'Fast') {
                    this.player.xMovementSpeed = 30;
                }
                Bullet.prototype.gravity = gravity;
                if (gravity === 'Earth') this.player.jumpFactor = 10;
                if (gravity === 'Moon') this.player.jumpFactor = 25;
                if (gravity === 'Space') this.player.jumpFactor = 35;
                if (recoil === 'Yes') this.player.reflexIsOn = true;
                if (recoil === 'No') this.player.reflexIsOn = false;
                settingsModal.style.visibility = 'hidden';
                modalContent.innerHTML = '<p class="game--over--modal"></p>';
            });
        });
    }
}