---
title: SVG Path Arc Command
description:
id: svg-path-arc
tags:
- svg
---

{{< highlight svg>}}
<path d="A rx ry x-axis-rotation large-arc-flag sweep-flag x y"></path>
{{< /highlight >}}

The arc command draws an arc between two points. The syntax of the command is "A rx ry x-axis-rotation large-arc-flag sweep-flag x y". The arc is drawn between the current position of the path and the end position (x,y). The numbers rx and ry define the shape of the ellipse which forms the arc. The x-axis rotation number controls what part of the ellipse's arc is being drawn between the points. The large arc flag determines whether to take the shorter arc or longer path between the two points. Finally, the sweep-flag chooses which of the two ellipsis that pass through the two points to draw.

{{<example "svg-path-arc">}}
