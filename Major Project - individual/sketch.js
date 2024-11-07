// Global variables 
let secondSegStart;
let secondSegWidth;
let thirdSegStart;
let thirdSegWidth;
let fourthSegStart;
let fourthSegWidth;
let minHeight;
let maxHeight;
let rectWidth;
let rectHeight;
let red = [206, 29, 29];
let blue = [21, 33, 173];
let yellow = [255, 196, 31];


let activeBlock = null;  
let score = 0;          
let gameTimer = 30;     
let gameActive = false; 
let lastTime = 0;      
let highScore = 0;     

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

function selectNewActiveBlock() {
  const possibleBlocks = [
    // First Building
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
    
        // Second Building
        {x: 18, y: 4, w: 23, h: 4, c: "red"},
        {x: 0, y: 7, w: 27, h: 3.8, c: "white"},
        {x: 0, y: 19, w: 6, h: 12, c: "white"},
        {x: 0, y: 35, w: 17, h: 7, c: "white"},
        {x: 33, y: 20, w: 5, h: 7, c: "white"},
        {x: 24, y: 76, w: 6, h: 63, c: "white"},
        {x: 18, y: 72, w: 1.5, h: 60, c: "white"},
        {x: 3, y: 1.5, w: 37, h: 1.5, c: "yellow"},
        {x: 0, y: 7, w: 25, h: 1, c: "yellow"},
        {x: 9, y: 13.5, w: 20, h: 2.5, c: "yellow"},
        {x: 1, y: 22, w: 16, h: 2, c: "yellow"},
        {x: 11, y: 36, w: 6, h: 1, c: "yellow"},
        {x: 17, y: 69, w: 1.5, h: 69, c: "yellow"},
        {x: 20, y: 28, w: 18, h: 2.5, c: "yellow"},
        {x: 6, y: 69, w: 6, h: 47, c: "blue"},
        {x: 3, y: 11, w: 3, h: 4, c: "blue"},
        {x: 7, y: 11, w: 9, h: 4, c: "blue"},
        {x: 22, y: 63, w: 3, h: 50, c: "blue"},
        {x: 32, y: 48, w: 3, h: 20, c: "blue"},
        {x: 18.6, y: 10.5, w: 10, h: 3.2, c: "blue"},
        {x: 28, y: 24, w: 6, h: 20, c: "blue"},
        {x: 14, y: 69, w: 3, h: 33, c: "red"},
        {x: 0, y: 19, w: 15, h: 6, c: "red"},
        {x: 20, y: 66, w: 2, h: 45, c: "red"},
        {x: 28, y: 38, w: 4, h: 10, c: "red"},
        {x: 7.5, y: 66, w: 3, h: 6, c: "yellow"},
        {x: 9, y: 32, w: 5, h: 10, c: "yellow"},
        {x: 12, y: 18, w: 2, h: 4, c: "yellow"},
        {x: 28.5, y: 37, w: 3, h: 2, c: "yellow"},
        {x: 29.5, y: 9, w: 3, h: 5, c: "yellow"},
    
        // Third Building
        {x: 6, y: 20, w: 3, h: 20, c: "white"},
        {x: 4, y: 20, w: 2, h: 20, c: "yellow"},
        {x: 2, y: 8, w: 5, h: 5, c: "blue"},
        {x: 8, y: 20, w: 12, h: 20, c: "blue"},
        {x: 9, y: 16, w: 4, h: 11, c: "red"},
        {x: 20, y: 20, w: 1, h: 8, c: "yellow"},
        {x: 21, y: 20, w: 9, h: 8, c: "red"},
        {x: 20, y: 12, w: 18, h: 12, c: "white"},
        {x: 26, y: 17, w: 10, h: 8, c: "blue"},
        {x: 27, y: 15, w: 6, h: 2, c: "yellow"},
        {x: 8, y: 54, w: 8, h: 7, c: "red"},
        {x: 17, y: 54, w: 14, h: 21, c: "blue"},
        {x: 31, y: 46, w: 5, h: 13, c: "red"},
        {x: 23, y: 53, w: 6, h: 6, c: "red"},
        {x: 25, y: 51, w: 2, h: 2, c: "yellow"},
        {x: 5, y: 43, w: 17, h: 19, c: "white"},
        {x: 26, y: 33, w: 7, h: 8, c: "white"},
        {x: 2, y: 39, w: 8, h: 14, c: "red"},
        {x: 12, y: 42, w: 3, h: 14, c: "blue"},
        {x: 7, y: 42, w: 1, h: 17, c: "yellow"},
        {x: 10, y: 42, w: 1, h: 17, c: "yellow"},
        {x: 22, y: 33, w: 4, h: 9, c: "yellow"},
        {x: 1, y: 25, w: 33, h: 3, c: "yellow"},
        {x: 4, y: 47, w: 13, h: 4, c: "yellow"},
        {x: 3, y: 66, w: 22, h: 9, c: "blue"},
        {x: 27, y: 67, w: 9, h: 10, c: "white"},
        {x: 1, y: 75, w: 19, h: 13, c: "white"},
        {x: 10, y: 71, w: 5, h: 9, c: "blue"},
        {x: 3, y: 79, w: 5, h: 8, c: "red"},
        {x: 5, y: 77, w: 3, h: 2, c: "yellow"},
        {x: 7, y: 77, w: 10, h: 3, c: "red"},
        {x: 23, y: 80, w: 9, h: 9, c: "red"},
        {x: 7, y: 57, w: 32, h: 2, c: "yellow"},
        {x: 22, y: 71, w: 16, h: 3, c: "yellow"},
        {x: 24, y: 68, w: 2, h: 11, c: "yellow"},
    
        // Fourth Building
        {x: 2, y: 16, w: 12, h: 15, c: "red"},
        {x: 17, y: 14, w: 11, h: 13, c: "blue"},
        {x: 8, y: 8, w: 18, h: 7, c: "white"},
        {x: 5, y: 6, w: 5, h: 5, c: "yellow"},
        {x: 22, y: 7, w: 2, h: 6, c: "red"},
        {x: 24, y: 9, w: 5, h: 8, c: "white"},
        {x: 24, y: 7, w: 14, h: 6, c: "blue"},
        {x: 34, y: 6, w: 3, h: 2, c: "yellow"},
        {x: 3, y: 25, w: 9, h: 8, c: "white"},
        {x: 12, y: 27, w: 6, h: 10, c: "blue"},
        {x: 15, y: 22, w: 12, h: 5, c: "white"},
        {x: 28, y: 23, w: 8, h: 6, c: "red"},
        {x: 32, y: 21, w: 3, h: 2, c: "yellow"},
        {x: 8, y: 19, w: 5, h: 3, c: "yellow"},
        {x: 12, y: 35, w: 7, h: 8, c: "blue"},
        {x: 5, y: 31, w: 15, h: 3, c: "red"},
        {x: 6, y: 30, w: 3, h: 1, c: "yellow"},
        {x: 9, y: 33, w: 3, h: 5, c: "blue"},
        {x: 26, y: 32, w: 12, h: 5, c: "red"},
        {x: 27, y: 32, w: 1, h: 15, c: "blue"},
        {x: 35, y: 36, w: 4, h: 8, c: "blue"},
        {x: 36, y: 35, w: 2, h: 2, c: "yellow"},
        {x: 3, y: 36, w: 18, h: 1, c: "yellow"},
        {x: 10, y: 42, w: 6, h: 6, c: "blue"},
        {x: 13, y: 39, w: 8, h: 3, c: "white"},
        {x: 22, y: 62, w: 3, h: 35, c: "red"},
        {x: 23, y: 61, w: 1, h: 3, c: "yellow"},
        {x: 9, y: 48, w: 12, h: 6, c: "blue"},
        {x: 18, y: 60, w: 1, h: 18, c: "white"},
        {x: 19, y: 64, w: 1, h: 14, c: "blue"},
        {x: 20, y: 62, w: 1, h: 14, c: "red"},
        {x: 10, y: 62, w: 5, h: 13, c: "white"},
        {x: 13, y: 54, w: 5, h: 5, c: "red"},
        {x: 26, y: 50, w: 7, h: 8, c: "white"},
        {x: 32, y: 48, w: 2, h: 5, c: "yellow"},
        {x: 24, y: 47, w: 5, h: 4, c: "blue"},
        {x: 25, y: 46, w: 3, h: 1, c: "yellow"},
        {x: 22, y: 51, w: 14, h: 1, c: "yellow"},
        {x: 22, y: 53, w: 3, h: 3, c: "yellow"},
        {x: 26, y: 55, w: 1, h: 4, c: "blue"},
        {x: 27, y: 58, w: 1, h: 7, c: "yellow"},
        {x: 28, y: 57, w: 1, h: 6, c: "white"},
        {x: 29, y: 54, w: 5, h: 3, c: "blue"},
        {x: 31, y: 53, w: 2, h: 1, c: "yellow"}
      ];
      
      activeBlock = possibleBlocks[floor(random(possibleBlocks.length))];
    }


