import { Game } from './modules/Game.js'
import { createSwapContent, createScaleContent, createPivotContent } from './modules/popups.js';

// current game instance
let game;

// popup panel
let popup;

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
    swap.addEventListener('click', handleSelected);
    scale.addEventListener('click', handleSelected);
    pivot.addEventListener('click', handleSelected);

    // get powerup buttons
    const powerups = document.querySelectorAll(".powerup:not(.empty)");

    // add event listeners for powerup buttons
    powerups.forEach(element => {
        element.addEventListener('click', handleSelected);
    })

    // get info popup
    popup = document.querySelector("#popup");

    // add event listener for clicking off the popup
    // document.addEventListener('click', (e) => {
    //     if (e.target != popup && popup.style.display != "none") {
    //         closePopup();
    //     }
    // })

    // stats paragraphs
    const levelP = document.querySelector("#stats #level");
    const scoreP = document.querySelector("#stats #score");
    const movesP = document.querySelector("#stats #moves");
    const timerP = document.querySelector("#stats #timer");

    // create class instances
    game = new Game(levelP, scoreP, movesP, timerP);
};

/**
 * Handles selecting and deselecting of moves/powerups
 * 
 * @param {Event} e 
 */
const handleSelected = (e) => {
    if (!e.target.classList.contains("selected")) {
        e.target.classList.add("selected");
    }
    else {
        e.target.classList.remove("selected");

        // close popup
        closePopup();
    }
};

const showPopup = (type, element) => {
    const popup = document.querySelector("#popup");
    
    // clear existing content
    popup.innerHTML = "";

    // Position the popup
    const rect = element.getBoundingClientRect();
    popup.style.top = `${rect.bottom + window.scrollY}px`;
    popup.style.left = `${rect.left + window.scrollX}px`;

    if (type === "swap") {
        console.log(createSwapContent());
        popup.appendChild(createSwapContent());
    }
    else if (type === "scale") {
        popup.appendChild(createScaleContent());
    }
    else if (type === "pivot") {
        popup.appendChild(createPivotContent());
    }

    // show popup finally
    popup.style.display = "inline-block";
};

/**
 * Closes the popup that opens when we prompt the user for an ERO
 */
const closePopup = () => {
    if (popup.style.display != "none") {
        popup.style.display = "none";
    }
}

// add event listener for clicking off elements
document.addEventListener('click', (e) => {
    // get all elements 'selected'
    const selected = document.querySelectorAll(".selected");

    // iterate through selected elements (should only be one)
    selected.forEach(element => {
        // clicked element should be selected element
        if (!element.contains(e.target) && !popup.contains(e.target)) {
            element.classList.remove("selected");

            // close popup
            closePopup();
        }
    });
});

// event listener for clicking on moves
document.querySelectorAll(".move").forEach(element => {
    element.addEventListener('click', (e) => {
        const type = element.id;

        showPopup(type, e.target);
    });
});