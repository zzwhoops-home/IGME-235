import { Game } from './modules/Game.js'
import { createSwapContent, createScaleContent, createPivotContent } from './modules/popups.js';
import { InfoMessages } from '../data/data.js';

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
    // stats paragraphs
    const levelP = document.querySelector("#stats #level");
    const scoreP = document.querySelector("#stats #score");
    const movesP = document.querySelector("#stats #moves");
    const timerP = document.querySelector("#stats #timer");

    // create class instances
    game = new Game(levelP, scoreP, movesP, timerP);

    // get move buttons
    const swap = document.querySelector("#swap");
    const scale = document.querySelector("#scale");
    const pivot = document.querySelector("#pivot");
    const reset = document.querySelector("#reset");
    const autoRREF = document.querySelector("#auto");

    // add event listeners for move buttons
    swap.addEventListener('click', handleSelected);
    scale.addEventListener('click', handleSelected);
    pivot.addEventListener('click', handleSelected);
    reset.addEventListener('click', () => game.reset());
    autoRREF.addEventListener('click', () => game.autoRREF());

    // reenable autoRREF if clicking reset
    reset.addEventListener('click', () => game.enableAutoRREF());

    // get option buttons
    const random = document.querySelector("#random");
    const prevLevel = document.querySelector("#prev-level");
    const nextLevel = document.querySelector("#next-level");

    // random click
    random.addEventListener('click', () => game.randomLevel());

    // prev and next level
    prevLevel.addEventListener('click', handlePrevLevel);
    nextLevel.addEventListener('click', handleNextLevel);
    // disable since we are on level 1
    prevLevel.classList.add("options-disabled");

    // enable autoRREF
    random.addEventListener('click', () => game.enableAutoRREF());
    prevLevel.addEventListener('click', () => game.enableAutoRREF());
    nextLevel.addEventListener('click', () => game.enableAutoRREF());

    // // get powerup buttons
    // const powerups = document.querySelectorAll(".powerup:not(.empty)");

    // // add event listeners for powerup buttons
    // powerups.forEach(element => {
    //     element.addEventListener('click', handleSelected);
    // })

    // get info popup
    popup = document.querySelector("#popup");
};

/**
 * Handles selecting and deselecting of moves/powerups
 * 
 * @param {Event} e 
 */
const handleSelected = (e) => {
    document.querySelectorAll(".move").forEach(element => {
        element.classList.remove("selected");
    });
    if (!e.target.classList.contains("selected")) {
        e.target.classList.add("selected");
    }
    else {
        e.target.classList.remove("selected");

        // close popup
        closePopup();
    }
};

const handlePrevLevel = (e) => {
    const levelNum = document.querySelector("#level-number");
    const messagePanel = document.querySelector("#message-panel p");
    const prevLevel = document.querySelector("#prev-level");
    const nextLevel = document.querySelector("#next-level");

    nextLevel.classList.remove("options-disabled");

    if (game.level > 1) {
        game.prevLevel();
        messagePanel.textContent = `You have selected: Level ${game.level}`;
        levelNum.textContent = `Level ${game.level}`;
    }
    if (game.level === 1) {
        prevLevel.classList.add("options-disabled");
    }
    else {
        prevLevel.classList.remove("options-disabled");
    }
}

const handleNextLevel = (e) => {
    const levelNum = document.querySelector("#level-number");
    const messagePanel = document.querySelector("#message-panel p");
    const prevLevel = document.querySelector("#prev-level");
    const nextLevel = document.querySelector("#next-level");

    prevLevel.classList.remove("options-disabled");

    if (game.level < game.totalLevels) {
        game.nextLevel();
        messagePanel.textContent = `You have selected: Level ${game.level}`;
        levelNum.textContent = `Level ${game.level}`;
    }
    if (game.level === game.totalLevels) {
        nextLevel.classList.add("options-disabled");
    }
    else {
        nextLevel.classList.remove("options-disabled");
    }
}

const showPopup = (type, element) => {
    const popup = document.querySelector("#popup");

    // clear existing content
    popup.innerHTML = "";

    // create new label
    const typeCapitalized = type.charAt(0).toUpperCase() + type.slice(1);
    const popupLabel = document.createElement("p");
    popupLabel.textContent = typeCapitalized;
    popup.appendChild(popupLabel);

    switch (type) {
        case "swap":
            popup.appendChild(createSwapContent(game.curLevel.rows));
            break;
        case "scale":
            popup.appendChild(createScaleContent(game.curLevel.rows));
            break;
        case "pivot":
            popup.appendChild(createPivotContent(game.curLevel.rows));
            break;
    }

    // change button label
    const button = document.querySelector("#popup-content button");
    button.textContent = typeCapitalized + "!";
    // add event listener
    button.addEventListener("click", (e) => submitERO(type, e));

    // Position the popup
    const rect = element.getBoundingClientRect();
    popup.style.top = `${rect.bottom + window.scrollY - 5}px`;
    popup.style.left = `${rect.left + window.scrollX}px`;

    // show popup finally
    popup.classList.remove('hidden');
};

