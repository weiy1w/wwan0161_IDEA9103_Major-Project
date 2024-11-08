// Global variables 
// Scale and positioning variables for responsive design
let secondSegWidth; // Width of each building section
let minHeight;
let maxHeight; // Building height constraints
let rectWidth;
let rectHeight; // Unit size for drawing rects

// Colour palette for the buildings
let red = [206, 29, 29];
let blue = [21, 33, 173];
let yellow = [255, 196, 31];

// Game state variables
let activeBlock = null; // Currently highlighted block     
let gameTimer = 30; // Game duration in seconds    
let gameActive = false; // Current game state 
let lastTime = 0; // Time tracking for the game timer     

// Score Management Class
// ScoreDisplay class handles the scoring system and UI
// This class organises score-related functionality in one place,
// This class organise inspired by AI tool

class ScoreDisplay {
  constructor() {
    this.score = 0;
    this.highScore = 0;
  }

  // Display current score and high score
  show() {
    fill(0);
    textSize(24);
    textAlign(LEFT);
    text(`Score: ${this.score}`, 20, 30);
    text(`High Score: ${this.highScore}`, 20, 60);
  }
  // Increment score and update high score if needed
  addScore() {
    this.score++;
    if(this.score > this.highScore) {
      this.highScore = this.score;
    }
  }
  // Reset score when starting a new game
  reset() {
    this.score = 0;
  }
}

let scoreDisplay = new ScoreDisplay();



function getBlockId(x, y, w, h) {
  return `${x},${y},${w},${h}`;
}

function fillColour(colour) {
  if (Array.isArray(colour)) {
    fill(colour[0], colour[1], colour[2]);
    return;
  }
  switch(colour) {
    case "red":
      fill(red[0], red[1], red[2]);
      break;
    case "blue":
      fill(blue[0], blue[1], blue[2]);
      break;
    case "yellow":
      fill(yellow[0], yellow[1], yellow[2]);
      break;
    case "white":
      fill(255);
      break;
    case "black":
      fill(0);
      break;
  }
}

// Coordinate system modification:
// - First Building: Original coordinates (x)
// - Second Building: Shifted right by 40 units (x+40)
// - Third Building: Shifted right by 80 units (x+80)
// - Fourth Building: Shifted right by 120 units (x+120)
// This allows all buildings to be handled in a unified coordinate system
// for easier click detection and animation

