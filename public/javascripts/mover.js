// Move a DOM element on a field
function Mover(element, field) {
    let position = {
        x: element.position().left,
        y: element.position().top
    };
    let velocity = {
        x: Util.getRandomReal(0.05, 0.10),
        y: Util.getRandomReal(0.05, 0.10)
    };
    const frameRate = 1000 / 7;
    let lastTime = new Date;

    let isRunning = true;
    let isPaused = false;

    // Stop setInterval
    this.stop = () => { isRunning = false; };

    this.pause = ()=>{isPaused = true;};
    this.resume = ()=>{isPaused = false;};

    // Invoke update every frame
    const intervalId = setInterval(() => {
        if (isRunning) { // While target element exist
            if(!isPaused)
                update(updateFrameTime());
            else lastTime = new Date;
        } else {
            clearInterval(intervalId);
        }
    }, frameRate);

    update(1); // First update

    // Change movement direction after random delay
    !function setRandomVelocity() {
        if (isRunning) {
            setTimeout(setRandomVelocity, Util.getRandomInt(500, 2000));

            if (Math.random() >= 0.5) {
                if (velocity.x > 0) velocity.x = -velocity.x;
                else velocity.x = Math.abs(velocity.x);
            }
            if (Math.random() >= 0.5) {
                if (velocity.y > 0) velocity.y = -velocity.y;
                else velocity.y = Math.abs(velocity.y);
            }
        }
    }();

    // Update position of a target DOM element
    function update(delta /*Time since last frame*/) {
        // Set new position with binding to time
        //console.log(position.x);
        position.x += velocity.x * delta;
        position.y += velocity.y * delta;

        updatePosition();
        updateVelocity(); // If a DOM elememnt is out of a field, change moevment direction
        updatePosition();
    }

    // Set new position offset[left, top] of target DOM element
    function updatePosition() {
        element.css({
            left: position.x,
            top: position.y
        });
    }

    // Set new position offset[left, top] of a target DOM element
    function updateVelocity(newPosition) {
        const qPosition = {
            right: position.x + element.outerWidth(),
            bot: position.y + element.outerHeight(),
            left: position.x,
            top: position.y
        }

        const fieldSize = field.getSize();
        // fix x
        if (qPosition.right > fieldSize.width) {
            position.x -= qPosition.right - fieldSize.width;
            velocity.x = -velocity.x;
        } else if (qPosition.left < 0) {
            position.x = 0;
            velocity.x = Math.abs(velocity.x);
        }

        // fix y
        if (qPosition.bot > fieldSize.height) {
            position.y -= qPosition.bot - fieldSize.height;
            velocity.y = -velocity.y;
        } else if (position.y < 0) {
            position.y = 0;
            velocity.y = Math.abs(velocity.y);
        }
    }

    // Update time and return delay since last frame
    function updateFrameTime() {
        const thisTime = new Date;
        const delay = thisTime - lastTime; // get the delta time since last frame
        lastTime = thisTime;
        return delay;
    }
}