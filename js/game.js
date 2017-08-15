// The Game logic
function Game() {
    const cubeGenerationDelay = { min: 500, max: 1000 }; // miliseconds
    const gameTime = 60000; // miliseconds

    const field = new Field;
    const points = new Points;
    const cubeGenerator = new Generator(produceCubes, cubeGenerationDelay);
    const gameTimer = new GameTimer(() => { 
        Result.addResult(points.getTotalPoints());
        this.stop(); 
    }, gameTime);

    let running = true;
    let onFinishCallback = () => { };

    // Create cube and add its to a game field
    function produceCube() {
        if (Cube.getTotalArea() < field.getArea() / 3
             && Cube.getCubesNumber() < 15 ) {// Prevent too many cubes on a field
            let mover = {};
            let cubePoints = 1;
            const cube = new Cube(getCubeSizeByGameTime(), getCubeColor(), (event, flag) => {
                if (flag) { // mover action
                    if ('pause' == flag)
                        mover.pause();
                    else if ('resume' == flag)
                        mover.resume();
                    else if('stop' == flag)
                        mover.stop(); // Stop movement after cube destruction
                    else throw 0;
                } else if(running && 1 === event.buttons) { // left mouse button
                    if( cube.color == 'blue') {
                        cube.setColor('yellow')
                        ++cubePoints;
                    }
                    else if( cube.color == 'yellow') {
                        cube.setColor('red')
                        ++cubePoints;
                    }
                    else if( cube.color == 'red') {
                        cubeOnMouseDown(event, cubePoints);
                        mover.stop();
                    } 
                    else if( cube.color == 'time') {
                        cubePoints = 0;
                        gameTimer.addTime(1000);
                        cubeOnMouseDown(event, cubePoints);
                        mover.stop();
                    }
                }
            });

            field.addElement(cube.jElement);
            mover = new Mover(cube.jElement, field); // Make cube moveable
        }
    }
    produceCubes(false); // First cube

    // Produce cubes ( 0 or 1 or 2 ) RANDOM
    function produceCubes(fromZero = true) {
        for (let i = 0; i < Util.getRandomInt(fromZero ? 0 : 1, 3); ++i)
            produceCube();
    }

    // Add points and, in some cases, new cubes
    function cubeOnMouseDown(event, cubePoints) {
        if (running) {
            $(event.target).remove();

            points.add(cubePoints);

            const fewCubes = Cube.getCubesNumber() <= 1;
            if (fewCubes
                || Math.random() > 0.5) // Make generation of cubes more smooze
                produceCubes(!fewCubes); // If few cubes, produce 1 or more
        }
    }

    // return cube size depended from game time
    function getCubeSizeByGameTime() {
        const timeLeft = gameTimer.getTimeLeft();

        if (timeLeft > gameTime * 0.90)
            return Util.getRandomInt(75, 100);
        else if (timeLeft > gameTime * 0.75)
            return Util.getRandomInt(50, 75);
        else if (timeLeft > gameTime * 0.50)
            return Util.getRandomInt(25, 40);
        else if (timeLeft > gameTime * 0.25)
            return Util.getRandomInt(10, 20);
        else return Util.getRandomInt(1, 10);
    }

    function getCubeColor() {
        if( Math.random() > 0.85 ) return 'time'; // a Cube which increase game timer
        switch (Util.getRandomInt(0, 2)) {
            case 0: return 'red';
            case 1: return 'blue';
            case 2: return 'yellow';
        }
    }

    this.stop = () => {
        running = false;
        gameTimer.stop();
        cubeGenerator.stop();
        $( ".cube" ).trigger( "mousedown", "stop" ); // Invoke mover action
        field.clear();
        onFinishCallback();
    };

    this.pause = () => {
        if (running) {
            running = false;
            $( ".cube" ).trigger( "mousedown", "pause" );
            cubeGenerator.pause();
            gameTimer.pause();
        }
    };

    this.resume = () => {
        if (!running) {
            running = true;
            gameTimer.resume();
            cubeGenerator.resume();
            $( ".cube" ).trigger( "mousedown", "resume" );
        }
    };

    this.isRunning = () => running;

    this.onFinish = callback => { onFinishCallback = callback; };
}