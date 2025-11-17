import { gameUI } from "./game/gameUI.js";

const container = document.getElementById("app");

export function init() {
    gameUI(container);
}

init();