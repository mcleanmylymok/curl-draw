let pageClr = [253, 240, 213];
let boardClr = [0, 43, 73];
let oppositionRockClr = [120, 0, 0];
let homeTeamRock = [255, 186, 8];
let buzzerClr = [193, 18, 31];
// sizes
let cx, cy, houseDiam;

// setup
function setup() {
  createCanvas(650, 800);

  // defining
  cx = width *0.45;
  cy = height *0.7;
  houseDiam = 300;

  background(pageClr);
  noLoop();
}

function draw() {
  // edges of the sheet
  let boardW = 50;
  noStroke();
  for (let i = 0; i < 2; i++) {
    let x = i * (width - boardW);
    fill(boardClr);
    rect(x, 0, boardW, height);
  }

  // outer ring
  noFill();
  stroke(boardClr);
  strokeWeight(40);
  circle(cx, cy, houseDiam);

  let rocDiameter = 60;
  let numRocks = 20;
  noStroke();
  for (let angle = 0; angle < numRocks; angle += TWO_PI/numRocks) {
    let x = cx + cos(angle) * (houseDiam+100)/2;
    let y = cy + sin(angle) * (houseDiam+100)/2;

    // drawing and filling rocks
    fill(random(1)<0.5 ? oppositionRockClr : homeTeamRock);
    //if(random(1)<0.5)  oppositionRockClr;// : homeTeamRock);
    if(random(1)<0.2) circle(x, y, rocDiameter);
  }

  // buzzer
  noStroke();
  fill(buzzerClr);
  circle(cx, cy, houseDiam * 0.25);

  // rock placement - randomly places rocks on each page reload

  // loop
}
