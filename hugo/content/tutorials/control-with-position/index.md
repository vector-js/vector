---
title: Control With Position
description: Basic usage and documentation for the interactive svg library. Explains how to build a simple interactive and embed it in the browser.
weight: 10
---

This tutorial introduces the user to the basics of our library through step-by-step instructions. By the end, the user should have a simple interactive that demonstrates the functionality and utility of the library.

## Open the Editor

Start by opening an instance of the <a href="/sandbox/" target="_blank">sandbox</a> in a new tab.
<!-- More advanced users may want to set up their own development environment... -->

## Create a Basic Interactive

Create a new interactive with a simple control point. Copy and paste the following into the text area. The first line of code creates a new "interactive" within the HTML element corresponding to the id. The second line creates a simple control point and is an example of how the end user interfaces with the interactive.

{{< highlight javascript >}}
let interactive = new Interactive("my-id");
let control = interactive.control( 100, 100);
interactive.window = true;
{{< / highlight >}}

After pressing the render button, this should result in an interactive identical to the one below with a blue control point at the coordinates (100, 100). Try clicking and dragging the point around.

<div id="step-0" class="interactive"></div>
<script type="module" src="./step-0.js"></script>

## Relate Elements Together

By convention, the coordinates are measured from the top-left point of the interactive. Let's add some text to display the current location of the point. This demonstrates how elements can be created and related to eachother. When the state of one element changes all of the dependent elements will get updated.

{{< highlight javascript >}}
let text = interactive.text(100, 100, "(100,100)");
text.addDependency(control);
text.update = function() {
  this.contents = `(${control.x},${control.y})`;
};
{{< / highlight >}}

This should result in the interactive below.

<div id="step-1" class="interactive"></div>
<script type="module" src="./step-1.js"></script>

The text accurately reflects the position of the point, but we can still do better. Modify the update function to also update the x and y position of the text element.

<!-- TODO: When setting the update function it could be possible to always call the function immediately after setting it? Note, instead of fiddling around with updating the position of the text in two places, the update function is called right after being defined which is a convenient way to ignore the element's initial state. -->

{{< highlight javascript >}}
text.update = function() {
  this.x = control.x + 15;
  this.y = control.y - 15;
  this.contents = `( ${control.x}, ${control.y})`;
};
text.update();
{{< / highlight >}}

This should result in the finished simple interactive: a control point that displays its current position when it is dragged around.

<div id="step-2" class="interactive"></div>
<script type="module" src="./step-2.js"></script>

## Onward

To learn more follow other tutorials, browse and fork examples, or read the documentation.

- [Tutorials](/tutorials/)
- [Examples](/examples/)
