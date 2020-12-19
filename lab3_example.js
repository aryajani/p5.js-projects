var yC = 500
var x = 360
var xCL = 70
var xCL1 = 250
var yDF = 330
var scaleDF = 0
var dy = 0
var dsc = 0

function setup() 
{
   createCanvas(400, 500);
   
   
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

function ghastly(y, sc){
    push();
    translate(200, y)
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


function draw() 
{
     background(255);
     
    
     stroke(0)
     strokeWeight(2)

     //ground
     fill(153, 55, 20)
     rect(0, x, 400, 500-x)
    
     //sky
     fill(87, 187, 255)
     rect(0, 0, 400, x)
    
    
    //road
     fill(140)
     beginShape()
     vertex(0, 500);
     vertex(400, 500);
     vertex(400, 430);
     vertex(250, 290);
     vertex(150, 290);
     vertex(0, 430);
     endShape(CLOSE)
     push();
     stroke(250, 200, 0);
     strokeWeight(9);
     line(0, 450, 40, 410)
     line(400, 450, 360, 410)
     pop()
    
    
     //tires
     fill(30)
     rect(200-170,450+7, 100, 20, 5)
     rect(200+70,450+7, 100, 20, 5)

     //car 
     //main body
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
     
     //front splitter(bendy thing on the front)
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
     line(200+125, 360+23, 200+107, 360+12 )
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
    
     push()
     noStroke()
     fill(220)
     rect(185, yC, 30, 40);
     if (yC > 460)
      yC = yC - 2

     if (yC == 460)
      yC = 500
     pop()
    
      push()
      cloud(xCL, 20, 1)
      if (xCL1<450)
       xCL1 = xCL1+1
      if (xCL1 == 430)
       xCL1= -100
      pop()
    
      push()
      cloud(xCL1, 60, 1.2)
      if (xCL<450)
       xCL = xCL+0.5
      if (xCL == 430)
       xCL= -90
      pop()
    
      ghastly(yDF, scaleDF)
    
      if (yDF<330)
       yDF += dy
    
      if (scaleDF <1)
       scaleDF += dsc
    
}


function mouseClicked()
{
     if (mouseX<375 && mouseY>25 && mouseY>287+25 && mouseY < 450+7 )
        {
          dy = 1
          dsc = 0.1
        }
}