// Selects a random block from the building to highlight
function selectNewActiveBlock() {
  const possibleBlocks = [
    // First Building (Not changed)
    {x: 24, y: 10, w: 6, h: 10, c: "white"},
    {x: 14, y: 9, w: 12, h: 9, c: "red"},
    {x: 16, y: 19, w: 2, h: 12, c: "red"},
    {x: 7, y: 17, w: 4, h: 17, c: "white"},
    {x: 12, y: 7, w: 6, h: 7, c: "white"},
    {x: 1, y: 11, w: 10, h: 11, c: "blue"},
    {x: 19, y: 20, w: 5, h: 8, c: "blue"},
    {x: 30, y: 36, w: 6, h: 36, c: "blue"},
    {x: 33.5, y: 9, w: 1.5, h: 9, c: "red"},
    {x: 33.5, y: 6, w: 1, h: 1, c: "yellow"},
    {x: 24, y: 20, w: 8, h: 8, c: "white"},
    {x: 11, y: 18, w: 1, h: 18, c: "yellow"},
    {x: 15, y: 12, w: 18, h: 3, c: "yellow"},
    {x: 35, y: 41, w: 4, h: 18, c: "white"},
    {x: 30, y: 36, w: 6, h: 13, c: "blue"},
    {x: 36, y: 38, w: 1, h: 15, c: "yellow"},
    {x: 29, y: 53, w: 2, h: 30, c: "yellow"},
    {x: 24, y: 50, w: 6, h: 27, c: "blue"},
    {x: 26, y: 42, w: 2, h: 4, c: "yellow"},
    {x: 7, y: 33, w: 17, h: 11, c: "white"},
    {x: 28, y: 30, w: 4, h: 7, c: "red"},
    {x: 30, y: 28, w: 1.5, h: 2.5, c: "yellow"},
    {x: 4, y: 23, w: 36, h: 3, c: "yellow"},
    {x: 18, y: 25, w: 2, h: 25, c: "yellow"},
    {x: 4.5, y: 42, w: 6.5, h: 7, c: "white"},
    {x: 0.5, y: 35, w: 27.5, h: 2, c: "yellow"},
    {x: 11, y: 48, w: 2, h: 13, c: "yellow"},
    {x: 16, y: 64, w: 8, h: 29, c: "red"},
    {x: 20, y: 59, w: 2, h: 5, c: "yellow"},
    {x: 23.5, y: 59, w: 1.5, h: 36, c: "yellow"},

    // Second Building (x + 40)
    {x: 58, y: 4, w: 23, h: 4, c: "red"},
    {x: 40, y: 7, w: 27, h: 3.8, c: "white"},
    {x: 40, y: 19, w: 6, h: 12, c: "white"},
    {x: 40, y: 35, w: 17, h: 7, c: "white"},
    {x: 73, y: 20, w: 5, h: 7, c: "white"},
    {x: 64, y: 76, w: 6, h: 63, c: "white"},
    {x: 58, y: 72, w: 1.5, h: 60, c: "white"},
    {x: 40, y: 7, w: 25, h: 1, c: "yellow"},
    {x: 49, y: 13.5, w: 20, h: 2.5, c: "yellow"},
    {x: 41, y: 22, w: 16, h: 2, c: "yellow"},
    {x: 51, y: 36, w: 6, h: 1, c: "yellow"},
    {x: 57, y: 69, w: 1.5, h: 69, c: "yellow"},
    {x: 60, y: 28, w: 18, h: 2.5, c: "yellow"},
    {x: 46, y: 69, w: 6, h: 47, c: "blue"},
    {x: 43, y: 11, w: 3, h: 4, c: "blue"},
    {x: 47, y: 11, w: 9, h: 4, c: "blue"},
    {x: 62, y: 63, w: 3, h: 50, c: "blue"},
    {x: 72, y: 48, w: 3, h: 20, c: "blue"},
    {x: 58.6, y: 10.5, w: 10, h: 3.2, c: "blue"},
    {x: 68, y: 24, w: 6, h: 20, c: "blue"},
    {x: 54, y: 69, w: 3, h: 33, c: "red"},
    {x: 40, y: 19, w: 15, h: 6, c: "red"},
    {x: 60, y: 66, w: 2, h: 45, c: "red"},
    {x: 68, y: 38, w: 4, h: 10, c: "red"},
    {x: 47.5, y: 66, w: 3, h: 6, c: "yellow"},
    {x: 49, y: 32, w: 5, h: 10, c: "yellow"},
    {x: 52, y: 18, w: 2, h: 4, c: "yellow"},
    {x: 68.5, y: 37, w: 3, h: 2, c: "yellow"},
    {x: 69.5, y: 9, w: 3, h: 5, c: "yellow"},

     // Third Building (x + 80)
     {x: 86, y: 20, w: 3, h: 20, c: "white"},
     {x: 84, y: 20, w: 2, h: 20, c: "yellow"},
     {x: 82, y: 8, w: 5, h: 5, c: "blue"},
     {x: 88, y: 20, w: 12, h: 20, c: "blue"},
     {x: 89, y: 16, w: 4, h: 11, c: "red"},
     {x: 100, y: 20, w: 1, h: 8, c: "yellow"},
     {x: 101, y: 20, w: 9, h: 8, c: "red"},
     {x: 100, y: 12, w: 18, h: 12, c: "white"},
     {x: 106, y: 17, w: 10, h: 8, c: "blue"},
     {x: 107, y: 15, w: 6, h: 2, c: "yellow"},
     {x: 88, y: 54, w: 8, h: 7, c: "red"},
     {x: 97, y: 54, w: 14, h: 21, c: "blue"},
     {x: 111, y: 46, w: 5, h: 13, c: "red"},
     {x: 103, y: 53, w: 6, h: 6, c: "red"},
     {x: 105, y: 51, w: 2, h: 2, c: "yellow"},
     {x: 85, y: 43, w: 17, h: 19, c: "white"},
     {x: 106, y: 33, w: 7, h: 8, c: "white"},
     {x: 82, y: 39, w: 8, h: 14, c: "red"},
     {x: 92, y: 42, w: 3, h: 14, c: "blue"},
     {x: 87, y: 42, w: 1, h: 17, c: "yellow"},
     {x: 90, y: 42, w: 1, h: 17, c: "yellow"},
     {x: 102, y: 33, w: 4, h: 9, c: "yellow"},
     {x: 81, y: 25, w: 33, h: 3, c: "yellow"},
     {x: 84, y: 47, w: 13, h: 4, c: "yellow"},
     {x: 83, y: 66, w: 22, h: 9, c: "blue"},
     {x: 107, y: 67, w: 9, h: 10, c: "white"},
     {x: 81, y: 75, w: 19, h: 13, c: "white"},
     {x: 90, y: 71, w: 5, h: 9, c: "blue"},
     {x: 83, y: 79, w: 5, h: 8, c: "red"},
     {x: 85, y: 77, w: 3, h: 2, c: "yellow"},
     {x: 87, y: 77, w: 10, h: 3, c: "red"},
     {x: 103, y: 80, w: 9, h: 9, c: "red"},
     {x: 87, y: 57, w: 32, h: 2, c: "yellow"},
     {x: 102, y: 71, w: 16, h: 3, c: "yellow"},
     {x: 104, y: 68, w: 2, h: 11, c: "yellow"},
 
     // Fourth Building (x + 120)
     {x: 122, y: 16, w: 12, h: 15, c: "red"},
     {x: 137, y: 14, w: 11, h: 13, c: "blue"},
     {x: 125, y: 6, w: 5, h: 5, c: "yellow"},
     {x: 142, y: 7, w: 2, h: 6, c: "red"},
     {x: 144, y: 9, w: 5, h: 8, c: "white"},
     {x: 144, y: 7, w: 14, h: 6, c: "blue"},
     {x: 154, y: 6, w: 3, h: 2, c: "yellow"},
     {x: 123, y: 25, w: 9, h: 8, c: "white"},
     {x: 132, y: 27, w: 6, h: 10, c: "blue"},
     {x: 135, y: 22, w: 12, h: 5, c: "white"},
     {x: 148, y: 23, w: 8, h: 6, c: "red"},
     {x: 152, y: 21, w: 3, h: 2, c: "yellow"},
     {x: 128, y: 19, w: 5, h: 3, c: "yellow"},
     {x: 132, y: 35, w: 7, h: 8, c: "blue"},
     {x: 125, y: 31, w: 15, h: 3, c: "red"},
     {x: 126, y: 30, w: 3, h: 1, c: "yellow"},
     {x: 129, y: 33, w: 3, h: 5, c: "blue"},
     {x: 146, y: 32, w: 12, h: 5, c: "red"},
     {x: 147, y: 32, w: 1, h: 15, c: "blue"},
     {x: 155, y: 36, w: 4, h: 8, c: "blue"},
     {x: 156, y: 35, w: 2, h: 2, c: "yellow"},
     {x: 123, y: 36, w: 18, h: 1, c: "yellow"},
     {x: 130, y: 42, w: 6, h: 6, c: "blue"},
     {x: 133, y: 39, w: 8, h: 3, c: "white"},
     {x: 142, y: 62, w: 3, h: 35, c: "red"},
     {x: 143, y: 61, w: 1, h: 3, c: "yellow"},
     {x: 129, y: 48, w: 12, h: 6, c: "blue"},
     {x: 138, y: 60, w: 1, h: 18, c: "white"},
     {x: 139, y: 64, w: 1, h: 14, c: "blue"},
     {x: 140, y: 62, w: 1, h: 14, c: "red"},
     {x: 130, y: 62, w: 5, h: 13, c: "white"},
     {x: 133, y: 54, w: 5, h: 5, c: "red"},
     {x: 146, y: 50, w: 7, h: 8, c: "white"},
     {x: 152, y: 48, w: 2, h: 5, c: "yellow"},
     {x: 144, y: 47, w: 5, h: 4, c: "blue"},
     {x: 145, y: 46, w: 3, h: 1, c: "yellow"},
     {x: 142, y: 51, w: 14, h: 1, c: "yellow"},
     {x: 142, y: 53, w: 3, h: 3, c: "yellow"},
     {x: 146, y: 55, w: 1, h: 4, c: "blue"},
     {x: 147, y: 58, w: 1, h: 7, c: "yellow"},
     {x: 148, y: 57, w: 1, h: 6, c: "white"},
     {x: 149, y: 54, w: 5, h: 3, c: "blue"},
     {x: 151, y: 53, w: 2, h: 1, c: "yellow"}
   ];
   
   activeBlock = possibleBlocks[floor(random(possibleBlocks.length))];
   console.log("Selected block:", activeBlock);
 }

 // Draws a single rectangle with the specified properties
