import React, {Component} from 'react';
import './App.css';
import StateMap from "./components/StateMap";
import HeatMap from "./components/HeatMap";

export default class App extends Component {
  render() {
    return (
        <div className="App">
            <StateMap />
            <HeatMap />
        </div>
    );
  }
}
