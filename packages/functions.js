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
      clr: i % 2 === 0 ? oppositionRockClr : homeTeamRock,
    });
  }
  return list;
}

// drawRocks
function drawRocks(list, size) {
  noStroke();

  for (let r of list) {
    fill(r.clr);

    // logic for changing shapes
    if (shapeKey === "c") {
      circle(r.x, r.y, size);
    } else if (shapeKey === "r") {
      square(r.x - size / 2, r.y - size / 2, size);
    } else if (shapeKey === "l") {
      push();
      stroke(r.clr);
      strokeWeight(16);
      line(r.x, r.y, r.x * 0.5, r.y * 0.5);
      pop();
    }
  }
}
// calculates distance from segment
function distToSegment(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;

  if (dx === 0 && dy === 0) {
    return dist(px, py, x1, y1);
  }

  const t = constrain(
    ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy),
    0,
    1,
  );

  const closestX = x1 + t * dx;
  const closestY = y1 + t * dy;

  return dist(px, py, closestX, closestY);
}
