let rectangles;
let colourArray;
colourArray = ["#ed225d", "#d95000", "#c3d117"];

class Rectangle {
  constructor(xPos, count, colour) {
    this.xPos = xPos;
    this.count = count;
    this.colour = colour;

    this.width = windowWidth / this.count;
    this.y = 0;
    this.x = this.width * xPos;
    this.roundedEdges = 20;
    this.stroke = this.colour;
    this.strokeWeight = 4;
    console.log(
      this.xPos,
      this.count,
      this.colour,
      this.width,
      this.y,
      this.x,
      this.roundedEdges
    );
  }

  contains(px, py) {
    if (
      px >= this.x &&
      px <= this.x + this.width &&
      py >= this.y &&
      py <= this.y + windowHeight - 30
    ) {
      this.stroke = 0;
    } else {
      this.stroke = this.colour;
    }
    console.log(this.stroke);
  }

  rectangleDraw() {
    strokeWeight(4);
    stroke(this.stroke);
    fill(this.colour);
    rect(
      this.x + this.strokeWeight / 2,
      this.y + this.strokeWeight / 2,
      this.width - this.strokeWeight,
      windowHeight - this.strokeWeight - 30,
      this.roundedEdges
    );
  }
}

function mousePressed() {
  for (let i = rectangles.length - 1; i >= 0; i--) {
    rectangles[i].contains(mouseX, mouseY);
  }
  redraw();
}

function generateRectangles() {
  rectangles = [];

  for (let index = 0; index < colourArray.length; index++) {
    rectangles.push(
      new Rectangle(index, colourArray.length, colourArray[index])
    );
  }

  return rectangles;
}

function setup() {
  createCanvas(windowWidth, windowHeight - 30);

  rectangles = generateRectangles();
  draw();
}

function draw() {
  noLoop();
  background(255);
  console.log(colourArray);
  console.log(rectangles);

  console.log(colourArray.length);

  rectangles.forEach((element) => {
    element.rectangleDraw();
  });
}
