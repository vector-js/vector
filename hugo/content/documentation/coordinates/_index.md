---
title: Coordinates
description: A user is able to create interactive maps from a selection of
weight: 6
icon: /graph.svg
---

The coordinates of the interactive image follow the SVG standard and more traditionally computer graphics. The default origin of the coordinate system is the top left corner of the image with the positive x direction to the right and the positive y direction down.

<!-- TODO: Interactive SVG Coordinate System -->

The origin can be changed by setting the originX and originY properties of the interactive object.

{{< highlight javascript>}}
let interactive = new Interactive("{{<id>}}");
interactive.originX = interactive.width/2;
interactive.originY = interactive.height/2;
{{< /highlight >}}

{{< highlight javascript>}}
// TODO: show interactive with new origin
{{< /highlight >}}

Alternatively, the viewbox of the interactive can be changed

{{< highlight javascript>}}
// what happens when the dimensions of the interactive and the viewbox disagree?
{{< /highlight >}}
