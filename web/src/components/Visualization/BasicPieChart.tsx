/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useEffect } from "react";
import * as d3 from "d3";
import { PieArcDatum } from "d3-shape";
import { Types } from "./types";
import jsonData from "../../../data/sample_graph.json";
import {
  forceSimulation,
  SimulationNodeDatum,
  SimulationLinkDatum,
} from "d3-force";
import { useQuery } from "convex/react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { BorderAllIcon } from "@radix-ui/react-icons";

interface Node extends SimulationNodeDatum {
  id: string;
  group: string;
  radius?: number;
  citing_patents_count?: number;
}

const BasicPieChart = (props: IBasicPieChartProps) => {
  useEffect(() => {
    const elements = document.getElementsByClassName("nodes");
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
    const elements2 = document.getElementsByClassName("tooltip-player");
    while (elements2.length > 0) {
      elements2[0].parentNode.removeChild(elements2[0]);
    }
    draw();
  }, [props.companies, props.companyEdges]);

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
    // const links = jsonData.links.map((d) => ({ ...d }));
    // const nodes = jsonData.nodes.map((d) => ({ ...d }));
    const links = props.companyEdges ? props.companyEdges : [];
    const nodes = props.companies ? props.companies : [];

    const simulation = d3
      .forceSimulation<any>(nodes)
      .force(
        "link",
        d3.forceLink<any, any>(links).id((d) => d.id)
      )
      .force("charge", d3.forceManyBody())
      .force("collide", d3.forceCollide(55).iterations(10))
      .force("x", d3.forceX())
      .force("y", d3.forceY());

    const svg = d3
      .select(".basicPieChart")
      .append("svg")
      .attr("class", "svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    // Add a line for each link, and a circle for each node.

    const tooltip = d3
      //.select("#" + this.props.idContainer)
      .select("body")
      .append("div")
      .attr("class", "tooltip-player")
      .style("opacity", 100)
      .style("background-color", "white")
      .style("position", "fixed")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")
      .style("color", "black");

    const link = svg
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 2.5);

    const node = svg
      .attr("class", "nodes")
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g");

    node
      .append("circle")
      .attr("r", 40)
      .attr("fill", "#fff")
      .attr("stroke", (d) => color(d.group))
      .attr("stroke-width", 10)
      .on("mouseover", (event, d) => {
        tipMouseOver(event, d, tooltip);
      })
      .on("mouseout", () => {
        tipMouseOut(tooltip);
      });
    node
      .append("text")
      .text((d) => d.name)
      .style("text-anchor", "middle")
      .style("font-weight", "bold")
      .style("font-size", "15pt")
      .style("fill", "#344761")
      .on("mouseover", (event, d) => {
        tipMouseOver(event, d, tooltip);
      })
      .on("mouseout", () => {
        tipMouseOut(tooltip);
      });

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
      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });
  };

  return <div className="basicPieChart" />;
};

/**
 * We define this function inside of setPointsToCanvas to get access to canvas, data, scales and tooltip
 * @param {*} d
 * @param {*} iter
 */
function tipMouseOver(this: any, event: any, d: any, tooltip: any) {
  let html = "";
  html +=
    d.name +
    "<br><b>" +
    "Sector" +
    ": </b>" +
    d.sector +
    "<br/>" +
    "<b>" +
    "Industry" +
    ": </b>" +
    d.industry;
  tooltip
    .html(html)
    .style("left", event.pageX + 15 + "px")
    .style("top", event.pageY - 28 + "px")
    .transition()
    .duration(200) // ms
    .style("opacity", 0.9); // started as 0!

  // Use D3 to select element, change color and size
  d3.select(this).style("cursor", "pointer");
}

/**
 * We create this function inside of setPointsToCanvas to get access to tooltip
 */
function tipMouseOut(tooltip: any) {
  tooltip
    .transition()
    .duration(500) // ms
    .style("opacity", 0); // don't care about position!
  //d3.select(this).attr("r", 5);
}

interface IBasicPieChartProps {
  width: number;
  height: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
  companies: any;
  companyEdges: any;
}

export default BasicPieChart;
