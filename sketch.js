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
  stroke(boardClr);
  circle(cx, cy, houseDiam);
  // buzzer

  buzzer(buzzerClr, 0.5);
 drawRocks(rockList, rockD);
}


// === USER INTERACTIVITY ===
function mousePressed() {
// search backwards and pick the top one first 
for (i = rockList.length - 1; i >= 0; i--)  {
  let r = rockList[i];

  if (dist(mouseX, mouseY, r.x, r.y) < rockD / 2) {
    dragged = r;
    grabDX = r.x - mouseX; // remember where I dragged the rock
    grabDY = r.y - mouseY;
    return;
  }
}
}

// mouseDragged 
function mouseDragged() {
  if (dragged) {
    dragged.x = mouseX + grabDX;
    dragged.y = mouseY + grabDY;
    redraw();
  } 
  return false;
}

// mouseReleased
function mouseReleased() {
  dragged = null;
}