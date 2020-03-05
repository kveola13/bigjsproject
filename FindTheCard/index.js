let firstSelection = null;
let gameOver = true;
let brouverPosition = 0;
let flipped = null;
let fiftyPercent = Math.floor(Math.random() * 2);
let thirtyPercent = Math.floor(Math.random() * 3);

const cardPositions = [0, 1, 2];

const brouver = "img/brouver.jpg";
const isengrimOrEilhart = ["img/eilhart.jpg", "img/isengrim.jpg"];
const cardBacks = ["img/scb.png","img/stcb.png","img/sycb.png",];

function newGame(){
    gameOver = false;
    firstSelection = null;
    flipped = null;
    brouverPosition = thirtyPercent;
    showFirstText();
    showCardBack(0);
    showCardBack(1);
    showCardBack(2);
}

function clickCard(index) {
    if(gameOver || index === flipped){
        return;
    }
    document.getElementById("image"+index).classList.add("selectedCard");

    if(firstSelection === null){
        firstSelection = index;
        const options = cardPositions.filter(position => position !== index && position !== brouverPosition);
        const display = options[Math.floor(Math.random()) * options.length];

        showCards(display);
        showSecondText();
        flipped = display;
    } else {
        if(index !== firstSelection){
            document.getElementById("image"+firstSelection).classList.remove("selectedCard")
        }
        gameOver = true;
        showAllCards();

        if(index === brouverPosition){
            showVictoryText();
        } else {
            showFailureText();
        }
    }
}

function hideText() {
    document.getElementById("firstSelection").style.display="none";
    document.getElementById("secondSelection").style.display="none";
    document.getElementById("victory").style.display="none";
    document.getElementById("failure").style.display="none";
}

function showFirstText() {
    hideText();
    document.getElementById("firstSelection").style.display="block";
}

function showSecondText() {
    hideText();
    document.getElementById("secondSelection").style.display="block";
}

function showVictoryText() {
    hideText();
    document.getElementById("victory").style.display="block";
}

function showFailureText() {
    hideText();
    document.getElementById("failure").style.display="block";
}

function showCards(index) {
    const image = document.getElementById("image"+index);

    image.src = isengrimOrEilhart[fiftyPercent];
    image.style.cursor = "default";
    image.classList.remove("cardBack");
}

function showBrouver(index) {
    const image = document.getElementById("image"+index);
    image.src = brouver;
    image.style.cursor = "default";
    image.classList.remove("cardBack");
}

function showAllCards() {
    for (let i = 0; i < cardPositions.length; i++) {
        if(i === brouverPosition){
            showBrouver(i);
        } else {
            showCards(i);
        }
    }
}

function showCardBack(index) {
    const image = document.getElementById("image"+index);
    image.src = cardBacks[Math.round(thirtyPercent)];
    image.style.cursor = "pointer";
    if(!image.classList.contains("cardBack")){
        image.classList.add("cardBack")
    }
    image.classList.remove("cardBack");
}