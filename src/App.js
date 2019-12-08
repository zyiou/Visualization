import React, {Component} from 'react';
import './App.css';
import StateMap from "./components/StateMap";
import Download from "./components/Download";
import Coordinate from "./components/Coordinate";
import HeatMap from "./components/HeatMap";
import Student from './components/Student';
import Admission from "./components/Admission";

export default class App extends Component {

    render() {
        return (
            <div className="App">
                <StateMap/>
                <HeatMap/>
                <Admission/>
                <Student />
                <Download/>
                <Coordinate/>
            </div>
        );
    }
}
