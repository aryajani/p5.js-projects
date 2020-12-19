// 50 dragonflies, random color!
var textsize = 30
var word = 'Cupcake!!!'




function setup() 
{
   createCanvas(400, 400);

   drawBackground();

   noLoop()
}

function draw() 
{      
  
  textSize(textsize);
  textFont('Comic')
  text(word, 130, 30);


  
  
  
  
  for (let i = 0; i < 70; i++)
	{
	   dfColor = color(random(255), random(155), random(255));
       weird(random(95, 310), random(95, 310), dfColor, random(2*PI))  
	   
	}
  
   for (let i = 0; i < 25; i++)
	{
      dfColor = color(random(195, 240), random(173, 182), random(225, 252));
      drawDragonfly(random(109, 290), random(105, 290), random(2*PI),random(2),dfColor)
	   
	}
  
    
  
    
    
    
   
}

// draws a dragonfly
//
// x - x coordinate of body center
// y - y coordinate of body center
// rot - rotate angle
// sc - scale factor
// col - color of dragonfly
function drawDragonfly(x, y, rot, sc, col)
{
   push();
      translate(x, y);
      rotate(rot);
      fill(col)
      scale(sc);
      ellipse(0, 0, 15, 20)

      
   pop();
}

function weird(x, y, col, rot){
  push()
    translate(x, y)
    rotate(rot)
    fill(col)
    ellipse(0, 0, 2, 7)
  pop()
}



function drawBackground()
{
	background(24, 20, 100);

    
    

    // mountain
    cupcakebase()
  
}

function cupcakebase(rot){
  
    translate(width/2, height/2)
    //rotate(rot)
    noStroke()
    fill(255, 190, 128);
    ellipse(0, 0, 320, 320)
  fill(255, 255, 255)
  ellipse(0, 0, 290, 290)
  
  
  
}




