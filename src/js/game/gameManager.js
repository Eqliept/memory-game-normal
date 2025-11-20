import { gameGenerateRandomCards } from "./gameGenerateRandomCards.js";
import { el } from "../utils/dom.js";
import { GameTimer } from "../game/gameTimer.js";
import { init } from "../main.js";

export class GameManager {
    constructor(container, seconds, numberOfCards) {
        this.container = container;
        this.seconds = seconds;
        this.numberOfCards = numberOfCards;

        this.openCards = [];
        this.matchedCards = [];

        this.init();
    }

    set seconds(value) {
        const numValue = Number(value);
        if (numValue > 300) {
            this._seconds = 300;
        } else {
            this._seconds = numValue;
        }
    }

    set numberOfCards(value) {
        const numValue = Number(value);
        if (numValue > 10) {
            this._numberOfCards = 10;
        } else {
            this._numberOfCards = numValue;
        }
    }

    checkCards() {
        const [cardOne, cardTwo] = this.openCards;

        if (cardOne.id === cardTwo.id) {

            cardOne.isMatched = true;
            cardTwo.isMatched = true;

            this.matchedCards.push(cardOne, cardTwo);

            if (this.matchedCards.length === Number(this._numberOfCards * 2)) {
                this.reset();
            }
        } else {

            setTimeout(() => {
                cardOne.unflip();
                cardTwo.unflip();
            }, 700);

        }

        this.openCards = [];
    }

    init() {
        const cardsList = gameGenerateRandomCards(this._numberOfCards);
        cardsList.forEach(id => {
            new Card(this.container, id, this);
        });

        this.timer = new GameTimer(this._seconds, this.container);
        this.timer.start(() => this.reset());
    }

    reset() {
        init();
        this.timer.stop();
    }
}

class Card {
    constructor(container, id, gameManager) {
        this.container = container;
        this.id = id;
        this.gameManager = gameManager;

        this.isFlipped = false;
        this.isMatched = false;

        this.createCard();
    }

    createCard() {
        this.cardElem = el("button", {
            classes: ["card"],
            attrs: [{ "data-cardid": this.id }]
        });

        this.container.append(this.cardElem);

        this.cardElem.addEventListener("click", () => setTimeout(this.flipCard(), 700));
    }

    flipCard() {
        if (this.isFlipped || this.isMatched) return;

        this.isFlipped = true;
        this.cardElem.classList.add("flipped");

        this.gameManager.openCards.push(this);

        if (this.gameManager.openCards.length === 2) {
            this.gameManager.checkCards();
        }
    }

    unflip() {
        this.isFlipped = false;
        this.cardElem.classList.remove("flipped");
    }
}