// Handles coordinate conversion and active block highlighting

function drawRect(x, y, w, h, c) {
  // Convert grid coordinates to screen coordinates
  let actualX = x * rectWidth;
  let actualY = windowHeight - y * rectHeight;
  let actualW = w * rectWidth;
  let actualH = h * rectHeight;

 // Check if this is the currently active block
  let isActiveBlock = gameActive && activeBlock && 
    x === activeBlock.x && 
    y === activeBlock.y && 
    w === activeBlock.w && 
    h === activeBlock.h;

 // Make active block blink 
  if (isActiveBlock) {
    let blink = frameCount % 20 < 10 ? 255 : 0;
    fill(blink);
  } else {
    fillColour(c);
  }
  
  rect(actualX, actualY, actualW, actualH);
}

function startGame() {
  gameActive = true;
  scoreDisplay.reset();
  gameTimer = 30;
  lastTime = millis();
  activeBlock = null;
  selectNewActiveBlock();
}

function endGame() {
  gameActive = false;
  activeBlock = null;
}

function drawFirstBuilding() {
  // Bottom layer
  drawRect(24,10,6,10,"white");
  drawRect(14,9,12,9,"red");
  drawRect(16,19,2,12,"red");
  drawRect(7,17,4,17,"white");
  drawRect(12,7,6,7,"white");
  drawRect(1,11,10,11,"blue");
  drawRect(19,20,5,8,"blue");
  drawRect(30,36,6,36,"blue");
  drawRect(33.5,9,1.5,9,"red");
  drawRect(33.5,6,1,1,"yellow");
  drawRect(24,20,8,8,"white");
  drawRect(11,18,1,18,"yellow");
  drawRect(15,12,18,3,"yellow");
  drawRect(35,9,0.25,7,"black");
  drawRect(30,9,0.5,7,"black");
  drawRect(18,7,0.5,5,"black");

  // Middle layer
  drawRect(35,41,4,18,"white");
  drawRect(30,36,6,13,"blue");
  drawRect(36,38,1,15,"yellow");
  drawRect(29,53,2,30,"yellow");
  drawRect(24,50,6,27,"blue");
  drawRect(30,50,0.25,27,"black");
  drawRect(26,42,2,4,"yellow");
  drawRect(7,33,17,11,"white");
  drawRect(28,30,4,7,"red");
  drawRect(30,28,1.5,2.5,"yellow");
  drawRect(4,23,36,3,"yellow");
  drawRect(18,25,2,25,"yellow");
  drawRect(4,20,36,1,"black");
  drawRect(26,38,2,0.5,"black");
  drawRect(20,25,0.5,2,"black");
  drawRect(20,20,0.5,8,"black");
  drawRect(20,8,0.5,6,"black");
  drawRect(15,9,18,1,"black");
  drawRect(32,20,0.5,8,"black");

  // Top layer
  drawRect(4.5,42,6.5,7,"white");
  drawRect(0.5,35,27.5,2,"yellow");
  drawRect(11,48,2,13,"yellow");
  drawRect(16,64,8,29,"red");
  drawRect(20,59,2,5,"yellow");
  drawRect(23.5,59,1.5,36,"yellow");
  drawRect(0.5,33,23,1,"black");
  drawRect(25,33,3,1,"black");
  drawRect(20,54,2,0.5,"black");
  drawRect(37,38,0.5,15,"black");
  drawRect(32,30,0.25,7,"black");
  drawRect(30,25.5,1.5,0.25,"black");

  // Yellow floor
  drawRect(0-40,2,39,2,"yellow");
}

