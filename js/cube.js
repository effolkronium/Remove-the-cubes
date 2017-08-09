// create a square 'div' DOM element
// with size{Number} and color{String}
function makeCube(size, color, onmousedown) {
    const cubeElement = document.createElement('div');

    cubeElement.setAttribute("style",
        "width:" + size + "px;"
        + "height:" + size + "px;"
        + "background-color:" + color + ";"
    );

    cubeElement.onmousedown = onmousedown;
    
    return cubeElement;
}