class Rectangle {
    constructor(xPos, count, colour) {
        this.xPos = xPos;
        this.count = count;
        this.colour = colour;
        // this.inputField = inputField;
    }
    let width = displayWidth / count;
    let y = 0;
    let x = width * xPos;
    let roundedEdges = 20;
    let colour = [];

    function colourInput() {
        let inp = createInput('');
    }

    function rectDraw() {
        rect(x, y, width, displayHeight, roundedEdges);
    }

    function rectangleFill() {
        fill(colour[0], colour[1], colour[2]);
    }
}


export default class Rectangle {};
