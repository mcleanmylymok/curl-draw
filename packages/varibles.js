// === GLOBALS ===

// blank array for the list of rocks
let rockList = [];

// Colours
let pageClr = [253, 240, 213];
let boardClr = [0, 43, 73];
let oppositionRockClr = [120, 0, 0];
let homeTeamRock = [255, 186, 8];
let buzzerClr = [193, 18, 31];

// sizes
let cx, cy, houseDiam;

// Rock diameter and distance
let rockD = 30;
let spread = 1.0;

// interactivity 
let dragged = null;
let grabDX = 0;
let grabDY = 0;

// default state for shape
let shapeKey = "c";