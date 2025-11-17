export function timer(seconds, container) {
    let timerSeconds = seconds;
    let interval = null;
    let resolvePromise = null;
    
    const promise = new Promise(resolve => {
        resolvePromise = resolve;
        container.textContent = timerSeconds;

        interval = setInterval(() => {
            timerSeconds -= 1;
            container.textContent = timerSeconds;

            if (timerSeconds <= 0) {
                stop();
            }
        }, 1000);
    });

    function stop() {
        if (interval) {
            clearInterval(interval);
            interval = null;
            container.textContent = "";
            if (resolvePromise) {
                resolvePromise("done");
            }
        }
    }

    return {
        promise,
        stop
    };
}