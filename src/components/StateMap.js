import React, {Component} from 'react';
import * as d3 from "d3";
import './style.css';
import * as topojson from "topojson-client";

export var selected_states = [];

export default class StateMap extends Component {
    componentDidMount() {
        /*
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
        */

        var state_map = [
            { "state": "ME", "row": 0, "col": 10 },
            { "state": "WI", "row": 1, "col": 5 },
            { "state": "VT", "row": 1, "col": 9 },
            { "state": "NH", "row": 1, "col": 10 },
            { "state": "WA", "row": 2, "col": 0 },
            { "state": "ID", "row": 2, "col": 1 },
            { "state": "MT", "row": 2, "col": 2 },
            { "state": "ND", "row": 2, "col": 3 },
            { "state": "MN", "row": 2, "col": 4 },
            { "state": "IL", "row": 2, "col": 5 },
            { "state": "MI", "row": 2, "col": 6 },
            { "state": "NY", "row": 2, "col": 8 },
            { "state": "MA", "row": 2, "col": 9 },
            { "state": "OR", "row": 3, "col": 0 },
            { "state": "NV", "row": 3, "col": 1 },
            { "state": "WY", "row": 3, "col": 2 },
            { "state": "SD", "row": 3, "col": 3 },
            { "state": "IA", "row": 3, "col": 4 },
            { "state": "IN", "row": 3, "col": 5 },
            { "state": "OH", "row": 3, "col": 6 },
            { "state": "PA", "row": 3, "col": 7 },
            { "state": "NJ", "row": 3, "col": 8 },
            { "state": "CT", "row": 3, "col": 9 },
            { "state": "RI", "row": 3, "col": 10 },
            { "state": "CA", "row": 4, "col": 0 },
            { "state": "UT", "row": 4, "col": 1 },
            { "state": "CO", "row": 4, "col": 2 },
            { "state": "NE", "row": 4, "col": 3 },
            { "state": "MO", "row": 4, "col": 4 },
            { "state": "KY", "row": 4, "col": 5 },
            { "state": "WV", "row": 4, "col": 6 },
            { "state": "VA", "row": 4, "col": 7 },
            { "state": "MD", "row": 4, "col": 8 },
            { "state": "DE", "row": 4, "col": 9 },
            { "state": "AZ", "row": 5, "col": 1 },
            { "state": "NM", "row": 5, "col": 2 },
            { "state": "KS", "row": 5, "col": 3 },
            { "state": "AR", "row": 5, "col": 4 },
            { "state": "TN", "row": 5, "col": 5 },
            { "state": "NC", "row": 5, "col": 6 },
            { "state": "SC", "row": 5, "col": 7 },
            { "state": "OK", "row": 6, "col": 3 },
            { "state": "LA", "row": 6, "col": 4 },
            { "state": "MS", "row": 6, "col": 5 },
            { "state": "AL", "row": 6, "col": 6 },
            { "state": "GA", "row": 6, "col": 7 },
            { "state": "HI", "row": 7, "col": 0 },
            { "state": "AK", "row": 7, "col": 1 },
            { "state": "TX", "row": 7, "col": 3 },
            { "state": "FL", "row": 7, "col": 8 }
        ];

        var width = 40, height = 40, cellsize = 39;

        const svg_area = d3.select("svg")

        // Insert a rectangle for each state
        svg_area.selectAll("rect")
          .data(state_map)
          .enter()
          .append("rect")
            .attr("x", function(d,i)  { return d.col * width + 100; })
            .attr("y", function(d,i) { return d.row * height; })
            .attr("width", cellsize)
            .attr("height", cellsize)
            .style("fill", "Sienna")
            .on('click', function (d) {
              // check if the state in selected_states: if selected then unselect and vice versa
              var cur_selected = {"state": d.state};
              var pos = getIndex(selected_states, cur_selected);
              if (pos > -1) {
                selected_states.splice(pos, 1);
                svg_area.selectAll("rect")
                  .data([cur_selected], function(d) { return d.state; })
                  .style("fill", "Sienna");
              } else {
                selected_states.push(cur_selected);
                svg_area.selectAll("rect")
                  .data(selected_states, function(d) { return d.state; })
                  .style("fill", "orange");
              }
            });

        function getIndex(arr, elem) {
          for (var i = 0; i < arr.length; i++) {
            if (elem.state === arr[i].state)
              return i;
          }
          return -1;
        }

        // Put the name of each state on its rectangle
        svg_area.selectAll("text")
          .data(state_map)
          .enter()
          .append("text")
            .attr("x", function(d,i)  { return d.col * width + 108;})
            .attr("y", function(d,i) {return d.row * height +  26;})
            .text(function (d) { return d.state; })
            .style("font",   "16px sans-serif")
            .style("fill", "White")
            .style("pointer-events", "none");    // If you put the mouse over one of the states, this prevents it from treating it like text (reword)
    }

    render(){
        return <svg id="statemap" width="960" height="600"></svg>
    }
}
