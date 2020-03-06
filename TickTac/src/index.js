import {tacBoard} from "./tacBoard";

class TikTokBoard {
    constructor() {
        this.statusDiv = document.getElementById("displayInfo");
        this.rects = Array(9);

        for (let i = 0; i < this.rects.length; i++) {
            this.rects[i] = document.getElementById("rect" + i);
        }
        this.reset();
    }

    reset() {
        for (let i = 0; i < this.rects.length; i++) {
            this.updateRects(i, null);
        }
        this.updateInfo("");
    }

    updateRects(index, value) {
        const div = this.rects[index];
        if (!value) {
            div.innerHTML = "";
            div.style.cursor = "pointer";
        } else {
            div.innerHTML = value;
            div.style.cursor = "default";
        }
    }

    updateInfo(message) {
        this.statusDiv.innerHTML = message;
    }
}

const renderer = new TikTokBoard();
const board = new tacBoard(renderer);

const bindBoards = function () {
    for (let i = 0; i < renderer.rects.length; i++) {
        const div = renderer.rects[i];
        div.onclick = () => {
            board.chooseRect(i)
        }
    }
};

bindBoards();

const replayMatch = function () {
    const button = document.getElementById("replayButton");
    button.onclick = () => board.reset();
};

replayMatch();