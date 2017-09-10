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

/**
 * Mouse Down Event
 * @param {*} e 
 */
function myDown(e) {

    // Get the current mouse position
    var mouseX = parseInt(e.clientX - canvasHanoiTower.bb.left);
    var mouseY = parseInt(e.clientY - canvasHanoiTower.bb.top);

    // test each rect to see if mouse is inside
    dragok = false;
    for (var i = 0; i < canvasHanoiTower.towers.length; i++) {

        for (var index = 0; index < canvasHanoiTower.towers[i].disks.length; index++) {
            var disk = canvasHanoiTower.towers[i].disks[index];

            if (canvasHanoiTower.towers[i].isDiskonTop(disk) && mouseX > disk.posX && mouseX < disk.posX + disk.width && mouseY > disk.posY && mouseY < disk.posY + disk.height) {

                dragok = true;

                disk.draggable = true;
                diskSelected = disk;
                towerSelected = canvasHanoiTower.towers[i];

                // Set cursor Hand - Pointer
                document.getElementById("canvas").style.cursor = "pointer";

                // Play Pick UP a Disk SoundFX
                pickUpDiskFX.play();
            }

        }

    }


    // Save the current mouse position
    startX = mouseX;
    startY = mouseY;

    console.log("MouseDown", mouseY);
}


/**
 * Mouse Up Event
 * @param {*} e 
 */
function myUp(e) {
    // Tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // Get the current mouse position
    var mouseX = parseInt(e.clientX - canvasHanoiTower.bb.left);
    var mouseY = parseInt(e.clientY - canvasHanoiTower.bb.top);

    // Clear Drag
    dragok = false;
    var matched = false;

    // Restore Cursor
    document.getElementById("canvas").style.cursor = "";

    if (diskSelected && diskSelected.draggable) {

        // Moves number updated
        let moves = document.getElementById("moves-counter").textContent;
        moves = parseInt(moves) + 1; //Plus one
        document.getElementById("moves-counter").innerHTML = moves;

        // Disk Selected cleared
        diskSelected.clear();

        canvasHanoiTower.towers.forEach((tower) => {

            tower.disks.forEach((_disk) => {
                _disk.draggable = false;
            })
            console.log(mouseX);
            console.log(mouseY);
            if (mouseX > tower.basePosX && mouseX < tower.basePosX + tower.baseWidth
                && mouseY < tower.basePosY && mouseY < tower.basePosY + tower.height && tower.canPushDiskonTop(diskSelected)) {

                // Tower found 
                matched = true;

                // Draw
                tower.draw();

                tower.disks.forEach((_disk) => {
                    _disk.draw(tower, _disk.posX, _disk.posY);
                })

                // Remove the disk from the tower and push it to the selected.
                towerSelected.removeDisk();
                let newDisk = new Disk(tower, diskSelected.width, diskSelected.colour);
                tower.pushDisk(newDisk);
                newDisk.moveToTower(tower);
                diskSelected = null;

                // Play Drop Disk OK SoundFX
                dropDiskOkFX.play();

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


/**
 * Mouse Move Event
 * @param {*} e 
 */
function myMove(e) {
    // If dragging && if the Disk on the TOp of the Tower
    if (dragok && towerSelected.isDiskonTop(diskSelected)) {

        // Events Prevent default
        e.preventDefault();
        e.stopPropagation();

        // Current Mouse position
        var mouseX = parseInt(e.clientX - canvasHanoiTower.bb.left);
        var mouseY = parseInt(e.clientY - canvasHanoiTower.bb.top);

        // Calculate the distance the mouse has moved since the last myMove()
        var distanceX = mouseX - startX;
        var distanceY = mouseY - startY;

        //ReDraw each Tower
        canvasHanoiTower.towers.forEach((t) => {
            t.draw();
        });

        //ReDraw the disk draggable
        for (var i = 0; i < canvasHanoiTower.towers.length; i++) {

            for (var index = 0; index < canvasHanoiTower.towers[i].disks.length; index++) {
                var disk = canvasHanoiTower.towers[i].disks[index];

                if (disk.draggable) {
                    let x = disk.posX + distanceX;
                    let y = disk.posY + distanceY;

                    disk.clear();
                    disk.draw(null, x, y);
                }
                else {
                    disk.draw(canvasHanoiTower.towers[i], disk.posX, disk.posY);
                }


            }


        }

        // reset the starting mouse position for the next mousemove
        startX = mouseX;
        startY = mouseY;

    }
    else {
        dragok = false;
    }
}