function drawRect(x, y, w, h, c) {

  let isActiveBlock = gameActive && activeBlock && 
    x === activeBlock.x && 
    y === activeBlock.y && 
    w === activeBlock.w && 
    h === activeBlock.h;
  
  if (isActiveBlock) {
    let blink;
if (frameCount % 20 < 10) {
    blink = 255;
} else {
    blink = 0;
}
    fill(blink);
  } else {
    fillColour(c);
  }
  
  rect(x * rectWidth, windowHeight - y * rectHeight, w * rectWidth, h * rectHeight);
}

function startGame() {
  console.log("Starting new game");
  gameActive = true;
  score = 0;
  gameTimer = 30;
  lastTime = millis();
  activeBlock = null;
  selectNewActiveBlock();
}

function endGame() {
  gameActive = false;
  highScore = max(score, highScore);
  activeBlock = null;
}

//This function writing is supported by AI tool

function mousePressed() {
  if (!gameActive) {
    startGame();
    return;
  }
  
  if (activeBlock) {
    let actualX = activeBlock.x * rectWidth + secondSegStart;
    let actualY = windowHeight - activeBlock.y * rectHeight;
    let actualW = activeBlock.w * rectWidth;
    let actualH = activeBlock.h * rectHeight;
    
    let tolerance = 10;
    
    if (mouseX >= actualX - tolerance && 
        mouseX <= actualX + actualW + tolerance &&
        mouseY >= actualY - tolerance && 
        mouseY <= actualY + actualH + tolerance) {

      score++;
      selectNewActiveBlock();
    }
  }
}

