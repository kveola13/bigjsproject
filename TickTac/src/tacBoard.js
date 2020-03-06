const cross = "X";
const circle = "O";

export class tacBoard {
    constructor(renderer) {
        this.rects = Array(9);
        this.renderer = renderer;

        this.reset();
    }

    reset() {
        this.rects.fill(null)
        this.counter = 0;
        this.renderer.reset();
        this.renderer.updateInfo("Player: " + (this.whichPlayer() ? circle : cross));
    }

    chooseRect(index) {
        if (this.rects[index] || this.hasWon()) {
            return;
        }
        const value = this.whichPlayer() ? circle : cross;
        this.rects[index] = value;
        this.renderer.updateRect(index, value);

        if (this.hasCrossWon()) {
            this.renderer.updateInfo("X wins!");
        } else if (this.hasCircleWon()) {
            this.renderer.updateInfo("O wins!");
        } else if (this.counter >= 8) {
            this.renderer.updateInfo("TIE!");
        } else {
            this.renderer.updateInfo("Next: " + (this.whichPlayer() ? circle : cross))
        }
        this.counter++;
    }

    hasWon() {
        return this.hasCrossWon() || this.hasCircleWon();
    }

    hasCrossWon() {
        return this.winCondition(cross);
    }

    hasCircleWon() {
        return this.winCondition(circle);
    }

    winCondition(value) {
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
            const winCon = winCombos[i];
            if (this.rects[winCon[0]] === value
                && this.rects[winCon[1]] === value
                && this.rects[winCon[2]] === value) {
                return true;
            }
        }
        return false;
    }

    whichPlayer() {
        return (this.counter % 2) === 0;
    }
}