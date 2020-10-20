

/* this is a basic version of a colour picker 
 which pushes each new entry to the array named colourArray */
let colourArray = [];
let colorPicker;
function setup() {
  createCanvas(100, 100);
  colorPicker = createColorPicker('#ed225d');
  colorPicker.position(0, height + 5);
  colorPicker.input(draw);
}

function draw() {
 noLoop();
  let hexedColour = colorPicker.value();
  let colour = colorPicker.color();
  colourArray.push(hexedColour);
  console.log(colourArray);
   background(colour);
}