class Human {
    constructor(x, y) {
        this.height = 200;
        this.width = 200;
        this.x = x;
        this.y = y;
        this.originalX = this.x + 1250;
        this.speed = 5;
        this.life = 100;
        this.hasGun = false;
        // this.spriteSheetJSON = [];
        this.jumpFactor = 25;
        this.xMovementSpeed = 100;
        this.jumpSpeed = this.jumpFactor;
        this.xMovement = 0;
        this.xPos = this.x;
        this.frame = 0;
        this.playerImg = [];
        this.gunImg = new Image();

    }

    //--------------SCREEN REFRESH-------------------------//
    spriteSheet(stateName, elem) {
        const currentState = this.spriteSheetJSON.find(el => (el.state === stateName) && (el.elem === elem));
        if (!currentState) {
            console.error(`state : ${stateName} not found in spriteSheetJSON of ${elem}`);
            console.log(this.spriteSheetJSON)
        }
        this.lastUpdatedDirection = this.direction;
        this.frame = 0;
        this.playerImg = [];
        this.frameElem = currentState.len;
        for (let i = 0; i < this.frameElem; i++) {
            this.playerImg.push(new Image());
            if (elem === 'player') {
                i = i < 10 ? `0${i}` : i;
                this.playerImg[Number(i)].src = `assets/image/game-img/${this.direction}/${currentState.elem}/${currentState.state}/${currentState.path}${i}.png`;

            } else {
                this.playerImg[Number(i)].src = `assets/image/game-img/${this.direction}/${currentState.elem}/${currentState.state}${i + 1}.png`;
            }
        }
    }

    draw(incFrame = true) {
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
            this.playerImg[this.frame % this.frameElem],
            this.x, this.y, this.width, this.height,);
        if (this.hasGun) {
            if (this.direction === 'left') {
                this.gunX = this.x - 30;
                this.gunY = this.y + 50;
            } else if (this.direction === 'right') {
                this.gunX = this.x + 130;
                this.gunY = this.y + 50;
            }
            this.gunImg.src = `assets/image/game-img/${this.direction}/gun.svg`;
            ctx.drawImage(this.gunImg, this.gunX, this.gunY, 100, 80);
        }
        if (incFrame) this.frame++;
    }

    update(stateName, elem,direction = this.direction) {
        if (this.currentState !== stateName || direction!==this.lastUpdatedDirection ){
        this.currentState = stateName;
        this.currentElem = elem;
        this.spriteSheet(stateName, elem);}
    }

    //----------------PLAYER CONTROLS-----------------------//
    move(direction,dist = 10) {
        if (direction==='stop'){
            console.log('stopped')
            cancelAnimationFrame(this.request);
        }
        else{
        this.request = requestAnimationFrame(() => this.move(direction));
        this.x += this.xMovementSpeed * (direction === 'right' ? 1 : -1);
        this.xMovement += this.xMovementSpeed;
        // this.inMotion = true;
        //this.direction = direction.toLowerCase();
        // this.gunImg.src = `assets/image/game-img/${this.direction}/gun.svg`;
        // this.draw();
        if (this.xMovement >= dist) {
            this.validCtrls = ['ArrowRight', 'ArrowLeft', 'ArrowUp'];
            this.xMovement = 0;
            // this.inMotion = false;
            cancelAnimationFrame(this.request);
            // this.update(this.stateName, this.elem);
        }}
    }
    moveArcade(direction) {
        // if (direction==='stop'){
        //     return;
        // }
        // this.request = requestAnimationFrame(() => this.moveAcrade(direction));
        this.x += this.xMovementSpeed * (direction === 'right' ? 1 : -1);
        this.xPos += this.xMovementSpeed;
        // this.inMotion = true;
        //this.direction = direction.toLowerCase();
        // this.gunImg.src = `assets/image/game-img/${this.direction}/gun.svg`;
        // this.draw();
        // if (this.xMovement >= 100) {
        //     this.validCtrls = ['ArrowRight', 'ArrowLeft', 'ArrowUp'];
        //     this.xMovement = 0;
        //     this.inMotion = false;
        //     // cancelAnimationFrame(this.request);
            this.update(this.stateName, this.elem);
        // }
    }

    jump() {
        this.jumpMotion = requestAnimationFrame(this.jump.bind(this));
        this.inMotion = true;
        this.jumpSpeed = this.jumpSpeed - 1;
        // this.draw();
        if (this.jumpSpeed > -this.jumpFactor) {
            this.y -= this.jumpSpeed;
        } else {
            this.jumpSpeed = this.jumpFactor;
            this.validCtrls = ['ArrowRight', 'ArrowLeft', 'ArrowUp'];
            cancelAnimationFrame(this.jumpMotion);
            this.inMotion = false;
            this.update(this.stateName, this.elem);

        }
    }

}