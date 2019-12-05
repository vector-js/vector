---
title: Custom Element
description:
weight: 3
draft: true
---

Creating a custom element is an advanced topic that requires some understanding of the SVG specification (see the [SVG Tutorial](/svg/)). It also gets into how Vector.js is implemented.

{{< highlight javascript>}}
import Element from '../elements/Element.js';

// Extending the Element class guarantees that the custom element exists within
// the interactive ecosystem.
export default class Draggable extends Shape {

  // The root property is an SVG element that contains all of the SVG elements
  // associated with this custom element.
  root: SVGGElement;

  // Constructs an instance of this custom element
  constructor() {
    super();

    this.root = SVG.Group();
    this.root.classList.add('custom-element');
    this.root.id = this.id;
  }
}
{{< /highlight >}}
