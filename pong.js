function setPaddleDirection(ind, shiftY){
    if (ind === 1){
        gameData.paddle1.shiftY = shiftY;
    }else if (ind === 2){
        gameData.paddle2.shiftY = shiftY;
    }
}

function getPaddleCollisonValue(ballPosY, paddlePosY){
    if (ballPosY <= paddlePosY-gameData.paddleSizeY/2 ||
        ballPosY >= paddlePosY+gameData.paddleSizeY/2){
    }else{
        for (var i=1; i<=5; i++){
            if (ballPosY <= (i/5)*gameData.paddleSizeY + (paddlePosY-gameData.paddleSizeY/2)){
                return -3+i;
            }
        }
    }
    return null;
}

async function autoPlayPong(ind){
    let paddle = ['paddle1', 'paddle2'][ind-1];
    let interval = Math.random()*1000;
    delayRun(interval, ()=>{
        if (gameIsRunning){
            if (gameData.ball.posY <= gameData[paddle].posY){
                gameData[paddle].shiftY = -1;
            }else{
                gameData[paddle].shiftY = 1;
            } 
            autoPlayPong(ind);
        }
    });
}

function controlBall(){
    let ball = gameData.ball;
    let value;
    if (ball.shiftX < 0){
        if (gameData.paddle1.posX+gameData.paddleSizeX/2>=ball.posX-ball.diameter/2){
            value = getPaddleCollisonValue(ball.posY, gameData.paddle1.posY);
            if (value === null){
                addScoreAndReset(2);
            }else{
                gameData.ball.shiftY += value;
                gameData.ball.shiftX *= -1;
            }
        }
    }else{
        if (gameData.paddle2.posX-gameData.paddleSizeX/2<=ball.posX+ball.diameter/2){
            value = getPaddleCollisonValue(ball.posY, gameData.paddle2.posY);
            if (value === null){
                addScoreAndReset(1);
            }else{
                gameData.ball.shiftY += value;
                gameData.ball.shiftX *= -1;
            }
        }
    }
    gameData.ball.posX += gameData.ball.shiftX;
    gameData.ball.posY += gameData.ball.shiftY;
    if (gameData.ball.posY <= 104 + ball.diameter/2 ||
        gameData.ball.posY >= 596 - ball.diameter/2){
        gameData.ball.shiftY *= -1;
    }
}

function controlPaddles(){
    let paddle = null;
    for (var i=0; i<2; i++){
        paddle = ['paddle1', 'paddle2'][i];
        gameData[paddle].posY += gameData[paddle].shiftY*gameData.paddleShiftVal;
        if (gameData[paddle].posY >= 586 - gameData.paddleSizeY/2){
            gameData[paddle].posY = 586 - gameData.paddleSizeY/2;
            gameData[paddle].shiftY = 0;
        }else if (gameData[paddle].posY <= 114 + gameData.paddleSizeY/2){
            gameData[paddle].posY = 114 + gameData.paddleSizeY/2;
            gameData[paddle].shiftY = 0;
        }
    }
}

function addScoreAndReset(ind){
    let score1 = gameData.paddle1.score + ((ind===1)? 1: 0);
    let score2 = gameData.paddle2.score + ((ind===2)? 1: 0);
    let singlePlayer = gameData.singlePlayer;
    initializePongGame();
    gameStarted = true;
    gameData.paddle1.score = score1;
    gameData.paddle2.score = score2;
    gameData.singlePlayer = singlePlayer;
    if (score1===3 || score2===3){
        endPongGame('Player Won');
    }
}

function pongMouseClickedHandler(mouseX, mouseY){
    if (gameStarted && gameIsRunning){
        // Game is going on
    }else if (gameStarted){
        // Game Over
        if (inRect(mouseX, mouseY, 310, 515, 180, 50)){
            initializePongGame();
        }
    }else{
        // Menu Screen
        if (inRect(mouseX, mouseY, 110, 300, 180, 100)){
            gameData.singlePlayer = true;
            delayRun(3000, ()=> {autoPlayPong(1);});
            gameStarted = true;
        }else if (inRect(mouseX, mouseY, 510, 300, 180, 100)){
            gameData.singlePlayer = false;
            gameStarted = true;
        }
    }
}

