// Declare Constants
var orangeColor = [223, 127, 66, 255];
var whiteColor = [255, 255, 255, 255];
var brownColor = [123, 104, 71, 255];
var greenColor = [115, 142, 74, 255];
var woodColor = [218, 178, 76, 200];
var skinColor = [246, 147, 141, 255];
var blueColor = [124, 189, 227, 255];
var PI = Math.PI;
var lightFallAnimationArray = [];
var animationFrameCount = 0;
var animationStarted = false;
var animationSequence = 1;
var animationSubsequenceFrameCount = 0;
var offsetImage1 = 200;
var rotFactor = 0;
var backgroundColor = [255, 255, 255, 255];
var sunHeight = 260;
var boyDist = 360;

// Declaring function to draw a nail
function drawNail(pos_x, pos_y, sc, rt){
    push();
        translate(pos_x, pos_y);
        scale(sc);
        rotate(rt);
	stroke(blueColor);
        fill(blueColor);
        ellipse(0, 0, 2, 5);
        triangle(0, -1, 0, 1, 6, 0);
    pop();
}

// Declaring function to draw the creation
function drawCreation(posX, posY, sc, rtX){
    push();
        translate(posX, posY);
	if (rtX){
		rotate(rtX);
	}
        scale(sc);
        stroke(woodColor);
        fill(woodColor);
        rectMode(CENTER);
        rect(0, -100, 8, 120);
        rect(0, -20, 40, 40);
        triangle(-40, -20, -20, -20, -20, 0);
        strokeWeight(4);
        line(20, 0, 40, 20);
        line(20, -38, 40, -18);
        line(-18, 0, 0,20);
        line(-18, -38, 0, -18);
        stroke(whiteColor);
        strokeWeight(3);
        line(-18, -38, 0, -18);
        stroke(blueColor);
        fill(blueColor);
        ellipse(0, -100, 20, 60);
        quad(-20, -165, -10, -195, 10, -195, 20, -165);
        quad(0, -130, 20, -120, 20, -80, 0, -70);
        fill(whiteColor);
        ellipse(0, -195, 20, 5);
        ellipse(20, -100, 10, 40);
        stroke(greenColor);
        fill(greenColor);
        rect(0, -100, 6, 55);  
        stroke(orangeColor);
        fill(orangeColor);
        beginShape();
            vertex(-10, 10)
            vertex(-10, -30);
            vertex(30, -30);
            vertex(35, -25);
            vertex(-5, -25);
            vertex(-5, 15)
        endShape(CLOSE);
    pop();
}

// Declaring a function to draw the girl
function drawGirl(posX, posY, sc){
    push();
        translate(posX, posY);
        scale(sc);
        strokeWeight(2);
        stroke(skinColor);
        fill(skinColor);
        quad(-10, 0, -3, 14, 10, 10, 0, 0);
        strokeWeight(9);
        line(2, 2, 8, 13);
        strokeWeight(5);
        line(-5, 30, -20, 35);
        line(-20, 35, -25, 50)
        ellipse(27, 77, 2, 5);
        stroke(brownColor);
        strokeWeight(7);
        fill(brownColor);
        arc(0, -3, 15, 15, 0.9*PI, -0.1*PI, CHORD);
        noStroke();
        quad(0, 0, 14, -4 ,11, 10, 7, 11);
        fill(blueColor);
        triangle(-2, 20, 18, 20, 8, 40);
        beginShape();
            vertex(8, 52)
            vertex(8, 42);
            vertex(22, 22);
            vertex(26, 60);
            vertex(24, 65);
            vertex(26, 70);
            vertex(28, 80);
            vertex(24, 85);
            vertex(-10, 85);
            vertex(-10, 68)
        endShape(CLOSE);
        ellipse(-10, 77, 8, 17);
        fill(whiteColor);
        arc(8, 20, 15, 15, 0, PI);
        stroke(skinColor);
        strokeWeight(5);
        line(13, 30, -7, 55)
    pop();
}

function drawText(textString, textBox, sizeOfText, colorOfText){
    push();
	fill(colorOfText);
        textSize(sizeOfText);
        textAlign(CENTER, CENTER);
        text(textString, textBox[0], textBox[1], textBox[2], textBox[3]);
    pop();
}

