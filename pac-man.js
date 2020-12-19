function moveCharacter(characterObject, randomizeNext){
    let tempPosX = null;
    let tempPosY = null;
    let drn = (randomizeNext)? random([[-1, 0], [1, 0], [0, 1], [0, -1]]): [0, 0];
    if (randomizeNext && characterObject.shiftX == 0 && characterObject.shiftY == 0){
        characterObject.nextShiftX = drn[0];
        characterObject.nextShiftY = drn[1];
    }
    if (characterObject.nextShiftX != 0 || characterObject.nextShiftY != 0){
        tempPosX = characterObject.posX + characterObject.nextShiftX*5;
        tempPosY = characterObject.posY + characterObject.nextShiftY*5;
        if (posIsValid(tempPosX, tempPosY, characterObject.sizeX, characterObject.sizeY)){
            characterObject.shiftX = characterObject.nextShiftX;
            characterObject.shiftY = characterObject.nextShiftY;
            characterObject.nextShiftX = drn[0];
            characterObject.nextShiftY = drn[1];
        }
    }
    tempPosX = characterObject.posX + characterObject.shiftX;
    tempPosY = characterObject.posY + characterObject.shiftY;
    if (posIsValid(tempPosX, tempPosY, characterObject.sizeX, characterObject.sizeY)){
        characterObject.posX += characterObject.shiftX;
        characterObject.posY += characterObject.shiftY;
    }else{
        characterObject.shiftX = 0;
        characterObject.shiftY = 0;
    }
}

function posIsValid(posX, posY, sizeX, sizeY){
    if (posX > 200 && posX < 400 && posY > 240 && posY < 320){
        return false;
    }
    for (let i=posX-(sizeX/2)+1; i<=posX+(sizeX/2); i+=4.8){
        for (let j=posY-(sizeY/2)+1; j<=posY+(sizeY/2); j+=4.8){
            let clr = get(i, j);
            if (isEqual(clr, colors.blue) || isEqual(clr, [13, 13, 13])){
                return false;
            }
        }
    }
    return true;
}

function isEqual(arr1, arr2){
    for (let i=0; i<min(arr1.length, arr2.length); i++){
        if (arr1[i] != arr2[i]){
            return false;
        }
    }
    return true;
}

function drawPacMan(posX, posY){
    push();
        translate(posX, posY);
        noStroke();
        fill(colors.yellow);
        circle(0, 0, 30);
        fill(colors.black);
        arc(0, 0, 32, 32, -PI/6, PI/6);
        circle(5, -8, 5)
    pop();
}

function drawGhost(posX, posY, clr){
    if (!clr){
        clr = [200, 200, 200, 255];
    }
    push();
        translate(posX, posY);
        noStroke();
        fill(clr);
        circle(0, -5, 20);
        beginShape();
            vertex(-10, -5);
            vertex(-10, 15);
            vertex(-7, 10);
            vertex(-3, 15);
            vertex(0, 10);
            vertex(3, 15);
            vertex(7, 10);
            vertex(10, 15);
            vertex(10, -5);
        endShape(CLOSE);
        fill(colors.white);
        circle(4, -5, 6);
        circle(-3, -5, 6);
        fill(colors.black);
        circle(5, -5, 3);
        circle(-2, -5, 3);
    pop();
}

function drawPacManMenu(){
    push();
        stroke(colors.white);
        fill(colors.black);
        strokeWeight(4);
        rect(603, 2, 196, 596);
    pop();
}

function drawPacManMap(gameMap, gamePoints, gamePellets){
    push();
        stroke(colors.white);
        fill(colors.black);
        strokeWeight(4);
        rect(603, 2, 196, 596);
        fill([13, 13, 13]);
        strokeWeight(1.5);
        rect(220, 260, 160, 40);
        stroke(colors.blue);
        for (let i=0; i<gameMap.length; i++){
            let block = gameMap[i];
            beginShape();
                for (j=0; j<block.length; j++){
                    vertex(block[j][0], block[j][1]);
                }
            endShape(CLOSE);
        }
        noStroke();
        fill(colors.purple);
        for (let i=0; i<gamePoints.length;){
            let point = gamePoints[i];
            if (inRect(point[0], point[1], 
                gameData.pacman.posX-gameData.pacman.sizeX/2, 
                gameData.pacman.posY-gameData.pacman.sizeY/2, 
                gameData.pacman.sizeX-2, gameData.pacman.sizeY-2)){
                gamePoints.splice(i, 1);
                gameData.score++;
                continue;
            }
            rect(point[0]-2, point[1]-2, 4, 4);
            i++;
        }
        for (let i=0; i<gamePellets.length;){
            let pellet = gamePellets[i];
            if (inRect(pellet[0], pellet[1], 
                gameData.pacman.posX-gameData.pacman.sizeX/2, 
                gameData.pacman.posY-gameData.pacman.sizeY/2, 
                gameData.pacman.sizeX-2, gameData.pacman.sizeY-2)){
                gamePellets.splice(i, 1);
                gameData.pelletEndFrame = frameCount + 60*10
                continue;
            }
            circle(pellet[0], pellet[1], 10);
            i++;
        }
    pop();
}

function pacManMouseClickedHandler(mouseX, mouseY){
    if (gameStarted && gameIsRunning){
        // Game is going on
    }else if (gameStarted){
        // Game Over
        if (inRect(mouseX, mouseY, 610, 540, 180, 50)){
            initializePacManGame();
        }
    }else{
        // Menu Screen
        if (inRect(mouseX, mouseY, 610, 540, 180, 50)){
            gameStarted = true;
            frameCount = 0;
        }
    }
}

