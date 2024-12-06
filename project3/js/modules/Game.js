export class Game {
    curLevel = null;

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
        const level = new Level(3, 3, [[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
        this.curLevel = level;
    }
}

export class Level {
    constructor(rows, columns, entries) {
        this.rows = rows;
        this.columns = columns;
        this.entries = entries;
    }
}