function drawScenery(){
    push();
        //sun
        fill(255, 77, 0)
        noStroke()
        ellipse(200, sunHeight, 100)

        //trees
        fill(110, 58, 33)
        rect(190, 100, 20, 160, 2)
        rect(305, 100, 20, 160, 2)
        rect(70, 100, 20, 160, 3)

        noFill()
        stroke(110, 58, 33)
        strokeWeight(9)
        bezier(195, 110, 188, 95, 195, 85, 165, 65)
        bezier(165, 65, 156, 55 , 160, 50 , 155, 45)
        bezier(180, 75, 190, 70, 175, 55, 190, 45)
        bezier(200, 110, 215, 45, 222, 77, 238, 45)
        bezier(200, 106, 200+0.17*65, 110-0.33*65, 225, 112, 200+0.38*65, 45)
        bezier(3/4*400+10, 110, 3/4*400, 70, 3/4*400+20, 60,  3/4*400-5, 45)
        strokeWeight(12)
        bezier(3/4*400+15, 110, 3/4*400+25, 80, 3/4*400+20, 60, 3/4*400+45, 55)
        strokeWeight(12)
        bezier(1/4*400-20, 110, 1/4*400-40, 95, 1/4*400-35, 65, 1/4*400-60, 65)
        bezier(1/4*400-17, 110, 1/4*400-5, 80, 1/4*400+5, 100, 1/4*400+10, 65)
        strokeWeight(7)
        bezier(3/4*400+45, 55, 3/4*400+35, 50, 3/4*400+35, 50, 3/4*400+30, 40)
        bezier(3/4*400+45, 55, 3/4*400+55, 50, 3/4*400+55, 50, 3/4*400+65, 40)
        bezier(1/4*400-60, 65, 1/4*400-60, 63, 1/4*400-60, 65, 1/4*400-55, 45)
        bezier(1/4*400-40, 75, 1/4*400-65, 75, 1/4*400-65, 75, 1/4*400-80, 70)
        bezier()
    pop();
}

function drawBoy(posX, posY, scaleDF){
    push()
        translate(posX, posY)
        scale(scaleDF);
        noStroke();
        fill(255, 180, 19)
        triangle(10, -21, 13, 4, 25, 4)
        fill(134, 81, 163)
        quad(-10, -20, 10, -20, 18, 20, -18, 20)
        fill(79, 161, 227)
        quad(-17, 20, -5, 20, -7, 34, -20, 32)
        quad(17, 20, 5, 20, 7, 34, 20, 32)
        fill(skinColor);// 247, 99, 139)
        ellipse(0, -33, 25, 25)
        fill(93, 7, 92)
        quad(-10, -46, 9, -23, 14, -30, 10, -46)
        fill(255, 180, 19)
        ellipse(0, -21, 23, 10)
        fill(110, 58, 33)
        rect(-12, -12, 25, 20)
        fill(134, 81, 163)
        rect(-3, -12, 6, 20)
        fill(247, 99, 139)
        rect(-3, 3, 7, 5, 5)
        stroke(0)
        strokeWeight(3)
        line(-7, 34, -20, 32)
        line(7, 34, 20, 32)
    pop()
}

// Setting up the Canvas
function setup(){
    createCanvas(800, 400);
  
    for (i=1; i<=100; i++){
	    lightFallAnimationArray.push(-(i/100)*(PI/2));
    }	
}

// Adding items to the canvas
function draw(){
    background(backgroundColor);
    noStroke();
    rect(offsetImage1, 0, 400, 400);
    drawText("CREATORS", [200+offsetImage1, 350], 54, blueColor);
    drawCreation(250+offsetImage1, 260, 1.0, rotFactor);
    drawGirl(300+offsetImage1, 170, 1.0);
    drawNail(250+offsetImage1, 270, 1.0, 1.0);
    drawNail(250+offsetImage1, 280, 1.0, 0.0);
    drawNail(200+offsetImage1, 275, 1.0, 1.0);
    drawNail(215+offsetImage1, 285, 1.0, 0.0);
    drawNail(170+offsetImage1, 280, 1.0, 1.2);
    if (animationStarted){
        if (animationSequence === 1){
            if (offsetImage1 < 400){
                offsetImage1 += 2;
            }else if (animationSubsequenceFrameCount < lightFallAnimationArray.length){
                rotFactor = lightFallAnimationArray[animationSubsequenceFrameCount];
                animationSubsequenceFrameCount += 1;
            }else{
                animationSequence = 2;
                backgroundColor = [255, 255, 255, 255];
            }
        }else if (animationSequence === 2){
            drawScenery();
            drawBoy(boyDist, 320, 1);
            if (sunHeight > 60){
                sunHeight--;
            }
            if (boyDist > 80){
                boyDist -= 1;
            }
        }
        animationFrameCount += 1;
    }
}

// Start animation sequence
function mousePressed(){
	animationStarted = true;
}