function drawSecondBuilding() {
  
  drawRect(18+40, 4, 23, 4, "red");   
  
  //White
  drawRect(0+40, 7, 27, 3.8, "white");   
  drawRect(0+40, 19, 6, 12, "white");   
  drawRect(0+40, 35, 17, 7, "white");    
  drawRect(33+40, 20, 5, 7, "white");   
  drawRect(24+40, 76, 6, 63, "white"); 
  drawRect(18+40, 72, 1.5, 60, "white");

  // Yellow
  drawRect(3+40, 1.5, 37, 1.5, "yellow");   
  drawRect(0+40, 7, 25, 1, "yellow");   
  drawRect(9+40, 13.5, 20, 2.5, "yellow"); 
  drawRect(1+40, 22, 16, 2, "yellow");  
  drawRect(11+40, 36, 6, 1, "yellow");  
  drawRect(17+40, 69, 1.5, 69, "yellow"); 
  drawRect(20+40, 28, 18, 2.5, "yellow"); 
 
  // Blue
  drawRect(6+40, 69, 6, 47, "blue");
  drawRect(3+40, 11, 3, 4, "blue"); 
  drawRect(7+40, 11, 9, 4, "blue");
  drawRect(22+40, 63, 3, 50, "blue");
  drawRect(32+40, 48, 3, 20, "blue");
  drawRect(18.6+40, 10.5, 10, 3.2, "blue"); 
  drawRect(28+40, 24, 6, 20, "blue"); 

  // Red
  drawRect(14+40, 69, 3, 33, "red");    
  drawRect(0+40, 19, 15, 6, "red"); 
  drawRect(20+40, 66, 2, 45, "red");
  drawRect(28+40, 38, 4, 10, "red");    

  // Other Yellow
  drawRect(7.5+40, 66, 3, 6, "yellow"); 
  drawRect(9+40, 32, 5, 10, "yellow");
  drawRect(12+40, 18, 2, 4, "yellow"); 
  drawRect(28.5+40, 37, 3, 2, "yellow"); 
  drawRect(29.5+40, 9, 3, 5, "yellow");

  // black shadows
  drawRect(13+40, 32, 1, 10, "black");  
  drawRect(15+40, 19, 0.5, 6, "black"); 
  drawRect(15+40, 11, 1, 4, "black"); 
  drawRect(17+40, 69, 0.5, 33, "black");
  drawRect(19+40.5, 72, 0.5, 51, "black");
  drawRect(25+40, 63, 0.5, 50, "black");
  drawRect(35+40, 48, 0.5, 20, "black");
  drawRect(33+40, 24, 1, 20, "black");
  drawRect(0+40, 6, 19, 0.5, "black");
}


