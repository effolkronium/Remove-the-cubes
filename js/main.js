$(document).ready(() => {
    let game;
    let isStop = true;

    $('.btnNewGame').click(() => {
        if (!isStop) {
            if (game) game.stop();
            isStop = true;
            $('.btnNewGame').html("NEW GAME");
            $('.btnStart').html("START");
        } else {
            isStop = false;
            game = new Game; // cute
            $('.btnStart').html("PAUSE");
            $('.btnNewGame').html("STOP GAME");
        }

        game.onFinish(() => {
            $('.btnStart').html("START");
            $('.btnNewGame').html("NEW GAME");
            isStop = true;
        });
    });

    $('.btnStart').click(() => {
        if (isStop) {
            $('.btnNewGame').trigger('click');
        } else {
            if (game.isRunning()) {
                $('.btnStart').html("START");
                game.pause();
            } else {
                $('.btnStart').html("PAUSE");
                game.resume();
            }
        }
    });
});