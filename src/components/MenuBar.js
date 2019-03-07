import React from "react";
import "../css/menubar.css";

class MenuBar extends React.Component {
  render() {
    console.log("props");
    console.log(this.props);
    return (
      <div id="nav">
        <ul>
          <li
            onClick={() => {
              this.props.clickedMenu("Timer");
            }}
          >
            Timer
          </li>
          <li
            onClick={() => {
              this.props.clickedMenu("Projects");
            }}
          >
            Projects
          </li>
        </ul>
      </div>
    );
  }
}

export default MenuBar;
