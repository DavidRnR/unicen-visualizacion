// Hanoi Canvas
var canvasHanoiTower = null;

 // Create GamePlay
var hanoiTowersGame = new HanoiTowersGame();

//Current Mouse Positions
var startX;
var startY;

// Dragging
var dragok = false;

// Disk & Tower Selected
var diskSelected;
var towerSelected;


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
                case 'html/rules.html':
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

    // Set canvas for the Game
    hanoiTowersGame.canvas = canvasHanoiTower;   

    // Set Towers
    onSetTowers();

}

function onSetTowers() {
    // First Tower
    towerOne = new HanoiTower();
    towerOne.draw();
    towerOne.loadDisks();

    // Add Tower
    canvasHanoiTower.addTower(towerOne);

    // Second Tower
    towerTwo = new HanoiTower(390, 100, 20, 250, 300);
    towerTwo.draw();
    // Add Tower
    canvasHanoiTower.addTower(towerTwo);

    // Third Tower
    towerThree = new HanoiTower(690, 100, 20, 250, 600);
    towerThree.draw();
    // Add Tower
    canvasHanoiTower.addTower(towerThree);

    // Start Timer!
    hanoiTowersGame.timer();
}


/**
 * Hanoi Tower Game
 */
function HanoiTowersGame() {
    this.canvas = null;
    this.time = 0;
    this.interval = null;
    this.moves = 0;
    this.win = false;
    this.quantDisks = DISK_QUANT;
}

/**
 * Check if the last Tower has got all the Disks
 */
HanoiTowersGame.prototype.checkGame = function () {
    if (this.canvas.towers[2].disks.length == this.quantDisks) {
        this.win = true;

        // Show Modal
        $('#hanoiModal').modal('show');
        $('.timer-finished').html('Tiempo ' + this.time);
        $('.moves-finished').html('Movimientos ' + this.moves);
    }
}

/**
 * Hanoi Towers Timer
 */
HanoiTowersGame.prototype.timer = function (reset) {
    let h = 0;
    let s = 0;
    let m = 0;
    let H = 0;
    let M = 0;
    let S = 0; 

    if(reset) {
        clearInterval(this.interval);
    }
    else {
        this.interval = setInterval(() => {
            if (!this.win) {
                s += 1;
                if (s == 60) {
                    m += 1;
                    s = 0;
                }
                if (m == 60) {
                    h += 1;
                    m = 0;
                }
                if (s < 10) {
                    S = "0" + s;
                } else {
                    S = s;
                }
                if (m < 10) {
                    M = "0" + m;
                } else {
                    M = m;
                }
                if (h < 10) {
                    H = "0" + h;
                } else {
                    H = h;
                }
                let time = H + " : " + M + " : " + S;
                $(".timer").text(time);
                // Save time in the Game
                this.time = time;
    
            }
        }, 1000);
    }

}

/**
 * Play Again
 */
HanoiTowersGame.prototype.playAgain = function () {
  
        // Close Modal
        $('#hanoiModal').modal('hide');

        // Reset default values
        this.resetGame();       

        // Redirect to Rules Page
        renderHtml('html/rules.html');
}

/**
* Reset Game
*/
HanoiTowersGame.prototype.resetGame = function () {

    this.canvas = null;
    this.time = 0;
    this.moves = 0;
    this.win = false;
    this.quantDisks = DISK_QUANT;
    this.timer(true); // Reset timer
}

/**
 * On Play Again Call the Game to play
 */
function onPlayAgain () {
    hanoiTowersGame.playAgain();
}

/**
 * On Set Quantity of Disks
 * @param {*} event 
 */
function onSetDisksQuant(event) {
    debugger
    hanoiTowersGame.quantDisks = event.value;
}

