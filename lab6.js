// Name: Arya Jani
//
// CPE-123-03
// Assignment: Lab 6
// Instructor: Kirsten Mork


var loc, dir;
var neckR, wingR, legR, beakR;
var darkmode = false
var captionT = defaultCaption
var captionField = document.getElementById("caption");
var defaultCaption = 'Click anywhere to move the duck'
var grass = [78, 155, 16]
var sky = [12, 245, 216]
var xCL = 70
var xCL1 = 250
var cloudCol = [220]
var duckMain = [245, 226, 12, 255]
var duckSide = [227, 208, 66]
var colors = 
{
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
    red: [150, 0, 0, 255],
    grass: [78, 155, 16, 255]
}
var beakDown = false
var neckDown = true;
var wingDown = false;
var animate = false;

// normal set up
function setup() 
{
   createCanvas(400, 400);

   loc = createVector(width*.9, height*.45);
   dir = createVector(-1, 0);
   neckR = 0;
   wingR = -PI/10;
   legR = PI/6
   beakR = 0
}

// normal draw
function draw() 
{
   background(sky);

   //foreground
   fill(grass);
   rect(0, height/2, width, height/2);
   drawDuck();
   drawDoctorStrange(300, 350, 2/3, 0, colors.strangeblue)
   drawDoctorStrange(250, 350, 2/3, 0, colors.spaceLightMaroon)
   setCaption(captionT)
   push()
      cloud(xCL1, 20, 1*2/3)
      if (xCL1<690)
       xCL1 = xCL1+1
      if (xCL1 == 670)
       xCL1= -100
   pop()
   push()
      cloud(xCL, 60, 1.2*2/3)
      if (xCL<690)
       xCL = xCL+0.5
      if (xCL == 670)
       xCL= -90
   pop()
   if (animate) 
   {
      captionT = 'Press D for dark mode'
      drawSpeechBubble(350, 280, 1/2, 'Woah big bird!', 23, colors.white, colors.black)
      moveDuck();
      if (darkmode)
      {
        captionT = 'Press L for default mode'
      }
      else
      {
        captionT = 'Press D for dark mode'
      }
   }
   else
   {
    captionT = defaultCaption
   }
}

// method to control starting the duck over again and 
// control animation on and off

function mousePressed() 
{
   loc = createVector(width*.9, height*.45);
   animate = !animate;
}

function keyTyped()
{
   if (key === 'd')
   {
      grass = colors.brown
      sky = colors.spaceLightBlue
      cloudCol = [100]
      duckMain = colors.red
      duckSide = colors.spaceDark
      darkmode = true
   }
   if (key === 'l')
   {
      grass = [78, 155, 16]
      sky = [12, 245, 216]
      cloudCol = [220]
      duckMain = [245, 226, 12, 255]
      duckSide = [227, 208, 66]
      darkmode = false
   }
}

function setCaption(captionText){
    captionField.innerText = captionText;
}

// code to draw the duck with animation parameters 
// neckR and wingR - other transforms align the pieces 
// to the correct pivot points Be very careful modifying 
// this code - the structure of the push and pops are 
// what builds the hierarchical relationships
function drawDuck() 
{
   push()   
      noStroke();

      push();
         //move the entire duck
         translate(loc.x, loc.y);
         scale(2); //scale the entire duck
         //drawlegs
               push()
                  push()
                     translate(6, 10)
                     legs(0, 0, -legR, 0.5)
                  pop()
                  push()
                     translate(-6, 10)
                     legs(0, 0, legR, 0.5)
                  pop()
         // draw body
         
         fill(duckMain);
         ellipse(0, 0, 40, 30); 


         //draw neck and head with possible animation transforms
         push();
            translate(-16, 0); //move into pivot position
            rotate(neckR);  //rotate by neckR parameter
            ellipse(0, -10, 10, 18); //neck
            ellipse(0, -17, 14, 14); //head
            fill(0);
            ellipse(0, -19, 4, 4);  //eye
            fill(155, 111, 16);
            push();
            translate(-6,-18);
            push();
               rotate(-beakR);
               triangle(-6, 0, 0, -3, 0, 0); //beak
            pop();
            push();
               rotate(beakR);
               triangle(-6, 0, 0, 0, 0, 3);
            pop();
         pop(); //beak
         pop();

         //draw wing with possible animation transforms
         fill(duckSide);
         push();
            translate(-8, -5); //move into pivot position
            rotate(wingR); //animtion parameter to control wing flap
            ellipse(14, 0, 34, 20); //wing
         pop();

         



         //TODO - this is where you will add the code to animation the legs - follow
         //the examples for the wings and neck 
    

      pop();
      stroke(0)
      point(loc.x, loc.y)
   pop()
}

// function to update all animation parameters - very 
// simple scripted animation
function moveDuck() 
{
   // update the ducks global location
   loc.add(dir);

   // find out how much the neck is rotated to decide which way to rotate
   // these constrain how much the neck moves up and down
   if (neckR < -PI/3) 
   {
      neckDown = false;
   } 
   if (neckR > PI/10) 
   {
      neckDown = true;
   }

   // depending on which way we need to rotate, do so
   if (neckDown) 
   {
      neckR -= PI/30;
   } 
   else 
   {
      neckR += PI/100;
   }

   // find out how much the wing is rotated to decide which way to rotate
   // these constrain how much the wing moves up and down
   if (wingR < -2*PI/5) 
   {
      wingDown = true;
   } 
   if (wingR > -PI/20) 
   {
      wingDown = false;
   }

   // depending on which way we need to rotate, do so
   if (wingDown == false) 
   {
      wingR -= PI/10;
   } 
   else 
   {
      wingR += PI/10;
   }

   if (legR < -PI/11) 
   {
      legForward = true;
   } 
   if (legR > PI/7) 
   {
      legForward = false;
   }

   // depending on which way we need to rotate, do so
   if (legForward == false) 
   {
      legR -= PI/100;
   } 
   else 
   {
      legR += PI/100;
   }

   if (beakR < -PI/8) 
   {
      beakDown = true;
   } 
   
   if (beakR > PI/32) 
   {
      beakDown = false;
   }

 
   if (beakDown == false) 
   {
      beakR -= PI/200;
   } 
   else 
   {
      beakR += PI/200;
   }


}

function legs(x, y, rot, sc)
{
   push()
      translate(x, y)
      stroke(0)
      scale(sc)
      rotate(rot)
      line(0, 0, 0, 35)
      push()
         translate(0, 35)
         rotate(-PI/4)
         line(0, 0, 0, 15)
         rotate(PI/2)
         line(0, 0, 0, 15)
      pop()
   pop()

}

function drawDoctorStrange(posX, posY, sc, rt, col)
{
    push();
        stroke(0)
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
            fill(col);
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
    pop()
}

function cloud(x,y, sc)
{
    push()
       fill(cloudCol);
       scale(sc)
       translate(x, y)
       noStroke();
       ellipse(10, 40,50,60,50);
       ellipse(40,70,60,50);
       ellipse(50,40,70,50);
       ellipse(60,60,70,50);
       ellipse(10,65,70,50);
   pop()
}

function drawSpeechBubble(posX, posY, sc, speech, sz, bg, fg)
{
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


