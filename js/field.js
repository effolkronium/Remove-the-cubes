// Game field. Can add DOM elements into itself
function Field() {
    const fieldElement = $('.field');
    const size_ = { width: fieldElement.width(), height: fieldElement.height() };

    // add element to the field(panel) on RANDOM position
    this.addElement = element => {
        fieldElement.append(element);
        setToRandomPosition(element);
    };

    // Set random position of a DOM element relative to the field DOM element
    // considering the size of the element
    function setToRandomPosition(element) {
        element = $(element);

        const elSize = {
            width: element.outerWidth(),
            height: element.outerHeight()
        };

        const diffSize = {
            width: size_.width - elSize.width,
            height: size_.height - elSize.height
        };

        const randomPosition = getRandomPosition(diffSize);

        element.css({ position: 'absolute' });
        element.css({ left: randomPosition.x, top: randomPosition.y });
    }

    /**
     * Returns a random position on a plane,
     * starting from the left-top: corner{0, 0},
     * to the right-bot corner: limitSize
     * 
     * @param {Object} limitSize {width:Number, height:Number}
     *  max possible position
     * @return {Object} {x:Number, y:Number}
     */
    function getRandomPosition(limitSize) {
        return {
            x: Util.getRandomInt(0, limitSize.width),
            y: Util.getRandomInt(0, limitSize.height),
        };
    }
}