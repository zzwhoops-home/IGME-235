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

    // get powerup buttons
    const powerups = document.querySelectorAll(".powerup");

    // stats paragraphs
    const levelP = document.querySelector("#stats #level");
    const scoreP = document.querySelector("#stats #score");
    const movesP = document.querySelector("#stats #moves");
    const timerP = document.querySelector("#stats #timer");

    // create class instances
    game = new Game(levelP, scoreP, movesP, timerP);
};
