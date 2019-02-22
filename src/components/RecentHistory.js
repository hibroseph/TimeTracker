import React from "react";
import "../css/recenthistory.css";

class RecentHistory extends React.Component {
  render() {
    console.log("props:");
    console.log(this.props.times);
    return (
      <div id="recent-history-container">
        <p>Recent History:</p>
        {this.props.times.reverse().map(data => {
          return (
            <p>
              {data.projectName} | 
              {(data.hours > 0 && data.hours + " hours " )}
              {(data.minutes > 0 && data.minutes + " minutes " )}
              {data.seconds} seconds
            </p>
          );
        })}
      </div>
    );
  }
}

export default RecentHistory;
