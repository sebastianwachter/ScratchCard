var mousePressed = false;
var lastX, lastY;
var ctx;

function initThis() {
  can = document.getElementById('myCanvas');
  ctx = can.getContext('2d');

  can.addEventListener("mousedown", mouseDown, false);
  can.addEventListener("mousemove", mouseMove, false);
  can.addEventListener("touchstart", touchDown, false);
  can.addEventListener("touchmove", touchMove, true);
  can.addEventListener("touchend", touchUp, false);

  document.body.addEventListener("mouseup", mouseUp, false);
  document.body.addEventListener("touchcancel", touchUp, false);

  reset();

  function mouseDown(e) {
    mousePressed = true;
    Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
  }

  function mouseMove(e) {
    if(mousePressed) {
      Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
    }
  }

  function mouseUp(e) {
    mousePressed = false;
  }

  function touchDown(e) {
    e.preventDefault();
    mousePressed = true;
    Draw(e.targetTouches[0].pageX - $(this).offset().left, e.targetTouches[0].pageY - $(this).offset().top, false);
  }

  function touchMove(e) {
    e.preventDefault();
    if(mousePressed) {
      Draw(e.targetTouches[0].pageX - $(this).offset().left, e.targetTouches[0].pageY - $(this).offset().top, true);
    }
  }

  function touchUp(e) {
    mousePressed = false;
  }
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
  handlePercentage(getClearedPixels(25));
}

function reset() {
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = "rgb(163, 163, 163)";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function getClearedPixels(stride) {
  if (!stride || stride < 1) { stride = 1; }

  var pixels = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height),
      pdata = pixels.data,
      l = pdata.length,
      total = (l / stride),
      count = 0;

  for(var i = count = 0; i < l; i += stride) {
    if (parseInt(pdata[i]) === 0) {
      count++;
    }
  }
  return Math.round((count / total) * 100);
}

function handlePercentage(clearedPixels) {
  clearedPixels = clearedPixels || 0;
  console.log('cleared: ' + clearedPixels + '%');
}
