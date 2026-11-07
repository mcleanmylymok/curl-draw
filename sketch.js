function setup() {
  let cnv = createCanvas(850, 550);
  cnv.parent("sketch");
  // defining
  houseDiam = 300;
  const houseRadius = houseDiam / 2;
  const boardThickness = 40;
  cx = random(
    boardThickness + houseRadius,
    width - boardThickness - houseRadius
  );
  cy = random(houseRadius, height - houseRadius);
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
function keyPressed() {
  const pressedKey = key.toLowerCase();

  if (pressedKey === "c" || pressedKey === "r" || pressedKey === "l") {
    shapeKey = pressedKey;
    redraw();
  } else if (pressedKey === "p") {
    // storing the base prompt
    const filePrompt = prompt(
      "What should we call your sketch, eh?",
      "curl_art",
    );
    // Check if export sequence is initialized
    if (!filePrompt) {
      return false;
    }

    // format prompt
    const formatPrompt = prompt("What do you want to save your sketch as, eh? You may save it as a jpg, png, webp").toLowerCase();

    // if a file format is not selected…
    if (formatPrompt !== "png" && formatPrompt !== "jpg" && formatPrompt !== "webp") {
      alert("Eh buddy, you forgot to select a format. In order to save your sketch bud, you must select a format of either jpg, png, or webp. Got it, eh?");
      return false;
    }

    saveCanvas(filePrompt.trim(), formatPrompt);
  }

  return false;
}

// === USER INTERACTIVITY ===
function mousePressed() {
  // search backwards and pick the top one first
  for (let i = rockList.length - 1; i >= 0; i--) {
    let r = rockList[i];
    let hit = false;

    if (shapeKey === "c" || shapeKey === "r") {
      hit = dist(mouseX, mouseY, r.x, r.y) < rockD / 2;
    } else if (shapeKey === "l") {
      hit = distToSegment(mouseX, mouseY, r.x, r.y, r.x * 0.5, r.y * 0.5) < 15;
    }

    //  checking hit
    if (hit) {
      dragged = r;
      grabDX = r.x - mouseX;
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
