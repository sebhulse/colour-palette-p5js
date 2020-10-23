let rectangles;
let colourArray;
colourArray = ["#000000", "#d95000", "#c3d117", "#00c7fc", "#c3d117"];
let colourPicker;
let submitButton;
let rgbColourArray;
let currentHexColour;

class Rectangle {
  constructor(xPos, count, colour, rgbColour) {
    this.xPos = xPos;
    this.count = count;
    this.colour = colour;
    this.rgbColour = rgbColour;

    this.width = windowWidth / this.count;
    this.y = 0;
    this.x = this.width * xPos;
    this.roundedEdges = 15;
    this.stroke = this.colour;
    this.strokeWeight = 3;
    this.crosConst = 25;
    this.crossFactor = this.width - this.crosConst * 2;
    if (this.width / 4 <= 35) {
      this.textSize = this.width / 4;
    } else {
      this.textSize = 35;
    }
    this.lerpedColour = lerpedColour(this.rgbColour);
  }

  selectRectangle() {
    this.stroke = this.lerpedColour;
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
    stroke(this.lerpedColour);
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

  textDraw() {
    push();
    textSize(this.textSize);
    fill(this.lerpedColour);
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

function createCurrentColourField(index) {
  currentHexColour = createInput(colourArray[index]);
  currentHexColour.position(windowWidth / 2, windowHeight - 30);
  currentRgbColour = createInput("rgb(" + rgbColourArray[index] + ")");
  currentRgbColour.position((windowWidth * 3) / 4, windowHeight - 30);
}

function mousePressed() {
  for (let i = 0; i < colourArray.length; i++) {
    if (
      rectangles[i].bodyContains(mouseX, mouseY) &&
      !rectangles[i].crossContains(mouseX, mouseY)
    ) {
      rectangles[i].selectRectangle();
      createCurrentColourField(i);
    } else if (rectangles[i].crossContains(mouseX, mouseY)) {
      popRectangle(i);
    } else {
      rectangles[i].selectRectangle(rectangles[i].colour);
    }
  }
  redraw();
}

function submitColour() {
  let hexedColour = colourPicker.value();
  colourArray.push(hexedColour);
  redraw();
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

function isLight(color) {
  // https://awik.io/determine-color-bright-dark-using-javascript/
  var r, g, b, hsp;

  r = color[0];
  g = color[1];
  b = color[2];

  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  if (hsp > 127.5) {
    return true;
  } else {
    return false;
  }
}

function lerpedColour(colour) {
  colorMode(RGB);
  let from = color(colour);
  let to = color(0, 0, 0);
  let to2 = color(255, 255, 255);

  if (isLight(colour)) {
    return lerpColor(from, to, 0.5);
  } else {
    return lerpColor(from, to2, 0.5);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight - 30);

  colourPicker = createColorPicker();
  colourPicker.size(windowWidth / 2, windowHeight / 15);
  colourPicker.center();
  submitButton = createButton("Submit Colour");
  submitButton.mousePressed(submitColour);
  submitButton.center();

  let text1 = createDiv(
    "The Hex and RGB values of the currently selected colour are: "
  );
  text1.style("font-family", "Helvetica");

  currentHexColour = createInput();
  currentHexColour.position(windowWidth / 2, windowHeight - 30);
  currentRgbColour = createInput();
  currentRgbColour.position((windowWidth * 3) / 4, windowHeight - 30);

  rectangles = [];
}

function draw() {
  noLoop();
  background(255);

  rectangles = [];

  makeRgbColourArray();

  for (let index = 0; index < colourArray.length; index++) {
    rectangles.push(
      new Rectangle(
        index,
        colourArray.length,
        colourArray[index],
        rgbColourArray[index]
      )
    );
  }

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
