var mousePressed = false;
var lastX, lastY;
var ctx;

function initThis() {
  ctx = document.getElementById('myCanvas').getContext('2d');

  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = "rgb(163, 163, 163)";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  $('#myCanvas').mousedown(function (e) {
    mousePressed = true;
    Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
  });

  $('#myCanvas').mousemove(function (e) {
    if(mousePressed) {
      Draw(e.pageX - $(this).offset().left, e.pageY -$(this).offset().top, true);
    }
  });

  $('#myCanvas').mouseup(function (e) {
    mousePressed = false;
  });
}

function Draw(x, y, isDown) {
  if(isDown) {
    ctx.beginPath();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
    ctx.lineWidth = 50;
    ctx.lineJoin = 'round';
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.stroke();
  }
  lastX = x;
  lastY = y;
}
