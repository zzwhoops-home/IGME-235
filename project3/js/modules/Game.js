export class Game {

    constructor(level, score, moves, timer) {
        this.level = level;
        this.score = score;
        this.moves = moves;
        this.levelTime = timer;

        // this should be used for decrementing 
        this.curTimer = timer;
    }
}