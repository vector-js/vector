---
title: SVG Tutorial
image: /images/svg-tutorial.svg
description: An interactive SVG tutorial introducing the basics of creating and manipulating SVG documents.
layout: aside
type: tutorials
aside:
 - Getting Started
 - XML Syntax
 - Tree Structure
 - Basic Elements
 - Path Element
 - Coordinate System
 - Styling
 - Typography
 - Advanced Elements
 - Scripting
weight: 2
---

This tutorial is intended to give the reader an interactive introduction to using and authoring SVG documents. See the working group's <a href="https://www.w3.org/TR/SVG/Overview.html" target="_blank" rel="noreferrer">W3 SVG Overview</a> for the specification. Another good tutorial and reference is the <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial" target="_blank" rel="noreferrer">MDN SVG Tutorial</a>. See also the list of [SVG Elements]({{< relref "./elements/" >}}).

## Getting Started

SVG stands for scalable vector graphic and represents a standard for vector/raster graphics. Elements within the SVG document are defined using XML syntax. Every element has an opening tag and closing tag. The opening tag contains the elements name surrounded by angle brackets. The closing tag contains the elements name with a forward slash before it also surrounded by angle brackets. For example, the "svg" tag which forms the root of the document looks like:

{{< highlight svg >}}
<svg></svg>
{{< /highlight >}}

Elements have attributes that describe additional details about the element. Attributes are defined within the opening tag and have a name and string value. For example, if we have a attribute named data which is associated with the string "123" this would look like: `data="123"`. The svg element should have a xmlns atrribute which defines the xml name space to be used, and often has a width and height attribute defined. This can be seen in the SVG image below which also defined a circle element with the attributes cx, cy, and r.

{{< highlight svg >}}
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100">
    <circle cx="50" cy="50" r="15"></circle>
</svg>
{{< /highlight >}}

The SVG document above is rendered as:

<div style="border: 1px solid grey; border-radius: 5px;">
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100">

  <circle cx="50" cy="50" r="15" style="fill:#333333;"></circle>
</svg>
</div>

## XML Syntax

XML elements are formed by opening and closing tags. The opening tag contains a name followed by space separated attributes. Attributes define additional information about the element and are in the form of name="value".

<img src="/images/xml-structure.svg" alt="XML syntax and structure" class="center" width="700px" style="max-width:100%;">

Within the SVG Namespace elements have geometric properties that are represented using attributes to describe the shape and form of the element. Elements often have attributes that are specific to the element, but there are also more general attributes that are useful and which can be applied to any element. For example, the following three attributes are very useful for retrieving and/or styling elements.

| attribute | description |
| --- | --- |
| id | unique string identifier |
| class | list of classes separated by spaces |
| style | inline styling for this element |

 <!-- An unique identifier is useful for retrieving a specic elements and applying styles from an external stylesheet to a specific element. The class attribute allows one to apply styles from an external style sheet to all elements that share a class, and the style attribute allows one to apply inline style to an element. -->

## Tree Structure

A SVG document is structured like a tree. Every SVG element has an opening and closing tag. Within the tags is where child elements are placed. These children inherit the coordinate system and styles of the parent element. (TODO: double check these facts)

{{< highlight svg>}}
<svg>
  <rect></rect>
  <circle></circle>
</svg>
{{< /highlight >}}

In the example above, the SVG element has two children: a rectangle and circle. The ordering of the elements matters. In this example the circle is rendered on top of the rectangle, because the circle is placed after the rectangle within the SVG document.

<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="150">
  <rect x=150 y=25 width=150 height=100 style="fill:#cda9d4; stroke:#333333; stroke-width:1px;"></rect>
  <circle cx=150 cy=75 r=60 style="fill:lightblue; stroke:#333333; stroke-width:1px;"></circle>
</svg>

## Basic Elements

The basic visual elements such as the line, ellipse, rectangle, etc and structural elements such as the svg element and group element form the look and feel of the final image.

### Line Element

{{<render "content" "svg/elements/line">}}

### Ellipse Element

{{<render "content" "svg/elements/ellipse">}}

### Rectangle Element

{{<render "content" "svg/elements/rectangle">}}

## Group Element

A group is a structural element, useful for applying styles and transformations to multiple elements at once. This element and others are discussed in more detail later in this tutorial.

## Path Element

{{<render "content" "svg/elements/path">}}

## Coordinate System

The origin of the svg coordinate system is at the top-left corner of the image. The positive x-direction is to the right and the positive y-direction is down. In the world of computer graphics it is standard to have the y-axis flipped since elements are positioned relative to the top-left corner of the container. Try clicking and dragging the control point below.

{{<example "svg-coordinate-system">}}

### View Box

{{< highlight svg>}}
<svg viewBox="minX minY width height"></svg>
{{< /highlight >}}

The view box attribute allows the user to define a view port of the image. This means defining where the origin is and the relative dimensions: width and height to be displayed. For example, if we want to zoom in on the geometric shapes below we can apply a viewbox which is visualized with the rectangle on the left. The resulting svg is shown on the right.

{{<example "svg-view-box">}}

