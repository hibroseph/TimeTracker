import React from "react";
import "./css/container";
import TimerPage from "./components/TimerPage";

class Container extends React.Component {
  constructor(props) {
    super(props);

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
