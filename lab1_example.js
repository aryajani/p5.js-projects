
function setup() {
	createCanvas(400, 400);
}


function draw() {
	background(22, 12, 100);
    
	
	//ground
	fill(61, 25, 6)
	rect(0, 100*2.8, 100*4, 100*1.2)
	
    
    //house
	fill(69, 54, 2)
	rect(0, 120, 150 , 160)
	triangle(0, 120, 150, 120, 75, 50)
	line(125, 280, 125, 120)
	line(30, 280, 30, 120)
	line(155/2, 280, 155/2, 120)
	line(202.5/2, 280, 202.5/2, 120)
	line(107.5/2, 280, 107.5/2, 120)

	
	//door
    fill(0, 0, 0)
	rect(60, 220, 40,60)

	
	//moon
    push()
    fill(245,240,215);
	ellipse(320, 60, 80);
	fill(227, 228, 200)
	noStroke()
	ellipse(310, 66, 20)
	ellipse(330, 67, 10, 20)
	ellipse(320, 50, 20, 10)
    pop()

    
    //madboy(The creature)

    //horns
    fill(40)
    triangle(2/3*400+45, 120, 2/3*400+8, 155, 2/3*400+12, 180)
    triangle(2/3*400-45, 120, 2/3*400-8, 155, 2/3*400-12, 180)
    
    //head
    fill(40)
    ellipse(2/3*400, 180, 80, 90)
    fill(70)
    ellipse(2/3*400, 180, 55, 55*9/8)
    
    //eyes
    fill(194, 16, 9)
    ellipse(2/3*400+8, 165, 12)
    ellipse(2/3*400-8, 165, 12)
    fill(0)
    ellipse(2/3*400+8, 165, 2)
    ellipse(2/3*400-8, 165, 2)
    
    //teeth
    fill(200)
    triangle(2/3*400,188, 2/3*400+4, 180, 2/3*400-4, 180)
    triangle(2/3*400,188, 2/3*400+4, 180, 2/3*400+8,188)
    triangle(2/3*400,188, 2/3*400-8,188, 2/3*400-4, 180)
    triangle(2/3*400-4,180, 2/3*400-12,193, 2/3*400-12,180)
    triangle(2/3*400+4, 180, 2/3*400+12,193, 2/3*400+12,180)

    //foot1
    push()
    fill(40)
    translate(2/3*400+23, 2/3*420+90)
    rotate(-PI/6)
    ellipse(0, 0, 30, 50)
    pop()
    
    //foot2
    push()
    fill(40)
    translate(2/3*400-23, 2/3*420+90)
    rotate(PI/6)
    ellipse(0, 0, 30, 50)
    pop()

    //hand1
    fill(40)
    push()   
    translate(2/3*400+32.5, 2/3*420-35)
    push()
    rotate(-PI/4)
    rect(0, 0, 60,20)
    pop()
    ellipse(50, -35, 37)
    pop()


    //hand2
    fill(40)
    push()    
    translate(2/3*400-45, 2/3*420-20)
    push()
    rotate(PI)
    rotate(PI/4)
    rect(0, 0, 60, 20)
    pop()
    ellipse(-38, -52, 37)
    pop()

    //tail
    
    //body
    fill(40)
    ellipse(2/3*400, 2/3*420, 95, 170)




    
    
    }