function drawThirdBuilding() {
  
  // Bottom layer
  drawRect(6+80, 20, 3, 20, "white");
  drawRect(4+80, 20, 2, 20, "yellow");
  drawRect(2+80, 8, 5, 5, "blue");
  drawRect(8+80, 20, 12, 20, "blue");
  drawRect(9+80, 16, 4, 11, "red");
  drawRect(20+80, 20, 1, 8, "yellow");
  drawRect(21+80, 20, 9, 8, "red");
  drawRect(20+80, 12, 18, 12, "white");
  drawRect(26+80, 17, 10, 8, "blue");
  drawRect(27+80, 15, 6, 2, "yellow");
  drawRect(1+80, 22, 33, 2, "black");
  drawRect(19+80, 20, 1, 20, "black");

  // Middle layer
  drawRect(8+80, 54, 8, 7, "red");
  drawRect(17+80, 54, 14, 21, "blue");
  drawRect(31+80, 46, 5, 13, "red");
  drawRect(23+80, 53, 6, 6, "red");
  drawRect(25+80, 51, 2, 2, "yellow");
  drawRect(5+80, 43, 17, 19, "white");
  drawRect(26+80, 33, 7, 8, "white");
  drawRect(2+80, 39, 8, 14, "red");
  drawRect(12+80, 42, 3, 14, "blue");
  drawRect(7+80, 42, 1, 17, "yellow");
  drawRect(10+80, 42, 1, 17, "yellow");
  drawRect(22+80, 33, 4, 9, "yellow");
  drawRect(1+80, 25, 33, 3, "yellow");
  drawRect(16+80, 54, 1, 7, "black");
  drawRect(7+80, 55, 32, 1, "black");
  drawRect(4+80, 43, 13, 1, "black");
  drawRect(4+80, 47, 13, 4, "yellow");

  // Top layer
  drawRect(3+80, 66, 22, 9, "blue");
  drawRect(27+80, 67, 9, 10, "white");
  drawRect(1+80, 75, 19, 13, "white");
  drawRect(10+80, 71, 5, 9, "blue");
  drawRect(3+80, 79, 5, 8, "red");
  drawRect(5+80, 77, 3, 2, "yellow");
  drawRect(7+80, 77, 10, 3, "red");
  drawRect(23+80, 80, 9, 9, "red");
  drawRect(22+80, 68, 16, 1, "black");
  drawRect(7+80, 57, 32, 2, "yellow");
  drawRect(22+80, 71, 16, 3, "yellow");
  drawRect(24+80, 68, 2, 11, "yellow");
  
  // Yellow floor
  drawRect(0+80, 3, 40, 3, "yellow");

}

