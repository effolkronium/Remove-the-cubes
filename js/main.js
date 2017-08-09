$(document).ready(() => {
    let game;

    $('.btnNewGame').click(()=>{
        $('.btnStart').html("PAUSE");

        if( game ) game.stop();
        game = new Game; // cute

        game.onFinish(()=>{ $('.btnStart').html("START"); });
    });

    $('.btnStart').click(()=>{
        if( game.isRunning() ) {
            $('.btnStart').html("START");
            game.pause();
        } else {
            $('.btnStart').html("PAUSE");
            game.resume();
        }
    });
});