function pacManKeyPressedHandler(keyCode){
    if (gameStarted && gameIsRunning){
        // Game is going on
        switch (keyCode){
            case UP_ARROW:
                gameData.pacman.nextShiftX = 0;
                gameData.pacman.nextShiftY = -1;
                break;
            case DOWN_ARROW:
                gameData.pacman.nextShiftX = 0;
                gameData.pacman.nextShiftY = 1;
                break;
            case LEFT_ARROW:
                gameData.pacman.nextShiftX = -1;
                gameData.pacman.nextShiftY = 0;
                break;
            case RIGHT_ARROW:
                gameData.pacman.nextShiftX = 1;
                gameData.pacman.nextShiftY = 0;
                break;
        }
    }else if (gameStarted){
        // Game Over
    }else{
        // Menu Screen
    }
}

function initializePacManGame(){
    gameData = {
        events: {
            mouseClicked: pacManMouseClickedHandler,
            keyPressed: pacManKeyPressedHandler,
        },
        pacman: {
            posX: 40,
            posY: 40,
            shiftX: 0,
            shiftY: 0,
            nextShiftX: 0,
            nextShiftY: 0,
            sizeX: 40,
            sizeY: 40
        },
        ghosts: [],
        ghostCount: 4,
        ghostColors: [colors.red, colors.lightBlue, colors.green, colors.orange],
        map: resources.PacMan.map.slice(),
        points: resources.PacMan.points.slice(),
        pellets: resources.PacMan.pellets.slice(),
        pelletEndFrame: -1,
        livesRemaining: 3,
        score: 0
    }
    for (i=0; i<gameData.ghostCount; i++){
        gameData.ghosts.push({
            posX: 240+i*40,
            posY: 280,
            shiftX: 0,
            shiftY: 0,
            sizeX: 40,
            sizeY: 40,
            nextShiftX: 0,
            nextShiftY: 0,
            startFrame: (i+1)*3*60
        });
    }
    gameIsRunning = true;
    gameStarted = false;
    gameInitialized = true;
}

function renderPacManGame(posX, posY){
    let ghosts = gameData.ghosts;
    let pacman = gameData.pacman
    push();
        translate(posX, posY);
        background(colors.black);
        drawPacManMap(gameData.map, gameData.points, gameData.pellets); 
        drawPacMan(pacman.posX, pacman.posY);
        if (pacman.posY > 290 && pacman.posY < 310){
            if (pacman.posX < pacman.sizeX/2){
                drawPacMan(600+pacman.posX, pacman.posY);
                if (pacman.posX < -pacman.sizeX/2){
                    pacman.posX = 580;
                }
            }
            if (pacman.posX > 600-pacman.sizeX/2){
                drawPacMan(pacman.posX-600, pacman.posY);
                if (pacman.posX > 600+pacman.sizeX/2){
                    pacman.posX = 20;
                }
            }
        }
        for (i=0; i<gameData.ghostCount; i++){
            drawGhost(ghosts[i].posX, ghosts[i].posY, gameData.ghostColors[((gameData.pelletEndFrame > frameCount)? false: i)])
        }
        drawPacManMenu();
        fill(colors.white);
        noStroke();
        textFont('Comic Sans MS');
        textSize(36);
        textAlign(CENTER, CENTER);
        text('PAC-MAN', 610, 10, 190, 50)
        // Game Menu
        if (gameStarted && gameIsRunning){
            // Game is going on
            moveCharacter(pacman, false);
            for (i=0; i<gameData.ghostCount; i++){
                let ghost = ghosts[i];
                if (getDistance(ghost.posX, ghost.posY, pacman.posX, pacman.posY) <= 40){
                    if (gameData.pelletEndFrame > frameCount){
                        ghost.posX = 240+i*40;
                        ghost.posY = 280;
                        ghost.startFrame = frameCount + 60*3;
                        gameData.score += 20;
                    }else{
                        gameData.livesRemaining--;
                        if (gameData.livesRemaining == 0){
                            gameIsRunning = false;
                        }
                        pacman.posX = 40;
                        pacman.posY = 40;
                    }
                }
                if (frameCount > ghost.startFrame){
                    moveCharacter(ghost, true);
                }
                if (frameCount == ghost.startFrame){
                    ghost.posY -= ghost.sizeY;
                }
            }
            textAlign(LEFT, CENTER);
            text('Score: '+str(gameData.score), 610, 264, 190, 50);
            noStroke();
            fill(colors.red);
            for (let i=0; i<gameData.livesRemaining; i++){
                let x = 630 + i*30;
                let y = 560;
                let size = 20;
                beginShape();
                    vertex(x, y);
                    bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
                    bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
                endShape(CLOSE);
            }
        }else if (gameStarted){
            // Game Over
            fill(255, 14, 16, 255);
            textSize(88);
            text('GAME OVER', 0, 0, 600, 600);
            textSize(28);
            fill(255, 66, 41, 255);
            rect(610, 540, 180, 50, 10);
            fill(colors.white);
            text('NEW GAME', 610, 543, 180, 50);
            textAlign(LEFT, CENTER);
            text('Score: '+str(gameData.score), 610, 264, 190, 50);
        }else{
            // Menu Screen
            fill(255, 66, 41, 255);
            rect(610, 540, 180, 50, 10);
            fill(colors.white);
            textAlign(LEFT, CENTER);
            text('PLAY', 630, 543, 140, 50);
            triangle(730, 550, 730, 580, 755, 565);
        }
    pop();
}