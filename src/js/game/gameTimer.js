export class GameTimer {
    constructor(seconds, container, gameManager) {
        this.seconds = seconds;
        this.container = container;
        this.gameManager = gameManager;
        this.timerElement = document.getElementById("timer");
        this.timerInterval = null;
    }

    start(callback) {
        return new Promise(resolve => {
            this.timerInterval = setInterval(() => {
                this.seconds -= 1;
                this.updateDisplay();

                if (this.seconds === 0) {
                    clearInterval(this.timerInterval);
                    this.stop();
                    callback();
                    resolve();
                }
            }, 1000)
        })
    }

    updateDisplay() {
        if (this.timerElement) {
            this.timerElement.textContent = `${this.seconds}`;
        }
    }

    stop() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
            this.timerElement.innerHTML = "";
        }
    }
}