class customFont{
	constructor(){
		this.x = 400;
		this.y = 100;
		this.sc = 72;
	}

	move(){
		this.y -= 1;
		this.sc -= 1/2;
	}

	show(word){
		textbox(word, this.x, this.y, this.sc);
	}
}

class star{
	constructor() {
		this.x = width;
		this.y = random(10, 200);
		this.rot = random(0, PI/2);
		this.sc = random(0.1, 0.4);
	}

	move() {
		this.x -= 1;
	}

	stop() {
		this.x += 0;
	}

	show() {
		ellipseMode(CENTER);
		stars(this.x, this.y, this.rot, this.sc);
	}
}

class darkBall {
    constructor() {
        this.r = 75;
        this.x = width;
        this.y = height-150-this.r-70;
    }
  
    move() {
        this.x -= 10+frameCount*0.00005;
    }
  
    stop() {
        this.x += 0;
    }
  
    show() {
        fill(255, 50);
        ellipseMode(CORNER);
        ellipse(this.x, this.y, this.r, this.r);
        obstacle(this.x, this.y);
    }
}

class ghastlyObject {
    constructor() {
        this.r = 100;
        this.x = 50;
        this.y = height-150-(this.r)/2-70;
        this.vy = 0;
        this.gravity = 3;
    }
  
    jump() {
        if (this.y == height-150 - this.r-70) {
            this.vy = -35;
        }
    }
  
    hits(train) {
        let x1 = this.x + this.r * 0.5;
        let y1 = this.y + this.r * 0.5;
        let x2 = train.x + train.r * 0.5;
        let y2 = train.y + train.r * 0.5;
        return collideCircleCircle(x1, y1, this.r, x2, y2, train.r);
    }
  
    move() {
        this.y += this.vy;
        this.vy += this.gravity;
        this.y = constrain(this.y, 0, height-150 - this.r-70);
    }
  
    show() {
        fill(255, 50);
        ellipseMode(CORNER);
        ellipse(this.x, this.y, this.r, this.r);  
        ghastly(this.x, this.y, 1/2.5, this.r);
    }
    
    stop() {
        this.y += 0;
        this.vy += 0;
    }
}

function textbox(word, x, y, sc) {
    push();
        fill(255);
        textFont(resources.fonts.hacked);
        textAlign(CENTER);
        textSize(sc);
        text(word, x, y);
    pop();
}

function stars(x, y, rot, scal) {
	push();
		translate(x, y);
		fill(255);
		scale(scal);
		noStroke();
		rotate(rot);
		ellipse(0, 0, 20, 5);
		ellipse(0, 0, 5, 20);
	pop();
}

function obstacle(x, y) {
    push();
        ellipseMode(CENTER);
        noStroke();
        translate(x+39, y+39);
        fill(0);
        ellipse(0, 0, 75);
        fill(199,21,133);
        ellipse(0, 0, 45);
        fill(0);
        ellipse(-10, -10, 25);
    pop();
}

function ghastly(x, y, sc, r){
    push();
        translate(x, y);
        scale(sc);
        fill(25, 3, 36);
        ellipse (0,0,250);
        push();
            translate(x+r/2+24, y-r/2-134);
            ellipseMode(CENTER);
            fill(255,204,204);
            arc(-60, -40, 140, 140, QUARTER_PI, PI + QUARTER_PI, CHORD);
            arc(60, -40, 140, 140, -QUARTER_PI, 3*QUARTER_PI, CHORD);
            fill(0);
            ellipse(30, 5, 2, 15);
            ellipse(-30, 5, 2, 15);
            fill(100, 0, 0);
            arc(0,-50, 300, 270, PI/3, 2*PI/3, CHORD);
            fill(200, 200, 200);
            triangle(-30, 70, -50, 70, -40, 100);
            triangle(30, 70, 50, 70, 40, 100);
        pop();
    pop();
}

function dinoMouseClickedHandler() {
    if (!gameIsRunning){
        gameInitialized = false;
    }
    if (gameStarted){
        gameData.dino.jump();
    }else{
        gameStarted = true;
        gameIsRunning = true;
    }
}

function dinoKeyPressedHandler() {
    if (key == ' ')
    {
        if (!gameIsRunning){
            gameInitialized = false;
        }
        if (gameStarted){
            gameData.dino.jump();
        }else{
            gameStarted = true;
            gameIsRunning = true;
        }
    }
}

function drawGradient(startX, startY, endX, endY, clr1, clr2){
    push();
        let yRange  = endY-startY;
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

function initializeDinoGame(){
    gameData = {
        events: {
            mouseClicked: dinoMouseClickedHandler,
            keyPressed: dinoKeyPressedHandler,
        },
        darkBallArray: [],
        stars: [],
        font: new customFont(),
        dino: new ghastlyObject(),
        counter: 0
    }
    gameStarted = false;
    gameInitialized = true;
    gameIsRunning = true;
};

function renderDinoGame() {
    background(200);
    drawGradient(0, 0, width, height-150, colors.spaceDark,  colors.spaceLightMaroon);
    fill(colors.brown);
    rect(0, 355, width, height-150-280);
    gameData.dino.show();
    gameData.dino.move();
    gameData.font.show('START');

    if (gameStarted){
        for (let x of gameData.darkBallArray){
            if (gameData.dino.hits(x)) {
                gameData.counter++;
                gameStarted = false;
            }
        }
        if (random(1) < 0.01 ){
            gameData.stars.push(new star());
        }

        gameData.font.move();

        if (random(1) < 0.01) {
            gameData.darkBallArray.push(new darkBall());
        }

        for (let t of gameData.darkBallArray) {
            t.move();
            t.show();
        }

        for (let i of gameData.stars) {
            i.move();
            i.show();
        }
    }else{
        for (let n of gameData.stars){
            n.show();
            n.stop();
        }

        for (let u of gameData.darkBallArray){
            u.show();
            u.stop();
        } 

        if (gameData.counter > 0){
            let f = new customFont();
            f.show('GAME OVER');
            gameIsRunning = false;
        }
    }
    push();
        fill(colors.black);
        noStroke();
        rect(0, 450, width, height-450);
    pop();
}