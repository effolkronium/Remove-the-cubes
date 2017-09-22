'use strict'
// Invoke callback after delay. Can be paused and ...
function Timer(callback, delay) {
    this.remaining = delay;
    this.callback = callback;
    this.running = true;
    this.finish = false;
    this.timerId;
    this.start;
    
    this.resume(); // Start timer
}

Timer.prototype.pause = function() {
    if( this.running ) {
        this.running = false;
        window.clearTimeout(this.timerId);
        this.remaining -= new Date() - this.start;
    }
};

Timer.prototype.resume = function() {
    this.running = true;
    this.start = new Date();
    window.clearTimeout(this.timerId);

    this.timerId = window.setTimeout(()=>{
        this.finish = true;
        this.running = false;
        this.callback();
    }, this.remaining);
};

Timer.prototype.getTimeLeft = function() {
    if(this.running)
        return this.remaining - ( new Date() - this.start );
    else
        return this.remaining;
};

Timer.prototype.addTime = function(timePice) {
    this.remaining += timePice;
    if (this.running) {
        this.pause()
        this.resume()
    }
};

Timer.prototype.getStateRunning = function() { return this.running; };

Timer.prototype.getStateFinish = function() { return this.finish; };

Timer.prototype.stop = function() { 
    this.finish = true; this.running = false;
    window.clearTimeout(this.timerId); 
};