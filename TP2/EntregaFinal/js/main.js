// Hanoi Canvas
var canvasHanoiTower = null;

// Game
var hanoiTowersGame = null;

/**
 * On load page, render the menu
 */
renderHtml('html/home.html');

/**
 * Render HTML
 * @param {url} url 
 */
function renderHtml(url) {
    let headers = new Headers();
    headers.append("Content-Type", "text/html");

    let options = {
        headers: headers,
        mode: 'no-cors',
        cache: 'default'
    };
    let myRequest = new Request(url, options);

    fetch(myRequest)
        .then(response => {
            return response.text();
        }).then(data => {

            switch (url) {
                case 'html/home.html':
                    document.getElementById('app-loader').innerHTML = data;
                    break;
                case 'html/hanoi.html':
                    document.getElementById('app-loader').innerHTML = data;
                    onSetCanvas();
                    break;
                default:
                    break;
            }
        }).catch(err => console.log(err));
}

/**
 * Set Main Canvas
 */
function onSetCanvas() {
    // Main Canvas
    canvasHanoiTower = new CanvasHanoiTower();

    // Set Towers
    onSetTowers();

    hanoiTowersGame = new HanoiTowersGame(canvasHanoiTower);
}

function CanvasHanoiTower() {
    this.ctx = document.getElementById("canvas").getContext("2d");
    this.canvas = document.getElementById("canvas");

    // listen for mouse events
    this.canvas.onmousedown = myDown;
    this.canvas.onmouseup = myUp;
    this.canvas.onmousemove = myMove;

    this.bb = this.canvas.getBoundingClientRect();
    this.width;
    this.height;
    this.towers = new Array();
}

CanvasHanoiTower.prototype.addTower = function (t) {
    this.towers.push(t);
}


function onSetTowers() {
    // First Tower
    towerOne = new HanoiTower();
    towerOne.draw();
    towerOne.addDisk();
    // Add Tower
    canvasHanoiTower.addTower(towerOne);

    // Second Tower
    towerTwo = new HanoiTower(375, 100, 20, 250, 310);
    towerTwo.draw();
    // Add Tower
    canvasHanoiTower.addTower(towerTwo);

    // Third Tower
    towerThree = new HanoiTower(685, 100, 20, 250, 620);
    towerThree.draw();
    // Add Tower
    canvasHanoiTower.addTower(towerThree);
    console.log(canvasHanoiTower);
}



var startX;
var startY;
var dragok = false;
var diskSelected;
var towerSelected;

// handle mousedown events
function myDown(e) {

    // Get the current mouse position
    var mouseX = parseInt(e.clientX - canvasHanoiTower.bb.left);
    var mouseY = parseInt(e.clientY - canvasHanoiTower.bb.top);

    // test each rect to see if mouse is inside
    dragok = false;
    for (var i = 0; i < canvasHanoiTower.towers.length; i++) {

        for (var index = 0; index < canvasHanoiTower.towers[i].disks.length; index++) {
            var disk = canvasHanoiTower.towers[i].disks[index];

            if (mouseX > disk.posX && mouseX < disk.posX + disk.width && mouseY > disk.posY && mouseY < disk.posY + disk.height) {

                dragok = true;

                disk.draggable = true;
                diskSelected = disk;
                towerSelected = canvasHanoiTower.towers[i];
            }

        }

    }


    // Save the current mouse position
    startX = mouseX;
    startY = mouseY;

    console.log("MouseDown", mouseY);
}


// handle mouseup events
function myUp(e) {
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // Get the current mouse position
    var mouseX = parseInt(e.clientX - canvasHanoiTower.bb.left);
    var mouseY = parseInt(e.clientY - canvasHanoiTower.bb.top);

    // clear all the dragging flags
    dragok = false;
    var matched = false;

    if(diskSelected) {
        diskSelected.clear();
        
            canvasHanoiTower.towers.forEach((tower) => {
        
                tower.disks.forEach((_disk) => {
                    _disk.draggable = false;
                })
        
                if (mouseX > tower.basePosX && mouseX < tower.basePosX + tower.baseWidth && mouseY > tower.height && mouseY < tower.basePosY + tower.height &&  tower.canPushDiskonTop(diskSelected) ) {
        
                        // Tower found it
                        matched = true;
        
                        // Draw
                        tower.draw();
        
                        tower.disks.forEach((_disk) => {
                            _disk.draw(tower, _disk.posX, _disk.posY);
                        })
        
                        // Remove the disk from the tower and push it to the selected.
                        towerSelected.removeDisk();
                        tower.pushDisk(new Disk(tower, diskSelected.width, diskSelected.height, diskSelected.colour));
                        diskSelected.moveToTower(tower);
                        diskSelected = null;
                    
        
        
                }
                else {
        
                    // Draw all except the disk selected
                    tower.draw();
        
                    tower.disks.forEach((_disk) => {
        
                        if (_disk != diskSelected) {
                            _disk.draw(tower, _disk.posX, _disk.posY);
                        }
        
                    })
        
        
                }
        
            });
        
            if (!matched) {
                diskSelected.draw(diskSelected.currentTower);
                diskSelected = null;        
            }
        
            hanoiTowersGame.checkGame();
    }

    console.log("MouseUP");
    console.log(canvasHanoiTower);
}


// handle mouse moves
function myMove(e) {
    // if we're dragging anything...
    if (dragok && towerSelected.isDiskonTop(diskSelected)) {


        // tell the browser we're handling this mouse event
        e.preventDefault();
        e.stopPropagation();

        // get the current mouse position
        var mx = parseInt(e.clientX - canvasHanoiTower.bb.left);
        var my = parseInt(e.clientY - canvasHanoiTower.bb.top);

        // calculate the distance the mouse has moved
        // since the last mousemove
        var dx = mx - startX;
        var dy = my - startY;

        // move each rect that isDragging
        // by the distance the mouse has moved
        // since the last mousemove

        for (var i = 0; i < canvasHanoiTower.towers.length; i++) {

            canvasHanoiTower.towers[i].draw();
            for (var index = 0; index < canvasHanoiTower.towers[i].disks.length; index++) {
                var disk = canvasHanoiTower.towers[i].disks[index];

                // canvasHanoiTower.ctx.clearRect(0, 0, 800, 600);


                if (disk.draggable) {
                    let x = disk.posX + dx;
                    let y = disk.posY + dy;

                    disk.clear();
                    disk.draw(null, x, y);
                }
                else {
                    disk.draw(canvasHanoiTower.towers[i], disk.posX, disk.posY);
                }

            }


        }

        // reset the starting mouse position for the next mousemove
        startX = mx;
        startY = my;

    }
}


function HanoiTowersGame (canvas) {
    this.canvas = canvas;
    this.time = 0;
}

HanoiTowersGame.prototype.checkGame = function () {
    if(this.canvas.towers[2].disks.length == 4) {
        alert("You Win!");
    }
}