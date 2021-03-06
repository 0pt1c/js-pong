  var canvas = document.getElementById("gameCanvas");
  var ctx = canvas.getContext("2d");

  var x = canvas.width/2;
  var y = canvas.height-30;
  var dx = 1.5;
  var dy = -1.5;
  var ballRadius = 10;
  var ballColor = "#0095DD"

  var paddleHeight = 10;
  var paddleWidth = 75;
  var paddleX = (canvas.width-paddleWidth) / 2;

  var rightPressed = false;
  var leftPressed = false;

  function getRandomColor() {
    ballColor = '#' + (0x1000000 + Math.floor(Math.random() * 0x1000000)).toString(16).substr(1);
  }

  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
  }

  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    x += dx;
    y += dy;

    if(y + dy < ballRadius) {
      dy = -dy;
      getRandomColor();
    } else if(y + dy > canvas.height-ballRadius) {
      if(x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
        getRandomColor();
        dx = dx * 1.1
        dy = dy * 1.1
      }
      else {
        alert("GAME OVER");
        document.location.reload();
        clearInterval(interval); // Needed for Chrome to end game
      }
    }

    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
      dx = -dx;
      getRandomColor();
    }

    if(rightPressed && paddleX < canvas.width - paddleWidth) {
      paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
      paddleX -= 7;
    }
  }

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);

  function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = true;
    }
  }

  function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = false;
    }
  }

  var interval = setInterval(draw, 10);