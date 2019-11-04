import React, {Component} from 'react';
import * as d3 from "d3";
import './style.css';
import * as topojson from "topojson-client";

class StateMap extends Component {
    componentDidMount() {
        const svg = d3.select("#state-map");

        const path = d3.geoPath();

        d3.json("https://d3js.org/us-10m.v1.json").then(function(us) {
            svg.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path);

            svg.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));
        });
    }


    render(){
        return <svg id="state-map" width="960" height="600"></svg>
    }
}

export default StateMap;

