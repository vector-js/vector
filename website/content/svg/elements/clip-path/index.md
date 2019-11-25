---
title: Clip Path
description: An interactive SVG clip path element.
structural: true
---
Clip paths can be applied to elements to show only the part of the graphic contained within the shape of the clip path. The clip path is applied to an element and its children by setting the clip-path attribute to point to a clip path element in the DOM tree.

{{<highlight svg>}}
<g clip-path="url(#my-clip-path)">
  <!-- grid of rectangles ... -->
</g>
<clipPath id="my-clip-path">
  <circle cx="300" cy="150" r="50"></circle>
</clipPath>
{{</highlight>}}

Click and drag the clip path below to change the position of the circle that defines the clipping path.

{{<example "svg-clip-path">}}
