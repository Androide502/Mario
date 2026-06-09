/* ========================= */
/* ELEMENTOS */
/* ========================= */

const mario =
document.getElementById("mario");

const goombas =
document.querySelectorAll(".goomba");

const coins =
document.querySelectorAll(".coin");

const coinSound =
document.getElementById("coinSound");

const gameOverScreen =
document.getElementById("gameOver");

const camera =
document.querySelector(".camera");

/* ========================= */
/* VARIABLES */
/* ========================= */

let position = 120;

let isJumping = false;

let gameEnded = false;

let marioBottom = 95;

let velocity = 0;

let gravity = 1.5;

let keys = {};

/* ========================= */
/* TECLAS */
/* ========================= */

document.addEventListener("keydown",(e)=>{

    keys[e.key] = true;

    if(
        e.key === "ArrowUp" &&
        !isJumping
    ){

        jump();
    }

});

document.addEventListener("keyup",(e)=>{

    keys[e.key] = false;

});

/* ========================= */
/* SALTO */
/* ========================= */

function jump(){

    if(isJumping || gameEnded) return;

    isJumping = true;

    velocity = 22;
}

/* ========================= */
/* UPDATE */
/* ========================= */

function update(){

    if(gameEnded) return;

    /* MOVIMIENTO */

    if(keys["ArrowRight"]){

        position += 7;
    }

    if(keys["ArrowLeft"]){

        position -= 7;
    }

    if(position < 0){

        position = 0;
    }

    /* GRAVEDAD */

    velocity -= gravity;

    marioBottom += velocity;

    if(marioBottom <= 95){

        marioBottom = 95;

        velocity = 0;

        isJumping = false;
    }

    /* ACTUALIZAR */

    mario.style.left =
    position + "px";

    mario.style.bottom =
    marioBottom + "px";

    /* CAMARA */

    camera.scrollLeft =
    position - 300;

    /* FUNCIONES */

    checkGoombas();

    checkCoins();
    
    checkHoles();
    requestAnimationFrame(update);
}

update();

/* ========================= */
/* GOOMBAS */
/* ========================= */

function checkGoombas(){

    goombas.forEach((goomba)=>{

        if(goomba.style.display === "none")
        return;

        const goombaRect =
        goomba.getBoundingClientRect();

        const marioRect =
        mario.getBoundingClientRect();

        const collision = !(

            marioRect.right < goombaRect.left ||

            marioRect.left > goombaRect.right ||

            marioRect.bottom < goombaRect.top ||

            marioRect.top > goombaRect.bottom
        );

        if(collision){

            /* APLASTAR */

            if(
                marioRect.bottom <
                goombaRect.top + 25
            ){

                goomba.style.display =
                "none";

                velocity = 15;
            }

            /* GAME OVER */

            else{

                gameEnded = true;

                mario.style.opacity = "0";

                gameOverScreen.style.display =
                "block";
            }
        }

    });
}

/* ========================= */
/* MONEDAS */
/* ========================= */

function checkCoins(){

    coins.forEach((coin)=>{

        if(
            coin.style.display === "none"
        ) return;

        const coinRect =
        coin.getBoundingClientRect();

        const marioRect =
        mario.getBoundingClientRect();

        const collision = !(

            marioRect.right < coinRect.left ||

            marioRect.left > coinRect.right ||

            marioRect.bottom < coinRect.top ||

            marioRect.top > coinRect.bottom
        );

        if(collision){

            coin.style.display = "none";

            coinSound.pause();

            coinSound.currentTime = 0;

            coinSound.play();
        }

    });
}

/* ========================= */
/* RESTART */
/* ========================= */

function restartGame(){

    location.reload();
}

/* ========================= */
/* HUECOS */
/* ========================= */

function checkHoles(){

    const holes =
    document.querySelectorAll(".hole");

    holes.forEach((hole)=>{

        const holeLeft =
        hole.offsetLeft;

        const holeRight =
        holeLeft + 300;

        if(
            position > holeLeft &&
            position < holeRight &&
            marioBottom <= 95
        ){

            gameEnded = true;

            mario.style.animation =
            "fall 1s forwards";

            setTimeout(()=>{

                gameOverScreen.style.display =
                "block";

            },1000);
        }

    });
}