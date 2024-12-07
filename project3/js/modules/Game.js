export class Game {
    curLevel = null;
    matrix = null;

    constructor(levelElement, scoreElement, movesElement, timerElement) {
        // store references to DOM elements
        this.levelElement = levelElement;
        this.scoreElement = scoreElement;
        this.movesElement = movesElement;
        this.timerElement = timerElement;

        // initialize game state
        this.level = 1;
        this.score = 0;
        this.moves = 0;
        this.timer = 60;
        this.curTimer = this.timer;
        this.timerInterval = null;

        // test creation of level
        const level = new Level(5, 5, [
            [1, 0, 0, 0, 0],
            [0, 1, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0],
            [0, 0, 0, 0, 1],
        ]);
        this.curLevel = level;

        // get matrix element, initialize matrix
        this.matrix = document.querySelector("#matrix-container");
        this.initializeMatrix();
    }
    
    /**
     * Initializes the matrix when the Level is created
     */
    initializeMatrix() {
        // set grid rows/cols
        this.matrix.style.gridTemplateRows = `repeat(${this.curLevel.rows}, 1fr)`;
        this.matrix.style.gridTemplateColumns = `repeat(${this.curLevel.columns}, 1fr)`;
        
        // populate matrix
        this.populateMatrix();
    }

    /**
     * Populates the matrix with Game's entries only
     */
    populateMatrix() {
        // clear elements
        this.matrix.innerHTML = "";

        // flatten 2D array
        const flat = Array.from(this.curLevel.entries.flat());

        // create and add matrix entries
        flat.forEach(element => {
            const entry = document.createElement("div");
            entry.classList.add("matrix-element");
            entry.textContent = element;
            
            this.matrix.appendChild(entry);
        })
    }

    /**
     * Swaps the two specified row indices in the matrix
     * 
     * @param {Number} rowLeft 
     * @param {Number} rowRight 
     */
    swapRows(rowLeft, rowRight) {
        const entries = this.curLevel.entries;

        const left = rowLeft - 1;
        const right = rowRight - 1;

        // swap rows
        const temp = entries[left];
        entries[left] = entries[right];
        entries[right] = temp;

        // update matrix
        this.populateMatrix();
    }

    scaleRow(rowIndex, factor) {
        const entries = this.curLevel.entries;

        // create new row, update entries
        const newRow = entries[rowIndex].map(element => element * factor);
        entries[rowIndex] = newRow;

        // update matrix
        this.populateMatrix();
    }
}

export class Level {
    constructor(rows, columns, entries) {
        this.rows = rows;
        this.columns = columns;
        this.entries = entries;
    }
}