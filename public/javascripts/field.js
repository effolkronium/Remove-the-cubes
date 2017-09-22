// Game field. Can add DOM elements into itself
function Field() {
    const fieldElement = $('.field');
    const size_ = { width: fieldElement.width(), height: fieldElement.height() };

    // add element to the field(panel) on RANDOM position
    this.addElement = element => {
        fieldElement.append(element);
        setToRandomPosition(element);
    };

    this.getArea = () => fieldElement.width() * fieldElement.height();
    this.getSize = () => { return { width: fieldElement.width(), height: fieldElement.height() } };
    this.clear = () => { fieldElement.empty(); };

    // Set random position of a DOM element relative to the field DOM element
    // considering the size of the element
    function setToRandomPosition(element) {
        const elSize = {
            width: element.outerWidth(),
            height: element.outerHeight()
        };

        const diffSize = {
            width: size_.width - elSize.width,
            height: size_.height - elSize.height
        };

        const randomPosition = {
            x: Util.getRandomInt(0, diffSize.width),
            y: Util.getRandomInt(0, diffSize.height),
        };

        element.css({ position: 'absolute' });
        element.css({ left: randomPosition.x, top: randomPosition.y });
    }

}