var captionField = document.getElementById("caption");
var defaultCaption = "Recreation of a scene from the Doctor Strange movie";
var animate = false;
var frameCount = 0;
var asteroidCount = 10;
var colors = {
    spaceDark: [9, 19, 28, 255],
    spaceLightMaroon: [109, 11, 62, 255],
    spaceLightBlue: [0, 58, 89, 255],
    earthSkyTop: [255],
    earthSkyBottom: [255],
    strangeblue: [20, 0, 135, 255],
    spaceblue: [50, 20, 60, 255],
    waterblue: [0, 100, 200, 255],
    white: [255, 255, 255, 255],
    black: [0, 0, 0, 255],
    brown: [139, 69, 19, 255],
    red: [255, 0, 0, 255]
}
var attackArray = [];
var asteroidArray = [];
var impaleLength = 0;
var refFrame = 0;
var attack = "";
var attackOptions = [
    ["fireballs", "Throw fireballs"],
    ["spears", "Throw spears"],
    ["impale", "Impale him"],
    ["end", "Give up"]
];
var entranceAnimation = [];
var animationIndex = 0;
var currentScene = "defaultScene";
var loopCount = 0;
var cvs = null;
var earthImage = null;
var dormammuDefeated = false;
var skyscrapersArray = [];
var starsArray = [];
var mouthOpen = false
var mouthHeight
var mouseOpen = false

setCaption(defaultCaption);

function setCaption(captionText){
    captionField.innerText = captionText;
}

function inRect(posX, posY, centerX, centerY, sizeX, sizeY){
    return (posX > centerX - sizeX/2 && posX < centerX + sizeX/2 &&
        posY > centerY - sizeY/2 && posY < centerY + sizeY/2);
}

function drawEarth(posX, posY, size){
    image(earthImage, posX, posY, size, size);
}

function drawStar(posX, posY, rt){
    push();
        translate(posX, posY);
        rotate(rt);
        scale(0.15);
        noStroke();
        fill(255, 255, 255, 150);
        quad(-30, 0, 0, 10, 30, 0, 0, -10);
        quad(0, -30, 10, 0, 0, 30, -10, 0);
    pop();
}

function drawSkyscraperRow(posX, posY, rowColor){
    push();
        translate(posX, posY);
        noStroke();
        fill(rowColor);
        rectMode(CENTER);
        rect(0, 0, 80, 20, 2);
        fill(204, 235, 144);
        for (x=-30; x<=35; x+=20){
            rect(x, 0, 5, 5);
        }
    pop();
}

function drawSkyscraper(posX, posY, sc){
    push();
        translate(posX, posY);
        scale(sc);
        let skyscraperColor = [43, 39, 48, 255];
        for (y=10; y<250; y+=20){
            drawSkyscraperRow(0, y, skyscraperColor);
        }
    pop();
}

function drawSpeechBubble(posX, posY, sc, speech, sz, bg, fg){
    push();
        translate(posX, posY);
        scale(sc);
        rectMode(CENTER);
        fill(bg);
        rect(0, 0, 150, 80, 30);
        fill(fg);
        textSize(sz);
        textAlign(CENTER, CENTER);
        text(speech, 0, 0, 130, 70);
    pop();
}

function drawOptionsRect(posX, posY, speech, sz, bg, fg){
    push();
        translate(posX, posY);
        rectMode(CENTER);
        fill(bg);
        rect(0, 0, 100, 50, 10);
        fill(fg);
        textSize(sz);
        textAlign(CENTER, CENTER);
        text(speech, 0, 0, 90, 45);
    pop();
}

function drawAsteroid(posX, posY, rt, sc, clr){
    push();
        translate(posX, posY);
        rotate(rt);
        scale(sc);
        noStroke();
        fill(clr);
        circle(0, 0, 80);
        fill(0, 0, 0, 50);
        circle(10, 5, 20);
        circle(-5, 20, 15);
        circle(25, -20, 10);
        circle(-30, 0, 8);
        circle(-10, -20, 15);
    pop();
}

function drawGradient(startX, startY, endX, endY, clr1, clr2){
    push();
        let yRange = endY-startY;
        let gradientFactor = 0;
        noFill();
        strokeWeight(1);
        for (dy=0; dy<yRange; dy++){
            gradientFactor = (dy/yRange);
            stroke(
                clr1[0] + (clr2[0]-clr1[0])*gradientFactor,
                clr1[1] + (clr2[1]-clr1[1])*gradientFactor,
                clr1[2] + (clr2[2]-clr1[2])*gradientFactor
            );
            line(startX, startY+dy, endX, startY+dy);
        }
    pop();
}

