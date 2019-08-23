---
title: Vector.js
description: "A Javascript library for the creation of interactive graphics. The library uses the existing web standards: HTML, SVG, and CSS making it easy to use with other tools and libraries. At its core, the library is a minimalist tool for creating interactives."
blurb: A Javascript library for the creation of interactive graphics.
aside:
   - Getting Started
   - Input
   - Elements
   - Interaction
   - Animation
   - Maps
   - Coordinates
   - Styling
---

## Getting Started

Download the library or link to the CDN and import the library at the top of your Javascript file. After importing the library create an interactive object by passing the string identifier of a HTML container element. This interactive object contains function calls and helper methods for creating elements and the interactions between them.

<div class="filename">index.html</div>

{{< highlight html>}}
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Getting Started</title>
    <link rel="stylesheet" href="{{< baseURL >}}Library.css">
  </head>
  <body>
    <div id="my-interactive"></div>
    <script type="module" src="getting-started.js"></script>
  </body>
</html>
{{< /highlight >}}

After including the script in the HTML file, the interactive will be created within the element with the corresponding id. Make sure to have attribute type="module" when including the script since we are using the ES6 import syntax.

<div class="filename">getting-started.js</div>

{{< highlight javascript>}}
import Interactive from "{{< baseURL >}}Interactive.js";
let interactive = new Interactive("my-interactive");
interactive.border = true;
let control = interactive.control( 100, 100);
{{< /highlight >}}

Serve the HTML page from a local folder over the network. <a href="https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?hl=en" target="_blank" rel="noopener">Web Server for Chrome</a> is a handy tool for doing this. The result is the following interactive: a blank SVG image with the default dimensions of 600 by 300 pixels. TODO: Download starter pack or watch the getting started tutorial.

<img src="/images/getting-started.svg" alt="">

## Input

User input drives the animations of these graphics and is the main focus of this library. These input elements are part of the SVG ecosystem and provide the end users with ways to manipulate and interact with the visual in front of them.

### Button

The button element has a position, label, and default style. Defining the "onclick" method handles when a user clicks the button.

{{< highlight javascript>}}
let button = interactive.button( 100, 75, "My Button");
{{< /highlight >}}

<div id="button-element"></div>

<script type="module" src="/examples/elements/button-element.js"></script>

### Check Box

A checkbox has two different states: checked and unchecked. When a user clicks the box the state changes.

{{< highlight javascript>}}
let checkBox = interactive.checkBox( 100, 75, "My Checkbox", false);
{{< /highlight >}}

<div id="check-box-element"></div>

<script type="module" src="/examples/elements/check-box-element.js"></script>

### Control Point

A control point is a two dimensional point that can be clicked and dragged by the user. The control has a (x,y) position as well as its change in position (dx, dy).

{{< highlight javascript>}}
let control = interactive.control( 150, 75);
{{< /highlight >}}

<div id="control-element"></div>

<script type="module" src="/examples/elements/control-element.js"></script>

<!-- TODO: drop down -->
<!-- TODO: input box -->

### Slider

A slider has a position, width, and starting value.

{{< highlight javascript>}}
let slider = interactive.slider( 75, 75, 150, 20);
{{< /highlight >}}

<div id="slider-element"></div>

<script type="module" src="/examples/elements/slider-element.js"></script>

## Elements

These elements form the basis of the visual part of the interactive.

{{< highlight javascript>}}
// How do you use/import a prexisting SVG image?
{{< /highlight >}}

### Ellipse

{{< highlight javascript>}}
let ellipse = interactive.ellipse( 100, 75, 80, 40);
{{< /highlight >}}

<div id="ellipse-element"></div>

<script type="module" src="/examples/elements/ellipse-element.js"></script>

### Line

{{< highlight javascript>}}
let line = interactive.line( 50, 25, 150, 125);
{{< /highlight >}}

<div id="line-element"></div>

<script type="module" src="/examples/elements/line-element.js"></script>

### Path

{{< highlight javascript>}}
let line = interactive.path("M 50 50 Q 100 150 150 50");
{{< /highlight >}}

<div id="path-element"></div>

<script type="module" src="/examples/elements/path-element.js"></script>

