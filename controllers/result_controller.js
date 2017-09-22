const gameResult = require('./result_handler');

module.exports = new class {
    saveNewResult(req, res, next) {
        gameResult.add(req.body, err=>{
            let statusCode = 201;

            if(err) statusCode = 500;

            res.status(statusCode).send();
        });
    }

    sendTop10(req, res, next) {
        res.json(gameResult.getTop10());
    }
};