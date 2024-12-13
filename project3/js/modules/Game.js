import { elementCounter } from "./animations.js";

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
        const level = new Level(4, 4, [
            [-2, 6, -1, 6],
            [6, -18, 0, -30],
            [3, -9, 1, -11],
            [4, -12, 2, -12]
        ]);
        // const level = new Level(4, 4, [
        //     [1, -3, 0, -5],
        //     [0, 0, 2, 8],
        //     [0, 0, 1, 4],
        //     [0, 0, 0, 0]
        // ]);
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
        const prev = Array.from(this.curLevel.prevEntries.flat());
        const flat = Array.from(this.curLevel.entries.flat());

        // create and add matrix entries
        for (let i = 0; i < flat.length; i++) {
            const entry = document.createElement("div");
            entry.classList.add("matrix-element");

            const curVal = flat[i];
            const prevVal = prev[i];

            // two decimal places for displayed elements
            elementCounter(prevVal, curVal, entry);

            // if the previous element is different, change styling
            if (prevVal != curVal) {
                // add animation class, remove after animation ends
                entry.classList.add("animate");
                setTimeout(() => {
                    entry.classList.remove("animate");
                }, 500);
            }
            this.matrix.appendChild(entry);
        }

        // whenever matrix is updated, check rref
        if (this.checkRREF()) {
            const matrixContainer = document.querySelector("#matrix-container");
            matrixContainer.style.backgroundColor = "#00cc00";
        }
        else {
            const matrixContainer = document.querySelector("#matrix-container");
            matrixContainer.style.backgroundColor = "";
        }

        // spread rows
        this.curLevel.prevEntries = this.curLevel.entries.map(row => [...row]);
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

    scaleRow(row, factor) {
        const entries = this.curLevel.entries;
        const rowIndex = row - 1;

        // create new row, update entries
        const newRow = entries[rowIndex].map((element) => {
            // use precise Decimal.js to calculate
            const newEntry = new Decimal(element).times(new Decimal(factor));


            if (Math.abs(newEntry) < Number.EPSILON) {
                return 0;
            }
            else if (Math.abs(Math.round(newEntry) - newEntry) < 0.001 && Math.round(newEntry) != 0) {
                return Math.round(parseFloat(newEntry.toPrecision(7)));
            }
            else {
                return parseFloat(newEntry.toPrecision(7));
            }
        });
        entries[rowIndex] = newRow;

        // update matrix
        this.populateMatrix();
    }

    /**
     * The "left" row is added to the "right" row
     * If add = false, the left row is negated first before addition
     * 
     * @param {*} rowLeft 
     * @param {*} rowRight 
     * @param {*} add
     */
    pivotRows(rowLeft, rowRight, add = true) {
        const entries = this.curLevel.entries;

        // get indices
        const left = rowLeft - 1;
        const right = rowRight - 1;

        // get corresponding arrays
        let leftEntries = entries[left];
        let rightEntries = entries[right];

        // negate if subtracting
        if (!add) {
            leftEntries = leftEntries.map((element) => {
                return element != 0 ? -element : element;
            });
        }

        // perform pivot
        for (let i = 0; i < this.curLevel.columns; i++) {
            rightEntries[i] += leftEntries[i];
        }

        // update entries with pivot
        entries[right] = rightEntries;

        // update matrix
        this.populateMatrix();
    }

    /**
     * Checks if the current matrix is in reduced row echelon form
     * 
     * @returns Boolean
     */
    checkRREF() {
        const entries = this.curLevel.entries;
        let leading = [];
        let emptyRows = [];

        // first nonzero entry in each row should be 1
        for (let i = 0; i < this.curLevel.rows; i++) {
            let empty = true;

            for (let j = 0; j < this.curLevel.columns; j++) {
                const entry = entries[i][j];

                // if we found a leading 1
                if (entry == 1) {
                    // add leading 1 index
                    leading.push([i, j]);

                    // row is not empty
                    empty = false;
                    break;
                }

                // not in rref if we find nonzero entry which != 1
                if (entry != 0 && entry != 1) {
                    // row is not empty
                    empty = false;

                    return false;
                }
            }

            // row is empty, add row to empty list
            if (empty) {
                emptyRows.push(i);
            }
        }

        // all empty rows must be on the bottom
        if (emptyRows) {
            const firstEmpty = emptyRows[0];
            const lastNonEmpty = leading[leading.length - 1][0];

            if (firstEmpty < lastNonEmpty) {
                return false;
            }
        }

        // if a column has a leading 1, it must be to the right of
        // leading 1s in rows above it
        for (let i = 0; i < leading.length - 1; i++) {
            if (leading[i][1] > leading[i + 1][1]) {
                return false;
            }
        }

        // if a column contains a leading 1, the rest of the entries must = 0
        for (let index of leading) {
            const row = index[0];
            const col = index[1];
            for (let i = 0; i < this.curLevel.rows; i++) {
                if (i != row && entries[i][col] != 0) {
                    return false;
                }
            }
        }

        // if we reach the end, we are in rref
        return true;
    }
}

export class Level {
    prevEntries = null;
    startEntries = null;

    constructor(rows, columns, entries) {
        this.rows = rows;
        this.columns = columns;
        this.entries = entries;

        this.startEntries = entries.map(row => [...row]);
        this.prevEntries = entries.map(row => [...row]);
    }
}