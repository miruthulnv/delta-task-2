function moveLeft() {
    this.request = requestAnimationFrame(this.moveLeft.bind(this));
    this.x -= this.xMovementSpeed ;
    this.xMovement += this.xMovementSpeed;
    this.drawPlayer();
    if (this.xMovement >= 100) {
        this.validCtrls = ['ArrowRight', 'ArrowLeft', 'ArrowUp'];
        this.xMovement = 0;
        cancelAnimationFrame(this.request);
        this.update();
    }
}

function moveRight() {
    this.request = requestAnimationFrame(this.moveRight.bind(this));
    this.x += this.xMovementSpeed ;
    this.xMovement += this.xMovementSpeed;
    this.drawPlayer();
    if (this.xMovement >= 100) {
        this.validCtrls = ['ArrowRight', 'ArrowLeft', 'ArrowUp'];
        this.xMovement = 0;
        cancelAnimationFrame(this.request);
        this.update();
    }
}