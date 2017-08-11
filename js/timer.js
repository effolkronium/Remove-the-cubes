function Timer(callback, delay) {
    let timerId, start, remaining = delay, running, finish = false;

    this.pause = () => {
        if( running ) {
            running = false;
            window.clearTimeout(timerId);
            remaining -= new Date() - start;
        }
    };

    this.resume = () => {
        running = true;
        start = new Date();
        window.clearTimeout(timerId);
        timerId = window.setTimeout(()=>{callback(), finish = true; running = false;}, remaining);
    };

    this.getTimeLeft = () => {
        if (running) {
            this.pause()
            this.resume()
        }

        return remaining
    }

    // miliseconds
    this.addTime = timePice => {
        remaining += timePice;
        if (running) {
            this.pause()
            this.resume()
        }
    }

    this.getStateRunning = ()=>running;

    this.getStateFinish = ()=>finish;

    this.stop = ()=>{ 
        finish = true; running = false;
        window.clearTimeout(timerId); 
    };

    this.resume();
}