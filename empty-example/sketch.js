let rectangles;
let colourArray;
let colourInputs;
colourArray = [];

class Rectangle {
    constructor(xPos, count, colour) {
        this.xPos = xPos;
        this.count = count;
        this.colour = colour;

        this.width = windowWidth/this.count;
        this.y = 0;
        this.x = this.width * xPos;
        this.roundedEdges = 20;
        console.log(this.xPos,this.count,this.colour,this.width,this.y,this.x,this.roundedEdges);
    }
    draw() {
      noLoop();
      noStroke();
      fill(this.colour); 
      rect(this.x, this.y, this.width, windowHeight, this.roundedEdges);
      // console.log(x, y, width, windowHeight, roundedEdges);
    }
}


class RectangleColour {
  constructor() {}
  colourPicker() {
    let input = createColorPicker('#ed225d');
    let submitButton = createButton('Submit Colour Array!');
    submitButton.mousePressed(input.value().push(colourArray));
  }
}


function generateRectangles(colourArray) {
  rectangles = [];
  console.log(colourArray.length);
  for (let index = 0; index < colourArray.length; index++) {
    rectangles.push(new Rectangle(index,colourArray.length,colourArray[index]));
  }
  return rectangles;
}


function generateColourPicker(colourArray) {
  colourInputs = [];
for (let index = 0; index < colourArray.length; index++) {
  colourInputs.push(new RectangleColour());
}
return colourInputs;
}



function setup() {
  createCanvas(windowWidth, windowHeight);

  // [0,0,0],[0,255,0],[255,0,0]
  
 


  rectangles = generateRectangles(colourArray);
  colourInputs = generateColourPicker();

}


function draw() {
  background(255);
console.log(colourArray.length);
  if (colourArray.length == 0) {
  colourInputs.colourPicker();
  }

 rectangles.forEach(element => {
   element.draw();
 });
 
 colourInputs.forEach(element => {
   element.colourPicker();
 })

};
