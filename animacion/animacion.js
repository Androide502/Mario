const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

const mouse = {
    x: undefined,
    y: undefined
};

window.addEventListener("mousemove",(event)=>{

    mouse.x = event.x;
    mouse.y = event.y;

    for(let i = 0; i < 8; i++){

        particles.push(new Particle());
    }
});

class Particle{

    constructor(){

        this.x = mouse.x;
        this.y = mouse.y;

        this.size = Math.random() * 8 + 1;

        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;

        this.color =
        `hsl(${Math.random()*360},100%,50%)`;
    }

    update(){

        this.x += this.speedX;
        this.y += this.speedY;

        this.size -= 0.1;
    }

    draw(){

        ctx.fillStyle = this.color;

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }
}

function animate(){

    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    for(let i = 0; i < particles.length; i++){

        particles[i].update();
        particles[i].draw();

        if(particles[i].size <= 0.2){

            particles.splice(i,1);
            i--;
        }
    }

    requestAnimationFrame(animate);
}

animate();