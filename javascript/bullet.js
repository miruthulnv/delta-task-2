class Bullet {
    constructor(x, y,direction) {
        this.x = x;
        this.y = y;
        this.radius = 10;
        this.speed = 90;
        this.speedX = direction.x*this.speed;
        this.speedY = direction.y*this.speed;
        this.color = 'red';
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.draw();
        this.x = this.x + this.speedX;
        this.y = this.y + this.speedY;
        this.speedY = this.speedY + 9.8;
    }
}