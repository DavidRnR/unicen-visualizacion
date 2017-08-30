var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
console.log(canvas);
console.log(ctx);
canvas.onclick = function () {

  c.draw();
};

canvas.onmousedown = function (e) {
  let pos =  Math.sqrt(Math.pow((e.clientX - c.posX),2) + Math.pow((e.clientY - c.posY),2));
  console.log(pos);
}

// canvas.addEventListener('mousemove', function(evt) {
//   var mousePos = getMousePos(canvas, evt);
//   var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
//   writeMessage(canvas, message);
// }, false);
//
// function writeMessage(canvas, message) {
//   var context = canvas.getContext('2d');
//   context.clearRect(0, 0, canvas.width, canvas.height);
//   context.font = '18pt Calibri';
//   context.fillStyle = 'black';
//   context.fillText(message, 10, 25);
// }
//
// function getMousePos(canvas, evt) {
//   var rect = canvas.getBoundingClientRect();
//   return {
//     x: evt.clientX - rect.left,
//     y: evt.clientY - rect.top
//   };
// }

function Circle (paramPosX = 100, paramPosY = 100, paramRadio = 55, paramColor = "#445677") {
  this.posX = paramPosX;
  this.posY = paramPosY;
  this.radio = paramRadio;
  this.color = paramColor;
}

Circle.prototype.draw = function () {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(  this.posX,  this.posY ,  this.radio,0,Math.PI * 2);
  ctx.fill();
  ctx.closePath();
}


let c = new Circle();

c.posX = Math.floor((Math.random() * 900) + 1);
c.posY = Math.floor((Math.random() * 600) + 1);
c.radio = 70;
c.color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
