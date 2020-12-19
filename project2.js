var yC = 500;
var x = 360;
var xCL = 70;
var xCL1 = 250;
var ghastlyPosX = 200;
var ghastlyPosY = 330;
var ghastlyScaleArray = [];
var ghastlyScaleIndex = 0;
var ghastlyPosYDiff = 0;
var ghastlyScaleDiff = 0;
var animationSequence = 1;
var initialized = false;
var whiteColor = [255, 255, 255, 255];
var moonColorLight = [230, 206, 168, 255];
var moonColorDark = [175, 143, 94, 155];
var skyColorNightLight = [117, 123, 121, 255];
var skyColorNightDark = [9, 19, 28, 255];
var skyColorDayLight = [87, 187, 255, 255];
var giraffeColorLight = [219, 197, 169, 255];
var giraffeColorDark = [99, 38, 22, 255];
var dayNightTransition = 0;
var showGhastly;
var cloudBlanket = [];
var stars = [];
var captionField = document.getElementById("caption");
var animate = false;
var frame_count = 0;

function getTransitionBackgroundColor(){
    return [
        skyColorDayLight[0] + (dayNightTransition/100)*(-skyColorDayLight[0]+skyColorNightLight[0]),
        skyColorDayLight[1] + (dayNightTransition/100)*(-skyColorDayLight[1]+skyColorNightLight[1]),
        skyColorDayLight[2] + (dayNightTransition/100)*(-skyColorDayLight[2]+skyColorNightLight[2])
    ]
}

function drawCloud(x, y, size) {
	fill(255, 255, 255);
    noStroke();
	arc(x, y, 25*size, 20*size, 3*PI, 2*PI);
	arc(x+10, y, 25*size, 45*size, 3*PI, 2*PI);
	arc(x+25, y, 25*size, 35*size, 3*PI, 2*PI);
	arc(x+40, y, 30*size, 20*size, 3*PI, 2*PI);
}

function drawStar(posX, posY, rt){
    push();
        translate(posX, posY);
        rotate(rt);
        scale(0.15)
        noStroke();
        fill(255, 255, 255, 150);
        quad(-30, 0, 0, 10, 30, 0, 0, -10);
        quad(0, -30, 10, 0, 0, 30, -10, 0);
    pop();
}

function drawNightBackground(){
    noFill();
    for (let skyPosY=0; skyPosY<=500; skyPosY++) {
        stroke(
            skyColorNightDark[0] + (skyPosY/500)*(skyColorNightLight[0]-skyColorNightDark[0]),
            skyColorNightDark[1] + (skyPosY/500)*(skyColorNightLight[1]-skyColorNightDark[1]),
            skyColorNightDark[2] + (skyPosY/500)*(skyColorNightLight[2]-skyColorNightDark[2]),
        );
        line(0, skyPosY, 400, skyPosY);
    }
    drawStar(20, 20, 0, 0.1, 0.7);
    for (i=0; i<stars.length; i++){
        drawStar(stars[i][0], stars[i][1], stars[i][2]);
    }
}

function drawCloudBlanket(){
    for (i=0; i<cloudBlanket.length; i++){
        cloudVar = cloudBlanket[i];
        drawCloud(cloudVar[0], cloudVar[1], cloudVar[2]);
        if (animate){
            cloudBlanket[i][0] += 2;
            cloudVar = cloudBlanket[i];
            if (cloudVar[0] > 410){
                cloudBlanket[i][0] = -50;
                createStars();
            }
        }
    }
}

function drawMoon(posX, posY, sc){
    push();
        translate(posX, posY);
        scale(sc);
        noStroke();
        fill(moonColorLight);
        circle(0, 0, 80);
        fill(moonColorDark);
        circle(-10, -10, 20);
        circle(-15, 10, 15);
        circle(-30, 0, 10);
        circle(5, -20, 10);
    pop();
}