function drawFirstBuilding() {
  push();
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
  drawRect(0,2,39,2,"yellow");
  pop();
}

function drawSecondBuilding() {
  push();
  translate(secondSegStart, 0);
  
  drawRect(18, 4, 23, 4, "red");   
  
  //White
  drawRect(0, 7, 27, 3.8, "white");   
  drawRect(0, 19, 6, 12, "white");   
  drawRect(0, 35, 17, 7, "white");    
  drawRect(33, 20, 5, 7, "white");   
  drawRect(24, 76, 6, 63, "white"); 
  drawRect(18, 72, 1.5, 60, "white");

  // Yellow
  drawRect(3, 1.5, 37, 1.5, "yellow");   
  drawRect(0, 7, 25, 1, "yellow");   
  drawRect(9, 13.5, 20, 2.5, "yellow"); 
  drawRect(1, 22, 16, 2, "yellow");  
  drawRect(11, 36, 6, 1, "yellow");  
  drawRect(17, 69, 1.5, 69, "yellow"); 
  drawRect(20, 28, 18, 2.5, "yellow"); 
 
  // Blue
  drawRect(6, 69, 6, 47, "blue");
  drawRect(3, 11, 3, 4, "blue"); 
  drawRect(7, 11, 9, 4, "blue");
  drawRect(22, 63, 3, 50, "blue");
  drawRect(32, 48, 3, 20, "blue");
  drawRect(18.6, 10.5, 10, 3.2, "blue"); 
  drawRect(28, 24, 6, 20, "blue"); 

  // Red
  drawRect(14, 69, 3, 33, "red");    
  drawRect(0, 19, 15, 6, "red"); 
  drawRect(20, 66, 2, 45, "red");
  drawRect(28, 38, 4, 10, "red");    

  // Other Yellow
  drawRect(7.5, 66, 3, 6, "yellow"); 
  drawRect(9, 32, 5, 10, "yellow");
  drawRect(12, 18, 2, 4, "yellow"); 
  drawRect(28.5, 37, 3, 2, "yellow"); 
  drawRect(29.5, 9, 3, 5, "yellow");

  // black shadows
  drawRect(13, 32, 1, 10, "black");  
  drawRect(15, 19, 0.5, 6, "black"); 
  drawRect(15, 11, 1, 4, "black"); 
  drawRect(17, 69, 0.5, 33, "black");
  drawRect(19.5, 72, 0.5, 51, "black");
  drawRect(25, 63, 0.5, 50, "black");
  drawRect(35, 48, 0.5, 20, "black");
  drawRect(33, 24, 1, 20, "black");
  drawRect(0, 6, 19, 0.5, "black");

  pop();
}

