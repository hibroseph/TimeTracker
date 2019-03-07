import React from "react";
import "../css/container.css";
import TimerPage from "./TimerPage";
import MenuBar from "./MenuBar";

class Container extends React.Component {
  constructor(props) {
    super(props);
    chrome.runtime.sendMessage({
      action: "popup_generated"
    });

    this.state = {
      displayPage: "Timer"
    }

    // Do some binding
    this.clickedMenuBarItem = this.clickedMenuBarItem.bind(this);
  }

  clickedMenuBarItem(data) {
    console.log("container.js: You clicked " + data + " menu bar item");

    this.setState({
      displayPage: data
    });

  }

  render() {
    return (
      <div id="container">
        <MenuBar clickedMenu={this.clickedMenuBarItem} />
        {(this.state.displayPage == "Timer") && <TimerPage></TimerPage>}
      </div>
    );
  }
}

export default Container;
