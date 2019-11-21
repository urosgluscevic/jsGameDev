let canvas = document.querySelector("#canvas")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");


ctx.font = "16px Arial"; //tutorijal
ctx.fillStyle = "black";
ctx.fillText("ORDERS FROM SGT. SCHOOGI", 8, 20);
ctx.fillText("> destroy enemies to complete the simulation", 8, 40)
ctx.fillText("> use arrow keys to move your battleship", 8, 60);
ctx.fillText("> do NOT let them get past you", 8, 80);
ctx.fillText("> you have 3 lives", 8, 100);
ctx.fillText("> to complete the mission, destroy at least 80 enemies", 8 , 120);
ctx.fillText("> their speed will increase over time", 8, 140);
ctx.fillText("> good luck, private", 8, 160);


let image = new Image();  //pozadina
image.src = "space.jpeg";

let image2 = new Image(); //životi
image2.src = "heart.png";

function Rectangle (x, y, width, height, dx, dy) { //protivnički svemirski brodovi
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

        if(score > 20){ //drugi nivo pocinje kada je score 20
            this.x += this.dx;

            if(score < 60){
                this.dy = (Math.random() + 1) * 3; //ubrzavaju se
            }

            if(this.x < 0 || this.x + this.width > innerWidth) { //odbijanje od ivica
                this.dx = -this.dx;
            }
        }

        this.y += this.dy;

        if(b1x > this.x && b1x < this.x + this.width && b1y > this.y && b1y < this.y + this.height){ //detekcija sudara sa prvim metkom
            this.y = (Math.random() + 1) * - 350;
            this.x = Math.random() * (innerWidth - 2 * width) + width; 
            b1x = gunX + gunW / 2;
            b1y = gunY;
            score++;   

            if(score > 80){
                this.dy = this.dy + 0.1; //treci level, svaki put nakon unistenja, protivnici ubrzaju
            }
        }

        if(b0x > this.x && b0x < this.x + this.width && b0y > this.y && b0y < this.y + this.height){ //sudar sa drugim metkom
            this.y = (Math.random() + 1) * - 350;
            this.x = Math.random() * (innerWidth - 2 * width) + width; 
            b0x = gunX;
            b0y = gunY;
            score++;

            if(score > 80){
                this.dy = this.dy + 0.1;
            }
        }

        if(b2x > this.x && b2x < this.x + this.width && b2y > this.y && b2y < this.y + this.height){ //sudar sa trecim metkom
            this.y = (Math.random() + 1) * - 350;
            this.x = Math.random() * (innerWidth - 2 * width) + width; 
            b2x = gunX + gunW;
            b2y = gunY;
            score++;

            if(score > 80){
                this.dy = this.dy + 0.1;
            }
        }

        if(score === 80){
            lives = 3;
        }

        if(this.y + this.height > innerHeight){ //ako protivnik prodje do kraja, gubi se zivot
            lives--;
            this.y = -350;
            if(lives == 0){
                if(score < 80){
                    alert("MESSAGE FROM SGT. SCHOOGI: Mission failed. Try harder next time");
                    document.location.reload();
                } else {
                    alert("MESSAGE FROM SGT. SCHOOGI: Good job private. You have completed the training. You destroyed " + score + " enemies!");
                    document.location.reload();
                }
            }
        }

        this.draw();
    }
}

var array = []; //u niz se stavlja 10 pravougaonika koji predstavljaju protivnike

for (var i = 0; i < 10; i++) { //dodavanje vrijednosti za protivnikove koordinate, velicinu i brzinu
    var width = 100;
    var height = 70;
    var x = Math.random() * (innerWidth - 2 * width) + width;
    var y = (Math.random() + 1) * -500;
    var dx = (Math.random() - 0.5) * 6;
    var dy = (Math.random() + 1) * 2;

    array.push(new Rectangle(x, y, width, height, dx, dy)) //dodavanje pravougsonika u niz
}

let gunX = canvas.height; //igracev svemirski brod
let gunY = canvas.width / 2;
let gunW = 80;
let gunH = 40;
let gunDx = 15;
let gunDy = 15;

let b1x; //prvi metak
let b1y;
let b1dy = 33;
let b1rad = 10;
let b1yOriginal;

let b2x; //drugi metak
let b2y;
let b2dy = 30;
let b2rad = 10;
let b2yOriginal;

let b0x; //treci metak
let b0y;
let b0dy = 30;
let b0rad = 10;
let b0yOriginal;

let leftPressed = false; //kretanje igraca
let rightPressed = false;
let upPressed = false;
let downPressed = false;

var k = 0;

let score = 0;
let lives = 3;

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

    drawGun();
    drawScore();

    if(lives > 0){ //smanjivanje broja zivota
        ctx.drawImage(image2, innerWidth - 50, 20, 45, 45)
    }
    if(lives > 1){
        ctx.drawImage(image2, innerWidth - 100, 20, 45, 45)
    }
    if(lives > 2){
        ctx.drawImage(image2, innerWidth - 150, 20, 45, 45)
    }

    if(score > 20){ //igracu se daje mala prednost u drugom nivou
        gunW = 100;
    }

    if(rightPressed){ //pokretanje igraca kad se pritisnu strelice
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
        if(gunY < 0){
            gunY = 0;
        }
    }

    if(downPressed){
        gunY += gunDy;
        if(gunY + gunH > canvas.height){
            gunY = canvas.height - gunH;
        }
    }

    
    
    if(k === 0){ //brojac k ce samo na pocetku biti jednak 0, da bi metak pri prvom ispaljivanju imao iste koordinate kao spaceship
        b1x = gunX + gunW / 2; //na prvom nivou igrac ima samo 1 metak koji se konstantno ispaljuje
        b1y = gunY;
        b1yOriginal = b1y;
    }

    if(score > 20){ //dodavanje metaka na drugom nivou
        b0x = b1x - gunW / 2;
        b0y = b1y;

        b2x = b1x + gunW / 2;
        b2y = b1y;
    }

    if(b1y - b1rad > 0){
        ctx.beginPath();
        ctx.arc(b1x, b1y, b1rad, 0, Math.PI * 2, false)
        ctx.fillStyle = "blue";
        ctx.fill();

        b1y -= b1dy; //animirnje metaka

        if(score > 20){
            ctx.beginPath();
            ctx.arc(b0x, b0y, b0rad, 0, Math.PI * 2, false)
            ctx.fillStyle = "blue";
            ctx.fill();

            b0y -= b0dy;

            ctx.beginPath();
            ctx.arc(b2x, b2y, b2rad, 0, Math.PI * 2, false)
            ctx.fillStyle = "blue";
            ctx.fill();

            b2y -= b2dy;
        }
    } else { //pucanje radi tako sto se isti krug anmira vise puta. svaki put kada pogodi ivicu canvasa ili protivnika, vrati se na pocetne koordinate
        b1x = gunX + gunW / 2;
        b1y = gunY;

        b0x = b1x - gunW / 2;
        b0y = b1y;

        b2x = b1x + gunW / 2;
        b2y = b1y;
    }
    if (k < 5){
        k++;
    }
      
      

    for (var i = 0; i < array.length; i++) {
        array[i].update(); //crtanje i animiranje protivnika
    } 
}

setTimeout(animate, 6000);

document.addEventListener("keydown", keyDownHandler) //event listeneri za kretanje igraca pomocu strelica
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