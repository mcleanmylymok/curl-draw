function setup() {
let cnv = createCanvas(850, 900);
  cnv.parent("sketch")
  // defining
  cx = width * 0.45;
  cy = height * 0.7;
  houseDiam = 300;
  rockList = createRocks(15);

  noLoop();
}

function draw() {
    background(pageClr);

  // edges of the sheet
  boards(40, boardClr);
  // outer ring
  noFill();
  strokeWeight(40);
  circle(cx, cy, houseDiam);
  // buzzer

  buzzer(buzzerClr, 0.5);
 drawRocks(rockList, rockD);
}
