class Util {
    // Returns a random integer between min (inclusive) and max (inclusive)
    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static getRandomReal(min, max) {
        return (Math.random() * (max - min)) + min;
    }
}