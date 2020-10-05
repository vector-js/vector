---
title: Vector.js
description: "A Javascript library for the creation of interactive graphics. The library uses the existing web standards: HTML, SVG, and CSS making it easy to use with other tools and libraries. At its core, the library is a minimalist tool for creating interactives."
blurb: A Javascript library for the creation of interactive graphics.
aside:
  - About
  - Getting Started
  - Coordinates
  - Basic Elements
  - Styling
  - Templates
  - Interaction
  - Input Elements
modules:
  - Animation
  - Graphs
  # - Maps
  - Plots
---

## About

Vector.js is a Javascript library written in Typescript for creating interactive 2D graphics. The library uses the existing web standards: HTML, SVG, and CSS and has no dependencies.

## Getting Started

- Download the latest release
- Follow the Getting Started Tutorial
- Browse the many examples
- Read the overview (this page)

## Coordinates

The coordinate system is the same as the SVG coordinate system. The origin is the top left corner of the image and the positive *x* direction is to the right and the positive *y* direction is down. The origin and scale of the coordinate system can be changed as shown in [this tutorial]({{<relref "tutorials/coordinate-system">}}).

{{<example "svg-coordinate-system">}}

## Basic Elements

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

## Styling

The appearance of elements within this library can be styled using CSS. Styles can either be applied using a user defined style sheet or directly within the Javascript file. Helper classes are provided for the convenience of the user. Basic geometric elements have two basic properties: fill and stroke. Fill is the area contained within the shape and stroke is the edge of the geometric shape. These styles can be accessed through the style property.

{{< highlight javascript>}}
let rectangle = interactive.rectangle( 50, 50, 100, 50);
rectangle.style.fill = 'blue';
rectangle.style.stroke = 'red';
rectangle.style.strokeWidth = '1px';
{{< /highlight >}}

### Inherited Styles

A powerful feature of a tree-structured document is that elements inherit styles from their parents.

See the **styling tutorial** for how to create your own custom styles.

## Templates

The library offers templates that create high-quality, responsive interactives to improve the "out-of-the-box" experience fo the library. The templates are ideal for interactives embedded within an article. The main area is usually where the "interactive" area is defined for drawing shapes and what not. The sidebars, headers and footers are areas to create input elements or display relevant information. These templates were directly inspired by [Googles web.dev](https://1linelayouts.glitch.me/).

### Pancake Template

The pancake stack has three regions: the header, main and footer.

<div class="ex-section ex4">
<div class="ex-area">
  <div class="ex-container">
    <div class="parent">
      <header class="blue section" contenteditable="">Header</header>
      <main class="coral section" contenteditable="">Main (Interactive Area)</main>
      <footer class="purple section" contenteditable="">Footer Content</footer>
    </div>
  </div>
</div>
</div>

### Sidebar Template

<div class="ex-section ex3">
<div class="ex-area">
  <div class="ex-container">
    <div class="parent">
      <div class="section yellow" contenteditable>
      Sidebar
      </div>
      <div class="section green" contenteditable>
        Main (Interactive Area)
      </div>
    </div>
  </div>
</div>
</div>

Templates can be nested inside of eachother to build complex layouts. See all **templates** or find an example related to what you want to do.

## Interaction

User interaction is defined by **events**, **input elements** and **reactive programming**. Events are registered to elements created in the "main" area of the interactive. Input elements allow the user to change the state of the interactive. Reactive programming allows different elements to be related together in a "spreadsheet-like" style of programming.

### Events

For event driven programming event handlers are registered to user events. For example, an event handler can be registered to the event that a user moves their mouse over a geometric shape. This architecture is baked into the native languages of the web and can be utilizes with this library.

### Input Elements

User input drives the animations of these graphics and is the main focus of this library. These input elements are part of the SVG ecosystem and provide the end users with ways to manipulate and interact with the visual in front of them.

#### Control Point

A control point is a two dimensional point that can be clicked and dragged by the user.

{{< highlight javascript>}}
let control = interactive.control( 150, 75);
{{< /highlight >}}

{{<example "control-element">}}

#### Scrubber

The scrubber has a play and pause button that start and stop the animation. The position indicator can also be dragged to change the state of the scrubber.

{{< highlight javascript>}}
let scrubber = interactive.scrubber( 100, 75, 400);
{{< /highlight >}}

{{<example "scrubber-element">}}

See **all input elements** to get an idea of what can be exposed to the user.

### Reactive Programming

Reactive programming is a paradigm where elements can use the state of other elements to update themselves. When the state of element changes the elements are dependent are also changed. In this way, changes flow through elements.

## Modules

As of now, the library has three modules that provide the ability to create complex elements with a suitable level of abstraction. Each module utilizes the core functionality of the library in their implementation.

## Animation

While animation isn't the main focus the library, some basic animations can be achieved using some built in elements like the scrubber element, and the native web API `requestAnimationFrame`.

### Time Line Animation

Adding a time-line to an interactive gives the user control over a basic animation. For beginner users, the scrubber is a great element to animate parts of an interactive. It allows the user to start, stop, and "scrub" to different parts of the animation.

{{<example "animate-along-path">}}

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
