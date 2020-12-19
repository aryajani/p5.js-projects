function checkBitCollision(bit, snake){
    for (var i=0; i<snake.length; i++){
        let snakePiece = snake[i];
        if (getDistance(snakePiece.posX, snakePiece.posY, bit.posX, bit.posY) <= (bit.size+snakePiece.size)/2){
            return true;
        }
    }
    return false;
}

function updateBit(){
    snake = gameData.snake;
    let newBit = {
        posX: gameData.bit.size*1.5 + Math.random()*(600-gameData.bit.size*3),
        posY: gameData.bit.size*1.5 + Math.random()*(600-gameData.bit.size*3)
    }
    gameData.bit.posX = newBit.posX;
    gameData.bit.posY = newBit.posY;
}

function updateSnake(){
    let snakeRef = snake[snake.length-1];
    gameData.snake.push({
        posX: snakeRef.posX - snakeRef.shiftX*(gameData.snakeSize-1),
        posY: snakeRef.posY - snakeRef.shiftY*(gameData.snakeSize-1),
        shiftX: snakeRef.shiftX,
        shiftY: snakeRef.shiftY,
    });
}

function turnSnake(shiftX, shiftY){
    gameData.snake[0].shiftX = shiftX;
    gameData.snake[0].shiftY = shiftY;
    if (gameData.snake.length > 1){
        gameData.snakeTurns.push({
            posX: gameData.snake[0].posX,
            posY: gameData.snake[0].posY,
            shiftX: gameData.snake[0].shiftX,
            shiftY: gameData.snake[0].shiftY
        });
    }
}

function snakeMouseClickedHandler(mouseX, mouseY){
    if (gameStarted && gameIsRunning){

    }else if (gameStarted) {
        if (inRect(mouseX, mouseY, 610, 540, 180, 50)){
            initializeSnakeGame();
        }
    } else {
        if (inRect(mouseX, mouseY, 610, 540, 180, 50)){
            gameStarted = true;
        }
    }
}

function snakeKeyPressedHandler(keyCode){
    if (gameStarted && gameIsRunning){
        if (keyCode === UP_ARROW){
            turnSnake(0, -1);
        }else if (keyCode === DOWN_ARROW){
            turnSnake(0, 1);
        }else if (keyCode === LEFT_ARROW){
            turnSnake(-1, 0);
        }else if (keyCode === RIGHT_ARROW){
            turnSnake(1, 0);
        }else if (keyCode === SPACE){
            endSnakeGame('FORCE');
        }
    }else if (gameStarted) {
        
    } else {
        if (keyCode === SPACE){
            gameStarted = true;
        }
    }
}

function initializeSnakeGame(){
    gameData = {
        bit: {
            size: 8,
            color: [43, 110, 255, 255]
        },
        events: {
            mouseClicked: snakeMouseClickedHandler,
            keyPressed: snakeKeyPressedHandler,
        },
        snake: [
            {
                posX: 300,
                posY: 300,
                shiftX: 0,
                shiftY: 0,
            }
        ],
        snakeTurns: [],
        snakeSize: 20,
        snakeColor:[255, 186, 31, 255]
    }
    updateBit();
    gameInitialized = true;
    gameIsRunning = true;
    gameStarted = false;
}

function renderSnakeGame(posX, posY){
    let snake = gameData.snake;
    let bit = gameData.bit;
    push();
        background(colors.black);
        translate(posX, posY);
        noFill();
        
        stroke(colors.white);
        strokeWeight(4);
        
        rect(602, 2, 196, 596);
        square(2, 2, 596);

        noStroke();
        fill(bit.color);
        square(bit.posX-bit.size/2, bit.posY-bit.size/2, bit.size);

        fill(gameData.snakeColor);
        for (var i=0; i<snake.length; i++){
            circle(snake[i].posX, snake[i].posY, gameData.snakeSize);
            if (gameIsRunning){
                gameData.snake[i].posX += gameData.snake[i].shiftX;
                gameData.snake[i].posY += gameData.snake[i].shiftY;
                if (i === 0){
                    let distance = getDistance(snake[i].posX, snake[i].posY, bit.posX, bit.posY);
                    if (distance <= (bit.size+gameData.snakeSize)/2){
                        updateBit();
                        updateSnake();
                    }else if (snake[i].posX <= 4 + gameData.snakeSize/2 || 
                        snake[i].posX >= 596 - gameData.snakeSize/2 ||
                        snake[i].posY <= 4 + gameData.snakeSize/2 || 
                        snake[i].posY >= 596 - gameData.snakeSize/2){
                        endSnakeGame('Wall Collision');
                    }
                }else{
                    if ((i === 1 && snake[i].shiftX + snake[0].shiftX === 0 &&
                        snake[i].shiftY + snake[0].shiftY === 0) || (i > 1 &&
                        getDistance(snake[i].posX, snake[i].posY, 
                        snake[0].posX, snake[0].posY) < gameData.snakeSize-4)){
                        endSnakeGame('Snake Collision');
                    }
                    for (var j=0; j<gameData.snakeTurns.length; j++){
                        if (gameData.snake[i].posX === gameData.snakeTurns[j].posX &&
                            gameData.snake[i].posY === gameData.snakeTurns[j].posY){
                            gameData.snake[i].shiftX = gameData.snakeTurns[j].shiftX;
                            gameData.snake[i].shiftY = gameData.snakeTurns[j].shiftY;
                            if (i===snake.length-1){
                                gameData.snakeTurns.shift();
                            }
                            break;
                        }
                    }
                }
            }
        }

        // Game Menu
        fill(colors.white);
        noStroke();
        textFont('Comic Sans MS');
        textSize(36);
        textAlign(CENTER, CENTER);
        text('SNAKE', 610, 10, 190, 50)
        if (gameStarted && gameIsRunning){
            textAlign(LEFT, CENTER);
            text('Score: '+str(snake.length-1), 610, 264, 190, 50);
        }else if (gameStarted){
            fill(255, 14, 16, 255);
            textSize(88);
            text('GAME OVER', 0, 0, 600, 600);
            textSize(28);
            fill(255, 66, 41, 255);
            rect(610, 540, 180, 50, 10);
            fill(colors.white);
            text('NEW GAME', 610, 543, 180, 50);
            textAlign(LEFT, CENTER);
            text('Score: '+str(snake.length-1), 610, 264, 190, 50);
        }else{
            fill(255, 66, 41, 255);
            rect(610, 540, 180, 50, 10);
            fill(colors.white);
            textAlign(LEFT, CENTER);
            text('PLAY', 630, 543, 140, 50);
            triangle(730, 550, 730, 580, 755, 565);
        }
    pop();
}

function endSnakeGame(result){
    gameIsRunning = false;
}
