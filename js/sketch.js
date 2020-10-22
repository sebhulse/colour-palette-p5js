let rectangles;
let colourArray;
colourArray = ["#ffaa00", "#d95000", "#c3d117", "#00c7fc", "#c3d117"];
let colourPicker;
let hexedColour;
let rgbColourArray;

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
    if (this.width / 4 <= 50) {
      this.textSize = this.width / 4;
    } else {
      this.textSize = 50;
    }
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
  }

  textDraw() {
    push();
    textSize(this.textSize);
    fill(0);
    noStroke();
    translate(this.width / 2, windowHeight / 2);
    textAlign(CENTER, CENTER);
    rotate(radians(270));
    text("Hex: " + colourArray[this.xPos], (windowHeight / 4) * -1, this.x);
    text("rgb(" + rgbColourArray[this.xPos] + ")", windowHeight / 4, this.x);
    pop();
  }
}

function popRectangle(index) {
  rectangles.splice(index, 1);
  colourArray.splice(index, 1);
  rgbColourArray.splice(index, 1);
  redraw();
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
  }
  redraw();
}

function submitColour() {
  hexedColour = colourPicker.value();
  colourArray.push(hexedColour);
  redraw();
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  colourPicker = createColorPicker();
  colourPicker.input(submitColour);
  colourPicker.size(windowWidth / 2, windowHeight / 15);
  colourPicker.center();

  rectangles = [];
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

  function unhexColour(i) {
    let rgbColour = unhex([
      colourArray[i].substr(1, 2),
      colourArray[i].substr(3, 2),
      colourArray[i].substr(5, 2),
    ]);
    return rgbColour;
  }

  function makeRgbColourArray() {
    rgbColourArray = [];
    for (let index = 0; index < colourArray.length; index++) {
      rgbColourArray.push(unhexColour(index));
    }
  }

  makeRgbColourArray();

  for (let i = 0; i < rectangles.length; i++) {
    rectangles[i].rectangleDraw();
    rectangles[i].selectRectangle(0);
    rectangles[i].textDraw();

    if (rectangles[i].bodyContains(mouseX, mouseY)) {
      rectangles[i].rectangleDraw();
      rectangles[i].crossDraw();
      rectangles[i].textDraw();
    }
  }
}
