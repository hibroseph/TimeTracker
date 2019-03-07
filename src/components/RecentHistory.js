import React from "react";
import "../css/recenthistory.css";

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
                      </td>
                    </tr>
                  );
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
