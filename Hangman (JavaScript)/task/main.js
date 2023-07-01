const input = require('sync-input');
let wordsList = ["python", "java", "swift", "javascript"];
let random = Math.floor(Math.random() * wordsList.length);
let chosenWord = wordsList[random];
let guessedWords = [];
let count = 0;
let attempts = 8;
let wins = 0;
let losses = 0;
let hint = "";

function menu() {
    let item = input(`Type "play" to play the game, "results" to show the scoreboard, and "exit" to quit: `);
    if (item === "play") {
        play();
    } else if (item === "results") {
        showResults();
    } else if (item === "exit") {
        process.exit(0);
    } else {
        menu();
    }
}

function play() {
    random = Math.floor(Math.random() * wordsList.length);
    chosenWord = wordsList[random];
    hint = "";
    guessedWords = [];
    count = 0;
    attempts = 8;

    for (let i = 0; i < chosenWord.length; i++) {
        hint += "-";
    }
    while (attempts > 0) {
        if (count === chosenWord.length) {
            console.log("You guessed the word " + chosenWord + "!");
            console.log("You survived!");
            wins++;
            break;
        }
        userInput();
    }
    if (attempts === 0) {
        console.log("\nYou lost!")
        losses++;
    }
    menu();
}

function showResults() {
    console.log(`You won: ${wins} times.\nYou lost: ${losses} times.`);
    menu();
}

function userInput() {
    console.log(`\n${hint}`);
    let mark = false;
    let userWord = input("Input a letter: ");

    if (userWord.length !== 1) {
        console.log("Please, input a single letter");
        return;
    }
    let lowerCase = /[a-z]/;
    if (!lowerCase.test(userWord)) {
        console.log("Please, enter a lowercase letter from the English alphabet");
        return;
    }
    if (guessedWords.includes(userWord)) {
        console.log("You've already guessed this letter");
        return;
    }
    guessedWords.push(userWord);
    if (hint.search(userWord) >= 0) {
        console.log("No improvements");
        attempts--;
        return;
    }
    for (let n = 0; n < hint.length; n++) {
        if (hint[n] === "-") {
            if (userWord === chosenWord[n]) {
                hint = hint.slice(0, n) + userWord + hint.slice(n + 1);
                count++;
                mark = true;
            }
        }
    }
    if (mark === false) {
        console.log("That letter doesn't appear in the word");
        attempts--;
    }
}

console.log("H A N G M A N");
menu();