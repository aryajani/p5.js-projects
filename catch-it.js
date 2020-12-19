function initializeCatchItGame() {
    
    gameData = {
        events: {
            mouseClicked: catchItMouseClickedHandler,
            keyPressed: catchItKeyPressedHandler
        },
        screen: 0,
        y: -20,
        x: 200,
        speed: 2,
        score: 0
    }
    gameInitialized = true;
}

function renderCatchItGame() {
  if(gameData.screen == 0){
    startScreen()
  }else if(gameData.screen == 1){
    gameScreen()
  }else if(gameData.screen == 2){
    endScreen()
  } 
}

function startScreen(){
    resizeCanvas(600, 400)
    background(96, 157, 255)
    fill(255)
    textAlign(CENTER);
    text('Catch the Stars!', width / 2, height / 2)
    text('click to start', width / 2, height / 2 + 20);
    
    initializeCatchItGame();
}

function gameScreen(){
    push();
    background(0)
    fill(0,255,0)
    rect(0,550,1200,height)

    push()
    fill(255)
    text("Score = " + gameData.score, 30,20)
    pop()

    drawStars(gameData.x, gameData.y,color(random(255),random(255),random(255)))
    rectMode(CENTER)
    drawCat(mouseX,height-30)

    gameData.y+= gameData.speed;
    if(gameData.y >height){
        gameData.screen =2
    }
    if(gameData.y>height-10 && gameData.x>mouseX-20 && gameData.x<mouseX+20){
        gameData.y=-20
        gameData.speed+= 0.5
        gameData.score+= 1
    }
    if(gameData.y==-20){
        pickRandom();
    }
    pop();
}

function drawCat(cx, cy){
  
  translate(cx, cy)
  //Cat
  //body
    fill(192,192,192)
    ellipse(0, 10,100,40)

  //limbs
    fill(192,192,192)
    circle(-25, 28, 12)
    circle(30, 28, 12)
    circle(40, 22, 12)

  //head
    fill(192,192,192)
    circle(-45,15,35)

  //ear
    fill(192,192,192)
    triangle(-53,0,-70,-10,-62,10)
    triangle(-36,0,-20,-10,-28,10)

  //tail
    fill(192,192,192)
    arc(48, 10, 30, 30, HALF_PI+PI, HALF_PI, CHORD)

  //eyes
    fill(0,0,0)
    rect(-56,10,5,1)
    rect(-40,10,5,1)

  //mouth
    fill(0,0,0)
    rect(-50,20,10,0.2)
    fill(255,255,255)
    triangle(-40,20,-44,24,-46,20)
}

function drawStars(sx, sy, scol)
{
  push()
    translate(sx, sy)
    fill(scol)
    noStroke()
    circle(0,0,10)

    triangle(-5, 0, 5, 0, 0, 10)
    triangle(-5, 0, 5, 0, 0, -10)
    triangle(0, -5, 0, 5, 10, 0)
    triangle(0, -5, 0, 5, -10, 0)
  pop()
}

function pickRandom(){
    gameData.x = random(20,width-20)
}

function endScreen(){
    background(150)
    textAlign(CENTER);
    text('You Lost!', width / 2, height / 2)
    text("SCORE = " + gameData.score, width / 2, height / 2 + 20)
    text('click to play again', width / 2, height / 2 + 40);
}

function catchItMouseClickedHandler(mouseX, mouseY){
    if(gameData.screen==0) {
        gameData.screen=1
      } else if(gameData.screen==2) {
        gameData.screen=0
      }
}

function catchItKeyPressedHandler(keyCode){
    
}