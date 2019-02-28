class Timer {
    constructor(secs, mins, hrs) {
      this.seconds = secs;
      this.minutes = mins;
      this.hours = hrs;
      console.log("starting another timer")
    //   console.log(
    //     "CONSTRUCTOR " + this.hours + ":" + this.minutes + ":" + this.seconds
    //   );
    }
  
    // This function is to set the member variables
    setParameters(secs, mins, hrs) {
      this.seconds = secs;
      this.minutes = mins;
      this.hours = hrs;
  
      console.log(
        "PARAMETERS: " + this.hours + ":" + this.minutes + ":" + this.seconds
      );
    }
  
    // Increment the timer by 1
    tick() {
    //   console.log(this.hours + ":" + this.minutes + ":" + this.seconds);
      console.log("TICK!");
      this.seconds = this.seconds + 1;
  
      if (this.seconds >= 60) {
        this.minutes = this.minutes + 1;
        this.seconds = 0;
      }
  
      if (this.minutes >= 60) {
        this.minutes = 0;
        this.hours = this.hours + 1;
      }
  
      console.log(
        "time: " + this.hours + ":" + this.minutes + ":" + this.seconds
      );
    }
  
    startClock() {
      console.log("Starting clock!");
      
      this.IntervalID = setInterval(() => {
          this.tick();
      }, 1000);
    }
  
    stopClock() {
      clearInterval(this.IntervalID);
    }

    resetClock() {
        this.seconds = 0;
        this.minutes = 0;
        this.hours = 0;
    }
  
    get time() {
      return {
        seconds: this.seconds,
        minutes: this.minutes,
        hours: this.hours
      };
    }
  }

  export default Timer;