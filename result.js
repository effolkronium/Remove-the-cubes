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

        // O(n)
        // let index = this._results.findIndex(value => {
        //     return value.points <= result.points;
        // });

        // O(lgn) !
        let index = this.getIndexForResult(result.points);

        console.log(`Index = ${index}`);

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

    // Perfom binary search 
    getIndexForResult(points) {
        const end = this._results.length - 1;
        const start = 0;
        let left = start;
        let right = end;

        if (0 === this._results.length ||
            this._results[0].points < points) {
            return start;
        }
        
        if(this._results[end].points > points) {
            return end;
        }

        while(right - left > 0) {
            const mid = Math.floor(left + (right - left) / 2);

            if(points >= this._results[mid].points)
                right = mid;
            else
                left = mid + 1;
        }

        return right;
    }
}