function drawThirdBuilding() {
  push();
  translate(thirdSegStart, 0);
  
  // Bottom layer
  drawRect(6, 20, 3, 20, "white");
  drawRect(4, 20, 2, 20, "yellow");
  drawRect(2, 8, 5, 5, "blue");
  drawRect(8, 20, 12, 20, "blue");
  drawRect(9, 16, 4, 11, "red");
  drawRect(20, 20, 1, 8, "yellow");
  drawRect(21, 20, 9, 8, "red");
  drawRect(20, 12, 18, 12, "white");
  drawRect(26, 17, 10, 8, "blue");
  drawRect(27, 15, 6, 2, "yellow");
  drawRect(1, 22, 33, 2, "black");
  drawRect(19, 20, 1, 20, "black");

  // Middle layer
  drawRect(8, 54, 8, 7, "red");
  drawRect(17, 54, 14, 21, "blue");
  drawRect(31, 46, 5, 13, "red");
  drawRect(23, 53, 6, 6, "red");
  drawRect(25, 51, 2, 2, "yellow");
  drawRect(5, 43, 17, 19, "white");
  drawRect(26, 33, 7, 8, "white");
  drawRect(2, 39, 8, 14, "red");
  drawRect(12, 42, 3, 14, "blue");
  drawRect(7, 42, 1, 17, "yellow");
  drawRect(10, 42, 1, 17, "yellow");
  drawRect(22, 33, 4, 9, "yellow");
  drawRect(1, 25, 33, 3, "yellow");
  drawRect(16, 54, 1, 7, "black");
  drawRect(7, 55, 32, 1, "black");
  drawRect(4, 43, 13, 1, "black");
  drawRect(4, 47, 13, 4, "yellow");

  // Top layer
  drawRect(3, 66, 22, 9, "blue");
  drawRect(27, 67, 9, 10, "white");
  drawRect(1, 75, 19, 13, "white");
  drawRect(10, 71, 5, 9, "blue");
  drawRect(3, 79, 5, 8, "red");
  drawRect(5, 77, 3, 2, "yellow");
  drawRect(7, 77, 10, 3, "red");
  drawRect(23, 80, 9, 9, "red");
  drawRect(22, 68, 16, 1, "black");
  drawRect(7, 57, 32, 2, "yellow");
  drawRect(22, 71, 16, 3, "yellow");
  drawRect(24, 68, 2, 11, "yellow");
  
  // Yellow floor
  drawRect(0, 3, 40, 3, "yellow");
  
  pop();
}

