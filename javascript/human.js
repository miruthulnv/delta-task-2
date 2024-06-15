class Human {
    constructor(x,y) {
        this.height = 200;
        this.width = 200;
        this.x = x;
        this.y = y;
        this.speed = 5;
        this.life = 100;
        this.hasGun = false;
        // this.spriteSheetJSON = [];
        this.jumpFactor = 25;
        this.xMovementSpeed = 10;
        this.jumpSpeed = this.jumpFactor;
        this.xMovement = 0;
        this.frame = 0;
        this.playerImg =[];

    }
    //--------------SCREEN REFRESH-------------------------//
    spriteSheet(stateName,elem) {
        const currentState = this.spriteSheetJSON.find(el => (el.state === stateName)&&(el.elem === elem));
        if (!currentState) console.error(`state : ${stateName} not found in spriteSheetJSON of ${elem}`);
        this.frame = 0;
        this.playerImg = [];
        this.frameElem = currentState.len;
        for (let i = 0; i <this.frameElem; i++) {
            this.playerImg.push(new Image());
            if (elem === 'player')
            {
                i = i < 10 ? `0${i}` : i;
                this.playerImg[Number(i)].src = `assets/image/game-img/${currentState.elem}/${currentState.state}/${currentState.path}${i}.png`;

            }
            else {
                this.playerImg[Number(i)].src = `assets/image/game-img/${currentState.elem}/${currentState.state}${i + 1}.png`;
            }
        }
    }
    draw() {
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(this.playerImg[this.frame % this.frameElem], this.x, this.y, this.width, this.height,);
        this.hasGun && ctx.drawImage(this.gunImg, this.x + this.width / 2, this.y + this.height / 2, 50, 50);
        this.frame++;
    }
    update(stateName,elem) {
        this.spriteSheet(stateName,elem);
    }

    //----------------PLAYER CONTROLS-----------------------//
    move(direction) {
        this.request = requestAnimationFrame(() => this.move(direction));
        this.x += this.xMovementSpeed * (direction === 'Right' ? 1 : -1);
        this.xMovement += this.xMovementSpeed;
        // this.draw();
        if (this.xMovement >= 100) {
            this.validCtrls = ['ArrowRight', 'ArrowLeft', 'ArrowUp'];
            this.xMovement = 0;
            cancelAnimationFrame(this.request);
            this.update(this.defStateName,this.defElem);
        }
    }
    jump() {
        this.jumpMotion = requestAnimationFrame(this.jump.bind(this));
        this.inJumpMotion =true;
        this.jumpSpeed = this.jumpSpeed - 1;
        // this.draw();
        if (this.jumpSpeed > -this.jumpFactor) {
            this.y -= this.jumpSpeed;
        } else {
            this.jumpSpeed = this.jumpFactor;
            this.validCtrls = ['ArrowRight', 'ArrowLeft', 'ArrowUp'];
            cancelAnimationFrame(this.jumpMotion);
            this.inJumpMotion =false;
            this.update(this.defStateName,this.defElem);

        }
    }

}