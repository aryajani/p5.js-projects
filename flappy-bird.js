function bird(y){
    push();
    fill(colors.yellow);
    ellipse(15, y, 30, 30);
    pop();
}

function pipes(x, tall){
    push();
    fill(0,255,0);
    rect(x,0,30,tall)
    push();
        translate(0,height-tall);
        rect(x,0,30,tall);
        pop();
    pop();
}

function flappyBirdMouseClickedHandler(mouseX, mouseY){
    initializeFlappyBirdGame()
}

function flappyBirdKeyPressedHandler(keyCode){
    if (keyCode == 32){
        gameData.vy = -5;
        gameData.move = true;
    }
}

function initializeFlappyBirdGame(){
    gameData = {
        events: {
            mouseClicked: flappyBirdMouseClickedHandler,
            keyPressed: flappyBirdKeyPressedHandler,
        },
        gravity: 0.5,
        y: 400,
        vy: -1,
        heightList: [],
        move: false,
        fly: 0,
        hit: false,
        hitb: false,
        counter: 0
    }
    frameRate(60);
    gameInitialized = true;
}

function renderFlappyBirdGame() {
    background(colors.lightBlue);
    textFont(resources.fonts.hacked);
    if (gameData.move){
      gameData.fly  +=1 
    }
    
    for (var i = 0;i<1000;i++){
        gameData.heightList.push(random((height/2)-60))
    }
     
    for (var j = 0;j<50;j++){
      pipes(90+((80*j)-gameData.fly),gameData.heightList[j])
      gameData.hit = collideRectCircle(90+(80*j-gameData.fly),0, 30, gameData.heightList[j],15, gameData.y, 30);
      
      gameData.hitb = collideRectCircle(90+(80*j-gameData.fly),height-gameData.heightList[j], 30, gameData.heightList[j],15, gameData.y, 30);
  
      if (gameData.hit || gameData.hitb){
          frameRate(0)
          background(255,0,0)
          textSize(36);
          textAlign(CENTER, CENTER);
          text('LOSER', width/2 ,height/2);
          text('CLICK ANYWHERE TO RESTART',width/2, height/2 - 50);
      }
    }  
  
    if ((gameData.fly-75)%80 == 0){
      gameData.counter +=1
    }
      textSize(30)
      text(gameData.counter,20,30)
    
    bird(gameData.y)//gameData.gravity
    gameData.vy += gameData.gravity; 
    gameData.y += gameData.vy;
    gameData.y = constrain(gameData.y, 15, height-15);
    
  }