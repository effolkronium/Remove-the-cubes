function GameTimer(callback, delay) { 
    const timeElement = $('.Time');

    let timer = new Timer(callback, delay);

    const timerId = setInterval(()=>{
        const date = new Date(timer.getTimeLeft());
        if( timer.getStateFinish() || date.getSeconds() === 0 ) {
            timeElement.html( "00:00" );
            clearInterval(timerId);
        } else {
            timeElement.html( '' + formatTime( date.getMinutes() )
                                 + ':' + formatTime( date.getSeconds() ) );
        }
    }, 100);

    function formatTime(time) {
        if( time < 10 ) return '0' + time;
        return time;
    }
}