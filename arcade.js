var frameCount = 0;
var currentGame = '';
var gameIsRunning = false;
var gameStarted = false;
var gameInitialized = false;
var titleField = document.getElementById('titleField');
var footerField = document.getElementById('footerField');
var hiddenArea = document.getElementById('hiddenArea');
var resourceFile = 'resources.json';
var canvasSize = {
    width: 800,
    height: 600
}
var gameData = {};
var gamesList = {
    Snake:{
        initialize: initializeSnakeGame,
        render: renderSnakeGame,
        iconFile: 'graphics/icon-snake.png'
    },
    Pong:{
        initialize: initializePongGame,
        render: renderPongGame,
        iconFile: 'graphics/icon-pong.png'
    },
    PacMan:{
        initialize: initializePacManGame,
        render: renderPacManGame,
        iconFile: 'graphics/icon-pacman.png'
    },
    Dino:{
        initialize: initializeDinoGame,
        render: renderDinoGame,
        iconFile: 'graphics/icon-dino.png'
    },
    FlappyBird:{
        initialize: initializeFlappyBirdGame,
        render: renderFlappyBirdGame,
        iconFile: 'graphics/icon-flappybird.png'
    },
    CatchIt:{
        initialize: initializeCatchItGame,
        render: renderCatchItGame,
        iconFile: 'graphics/icon-catchit.jpeg'
    }
};
var iconGrid = {
    width: 3,
    height: 2,
    iconOrder: ['Snake', 'PacMan', 'Pong', 'Dino', 'FlappyBird', 'CatchIt'],
    icon: {},
    iconSize: 150
};
var colors = {
    white: [255, 255, 255, 255],
    black: [0, 0, 0, 255],
    red: [255, 0, 0, 255],
    green: [0, 255, 0, 255],
    blue: [0, 0, 255, 255],
    yellow: [255, 255, 0, 255],
    orange: [255, 69, 0, 255],
    lightBlue: [0, 255, 255, 255],
    purple: [136, 111, 235, 255],
    brown: [89, 59, 19, 255],
    spaceDark: [9, 19, 28, 255],
    spaceLightMaroon: [109, 11, 62, 255]
};
var graphics = {};
var SPACE = 32;
var resources = null;

function getDistance(x1, y1, x2, y2){
    return ((x2-x1)**2 + (y2-y1)**2)**0.5;
}

function inRect(posX, posY, x, y, w, h){
    return (posX >= x && posX <= x+w && posY >= y && posY <= y+h);
}

async function delayRun(timeout, action){
    setTimeout(() => action(), timeout);
}

function getRectCenter(posX, posY, w, h){
    return [posX + w/2, posY + h/2];
}

function alignToPoint(w, h, point, alignment){
    let alignedRect = [];
    switch (alignment){
        case "top-left":
            alignedRect = [point[0]-w/2, point[1]-h/2, w, h];
            break;
        case "top-right":
            alignedRect = [point[0]+w/2, point[1]-h/2, w, h];
            break
        case "bottom-left":
            alignedRect = [point[0]-w/2, point[1]+h/2, w, h];
            break;
        case "bottom-right":
            alignedRect = [point[0]+w/2, point[1]+h/2, w, h];
            break;
        default:
            alignedRect = rect.copy();
    }
    return alignedRect;
}

function resetToMenu(){
    currentGame = '';
    gameIsRunning = false;
    gameIsStarted = false;
    gameInitialized = false;
    titleField.innerText = "ARCADE";
    resizeCanvas(canvasSize.width, canvasSize.height);
    footerField.innerHTML = '<a href="javascript:void(0);" onclick="toggleHiddenText();">Created by CPE 123-03 Group 5</a>';
}

function startGame(selectedGame){
    gameIsRunning = false;
    gameStarted = false;
    gameInitialized = false;
    currentGame = selectedGame;
    titleField.innerText = selectedGame.toUpperCase();
    if (hiddenArea.style.display === "block") {
        hiddenArea.style.display = "none";
    }
    footerField.innerHTML = '<a href="javascript:void(0);" onclick="resetToMenu();">Return to Arcade</a>';
}

function toggleHiddenText(){
    if (hiddenArea.style.display === "none") {
        hiddenArea.style.display = "block";
    } else {
        hiddenArea.style.display = "none";
    }
}

/* -----MENU SCREEN----- */
function menuScreenMouseClickedHandler(mouseX, mouseY){
    for (i=0; i<iconGrid.height; i++){
        let iconRow = iconGrid.iconOrder.slice(i*iconGrid.width, (i+1)*iconGrid.width);
        let maxIconWidth = width/iconRow.length;
        let maxIconHeight = height/iconGrid.height;
        let iconSize = min(maxIconWidth, maxIconHeight, iconGrid.iconSize);
        for (j=0; j<iconRow.length; j++){
            let iconCenter = getRectCenter(j*(width/iconRow.length), i*(height/iconGrid.height), maxIconWidth, maxIconHeight);
            if (inRect(mouseX, mouseY, iconCenter[0]-iconSize/2, iconCenter[1]-iconSize/2, iconSize, iconSize)){
                return startGame(iconRow[j]);;
            }
        }
    }
}

function menuScreenKeyPressedHandler(keyCode){

}

function renderMenuScreen(posX, posY){
    push();
        translate(posX, posY);
        fill(colors.black);
        strokeWeight(2);
        stroke(colors.white);
        rect(0, 0, width, height, 30);
        imageMode(CENTER);
        for (i=0; i<iconGrid.height; i++){
            let iconRow = iconGrid.iconOrder.slice(i*iconGrid.width, (i+1)*iconGrid.width);
            let maxIconWidth = width/iconRow.length;
            let maxIconHeight = height/iconGrid.height;
            let iconSize = min(maxIconWidth, maxIconHeight, iconGrid.iconSize);
            for (j=0; j<iconRow.length; j++){
                let iconCenter = getRectCenter(j*(width/iconRow.length), i*(height/iconGrid.height), maxIconWidth, maxIconHeight);
                let icon = iconGrid.icon[iconRow[j]];
                image(icon, iconCenter[0], iconCenter[1], iconSize, iconSize);
            }
        }
    pop();
}
/* -----MENU SCREEN----- */

function keyPressed(){
    if (currentGame){
        gameData.events.keyPressed(keyCode);
    }else{
        menuScreenKeyPressedHandler(keyCode);
    }
}

function mousePressed(){
    if (currentGame){
        gameData.events.mouseClicked(mouseX, mouseY);
    }else{
        menuScreenMouseClickedHandler(mouseX, mouseY);
    }
}

function preload(){
    for (i=0; i<iconGrid.iconOrder.length; i++){
        let gameName = iconGrid.iconOrder[i]
        let iconPath = gamesList[gameName].iconFile;
        iconGrid.icon[gameName] = loadImage(iconPath);
    }
    resources = loadJSON(resourceFile);
    resources['fonts'] = {
        'hacked': loadFont('HACKED.ttf')
    }
}

function setup(){
    let cvs = createCanvas(canvasSize.width, canvasSize.height);
    cvs.parent('canvasArea');
}

function draw(){
    push();
        if (currentGame){
            if (gameInitialized){
                gamesList[currentGame].render(0, 0);
            }else{
                gamesList[currentGame].initialize();
            }
        }else{
            renderMenuScreen(0, 0);
        }
    pop();
}
