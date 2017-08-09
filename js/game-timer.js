function GameTimer(callback, delay) { 
    const timeElement = $('.Time');

    let timer = new Timer(()=>{}, delay);

    const timerId = setInterval(()=>{
        const date = new Date(timer.getTimeLeft());
        if( timer.getStateFinish() || date.getSeconds() === 0 ) {
            this.stop();
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
    this.stop = ()=>{
        if( !isStop ) { // prevent recursion call
            isStop = true;
            timeElement.html( "00:00" );
            clearInterval(timerId);
            timer.stop();
            callback();
        }
    };

    this.pause = ()=>{ timer.pause(); };
    this.resume = ()=>{ timer.resume(); };
    this.isRunning = ()=>timer.getStateRunning();
    this.getTimeLeft = ()=>timer.getTimeLeft();
}