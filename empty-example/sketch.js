
class Rectangle {
    constructor(xPos,count, colour) {
        this.xPos = xPos;
        this.count = count;
        this.colour = colour;

        this.width = windowWidth/this.count;
        this.y = 0;
        this.x = this.width * xPos;
        this.roundedEdges = 20;
        // this.inputField = inputField;  
        console.log(this.xPos,this.count,this.colour,this.width,this.y,this.x,this.roundedEdges);
    }

    draw() {
      noLoop();
      noStroke();
      fill(this.colour[0], this.colour[1], this.colour[2]); 
      rect(this.x, this.y, this.width, windowHeight-20, this.roundedEdges);
      // console.log(x, y, width, windowHeight, roundedEdges);
    }

    colourInput() {
        let inp = createInput('');
    }

}

let rectangles;
let colourArray;


function generateRectangles(colourArray) {

  let rectangles = [];
  let countColours = colourArray.length;
  console.log(countColours);

  for (let index = 0; index < countColours; index++) {
    rectangles.push(new Rectangle(index,countColours,colourArray[index]));
  }
  return rectangles;
}


function setup() {
  createCanvas(windowWidth, windowHeight);

  colourArray = [[0,0,0],[0,255,0],[255,0,0]];
  // colourArray.push([0,0,0],[0,255,0]);

rectangles = generateRectangles(colourArray);

}


function draw() {
  background(255);

 rectangles.forEach(element => {
   element.draw();
 });


  };
