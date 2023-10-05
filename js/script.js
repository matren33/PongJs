var canvas = document.getElementById("Game");
var ctx = canvas.getContext("2d");

//init variables for game
var gameStarted = false;
var gamePaused = false;

//init variables for player
var sliderX = canvas.width/2;
var sliderY = canvas.height-7.5;
var sliderWidth = 50;
var sliderHeight = 6;
var sliderSpeed = 5;
var sliderColor = "#0095DD";

//init variables for ball
var ballX = canvas.width/2;
var ballY = canvas.height-30;
var ballRadius = 5;
var ballSpeed = 2;
var ballColor = "#0095DD";
var ballDx = ballSpeed;
var ballDy = -ballSpeed;

//fucntion to draw slider
function drawSlider() {
  ctx.beginPath();
  ctx.rect(sliderX, sliderY, sliderWidth, sliderHeight);
  ctx.fillStyle = sliderColor;
  ctx.fill();
  ctx.closePath();
}

//function to draw ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = ballColor;
  ctx.fill();
  ctx.closePath();
}

//function to draw game
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSlider();
  drawBall();
  ballX += ballDx;
  ballY += ballDy;
  if(ballX + ballDx > canvas.width-ballRadius || ballX + ballDx < ballRadius) {
    ballDx = -ballDx;
  }
  if(ballY + ballDy < ballRadius) {
    ballDy = -ballDy;
  } else if(ballY + ballDy > canvas.height-ballRadius) {
    if(ballX > sliderX && ballX < sliderX + sliderWidth) {
      ballDy = -ballDy;
      ballSpeed += 0.5;
    } else {
      //custom lose screen on canvas
      ctx.font = "15px Arial";
      ctx.fillStyle = "red";
      //center text
      ctx.textAlign = "center";
      ctx.fillText("Partie perdue !", canvas.width/2, canvas.height/2);
      ctx.fillText("Appuyez sur F5 pour recommencer", canvas.width/2, canvas.height/2+20);
      //stop game
      stopGame();
    }
  }
  if(rightPressed && sliderX < canvas.width-sliderWidth) {
    sliderX += sliderSpeed;
  }
  else if(leftPressed && sliderX > 0) {
    sliderX -= sliderSpeed;
  }
}

//function to start game
function startGame() {
  gameStarted = true;
  interval = setInterval(draw, 10);
}

//function to stop game
function stopGame() {
  gameStarted = false;
  clearInterval(interval);
}

//function to restart game
function restartGame() {
  document.location.reload();
  clearInterval(interval);
}

//function to move mouse where is mouse on canvas
function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width) {
    sliderX = relativeX - sliderWidth/2;
  }
}

//event listeners
document.addEventListener("mousemove", mouseMoveHandler, false);

//start game
startGame();

//set to pause / resume when click
canvas.addEventListener("click", function() {
  if(gamePaused) {
    gamePaused = false;
    startGame();
  } else {
    //check if game is started
    if(gameStarted) {
      //write pause on canvas
      ctx.font = "15px Arial";
      ctx.fillStyle = "red";
      //center text
      ctx.textAlign = "center";
      ctx.fillText("Partie en pause", canvas.width/2, canvas.height/2);
      gamePaused = true;
      stopGame();
    }
  }
});

//fullscreen #fullscreen button
var fullscreen = document.getElementById("fullscreen");

fullscreen.addEventListener("click", function() {
  if(canvas.webkitRequestFullScreen) {
    canvas.webkitRequestFullScreen();
  }
  else {
    canvas.mozRequestFullScreen();
  }
});