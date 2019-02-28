import React from "react";
import "../css/container.css";
import TimerPage from "./TimerPage";
import MenuBar from "./MenuBar"

class Container extends React.Component {
  constructor(props) {
    super(props);
    chrome.runtime.sendMessage({
      action: "popup_generated"
    })
  }

  render() {
    return (
      <div id="container">
        <MenuBar/>
        <TimerPage />
      </div>
    );
  }
}

export default Container;