<p></p>

{{< highlight svg>}}
<svg viewBox="130 100 350 200">
  <!-- colorful squares ... -->
</svg>
{{< /highlight >}}

{{< highlight svg>}}
<!-- TODO: preserve aspect ratio attribute -->
{{< /highlight >}}


### Transforming

SVG elements have the ability to have a transformation attribute defined that can transform the element geometrically.

#### Scale

Elements can be scaled to larger or smaller sizes by adding a scale function to the transform attribute.

{{<example "svg-scale">}}

{{< highlight svg>}}
<g transform="scale(x,y)">
  <!-- elements to be scaled ... -->
</g>
{{< /highlight >}}

#### Rotate

Elements can be rotated.

{{<example "svg-rotate">}}

#### Translate

Elements can be moved to new locations.

{{<example "svg-translate">}}

#### Chaining Transformations

<!-- TODO: Put all three together to form basic drawing control -->

#### Other Transformations

- skewX
- skewY
- 3 by 3 matrix

## Styling

SVG elements are styled using Cascading Style Sheets or CSS for short. Styling can be applied to individual elements as inline style, defined in a \<style\> tag within the SVG document, or defined externally in a .css file. There are many different styles that can be applied to each element. Two of the most basic are the fill and stroke color.

<img src="/images/fill-stroke.svg" alt="Fill and Stroke Element" width="320px" style="display:block; margin:auto;">

### Inline Style

Styling can be applied to individual elements using the style attribute. This is very useful for testing out different styling on an element, but in practice it is better to use CSS selectors to style elements based on id, class, and tagname.

{{<highlight svg>}}
<svg xmlns="http://www.w3.org/2000/svg">
  <circle cx="150" cy="75" r="50" style="fill:purple;"></circle>
</svg>
{{</highlight>}}

<svg xmlns="http://www.w3.org/2000/svg" style="width:100%; height:150px;" class="border">
  <circle cx="150" cy="75" r="50" style="fill:purple;"></circle>
</svg>

### Style Element

CSS rules can be applied in the style element within the SVG document. A CSS rule applies styling to elements that match the selectors before the style enclosed in the curly braces. In the example below the selector "circle" will be applied to all circle elements within the SVG.

{{< highlight svg>}}
<svg xmlns="http://www.w3.org/2000/svg">
  <style>
  circle {
    stroke:purple;
    stroke-width:1px;
    fill:none;
  }
  </style>
  <circle cx="150" cy="75" r="50"></circle>
</svg>
{{< /highlight >}}

<svg xmlns="http://www.w3.org/2000/svg" style="width:100%; height:150px;" class="border">
  <style>
  circle.style-element {
    stroke:purple;
    stroke-width:1px;
    fill:none;
  }
  </style>
  <circle cx="150" cy="75" r="50" class="style-element"></circle>
</svg>

### Effects

Styling can be applied to a specific element state such as ":active", ":focus", ":hover". For example when the user hover's over the circle below additional styling is applied to make the fill of the circle darker.

<svg xmlns="http://www.w3.org/2000/svg" style="width:100%; height:150px;" class="border">
  <style>
  #my-circle{
    fill:#f8f8f8;
    stroke:#333333;
  }
  #my-circle:hover{
    fill:cornflowerblue;
  }
  </style>
  <circle cx="150" cy="75" r="50" id="my-circle"></circle>
</svg>

{{< highlight css>}}
#my-circle:hover{
  fill:cornflowerblue;
}
{{< /highlight >}}

## Typography

This section of the tutorial deals with creating and formatting text within SVG documents.

### Text Element

The text element defines text with an x, y position in the document.

<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="150" class="border">
  <style>
    text.sample {
      font-family:monospace;
      font-size:22px;
      alignment-baseline:middle;
      text-anchor:middle;
    }
    </style>
  <text x="352" y="75" class="sample">The quick brown fox jumps over the lazy dog.</text>
</svg>

{{< highlight svg>}}
<text x="75" y="75">The quick brown fox jumps over the lazy dog.</text>
{{< /highlight >}}

### Tspan Element

The text span element is useful for changing the position and or the styling of a piece of text within a text element. In the example below, the first word is placed within a tspan element and bolded to emphasize the word. Then, later, a tspan element is positioned relative to the last tspan element.

<svg xmlns="http://www.w3.org/2000/svg" style="width:100%; height:150px;" class="border">
  <style>
    #tspan-example {
      font-size:22px;
      alignment-baseline:middle;
      text-anchor:left;
    }
    </style>
    <text id="tspan-example" x="32" y="75" >
      <tspan>"</tspan>
      <tspan style="font-weight:600;">Fly </tspan>
      <tspan>you fools.</tspan>
      <tspan>"</tspan>
      <tspan dx=20 dy=30>Gandalf the Grey</tspan>
    <text>
</svg>

{{< highlight svg>}}
<text id="tspan-example" x="32" y="75" >
  <tspan>"</tspan>
  <tspan style="font-weight:600;">Fly </tspan>
  <tspan>you fools.</tspan>
  <tspan>"</tspan>
  <tspan dx=20 dy=30>Gandalf the Grey</tspan>