function drawFourthBuilding() {

  //bottom layer
  drawRect(2+120, 16, 12, 15, "red");
  drawRect(17+120, 14, 11, 13, "blue");
  drawRect(81+120, 8, 18, 7, "white");
  drawRect(5+120, 6, 5, 5, "yellow");
  drawRect(22+120, 7, 2, 6, "red");
  drawRect(24+120, 9, 5, 8, "white");
  drawRect(24+120, 7, 14, 6, "blue");
  drawRect(34+120, 6, 3, 2, "yellow");

  //second layer
  drawRect(3+120, 25, 9, 8, "white");
  drawRect(12+120, 27, 6, 10, "blue");
  drawRect(15+120, 22, 12, 5, "white");
  drawRect(28+120, 23, 8, 6, "red");
  drawRect(32+120, 21, 3, 2, "yellow");
  drawRect(8+120, 19, 5, 3, "yellow");


  //third layer
  drawRect(12+120, 35, 7, 8, "blue");
  drawRect(5+120, 31, 15, 3, "red");
  drawRect(6+120, 30, 3, 1, "yellow");
  drawRect(9+120, 33, 3, 5, "blue");
  drawRect(26+120, 32, 12, 5, "red");
  drawRect(27+120, 32, 1, 15, "blue");
  drawRect(27+120, 32.5, 15, 0.5, "yellow");
  drawRect(35+120, 36, 4, 8, "blue");
  drawRect(36+120, 35, 2, 2, "yellow");
  drawRect(3+120, 36, 18, 1, "yellow");
  drawRect(10+120, 42, 6, 6, "blue");
  drawRect(13+120, 39, 8, 3, "white");
  drawRect(22+120, 62, 3, 35, "red"); 
  drawRect(23+120, 61, 1, 3, "yellow");

  //forth layer
  drawRect(9+120, 48, 12, 6, "blue");
  drawRect(18+120, 60, 1, 18, "white");
  drawRect(19+120, 64, 1, 14, "blue");
  drawRect(20+120, 62, 1, 14, "red");
  drawRect(2+120, 49, 16, 1, "yellow");
  drawRect(10+120, 62, 5, 13, "white");
  drawRect(13+120, 54, 5, 5, "red");
  drawRect(26+120, 50, 7, 8, "white");
  drawRect(32+120, 48, 2, 5, "yellow");
  drawRect(24+120, 47, 5, 4, "blue");
  drawRect(25+120, 46, 3, 1, "yellow");
  drawRect(22+120, 51, 14, 1, "yellow");
  drawRect(22+120, 53, 3, 3, "yellow");
  drawRect(26+120, 55, 1, 4, "blue");
  drawRect(27+120, 58, 1, 7, "yellow");
  drawRect(28+120, 57, 1, 6, "white");
  drawRect(29+120, 54, 5, 3, "blue");
  drawRect(31+120, 53, 2, 1, "yellow");


  //shadow
  drawRect(2+120, 16, 12, 0.5, "black");
  drawRect(2+120, 16, 12, 0.5, "black");
  drawRect(10+120, 6, 0.5, 5, "black");
  drawRect(12+120, 25, 0.5, 6, "black");
  drawRect(28+120, 23, 0.5, 6, "black");
  drawRect(14+120, 35, 0.5, 18, "black");
  drawRect(27+120, 32, 0.5, 15, "black");
  drawRect(27+120, 14, 0.5, 12, "black");
  drawRect(14+120, 27, 4, 0.5, "black");
  drawRect(27+120, 32, 8, 0.5, "black");
  drawRect(10+120, 42, 6, 0.5, "black");
  drawRect(22+120, 42, 0.5, 15, "black");
  drawRect(22+120, 42, 3, 0.5, "black");
  drawRect(9+120, 48, 9, 0.5, "black");
  drawRect(9+120, 48, 9, 0.5, "black");

  //yellow floor
  drawRect(0+120, 3, 40, 2, "yellow");
  drawRect(0+120, 17, 35, 1, "yellow");
  drawRect(0+120, 28, 40, 1, "yellow");
  drawRect(12+120, 35, 2, 18, "yellow");
  drawRect(25+120, 36, 2, 34, "yellow");
  drawRect(7+120, 43, 31, 1, "yellow");
  drawRect(21+120, 68, 1, 40, "yellow");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  
  secondSegWidth = width/4;  
  minHeight = height/4;
  maxHeight = height - minHeight;
  rectWidth = secondSegWidth/40;
  rectHeight = maxHeight/80;
}

