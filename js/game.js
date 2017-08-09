// THE GAME
function Game() {
    const cubeGenerationDelay = {min: 500, max: 1000}; // miliseconds
    const gameTime = 60000; // miliseconds

    const field = new Field;
    const points = new Points;
    const cubeFactory = new CubeFactory;
    const cubeGenerator = new Generator(produceCubes, cubeGenerationDelay);
    const gameTimer = new GameTimer(()=>{}, gameTime );

    console.log("GAME AREA: " + field.getArea());
    function produceCube() {
        if(cubeFactory.getTotalArea() < field.getArea() / 2 ) {
            field.addElement(cubeFactory.makeCube(Util.getRandomInt(50, 100), 'red', cubeOnMouseDown));
        }
    } produceCubes(); // First cube

    // Produce cubes ( 0 or 1 or 2 ) RANDOM
    function produceCubes() {
        for(let i = 0; i < Util.getRandomInt(0, 3); ++i)
            produceCube();
    }

    function cubeOnMouseDown(event) {
        $(event.target).remove();
        points.add(1);
        produceCubes();
    }
}