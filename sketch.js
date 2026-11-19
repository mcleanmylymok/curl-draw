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
  const currentKey = key;

  // Uppercase applies the shape to every rock.
  if (["C", "R", "L"].includes(currentKey)) {
    const shape = currentKey.toLowerCase();

    for (const rock of rockList) {
      rock.shape = shape;
    }

    redraw();
    return false;
  }

  // Lowercase applies the shape to the first half.
  if (["c", "r", "l"].includes(currentKey)) {
    const halfCount = Math.floor(rockList.length / 2);

    for (let i = 0; i < halfCount; i++) {
      rockList[i].shape = currentKey;
    }

    redraw();
    return false;
  }

  // Keep E as the export key.
  if (currentKey.toLowerCase() === "e") {
    const filePrompt = prompt("What should we call your sketch, eh?", "curl_art");
    if (!filePrompt) return false;

    const formatInput = prompt(
      "What do you want to save your sketch as? Choose jpg, png, or webp.",
      "jpg"
    );
    if (formatInput === null) return false;

    const formatPrompt = formatInput.toLowerCase();

    if (!["png", "jpg", "webp"].includes(formatPrompt)) {
      alert("Please choose jpg, png, or webp.");
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

    if (r.shape === "c") {
      hit = dist(mouseX, mouseY, r.x, r.y) < rockD / 2;
    } else if (r.shape === "r") {
      hit =
        abs(mouseX - r.x) < rockD / 2 &&
        abs(mouseY - r.y) < rockD / 2;
    } else if (r.shape === "l") {
      hit =
        distToSegment(mouseX, mouseY, r.x, r.y, r.x * 0.5, r.y * 0.5) < 15;
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