function draw() {
  background(220);

// Main game loop
// Updates game state and draws all elements  
  if (gameActive) {
    let currentTime = millis();
    if (currentTime - lastTime >= 1000) {
      gameTimer--;
      lastTime = currentTime;
      if (gameTimer <= 0) {
        endGame();
      }
    }
  }
  
  drawFirstBuilding();
  drawSecondBuilding();
  drawThirdBuilding();
  drawFourthBuilding();

  // Yellow floor
  fillColour("yellow");
  rect(0, height-rectHeight*2, width, rectHeight*2);


  if (gameActive) {
    scoreDisplay.show();
    text(`Time: ${gameTimer}`, 20, 90);
  } else {

    textAlign(CENTER);
    textSize(32);
    text(`Game Over!`, width/2, 120);

    textAlign(LEFT);
    textSize(24);
    scoreDisplay.show();
    text(`Click anywhere to start`, 20, 120);
  }
    textAlign(RIGHT);
    textSize(24);
    text(`Find and click the blinking blocks to score!`, width - 40, 40);
  }

  
// This function writing supported by AI tool
// Mouse interaction handling
// Detects clicks on the active block with a certain tolerance

function mousePressed() {
  // Start game if not active
  if (!gameActive) {
    startGame();
    return;
  }
  // Check for clicks on active block
  if (activeBlock) {
    let actualX = activeBlock.x * rectWidth;
    let actualY = windowHeight - activeBlock.y * rectHeight;
    let actualW = activeBlock.w * rectWidth;
    let actualH = activeBlock.h * rectHeight;
    
    let tolerance = 8;
    
    if (mouseX >= actualX - tolerance && 
        mouseX <= actualX + actualW + tolerance &&
        mouseY >= actualY - tolerance && 
        mouseY <= actualY + actualH + tolerance) {

      scoreDisplay.addScore();
      selectNewActiveBlock();
    }
  }
}
  
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
    
    secondSegWidth = windowWidth/4;
    minHeight = windowHeight/4;
    maxHeight = windowHeight - minHeight;
    rectWidth = secondSegWidth/40;
    rectHeight = maxHeight/80;
  }