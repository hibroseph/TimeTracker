import React from "react";
import "../css/timerpage.css";
import RecentHistory from "../components/RecentHistory";

// localStorage.removeItem("storage");

// Let's set the storage
let storage = JSON.parse(localStorage.getItem("storage") || '{ "timer": []}');

//{ "start":1551384647192, "end":1551384777192}, { "start":1551384959272, "end":1551384979272}

class TimerPage extends React.Component {
  constructor(props) {
    super(props);

    console.log(storage);

    // Some variables to help us with the business logic
    let timeSeconds = 0;
    let timeMinutes = 0;
    let timeHours = 0;

    // If there is an initial time stored, calculate the current hours, minutes and seconds between the times.
    // console.log("storage.timer[0].start: " + storage.timer[0].start);
    // console.log("storage.timer[0].end: " + storage.timer[0].end);
    console.log("The length of storage.timer is: " + storage.timer.length);

    if (storage.timer.length > 0 && storage.timer[0].start != 0) {
      let currentTime = 0;

      // if (storage.timer[storage.timer.length -1].end == 0) {
      //   currentTime = new Date().getTime();
      // } else {
      //   currentTime = storage.timer[storage.timer.legnth - 1].end;
      // }

      let totalTime = 0;
      // Loop through the array of times and add up all the milliseconds that exist
      storage.timer.map(item => {
        if (item.end != 0) {
          console.log("We are going to subtrack the set start and end time");
          totalTime += item.end - item.start;
        } else {
          // the item.end is equal to 0 meaning that the timer is still running
          console.log("We are going to subtrak current time from start time");
          totalTime += new Date().getTime() - item.start;
        }
      });

      console.log(
        "The total time that has elasped with the timer running is " + totalTime
      );

      timeSeconds = Math.floor(totalTime / 1000);
      timeMinutes = Math.floor(timeSeconds / 60);
      timeHours = Math.floor(timeMinutes / 60);

      timeSeconds = timeSeconds % 60;
      timeMinutes = timeMinutes % 60;
      timeHours = timeHours % 60;
    } else {
      console.log("The timer has not been started");
    }

    console.log(
      "The current time is at " +
        timeHours +
        " hours " +
        timeMinutes +
        " minutes " +
        timeSeconds +
        " seconds"
    );

    // set the initial state
    this.state = {
      timer: {
        seconds: timeSeconds,
        minutes: timeMinutes,
        hours: timeHours
      },
      display: {
        saveButton: false
      },
      IntervalID: null,
      timeSnippets: [],
      projectName: null
    };

    // Check to see if we have an end time, if we do not, the timer is still running
    if (
      storage.timer.length > 0 &&
      storage.timer[storage.timer.length - 1].end == 0 &&
      storage.timer[storage.timer.length - 1].start != 0
    ) {
      console.log("There is no end time, resuming timer");
      this.startTimer();
    } else {
      console.log("There is an end time, or there is no start time");
    }
  }

  // Calculates the timer between two times (usually from new Date().getTime())
  // returns a JSON object
  calculateTimeDifference(time1, time2) {
    let totaltime = time2 - time1;

    let seconds = totaltime / 1000;
    let minutes = seconds / 60;
    let hours = minutes / 60;

    seconds = seconds % 60;
    minutes = minutes % 60;
    hours = hours % 60;

    return { seconds: seconds, minutes: minutes, hours: hours };
  }

