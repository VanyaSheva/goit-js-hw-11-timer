class Timer {
    constructor({selector, targetDate}){
        this.selector = document.querySelector(selector);
        this.targetDate = targetDate.getTime();
        this.day = this.selector.querySelector('span[data-value="days"]');
        this.hour = this.selector.querySelector('span[data-value="hours"]');
        this.min = this.selector.querySelector('span[data-value="mins"]');
        this.sec = this.selector.querySelector('span[data-value="secs"]');
    }
    static pad(value) {
        return String(value).padStart(2, '0');
    }
      updateTime(time){
        const days = Timer.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = Timer.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = Timer.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = Timer.pad(Math.floor((time % (1000 * 60)) / 1000));
        if(days === '00' && hours === '00' && mins === '00' && secs === '00'){
            Array.from(this.selector.children).forEach(elem=>{
                elem.remove();
            });
            this.selector.textContent = 'TIMER HAS GONE';
            clearInterval(this.timerId);
        }
        else if(days < 0){
            this.selector.textContent = 'TIMER HAS GONE';
            clearInterval(this.timerId);
        }
        this.updateInterface(days, hours, mins, secs)
    }
    updateInterface(days, hours, mins, secs){
        this.day.textContent = days;
        this.hour.textContent = hours;
        this.min.textContent = mins;
        this.sec.textContent = secs;
    }
    start(){
        this.timerId = setInterval(() => {
            this.startTime = Date.now();
            this.deltaTime = this.targetDate - this.startTime;
            this.updateTime(this.deltaTime);
        }, 1000);
    }
}


const timer = new Timer({selector: '#timer-1', targetDate: new Date('Nov 23, 2020, 00:00:00')});
timer.start();