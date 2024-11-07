// Global variables 
let secondSegStart;
let secondSegWidth;
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
    // Red blocks
    {x: 18, y: 4, w: 23, h: 4, c: "red"},
    {x: 14, y: 69, w: 3, h: 33, c: "red"},
    {x: 0, y: 19, w: 15, h: 6, c: "red"},
    {x: 20, y: 66, w: 2, h: 45, c: "red"},
    {x: 28, y: 38, w: 4, h: 10, c: "red"},
    
    // Blue blocks
    {x: 6, y: 69, w: 6, h: 47, c: "blue"},
    {x: 3, y: 11, w: 3, h: 4, c: "blue"},
    {x: 7, y: 11, w: 9, h: 4, c: "blue"},
    {x: 22, y: 63, w: 3, h: 50, c: "blue"},
    {x: 32, y: 48, w: 3, h: 20, c: "blue"},
    {x: 18.6, y: 10.5, w: 10, h: 3.2, c: "blue"},
    {x: 28, y: 24, w: 6, h: 20, c: "blue"},
    
    // Yellow blocks
    {x: 3, y: 1.5, w: 37, h: 1.5, c: "yellow"},
    {x: 0, y: 7, w: 25, h: 1, c: "yellow"},
    {x: 9, y: 13.5, w: 20, h: 2.5, c: "yellow"},
    {x: 1, y: 22, w: 16, h: 2, c: "yellow"},
    {x: 11, y: 36, w: 6, h: 1, c: "yellow"},
    {x: 17, y: 69, w: 1.5, h: 69, c: "yellow"},
    {x: 20, y: 28, w: 18, h: 2.5, c: "yellow"},
    {x: 7.5, y: 66, w: 3, h: 6, c: "yellow"},
    {x: 9, y: 32, w: 5, h: 10, c: "yellow"},
    {x: 12, y: 18, w: 2, h: 4, c: "yellow"},
    {x: 28.5, y: 37, w: 3, h: 2, c: "yellow"},
    {x: 29.5, y: 9, w: 3, h: 5, c: "yellow"}
  ];
  
  activeBlock = possibleBlocks[floor(random(possibleBlocks.length))];
  // console.log("Selected new block:", activeBlock);
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
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  
  secondSegStart = width/4;  
  secondSegWidth = width/2 - secondSegStart;  
  
  
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
  
  drawSecondBuilding();
  
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
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
  secondSegStart = windowWidth/4;
  secondSegWidth = windowWidth/2 - secondSegStart;
  minHeight = windowHeight/4;
  maxHeight = windowHeight - minHeight;
  rectWidth = secondSegWidth/40;
  rectHeight = maxHeight/80;
}