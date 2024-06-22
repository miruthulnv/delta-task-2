class Bullet {
    constructor(x, y,direction) {
        this.x = x;
        this.y = y;
        this.radius = 10;
        this.speed = 90;
        this.speedX = direction.x*this.speed;
        this.speedY = direction.y*this.speed;
        this.color = 'green';
        this.life = true;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.draw();
        if (this.y > canvas.height || this.y < 0 || this.x > canvas.width || this.x < 0) {
            this.life = false;
            //Remove the bullet if this condition is met
            return;
        }
        this.x = this.x + this.speedX;
        this.y = this.y + this.speedY;
        this.speedY = this.speedY + 9.8;
    }
}