function drawSpaceBackground(){
    drawGradient(0, 0, width, height, colors.spaceDark, (dormammuDefeated)? colors.spaceLightBlue: colors.spaceLightMaroon);
    let asteroid = null;
    for (i=0; i<asteroidArray.length; i++){
        asteroid = asteroidArray[i];
        drawAsteroid(asteroid.posX, asteroid.posY, 
            asteroid.rt, asteroid.sc, asteroid.clr
        );
        asteroidArray[i].posX += asteroid.shiftX*Math.random()/2;
        asteroidArray[i].posY += asteroid.shiftY*Math.random()/2;
        if (asteroidArray[i].posX < 0 || asteroidArray[i].posX > width){
            asteroidArray[i].shiftX *= -1;
        }
        if (asteroidArray[i].posY < 0 || asteroidArray[i].posY > height){
            asteroidArray[i].shiftY *= -1;
        }
    } 
}

function drawDormammu(posX, posY, mouthwidth){
    push();
        translate(posX, posY);
        stroke(255);
        beginShape();
            vertex(-80, -80);
            curveVertex(-80, -20);
            vertex(-40, 40);
            vertex(-40, 80);
            vertex(0, 90);
            vertex(40, 80);
            vertex(40, 40);
            curveVertex(80, -20);
            vertex(80, -80);
        endShape(CLOSE);
        push();
            translate(-45, -60);
            noStroke();
            fill(199, 3, 218);
            rotate(PI/6);
            ellipse(0, 0, 30, 15);
            fill(160, 96, 227);
            circle(5, 0, 8);
        pop();
        push();
            translate(45, -60);
            noStroke();
            fill(199, 3, 218);
            rotate(-PI/6);
            ellipse(0, 0, 30, 15);
            fill(160, 96, 227);
            circle(-5, 0, 8);
        pop();
        fill(20, 8, 20);
        ellipse(0, 30, 80, mouthwidth);
    pop();
}

function drawDoctorStrange(posX, posY, sc, rt){
    push();
        translate(posX, posY);
        scale(sc);
        rotate(rt);
        fill(20);
        ellipse(0, 0, 20);
        push();
            translate(-10, 50);
            rotate(PI/10);
            rectMode(CENTER);
            rect(0, 0, 20, 30);
        pop();
        push();
            translate(10, 50);
            rotate(-PI/8);
            rectMode(CENTER);
            rect(0, 0, 20, 30);
        pop();
        push();
            rectMode(CENTER);
            fill(colors.strangeblue);
            rect(0, 0, 40, 80, 7);
        pop();
        push();
            stroke(150, 155, 50);
            strokeWeight(3);
            line(15, -40, 12, -20);
            line(10, -40, 12, -20);
            ellipse(12, -25, 10);
        pop();
        push();
            rectMode(CENTER);
            fill(255, 219, 172);
            rect(0, -55, 30, 30, 4);
            translate(0, -55);
            fill(0);
            ellipse(10, -5, 3, 2);
            line(11, 0, 12, 3);
            line(12, 3, 11, 3);
        pop();
        push();
            fill(255, 0, 0);
            beginShape();
            vertex(-20, -35);
            vertex(-30, 30);
            vertex(-60, 20);
            endShape(CLOSE);
        pop()
    pop()
}

function drawFireball(x, y, scal){
    push();
        translate(x, y);
        scale(scal);
        noStroke();
        fill(230, 150, 10);
        ellipse(0, -1, 6, 7);
        fill(230, 100, 70);
        ellipse(0, 0, 5);
    pop();
}

function drawSpear(posX, posY, sc){
    push();
        translate(posX, posY);
        scale(sc);
        noStroke();
        rotate(PI);
        fill(200);
        rectMode(CENTER);
        rect(0, 0, 20, 10);
        triangle(35, 0, 10, -5, 10, 5);
    pop();
}

function drawImpale(posX){
    push();
        noStroke();
        fill(colors.red);
        rect(posX, 217, 675-posX, 6);
        strokeWeight(1);
        fill(colors.brown);
        stroke(colors.black);
        ellipse(675, 220, 10, 20);
        rect(680, 213, 75, 14);
    pop();
}

