let rectangles;
let colourArray;
let colourInputs;
let colourInputHex;
colourArray = ["#ed225d"];

class Rectangle {
  constructor(xPos, count, colour) {
    this.xPos = xPos;
    this.count = count;
    this.colour = colour;

    this.width = windowWidth / this.count;
    this.y = 0;
    this.x = this.width * xPos;
    this.roundedEdges = 20;
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

  rectangleDraw() {
    noLoop();
    noStroke();
    fill(this.colour);
    rect(this.x, this.y, this.width, windowHeight - 30, this.roundedEdges);
  }
}

class RectangleColour {
  colourPicker() {
    let input = createColorPicker();
    let submitButton = createButton("Submit Colour!");
    submitButton.mousePressed(function () {
      colourArray.push(input.value());
      console.log(colourArray);
      renderPage();
    });
  }
}

function renderPage() {
  rectangles = generateRectangles();
  colourInputs = generateColourPicker();
  console.log(colourInputs);
  draw();
}

function generateRectangles() {
  rectangles = [];
  console.log(colourArray.length);

  for (let index = 0; index < colourArray.length; index++) {
    rectangles.push(
      new Rectangle(index, colourArray.length, colourArray[index])
    );
  }

  return rectangles;
}

function generateColourPicker() {
  colourInputs = [];
  console.log(colourInputs);

  for (let index = 0; index < colourArray.length; index++) {
    colourInputs.push(new RectangleColour());
  }

  return colourInputs;
}

function setup() {
  createCanvas(windowWidth, windowHeight - 30);

  renderPage();
}

function draw() {
  noLoop();
  background(255);

  console.log(colourArray.length);

  rectangles.forEach((element) => {
    element.rectangleDraw();
  });

  colourInputs.forEach((element) => {
    element.colourPicker();
  });
}
