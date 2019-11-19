let canvas = document.querySelector("#canvas")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");

let image = new Image();
image.src = "space.jpeg";

function Rectangle (x, y, width, height, dx, dy) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.dx = dx;
    this.dy = dy;

    this.draw = function() {
        ctx.fillStyle = "red";
        ctx.strokeStyle = "black"
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeRect(this.x, this.y, this.width, this.height)
    }

    this.update = function() {
        if(score > 5){
            this.dx = (Math.random() - 0.5) * 10;
        }

        if(this.x < 0 || this.x + this.width > innerWidth) {
            this.dx = -this.dx;
        }

        this.x += this.dx;
        this.y += this.dy;

        if(b1x > this.x && b1x < this.x + this.width && b1y > this.y && b1y < this.y + this.height){
            this.y = (Math.random() + 1) * - 350;
            this.x = Math.random() * (innerWidth - 2 * width) + width; 
            b1x = gunX + gunW / 2;
            b1y = gunY;
            score++;
        }

        if(this.y + this.height > innerHeight){
            alert("GAME OVER");
            document.location.reload();
        }

        this.draw();
    }
}

var array = [];

for (var i = 0; i < 9; i++) {
    var width = 100;
    var height = 70;
    var x = Math.random() * (innerWidth - 2 * width) + width;
    var y = (Math.random() + 1) * - 350;
    var dx = 0;
    var dy = (Math.random() + 1) * 2;

    array.push(new Rectangle(x, y, width, height, dx, dy))
}

let gunX = canvas.height;
let gunY = canvas.width / 2;
let gunW = 80;
let gunH = 40;
let gunDx = 13;
let gunDy = 13;

let b1x;
let b1y;
let b1dy = 27;
let b1rad = 10;
let b1yOriginal;

let leftPressed = false;
let rightPressed = false;
let upPressed = false;
let downPressed = false;

let spacePressed = true;

var k = 0;
var j = 0;
var l = 0;

let score = 0;

function drawScore(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Score:" + score, 8, 20);
}

function drawGun() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(gunX, gunY, gunW, gunH);
}

function animate(){
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.drawImage(image, 0, 0, innerWidth, innerHeight);

    ctx.beginPath();
    ctx.moveTo(0, 500);
    ctx.lineTo(canvas.width, 500);
    ctx.stroke();
    ctx.closePath();

    drawGun();
    drawScore();

    if (score > 5){
        gunW = 160;
    }

    if(rightPressed){
        gunX += gunDx;
        if(gunX + gunW > canvas.width){
            gunX = canvas.width - gunW;
        }
    }

    if (leftPressed){
        gunX -= gunDx;
        if(gunX < 0){
            gunX = 0;
        }
    }
    
    if(upPressed){
        gunY -= gunDy;
        if(gunY < 500){
            gunY = 500;
        }
    }

    if(downPressed){
        gunY += gunDy;
        if(gunY + gunH > canvas.height){
            gunY = canvas.height - gunH;
        }
    }

    if(spacePressed){
        if(k === 0){
            b1x = gunX + gunW / 2;
            b1y = gunY;
            b1yOriginal = b1y;
        }

        if(b1y - b1rad > 0){
            ctx.beginPath();
            ctx.arc(b1x, b1y, b1rad, 0, Math.PI * 2, false)
            ctx.fillStyle = "blue";
            ctx.fill();

            b1y -= b1dy;
        } else {
            b1x = gunX + gunW / 2;
            b1y = gunY;
        }
        if (k < 5){
            k++;
        }
    }   
    for (var i = 0; i < array.length; i++) {
        array[i].update();
    } 
}

animate();

document.addEventListener("keydown", keyDownHandler)
document.addEventListener("keyup", keyUpHandler)

function keyDownHandler(event){
    if(event.key === "Right" || event.key === "ArrowRight"){
        rightPressed = true;
    }

    if(event.key === "Up" || event.key === "ArrowUp"){
        upPressed = true;
    }

    if (event.key === "Left" || event.key === "ArrowLeft"){
        leftPressed = true;
    }

    if(event.key === "Down" || event.key === "ArrowDown"){
        downPressed = true;
    }

    if(event.keyCode === 32){
        spacePressed = true;
    }
}

function keyUpHandler(event){
    if(event.key === "Right" || event.key === "ArrowRight"){
        rightPressed = false;
    }

    if(event.key === "Up" || event.key === "ArrowUp"){
        upPressed = false;
    }

    if (event.key === "Left" || event.key === "ArrowLeft"){
        leftPressed = false;
    }

    if(event.key === "Down" || event.key === "ArrowDown"){
        downPressed = false;
    }

    if(event.keyCode === 32){
        spacePressed = false;
    }
}