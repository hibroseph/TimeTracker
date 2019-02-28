import React from "react";
import ReactDOM from "react-dom";
import "./css/app.css";
import Container from "./components/container";
import 'bootstrap/dist/css/bootstrap.min.css';

class Popup extends React.Component {
  render() {
    return (
      <div>
        <Container>
        </Container>
      </div>
    );
  }
}

let App = document.getElementById("app");

ReactDOM.render(<Popup/>, App);
