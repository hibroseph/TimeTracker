import React from "react";
import "../css/recenthistory.css";
import currentWeekNumber from "current-week-number";

class RecentHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeSnippets: this.props.timeSnippets
    };
  }

  // This helps with making sure there are not useless renders
  shouldComponentUpdate(newProps, newState) {
    if (newProps.timeSnippets == this.state.timeSnippets) {
      return false;
    } else {
      this.setState({
        timeSnippets: newProps.timeSnippets
      });
      return true;
    }
  }

  render() {
    // do some sort of check to see if they are within the past week
    let date = new Date();
    let currentWeek = currentWeekNumber(date);

    return (
      <div id="recent-history-container">
        {this.props.timeSnippets.length > 0 && (
          <div>
            <p>This week</p>
            <table className="table table-sm">
              <thead>
                <tr>
                  <th scope="col">Project Name</th>
                  <th scope="col">Date</th>
                  <th scope="col">Time Spent</th>
                </tr>
              </thead>
              <tbody>
                {[...this.props.timeSnippets].reverse().map(data => {
                  if (
                    currentWeek == data.weekCreated &&
                    date.getFullYear() == data.date.Year
                  ) {
                    return (
                      <tr>
                        <th scope="row">{data.projectName}</th>
                        <td>
                          {data.date.Month}/{data.date.Day}/{data.date.Year}
                        </td>
                        <td>
                          {data.hours > 0 && data.hours + ":"}
                          {data.minutes > 0 && data.minutes + ":"}
                          {data.hours == 0 &&
                            data.minutes == 0 &&
                            data.seconds + " seconds"}
                          {data.hours > 0 || (data.minutes > 0 && data.seconds)}
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        )}

        {this.props.timeSnippets.length == 0 && (
          <div>
            <p> You haven't done any projects in the last week </p>
          </div>
        )}
      </div>
    );
  }
}

export default RecentHistory;
