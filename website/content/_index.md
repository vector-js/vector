---
title: Vector.js
description: "A Javascript library for the creation of interactive graphics. The library uses the existing web standards: HTML, SVG, and CSS making it easy to use with other tools and libraries. At its core, the library is a minimalist tool for creating interactives."
blurb: A Javascript library for creating interactive graphics on the web.
aside:
  - About
  - Getting Started
  - Layouts
  - Artboards
  - Basic Elements
  - Styling
  - Interaction
  - Input Elements
modules:
  - Plots
  # - Graphs
  # - Maps
---

## About

Vector is an open-source library written in Typescript for creating interactive vector graphics on the web. The library uses core web technologies: SVG, HTML, Javascript and CSS has no dependencies. The library was originally developed by a group of seniors from the University of Utah for their captsone and is currently maintained by [Kurt Bruns](https://kurtbruns.github.io/).

## Getting Started

- Download the latest release
- Getting Started Typescript (npm)
- Getting Started Browser
- Browse the many examples

## Layouts

Layouts are high-level boiler plate for you to hit the ground running. Pick a layout that best fits your use case. These layouts are currently optimized for graphics embedded in horizontally contained vertical documents.

### Pancake Layout

The pancake layout is a vertical layout that has three regions: the header, drawing area and footer.

<div class="ex-section ex4">
<div class="ex-area">
  <div class="ex-container">
    <div class="parent">
      <header class="blue section"="">Header</header>
      <main class="green section"="">Artboard</main>
      <footer class="purple section"="">Footer</footer>
    </div>
  </div>
</div>
</div>

### Sidebar Layout

The sidebar layout is another classic layout that works well with a little bit more available space.

<div class="ex-section ex3">
<div class="ex-area">
  <div class="ex-container">
    <div class="parent">
      <div class="section yellow">
      Sidebar
      </div>
      <div class="section green">Artboard</div>
    </div>
  </div>
</div>
</div>

See all **layouts** or find an example related to what you want to do.

<!-- TODO: link to all layouts -->

## Artboards

The artboard is the region where visual elements are rendered. For example, the artboard below has a width of `400` pixels and a height of `300` pixels. The **origin** of the coordinate system is located, by default, at the top-left corner of the drawing area and, as is typical in computer graphics, the positive *y*-direction is down instead of up. Drag the blue control point to see how a point is defined in the coordinate system.

{{<example "ArtboardExample">}}

The artboard uses the SVG specification to draw vector-based elements. The library provides a number of pre-defined artboards that are well-suited for a number of applications. An artboard is rendered into a parent `container`.

### Overflow Artboard

The overflow artboard defines a coordinate system with an initial area that overflows into the available space of its container. The initial width dimension is also used to scale the interactive to fit mobile devices. This is shown in the example below:

{{<example "OverflowArtboardExample">}}

```js
let artboard = new OverflowArtboard(container, {
  width:300,
  height:300,
  align:'left'
});
```

### Responsive Artboard

The responsive template defines a responsive drawing area that scales up and down according to the available space. Providing a `maxWidth` value to the template when it is created limits how much space the drawing area takes up.

{{<example "ResponsiveArtboardExample">}}

```js
let artboard = new ResponsiveArtboard(container, {
  width:300,
  height:200,
  maxWidth:400,
  align:'center'
});
```

## Basic Elements

The library has visual and structural elements for creating graphics. Basic elements usually correspond directly to an SVG element and custom elements are defined using a number of SVG elements.

### Rectangle Element

{{<example "RectangleExample">}}

```js
let rect = artboard.rect(50, 75, 200, 150);
```

A rectangle is drawn starting from the top left point with the provided `width` and `height` dimensions.

### Ellipse Element

{{<example "EllipseExample">}}

```js
let ellipse = artboard.ellipse(150, 150, 100, 75);
```

An ellipse is drawn from the center point `(cx, cy)` with a horizontal radius `rx` and a vertical radius `ry`.

### Line Element

{{<example "LineExample">}}

```js
let line = artboard.line(50, 200, 250, 100);
```

A line is drawn between a starting point `(x1, y1)` and an end point `(x2, y2)`.

### Path Element

{{<example "PathExample">}}

```js
let path = artboard.path('M 50 100 Q 150 250 250 100');
```

The path element corresponds directly with the SVG Path and draws a complex line given a series of commands. A command is defined a letter followed by zero or more points.

### Text Element

{{<example "TextExample">}}

```js
let text = artboard.text(100, 100, "Fly you fools");
```

The text element is used to draw text at the position `(x,y)`. It is recommended to use [web safe fonts](https://www.cssfontstack.com/), otherwise some weird loading can occur.

### TSpan Element

{{<example "TextSpanExample">}}

```js
let text = this.text(100, 100); 
text.tspan('fly ')
text.tspan('you ').style.fontWeight = '700';
text.tspan('fools');
text.style.fontSize = '50px';
text.style.fontFamily = 'monospace';
```

A  t-span element, short for text span, allows for text to to be styled or colored differently than the adjacent text. In the example above, the word "you" is bolded.

### Group Element

The group element is a structural element for grouping other elements together. This is useful for applying styles, transformations, and other such things to multiple elements at once. The group element, like an artboard, contains methods for creating other elements.

{{<example "GroupExample">}}

```js
let group = artboard.group();

group.circle( 50, 50, 15);
group.circle(150, 50, 15);
// draw rest of circles...

group.style.fill = '#4bb77e'; // green
```

In the example above, all of the circle are colored the same by applying a style to the group.

## Styling

The visual appearance of elements are styled using CSS. Styles can either be defined **inline** through the `style` property or in a user defined style sheet. For example, to the rectangle below is given a `blue` fill and a `red` stroke through the style property.

```js
let rectangle = artboard.rect( 50, 50, 100, 50);
rectangle.style.fill = 'blue';
rectangle.style.stroke = 'red';
rectangle.style.strokeWidth = '1px';
```

Note, because of the tree-like structure of the internal SVG document structural elements like groups are very useful for styling multiple elements at once. Alternatively, style selectors defined in a user defined style sheet will also get the job done.

## Interaction

User interaction is defined by **events**, **input elements** and **reactive programming**. Events are registered to elements created in the "main" area of the interactive. Input elements allow the user to change the state of the interactive. Reactive programming allows different elements to be related together in a "spreadsheet-like" style of programming.

{{<example "AngleExample" >}}

The user's interaction with the graphic can be pretty involved as shown above. There are six "input" elements that influence the state of what is being displayed. Three control points, a button, a checkbox and a slider. Alternatively, the user's interaction with the graphic can be simple as is demonstrated in the "player" layout shown below.

{{<example "StandardAngleExample" >}}

### Input Elements

User input drives the animations of these graphics and is the main focus of this library. These input elements are part of the SVG ecosystem and provide the end users with ways to manipulate and interact with the visual in front of them.

#### Control Point

A control point is a two dimensional point that can be clicked and dragged by the user.

{{<example "ControlPointExample" >}}

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

