import React from "react";
import "../css/timerpage.css";

class TimerPage extends React.Component {
  constructor(props) {
    super(props);

    // set the initial state
    this.state = {
      seconds: 0,
      minutes: 0,
      hours: 0,
      save: false,
      IntervalID: null,
      times: []
    };
  }

  // Updates the timer
  updateTimer() {
    var secs = this.state.seconds;
    var mins = this.state.minutes;
    var hrs = this.state.hours;

    secs = secs + 1;

    if (secs >= 60) {
      mins = mins + 1;
      secs = 0;
    }

    if (mins >= 60) {
      mins = 0;
      hrs = hrs + 1;
    }

    // update the state with the new time
    this.setState({
      seconds: secs,
      minutes: mins,
      hours: hrs
    });
  }

  // Starts the timer from whatever time it is at
  startTimer() {
    // Starts to call updateTimer every second
    if (!this.state.IntervalID) {
      var IntervalID = setInterval(() => this.updateTimer(), 1000);

      console.log("Started Timer with id: " + IntervalID);

      // Save the interval ID
      this.setState({
        IntervalID: IntervalID,
        save: false
      });
    }
  }

  // Ends the timer
  stopTimer() {
    console.log("Ending timer with id: " + this.state.IntervalID);

    clearInterval(this.state.IntervalID);

    this.setState({
      IntervalID: null
    });
    // Check to see if there is any time in the state before we display
    // the save button
    if (this.state.seconds + this.state.minutes + this.state.hours > 0) {
      this.setState({
        save: true
      });
    }
  }

  // Resets the timer
  resetTimer() {
    console.log("Clearing the timer");

    this.setState({
      seconds: 0,
      minutes: 0,
      hours: 0,
      save: false
    });
  }

  // Saves the current time
  saveTime() {
    console.log("Saving the current time");

    var currentDate = new Date();

    var date = {
      Day: currentDate.getDay(),
      Month: currentDate.getMonth(),
      Year: currentDate.getFullYear()
    }

    var timeObj = {
      projectName: "test", 
      date: date,
      seconds: this.state.seconds,
      minutes: this.state.minutes,
      hours: this.state.hours,
    };
    

    console.log("Here is our time object")
    console.log(timeObj);

    this.setState(prevState => {
      return {
        times: [...prevState.times, timeObj]
      }
    });

    console.log("our state");
    console.log(this.state)

  }

  render() {
    return (
      <div>
        <button className="btn btn-success" onClick={() => this.startTimer()}>
          Start Timer
        </button>
        <button className="btn btn-danger" onClick={() => this.stopTimer()}>
          Stop Timer
        </button>
        <button className="btn btn-warning" onClick={() => this.resetTimer()}>
          Reset Timer
        </button>

        <p id="timer">
          {this.state.hours < 10 ? 0 : ""}
          {this.state.hours}:{this.state.minutes < 10 ? 0 : ""}
          {this.state.minutes}:{this.state.seconds < 10 ? 0 : ""}
          {this.state.seconds}
        </p>

        {this.state.save && (
          <button
            id="save-btn"
            className="btn btn-primary"
            onClick={() => this.saveTime()}
          >
            Save
          </button>
        )}
      </div>
    );
  }
}

export default TimerPage;
