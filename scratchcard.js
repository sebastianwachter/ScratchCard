'use strict';
var ScratchCard = function (options) {
  var self = this;
  // Set local variables for this instance
  this.canvasID = options.id;
  this.width = options.brushSize;
  this.shape = options.lineJoin;
  this.clearRequirement = options.percentRequired;
  this.color = options.fillColor;
  this.lastX, this.lastY;
  // Initialize the scratch card
  this.init(this.canvasID);
  // Return the element so we can bind events onto it
  return(this.can);
};

ScratchCard.prototype.init = function (canvasID) {
  // Variable to check if a continous press is occurring
  this.pressed = false;
  // Get the canvas and its 2d context
  this.can = document.getElementById(canvasID);
  this.ctx = this.can.getContext('2d');
  // Initialize offsets of the canvas
  var canRect = this.can.getBoundingClientRect();
  this.offset = { top: canRect.top + document.body.scrollTop, left: canRect.left + document.body.scrollLeft };
  // Register mouse event listeners
  this.can.addEventListener('mousedown', this.mouseDown.bind(this), false);
  this.can.addEventListener('mousemove', this.mouseMove.bind(this), false);
  this.can.addEventListener('mouseup', this.mouseUp.bind(this), false);
  // Register touch event listeners
  this.can.addEventListener('touchstart', this.touchDown.bind(this), false);
  this.can.addEventListener('touchmove', this.touchMove.bind(this), true);
  this.can.addEventListener('touchend', this.touchUp.bind(this), false);
  this.can.addEventListener('touchcancel', this.touchUp.bind(this), false);
  // Reset the canvas. Image gets hidden
  this.reset();
};

ScratchCard.prototype.mouseDown = function (e) {
  // Set the control variable to true since the user is currently pressing the screen
  this.pressed = true;
  // Get the X and Y coordinates of the input
  var currentX = e.pageX - this.offset.left;
  var currentY = e.pageY - this.offset.top;
  // Call draw with the X and Y coordinates. The last parameter of the call tells the function
  // whether the user is currently pressing the screen or if its a starting action (mousedown or touchdown).
  this.draw(currentX, currentY, false);
};

ScratchCard.prototype.mouseMove = function (e) {
  // To avoid some weird cases we have to check if a mousedown event occured beforehand
  if (this.pressed) {
    // Get the X and Y coordinates of the input
    var currentX = e.pageX - this.offset.left;
    var currentY = e.pageY - this.offset.top;
    this.draw(currentX, currentY, true);
  }
};

ScratchCard.prototype.mouseUp = function () {
  // Reset the control variable
  this.pressed = false;
};

ScratchCard.prototype.touchDown = function (e) {
  // Touch is a bit more complicated than mouse usage since mobiel browsers have default
  // functionalities. Also the touch position is not a real position but an array.
  e.preventDefault();
  // User is touching the screen
  this.pressed = true;
  var currentX = e.targetTouches[0].pageX - this.offset.left;
  var currentY = e.targetTouches[0].pageY - this.offset.top;
  this.draw(currentX, currentY, false);
};

ScratchCard.prototype.touchMove = function (e) {
  e.preventDefault();
  // To avoid some weird cases we have to check if a touchstart event occured beforehand
  if (this.pressed) {
    var currentX = e.targetTouches[0].pageX - this.offset.left;
    var currentY = e.targetTouches[0].pageY - this.offset.top;
    this.draw(currentX, currentY, true);
  }
};

ScratchCard.prototype.touchUp = function () {
  // Reset the control variable
  this.pressed = false;
};

ScratchCard.prototype.draw = function (x, y, isDown) {
  // This function will remove the paint from the image. It is called draw since we actually draw transparent
  // paint over a grey paint.
  // X is the current X coordinate
  // Y is the current Y coordinate
  // isDown is a status to determine if the user is currently using the screen or if they just terminated the input
  if (isDown) {
    this.ctx.beginPath();
    // Tell the canvas we want to use 'removing' paint instead of a 'applying' paint
    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
    this.ctx.lineWidth = this.width;
    this.ctx.lineJoin = this.shape;
    // We set the starting position of our drawer to be the last position of the user's input
    this.ctx.moveTo(this.lastX, this.lastY);
    // Draw the line to the new X and Y coordinates
    this.ctx.lineTo(x, y);
    this.ctx.closePath();
    this.ctx.stroke();
  }
  // Set the last coordinates the the current coordinates so next time we start where we left off
  this.lastX = x;
  this.lastY = y;
  // Calculate the amount of cleared pixels
  var clearedPixels = this.calcPixels(25);
  this.clearPercentage(clearedPixels);
};

ScratchCard.prototype.calcPixels = function (stride) {
  // We use a stride so we don't calculate forever

  // We get all pixels in the canvas (the image is a background image so its not part of the canvas)
  var pixels = this.ctx.getImageData(0, 0, this.can.width, this.can.height);
  var pixelData = pixels.data;
  var pixelLength = pixelData.length;
  var total = (pixelLength / stride);
  var count = 0;
  // Now we iterate over all (actually not all since we use the stride) pixels and check whether their
  // pixelData is empty which means this pixel is removed.
  for (var i = count; i < pixelLength; i += stride) {
    if (parseInt(pixelData[i]) === 0) {
      count ++;
    }
  }
  // Calculate the actual percentage
  return Math.round((count / total) * 100);
};

ScratchCard.prototype.clearPercentage = function (clearedAmount) {
  if (clearedAmount === this.clearRequirement) {
    var successEvent = new Event('success');
    this.can.dispatchEvent(successEvent);
  }
};

ScratchCard.prototype.reset = function () {
  // Reset the canvas. Fill it with paint so the user can scratch again.
  this.ctx.globalCompositeOperation = 'source-over';
  this.ctx.fillStyle = this.color;
  this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
};