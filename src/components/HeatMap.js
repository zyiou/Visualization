import React, {Component} from 'react';
import * as d3 from "d3";
import data from '../data/finaldata.csv';

export var all_data = [];

export default class HeatMap extends Component {
    componentDidMount() {
        let margin = {top: 60, right: 30, bottom: 30, left: 200},
            width = 450 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;

        let svg = d3.select("#heatmap")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")")


        d3.csv(data).then(function (data) {
            let x_domain = ["academics", "athletics", "student_life", "campus", "party", "location", "food", "safety"]
            let y_domain = []
            let z_domain = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-"]
            let color = ["#F4F4F4", "#F9D9DF", "#F9CFD7", "#F7B2BF", "#F49FAE", "#F28EA1", "#F77990", "#EF627C", "#F25773", "#F25773", "#ED3D5D", "#FC0532"]
            all_data = data.slice(1, 20)
            let campus_life = []
            all_data.forEach(function (d) {
                for (let i = 0; i < x_domain.length; i++) {
                    let temp = {}, category = x_domain[i]
                    temp.name = d.name;
                    temp.category = category;
                    temp.score = d[category];
                    campus_life.push(temp)
                }
                y_domain.push(d.name)
            })


            let x = d3.scaleBand()
                .range([0, width])
                .domain(x_domain)
                .padding(0.01);
            svg.append("g")
                .attr("transform", "translate(0, 0)")
                .call(d3.axisTop(x))
                .selectAll("text")
                .style("text-anchor", "start")
                .attr("dx", "0.8em")
                .attr("dy", ".15em")
                .attr("transform", function (d) {
                    return "rotate(-65)"
                });


            let y = d3.scaleBand()
                .range([height, 0])
                .domain(y_domain)
                .padding(0.01)
            svg.append("g")
                .call(d3.axisLeft(y).tickValues([]));

            let heatmap_color = d3.scaleOrdinal()
                .range(color.reverse())
                .domain(z_domain)

            svg.selectAll()
                .data(campus_life)
                .enter()
                .append("circle")
                .attr("cx", function (d) {
                    return x(d.category) + 15
                })
                .attr("cy", function (d) {
                    return y(d.name) + 14
                })
                .attr("r", 13)
                .attr("width", x.bandwidth())
                .attr("height", y.bandwidth())
                .style("fill", function (d) {
                    return heatmap_color(d.score)
                })

            svg.selectAll()
                .data(campus_life)
                .enter()
                .append("text")
                .text(function (d) {
                    return d.score
                })
                .attr("x", function (d) {
                    return x(d.category) + 8
                })
                .attr("y", function (d) {
                    return y(d.name) + 18
                })
                .style("opacity", 1)
                .style("cursor", "default")
            // .on('mouseover', function(d){
            //     d3.select(this).style("opacity",1);
            // })
            // .on('mouseout',function(d) {
            //     d3.select(this).style("opacity",0);
            // })

        });

    }

    setVisible() {
        d3.select("#heatmap")
            .transition()
            .duration(1000)
            .attr("width", "960")
    }

    setInvisible() {
        d3.select("#heatmap")
            .transition()
            .duration(1000)
            .attr("width", "0")
    }

    render() {
        return (<div>
            <button onClick={this.setVisible}>Show Student Life</button>
            <button onClick={this.setInvisible}>Hide Student Life</button>
        </div>);
    }

}
