'use strict'

// Timer which update DOM element 'time left'
function GameTimer(callback, delay) {
    Timer.call(this, callback, delay); // parent constructor

    // Start DOM 'time left' updating
    const timeElement = $('.Time');

    function formatTime(time) {
        if (time < 10) return '0' + time;
        return time;
    }

    const timerId = setInterval(() => {
        const date = new Date(this.getTimeLeft());
        
        if (this.getStateFinish()) {
            clearInterval(timerId);
            timeElement.html( "00:00" );
        } else {
            timeElement.html('' + formatTime(date.getMinutes())
                + ':' + formatTime(date.getSeconds()));
        }
    }, 100);
}

GameTimer.prototype = Object.create(Timer.prototype);
GameTimer.prototype.constructor = GameTimer;