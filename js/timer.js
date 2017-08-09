function Timer(callback, delay) {
    let timerId, start, remaining = delay, running, finish = false;

    this.pause = () => {
        running = false;
        window.clearTimeout(timerId);
        remaining -= new Date() - start;
    };

    this.resume = () => {
        running = true;
        start = new Date();
        window.clearTimeout(timerId);
        timerId = window.setTimeout(()=>{callback(), finish = true;}, remaining);
    };

    this.getTimeLeft =  () => {
        if (running) {
            this.pause()
            this.resume()
        }

        return remaining
    }

    this.getStateRunning = ()=>running;

    this.getStateFinish = ()=>finish;

    this.resume();
}