function drawGiraffe(posX, posY, sc){
    push();
        translate(posX, posY);
        scale(sc);
        // Giraffe Outline
        fill(giraffeColorLight);
        beginShape();
            vertex(0, -140);
            vertex(-5, -20);
            vertex(0, 0);
            vertex(75, 0);
            vertex(30, -50);
            vertex(25 ,-150);
            vertex(35, -170);
            vertex(28, -175);
            vertex(22, -182);
            vertex(-20, -205);
            vertex(-25, -200);
            vertex(5, -155);
        endShape(CLOSE);

        // Giraffe Spots
        fill(giraffeColorDark);
        quad(3, -137, 23, -147, 21, -140, 15, -132);
        quad(2, -134, 15, -130, 15, -125, 2, -118);
        quad(17, -130, 23, -140, 23, -122, 18, -119);
        quad(2, -116, 15, -122, 17, -115, 2, -108);
        triangle(24, -118, 24, -108, 19, -114);
        quad(2, -105, 17, -112, 25, -105);
        quad(2, -102, 25, -102, 22, -89, 8, -87);
        quad(1, -97, 10, -81, 10, -72, 0, -68);
        triangle(13, -84, 24, -86, 25, -60);
        quad(0, -64, 15, -70, 25, -55, 7, -53);
        quad(0, -61, 6, -51, -2, -23);
        triangle(1, -22, 8, -49, 25, -52);
        triangle(5, -25, 26, -47, 31, -43);
        quad(2, -20, 26, -22, 43, -30, 33, -41);
        quad(-1, -17, 2, -4, 17, -3, 25, -19);
        quad(22, -3, 47, -4, 42, -27, 31, -22);
        triangle(45, -29, 51, -4, 68, -3);

        // Giraffe Eye
        fill(0, 0, 0);
        circle(15, -175, 7);

        // Giraffe Ear
        ellipse(38, -170, 13, 7);
        fill(50, 50, 50);
        ellipse(38, -170, 12, 6);

        // Girrafe Mouth
        noStroke();
        fill(152, 102, 66);
        quad(-19, -193, -24, -200, -20, -205, 20, -182);
    pop();
}

function drawOverlay(posX, posY, rt, sc){
    push();
        translate(posX, posY);
        scale(sc);
        rotate(rt);
        
        // Burger Bun
        fill(254, 134, 0);
        rect(-40, 25, 80, 15, 0, 0, 10, 10);

        // Cheese
        fill(253, 203, 6);
        beginShape();
            curveVertex(-40, 20);
            curveVertex(-43, 27);
            curveVertex(-15, 28);
            curveVertex(10, 33);
            curveVertex(15, 25);
            curveVertex(42, 25);
            curveVertex(40, 22);
        endShape(CLOSE);

        // Tomato
        fill(253, 54, 4);
        rect(-37, 0, 75, 9, 9);

        // Patty
        fill(125, 25, 2);
        beginShape();
            curveVertex(-40, 7);
            curveVertex(-45, 20);
            curveVertex(-12, 24);
            curveVertex(0, 22);
            curveVertex(38, 23);
            curveVertex(39, 6);
        endShape(CLOSE);

        // Lettuce
        fill(161, 212, 21);
        beginShape();
            vertex(-39, -4);
            vertex(-36, -3)
            vertex(-40, -1);
            vertex(-37, 1);
            vertex(-12, 3);
            vertex(-8, 0);
            vertex(12, 3);
            vertex(14, -1);
            vertex(39, 1);
            vertex(39, -4);
        endShape();

        // Burger Bun
        fill(254, 134, 0);
        ellipse(0, -7, 83, 12);
        arc(0, -7, 83, 39, PI, 0);
    pop();
}

function createStars(){
    stars = [];
    for (x=0; x<400; x+=70){
        for (y=0; y<400; y+=50){
            stars.push([x+Math.random()*70, y+Math.random()*50, 2*Math.random()*PI]);
        }
    }
}

function createClouds(){
    cloudBlanket = [];
    for (y=475; y<=500; y+=25){
        for (x=0; x<=400; x+=75){
            cloudBlanket.push([x, y, 3+Math.random()]);
        }
    }
}

function cloud(x,y){
    fill(220);
    translate(x, y)
    noStroke();
    ellipse(10, 40,50,60,50);
    ellipse(40,70,60,50);
    ellipse(50,40,70,50);
    ellipse(60,60,70,50);
    ellipse(10,65,70,50);
}

function ghastly(xPos, yPos, sc){
    push();
        translate(xPos, yPos)
        scale(sc)
        fill(25, 3, 36)
        ellipse (0,0,250)
        fill(255,204,204)
        arc(-60, -40, 140, 140, QUARTER_PI, PI + QUARTER_PI, CHORD)
        arc(60, -40, 140, 140, -QUARTER_PI, 3*QUARTER_PI, CHORD)
        fill(0)
        ellipse(30, 5, 2, 15)
        ellipse(-30, 5, 2, 15)
        fill(100, 0, 0)
        arc(0,-50, 300, 270, PI/3, 2*PI/3, CHORD)
        fill(200, 200, 200)
        triangle(-30, 70, -50, 70, -40, 100)
        triangle(30, 70, 50, 70, 40, 100)
    pop();
}

