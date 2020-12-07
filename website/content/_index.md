---
title: Vector.js
description: "A Javascript library for the creation of interactive graphics. The library uses the existing web standards: HTML, SVG, and CSS making it easy to use with other tools and libraries. At its core, the library is a minimalist tool for creating interactives."
blurb: A Javascript library for creating interactive graphics on the web.
aside:
  - About
  - Getting Started
  - Layouts
  - Drawing Area
  - Basic Elements
  - Styling
  - Interaction
modules:
  - Plots
  - Graphs
  - Maps
---

## About

Vector.js is an open-source Javascript library written in Typescript for creating interactive vector graphics on the web. The library uses core web technologies: HTML, Javascript, CSS and SVG has no dependencies. The library was originally developed by a group from the University of Utah for a senior captsone project and is currently maintained by [Kurt Bruns](https://kurtbruns.github.io/).

## Getting Started

- Download the latest release
- Getting Started Typescript
- Getting Started Browser
- Getting Started Nodejs
- Browse the many examples

## Layouts

Layouts are high-level boiler plate for you to hit the ground running. Pick a layout that best fits your use case

### Pancake

The pancake layout is a classic layout that works well in an article format. The layout has three regions: the header, drawing area and footer.

<div class="ex-section ex4">
<div class="ex-area">
  <div class="ex-container">
    <div class="parent">
      <header class="blue section"="">Header</header>
      <main class="green section"="">Drawing Area</main>
      <footer class="purple section"="">Footer</footer>
    </div>
  </div>
</div>
</div>

### Sidebar

The sidebar layout is another classic layout that works well with a little bit more available space, but still looks good in an article.

<div class="ex-section ex3">
<div class="ex-area">
  <div class="ex-container">
    <div class="parent">
      <div class="section yellow">
      Sidebar
      </div>
      <div class="section green">Drawing Area</div>
    </div>
  </div>
</div>
</div>

Templates can be nested inside of eachother to build complex layouts. See all **layouts** or find an example related to what you want to do.

TODO: link to all layouts

## Drawing Area

The drawing area is the region where visual elements are rendered. For example, the drawing area below has a width of `400` and a height of `300`. The **origin** of the coordinate system is located, by default, at the top-left corner of the drawing area and, as is typical in computer graphics, the positive *y*-direction is down instead of up. Drag the blue control point to see how a point is defined in the drawing area.

{{<example "DrawingArea">}}

The library provides out-of-the-box templates that create responsive drawing areas. These templates aim to look good on both mobile and desktop devices.

### Overflow Template

The overflow template defines a drawing area that is good for drawing interactives that start in a bounded area, but can use the extra space for user input. The initial area is used to scale the interactive to fit mobile devices.

{{<example "OverflowDrawingArea">}}

### Responsive Template

The responsive template defines a responsive drawing area that scales up and down according to the available space. Providing a `maxWidth` value to the template when it is created limits how much space the drawing area takes up.

{{<example "ResponsiveDrawingArea">}}

## Basic Elements

The library has basic visual and structural elements for creating graphics. The basic elements correspond to the elements of the Scalable Vector Graphics Specification. More complicated elements use one or more basic elements internally. Every element contains a root <a href="https://developer.mozilla.org/en-US/docs/Web/API/SVGElement" target="_blank">SVGElement</a> attribute which gives access SVGElement Web API.

### Rectangle

{{<example "RectangleExample">}}

{{< highlight javascript>}}
let rect = area.rect(50, 75, 200, 150);
{{< /highlight >}}

### Ellipse

{{<example "EllipseExample">}}

{{< highlight javascript>}}
let ellipse = area.ellipse(150, 150, 100, 75);
{{< /highlight >}}

### Line

{{< highlight javascript>}}
let line = interactive.line( 50, 25, 150, 125);
{{< /highlight >}}

### Path

{{< highlight javascript>}}
let line = interactive.path("M 50 50 Q 100 150 150 50");
{{< /highlight >}}

### Text

{{< highlight javascript>}}
let text = interactive.text( 50, 75, "My Text");
{{< /highlight >}}

### TSpan

A text span element allows for text to be styled and positioned differently within a body of text. In the example below, a word is randomly selected to be bold to emphasize a part of the sentence.

{{< highlight javascript>}}
let text = interactive.text( 50, 75, '');
text.tspan('normal. ');
text.tspan('bold. ').style.fontWeight = '600';
text.tspan('normal again.');
{{< /highlight >}}

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

#### Scrubber

The scrubber has a play and pause button that start and stop the animation. The position indicator can also be dragged to change the state of the scrubber.

{{< highlight javascript>}}
let scrubber = interactive.scrubber( 100, 75, 400);
{{< /highlight >}}

See **all input elements** to get an idea of what can be exposed to the user.

### Reactive Programming

Reactive programming is a paradigm where elements can use the state of other elements to update themselves. When the state of element changes the elements are dependent are also changed. In this way, changes flow through elements.

## Modules

As of now, the library has three modules that provide the ability to create complex elements with a suitable level of abstraction. Each module utilizes the core functionality of the library in their implementation.

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


### Graphs

### Maps