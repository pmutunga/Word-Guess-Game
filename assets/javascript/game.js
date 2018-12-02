// I need to define all the variables I will need to track the game



var countries = ["SPAIN", "MEXICO", "CUBA", "FRANCE", "GERMANY"]; //Variables required for game to start//List of winning countries
var pickedCountry; //Random winning country that the computer selects
var countryText = []; // this is an array that we'll use to store the letters of the pickedCountr
var pickedCountryText = " "; //winning country displayed on screen. Making it text instead of array helps not to display commas.
var maxTries;
var remGuess;
var wins = 0; //Number of total wins
var isgameOver = false; //a boolean variable that will track if the game is over or not.

//Variables for tracking user interaction
var userGuess; // Key the user pressed
var guessedKeys = [];        // Stores the keys the user guessed
var wrongGuess = []; //array of incorrect guesses.
var letterPosition = [];//index of correct guesses




// Variables to select HTLM text to modify or manipulate.
var dispgameInstr = document.getElementById("dispgameInstr");//This is the text on the gameContent div
var disptotalWins = document.getElementById("disptotalWins");
var disppickedCountry = document.getElementById("disppickedCountry");
var dispremGuesses = document.getElementById("dispremGuesses");
var dispguessedLetters = document.getElementById("dispguessedLetters");
var dispuserMessage = document.getElementById("dispuserMessage");
var dispimage = document.getElementById("startpic");
var startGame = document.getElementById("startBtn");
var dispkeyCont = document.getElementById("keyCont"); //This is the header on the jumbotron
var dispkeySubcont = document.getElementById("keySubcont"); //This is the subheader in the jumbtron
var dispGame = document.getElementById("gamecontent");//This is the div that hosts game content.

//Initial state

dispGame.style.display = "none";

/* Initialize the game.
Display the text Press any key to start.
Display # Wins as 0;
Display Vacation country as a series of dashes
Display # guesses as the maximum guesses allowed
display letters guessed as blank.*/


function initGame (){

    resetData();
    
    //Update content

    
    //Pick a new country and display info
    pickCountry();
    getcountryText();
    UpdateContent();

    //hide background image

    dispGame.classList.add("gameStarted");
    dispGame.style.display = "block";
   
    //hide start button
    startGame.style.display = "none";

    //Set isGameOver to false
    isgameOver = false;

}

function resetData(){
    //empty all arrays - but not the Wins array because we need to track that.
    countryText = [];
    pickedCountryText = " ";
    guessedKeys = []; //Start with an empty guess;
    wrongGuess = [];
    letterPosition = []; 
    
       
 }

/* Pick a random winning country */

function pickCountry(){
  var random =  Math.floor(Math.random()*countries.length);
  pickedCountry = countries[random];
  console.log(pickedCountry);
  maxTries = pickedCountry.length + 3;
  console.log({maxTries});
  remGuess = maxTries;
  
}

/* Display dashes on the screen that represent the winning country*/
 function getcountryText() {
     //find out the length of the pickedCountry
          for (var i=0; i<pickedCountry.length; i++){
        countryText.push("_");
    //To display the dashes on screen without the commas, we'll use a string varaible and concatenate the array values to it.

        pickedCountryText += countryText[i];

     }
 }



 function UpdateContent () {
    dispgameInstr.innerHTML = "Press a key to guess!";
    disppickedCountry.innerHTML = pickedCountryText;
    dispremGuesses.innerHTML = remGuess;
    disptotalWins.innerText = wins;
    dispguessedLetters.innerHTML = wrongGuess;
    dispuserMessage.innerHTML = "";
    dispimage.src = "assets/images/kyle-glenn-598701-unsplash_1024.png";
    dispkeyCont.innerHTML = "Win your dream vacation!!";
    dispkeySubcont.innerHTML = "If you guess right...";
    startGame.innerHTML = "Click to start!"
 }
/*     dispgameInstr.innerHTML = "Press a key to guess a country!";
    disptotalWins.innerText = wins;
    dispguessedLetters.innerHTML = wrongGuess;
    dispuserMessage.innerHTML = ""
    disppickedCountry.innerHTML = pickedCountryText;
    dispremGuesses.innerHTML = remGuess;
    dispkeyCont.innerHTML = "Win your dream vacation!!";
    dispkeySubcont.innerHTML = "If you guess right..."; */


