import {tacBoard} from "./tacBoard"


class HtmlBoardRenderer {

    constructor() {

        this.statusDiv = document.getElementById("displayInfo");
        this.cellDivs = Array(9);

        for (let i = 0; i < this.cellDivs.length; i++) {
            this.cellDivs[i] = document.getElementById("rect" + i);
        }

        this.reset();
    }

    reset() {

        for (let i = 0; i < this.cellDivs.length; i++) {
            this.updateRect(i, null);
        }

        this.updateStatus("");
    }

    updateRect(index, value) {

        const div = this.cellDivs[index];

        if (!value) {
            div.innerHTML = "";
            div.style.cursor = "pointer";
        } else {
            div.innerHTML = value;
            div.style.cursor = "default";
        }
    }

    updateStatus(message) {
        this.statusDiv.innerHTML = message;
    }
}

const renderer = new HtmlBoardRenderer();
const board = new tacBoard(renderer);

const bindBoardEvents = function () {

    for (let i = 0; i < renderer.cellDivs.length; i++) {
        const div = renderer.cellDivs[i];
        div.onclick = () => {
            board.chooseRect(i)
        };
    }
};

bindBoardEvents();

const initNewMatchBtn = function () {

    const button = document.getElementById("replayButton");
    button.onclick = () => board.reset();
};

initNewMatchBtn();
