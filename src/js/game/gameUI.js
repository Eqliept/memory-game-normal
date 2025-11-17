import { el } from "../utils/dom.js";
import { gameManager } from "./gameManager.js";

export function gameUI(container) {
    const gameSettingsForm = el("form", {classes: ["game-settings"]});

    const gameTimerWrapper = el("div", {classes: ["timer"]});
    const gameCardsWrapper = el("div", {classes: ["cards"]});

    const gameTimerInput = el("input", {classes: ["timer__input"], attrs: [{"placeholder": "Количество секунд"}]});
    const gameCardsInput = el("input", {classes: ["cards__input"], attrs: [{"placeholder": "Количество карточек"}]});

    const gameSettingsSubmit = el("button", {classes: ["game-settings__submit", "btn", "btn-success"], text: "Начать игру"});

    gameCardsWrapper.append(gameCardsInput);
    gameTimerWrapper.append(gameTimerInput);
    gameSettingsForm.append(gameTimerWrapper, gameCardsWrapper, gameSettingsSubmit);

    container.append(gameSettingsForm);

    gameSettingsSubmit.addEventListener("click", (e) => {
        e.preventDefault();

        const timerSeconds = gameTimerInput.value;
        const cardsNumber = gameCardsInput.value;

        gameManager(container, timerSeconds, cardsNumber);
        gameSettingsForm.remove();
    })
}