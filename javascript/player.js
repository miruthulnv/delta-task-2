class Player extends Human {
    constructor(x, y) {
        super(x, y);
        this.playerSize = 200;
        this.life = 100;
        this.direction = 'right';
        this.hasGun = true;
        this.spriteSheetJSON = [{
            elem: 'player', state: 'Idle Blink', path: 'Wraith_02_Idle Blinking_0', len: 12,
        }, {elem: 'player', state: 'Walking', path: 'Wraith_02_Moving Forward_0', len: 12,}, {
            elem: 'player', state: 'Dying', path: 'Wraith_02_Dying_0', len: 12,
        }, {elem: 'player', state: 'Attacking', path: 'Wraith_02_Attack_0', len: 12,}];
        this.jumpFactor = 25;
        this.xMovementSpeed = 10;
        this.jumpSpeed = this.jumpFactor;
        this.validCtrls = ['ArrowRight', 'ArrowLeft', 'ArrowUp'];
        this.gunImg = new Image();
        this.frameElem = 12;
        this.gunImg.src = `assets/image/game-img/${this.direction}/gun.svg`;
        this.stateName = 'Idle Blink';
        this.elem = 'player';
        this.speed = 10;
        this.reflexIsOn = false;
        this.bullet = [];
        this.keyState = {};
        this.boundedShowBulletPath = this.showBulletPath.bind(this)
        this.activatePlayerControls();
        this.update('Idle Blink', 'player');
        // this.rotateGun();
        this.activateShoot();
    }

    //--------------SCREEN CONTROLS-------------------------//
    drawBullets() {
        for (let i = this.bullet.length - 1; i >= 0; i--) {
            let bullet = this.bullet[i];
            if (!bullet.life) {
                this.bullet.splice(i, 1);
            } else {
                bullet.update();
            }
        }
    }

    //----------------PLAYER CONTROLS-----------------------//
    // playerControls(e) {
    //     if (e.key === 'ArrowRight' || e.key === 'D') {
    //         if (this.x < 1100) {
    //             if (this.validCtrls.includes('ArrowRight')) {
    //                 this.update('Walking', 'player');
    //                 this.direction = 'right'
    //                 // if (this.inMotion) this.move('right');
    //                 // else
    //                     this.moveArcade('right');
    //
    //                 // this.validCtrls = ['ArrowLeft', 'ArrowUp'];
    //             }
    //         }
    //         else{
    //             game.moveBG('left');
    //         }
    //     }
    //     if (e.key === 'ArrowLeft' || e.key === 'A') {
    //         if (this.x > 200) {
    //             if (this.validCtrls.includes('ArrowLeft')) {
    //                 this.update('Walking', 'player');
    //                 this.direction = 'left';
    //                 // if (this.inMotion) this.move('left');
    //                 // else
    //                     this.moveArcade('left');
    //                 // this.validCtrls = ['ArrowRight', 'ArrowUp'];
    //             }
    //         }
    //         else{
    //             game.moveBG('right');
    //         }
    //
    //     }
    //     if (e.key === 'ArrowUp' || e.key === 'W') {
    //         if (this.validCtrls.includes('ArrowUp')) {
    //             this.update('Walking', 'player')
    //             this.jump();
    //             this.validCtrls = ['ArrowRight', 'ArrowLeft'];
    //         }
    //     }
    // }
    //
    // activatePlayerControls() {
    //     this.boundPlayerControls = this.playerControls.bind(this);
    //     window.addEventListener('keypress', this.boundPlayerControls);
    // }

    playerControls(e) {
        this.keyState[e.key] = (e.type === "keydown");  // Set the key state
        // ...
    }

    activatePlayerControls() {
        this.boundPlayerControls = this.playerControls.bind(this);
        window.addEventListener('keydown', this.boundPlayerControls);
        window.addEventListener('keyup', this.boundPlayerControls);  // Listen for keyup events too
    }

    gameLoop() {
        if (this.keyState['ArrowRight'] || this.keyState['D'] || this.keyState['d']) {
            // Move right
            if (this.originalX < 3500) {
                this.originalX += this.xMovementSpeed;
            }
            if (this.x < 800) {
                if (this.validCtrls.includes('ArrowRight')) {
                    this.update('Walking', 'player');
                    this.direction = 'right';
                    if (this.inMotion){
                        this.move('right',100);
                    }
                    else{
                        this.moveArcade('right');
                    }
                }
            } else {
                game.moveBG('left');
            }
        }
        if (this.keyState['ArrowLeft'] || this.keyState['A'] || this.keyState['a']) {
            // Move left
            if (this.originalX > 0) {
                this.originalX -= this.xMovementSpeed;
            }
            if (this.x > 400) {
                if (this.validCtrls.includes('ArrowRight')) {
                    this.update('Walking', 'player');
                    this.direction = 'left'
                    if (this.inMotion){
                        this.move('left',100);
                    }
                    else{
                        this.moveArcade('left',);
                    }
                }
            } else {
                game.moveBG('right');
            }
        }
        if (this.keyState['ArrowUp'] || this.keyState['W'] || this.keyState['w']) {
            if (this.validCtrls.includes('ArrowUp')) {
                this.update('Walking', 'player')
                this.jump();
                this.validCtrls = ['ArrowRight', 'ArrowLeft'];
            }
        }
    }

    // ...

//--------------GUN CONTROLS---------------------------//
    shootBullet(e) {
        // ctx.clearRect()
        const angle = Math.atan2(e.clientY - this.gunY, e.clientX - this.gunX);
        this.bullet.push(new Bullet(this.gunX, this.gunY,
            {x: Math.cos(angle), y: Math.sin(angle)},
            10,
            'green'));
        if (e.clientX > this.x) {
            this.reflexIsOn && this.move('left');
            this.direction = 'right';
        } else if (e.clientX < this.x) {
            this.reflexIsOn && this.move('right');
            this.direction = 'left';
        }
        this.update('Idle Blink', 'player');
    }

    activateShoot() {
        this.shootBulletBound = this.shootBullet.bind(this);
        canvas.addEventListener('click', this.shootBulletBound);

    }
    ;

    showBulletPath(e) {
        const angle = Math.atan2(e.clientY - this.gunY, e.clientX - this.gunX);
        this.bulletPath = (new Bullet(this.gunX, this.gunY, {x: Math.cos(angle), y: Math.sin(angle)},2,'red'));
        this.bulletPath.tracePath();
    }

    activateShowBulletPath() {
        canvas.addEventListener('mousemove', this.boundedShowBulletPath,);
    }

    rotateGun() {
        //On mouse move rotate the gunImg in the angle where the mouse pointer is
        window.addEventListener('mousemove', (event) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const theta = Math.atan2(dy, dx);
            this.gunImg.style.transform = `rotate(${theta}rad)`;
        });
    }
    ;

    flipGun() {
    }
    ;

//--------------GAME CONTROLS---------------------------//
    stopPlayerControls() {
        window.removeEventListener('keydown', this.boundPlayerControls);
    }

    pausePlayer() {
        cancelAnimationFrame(this.jumpMotion);
        this.stopPlayerControls();
        canvas.removeEventListener('mousemove', this.boundedShowBulletPath);
        canvas.removeEventListener('click', this.shootBulletBound);
    }

    resumePlayer() {
        this.activateShoot();
        this.activatePlayerControls();
        this.activateShowBulletPath();
        if (this.inMotion) this.jumpMotion = requestAnimationFrame(this.jump.bind(this));
    }
}