  // Updates the timer
  updateTimer() {
    let secs = this.state.timer.seconds;
    let mins = this.state.timer.minutes;
    let hrs = this.state.timer.hours;

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
      timer: {
        seconds: secs,
        minutes: mins,
        hours: hrs
      }
    });
  }

  // Starts the timer from whatever time it is at
  startTimer() {
    // Starts to call updateTimer every second
    if (!this.state.IntervalID) {
      var IntervalID = setInterval(() => this.updateTimer(), 1000);

      console.log("Started Timer with id: " + IntervalID);

      this.state.IntervalID = IntervalID;
      this.state.display.save = false;

      if (
        storage.timer.length == 0 ||
        storage.timer[storage.timer.length - 1].end != 0
      ) {
        let newTimerStorage = [
          ...storage.timer,
          {
            start: new Date().getTime(),
            end: 0
          }
        ];

        storage.timer = newTimerStorage;

        localStorage.setItem("storage", JSON.stringify(storage));
        console.log("storage store");
        console.log(storage);
      }

      // Save the interval ID
      this.setState({
        IntervalID: IntervalID,
        display: {
          save: false
        }
      });
    }

    console.log("The IntervalID in the state " + this.state.IntervalID);
  }

  // let JSONOBJ = {
  //   timer: [
  //     {
  //       start: 0,
  //       end: 0
  //     }
  //   ]
  // };

  // Ends the timer
  stopTimer() {
    console.log("Ending timer with id: " + this.state.IntervalID);

    if (storage.timer[storage.timer.length - 1].end == 0) {
      storage.timer[storage.timer.length - 1] = {
        start: storage.timer[storage.timer.length - 1].start,
        end: new Date().getTime()
      };

      console.log("Saving storage: ");
      console.log(storage);

      localStorage.setItem("storage", JSON.stringify(storage));
    }

    clearInterval(this.state.IntervalID);

    this.setState({
      IntervalID: null
    });

    // Check to see if there is any time in the state before we display
    // the save button
    if (
      this.state.timer.seconds +
        this.state.timer.minutes +
        this.state.timer.hours >
      0
    ) {
      this.setState({
        display: {
          saveButton: true
        }
      });
    }
  }

  // Resets the timer
  resetTimer() {
    console.log("Clearing the timer");

    storage = {
      timer: []
    };

    localStorage.setItem("storage", JSON.stringify(storage));

    // Remove the stop time we have
    this.setState({
      timer: {
        seconds: 0,
        minutes: 0,
        hours: 0
      },
      display: {
        saveButton: false
      }
    });
  }

  // Saves the current time
  saveTime() {
    console.log("Saving the current time");

    this;

    var currentDate = new Date();

    var date = {
      Day: currentDate.getDay(),
      Month: currentDate.getMonth(),
      Year: currentDate.getFullYear()
    };

    var currentTimeSnippet = {
      projectName: this.state.projectName,
      date: date,
      seconds: this.state.timer.seconds,
      minutes: this.state.timer.minutes,
      hours: this.state.timer.hours
    };

    let time_array = JSON.parse(
      localStorage.getItem("saved-time-snippets") || ' { "timeSnippets": [] }'
    );

    let newTimeSnippetsArray = {
      timeSnippets: [...time_array.timeSnippets, currentTimeSnippet]
    };

    console.log("newTimeSnippetsArray saved in localstorage");
    console.log(newTimeSnippetsArray);

    localStorage.setItem(
      "saved-time-snippets",
      JSON.stringify(newTimeSnippetsArray)
    );

    console.log("Here is our snippet object");
    console.log(currentTimeSnippet);

    this.setState(prevState => {
      return {
        timeSnippets: [...prevState.timeSnippets, currentTimeSnippet]
      };
    });

    // If we get to this point, saving to the state should have been successful
    this.setState({
      save: false
    });
    console.log("our state");
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <div id="timer-container">
          <button
            className="btn btn-success"
            onClick={() => {
              this.startTimer();
            }}
          >
            Start Timer
          </button>
          <button className="btn btn-danger" onClick={() => this.stopTimer()}>
            Stop Timer
          </button>
          <button className="btn btn-warning" onClick={() => this.resetTimer()}>
            Reset Timer
          </button>

          <p id="timer">
            {this.state.timer.hours < 10 ? 0 : ""}
            {this.state.timer.hours}:{this.state.timer.minutes < 10 ? 0 : ""}
            {this.state.timer.minutes}:{this.state.timer.seconds < 10 ? 0 : ""}
            {this.state.timer.seconds}
          </p>
        </div>

        {this.state.display.saveButton && (
          <div id="save-project-form">
            <input
              type="text"
              id="inputProjectName"
              placeholder="Enter Project Name"
              onChange={event => {
                // update the state with every key press
                this.setState({
                  projectName: event.target.value
                });
              }}
            />
            <small id="projectNameHelp" className="form-text text-muted">
              This is what you will search to see your time history
            </small>

            <button
              id="save-btn"
              className="btn btn-primary"
              onClick={() => {
                this.saveTime();
                // Close the popup
                this.setState({
                  display: {
                    saveButton: false
                  }
                });
              }}
            >
              Save
            </button>

            <button id="close-btn"
            className="btn btn-secondary"
            onClick={()=> {
              this.setState({
                display: {
                  saveButton: false
                }
              })
            }}> Close</button>
          </div>
        )}

        <RecentHistory timeSnippets={this.state.timeSnippets} />
      </div>
    );
  }
}

export default TimerPage;
