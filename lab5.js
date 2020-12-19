var numPlanes;
var dx = [];
var dy = [];
var dfX = [];
var dfY = [];
var dfScale = [];
var dfColor = [];
var roadX = [];
var roadRot = [];


function setup() 
{
   let cvs = createCanvas(500, 500);
   cvs.parent("canvasArea")
   

   numPlanes = 15;

   // set up plane variables
   for (var i=0; i < numPlanes; i++) {
      dx.push(random(-3, 3));
      dy.push(random(-3, 3));
      dfX.push(random(500));
      dfY.push(random(500));
      dfColor.push(color(random(150), random(100,205), random(200, 220)));
      dfScale.push(random(.5, .7));
   }

   // set up road variables
   var x = -50;
   while (x < width + 50)
   {
      roadX.push(x);
      roadRot.push(random(2*PI));
      x += random(30, 70);
   }
   noStroke();
}


function draw() 
{

   backgroundScene();
   drawaeroplanes();
   updateaeroplanes();
}


function backgroundScene()
{
   // concrete
   background(100);

   // road 
   for (var i=0; i < roadX.length; i++)
   {
      drawRoad(roadX[i], roadX[i]);
   }

   // grass
   fill(89, 204, 75);
}


function drawaeroplanes()
{

   for (var i=0; i < numPlanes; i++) 
   {
      // draw aeroplane
      drawAirplane(dfX[i], dfY[i], dx[i], dy[i], dfScale[i], dfColor[i]);
   }
}


function updateaeroplanes()
{

   for (var i=0; i < numPlanes; i++) 
   {
      // updates the aeroplane's location
      dfX[i] += dx[i];
      dfY[i] += dy[i];
      
      // bounces the aeroplane
      if (dfX[i] >= width || dfX[i] <= 0) 
         dx[i] = -dx[i];

      if (dfY[i] <= 0 || dfY[i] >= height) 
         dy[i] = -dy[i];
   }
}


function drawRoad(x, rot)
{
   fill(50);
   push();
      translate(x, 0);
      rotate(rot);
      rect(0, -10, 65, height+20);
      for (var i = 0; i < 21; i ++)
      {
         stroke(200)
         strokeWeight(3);
         line(65/2, -25*(-i), 65/2, -25*(-i)+7)
      }
      stroke(250, 200, 0);
      line(2, -10, 2, -10+height+20)
      line(63, -10, 63, -10+height+20)
   pop();
}

function drawAirplane(posX, posY, dx, dy, sc, col){
    push();
        translate(posX, posY);
        scale(sc);
        rotate(atan2(dy, dx)-PI);
        rectMode(CENTER);
        noStroke();
        fill(col);
        arc(-78, 3, 24, 15, PI/2, PI*1.3, PIE);
        rect(-10, 0, 140, 20, 5);
        rect(0, -5, 160, 10, 5);
        triangle(58, 8, 58, 0, 77, 0);
        quad(55, -3, 77, -3, 92, 12, 87, 12);
        quad(55, -3, 77, -3, 92, -18, 87, -18);
        quad(-40, 5, -5, 5, 10, 50, 3, 50);
        quad(-40, 5, -5, 5, 10, -45, 3, -45);
        fill(0, 225, 0)
        ellipse(13/2, 50, 7)
        fill(255, 0, 0)
        ellipse(13/2, -48, 7)        
        push()
        stroke(20, 20, 20, 200)
        strokeWeight(1/2)
        fill(203, 208, 235);
        triangle(-78, -10, -78, 0, -87, 0);
        pop()
        fill(0, 0, 128);
        quad(55, -10, 77, -10, 85, -40, 80, -40);    
        noFill();
        stroke(20, 20, 20, 200);
        strokeWeight(0.5);
        for (winX=-60; winX<=50; winX+=10){
          fill(203, 208, 235)  
          square(winX, -3, 5)
        }
    pop();
}
