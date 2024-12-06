import { Game } from './modules/Game.js'

// current game instance
let game;

/**
 * Handles the window onload event and initializes the page contents.
 *
 * @param {Event} e - The event object triggered when the window loads.
 */
window.onload = (e) => {
    loadContents();
}

/**
 * Loads the contents of the page on page load
 */
const loadContents = async () => {
    // get move buttons
    const swap = document.querySelector('#swap');
    const scale = document.querySelector('#scale');
    const pivot = document.querySelector('#pivot');

    // add event listeners for move buttons

    // get powerup buttons
    const powerups = document.querySelectorAll(".powerup");

    // add event listeners for powerup buttons
    powerups.forEach(element => {
        element.addEventListener('click', handleSelected);
    })

    // stats paragraphs
    const levelP = document.querySelector("#stats #level");
    const scoreP = document.querySelector("#stats #score");
    const movesP = document.querySelector("#stats #moves");
    const timerP = document.querySelector("#stats #timer");

    // create class instances
    game = new Game(levelP, scoreP, movesP, timerP);
};

const handleSelected = (e) => {
    if (!e.target.classList.contains("selected")) {
        e.target.classList.add("selected");
    }
    else {
        e.target.classList.remove("selected");
    }
};

document.addEventListener('click', (e) => {
    // get all elements 'selected'
    const selected = document.querySelectorAll(".selected");

    // iterate through selected elements (should only be one)
    selected.forEach(element => {
        // clicked element should be selected element
        if (!element.contains(e.target)) {
            element.classList.remove("selected");
        }
    });
});