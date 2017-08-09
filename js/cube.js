function CubeFactory() {
    // create a square 'div' DOM element
    // with size{Number} and color{String}
    this.makeCube = (size, color, mouseEvent) => {
        const cube = $("<div></div>", {
            style: "width:" + size + "px;"
            + "height:" + size + "px;"
            + "background-color:" + color + ";",
            class: "cube"
        });

        cube.mousedown(mouseEvent);

        return cube;
    };

    // Returns sum of area for all existing cubes
    this.getTotalArea = ()=>{
        return $('.cube').toArray().reduce((prevValue, thisElem)=>{
            return prevValue + $(thisElem).outerWidth() * $(thisElem).outerHeight();
        }, 0);
    };

    this.getCubesNumber = ()=>$('.cube').length();
}