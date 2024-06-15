class Player extends Human{
    constructor(x,y) {
        super(x,y);
        this.playerSize = 200;
        this.life = 100;
        this.hasGun = true;
        this.spriteSheetJSON = [
            {elem: 'player', state: 'Idle Blink', path: 'Wraith_02_Idle Blinking_0',len: 12,},
            {elem: 'player', state: 'Walking', path: 'Wraith_02_Moving Forward_0',len: 12,},
            {elem: 'player', state: 'Dying', path: 'Wraith_02_Dying_0',len: 12,},
            {elem: 'player', state: 'Attacking', path: 'Wraith_02_Attack_0',len: 12,}
        ];
        this.jumpFactor = 25;
        this.xMovementSpeed = 10;
        this.jumpSpeed = this.jumpFactor;
        this.validCtrls = ['ArrowRight', 'ArrowLeft', 'ArrowUp'];
        this.gunImg = new Image();
        this.frameElem = 12;
        this.gunImg.src = 'assets/image/game-img/gun.svg';
        this.defStateName = 'Idle Blink';
        this.defElem= 'player';
        this.speed = 10;
        this.activatePlayerControls();
        this.update('Idle Blink','player');
    }

    //--------------SCREEN CONTROLS-------------------------//

    //----------------PLAYER CONTROLS-----------------------//
    playerControls(e) {
        if (e.key === 'ArrowRight') {
            if (this.validCtrls.includes('ArrowRight')) {
                this.update('Walking','player');
                this.move('Right');
                this.validCtrls = ['ArrowLeft', 'ArrowUp'];
            }
        }
        if (e.key === 'ArrowLeft') {
            if (this.validCtrls.includes('ArrowLeft')) {
                this.update('Walking','player')
                this.move('Left');
                this.validCtrls = ['ArrowRight', 'ArrowUp'];
            }
        }
        if (e.key === 'ArrowUp') {
            if (this.validCtrls.includes('ArrowUp')) {
                this.update('Walking','player')
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
    shoot(){};
    rotateGun(){};
    flipGun(){};

    //--------------GAME CONTROLS---------------------------//
    stopPlayerControls() {
        window.removeEventListener('keydown', this.boundPlayerControls);
    }
    pauseGame() {
        cancelAnimationFrame(this.jumpMotion);
        this.stopPlayerControls();
    }
    resumeGame() {
        this.activatePlayerControls();
        if (this.inJumpMotion)
        this.jumpMotion = requestAnimationFrame(this.jump.bind(this));
    }
}





