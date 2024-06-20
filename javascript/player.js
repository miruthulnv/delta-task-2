class Player extends Human {
    constructor(x, y) {
        super(x, y);
        this.playerSize = 200;
        this.life = 100;
        this.direction = 'right';
        this.hasGun = true;
        this.spriteSheetJSON = [
            {elem: 'player', state: 'Idle Blink', path: 'Wraith_02_Idle Blinking_0', len: 12,},
            {elem: 'player', state: 'Walking', path: 'Wraith_02_Moving Forward_0', len: 12,},
            {elem: 'player', state: 'Dying', path: 'Wraith_02_Dying_0', len: 12,},
            {elem: 'player', state: 'Attacking', path: 'Wraith_02_Attack_0', len: 12,}
        ];
        this.jumpFactor = 30;
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
        this.bullet = undefined;
        this.activatePlayerControls();
        this.update('Idle Blink', 'player');
        // this.rotateGun();
        this.activateShoot();
    }

    //--------------SCREEN CONTROLS-------------------------//

    //----------------PLAYER CONTROLS-----------------------//
    playerControls(e) {
        if (e.key === 'ArrowRight') {
            if (this.validCtrls.includes('ArrowRight')) {
                this.update('Walking', 'player');
                this.direction = 'right'
                this.move('right');
                this.validCtrls = ['ArrowLeft', 'ArrowUp'];
            }
        }
        if (e.key === 'ArrowLeft') {
            if (this.validCtrls.includes('ArrowLeft')) {
                this.update('Walking', 'player');
                this.direction = 'left';
                this.move('Left');
                this.validCtrls = ['ArrowRight', 'ArrowUp'];
            }
        }
        if (e.key === 'ArrowUp') {
            if (this.validCtrls.includes('ArrowUp')) {
                this.update('Walking', 'player')
                this.jump();
                this.validCtrls = ['ArrowRight', 'ArrowLeft'];
            }
        }
    }

    activatePlayerControls() {
        this.boundPlayerControls = this.playerControls.bind(this);
        window.addEventListener('keydown', this.boundPlayerControls);
    }


    //--------------GUN CONTROLS---------------------------//
    shootBullet(e) {
        if (!this.bullet?.inMotion) {
            const angle = Math.atan2(e.clientY - this.gunY, e.clientX - this.gunX);
            this.bullet = new Bullet(this.gunX, this.gunY, {x: Math.cos(angle), y: Math.sin(angle)});
            if (e.clientX > this.x) {
                this.reflexIsOn && this.move('left');
                this.direction = 'right';
            } else if (e.clientX < this.x) {
                this.reflexIsOn && this.move('right');
                this.direction = 'left';
            }
            this.update('Idle Blink', 'player');
        }
    }

    activateShoot() {
        this.shootBulletBound = this.shootBullet.bind(this);
        canvas.addEventListener('click', this.shootBulletBound);
    };

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
    };

    flipGun() {
    };

    //--------------GAME CONTROLS---------------------------//
    stopPlayerControls() {
        window.removeEventListener('keydown', this.boundPlayerControls);
    }

    pausePlayer() {
        cancelAnimationFrame(this.jumpMotion);
        this.stopPlayerControls();
        canvas.removeEventListener('click', this.shootBulletBound);
    }

    resumePlayer() {
        this.activateShoot();
        this.activatePlayerControls();
        if (this.inMotion)
            this.jumpMotion = requestAnimationFrame(this.jump.bind(this));
    }
}





