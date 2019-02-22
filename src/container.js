import React from "react";
import "./css/container";
import TimerPage from "./components/TimerPage";
import MenuBar from "./components/MenuBar"

class Container extends React.Component {
  constructor(props) {
    super(props);
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
