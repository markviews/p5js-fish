let allFish = []
let allBubbles = []

function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  //rectMode(CENTER);
  //noStroke();

  // create 10 fish
  for (let i = 0; i < 10; i++) {
    allFish.push(new Fish());
  }

  // create 10 bubbles
  for (let i = 0; i < 10; i++) {
    allBubbles.push(new Bubble());
  }

}

function draw() {
  // background
  background(200, 100, 100);
  

  // draw bubbles
  for (let i = 0; i < allBubbles.length; i++) {
    allBubbles[i].update();
  }

  // draw fish
  for( let i = 0; i < allFish.length; i++) {
    allFish[i].update();
  }

  // text
  fill(0);
  textSize(40);
  text("You've reeled in", 20, height - 90);
  text("Success! Congrats!", 20, height - 50);
}

class Fish {

  constructor() {
    this.reset();
  }

  reset() {
    this.left = Math.random() < 0.5;
    let x = this.left ? -100 : width + 100
    this.position = createVector(x, random(0, height));
    this.velocity = createVector(random(1, 2), random(-0.4, 0.4));

    if (!this.left) {
      this.velocity.x *= -1;
    }

    this.color1 = color(random(0, 360), 100, 100);
    this.color2 = color(random(0, 360), 100, 100);
    this.color3 = color(random(0, 360), 100, 100);
    this.color4 = color(random(0, 360), 100, 100);
    this.color5 = color(random(0, 360), 100, 100);
    this.color6 = color(random(0, 360), 100, 100);
  }

  update() {
    push();
    
    if (this.left) {
        scale(1, 1);
        translate(0, 0);
    } else {
        scale(-1, 1);
        translate(-this.position.x * 2, 0);
    }

    let gradient = drawingContext.createLinearGradient(this.position.x - 50, this.position.y - 25, this.position.x + 50, this.position.y + 25);
    gradient.addColorStop(0, this.color1);
    gradient.addColorStop(1, this.color2);
    drawingContext.fillStyle = gradient;
    
    // Body
    ellipse(this.position.x, this.position.y, 100, 50);

    let gradient2 = drawingContext.createLinearGradient(this.position.x + 20, this.position.y, this.position.x + 20, this.position.y + 20);
    gradient2.addColorStop(0, this.color3);
    gradient2.addColorStop(1, this.color4);
    drawingContext.fillStyle = gradient2;

    // Tail
    beginShape();
    vertex(this.position.x - 50, this.position.y);
    vertex(this.position.x - 100, this.position.y - 25);
    vertex(this.position.x - 100, this.position.y + 25);
    endShape(CLOSE);

    let gradient3 = drawingContext.createLinearGradient(this.position.x, this.position.y, this.position.x + 20, this.position.y + 20);
    gradient3.addColorStop(0, this.color5);
    gradient3.addColorStop(1, this.color6);
    drawingContext.fillStyle = gradient3;

    // Eye
    ellipse(this.position.x + 20, this.position.y, 20, 20);

    // Fin
    noFill();
    stroke(0); // Black color
    strokeWeight(2);
    arc(this.position.x - 20, this.position.y, 40, 30, 0, PI);
    
    pop(); // Restore the previous drawing state

    this.position.add(this.velocity);

    // if off screen, reset self
    if (this.position.x < -100 || this.position.x > width + 100) {
      this.reset();
    }
  }

}

class Bubble {

  constructor() {
    this.reset();
  }

  reset() {
    this.position = createVector(random(0, width), height + 10);
    this.velocity = createVector(0, random(-0.5, -2));
  }

  update() {
    push();

    fill(color(220, 50, 100));
    ellipse(this.position.x, this.position.y, 20, 20);

    noStroke();
    fill(color(220, 1, 100));
    ellipse(this.position.x - 4, this.position.y - 4, 5, 5);

    pop();

    this.position.add(this.velocity);

    // if off screen, reset self
    if (this.position.y < 0) {
      this.reset();
    }
    
  }

}