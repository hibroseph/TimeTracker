import React from "react";
import "../css/timerpage.css";

class TimerPage extends React.Component {
  constructor(props) {
    super(props);

    // set the initial state
    this.state = {
      seconds: 0,
      minutes: 0,
      hours: 0
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

    if (hrs >= 60) {
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
    var IntervalID = setInterval(() => this.updateTimer(), 1000);

    console.log("Started Timer with id: " + IntervalID);

    // Save the interval ID
    this.setState({
      IntervalID: IntervalID
    });
  }

  // Ends the timer
  stopTimer() {
    console.log("Ending timer with id: " + this.state.IntervalID);

    clearInterval(this.state.IntervalID);
  }

  // Resets the timer
  resetTimer() {
    console.log("Clearing the timer");

    this.setState({
      seconds: 0,
      minutes: 0,
      hours: 0
    });
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
      </div>
    );
  }
}

export default TimerPage;
