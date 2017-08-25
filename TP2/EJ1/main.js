  ctx = document.getElementById("canvas").getContext("2d");

ctx.canvas.onclick = function () {

  let c = new Circle();

  for (var i = 0; i < 600; i++) {
    setTimeout(() => {
      c.posX = Math.floor((Math.random() * 900) + 1);
      c.posY = Math.floor((Math.random() * 600) + 1);
      c.radio = Math.floor((Math.random() * 20) + 1);
      c.color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
      c.draw();
    },Math.floor((Math.random() * 500) + 1));

  }

};
  // function draw () {
  //   ctx.fillStyle = "#FF0000"
  //   ctx.beginPath();
  //   ctx.arc(250,250,100,0,Math.PI * 2);
  //   ctx.fill();
  //   ctx.closePath();
  // }


function Circle (paramPosX = 100, paramPosY = 100, paramRadio = 55, paramColor = "#445677") {
  this.posX = paramPosX;
  this.posY = paramPosY;
  this.radio = paramRadio;
  this.color = paramColor;
}

Circle.prototype.message = function () {
  alert("Hola viejaaaaaaaaaa");
}

Circle.prototype.draw = function () {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(  this.posX,  this.posY ,  this.radio,0,Math.PI * 2);
  ctx.fill();
  ctx.closePath();
}

var gradient = ctx.createLinearGradient(10, 90, 200, 90);
gradient.addColorStop(0, 'black');
gradient.addColorStop(0.5, 'red');
gradient.addColorStop(1, 'white');
ctx.fillStyle = gradient;
ctx.fillRect(10, 10, 200, 250);
