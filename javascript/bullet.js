class Bullet {
    constructor(x, y,direction,radius,color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = 90;
        this.speedX = direction.x*this.speed;
        this.speedY = direction.y*this.speed;
        this.color = color;
        this.life = true;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    // drawBall(x,y){
    //         ctx.beginPath();
    //         ctx.arc(x, y, 10, 0, Math.PI * 2, false);
    //         ctx.fillStyle = '#fff';
    //         ctx.fill();
    // }

    tracePath(){
       this.request = requestAnimationFrame(this.tracePath.bind(this));
       this.update();
       if (this.y > canvas.height || this.y < 200 || this.x > canvas.width || this.x < 0) {
           cancelAnimationFrame(this.request)
       }
    }

    update() {
        this.draw();
        if (this.y > canvas.height || this.y < 0 || this.x > canvas.width || this.x < 0) {
            this.life = false;
            //Remove the bullet if this condition is met
            return;
        }
       if (this.life){
           this.x = this.x + this.speedX;
           this.y = this.y + this.speedY;
           if (this.gravity === 'Space'){
               this.speedY = this.speedY + 0;
           }
           else if(this.gravity === 'Moon'){
               this.speedY = this.speedY + 1.6;
           }
           else {
               this.speedY = this.speedY + 9.8;
           }

       }
    }
}