function drawStrangeEntranceScene(){
    if (refFrame == 0){
        refFrame = frameCount + 400;
    }
    let earthSize = (refFrame-frameCount)/2;
    let character = entranceAnimation[animationIndex];
    drawSpaceBackground();
    if (animationIndex > 124){
        drawDormammu(700, 100, 20);
        drawAsteroid(100, 450, 1, 5, [255, 255, 255]);
    }
    drawDoctorStrange(character.posX, character.posY, character.scale, character.rotate);
    drawEarth(0, height-earthSize, earthSize);
    if (frameCount >= refFrame){
        animationIndex++;
        if (animationIndex >= entranceAnimation.length-1){
            currentScene = "fightScene";
            frameCount = 0;
            loopCount += 1;
            animationIndex = 0;
            refFrame = 0;
        }
    }
}

function moveDormammu(){
    if (mouthHeight > 30){
        mouseOpen = true
    }
    if (mouthHeight < 10){
        mouseOpen = false
    }
    if (mouseOpen == true){
        mouthHeight -= 1
    }
    else{
        mouthHeight += 1
    }
}

function drawStrangeExitScene(){
    if (refFrame == 0 && animationIndex == 0){
        refFrame = frameCount + 400;
    }
    let earthSize = 200-(refFrame-frameCount)/2;
    let character = entranceAnimation[animationIndex];
    drawGradient(0, 0, width, height, colors.spaceDark, (dormammuDefeated)? colors.spaceLightBlue: colors.spaceLightMaroon);
    let star;
    for (i=0; i<starsArray.length; i++){
        star = starsArray[i];
        drawStar(star[0], star[1], star[2]);
    }
    drawDoctorStrange(character.posX, character.posY, character.scale, character.rotate);
    if (animationIndex > 0){
        animationIndex--;
    }else{
        drawEarth(0, height-earthSize, earthSize);
        if (frameCount > refFrame){
            setCaption("Click anywhere to reset");
            currentScene = "defaultScene";
            frameCount = 0;
            loopCount = 0;
            animationIndex = 0;
            refFrame = 0;
        }
    }
}

function drawDefaultScene(){
    drawGradient(0, 0, width, height, colors.spaceDark, (dormammuDefeated)? colors.spaceLightBlue: colors.spaceLightMaroon);
    for (i=0; i<skyscrapersArray.length; i++){
        let skyscraper = skyscrapersArray[i];
        drawSkyscraper(skyscraper.posX, skyscraper.posY, skyscraper.scale);
    }
    drawDoctorStrange(100, height-30, 0.5, 0);
    if (dormammuDefeated){
        let star;
        for (i=0; i<starsArray.length; i++){
            star = starsArray[i];
            drawStar(star[0], star[1], star[2]);
        }
    }else{
        let speechText = "Looks like its time for strange to save earth";
        drawSpeechBubble(200, 100, 1.75, speechText, 16, colors.white, colors.black);
    }
}

function drawFightScene(){
    drawSpaceBackground();
    drawAsteroid(100, 450, 1, 5, [255, 255, 255]);
    drawDormammu(700, 100, mouthHeight);
    if (attack == ''){
        moveDormammu()
    }
    if (frameCount > 240){
        drawSpeechBubble(550, 150, 1, "You've come to die", 20, colors.white, colors.black);
    }
    drawDoctorStrange(80, 200, 1, 0);
    if (frameCount > 60){
        let textString = "Dormammu, I've come to bargain";
        let speechText = textString;
        drawSpeechBubble(180, 150, 1, speechText, 18, colors.white, colors.black);
    }
    if (attack == "" && frameCount > 300){
        for (i = 0; i<attackOptions.length - (loopCount > 2? 0: 1); i++){
            let clr1 = colors.white;
            let clr2 = colors.black;
            if (inRect(mouseX, mouseY, 550, 220+i*50, 100, 50)){
                clr1 = [74, 201, 255, 225];
            }
            drawOptionsRect(550, 210+i*50, attackOptions[i][1], 16, clr1, clr2);
        }
        setCaption("Choose your next action");;
    }
    if (frameCount > 450){
        switch(attack) {
            case "fireballs":
                let fireball = null;
                i=0;
                if (attackArray.length == 0){
                    for (i=0; i<5; i++){
                        attackArray.push({
                            posX: random(650, 750),
                            posY: 200 + i*10
                        });
                    }
                }
                i=0;
                while (i<attackArray.length){
                    fireball = attackArray[i];
                    drawFireball(fireball.posX, fireball.posY, 1.5);
                    if (fireball.posX < 80){
                        attackArray.splice(i);
                    }else{
                        attackArray[i].posX -= 8;
                        i++;
                    }
                }
                if (attackArray.length == 0){
                    currentScene = "strangeEntranceScene";
                    attack = "";
                    setCaption(defaultCaption);
                    animationIndex = 124;
                    refFrame = -1;
                }
                break;
            case "impale":
                let posX = 300-impaleLength;
                drawImpale(posX);
                if (posX > 70){
                    impaleLength += 30;
                    refFrame = frameCount + 120;
                }else{
                    if (frameCount >= refFrame){
                        impaleLength = 0;
                        currentScene = "strangeEntranceScene";
                        attack = "";
                        setCaption(defaultCaption);
                        animationIndex = 124;
                        refFrame = -1;
                    }
                }
                break;
            case "spears":
                let spear = null;
                i=0;
                if (attackArray.length == 0){
                    for (i=0; i<5; i++){
                        attackArray.push({
                            posX: random(650, 750),
                            posY: 200 + i*10
                        });
                    }
                }
                i=0;
                while (i<attackArray.length){
                    spear = attackArray[i];
                    drawSpear(spear.posX, spear.posY, 1);
                    if (spear.posX < 80){
                        attackArray.splice(i);
                    }else{
                        attackArray[i].posX -= 8;
                        i++;
                    }
                }
                if (attackArray.length == 0){
                    currentScene = "strangeEntranceScene";
                    attack = "";
                    setCaption(defaultCaption);
                    animationIndex = 124;
                    refFrame = -1;
                }
                break;
        }

    }
        
    if (frameCount > 600){
    switch(attack) {
        case "end":
            animationIndex = entranceAnimation.length-1;
            currentScene = "strangeExitScene";
            attack = "";
            loopCount = 0;
            dormammuDefeated = true;
        }    setCaption(defaultCaption);
    }
    
}

