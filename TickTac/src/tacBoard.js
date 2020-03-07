const X = "X";
const O = "O";


export class tacBoard {

    constructor(renderer) {
        this.rects = Array(9);
        this.renderer = renderer;
        this.reset();
    }

    reset() {
        this.rects.fill(null);
        this.counter = 0;
        this.renderer.reset();
        this.renderer.updateStatus("Next: " + (this.whichPlayer() ? X : O));
    }

    chooseRect(index) {
        if (this.rects[index] || this.gameOver()) {
            return;
        }

        const value = this.whichPlayer() ? X : O;
        this.rects[index] = value;
        this.renderer.updateRect(index, value);

        if (this.hasCrossWon()) {
            this.renderer.updateStatus("X wins");
        } else if (this.doesOWin()) {
            this.renderer.updateStatus("O wins");
        } else if (this.counter >= 8) {
            this.renderer.updateStatus("TIE!");
        } else {
            this.renderer.updateStatus("Next: " + (this.whichPlayer() ? O : X));
        }

        this.counter++;
    }

    gameOver() {
        return this.hasCrossWon() || this.doesOWin();
    }

    hasCrossWon() {
        return this.doesWin(X);
    }

    doesOWin() {
        return this.doesWin(O);
    }

    doesWin(value) {

        const winCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let i = 0; i < winCombos.length; i++) {
            const winConditions = winCombos[i];

            if (this.rects[winConditions[0]] === value
                && this.rects[winConditions[1]] === value
                && this.rects[winConditions[2]] === value) {
                return true;
            }
        }
        return false;
    }

    whichPlayer() {
        return (this.counter % 2) === 0;
    }
}

