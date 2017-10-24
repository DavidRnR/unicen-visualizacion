var onSubmitScore = null;

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAOWzbwpOvuSADXrRROyPBF3zlr2YiMCN8",
    authDomain: "ninja-caos.firebaseapp.com",
    databaseURL: "https://ninja-caos.firebaseio.com",
    projectId: "ninja-caos",
    storageBucket: "ninja-caos.appspot.com",
    messagingSenderId: "724303897401"
  };
firebase.initializeApp(config);

/**
 * Firebase Get Scores
 */
function getScores(newRecord = null) {
    // Loaded for Spinner Icon
    var loaded = false;

    // Loading
    document.getElementsByClassName('ninja-caos-score-list')[0].innerHTML = '<i class="fa fa-spinner fa-spin fa-2x fa-fw"></i>'; 

    var ref = firebase.database().ref('/scores/');    
    
    ref.orderByChild("zombies").on("child_added", function (data) {

        if(!loaded) {
            // Loaded
            document.getElementsByClassName('ninja-caos-score-list')[0].innerHTML = '';
        }
        let row = "<div class='row'><div class='col-md-6'>" + data.val().name + "</div><div class='col-md-6'>" + data.val().zombies + " Zombies</div></div><hr>"
        document.getElementsByClassName('ninja-caos-score-list')[0].innerHTML += row;   
        loaded = true;    
    });
}

/**
 * Firebase POST Score
 * @param {*} data 
 */
function postScore(data) {

    var ref = firebase.database().ref('/scores/');

    ref.push(
        data
    );

    
    // Clean Form
    document.getElementsByClassName('form-score')[0].innerHTML = null;
    
    // Clean List
    document.getElementsByClassName('ninja-caos-score-list')[0].innerHTML = "";

    // Reload Data
    getScores();
}




