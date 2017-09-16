const fs = require('fs');

const resultFilePath = './result.json'

module.exports = new class {
    // Read previous results from a file or create new if the file isn't exist
    constructor() {
        this._results = [];

        if (fs.existsSync(resultFilePath)) {
            fs.readFile(resultFilePath, (err, data) => {
                if (!err) try {
                    this._results = JSON.parse(data);
                } catch (e) {
                    console.warn(`Bad file: ${err}`);
                    fs.writeFile(resultFilePath, '[]'); // reset file
                }
            });
        } else {
            fs.writeFile(resultFilePath, '[]'); // new file
        }
    }

    /**
     * Async add result to result.json file
     * Auto sorted (add in right place)
     * @param {Object} result {'name': points}
     * @param {function} done err => {}
     */
    add(result, done) {
        if(undefined === result.points || undefined === result.name) {
            done(new Error('bad result'));
            return;
        }

        //bugfix
        result.points = parseInt(result.points);

        // find index for new result
        let index = this._results.findIndex(value => {
            return value.points <= result.points;
        });

        //console.log(`Index = ${index}; typeof: ${typeof(result.points)}`);

        // if no lower results, push back
        if(-1 === index) {
            this._results.push(result);
        }
        else {
            this._results.splice(index, 0, result);
        }

        fs.writeFile(resultFilePath, JSON.stringify(this._results), err => {
            done(err);
        })
    }

    /**
     * Async get array with top 10 results
     */
    getTop10() {
        return this._results.slice(0, 10); // results should be already sorted
    }
}