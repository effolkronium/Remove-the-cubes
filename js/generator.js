// Invoke callback after RANDOM delay,
// Then set up new RANDOM delay ...

function Generator(generateCallback, delayRange) {
    let timer;

    function timerCallback() {
        generateCallback();
        startTimer();
    }

    function startTimer() {
        timer = new Timer(timerCallback, getRandomDelay())
    }

    function getRandomDelay() {
        return Util.getRandomReal(delayRange.min, delayRange.max);
    }

    startTimer();

    this.stop = () => { timer.stop(); };
    this.pause = () => { timer.pause(); };
    this.resume = () => { timer.resume(); };

}