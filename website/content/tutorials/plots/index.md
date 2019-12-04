---
title: Plot Tutorial
description: The basics of how to use our Plotting module. This tutorial will detail the capabilites, limitations, and functionality of our Map module at a high level.
image: "/images/sine.svg"
weight: 3
---

{{< highlight javascript>}}
let scale = 300/Math.PI;
let plot = interactive.plot(600, 300, Math.cos, {
  originX: 0,
  originY: 150,
  scaleX: scale,
  scaleY: scale,
  controls: false, /* experimental */
  displayPoint: false, /* experimental */
  zoomable: false /* experimental */
});
{{< /highlight >}}

{{<example "plot-element">}}

#### Visualize Multiple Functions

{{< highlight javascript>}}
let scale = 300/Math.PI;
let secant = (x) => { return 1/Math.cos(x) };
let plot = interactive.plot(600, 600, secant, {
  originX: 0,
  originY: 300,
  scaleX: scale,
  scaleY: scale,
  zoomable: false,
  controls: false
});
plot.graph(Math.cos);
{{< /highlight >}}

{{<example "secant">}}
