---
title: Control With Position
description: How to add a text label to a control point that moves with the point and displays its position.
image: "/images/control-with-position.svg"
weight: 10
---

This tutorial shows the user how to add a text label to a control point. Then the text label will be made to follow the position of the point and show the point's current position. If you haven't gone through [getting started tutorial]({{<relref "/tutorials/getting-started">}}), do so to get to the starting point.

## Starting point

The starting point is an interactive with a control point that can be dragged around.

<div id="step-0" class="interactive center"></div>
<script type="module" src="./step-0.js"></script>

{{< highlight javascript "linenos=inline,linenostart=1">}}
import Interactive from '/interactive.js';

// Initialize the interactive
let interactive = new Interactive("step-0");
interactive.border = true;

// Create a control point at the location (100, 100)
let control = interactive.control( 100, 100);
{{< /highlight >}}

## Adding a Text Label

<div id="step-1" class="interactive center"></div>
<script type="module" src="./step-1.js"></script>

{{< highlight javascript "linenos=inline,linenostart=10">}}
// Create a text element at the location (150,150);
let text = interactive.text(150, 150, "myText");
{{< /highlight >}}

## Update Contents and Position of Text

Next let's make it so when the control moves as well. Let's also make it so the contents of the text displays the position of the control.

<div id="step-2" class="interactive center"></div>
<script type="module" src="./step-2.js"></script>

{{< highlight javascript "linenos=inline,linenostart=13">}}
// Update the text when the control changes
text.addDependency(control);
text.update = function() {
  this.x = control.x + 15;
  this.y = control.y - 15;
  this.contents = `(${control.x},${control.y})`;
};
text.update();
{{< /highlight >}}

## Onward

To learn more follow other tutorials, browse and fork examples, or read the documentation.

- [Tutorials](/tutorials/)
- [Examples](/examples/)