function drawCar(){
    push();
        //strokeWeight(2);
        //tires
        fill(30)
        rect(200-170,450+7, 100, 20, 5)
        rect(200+70,450+7, 100, 20, 5)

        //car
        //main boghastlyPosYDiff
        fill(10, 200, 60);
        beginShape()
            vertex(200+175,330+15)
            vertex(200+135,287+25)
            vertex(200+135/2, 291+25)
            vertex(200-135/2, 291+25)
            vertex(200-135,287+25)
            vertex(200-175,330+15)
            vertex(200-170,450+7)
            vertex(200+170, 450+7)
        endShape(CLOSE)
        
        //front splitter(benghastlyPosYDiff thing on the front)
        beginShape()
            vertex(200-170, 447)
            vertex(200-170, 457)
            vertex(200-153, 467)
            vertex(200-80, 468)
            vertex(200-35, 437)
            vertex(200-39, 437)
            vertex(200-80, 460)
            vertex(200-148, 456)
            vertex(200-155, 440)
        endShape(CLOSE)

        beginShape()
            vertex(200+170, 447)
            vertex(200+170, 457)
            vertex(200+153, 467)
            vertex(200+80, 468)
            vertex(200+35, 437)
            vertex(200+39, 437)
            vertex(200+80, 460)
            vertex(200+148, 456)
            vertex(200+155, 440)
        endShape(CLOSE)

        line(200-173, 335+15, 200-90, 360+15)
        line(200-90, 360+15, 200-20, 365+15)
        line(200-20, 365+15, 200-10, 361+15)
        line(200+173, 335+15, 200+90, 360+15)
        line(200+90, 360+15, 200+20, 365+15)
        line(200+20, 365+15, 200+10, 361+15)
        line(200+10, 361+15, 200-10, 361+15)

        line(200-171, 380+15, 200-141, 395+15)
        line(200-141, 395+15, 200-80, 403+15)
        line(200+171, 380+15, 200+141, 395+15)
        line(200+141, 395+15, 200+80, 403+15)
        line(200-80, 403+15, 200+80, 403+15)

        //air-intake
        fill(50)
        beginShape()
            vertex(200-80, 406+19)
            vertex(200-141, 398+17)
            vertex(200-155, 440)
            vertex(200-148, 456)
            vertex(200-80, 460)
            vertex(200-39, 437)
            vertex(200-35, 437)
            vertex(200+35, 437)
            vertex(200+39, 437)
            vertex(200+80, 460)
            vertex(200+148, 456)
            vertex(200+155, 440)
            vertex(200+141, 398+17)
            vertex(200+80, 406+19)
        endShape(CLOSE)

        line(200-135,287+25, 200-90, 360+15)
        line(200+135,287+25, 200+90, 360+15)
        line(200+135/2, 291+32, 200+85, 360+3)
        line(200-135/2, 291+32, 200-85, 360+3)

        //roof
        fill(10, 200, 60)
        beginShape()
            vertex(200+135,287+25)
            vertex(200+100, 287-20)
            vertex(200-100, 287-20)
            vertex(200-135,287+25)
            vertex(200-135/2, 291+25)
            vertex(200+135/2, 291+25)
        endShape(CLOSE)


        fill(200)
        beginShape()
            vertex(200+130,287+25)
            vertex(200+100, 287-13)
            vertex(200-100, 287-13)
            vertex(200-130,287+25)
            vertex(200-135/2, 291+25)
            vertex(200+135/2, 291+25)
        endShape(CLOSE)
        
        //headlights
        beginShape()
            vertex(200+100, 360+13)
            vertex(200+120, 360+25)
            vertex(200+155, 360+15)
            vertex(200+165, 360-6)
        endShape(CLOSE)
        push();
            stroke(240)
            strokeWeight(5)
            line(200+160, 360-4, 200+150, 360+17);
            line(200+150, 360+17, 200+135, 200+166);
            line(200+135, 200+166, 200+125, 360+23);
            line(200+125, 360+23, 200+107, 360+12);
        pop()

        beginShape()
            vertex(200-100, 360+13)
            vertex(200-120, 360+25)
            vertex(200-155, 360+15)
            vertex(200-165, 360-6)
        endShape(CLOSE)
        push();
            stroke(240)
            strokeWeight(5)
            line(200-160, 360-4, 200-150, 360+17);
            line(200-150, 360+17, 200-135, 200+166);
            line(200-135, 200+166, 200-125, 360+23);
            line(200-125, 360+23, 200-107, 360+12 )
        pop()

        //design element
        fill(100)
        beginShape()  
            vertex(200-35, 437)
            vertex(200-66, 458)
            vertex(200+66, 458)
            vertex(200+35, 437)
        endShape(CLOSE)

        //emblem
        triangle(200+7, 360+25, 200-7, 360+25, 200, 360+35)
    pop();
}

