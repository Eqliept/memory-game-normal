import { init } from "../main.js";
import { el } from "../utils/dom.js";
import { gameGenerateRandomCards } from "./gameGenerateRandomCards.js";
import { timer as gameTimer } from "./gameTimer.js";

export function gameManager(container, seconds, numberOfCards) {
    let openCards = [];
    let matchedCards = [];
    let timer = null;
    let isProcessing = false;

    function start(seconds, numberOfCards) {
        const timerContainer = document.getElementById("timer");
        const cardsList = gameGenerateRandomCards(numberOfCards);

        timer = gameTimer(seconds, timerContainer);
        timer.promise.then(() => {
            reset();
        });

        cardsList.forEach(element => {
            const card = el("button", {
                classes: ["card"],
                attrs: [{ "data-cardid": element }]
            });
            container.append(card);
        });

        function flip(card) {
            card.classList.add("flipped");
        }

        function unflip(cards) {
            cards.forEach(element => {
                if (!matchedCards.includes(element)) {
                    element.classList.remove("flipped");
                }
            });
        }

        function matched(cards) {
            if (cards[0].dataset.cardid === cards[1].dataset.cardid) {
                matchedCards.push(cards[0], cards[1]);
            }

            if (matchedCards.length === numberOfCards * 2) {
                if (timer) {
                    timer.stop();
                }
                reset();
            }
        }

        container.addEventListener("click", (e) => {
            if (e.target.classList.contains("card")) {
                const isAlreadyFlipped = e.target.classList.contains("flipped");
                const isAlreadyMatched = matchedCards.includes(e.target);
                
                if (isProcessing || isAlreadyFlipped || isAlreadyMatched) {
                    return;
                }

                if (openCards.length < 2) {
                    flip(e.target);
                    openCards.push(e.target);
                    
                    if (openCards.length === 2) {
                        isProcessing = true;
                        setTimeout(() => {
                            matched(openCards);
                            unflip(openCards);
                            openCards = [];
                            isProcessing = false;
                        }, 1000);
                    }
                }
            }
        });
    }

    function reset() {
        if (timer) {
            timer.stop();
            timer = null;
        }
        const cards = document.querySelectorAll(".card");
        cards.forEach(element => element.remove());
        openCards = [];
        matchedCards = [];

        init();
    }

    start(seconds, numberOfCards);
}