function drawFourthBuilding() {
  push();

  translate(fourthSegStart, 0); // sets start of canvas to fourth quarter of the screen

  //bottom layer
  drawRect(2, 16, 12, 15, "red");
  drawRect(17, 14, 11, 13, "blue");
  drawRect(8, 8, 18, 7, "white");
  drawRect(5, 6, 5, 5, "yellow");
  drawRect(22, 7, 2, 6, "red");
  drawRect(24, 9, 5, 8, "white");
  drawRect(24, 7, 14, 6, "blue");
  drawRect(34, 6, 3, 2, "yellow");

  //second layer
  drawRect(3, 25, 9, 8, "white");
  drawRect(12, 27, 6, 10, "blue");
  drawRect(15, 22, 12, 5, "white");
  drawRect(28, 23, 8, 6, "red");
  drawRect(32, 21, 3, 2, "yellow");
  drawRect(8, 19, 5, 3, "yellow");


  //third layer
  drawRect(12, 35, 7, 8, "blue");
  drawRect(5, 31, 15, 3, "red");
  drawRect(6, 30, 3, 1, "yellow");
  drawRect(9, 33, 3, 5, "blue");
  drawRect(26, 32, 12, 5, "red");
  drawRect(27, 32, 1, 15, "blue");
  drawRect(27, 32.5, 15, 0.5, "yellow");
  drawRect(35, 36, 4, 8, "blue");
  drawRect(36, 35, 2, 2, "yellow");
  drawRect(3, 36, 18, 1, "yellow");
  drawRect(10, 42, 6, 6, "blue");
  drawRect(13, 39, 8, 3, "white");
  drawRect(22, 62, 3, 35, "red"); 
  drawRect(23, 61, 1, 3, "yellow");

  //forth layer
  drawRect(9, 48, 12, 6, "blue");
  drawRect(18, 60, 1, 18, "white");
  drawRect(19, 64, 1, 14, "blue");
  drawRect(20, 62, 1, 14, "red");
  drawRect(2, 49, 16, 1, "yellow");
  drawRect(10, 62, 5, 13, "white");
  drawRect(13, 54, 5, 5, "red");
  drawRect(26, 50, 7, 8, "white");
  drawRect(32, 48, 2, 5, "yellow");
  drawRect(24, 47, 5, 4, "blue");
  drawRect(25, 46, 3, 1, "yellow");
  drawRect(22, 51, 14, 1, "yellow");
  drawRect(22, 53, 3, 3, "yellow");
  drawRect(26, 55, 1, 4, "blue");
  drawRect(27, 58, 1, 7, "yellow");
  drawRect(28, 57, 1, 6, "white");
  drawRect(29, 54, 5, 3, "blue");
  drawRect(31, 53, 2, 1, "yellow");


  //shadow
  drawRect(2, 16, 12, 0.5, "black");
  drawRect(2, 16, 12, 0.5, "black");
  drawRect(10, 6, 0.5, 5, "black");
  drawRect(12, 25, 0.5, 6, "black");
  drawRect(28, 23, 0.5, 6, "black");
  drawRect(14, 35, 0.5, 18, "black");
  drawRect(27, 32, 0.5, 15, "black");
  drawRect(27, 14, 0.5, 12, "black");
  drawRect(14, 27, 4, 0.5, "black");
  drawRect(27, 32, 8, 0.5, "black");
  drawRect(10, 42, 6, 0.5, "black");
  drawRect(22, 42, 0.5, 15, "black");
  drawRect(22, 42, 3, 0.5, "black");
  drawRect(9, 48, 9, 0.5, "black");
  drawRect(9, 48, 9, 0.5, "black");

  //yellow floor
  drawRect(0, 3, 40, 2, "yellow");
  drawRect(0, 17, 35, 1, "yellow");
  drawRect(0, 28, 40, 1, "yellow");
  drawRect(12, 35, 2, 18, "yellow");
  drawRect(25, 36, 2, 34, "yellow");
  drawRect(7, 43, 31, 1, "yellow");
  drawRect(21, 68, 1, 40, "yellow");

  pop();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  
  secondSegStart = width / 4;  
  secondSegWidth = width / 2 - secondSegStart;  
  thirdSegStart = width / 2;  
  thirdSegWidth = width / 4 * 3 - thirdSegStart;
  fourthSegStart = width / 4 * 3;
  fourthSegWidth = width - fourthSegStart;

  
  minHeight = height/4;
  maxHeight = height - minHeight;
  rectWidth = secondSegWidth/40;
  rectHeight = maxHeight/80;
}

function draw() {
  background(220);
  
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
}
  
  fill(0);
  textSize(24);
  textAlign(LEFT);

  // This score part is inspired by AI tool
  if (gameActive) {
    text(`Score: ${score}`, 20, 30);
    text(`Time: ${gameTimer}`, 20, 60);
  } else {
    text(`Game Over! Final Score: ${score}`, 20, 30);
    text(`High Score: ${highScore}`, 20, 60);
    text(`Click anywhere to start`, 20, 90);
  }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
  secondSegStart = windowWidth / 4;
  secondSegWidth = windowWidth / 2 - secondSegStart;
  thirdSegStart = windowWidth / 2;
  thirdSegWidth = windowWidth / 4 * 3 - thirdSegStart;
  fourthSegStart = width / 4 * 3;
  fourthSegWidth = width - fourthSegStart;

  minHeight = windowHeight/4;
  maxHeight = windowHeight - minHeight;
  rectWidth = secondSegWidth/40;
  rectHeight = maxHeight/80;
}