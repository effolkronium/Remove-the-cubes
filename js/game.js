// The GAME
function Game() {
    const cubeGenerationDelay = {min: 500, max: 1000}; // miliseconds
    const gameTime = 60000; // miliseconds

    const field = new Field;
    const points = new Points;
    const cubeFactory = new CubeFactory;
    const cubeGenerator = new Generator(produceCubes, cubeGenerationDelay);
    const gameTimer = new GameTimer(()=>{this.stop();}, gameTime );

    let running = true;
    let onFinishCallback = ()=>{};

    function produceCube() {
        if(cubeFactory.getTotalArea() < field.getArea() / 3 ) {
            field.addElement(cubeFactory.makeCube(getCubeSize(),
                                                  getCubeColor(),
                                                  cubeOnMouseDown));
        }
    } produceCubes(); // First cube

    // Produce cubes ( 0 or 1 or 2 ) RANDOM
    function produceCubes() {
        for(let i = 0; i < Util.getRandomInt(0, 3); ++i)
            produceCube();
    }

    function cubeOnMouseDown(event) {
        if( running ) {
            $(event.target).remove();
            points.add(1);
            console.log(cubeFactory.getCubesNumber());
            if( cubeFactory.getCubesNumber() === 0 || Math.random() > 0.5 )
                produceCubes();
        }
    }

    function getCubeSize() {
        const timeLeft = gameTimer.getTimeLeft();

        if( timeLeft > gameTime * 0.90 )
            return Util.getRandomInt(75, 100);
        else if( timeLeft > gameTime * 0.75 )
            return Util.getRandomInt(50, 75);
        else if( timeLeft > gameTime * 0.50 )
            return Util.getRandomInt(25, 40);
        else if( timeLeft > gameTime * 0.25 )
            return Util.getRandomInt(10, 20);
        else return Util.getRandomInt(1, 10);
    }

    function getCubeColor() {
        switch(Util.getRandomInt(0, 3)) {
            case 1: return 'red';
            case 0: return 'blue';
            case 2: return 'green';
            case 3: return 'yellow';
        }
    }

    this.stop = ()=>{
        if( gameTimer.isRunning( ) )
            gameTimer.stop();
        cubeGenerator.stop();
        field.clear();
        onFinishCallback();
    };

    this.pause = ()=>{
        if( running ) {
            running = false;
            gameTimer.pause();
            cubeGenerator.pause();
        }
    };

    this.resume = ()=>{
        if( !running ) {
            running = true;
            gameTimer.resume();
            cubeGenerator.resume();
        }
    };

    this.isRunning = ()=>running;

    this.onFinish = callback=>{onFinishCallback = callback;};
}