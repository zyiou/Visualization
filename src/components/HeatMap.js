import React, {Component} from 'react';
import * as d3 from "d3";

export default class HeatMap extends Component {
    componentDidMount() {
        var margin = {top: 30, right: 30, bottom: 30, left: 30},
            width = 450 - margin.left - margin.right,
            height = 450 - margin.top - margin.bottom;

        var svg = d3.select("#heatmap")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        var myGroups = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
        var myVars = ["v1", "v2", "v3", "v4", "v5", "v6", "v7", "v8", "v9", "v10"]

        var x = d3.scaleBand()
            .range([ 0, width ])
            .domain(myGroups)
            .padding(0.01);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))

        var y = d3.scaleBand()
            .range([ height, 0 ])
            .domain(myVars)
            .padding(0.01);
        svg.append("g")
            .call(d3.axisLeft(y));

        var myColor = d3.scaleLinear()
            .range(["white", "#69b3a2"])
            .domain([1,100])

        d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/heatmap_data.csv").then(function(data) {

            svg.selectAll()
                .data(data, function(d) {return d.group+':'+d.variable;})
                .enter()
                .append("circle")
                .attr("cx", function(d) { return x(d.group)+20})
                .attr("cy", function(d) { return y(d.variable)+20 })
                .attr("r",18)
                .attr("width", x.bandwidth() )
                .attr("height", y.bandwidth() )
                .style("fill", function(d) { return myColor(d.value)} )
        });
    }
    render() {
        return <svg id='heatmap' width="960" height="600"></svg>
    }
}
