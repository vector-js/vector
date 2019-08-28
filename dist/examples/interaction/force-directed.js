// import { initProvenance } from "../../../node_modules/provenance-lib-core/lib/src/provenance-core/Provenance";
// console.log(initProvenance);
var svg = d3.select("#viz"), width = +svg.attr("width"), height = +svg.attr("height");
var color = d3.scaleOrdinal(d3.schemeCategory10);
var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function (d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));
d3.json("dist/examples/interaction/miserables.json").then(function (graph) {
    console.log(graph);
    var link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line")
        .attr("stroke-width", function (d) { return Math.sqrt(d.value); });
    var node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("r", 5)
        .attr("fill", function (d) { return color(d.group); })
        .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));
    node.append("title")
        .text(function (d) { return d.id; });
    simulation
        .nodes(graph.nodes)
        .on("tick", ticked);
    simulation.force("link")
        .links(graph.links);
    function ticked() {
        link
            .attr("x1", function (d) { return d.source.x; })
            .attr("y1", function (d) { return d.source.y; })
            .attr("x2", function (d) { return d.target.x; })
            .attr("y2", function (d) { return d.target.y; });
        node
            .attr("cx", function (d) { return d.x; })
            .attr("cy", function (d) { return d.y; });
    }
});
function dragstarted(d) {
    if (!d3.event.active)
        simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}
function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}
function dragended(d) {
    if (!d3.event.active)
        simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}
//
// var width = 1200;
// var height = 900;
// var color = d3.scaleOrdinal(d3.schemeCategory10);
//
// d3.json("dist/examples/interaction/miserables.json").then(function(graph) {
//
// console.log(graph);
//
// var label = {
//     'nodes': [],
//     'links': []
// };
//
// graph.nodes.forEach(function(d, i) {
//     label.nodes.push({node: d});
//     label.nodes.push({node: d});
//     label.links.push({
//         source: i * 2,
//         target: i * 2 + 1
//     });
// });
//
// var labelLayout = d3.forceSimulation(label.nodes)
//     .force("charge", d3.forceManyBody().strength(-50))
//     .force("link", d3.forceLink(label.links).distance(0).strength(2));
//
// var graphLayout = d3.forceSimulation(graph.nodes)
//     .force("charge", d3.forceManyBody().strength(-3000))
//     .force("center", d3.forceCenter(width / 2, height / 2))
//     .force("x", d3.forceX(width / 2).strength(1))
//     .force("y", d3.forceY(height / 2).strength(1))
//     .force("link", d3.forceLink(graph.links).id(function(d) {return d.id; }).distance(50).strength(1))
//     .on("tick", ticked);
//
// var adjlist = [];
//
// graph.links.forEach(function(d) {
//     adjlist[d.source.index + "-" + d.target.index] = true;
//     adjlist[d.target.index + "-" + d.source.index] = true;
// });
//
// function neigh(a, b) {
//     return a == b || adjlist[a + "-" + b];
// }
//
//
// var svg = d3.select("#viz").attr("width", width).attr("height", height);
// var container = svg.append("g");
//
// svg.call(
//     d3.zoom()
//         .scaleExtent([.1, 4])
//         .on("zoom", function() { container.attr("transform", d3.event.transform); })
// );
//
// var link = container.append("g").attr("class", "links")
//     .selectAll("line")
//     .data(graph.links)
//     .enter()
//     .append("line")
//     .attr("stroke", "#aaa")
//     .attr("stroke-width", "1px");
//
// var node = container.append("g").attr("class", "nodes")
//     .selectAll("g")
//     .data(graph.nodes)
//     .enter()
//     .append("circle")
//     .attr("r", 5)
//     .attr("fill", function(d) { return color(d.group); })
//
// node.on("mouseover", focus).on("mouseout", unfocus);
//
// node.call(
//     d3.drag()
//         .on("start", dragstarted)
//         .on("drag", dragged)
//         .on("end", dragended)
// );
//
// var labelNode = container.append("g").attr("class", "labelNodes")
//     .selectAll("text")
//     .data(label.nodes)
//     .enter()
//     .append("text")
//     .text(function(d, i) { return i % 2 == 0 ? "" : d.node.id; })
//     .style("fill", "#555")
//     .style("font-family", "Arial")
//     .style("font-size", 12)
//     .style("pointer-events", "none"); // to prevent mouseover/drag capture
//
// node.on("mouseover", focus).on("mouseout", unfocus);
//
// function ticked() {
//
//     node.call(updateNode);
//     link.call(updateLink);
//
//     labelLayout.alphaTarget(0.3).restart();
//     labelNode.each(function(d, i) {
//         if(i % 2 == 0) {
//             d.x = d.node.x;
//             d.y = d.node.y;
//         } else {
//             var b = this.getBBox();
//
//             var diffX = d.x - d.node.x;
//             var diffY = d.y - d.node.y;
//
//             var dist = Math.sqrt(diffX * diffX + diffY * diffY);
//
//             var shiftX = b.width * (diffX - dist) / (dist * 2);
//             shiftX = Math.max(-b.width, Math.min(0, shiftX));
//             var shiftY = 16;
//             this.setAttribute("transform", "translate(" + shiftX + "," + shiftY + ")");
//         }
//     });
//     labelNode.call(updateNode);
//
// }
//
// function fixna(x) {
//     if (isFinite(x)) return x;
//     return 0;
// }
//
// function focus(d) {
//     var index = d3.select(d3.event.target).datum().index;
//     node.style("opacity", function(o) {
//         return neigh(index, o.index) ? 1 : 0.1;
//     });
//     labelNode.attr("display", function(o) {
//       return neigh(index, o.node.index) ? "block": "none";
//     });
//     link.style("opacity", function(o) {
//         return o.source.index == index || o.target.index == index ? 1 : 0.1;
//     });
// }
//
// function unfocus() {
//    labelNode.attr("display", "block");
//    node.style("opacity", 1);
//    link.style("opacity", 1);
// }
//
// function updateLink(link) {
//     link.attr("x1", function(d) { return fixna(d.source.x); })
//         .attr("y1", function(d) { return fixna(d.source.y); })
//         .attr("x2", function(d) { return fixna(d.target.x); })
//         .attr("y2", function(d) { return fixna(d.target.y); });
// }
//
// function updateNode(node) {
//     node.attr("transform", function(d) {
//         return "translate(" + fixna(d.x) + "," + fixna(d.y) + ")";
//     });
// }
//
// function dragstarted(d) {
//     d3.event.sourceEvent.stopPropagation();
//     if (!d3.event.active) graphLayout.alphaTarget(0.3).restart();
//     d.fx = d.x;
//     d.fy = d.y;
// }
//
// function dragged(d) {
//     d.fx = d3.event.x;
//     d.fy = d3.event.y;
// }
//
// function dragended(d) {
//     if (!d3.event.active) graphLayout.alphaTarget(0);
//     d.fx = null;
//     d.fy = null;
// }
//
// });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yY2UtZGlyZWN0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zb3VyY2UvZXhhbXBsZXMvaW50ZXJhY3Rpb24vZm9yY2UtZGlyZWN0ZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsaUhBQWlIO0FBRWpILCtCQUErQjtBQUUvQixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUN2QixLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUMxQixNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRWpDLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFFakQsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDLGVBQWUsRUFBRTtLQUNoQyxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUMsVUFBUyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDOUQsS0FBSyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7S0FDbkMsS0FBSyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFFNUQsRUFBRSxDQUFDLElBQUksQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFTLEtBQUs7SUFFdEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUVsQixJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztTQUNyQixJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQztT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