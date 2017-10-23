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
                case 'html/game.html':
                    document.getElementById('app-loader').innerHTML = data;

                    // Start Game
                    startGame();
                    break;
                default:
                    break;
            }
        }).catch(err => console.log(err));
}

/**
 * Preload Images - Sprites, etc
 */
function preloadImages() {

    var imagesPreloaded = new Array();

    var ninjaIdle = new Image();
    ninjaIdle.src = 'img/sprites/ninja-idle.png';
    imagesPreloaded.push(ninjaIdle);

    var ninjaRun = new Image();
    ninjaRun.src = 'img/sprites/ninja-run.png';
    imagesPreloaded.push(ninjaRun);

    var ninjaAttack = new Image();
    ninjaAttack.src = 'img/sprites/ninja-attack.png';
    imagesPreloaded.push(ninjaAttack);

    var ninjaDead = new Image();
    ninjaDead.src = 'img/sprites/ninja-dead.png';
    imagesPreloaded.push(ninjaDead);

    var zombieDead = new Image();
    zombieDead.src = 'img/sprites/zombie-dead.png';
    imagesPreloaded.push(zombieDead);

    var zombieWalk = new Image();
    zombieWalk.src = 'img/sprites/zombie-walk.png';
    imagesPreloaded.push(zombieWalk);
    
    // Create an hidden Element for every Image
    imagesPreloaded.forEach((img) => {
        img.onload = function () {
           document.getElementById('pre-load-img').src = img.src;
        }
    });

}
preloadImages();

var game = null;

function startGame() {
    game = new Game();
    game.ready();

}