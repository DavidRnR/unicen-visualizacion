var onSubmitScore = null;

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCARvu_Io6LWJkgbAV7Qmirk0TDtCiXoNY",
    authDomain: "towers-of-hanoi-8c023.firebaseapp.com",
    databaseURL: "https://towers-of-hanoi-8c023.firebaseio.com",
    projectId: "towers-of-hanoi-8c023",
    storageBucket: "towers-of-hanoi-8c023.appspot.com",
    messagingSenderId: "67527398432"
};
firebase.initializeApp(config);

/**
 * Firebase Get Scores
 */
function getScores(newRecord = null) {
    // Loaded for Spinner Icon
    var loaded = false;

    // Loading
    document.getElementsByClassName('hanoi-score-list')[0].innerHTML = '<i class="fa fa-spinner fa-spin fa-2x fa-fw"></i>'; 

    var ref = firebase.database().ref('/scores/'+ hanoiTowersGame.quantDisks);    
    
    ref.orderByChild("moves").on("child_added", function (data) {

        if(!loaded) {
            // Loaded
            document.getElementsByClassName('hanoi-score-list')[0].innerHTML = '';
        }
        let row = "<div class='row'><div class='col-md-3'>" + data.val().name + "</div><div class='col-md-3'>" + data.val().disks + " Disc</div><div class='col-md-3'>" + data.val().moves + " Movs</div><div class='col-md-3'>" + data.val().time + "</div></div><hr>"
        document.getElementsByClassName('hanoi-score-list')[0].innerHTML += row;   
        loaded = true;    
    });
}

/**
 * Firebase POST Score
 * @param {*} data 
 */
function postScore(data) {

    var ref = firebase.database().ref('/scores/'+ hanoiTowersGame.quantDisks);

    ref.push(
        data
    );

    
    // Clean Form
    document.getElementsByClassName('form-score')[0].innerHTML = null;
    
    // Clean List
    document.getElementsByClassName('hanoi-score-list')[0].innerHTML = "";

    // Reload Data
    getScores();
}




