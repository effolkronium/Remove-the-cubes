'use strict'
// Invoke callback after RANDOM delay,
// Then set up new RANDOM delay then ...
function Generator(callback, delayRange) {
    // CUTE
    Timer.call(this, () => {
        Generator.call(this, callback, delayRange); // Restart timer
        callback();
    }, Util.getRandomReal(delayRange.min, delayRange.max));
}

// Inheritance all timer methods
Generator.prototype = Object.create(Timer.prototype);
Generator.prototype.constructor = Generator;