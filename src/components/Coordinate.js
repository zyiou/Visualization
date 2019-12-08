import React, {Component} from 'react';
import * as d3 from "d3";
import data from '../data/finaldata.csv';

export default class Coordinate extends Component {
    componentDidMount() {
        let margin = {top: 60, right: 10, bottom: 30, left: 200},
            width = 960 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;

        let x = {},
            y = {},
            dragging = {};

        let line = d3.line(),
            axis = d3.axisLeft(),
            background,
            foreground;

        let svg = d3.select("#coordinate")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        let dimensions = []
        x = d3.scaleBand().domain(dimensions).range([0, width])
        d3.csv(data).then(all_data => {
            all_data = all_data.slice(1, 20);

            const data = all_data.map(d => {
                return {name: d.name, admission: parseFloat(d.acceptance_rate), student: parseInt(d.student_population)}
            });
            // Extract the list of dimensions and create a scale for each.
            dimensions = d3.keys(data[0]).filter(function (d) {
                if (d == "name")
                    return y[d] = d3.scaleBand().domain(data.map(d => d.name)).range([0, height]);
                else return (y[d] = d3.scaleLinear()
                    .domain(d3.extent(data, function (p) {
                        return +p[d];
                    }))
                    .range([height, 0]));
            });
            x.domain(dimensions).range([0, width])

            // Add grey background lines for context.
            background = svg.append("g")
                .attr("class", "background")
                .selectAll("path")
                .data(data)
                .enter().append("path")
                .attr("d", path);

            // Add blue foreground lines for focus.
            foreground = svg.append("g")
                .attr("class", "foreground")
                .selectAll("path")
                .data(data)
                .enter().append("path")
                .attr("d", path);

            // Add a group element for each dimension.
            let g = svg.selectAll(".dimension")
                .data(dimensions)
                .enter().append("g")
                .attr("class", "dimension")
                .attr("transform", function (d) {
                    return "translate(" + x(d) + ")";
                })
                .call(d3.drag()
                    .subject(function (d) {
                        return {x: x(d)};
                    })
                    .on("start", function (d) {
                        dragging[d] = x(d);
                        background.attr("visibility", "hidden");
                    })
                    .on("drag", function (d) {
                        dragging[d] = Math.min(width, Math.max(0, d3.event.x));
                        foreground.attr("d", path);
                        dimensions.sort(function (a, b) {
                            return position(a) - position(b);
                        });
                        x.domain(dimensions);
                        g.attr("transform", function (d) {
                            return "translate(" + position(d) + ")";
                        })
                    })
                    .on("end", function (d) {
                        delete dragging[d];
                        transition(d3.select(this)).attr("transform", "translate(" + x(d) + ")");
                        transition(foreground).attr("d", path);
                        background
                            .attr("d", path)
                            .transition()
                            .delay(500)
                            .duration(0)
                            .attr("visibility", null);
                    }));

            // Add an axis and title.
            g.append("g")
                .attr("class", "axis")
                .each(function (d) {
                    d3.select(this).call(axis.scale(y[d]));
                })
                .append("text")
                .style("text-anchor", "middle")
                .attr("y", -9)
                .text(function (d) {
                    return d;
                });

            // Add and store a brush for each axis.
            g.append("g")
                .attr("class", "brush")
                .each(function (d) {
                    d3.select(this).call(y[d].brush = d3.brush().on("start", brushstart).on("brush", brush));
                })
                .selectAll("rect")
                .attr("x", -8)
                .attr("y", d => y[d])
                .attr("width", 16);
        });

        function position(d) {
            let v = dragging[d];
            return v == null ? x(d) : v;
        }


        function transition(g) {
            return g.transition().duration(500);
        }

// Returns the path for a given data point.
        function path(d) {
            return line(dimensions.map(function (p) {
                return [position(p), y[p](d[p])];
            }));
        }

        function brushstart() {
            d3.event.sourceEvent.stopPropagation();
            brush()
        }

// Handles a brush event, toggling the display of foreground lines.
        function brush() {
            const actives = [];
            // filter brushed extents
            svg.selectAll('.brush')
                .filter(function (d) {
                    return d3.brushSelection(this);
                })
                .each(function (d) {
                    actives.push({
                        dimension: d,
                        extent: d3.brushSelection(this)
                    });
                });
            foreground.style("display", function (d) {
                return actives.every(function (active) {
                    const dim = active.dimension;
                    if (active.extent[0][0] === active.extent[1][0] && active.extent[0][1] === active.extent[1][1]) return true;
                    return active.extent[0][1] <= y[dim](d[dim]) && y[dim](d[dim]) <= active.extent[1][1];
                }) ? null : 'none';
            });

        }
    }

    render() {
        return (
            <div>
                <svg id='coordinate' width="960" height="600">
                    <svg id='heatmap' width="0" height="600"></svg>
                    <svg id='admission' width="0" height="600"></svg>
                    <svg id='student' width="0" height="600"></svg>
                </svg>
            </div>
        );
    }
}
