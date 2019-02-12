var d3 = require("d3");
var numeral = require("numeral");

var ColorDifference = require("./color-difference");

class BubbleEngine {
  constructor(options) {
    var colorDifference = new ColorDifference(options.color1, options.color2);

    var width = window.innerWidth ? window.innerWidth : window.outerWidth,
      height = window.innerHeight ? window.innerHeight : window.outerHeight;

    var diameter = width,
      format = d3.format(",d"),
      color = d3.scale.category20c();

    var bubble = d3.layout
      .pack()
      .sort(null)
      .size([diameter, height])
      .padding(0);

    var svg = d3
      .select("#data-map")
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("class", "bubble")
      .call(
        d3.behavior.zoom().on("zoom", function() {
          svg.attr(
            "transform",
            "translate(" +
              d3.event.translate +
              ")" +
              " scale(" +
              d3.event.scale +
              ")"
          );
        })
      )
      .append("g");

    var node = svg
      .selectAll(".node")
      .data(
        bubble.nodes(classes(options.data)).filter(function(d) {
          return !d.children;
        })
      )
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
      });

    node.append("title").text(function(d) {
      return d.className + ": " + format(d.value);
    });

    node
      .append("circle")
      .attr("r", function(d) {
        return d.r;
      })
      .style("fill", function(d) {
        return d.color;
      });

    node
      .append("text")
      .attr("dy", "-.08em")
      .style("text-anchor", "middle")
      .style("font-weight", "bold")
      .style("font-size", function(d) {
        return (d.r / d.className.length) * 2.5 + "px";
      })
      .text(function(d) {
        return d.className;
      });

    node
      .append("text")
      .attr("dy", "1.2em")
      .style("text-anchor", "middle")
      .style("font-weight", "300")
      .style("font-size", buildPopulationFontSize)
      .text(buildPopulationText);

    node
      .append("text")
      .attr("dy", "2.4em")
      .style("text-anchor", "middle")
      .style("font-weight", "300")
      .style("font-size", buildPopulationFontSize)
      .text(buildDensityText);

    // Returns a flattened hierarchy containing all leaf nodes under the root.
    function classes(root) {
      var classes = [];

      function recurse(name, node) {
        if (node.children)
          node.children.forEach(function(child) {
            recurse(node.name, child);
          });
        else {
          color = colorDifference.percent(node.color);

          classes.push({
            packageName: name,
            className: node.name,
            value: node.population,
            density: node.density,
            color: color
          });
        }
      }

      recurse(null, root);
      return { children: classes };
    }

    function buildPopulationText(d) {
      return numeral(d.value * 1000).format("0,0") + " чел.";
    }

    function buildPopulationFontSize(d) {
      return (d.r / buildPopulationText(d).length) * 1.5 + "px";
    }

    function buildDensityText(d) {
      return numeral(d.density).format("0,0") + " чел./км ";
    }

    // d3.select("#data-map").style("height", diameter + "px");
  }
}

module.exports = BubbleEngine;
