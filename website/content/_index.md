---
title: Vector.js
description: "A Javascript library for the creation of interactive graphics. The library uses the existing web standards: HTML, SVG, and CSS making it easy to use with other tools and libraries. At its core, the library is a minimalist tool for creating interactives."
blurb: A Javascript library for the creation of interactive graphics.
aside:
  - About
  - Getting Started
  - Elements
  - Input
  - Interaction
  - Animation
  - Coordinates
  - Styling
modules:
  - Graphs
  - Maps
  - Plots
---

## Notice

The `master`branch of this project is currently unmaintained. Development continues on the `development` branch on the repository. Thank you for your patience.

## About

Welcome! Vector.js is a Javascript library for creating interactive graphics. The library uses the existing web standards: HTML, SVG, and CSS and has no dependencies.

## Getting Started

{{<render "content" "/tutorials/getting-started">}}

## {{<header-link "/elements" "Elements">}}

The library has basic visual and structural elements for creating graphics. The basic elements correspond to the elements of the Scalable Vector Graphics Specification. More complicated elements use one or more basic elements internally. Every element contains a root <a href="https://developer.mozilla.org/en-US/docs/Web/API/SVGElement" target="_blank">SVGElement</a> attribute which gives access SVGElement Web API.

### Ellipse

{{< highlight javascript>}}
let ellipse = interactive.ellipse( 100, 75, 80, 40);
{{< /highlight >}}

{{<example "ellipse-element">}}

### Line

{{< highlight javascript>}}
let line = interactive.line( 50, 25, 150, 125);
{{< /highlight >}}

{{<example "line-element">}}

### Path

{{< highlight javascript>}}
let line = interactive.path("M 50 50 Q 100 150 150 50");
{{< /highlight >}}

{{<example "path-element">}}

### Rectangle

{{< highlight javascript>}}
let rectangle = interactive.rectangle( 50, 50, 100, 50);
{{< /highlight >}}

{{<example "rectangle-element">}}

### Text

{{< highlight javascript>}}
let text = interactive.text( 50, 75, "My Text");
{{< /highlight >}}

{{<example "text-element">}}

### TSpan

A text span element allows for text to be styled and positioned differently within a body of text. In the example below, a word is randomly selected to be bold to emphasize a part of the sentence.

{{< highlight javascript>}}
let text = interactive.text( 50, 75, '');
text.tspan('normal. ');
text.tspan('bold. ').style.fontWeight = '600';
text.tspan('normal again.');
{{< /highlight >}}

{{<example "tspan-element">}}

### Group

The group element is a structural element for grouping other elements together. This is useful for applying styles, transformations, and other such things to multiple elements at once.

## Input

User input drives the animations of these graphics and is the main focus of this library. These input elements are part of the SVG ecosystem and provide the end users with ways to manipulate and interact with the visual in front of them.

### Button

The button element has a position, label, and default style. Defining the "onclick" method handles when a user clicks the button.

{{< highlight javascript>}}
let button = interactive.button( 100, 75, "My Button");
{{< /highlight >}}

{{<example "button-element">}}

### Check Box

A checkbox has two different states: checked and unchecked. When a user clicks the box the state changes.

{{< highlight javascript>}}
let checkBox = interactive.checkBox( 100, 75, "My Checkbox", false);
{{< /highlight >}}

{{<example "check-box-element">}}

### Control Point

A control point is a two dimensional point that can be clicked and dragged by the user. The control has a (x,y) position as well as its change in position (dx, dy).

{{< highlight javascript>}}
let control = interactive.control( 150, 75);
{{< /highlight >}}

{{<example "control-element">}}

<!-- TODO: drop down -->
<!-- TODO: input box -->

### Dropdown Input

The drop down allows users to select from a variety of options.

{{< highlight javascript>}}
interactive.dropdownControl(20, 60, ["red", "green", "blue"], 0);
{{< /highlight >}}

{{<example "dropdown-control-element">}}

### Radio Control

The radio control elements allows the user to select from a list of options. Only one option can be selected at a time.

{{< highlight javascript>}}
let radio = interactive.radioControl(100, 50, ["red","green","blue"]);
{{< /highlight >}}

{{<example "radio-control-element">}}

### Scrubber

The scrubber has a play and pause button that start and stop the animation. The position indicator can also be dragged to change the state of the scrubber.

{{< highlight javascript>}}
let scrubber = interactive.scrubber( 100, 75, 400);
{{< /highlight >}}

{{<example "scrubber-element">}}

### Slider

A slider has a position and zero or more of the following options: `min`, `max`, `step`, `value`, and `width`.

{{< highlight javascript>}}
let slider = interactive.slider( 75, 75, {
  min: 100,
  max: 200,
  step: 25,
  value: 125,
  width: 200
});
{{< /highlight >}}

{{<example "slider-element">}}

## Interaction

There are two forms of handling interaction within our software system. The first form is reactive programming. Elements can be related together using dependency functions, similar to how cells are related together in a spreadsheet application. These dependencies are explicit and give dependents access to the data of the elements they rely on. These dependencies also define how the interactive should update elements and in what order the update should happen when an element's state is changed.

The second, more tradditional, form of handling interaction is event driven programming. Event handler properties are surfaced in elements where it seemed useful. Otherwise, access to all of the event handlers is available throught the root SVGElement and the native web APIs.

### Reactive Programming

All elements contain the ability to define dependencies to other elements. An element declares what it is dependent on using the "addDependency" function and then defines an update function which describes how the element should update itself. Circular dependencies will cause an exception. By convention, an element should only use the data of the elements it has declared itself dependent on.