const submitERO = (type, e) => {
    switch (type) {
        case "swap":
            handleSwapRows();
            break;
        case "scale":
            handleScaleRows();
            break;
        case "pivot":
            handlePivotRows();
            break;
    }
}

const handleSwapRows = () => {
    // get swap dropdowns
    const dropdownLeft = document.querySelector("#dropdown-swap-left");
    const dropdownRight = document.querySelector("#dropdown-swap-right");

    // get selected option
    const selectedOptionLeft = dropdownLeft.options[dropdownLeft.selectedIndex];
    const selectedOptionRight = dropdownRight.options[dropdownRight.selectedIndex];

    // get left and right row
    const rowLeft = selectedOptionLeft.dataset.row;
    const rowRight = selectedOptionRight.dataset.row;

    // call Game function
    game.swapRows(rowLeft, rowRight);
};

const handleScaleRows = () => {
    // get scaling entries
    const scaleRow = document.querySelector("#dropdown-scale-row");
    const scaleEntry = document.querySelector("#dropdown-scale-entry");

    // scaleEntry.addEventListener('change', (e) => {
    //     try {
    //         console.log(math.evaluate(scaleEntry.value));
    //     }
    //     catch (e) {
    //         console.log(e);
    //     }
    // });

    // get selected option
    const selectedOption = scaleRow.options[scaleRow.selectedIndex];

    // get row
    const row = selectedOption.dataset.row;

    // get expression
    const expression = scaleEntry.value;
    const num = math.evaluate(expression);

    // prevent * by undefined or 0 
    if (num && num != 0) {
        game.scaleRow(row, num);
    }
};

const handlePivotRows = () => {
    // get pivoting entries
    const pivotOp = document.querySelector("#dropdown-pivot-op")
    const pivotLeft = document.querySelector("#dropdown-pivot-left");
    const pivotRight = document.querySelector("#dropdown-pivot-right");

    // get selected option
    const selectedOptionLeft = pivotLeft.options[pivotLeft.selectedIndex];
    const selectedOptionRight = pivotRight.options[pivotRight.selectedIndex];
    const selectedOptionOp = pivotOp.options[pivotOp.selectedIndex];

    // get left and right row
    const rowLeft = selectedOptionLeft.dataset.row;
    const rowRight = selectedOptionRight.dataset.row;
    const add = selectedOptionOp.textContent === "+" ? true : false;

    // call Game function
    game.pivotRows(rowLeft, rowRight, add);
}

/**
 * Closes the popup that opens when we prompt the user for an ERO
 */
const closePopup = () => {
    if (!popup.classList.contains('hidden')) {
        popup.classList.add('hidden');
    }
}

// add event listener for clicking off elements
document.addEventListener('click', (e) => {
    // only trigger if we aren't clicking on a move
    if (!e.target.classList.contains("move")) {
        // get all elements 'selected'
        const selected = document.querySelectorAll(".selected");

        // console.log("clicked screen");
        // console.log(selected);
        // iterate through selected elements (should only be one)
        selected.forEach(element => {
            // clicked element should be selected element
            if (!element.contains(e.target) && !popup.contains(e.target)) {
                element.classList.remove("selected");

                // close popup
                closePopup();
            }
        });
    }
});

// event listener for clicking on moves
document.querySelectorAll(".move").forEach(element => {
    if (element.classList.contains("empty")) {
        return;
    }

    // get message box
    const messagePanel = document.querySelector("#message-panel p");

    element.addEventListener('click', (e) => {
        const type = element.id;

        // close previous popup
        closePopup();

        if (type != "reset" && type != "auto") {
            // show new popup
            showPopup(type, e.target);
        }
    });

    // add correct message when hovering over move
    element.addEventListener('mouseover', (e) => {

        // get info message from data.js file
        const text = InfoMessages[element.id];

        // set text content
        messagePanel.textContent = text;
    })

    // reset to default if leaving move element
    element.addEventListener('mouseout', (e) => {
        messagePanel.textContent = InfoMessages["default"];
    })
});