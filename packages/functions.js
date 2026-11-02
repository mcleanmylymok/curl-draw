// === FUNCTIONS ===

// buzzer function
function buzzer(colour, size) {
  noStroke();
  fill(colour);
  circle(cx, cy, houseDiam * size);

}

// boards function
function boards(boardThickness, boardBg) {
  let boardW = boardThickness;
  noStroke();
  for (let i = 0; i < 2; i++) {
    let x = i * (width - boardW);
    fill(boardBg);
    rect(x, 0, boardW, height);
  }
}

// createRocks
function createRocks(num) {
  let list = [];

  for (let i = 0; i < num; i++) {
    let angle = random(TWO_PI);
    let distance = sqrt(random()) * (houseDiam / 2 + 20 - rockD / 2) * spread;

    list.push({
      x: cx + cos(angle) * distance,
      y: cy + sin(angle) * distance,
      clr: i % 2 === 0 ? oppositionRockClr : homeTeamRock
    });
  }
  return list;
}

// drawRocks
function drawRocks(list, diam) {
  noStroke();

  for (let r of list) {
    fill(r.clr);
    circle(r.x, r.y, diam)
  }
}