<!-- TODO: hopefully in the future this will be strictly enforced,  -->

{{< highlight javascript>}}
let control1 = interactive.control( 100, 100);
let control2 = interactive.control( 200, 200);
control2.addDependency(control1);
control2.update = function(){
  this.x += control1.dx;
};
{{< /highlight >}}

{{<example "dependency-function">}}

An example of how this approach can be used to generate complicated interactives is given by the Riemann Sum example below. In this example, there are a fair number more elements that have been related together using the reactive approach.

{{<example "riemann-sum">}}

To visualize what is happening, the elements that are related together are highlighted and labeled in blue. Then the dependency graph on the right shows the user defined depencies represented as arrows. For example, the dependency between the control point the control point “control1” (B) and the text “label” (E), is represented as B → E in the graph.

<div class="flex-row container">
  <img src="/images/riemann-sum-highlighted.svg" alt="Rieman Sum Highlighted" width="50%">
  <img src="/images/riemann-sum-dependency-graph.svg" alt="Rieman Sum Dependency Graph" width="50%">
</div>

### Event Handling

#### Keyboard Input

Key board input can be used to change the state of an interactive as well as control different elements within the interactive. The example below highlights the numbers one through five with the corresponding key on the keyboard when pressed.

<!-- TODO: make an interactive of the whole keyboard -->

{{< highlight javascript>}}
window.onkeydown = function( event ) {
  ...
}
{{< /highlight >}}

{{<example "keyboard">}}

#### Mouse Input

Mouse input can be used to change the state of an interactive. Mouse input consists of the mouse's position, when the users clicks the interactive, etc.

<!-- TODO: add mouse into the depedency eco-system? -->
<!-- TODO: show velocity vector of mouse? -->
<!-- TODO: count mouse leave, mouse enter? -->

{{< highlight javascript>}}
// register a mouse click handler
interactive.root.onmouseclick = (event) => {
  // ...
}

// register a mouse move handlers
interactive.root.onmousemove = (event) => {
  // ...
}
{{< /highlight >}}

{{<example "mouse-interaction">}}

## Animation

While animation isn't the main focus the library, some basic animations can be achieved using some built in elements like the scrubber element, and the native web API `requestAnimationFrame`.

### Time Line Animation

Adding a time-line to an interactive gives the user control over a basic animation. For beginner users, the scrubber is a great element to animate parts of an interactive. It allows the user to start, stop, and "scrub" to different parts of the animation.

{{<example "animate-along-path">}}

## Coordinates

The coordinate system of the interactive image follows the SVG standard: the default origin is the top left corner of the image and the positive x direction is to the right and the positive y direction is down. This is visualized by the control point below.

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

## Styling

The appearance of elements within this library can be styled using CSS. Styles can either be applied using a user defined style sheet or directly within the Javascript file. Helper classes are provided for the convenience of the user.

### Basic Styling

Basic geometric elements have two basic properties: fill and stroke. Fill is the area contained within the shape and stroke is the edge of the geometric shape. These styles can be accessed through the style property.

<img src="/images/fill-stroke.svg" alt="Fill and Stroke Element" width="320px" style="display:block; margin:auto;">

{{< highlight javascript>}}
let rectangle = interactive.rectangle( 50, 50, 100, 50);
rectangle.style.fill = 'blue';
rectangle.style.stroke = 'red';
rectangle.style.strokeWidth = '1px';
{{< /highlight >}}

### Custom Styling

Every element within the library has a root property which is a SVG element. This root element contains zero or more child elements all of which can have custom styling applied to them through CSS selectors or Javascript. The style sheet for the library can be found in the <a href="/library.css">library.css</a> file. Typically, elements have an associated class that gives them their default look and feel.

## Modules

As of now, the library has three modules that provide the ability to create complex elements with a suitable level of abstraction. Each module utilizes the core functionality of the library in their implementation.

### Graphs

The graphing module is used to display basic graphs in the form of node link diagrams. Both directed and undirected graphs are supported. The module allows for the creations of individual nodes which can be connected via edges. Additionally, the graphing module supports the Reingold-Tilford “tidy” layout for automatically drawing trees.

{{<example "tidy-algorithm">}}

### Maps

The Map Module is used to plot geographic data in SVG format. Our library supports <a href="https://geojson.org/" target="_blank" rel="noreferrer">GeoJson</a> which is the most popular data standard for representing geographical data. The SVG path's get grouped by feature, meaning that manipulating the map objects is straight forward. For more information on this, please go to our Map Module Tutorial or take a look at some map examples.

#### Interactive World Map

{{< highlight javascript>}}
import {Interactive, getScriptName} from '../../index.js';
import {globalData} from './maps-json.js';

let myInteractive = new Interactive(getScriptName());
let map = myInteractive.map(globalData);
{{< /highlight >}}

{{<example "world-map">}}

#### Custom Maps

Any data that is in the GeoJson format can be rendered with our library. That means that if you can find the data for it, we can plot it. For more information on how GeoJson works and where to find it, go to the Map Module tutorial.

### Plots

Plots visualize the output of one or more functions in the Cartesian Coordinate System. To construct a plot, the user provides the dimensions of the plot and the function to be plotted.

{{< highlight javascript>}}
let scale = 300/Math.PI;
interactive.plot(Math.sin, {
  title: "Sine Function",
  originX: 0,
  originY: 150,
  scaleX: scale,
  scaleY: scale,
});
{{< /highlight >}}

{{<example "plot-element">}}
