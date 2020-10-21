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
    this.strokeWeight = 3;
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

  selectRectangle(dark) {
    this.stroke = dark;
  }

  popRectangle(index) {
    console.log(
      "You clicked on the cross with index number: " + index + " innit!"
    );
  }

  crossContains(px, py) {
    if (
      px >= this.x + (this.width - this.width / 9) &&
      px <= this.x + (this.width - this.width / 9) + 25 &&
      py >= this.y + 25 &&
      py <= this.y + 50
    ) {
      return true;
    } else {
      return false;
    }
  }

  bodyContains(px, py) {
    if (
      px >= this.x + 1 &&
      px <= this.x + this.width &&
      py >= this.y + 1 &&
      py <= this.y + windowHeight - 30
    ) {
      return true;
    } else {
      return false;
    }
  }

  crossDraw() {
    stroke(0);
    line(
      this.x + (this.width - this.width / 9),
      this.y + 25,
      this.x + (this.width - this.width / 9) + 25,
      this.y + 50
    );
    line(
      this.x + (this.width - this.width / 9) + 25,
      this.y + 25,
      this.x + (this.width - this.width / 9),
      this.y + 50
    );
  }

  rectangleDraw() {
    strokeWeight(this.strokeWeight);
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
    if (
      rectangles[i].bodyContains(mouseX, mouseY) &&
      !rectangles[i].crossContains(mouseX, mouseY)
    ) {
      rectangles[i].selectRectangle(0);
    } else if (rectangles[i].crossContains(mouseX, mouseY)) {
      rectangles[i].popRectangle(i);
    } else {
      rectangles[i].selectRectangle(rectangles[i].colour);
    }
    redraw();
  }
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

  rectangles.forEach((element) => {
    element.rectangleDraw();
    if (element.bodyContains(mouseX, mouseY)) {
      element.rectangleDraw();
      element.crossDraw();
    }
  });
}
