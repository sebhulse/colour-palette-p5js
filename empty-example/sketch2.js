let rectangles;
let colourArray;
colourArray = ["#ed225d", "#d95000", "#c3d117", "#00c7fc", "#c3d117"];

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
    this.crosConst = 25;
    this.crossFactor = this.width - this.crosConst * 2;
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

  crossContains(px, py) {
    if (
      px >= this.x + this.crossFactor &&
      px <= this.x + this.crossFactor + this.crosConst &&
      py >= this.y + this.crosConst &&
      py <= this.y + this.crosConst * 2
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

  //   this.crossFactor = this.width - this.width / 9;

  crossDraw() {
    stroke(0);
    line(
      this.x + this.crossFactor,
      this.y + this.crosConst,
      this.x + this.crossFactor + this.crosConst,
      this.y + this.crosConst * 2
    );
    line(
      this.x + this.crossFactor + this.crosConst,
      this.y + this.crosConst,
      this.x + this.crossFactor,
      this.y + this.crosConst * 2
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

function popRectangle(index) {
  console.log(
    "You clicked on the cross with index number: " + index + " innit!"
  );
  console.log("rectangles array before splice: " + rectangles);
  console.log("colourArray array before splice: " + colourArray);
  rectangles.splice(index, 1);
  colourArray.splice(index, 1);
  console.log("rectangles array after splice: " + rectangles);
  console.log("colourArray array after splice: " + colourArray);
  console.log("selected rectangle is: " + index);
  redraw();
  setup();
}

function mousePressed() {
  for (let i = rectangles.length - 1; i >= 0; i--) {
    if (
      rectangles[i].bodyContains(mouseX, mouseY) &&
      !rectangles[i].crossContains(mouseX, mouseY)
    ) {
      rectangles[i].selectRectangle(0);
    } else if (rectangles[i].crossContains(mouseX, mouseY)) {
      popRectangle(i);
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
}

function draw() {
  noLoop();
  background(255);

  for (let i = rectangles.length - 1; i >= 0; i--) {
    rectangles[i].rectangleDraw();
    if (rectangles[i].bodyContains(mouseX, mouseY)) {
      rectangles[i].rectangleDraw();
      rectangles[i].crossDraw();
      rectangles[i].selectRectangle(0);
    }
  }
}
