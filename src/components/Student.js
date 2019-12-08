import React, {Component} from 'react';
import * as d3 from "d3";

export default class Student extends Component {
    setVisible() {
        d3.select("#student")
            .transition()
            .duration(1000)
            .attr("width", "960")
    }

    setInvisible() {
        d3.select("#student")
            .transition()
            .duration(1000)
            .attr("width", "0")
    }
    render() {
        return (
            <div>
                <button onClick={this.setVisible}>Show Student</button>
                <button onClick={this.setInvisible}>Hide Student</button>
            </div>
        );
    }
}
