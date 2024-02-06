document.addEventListener("DOMContentLoaded", function() {
    let score = 0;
    let cross = true;
    let jumping = false;
    let movingLeft = false;
    let movingRight = false;
    let gameOverFlag = false; // Flag to indicate game over

    const audio = new Audio('Run.mp3');
    const audiogo = new Audio('die.mp3');
    const scoreCont = document.getElementById('scoreCont');

    setTimeout(() => {
        audio.play();
    }, 1000);

    const restartButton = document.getElementById("restartButton");
    const jumpButton = document.getElementById("jumpButton");
    const moveRightButton = document.getElementById("moveRightButton");
    const moveLeftButton = document.getElementById("moveLeftButton");

    restartButton.addEventListener("click", Clicked);
    jumpButton.addEventListener("mousedown", () => { jumping = true; });
    jumpButton.addEventListener("mouseup", () => { jumping = false; });
    moveRightButton.addEventListener("mousedown", () => { movingRight = true; });
    moveRightButton.addEventListener("mouseup", () => { movingRight = false; });
    moveLeftButton.addEventListener("mousedown", () => { movingLeft = true; });
    moveLeftButton.addEventListener("mouseup", () => { movingLeft = false; });

    document.onkeydown = function(e) {
        if (e.keyCode === 38) {
            jumping = true;
        }
        if (e.keyCode === 39) {
            movingRight = true;
        }
        if (e.keyCode === 37) {
            movingLeft = true;
        }
    };

    document.onkeyup = function(e) {
        if (e.keyCode === 38) {
            jumping = false;
        }
        if (e.keyCode === 39) {
            movingRight = false;
        }
        if (e.keyCode === 37) {
            movingLeft = false;
        }
    };

    let obstacleInterval;
    let initialObstacleSpeed = 5; // Initial speed of the obstacle

    setInterval(() => {
        const dino = document.querySelector('.dino');
        const gameOver = document.querySelector('.gameOver');
        const obstacle = document.querySelector('.obstacle');

        if (gameOverFlag) return; // Stop movement if game over

        const dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        const dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

        const ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
        const oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

        const offsetX = Math.abs(dx - ox);
        const offsetY = Math.abs(dy - oy);

        if (offsetX < 73 && offsetY < 52) {
            gameOver.innerHTML = "Game Over - Reload to Play Again";
            obstacle.classList.remove('obstacleAni');
            dino.classList.remove('animateDino');
            audiogo.play();
            audio.pause();
            clearInterval(obstacleInterval); // Clear the interval when game over
            gameOverFlag = true; // Set game over flag
            setTimeout(() => {
                audiogo.pause();
            }, 1000);
        } else if (offsetX < 145 && cross) {
            score += 1;
            updateScore(score);
            cross = false;
            setTimeout(() => {
                cross = true;
            }, 1000);
        }

        if (jumping) {
            jump();
        }
        if (movingRight) {
            moveRight();
        }
        if (movingLeft) {
            moveLeft();
        }
    }, 10);

    // Start the obstacle animation
    obstacleInterval = setInterval(() => {
        const obstacle = document.querySelector('.obstacle');
        obstacle.style.animationDuration = initialObstacleSpeed + 's'; // Set initial obstacle speed
        obstacle.classList.add('obstacleAni');
    }, 5000); // Change the obstacle speed every 5 seconds

    function updateScore(score) {
        scoreCont.innerHTML = "Your Score: " + score;
    }

    function jump() {
        const dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, 700);
    }

    function moveRight() {
        const dino = document.querySelector('.dino');
        const dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        const dinoWidth = parseInt(window.getComputedStyle(dino, null).getPropertyValue('width'));
        const windowWidth = window.innerWidth;
    
        if (dinoX + dinoWidth + 20 <= windowWidth) {
            dino.style.left = (dinoX + 20) + "px"; // Adjust the value according to your preference
        }
    }
    
    function moveLeft() {
        const dino = document.querySelector('.dino');
        const dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    
        if (dinoX - 20 >= 0) {
            dino.style.left = (dinoX - 20) + "px"; // Adjust the value according to your preference
        }
    }
    
    
    
    function moveRight() {
        const dino = document.querySelector('.dino');
        const dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX + 20) + "px"; // Adjust the value according to your preference
    }

    function moveLeft() {
        const dino = document.querySelector('.dino');
        const dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 20) + "px"; // Adjust the value according to your preference
    }

    function Clicked() {
        window.location.reload();
    }
});