// Play to win a vacation
function guessCountry(letter) {
        if (remGuess > 0) {
        // Make sure we didn't use this letter yet
        if (guessedKeys.indexOf(userGuess) >-1){
            console.log("You've tried this before");
            dispuserMessage.innerHTML = "You've guessed this letter before. Try a different one."
        } else {
            guessedKeys.push(userGuess);
            console.log("You haven't guessed this key before. Let's check it!");
            checkGuess();
        }
    
    }
}

function checkGuess() {
        
        for (var i=0; i<pickedCountry.length; i++) {
       			if(pickedCountry[i] === userGuess) {
        				console.log(userGuess + " letter matches a letter in pickedCountry");
        				letterPosition.push(i);
        				console.log({letterPosition});
      			 } 
		} //end of for loop that checks of userGuess matches any letter in pickedCountry and pushes indices to letterPosition array.
		
		// if there are no indicies, remove a guess and update the remaining guesses displayed
        if (letterPosition.length<=0) {
        console.log({remGuess});
		dispremGuesses.innerHTML = remGuess;
		wrongGuess.push(userGuess);
        dispguessedLetters.innerHTML = wrongGuess;
        dispuserMessage.innerHTML = "Try again."
        letterPosition = [];
        checkLoss();
        
        } //end of if
	    else {
        // Loop through all the indicies and replace the '_' with a letter.
        for(var i = 0; i < letterPosition.length; i++) {
            countryText[letterPosition[i]] = userGuess;
            console.log({ countryText});
            dispuserMessage.innerHTML = ""
		    pickedCountryText = countryText;
            disppickedCountry.innerHTML = pickedCountryText;
            checkWin();
            letterPosition = [];
            
			
        }//end of for
	    } //End of else
		
		
} //End of function		
   

/* Determine if the game is over. Game is over if remGuess = 0; or the user has guessed the right country. If remGuess = 0, need to check if the user has won or lost*/


//*if remGuess =0, then isgameOver = true; If remGuess >0 and the user guessed the right country, isgameOver = true. If remGuess > 0 but the user has still not guessed the right country, isgameOver = false; isgameOver starts as false.*/

//First condition; check for a win by seeing if there are any remaining underscores in 
// Checks for a win by seeing if there are any remaining underscores in the guessingword we are building.
function checkWin() {
    if(countryText.indexOf("_") === -1) {

        isgameOver = true;
        wins++;
        disptotalWins.innerText = wins;
        dispuserMessage.innerHTML = ""
        dispkeyCont.innerHTML = "You won a trip to " + pickedCountry + " !";
        dispgameInstr.innerHTML = " CONGRATULATIONS!";
        //Update image and display
        dispimage.src = "assets/images/Uganda.png";
        dispkeySubcont.innerHTML = "Go pack your Bags & Enjoy you Vacation!";

    }
}

function checkLoss(){

    if(remGuess <=0) {
        dispuserMessage.innerHTML = "Sorry, you lost. Would you like to try again?"
        isgameOver = true;
        startGame.style.display = "block";
        startGame.innerHTML = "Play Again?"
        dispimage.src = "assets/images/vacationcalling.png";
        dispgameInstr.innerHTML = "";
        dispkeyCont.innerHTML = "Sorry, you lost.";
        dispkeySubcont.innerHTML = "Would you like to try again?";
    
    }
}



/* Function to update display 

function updateDisp(){

    dispgameInstr.innerHTML = "Press a key to guess a country!";
    disptotalWins.innerText = wins;
    dispguessedLetters.innerHTML = wrongGuess;
    dispuserMessage.innerHTML = ""
    disppickedCountry.innerHTML = pickedCountryText;
    dispremGuesses.innerHTML = remGuess;
    dispkeyCont.innerHTML = "Win your dream vacation!!";
    dispkeySubcont.innerHTML = "If you guess right...";


} */

/* Event listener */

document.onkeyup = function(event) {

    if(isgameOver === true) {
        
        dispuserMessage.innerHTML = "The game is Over. Would you like to play again?"
        startGame.style.display = "block";
        startGame.innerHTML = "Play Again?"
    } else {
        
        userGuess = String.fromCharCode(event.keyCode).toUpperCase();
        console.log("You pressed " + userGuess);
        //Check if user has pressed this key before.

   
        if (guessedKeys.indexOf(userGuess) >-1){
            console.log("You've tried this before");
            dispuserMessage.innerHTML = "You've guessed this letter before. Try a different one."
        } else {
            remGuess--;
            guessedKeys.push(userGuess);
            console.log("You haven't guessed this key before. Let's check it!");
            dispremGuesses.innerHTML = remGuess;
            checkGuess(userGuess);
        }
    }
} 

//button listener

startGame.addEventListener("click", function(){
    initGame();
});