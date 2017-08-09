// Set up basics events
$(document).ready(() => {
    const field = new Field;
    const points = new Points;

    function produceCube() {
        field.addElement(makeCube(100, 'red', cubeOnMouseDown));
    } produceCube();

    function cubeOnMouseDown(event) {
        $(event.target).remove();
        points.add(1);
        for(let i = 0; i < Util.getRandomInt(0, 3); ++i)
            produceCube();
    }
});