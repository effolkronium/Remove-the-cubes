function GameTimer(callback, delay) { 
    const timeElement = $('.Time');

    let timer = new Timer(()=>{}, delay);

    const timerId = setInterval(()=>{
        const date = new Date(timer.getTimeLeft());
        if( timer.getStateFinish() || date.getSeconds() === 0 ) {
            this.stop(true);
        } else {
            timeElement.html( '' + formatTime( date.getMinutes() )
                                 + ':' + formatTime( date.getSeconds() ) );
        }
    }, 100);

    function formatTime(time) {
        if( time < 10 ) return '0' + time;
        return time;
    }

    let isStop = false;
    this.stop = (timeLeft = false)=>{
        if( !isStop ) { // prevent recursion call
            isStop = true;
            timeElement.html( "00:00" );
            clearInterval(timerId);
            timer.stop();
            callback(timeLeft);
        }
    };

    this.pause = ()=>{ timer.pause(); };
    this.resume = ()=>{ timer.resume(); };
    this.isRunning = ()=>timer.getStateRunning();
    this.getTimeLeft = ()=>timer.getTimeLeft();
    this.addTime = timePice=>{ // Time can't be more then 1 minute.
        timer.addTime(timePice);
        const timeLeft = timer.getTimeLeft();
        if(timeLeft > delay) {
            timer.addTime(delay - timeLeft);
        }
    };
}