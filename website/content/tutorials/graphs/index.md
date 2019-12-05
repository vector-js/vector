---
title: Graphs Tutorial
description: Basic usage and documentation for the interactive svg library. Explains how to build a simple interactive and embed it in the browser.
image: /images/tidy.svg
date: "2019-02-05T12:03:45-07:00"
# layout: video
weight: 2
---

The graph module is used to visualize simple graphs in the form of a node-link diagram. Both directed and undirected graphs are supported. The Reingold-Tilford “Tidy” layout for drawing trees is also supported.

To create a graph, first create an interactive object (link). Then create a graph object as shown below. When doing so, you will specify whether or not it is a directed edge.

{{< highlight javascript>}}
let graph = interactive.graph({directed:true});
{{< /highlight >}}

When creating a node, you can specify position, label, x radius and y radius of the node, which is shown as an ellipse. Label and both radii parameters are optional.

{{< highlight javascript>}}
let node = graph.addNode(xPosition, yPosition, label, xRadius, yRadius);
let leaf = graph.addNode(xPosition, yPosition, label, xRadius, yRadius);
{{< /highlight >}}

When creating an edge, if you are working with an undirected graph, the order of the nodes passed into the constructor does not matter. If it is a directed graph, the edge is created in the order from, to.

{{< highlight javascript>}}
let edge = graph.addEdge(nodeFrom, nodeTo);
{{< /highlight >}}


For more information about the graph class, such as how to move nodes and how to style nodes, feel free to visit our API, watch the simple example video above, or visit our examples and sort by graph to view more complex examples.
