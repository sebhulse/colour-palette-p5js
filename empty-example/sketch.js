// import Rectangle from './rectangle.js';

// let windowWidth = windowWidth;



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
    // var colour = [];

    draw() {
      noStroke();
      fill(this.colour[0], this.colour[1], this.colour[2]); 
      rect(this.x, this.y, this.width, windowHeight-20, this.roundedEdges);
      // console.log(x, y, width, windowHeight, roundedEdges);
    }

    colourInput() {
        let inp = createInput('');
    }

  
}



// export default class Rectangle {};

// let rectangles;
// let colourArray = [[]];

// function generateRectangles(colourArray) {

//   let rectangles = [];
//   let countColours = colourArray.length;

//   for (let index = 0; index < countColours; index++) {
//     rectangles.push(new Rectangle(index,countColours,colourArray[index]));
//   }
//   return rectangles;
// }


function setup() {
  createCanvas(windowWidth, windowHeight);

  // let inp = createInput('');
  // inp.size(100);
  // inp.input(myInputEvent);
  // function myInputEvent() {
  //   print('you are typing: ', this.value());
  // }
// rectangle1 = new Rectangle(0,3,[0,0,0]);
// rectangle2 = new Rectangle(1,3,[0,255,0]);
// rectangle3 = new Rectangle(2,3,[255,0,0]);

rectangles = [new Rectangle(0,3,[0,0,0]), new Rectangle(1,3,[0,255,0]), new Rectangle(2,3,[255,0,0])];

}




function draw() {
  background(255);

 rectangles.forEach(element => {
   element.draw();
 });



// let rectangle1 = new Rectangle(0, 1,[244,244,255]);
// rectDraw();
// rectangleFill();

  // var a = [244,244,255];
  // var b = [212,212,255,0.6];
  // var c = [212,212,255];
  // var d = [244,54,255];
  // var e = [244,9,255];
  // var f = [244,1,255];


  // fill(a[0],a[1],a[2]);
  // noStroke();
  // rect(0, 0, width/6, height, 20);

  // fill(b[0],b[1],b[2],b[3]*255);
  // rect(width/6, 0, width/6, height, 20);

  // fill(c[0],c[1],c[2]);
  // rect(width*2/6, 0, width/6, height, 20);

  // fill(d[0],d[1],d[2]);
  // rect(width*3/6, 0, width/6, height, 20);

  // fill(e[0],e[1],e[2]);
  // rect(width*4/6, 0, width/6, height, 20);

  // fill(f[0],f[1],f[2]);
  // rect(width*5/6, 0, width/6, height, 20);
  };
