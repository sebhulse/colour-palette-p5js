function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(255);
  var a = [244,244,255];
  var b = [212,212,255,0.6];
  var c = [212,212,255];
  var d = [244,54,255];
  var e = [244,9,255];
  var f = [244,1,255];


  fill(a[0],a[1],a[2]);
  noStroke();
  rect(0, 0, width/6, height, 20);

  fill(b[0],b[1],b[2],b[3]*255);
  rect(width/6, 0, width/6, height, 20);

  fill(c[0],c[1],c[2]);
  rect(width*2/6, 0, width/6, height, 20);

  fill(d[0],d[1],d[2]);
  rect(width*3/6, 0, width/6, height, 20);

  fill(e[0],e[1],e[2]);
  rect(width*4/6, 0, width/6, height, 20);

  fill(f[0],f[1],f[2]);
  rect(width*5/6, 0, width/6, height, 20);
  };
