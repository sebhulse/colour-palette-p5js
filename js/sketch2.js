let rectangles;
let colourArray;
colourArray = ["#ed225d", "#d95000", "#c3d117", "#00c7fc", "#c3d117"];
let colourPicker;
let hexedColour;

class Rectangle {
  constructor(xPos, count, colour) {
    this.xPos = xPos;
    this.count = count;
    this.colour = colour;

    this.width = windowWidth / this.count;
    this.y = 0;
    this.x = this.width * xPos;
    this.roundedEdges = 15;
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
      windowHeight - this.strokeWeight,
      this.roundedEdges
    );
    // text(this.colour);
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
  //   setup();
}

function mousePressed() {
  for (let i = 0; i < colourArray.length; i++) {
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
    // generateRectangles();
    redraw();
  }
}

function submitColour() {
  hexedColour = colourPicker.value();
  colourArray.push(hexedColour);
  console.log(colourArray);
  //   generateRectangles();
  redraw(5);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //   generateRectangles();

  rectangles = [];

  colourPicker = createColorPicker();
  colourPicker.input(submitColour);
  colourPicker.size(windowWidth / 2, 60);
  colourPicker.center();
}

function draw() {
  noLoop();
  background(255);

  rectangles = [];
  for (let index = 0; index < colourArray.length; index++) {
    rectangles.push(
      new Rectangle(index, colourArray.length, colourArray[index])
    );
  }

  for (let i = 0; i < rectangles.length; i++) {
    rectangles[i].rectangleDraw();
    rectangles[i].selectRectangle(0);
    if (rectangles[i].bodyContains(mouseX, mouseY)) {
      rectangles[i].rectangleDraw();
      rectangles[i].crossDraw();
    }
  }
}
