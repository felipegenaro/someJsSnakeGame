let canvas, ctx;
const selector = selector => document.querySelector(selector);

window.onload = () => {
        canvas = selector("canvas");
        ctx = canvas.getContext("2d");

        document.addEventListener("keydown", keyDownEvent);

        // render X times per second
        let x = 8;
        setInterval(draw, 1000 / x);
};

// game world
let gridSize = (tileSize = 25); // √canvasSize
let nextX = (nextY = 0);

// snake
let defaultTailSize = 3;
let tailSize = defaultTailSize;
let snakeTrail = [];
let snakeX = (snakeY = 10);

// apples
let appleX = (appleY = 15);
let goldenAppleX = (goldenAppleY = 15);

// score
let pts = 0;
let score = 0;

// draw
draw = () => {
        // move snake in next pos
        snakeX += nextX;
        snakeY += nextY;

        // snake over game world?
        if (snakeX < 0) {
                snakeX = gridSize - 1;
        }
        if (snakeX > gridSize - 1) {
                snakeX = 0;
        }

        if (snakeY < 0) {
                snakeY = gridSize - 1;
        }
        if (snakeY > gridSize - 1) {
                snakeY = 0;
        }

        //snake bite apple?
        if (snakeX == appleX && snakeY == appleY) {
                tailSize++;

                appleX = Math.floor(Math.random() * gridSize);
                appleY = Math.floor(Math.random() * gridSize);

                // every 5pts creates an goldenApple
                if (pts === 5) pts = 0;

                pts++;
                score++;
        } else if (snakeX == goldenAppleX && snakeY == goldenAppleY) {
                tailSize++;
                tailSize++;
                tailSize++;

                goldenAppleX = Math.floor(Math.random() * gridSize);
                goldenAppleY = Math.floor(Math.random() * gridSize);

                score += 5;
                pts = 0;
        }

        // set score
        selector("#score").innerHTML = `Score: ${score}`;

        // paint background
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // paint snake
        ctx.fillStyle = "green";
        for (let i = 0; i < snakeTrail.length; i++) {
                ctx.fillRect(
                        snakeTrail[i].x * tileSize,
                        snakeTrail[i].y * tileSize,
                        tileSize,
                        tileSize
                );

                //snake bites it's tail?
                if (snakeTrail[i].x == snakeX && snakeTrail[i].y == snakeY) {
                        tailSize = defaultTailSize;
                        pts = 0;
                        score = 0;
                }
        }

        // apple
        ctx.fillStyle = "red";
        ctx.fillRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize);

        // goldeApple
        if (pts === 5) {
                ctx.fillStyle = "yellow";
                ctx.fillRect(goldenAppleX * tileSize, goldenAppleY * tileSize, tileSize, tileSize);
        }

        // set snake trail
        snakeTrail.push({ x: snakeX, y: snakeY });
        while (snakeTrail.length > tailSize) {
                snakeTrail.shift();
        }
}

// input
keyDownEvent = (e) => {
        switch (e.keyCode) {
                case 37:
                        nextX = -1;
                        nextY = 0;
                break;
                case 38:
                        nextX = 0;
                        nextY = -1;
                break;
                case 39:
                        nextX = 1;
                        nextY = 0;
                break;
                case 40:
                        nextX = 0;
                        nextY = 1;
                break;
        }
}