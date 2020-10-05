---
title: Coordinate System
description:
# draft: true
---

The coordinate system of the interactive image follows the SVG standard: the default origin is the top left corner of the image and the positive *x* direction is to the right and the positive *y* direction is down. This is visualized by the control point below.

{{<example "svg-coordinate-system">}}

### Changing the Origin

The origin of the interactive coordinate system can be moved by changing the `.originX` or `.originY` property of an Interactive object. The origin can also be specified when the object is constructed. In the code snippet below the origin is specified to be the point (300,150) relative to the top left corner of the interactive.

{{< highlight javascript>}}
let interactive = new Interactive('my-id',{
  width: 600,
  height: 300,
  originX: 300,
  originY: 150
});
{{< /highlight >}}

The interactive object created using the above code snippet results in the coordinate system demonstrated below. Note, the y-coordinate is flipped from the cartesian coordinate system.

<div id="svg-coordinate-system-moved" class="vertical-center" style="margin-bottom:1.5rem;">
  <script type="module" src="/examples/svg/svg-coordinate-system-moved.js"></script>
</div>

### Setting the View Box

The more general form of setting the origin of the interactive object which is derived from the SVG base class is setting the view box of the SVG element. This is extremely useful, especially when paired with the `getBoundingBox` method implemented by every SVGGraphics element. The two interactive shown below both contain a grid of rectangles. The interactive on the left contains a rectangle which represents the view box that is being applied to the interactive on the right.

{{<example "svg-view-box">}}

The set view box function takes in a x position, y position, width and height. The (x,y) position represents the top-left-most position of the rectangle, the width and height specify the dimensions of the rectangle.

{{< highlight javascript>}}
interactive.setViewBox( left, top, width, height);
{{< /highlight >}}

### Crop Around Elements

A powerful feature of the view-box setting is the ability to crop around one or more elements.

### Preserve Aspect Ratio

Finally, the strategy for preserving the aspect ratio of an interactive gives the user control over how the area is scaled and fit into the available space.