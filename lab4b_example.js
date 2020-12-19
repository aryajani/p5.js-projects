//variables
let myFirstFont
var xLocL = 45
var xLocM = 185
var yLoc = 200
var a = ['IMPOSTOR', 'CREWMATE']
var b = [1, 2, 3]
let c1, c2//, a 



function preload() {
  myFirstFont = loadFont('amongus.ttf');
}


function setup() 
{
  createCanvas(400, 400); 
  noLoop()
  c1 = color('red')
  c2 = color(10, 20, 50)  
  textFont(myFirstFont);
  
}

function draw()
{
    background(10, 20, 50); 
    /*if (a)
      {c1 = color('red')}
    else
      {c2 = color(10, 20, 50)}  */
    setGradient(200, 220, 80, c1, c2);
    for (i = 0; i < 7; i++)
    {
    dfCol = color(random(255), random(255), random(255))
    beany(xLocL, yLoc, 0.4, dfCol)
    if (xLocL < 150)
    {
        yLoc += 25
    }
    else
    {
      yLoc -= 25
    }
    xLocL += 50      
    }
    randomassignment()
    
  
}

function beany(x, y, scal, col) 
{
    push();
        translate(x, y)
        scale(scal)
        stroke(0)
        strokeWeight(7)
                
        // body
        fill(col)
        //backpack      
        rect(-20, -63, 40, 65, 15)
        //legs
        rect(0, -30, 32, 65, 10)
        rect(45, -30, 30, 60, 10)
        //mainbody
        rect(0, -100, 75, 114, 30)
        
        // goggles/eyes
        fill(70, 90, 100)
        rect(25, -80, 60, 37, 25)
        push()
              noStroke()
              fill(150, 193, 220)
              rect(32, -77, 50, 22, 22)
              fill(225, 225, 245)
              rect(45, -75, 30, 10, 15)
        pop()
    pop()
}





function randomassignment()
{
    if (random(a) == 'IMPOSTOR')
    { 
        fill('red')    
        textFont(myFirstFont)
        textSize(29);
        textAlign(CENTER);
        text('IMPOSTOR', 200, 70)
    }
    else
    {
        fill(255)
        textFont(myFirstFont)
        textSize(27);
        textAlign(CENTER);
        text('CREWMATE', 200, 70)
        if (random(b) == 1)
        {
            fill(255)
            textSize(22);
            textAlign(CENTER);
            text('There is 1 impostor among us', 200, 100)
        }
        else if (random(b) == 2 )
        {
            fill(255)
            textSize(22);
            textAlign(CENTER);
            c = ('There are 2 impostors among us')
            text(c, 200, 100)
        }
        else 
        {
            fill(255)
            textSize(22);
            textAlign(CENTER);
            c = ('There are 3 impostors among us')
            text(c, 200, 100)
        }
    }
}


function setGradient(x, y, h, c1, c2) 
{
  noFill();

  
  for (let i = 0; i <= y + h; i++) 
      {
        let inter = map(i, y, y + h, 0, 1);
        let c = lerpColor(c1, c2, inter);
        stroke(c);
        ellipse(x, y, i+20, i/2);
      }
   
}





