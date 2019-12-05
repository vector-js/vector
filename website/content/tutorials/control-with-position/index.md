---
title: Control With Position
description: How to add a text label to a control point that moves with the point and displays its position.
image: "/images/control-with-position.svg"
weight: 10
---

This tutorial demonstrates how to add a text label to a control point and then make the label follow and display the position of the point using reactive programming syntax. We assume you have gone through the [getting started tutorial]({{<relref "/tutorials/getting-started">}}) to get to the starting point.

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

Next we are going to create a text element at a random position within the interactive.

<div id="step-1" class="interactive center"></div>
<script type="module" src="./step-1.js"></script>

{{< highlight javascript "linenos=inline,linenostart=10">}}
// Create a text element at the location (150,150);
let text = interactive.text(150, 150, "myText");
{{< /highlight >}}

## Declaring a Dependency

Then we are going to declare a dependency so that when the state of the control point changes, our text element's update function will be called.

{{< highlight javascript "linenos=inline,linenostart=14">}}
text.addDependency(control);
text.update = function() {
  // update the text element when the control changes
}
{{< /highlight >}}

## Update Function

Let's make it so the text element's position follows the position of the control point and the contents of the text displays the position of the point.

<div id="step-2" class="interactive center"></div>
<script type="module" src="./step-2.js"></script>

{{< highlight javascript "linenos=inline,linenostart=13">}}
// Update the text when the control changes
text.addDependency(control);
text.update = function() {

  // update the position of the text element
  this.x = control.x + 15;
  this.y = control.y - 15;

  // update the contents to be the position of the point
  this.contents = `(${control.x},${control.y})`;
};
text.update();
{{< /highlight >}}

<h2>Onward</h2>

To learn more follow other [tutorials]({{<ref "tutorials">}}), browse and fork [examples]({{<ref "examples">}}), or read the [documentation](/api/).