function setup(){
    cvs = createCanvas(800, 400);
    cvs.parent("canvasArea");
    mouthHeight = 20
    for (i=0; i<asteroidCount; i++){
        asteroidArray.push({
            posX: random(width),
            posY: random(height),
            rt: random(0, PI*2),
            sc: random(0.8, 1.2),
            clr: [random(255), random(255), random(255)],
            shiftX: random(-1, 1),//*Math.random(),
            shiftY: random(-1, 1)//*Math.random()
        });
    }
    for (x=0; x<width; x+=70){
        for (y=0; y<height/2; y+=50){
            starsArray.push([x+Math.random()*70, y+Math.random()*50, 2*Math.random()*PI]);
        }
    }
    let posX = random(width/2, width/2 + 20);
    while (posX < width+40){
        skyscrapersArray.push({
            posX: posX,
            posY: random(220, 275),
            scale: random(0.8, 1)
        });
        posX += random(60, 60);
    }
    posX = 212;
    let posY = 200;
    for (; posX<width+30; posX += 5){
        entranceAnimation.push({
            posX: posX, 
            posY: posY, 
            scale: 1, 
            rotate:0.14*PI
        });
    }
    posX = -30;
    for (; posX<80; posX+=2){
        entranceAnimation.push({
            posX: posX, 
            posY: posY, 
            scale: 1, 
            rotate:0.14*PI
        });
        posY += 1;    
    }
    for (;posY<200; posY++){
        entranceAnimation.push({
            posX: posX, 
            posY: posY, 
            scale: 1, 
            rotate: 0
        });
    }
    earthImage = loadImage('earthImage3D.png');
}

function draw(){
    switch (currentScene){
        case ("fightScene"):
            drawFightScene();
            break;
        case ("strangeEntranceScene"):
            drawStrangeEntranceScene();
            break;
        case ("strangeExitScene"):
            drawStrangeExitScene();
            break;
        case ("defaultScene"):
            drawDefaultScene();
            break;
    }
    frameCount += 1;
}

function mouseClicked(){
    if (!inRect(mouseX, mouseY, width/2, height/2, width, height)){
        return;
    }
    switch (currentScene){
        case ("fightScene"):
            if (attack == ""){
                for (i = 0; i<attackOptions.length - (loopCount > 2? 0: 1); i++){
                    if (inRect(mouseX, mouseY, 550, 220+i*50, 150, 70, 0.7)){
                        attack = attackOptions[i][0];
                        let tempInt = max(0, 2-loopCount);
                        if (tempInt > 0){
                            setCaption("Repeat " + String(tempInt) + " more time" +
                                ((tempInt == 1? "": "'s")) + " to see a new option");
                        }else{
                            setCaption("Select Give Up next time to end this nightmare");
                        }
                    }
                }
            }
            break;
        case ("strangeEntranceScene"):
            break;
        case ("strangeExitScene"):
            break;
        case ("defaultScene"):
            if (dormammuDefeated){
                dormammuDefeated = false;
                setCaption(defaultCaption);
            }else{
                currentScene = "strangeEntranceScene";
                setCaption(defaultCaption);
                refFrame = 0;
                break;
            }
    }
}
