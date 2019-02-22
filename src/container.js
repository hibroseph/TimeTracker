import React from "react";
import "./css/container";
import TimerPage from "./components/TimerPage";

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secs: 0,
      mins: 0,
      hrs: 0
    };
  }

  updateTimer() {
    console.log("Updating timer!");
    // get the state sec hours and mins
    let seconds = this.state.secs;
    let minutes = this.state.mins;
    let hours = this.state.hrs;

    seconds = seconds + 1;

    if (seconds >= 60) {
      seconds = 0;
      minutes = minutes + 1;
    }

    if (minutes >= 60) {
      minutes = 0;
      hours = hours + 1;
    }

    // update the state
    this.setState({
      secs: seconds,
      mins: minutes,
      hrs: hours
    });
  }

  //  This function will create the timer once the start button is pressed
  startTimer() {
    console.log("Starting timer");
    var InterId = setInterval(() => this.updateTimer(), 1000);

    this.setState({
      IntervalId: InterId
    });

    console.log("Your intervalId is " + InterId);
  }

  stopTimer() {
    console.log("Stopping timer with id " + this.state.IntervalId);

    clearInterval(this.state.IntervalId);
  }

  resetTimer() {
    console.log("We are resetting the timer");

    this.setState({
      secs: 0,
      mins: 0,
      hrs: 0
    });
  }

  render() {
    return (
      <div id="container">
        <TimerPage />
      </div>
    );
  }
}

export default Container;
