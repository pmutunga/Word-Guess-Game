// I need to define all the variables I will need to track the game

const maxTries = 12; //Number of tries
var userGuess; // Key the user pressed
var guessedCountries = []; //stores countries user guessed.
var countries = ["CANADA", "SWEDEN", "UGANDA", "FRANCE", "GREECE"];
var pickedCountry;
var wrongGuess = [];
var numGuessesrem = 6; //Remaining guesses
var rightGuess = [];
var pos;
var wins = 0; //Number of total wins

// Variables to select HTLM tect to modify
var totalwins = document.getElementById("totalwins");
var currentWord = document.getElementById("currentWord");
var remainingGuesses = document.getElementById("remainingGuesses");
var guessedLetters = document.getElementById("guessedLetters");

// Call functions
pickCountry();




// Problem: How to get user input?
/* I need a way to generate a word at random that I can use to check if the user guessed right.
Pick a country at random from countries array.
Create a function that picks a random country from the countries array countries */

function pickCountry(){
    var random =  Math.floor(Math.random() * countries.length);
    pickedCountry = (countries[random]);
    console.log(pickedCountry);
 }

 // I need a way to know what key the user has pressed and store it so I can use it later to compare.
 document.onkeyup = function(event){
    // userGuess = event.key; 
    userGuess = String.fromCharCode(event.keyCode).toUpperCase();
    console.log(userGuess);
    if (pickedCountry.indexOf(userGuess)>=0){

        console.log(pickedCountry.indexOf(userGuess));
    }
    else{
        console.log("try again");
    }
    

    /* I need to check if the letter the user selected is in the pickedCountry 
  I need a way to check if the key the user pressed is correct.
   If userGuess letter is in the pickedCountry, display it in the correct place. */
    }

//  Check if letter guessed in in pickedCountry using indexOf.


    // If the key is correct, display it in the correct spot on the page and update number of guesses remaining.

    //If the key is wrong, display it at the bottom of the page.
    // wrongGuess.push(userGuess);
    // console.log(wrongGuess);
    // document.getElementById("wrongkey").innerHTML = wrongGuess;
    // }

// I need to put the user's guesses in an array so I can display them on the page and also track # guesses remaining.