### Rectangle

{{< highlight javascript>}}
let line = interactive.rectangle( 50, 50, 100, 50);
{{< /highlight >}}

<div id="rectangle-element"></div>

<script type="module" src="/examples/elements/rectangle-element.js"></script>

### Text

{{< highlight javascript>}}
let line = interactive.text( 50, 75, "My Text");
{{< /highlight >}}

<div id="text-element"></div>

<script type="module" src="/examples/elements/text-element.js"></script>

## Interaction

There are two primary forms of interaction within our system. The first is dependencies; elements can be related together using dependency functions, similar to how cells are related together in a spreadsheet application. These dependencies are explicit and give dependents access to the data of the elements they rely on. These dependencies also define how the interactive should update elements and in what order when an element's state is changed.

The second form of interaction is the more tradditional event and handler architecture common to the web. Besides being used heavily within the implementation of this system, events are very useful when creating interactives.

### Dependency Functions

All elements contain the ability to define dependencies to other elements. An element declares what it is dependent on using the function .addDependency and then (optionally?) defines an update function which describes how the element should update itself. Circular dependencies will cause an exception. By convention, although hopefully in the future this will be strictly enforced, only the element's data whom have been declared should be used within the update function.

{{< highlight javascript>}}
let control1 = interactive.control( 100, 100);
let control2 = interactive.control( 200, 200);
control2.addDependency(control1);
control2.update = function(){
  this.x += control1.dx;
};
{{< /highlight >}}

<div id="dependency-function"></div>

<script type="module" src="/examples/interaction/dependency-function.js">

</script>

### Keyboard Input

Key board input can be used to change the state of an interactive or control different elements of it. The example below highlights the numbers one through five with the corresponding key on the keyboard when pressed.

{{< highlight javascript>}}
window.onkeydown = function( event ) {
  ...
}
{{< /highlight >}}

<div id="key-board-interaction"></div>

<script type="module" src="/examples/interaction/key-board-interaction.js"></script>

### Mouse Input

horizontal line showing x-position
veritical line showing y-position
expanding circle on click

{{< highlight javascript>}}
interactive.mouse ?
interactive.onclick ?
interactive.onmousemove ?
{{< /highlight >}}

<div id="mouse-interaction"></div>

<script type="module" src="/examples/interaction/mouse-interaction.js"></script>

## Animation

### Animate Along Path

{{< highlight javascript>}}
let circle = interactive.circle( 75, 75, 20);
let path = interactive.path("...");

circle.animateAlongPath( path, true, SPEED);
{{< /highlight >}}

<img src="/images/trace-animation.svg" class="center" alt="Animate Along SVG Path">

### Time Line Animation

{{< highlight javascript>}}
let scrubber = interactive.scrubber( 100, 75, 468);
{{< /highlight >}}

<div id="scrubber-element"></div>

<script type="module" src="/examples/elements/scrubber-element.js"></script>

## Maps

Wishful thinking (x,y) to lattitude longitude and vice versa.

### World Map

{{< highlight javascript>}}
let map = interactive.map("world-map.geojson");
{{< /highlight >}}

<img src="/images/world-map.svg" alt="SVG World Map" class="center">

### United States

{{< highlight javascript>}}
let map = interactive.map("united-states.geojson");
{{< /highlight >}}

<img src="/images/united-states.svg" class="center" alt="SVG United States Map">

### Custom Maps

## Coordinates

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

### Scaling

<img src="/images/cartesian-coordinate-system.svg" class="border center" alt="SVG Coordinate System">

{{< highlight javascript>}}
// TODO: Scaling example
{{< /highlight >}}

### Transforming

## Styling

The appearance of elements within this library can be styled using CSS. Styles can either be applied using a user defined style sheet or directly within the Javascript file. Helper classes are provided for the convenience of the user.

### Basic Styling

Primitive elements have two basic properties which can be styled: fill and stroke.

{{< highlight javascript>}}
let button = interactive.button( 100, 75, "My Button");
{{< /highlight >}}

### Custom Styling

Every element within the library has a root property which is a SVG element. This root element contains zero or more child elements all of which can have custom styling applied to them through CSS selectors or Javascript.