function pongKeyPressedHandler(keyCode){
    if (gameStarted && gameIsRunning){
        // Game is going on
        if(!gameData.singlePlayer && keyCode === 87){
            setPaddleDirection(1, -1);
        }else if(!gameData.singlePlayer && keyCode === 83){
            setPaddleDirection(1, 1);
        }else if (keyCode === UP_ARROW){
            setPaddleDirection(2, -1);
        }else if (keyCode === DOWN_ARROW){
            setPaddleDirection(2, 1);
        }
    }else if (gameStarted){
        // Game Over
    }else{
        // Menu Screen
    }
}

function initializePongGame(){
    gameData = {
        events: {
            mouseClicked: pongMouseClickedHandler,
            keyPressed: pongKeyPressedHandler,
        },
        paddle1: {
            posX: 20,
            posY: 350,
            shiftY: 0,
            score: 0
        },
        paddle2: {
            posX: 780,
            posY: 350,
            shiftY: 0,
            score: 0
        },
        ball: {
            posX: 400,
            posY: 350,
            shiftX: 0,
            shiftY: 0,
            diameter: 16
        },
        singlePlayer: true,
        paddleSizeX: 10,
        paddleSizeY: 120,
        paddleShiftVal: 4
    }
    gameIsRunning = true;
    gameStarted = false;
    delayRun(3000, ()=> {
        gameData.ball.shiftX = 3*(Math.pow(-1, gameData.paddle1.score + gameData.paddle2.score));
    });
    gameInitialized = true;
}

function renderPongGame(posX, posY){
    let paddle1 = gameData.paddle1;
    let paddle2 = gameData.paddle2;
    let ball = gameData.ball;
    push();
        background(colors.black);
        translate(posX, posY);
        noFill();
        stroke(colors.white);
        strokeWeight(4);
        rect(2, 2, 796, 96);
        rect(2, 102, 796, 496);

        noStroke();
        rectMode(CENTER);
        fill(colors.red);
        rect(paddle1.posX, paddle1.posY, gameData.paddleSizeX, gameData.paddleSizeY);
        fill(colors.blue);
        rect(paddle2.posX, paddle2.posY, gameData.paddleSizeX, gameData.paddleSizeY);

        fill(colors.white);
        circle(ball.posX, ball.posY, ball.diameter);
        let p1 = '';
        let p2 = '';
        let score1 = gameData.paddle1.score;
        let score2 = gameData.paddle2.score
        if (gameData.singlePlayer){
            p1 = 'Computer: ' + str(score1);
            p2 = 'Player 1: ' + str(score2);
        }else{
            p1 = 'Player 1: ' + str(score1);
            p2 = 'Player 2: ' + str(score2);
        }
        // Game Menu
        textFont('Comic Sans MS');
        textSize(48);
        textAlign(CENTER, CENTER);
        text('PONG', 400, 50, 780, 80);
        textSize(24);
        textAlign(LEFT, BOTTOM);
        text(p1, 100, 50, 180, 80);
        textAlign(RIGHT, BOTTOM);
        text(p2, 700, 50, 180, 80);
        if (gameStarted && gameIsRunning){
            // Game is going on
            controlPaddles();
            controlBall();
        }else if (gameStarted){
            // Game Over
            noStroke();
            fill(0, 0, 0, 100);
            rect(400, 350, 800, 500);
            let clr = colors.green;
            let txt = null;
            if (gameData.singlePlayer){
                clr = (score1 < score2)? colors.green: colors.red;
                txt = (score1 < score2)? 'YOU WON :))': 'YOU LOST :(('; 
            }else{
                txt = ((score1 < score2)? 'Player 2': 'Player 1') + ' WON :))';
            }
            textAlign(CENTER, CENTER);
            textSize(76);
            fill(clr);
            text(txt, 400, 350, 800, 500);
            textSize(28);
            fill(255, 66, 41, 255);
            rect(400, 540, 180, 50, 10);
            fill(colors.white);
            text('NEW GAME', 400, 540);
        }else{
            // Menu Screen
            fill(0, 0, 0, 100);
            rect(400, 350, 800, 500);
            fill(colors.blue);
            rect(200, 350, 180, 100, 10);
            fill(colors.red);
            rect(600, 350, 180, 100, 10);
            textAlign(CENTER, CENTER);
            textSize(36);
            fill(colors.white);
            text("1 Player", 200, 350);
            text("2 Players", 600, 350);
        }
    pop();
}

function endPongGame(result){
    gameIsRunning = false;
}