<text>
{{< /highlight >}}

### Horizontally Align Text

The "text-anchor" attribute allows you to horizontally align text relative to its position. This is demonstrated below in the SVG, the red dot represents each text elements position.

<img src="/images/horizontally-align-text.svg" class="border" alt="Horizontally align SVG text." width="100%">

{{< highlight css>}}
text-anchor:left;
text-anchor:middle;
text-anchor:right;
{{< /highlight >}}

### Vertically Align Text

The "alignment-baseline" attribute allows you to vertically align text relative to its position. This is demonstrated below in the SVG, the red dot represents each text elements position.

<img src="/images/vertically-align-text.svg" class="border" alt="Vertically align SVG text." width="100%">

{{< highlight css>}}
dominant-baseline:baseline;
dominant-baseline:middle;
dominant-baseline:hanging;
{{< /highlight >}}

### Superscript and Subscript

{{< highlight svg>}}
<!-- superscript & subscript text -->
{{< /highlight >}}

### Auto Wrapping

{{< highlight svg>}}
<!-- auto wrapping -->
{{< /highlight >}}

### Preformated Text / Line Breaks

{{< highlight svg>}}
<!-- pre-formated / line breaks -->
{{< /highlight >}}

{{< highlight javascript>}}
// how to convert typography to paths?
{{< /highlight >}}

## Advanced Elements

The SVG specification has a lot of elements, and while not all are covered in this tutorial, there are a couple of advanced elements worth mentioning.

### Clip Path

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

### Defs

The defs element contains a graphical "definition" that can be used else where in the document. This is useful for arrows at the start and end of a path, adding markers along a path, or creating a pattern of repeated images.

{{< highlight svg>}}
<!-- adding markers / arrows to a path -->
{{< /highlight >}}

{{< highlight svg>}}
<!-- adding gradient / pattern to a shape -->
{{< /highlight >}}

## Scripting

It is common to extend the functionality of SVG documents by adding scripting to make them interactive. This section demonstrates how to use vanilla Javascript and Web APIs to create, manipulate, and add interactivity to SVG elements.  There are many libraries and frameworks to help with this very thing. This library [vector.js](/) is one of them.

### Creating SVG Elements

To create a SVG element within a simple static web page using javascript: first, you create an element using the W3 namespace and add it into the document object model or DOM for short. This example demonstrates generating a SVG element and adding that to a container element in the HTML page. Then creating a circle element and adding that to the SVG element.

<div class="filename">create-element.js</div>

{{< highlight javascript >}}
// Get an element in the DOM to append the svg into
let container = document.getElementById("container");

// Creates a root svg element and appends it into HTML the container
let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
svg.setAttribute("width", "720px");
svg.setAttribute("height", "200px");
container.appendChild(svg);

// Creates a circle element and appends it into the svg element
let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
circle.setAttribute("cx", "100");
circle.setAttribute("cy", "100");
circle.setAttribute("r", "50");
svg.appendChild(circle);
{{< /highlight >}}

This script needs a corresponding HTML file to run. Note that there is a div element with the identifier "container" and a script element that loads in the script above.

<div class="filename">index.html</div>

{{< highlight html >}}
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Create Element</title>
  </head>
  <body>
    <div id="container"></div>
    <script src="./create-element.js"></script>
  </body>
</html>
{{< /highlight >}}

Placing these to files in a folder together and opening the HTML file in a web browser results in the following SVG.

<img src="/images/create-element.svg" width="704px" class="center" style="max-width:100%;" alt="Create SVG Element Javascript">

### Selecting Elements

{{< highlight javascript>}}
// select element by id
let element = document.getElementById("my-element-id");
{{< /highlight >}}

{{< highlight javascript>}}
// select elements by tag
let elementList = document.getElementsByTagName("circle");
{{< /highlight >}}

{{< highlight javascript>}}
// select elements by class
let elementList = document.getElementsByClassName("my-class");
{{< /highlight >}}

### Manipulating Attributes

{{< highlight javascript>}}
element.setAttribute("some-attribute", "some-value");
element.getAttribute("some-attribute");
{{< /highlight >}}

{{< highlight javascript>}}
element.classList.add('my-class');
element.classList.remove('my-class');
{{< /highlight >}}

### Manipulating Style

{{< highlight javascript>}}
// access style property for inline styling
{{< /highlight >}}

### Useful Functions

{{< highlight javascript>}}
// get bounding client rectangle
// SVGGraphicsElement getBBox();
{{< /highlight >}}

### Basic Interactive

Interactivity allows for user input to change the SVG document. The most basic form of this is register handlers to user events. Handlers are registered to specific elements and are called when the event takes place. Examples of events are the mouse click event, mouse move event, mouse over element event, keyboard events, and more.

{{< highlight javascript>}}
// TODO: interactive that displays types of event handlers being called
// Maybe some basic shapes with colors
{{< /highlight >}}

#### Registering an Event Handler

{{< highlight javascript>}}
// register event listener
{{< /highlight >}}


### SVG Scripting Libraries

- Vector.js
- D3
- svgjs