function drawDayBackground(){
    push();
        x = 360;
        background(255);

        stroke(0)
        strokeWeight(2)

        //ground
        fill(153, 55, 20)
        rect(0, x, 400, 500-x)

        //sky
        fill(getTransitionBackgroundColor());// 87, 187, 255)
        rect(0, 0, 400, x)

        //road
        fill(140);
        beginShape();
            vertex(0, 500);
            vertex(400, 500);
            vertex(400, 430);
            vertex(250, 290);
            vertex(150, 290);
            vertex(0, 430);
        endShape(CLOSE);
        push();
            stroke(250, 200, 0);
            strokeWeight(9);
            line(0, 450, 40, 410)
            line(400, 450, 360, 410)
        pop();
    pop();
}

function popupFlash(){
    push();
        fill(200, 200, 10);
        translate(200, 250);
        scale(1.5);
        beginShape();
            vertex(50, -150);
            vertex(-70, -20);
            vertex(-25, -20);
            vertex(-70, 100);
            vertex(55, -50);
            vertex(0, -50);
        endShape(CLOSE);
    pop();
}

function setup()
{
    let cvs = createCanvas(400, 500);
    cvs.parent("canvasArea"); 
    for (i=0.1; i<1; i+=0.1){
        ghastlyScaleArray.push(i);
    }
    for (i=0; i<30; i++){
        ghastlyScaleArray.push(1);
    }
    for (i=1; i>0.1; i-=0.1){
        ghastlyScaleArray.push(i);
    }
    
}

function draw()
{
    if (animationSequence == 1){
        captionField.innerText = "Click on the car emblem for a suprise!";
        drawDayBackground();
        push()
            stroke(0)
            strokeWeight(2)
            drawCar();
        pop()
        push();
            noStroke();
            fill(220);
            rect(185, yC, 30, 40);
            if (yC > 460){
                yC -= 2;
            }
            if (yC == 460){
                yC = 500;
            }
        pop();

        push();
            cloud(xCL, 20, 1);
            if (xCL1<450){
                xCL1++;
            }
            if (xCL1 == 430){
                xCL1 = -100;
            }
        pop();

        push()
            cloud(xCL1, 60, 1.2);
            if (xCL<450){
                xCL += 0.5;
            }
            if (xCL == 430){
                xCL = -90;
            }
        pop();
        
        if (animate){
            if (dayNightTransition < 100){
                dayNightTransition += 1;
            }
            ghastlyScaleIndex += 1;
            if (ghastlyScaleIndex >= ghastlyScaleArray.length){
                ghastlyScaleIndex = 0;
                ghastlyPosY -= 150;
                ghastlyPosX = random(width);
            }
            let ghastlyScale = ghastlyScaleArray[ghastlyScaleIndex]*0.8;
            ghastly(ghastlyPosX, ghastlyPosY, ghastlyScale);
            
            if (ghastlyPosY < -125 && dayNightTransition == 100){
                animationSequence = 2;
                initialized = false;
                animate = false;
                showGhastly = false;
                captionField.innerText = "Click on the moon for a suprise!";
            }
        }else{
            if (dayNightTransition > 0){
                dayNightTransition -= 1;
            }
        }
    }else if(animationSequence == 2){
        if (!initialized){
            createClouds();
            createStars();
            initialized = true;
        }
        drawNightBackground(); 
        if (animate){
            drawOverlay(160, 120, PI/5, 1.08);
        }else{
            drawMoon(150, 125, 1.2);
        }
        
        drawGiraffe(200, 450, 1.5);
        if (showGhastly){
            ghastlyScaleIndex += 1;
            if (ghastlyScaleIndex >= ghastlyScaleArray.length){
                ghastlyScaleIndex = 0;
                ghastlyPosY -= 100;
                ghastlyPosX = random(width);
            }
            let ghastlyScale = ghastlyScaleArray[ghastlyScaleIndex]*0.5;
            ghastly(ghastlyPosX, ghastlyPosY, ghastlyScale);
            if (frame_count%10 < 2){
                popupFlash();
            }
            if (ghastlyPosY < -125){
                animationSequence = 1;
                initialized = false;
                animate = false;
                ghastlyPosY = 330;
            }
        }
        drawCloudBlanket();
    }
    frame_count += 1;
}

function mouseClicked()
{
    if (animationSequence == 1){ 
        var d = dist(200, 390, mouseX, mouseY)
        if( d < 5)
        {
            ghastlyScaleDiff = 0.1;
            animate = true;
        }
    }else if (animationSequence == 2){
        if (((mouseX-150)**2 + (mouseY-125)**2)**0.5 <= 48){
            if (animate){
                showGhastly = true;
                ghastlyPosY = 330;
            }else{
                animate = true;
            }
            if (animate){
                captionField.innerText = "Click on the burger for a suprise!";
            }else{
                captionField.innerText = "Click on the moon for a suprise!";
            }
            createStars();
        }  
    }
}
