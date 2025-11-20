import { el } from "../utils/dom.js";
import { GameManager } from "./gameManager.js";
import { MyError } from "../utils/MyError.js";

export function gameUI(container) {
    const gameSettingsForm = el("form", {classes: ["game-settings"]});

    const gameTimerWrapper = el("div", {classes: ["timer"]});
    const gameCardsWrapper = el("div", {classes: ["cards"]});

    const gameTimerInput = el("input", {
        classes: ["timer__input"], 
        attrs: [
            {"placeholder": "Количество секунд"},
            {"type": "text"},
            {"inputmode": "numeric"}
        ]
    });
    
    const gameCardsInput = el("input", {
        classes: ["cards__input"], 
        attrs: [
            {"placeholder": "Количество пар карточек"},
            {"type": "text"},
            {"inputmode": "numeric"}
        ]
    });

    const gameSettingsSubmit = el("button", {classes: ["game-settings__submit", "btn", "btn-success"], text: "Начать игру"});

    gameCardsWrapper.append(gameCardsInput);
    gameTimerWrapper.append(gameTimerInput);
    gameSettingsForm.append(gameTimerWrapper, gameCardsWrapper, gameSettingsSubmit);

    container.append(gameSettingsForm);

    gameTimerInput.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, "");
    });

    gameCardsInput.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, "");
    });

    const clearTimerErrors = () => {
        MyError.clearErrors(gameTimerWrapper);
    };

    const clearCardsErrors = () => {
        MyError.clearErrors(gameCardsWrapper);
    };

    gameTimerInput.addEventListener("input", clearTimerErrors);
    gameCardsInput.addEventListener("input", clearCardsErrors);
    
    gameSettingsSubmit.addEventListener("click", (e) => {
        e.preventDefault();

        MyError.clearErrors(gameSettingsForm);

        const timerSeconds = gameTimerInput.value.trim();
        const cardsNumber = gameCardsInput.value.trim();

        let hasErrors = false;

        if (!timerSeconds) {
            const error = new MyError("Поле 'Количество секунд' не может быть пустым", gameTimerInput);
            error.display();
            hasErrors = true;
        } else if (!/^\d+$/.test(timerSeconds)) {
            const error = new MyError("Можно вводить только цифры", gameTimerInput);
            error.display();
            hasErrors = true;
        } else {
            const secondsNum = parseInt(timerSeconds, 10);
            if (secondsNum <= 0) {
                const error = new MyError("Количество секунд должно быть больше 0", gameTimerInput);
                error.display();
                hasErrors = true;
            } else if (secondsNum > 300) {
                const error = new MyError("Максимальное количество секунд: 300", gameTimerInput);
                error.display();
                hasErrors = true;
            }
        }

        if (!cardsNumber) {
            const error = new MyError("Поле 'Количество пар карточек' не может быть пустым", gameCardsInput);
            error.display();
            hasErrors = true;
        } else if (!/^\d+$/.test(cardsNumber)) {
            const error = new MyError("Можно вводить только цифры", gameCardsInput);
            error.display();
            hasErrors = true;
        } else {
            const cardsNum = parseInt(cardsNumber, 10);
            if (cardsNum <= 0) {
                const error = new MyError("Количество пар карточек должно быть больше 0", gameCardsInput);
                error.display();
                hasErrors = true;
            } else if (cardsNum > 10) {
                const error = new MyError("Максимальное количество пар карточек: 10", gameCardsInput);
                error.display();
                hasErrors = true;
            }
        }

        if (hasErrors) {
            return;
        }

        const finalSeconds = Math.min(parseInt(timerSeconds, 10), 300);
        const finalCards = Math.min(parseInt(cardsNumber, 10), 10);

        new GameManager(container, finalSeconds, finalCards);
        gameSettingsForm.remove();
    })
}

export function gameMessage(isWin, callback) {

}