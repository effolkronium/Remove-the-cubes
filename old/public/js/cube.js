// Construct a cube DOM element
function Cube(size, color, onClick) {
    // JQuery cube DOM element
    this.jElement = $("<img>", {
        style: "width:" + size + "px;"
        + "height:" + size + "px;",
        src: "assets/cube_" + color + ".svg",
        class: "cube"
    });

    this.color = color;
    this.setColor = newColor => {
        this.jElement.attr("src", "assets/cube_" + newColor + ".svg");
        this.color = newColor;
    }

    this.jElement.mousedown(onClick);
    this.jElement.css("user-select", "none");
    this.jElement.on('dragstart', event => { event.preventDefault(); });
    $('.field').on('dragstart', event => { event.preventDefault(); });
}

// Static methods:

Cube.getCubesNumber = () => $('.cube').length;

// Returns sum of area for all existing cubes
Cube.getTotalArea = () => {
    return $('.cube').toArray().reduce((prevValue, thisElem) => {
        return prevValue + $(thisElem).outerWidth() * $(thisElem).outerHeight();
    }, 0);
};