/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useEffect } from "react";
import "./BasicPieChart.scss";
import * as d3 from "d3";
import { PieArcDatum } from "d3-shape";
import { Types } from "./types";
import jsonData from "../../../data/sample_graph.json";
import {
  forceSimulation,
  SimulationNodeDatum,
  SimulationLinkDatum,
} from "d3-force";

interface Node extends SimulationNodeDatum {
  id: string;
  group: string;
}

const BasicPieChart = (props: IBasicPieChartProps) => {
  useEffect(() => {
    draw();
  });

  const draw = () => {
    // Reheat the simulation when drag starts, and fix the subject position.
    function dragstarted(event: d3.D3DragEvent<any, any, any>) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    // Update the subject (dragged node) position during drag.
    function dragged(event: d3.D3DragEvent<any, any, any>) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    // Restore the target alpha so the simulation cools after dragging ends.
    // Unfix the subject position now that it’s no longer being dragged.
    function dragended(event: d3.D3DragEvent<any, any, any>) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    // Specify the dimensions of the chart;
    const width = props.width - props.left - props.right;
    const height = props.height - props.top - props.bottom;

    // Specify the color scale.
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // The force simulation mutates links and nodes, so create a copy
    // so that re-evaluating this cell produces the same result.
    const links = jsonData.links.map((d) => ({ ...d }));
    const nodes = jsonData.nodes.map((d) => ({ ...d }));

    const simulation = d3
      .forceSimulation<any>(nodes)
      .force(
        "link",
        d3.forceLink<any, any>(links).id((d) => d.id)
      )
      .force("charge", d3.forceManyBody())
      .force("x", d3.forceX())
      .force("y", d3.forceY());

    const svg = d3
      .select(".basicPieChart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    // Add a line for each link, and a circle for each node.
    const link = svg
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 1.5);

    let defs = svg.append("g");

    defs
      .append("svg:pattern")
      .attr("id", "grump_avatar")
      .attr("width", 40)
      .attr("height", 40)
      .append("svg:image")
      .attr("xlink:href", "https://placedog.net/40/40");

    const node = svg
      .append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 20)
      .style("fill", "#fff")
      .style("fill", "url(#grump_avatar)");

    // Add a drag behavior.
    node.call(
      d3
        .drag<any, any>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    );

    // Set the position attributes of links and nodes each time the simulation ticks.
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    });
  };

  return <div className="basicPieChart" />;
};

interface IBasicPieChartProps {
  width: number;
  height: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export default BasicPieChart;
