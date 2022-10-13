const canvas = document.getElementById('canvas');
//set width and height canvas
canvas.width = innerWidth;
canvas.height = innerHeight;

//get context
const context = canvas.getContext('2d');

class Circle {
    constructor(x, y, r, c, dx, dy, fillColor) {
        this.x=x;
        this.y=y;
        this.r=r;
        this.c=c;
        this.dx=dx;
        this.dy=dy;
        this.fillColor = fillColor;
    }
    draw () {
        //begin path
        context.beginPath();
        context.shadowColor = "#9AC5DB";
        context.shadowBlur = 10;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.strokeStyle=this.c;
        context.fillStyle=this.fillColor;
        context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        context.stroke();
        context.fill();
    }
    animation () {
        // dx = direction in x axis
        // dy =  direction in y axis
        this.x += this.dx;
        this.y += this.dy;
        if(this.x + this.r > innerWidth || this.x - this.r < 0) this.dx = -this.dx;
        if(this.y + this.r > innerHeight || this.y - this.r < 0) this.dy = - this.dy;
        this.draw();
    }
}

const balls = [];
const size = document.getElementById('size');
const speed = document.getElementById('speed');

// create multiple balls
for(let i = 0; i < 1; i++) {
    let r = Math.random() * 12 , x = Math.random() * (innerWidth - 2 * r)+r, y = Math.random() * (innerHeight - 2 * r) + r, c = 'white', dx = (Math.random() - 0.5) * 8, dy = (Math.random() - 0.5) * 8;
    const fillColor = ['#9AC5DB', '#a4ded5', '#91ffff', '#08a4a7', '#e9ffff', '#4dfed1', 'red', 'green', 'yellow'];
    balls.push(new Circle(x, y, r, c, dx, dy, fillColor[Math.floor(Math.random()*fillColor.length)]));
}

//animation move the ball to x and y
function update () {
    requestAnimationFrame(update);
    context.clearRect(0, 0, innerWidth, innerHeight);
    for(let ball of balls) {
        ball.animation();
        size.onchange = (e)=> {
            let {target} = e;
            ball.r = Math.random() * (+target.value);
        }
        speed.onchange = (e)=> {
            let {target} = e;
            ball.dx = (Math.random() - 0.5) * (+target.value);
            ball.dy = (Math.random() - 0.5) * (+target.value);
        }
    }
}
update();

window.onclick = e => {
    let r = Math.random() * 3 , x = e.clientX, y = e.clientY, c = 'white', dx = (Math.random() - 0.5) * 8, dy = (Math.random() - 0.5) * 8;
    const fillColor = ['#9AC5DB', '#a4ded5', '#91ffff', '#08a4a7', '#e9ffff', '#4dfed1', 'red', 'green', 'yellow'];
    balls.push(new Circle(x, y, r, c, dx, dy, fillColor[Math.floor(Math.random()*fillColor.length)]));
}