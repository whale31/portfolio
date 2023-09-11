var w = 400;
var h = 400;
var marginSide = 20;
var marginTop = 20;
var blockNumX = 20;
var blockNumY = 10;
var blockW = (w - marginSide * 2) / blockNumX;
var blockH = (w / 2 - marginTop * 2) / blockNumY;
var blocks = new Array(blockNumX * blockNumY);
var blockCount = blockNumX * blockNumY;
var ball;
var gameStatus;
var ballR = 5;
var barLength = 50;
var barHeight = 10;

function setup() {
  createCanvas(w, h);
  reset();
}

function draw() {
  background(198, 243, 253);
  fill(255);
  for(i = 0 ;i < blocks.length;i++){
    block = blocks[i];
    if(block[2]){
      rect(block[0], block[1], blockW, blockH);
    }
  }

  ellipse(ball[0], ball[1], ballR * 2);
  ball = [ball[0] + ball[2], ball[1] + ball[3], ball[2], ball[3]];

  rect(mouseX - barLength / 2, h - barHeight, barLength, barHeight);

  checkCollision();

  ckeckGameStatus();

  if(gameStatus === "end"){
    background(0);
    noLoop();
    fill(255);
    rect(w/2-50, h/2-50, 100, 80);
    fill(0);
    text("GAME OVER", w/ 2- 40, h/ 2 -15);
    text("Click Restart", w/ 2- 40, h/ 2 + 5);
  }

}

function ckeckGameStatus(){
  if(ball[1] > h || blockCount === 0){
    gameStatus = "end"
  }
}

function mousePressed(){
  if(gameStatus === "end"){
    reset();
  }
}

function reset(){
  for(y = 0; y < blockNumY; y++){
    for(x = 0; x < blockNumX; x++){
      blocks[y * blockNumX + x] = [marginSide + x * blockW, marginTop + y * blockH, true];
    }
  }
  var v = random();
  var u = sqrt(1 - v * v);
  ball = [random(w), h / 2 + 20, v * 5 - 2.5, u * 5 - 2.5];
  gameStatus = "ready";
  loop();
}

function checkCollision(){
  if(ball[0] < ballR || ball[0] > w - ballR || ball[1] < ballR){
    checkCollisionWall();
  }else if(ball[1] > h - ballR){
    checkCollisionBar();
  }else if(ball[1] < h / 2){
    checkCollisionBlock();
  }
}

function checkCollisionBlock(){
  var xnum = int((ball[0] - marginSide) / blockW);
  var ynum = int((ball[1] - marginTop) / blockH);
  var pre_xnum = int((ball[0] - ball[2] - marginSide) / blockW);
  var pre_ynum = int((ball[1] - ball[3] - marginTop) / blockH);
  var block = blocks[ynum * blockNumX + xnum];
  if(ynum > blockNumY - 1 || xnum > blockNumX - 1 ){
    return false;
  }
  if(block && block[2]){
    if(xnum !== pre_xnum){
      reverseX();
    }else if(ynum !== pre_ynum){
      reverseY();
    }
    block[2] = false;
    blockCount--;
  }
}

function checkCollisionBar(){
  var barLeft = mouseX - barLength / 2;
  var barRight = mouseX + barLength / 2;
  if(ball[0] > barLeft && ball[0] < barRight && h - (barHeight + ballR * 2) < ball[1]){
    reverseY();
  }
}

function checkCollisionWall(){
  if(ball[0] < ballR || ball[0] > w - ballR){
    reverseX();
  }else{ // ball[1] < ballR
    reverseY();
  }
}

function reverseX(){
  ball[0] = ball[0] - ball[2];
  ball[2] = -ball[2];
}

function reverseY(){
  ball[1] = ball[1] - ball[3];
  ball[3] = -ball[3];
}