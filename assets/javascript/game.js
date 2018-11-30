// I need to define all the variables I will need to track the game



var countries = ["SPAIN", "MEXICO", "UGANDA", "FRANCE", "GERMANY"]; //Variables required for game to start//List of winning countries
var pickedCountry; //Random winning country that the computer selects
var countryText = []; // this is an array that we'll use to store the letters of the pickedCountr
var pickedCountryText = " "; //winning country displayed on screen. Making it text instead of array helps not to display commas.
var maxTries;
var remGuess;
var wins = 0; //Number of total wins

//Variables for tracking user interaction
var userGuess; // Key the user pressed
var guessedKeys = [];        // Stores the keys the user guessed
var wrongGuess = []; //array of incorrect guesses.
var letterPosition = [];//index of correct guesses


// Variables to select HTLM tect to modify
var dispgameInstr = document.getElementById("dispgameInstr");
var disptotalWins = document.getElementById("disptotalWins");
var disppickedCountry = document.getElementById("disppickedCountry");
var dispremgGuesses = document.getElementById("dispremgGuesses");
var dispguessedLetters = document.getElementById("dispguessedLetters");
var dispuserMessage = document.getElementById("dispuserMessage");

/* Initialize the game.
Display the text Press any key to start.
Display # Wins as 0;
Display Vacation country as a series of dashes
Display # guesses as the maximum guesses allowed
display letters guessed as blank.*/


function initGame (){

    //empty all arrays
    guessedKeys = []; //Start with an empty guess;
    wrongGuess = [];
    letterPosition = []; 
    
    //Update content

    dispgameInstr.innerHTML = "Press any key to start";
    disptotalWins.innerText = wins;
    dispguessedLetters.innerHTML = guessedKeys;
    dispuserMessage.innerHTML = ""

    //Pick a new country and display info
    pickCountry();
    getcountryText();
    disppickedCountry.innerHTML = pickedCountryText;
    maxTries = pickedCountry.length + 5;
    console.log({maxTries});
    remGuess = maxTries;
    console.log({remGuess});
    dispremgGuesses.innerHTML = remGuess;
    
   

}

/* Pick a random winning country */

function pickCountry(){
  var random =  Math.floor(Math.random()*countries.length);
  pickedCountry = countries[random];
  console.log(pickedCountry);
  
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

/*This function takes a letter and finds all instances of 
appearance in the string and replaces them in the guess word.*/

function checkGuess() {
        for (var i=0; i<pickedCountry.length; i++) {
        if(pickedCountry[i] === userGuess) {
        console.log("letter matches a letter in pickedCountry");
        letterPosition.push(i);
        console.log({letterPosition});
       } else {
      console.log("try again");
       }
    }
   }



/* Event listener */

document.onkeyup = function(event) {

    userGuess = String.fromCharCode(event.keyCode).toUpperCase();
    console.log("You pressed " + userGuess);
    //Check if user has pressed this key before.

   
        if (guessedKeys.indexOf(userGuess) >-1){
            console.log("You've tried this before");
        } else {
            guessedKeys.push(userGuess);
            console.log("game on!");
            //decrement #remGuess
            remGuess--;
            console.log({remGuess});
            checkGuess();
        }



}
