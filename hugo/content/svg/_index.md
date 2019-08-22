---
title: SVG Reference
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

## Getting Started

This tutorial is intended to give the reader an interactive introduction to using and creating SVGs. It is by no mean comprehensive, see the <a href="https://www.w3.org/TR/SVG/Overview.html" target="_blank" rel="noreferrer">W3 SVG Overview</a> for a complete overview. Two other tutorials worth mentioning are:

<ul>
  <li>
    <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial" target="_blank" rel="noreferrer">MDN SVG Tutorial</a>
  </li>
  <li>
    <a href="https://www.w3schools.com/graphics/svg_intro.asp" target="_blank" rel="noreferrer">W3 SVG Tutorial</a>
  </li>
</ul>

SVG stands for scalable vector graphic and represents a standard for vector/raster graphics. Elements within the SVG document are defined using XML syntax. Every element has an opening tag and closing tag. The opening tag contains the elements name surrounded by angle brackets. The closing tag contains the elements name with a forward slash before it also surrounded by angle brackets. For example, the "svg" tag, which forms the root of the docuement, looks like:

{{< highlight svg >}}
<svg></svg>
{{< /highlight >}}

Often elements have attributes that describe additional details about the element. Attributes are defined in the opening tag in the form of attribute="...". The svg element should have a xmlns atrribute which defines the xml name space to be used, and often has a width and height attribute defined. This can be seen in the SVG image below which also defined a circle element with the attributes cx, cy, and r.

{{< highlight svg >}}
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100">
    <circle cx="50" cy="50" r="15"></circle>
</svg>
{{< /highlight >}}

The SVG document above is rendered as:

<div style="border: 1px solid grey; border-radius: 5px;">
<svg width="200" height="100">
    <circle cx="50" cy="50" r="15"></circle>
</svg>
</div>

### XML Syntax

XML elements are formed by opening and closing tags. The opening tag contains a name folled by space separated attributes. Attributes define additional information about the element and are in the form of name="value".

<img src="/images/xml-structure.svg" alt="XML syntax and structure" class="center" width="700px">

### Tree Structure

A SVG document has the structure of a tree.

## Basic Elements

In this section some basic visual elements are introduced: the line, ellipse, and rectangle element. See [SVG Elements]({{< relref "/svg/elements" >}}) for a non-comprehensive but useful nonetheless reference of more SVG elements.

{{<render "content" "svg/elements">}}

### Line Element

{{<render "content" "svg/elements/line">}}

### Ellipse Element

{{<render "content" "svg/elements/ellipse">}}

### Rectangle Element

{{<render "content" "svg/elements/rectangle">}}

### Path Element

{{<render "content" "svg/elements/path">}}

## Coordinate System

The origin of the svg coordinate system is at the top-left corner of the image. The positive x-direction is to the right and the positive y-direction is down. In the world of computer graphics it is standard to have the y-axis flipped since elements are positioned relative to the top-left corner of the container. Try clicking and dragging the control point below.

{{<example "svg-coordinate-system">}}

### View Box

<!-- TODO: preserve aspect ratio attribute -->

### Transforming

SVG elements have the ability to have a transformation attribute defined that can transform the element geometrically.

#### Scale

Elements can be scaled to larger or smaller sizes.

<img src='/images/transform-scale.svg' width='600px' style="border: 1px solid grey; border-radius: 6px; display:block; margin:auto;" alt="SVG Transform Scale">

#### Rotate

Elements can be rotated.

<img src='/images/transform-rotate.svg' width='600px' style="border: 1px solid grey; border-radius: 6px; display:block; margin:auto;" alt="SVG Transform Rotate">

#### Translate

Elements can be moved to new locations.

<img src='/images/transform-translate.svg' width='600px' style="border: 1px solid grey; border-radius: 6px; display:block; margin:auto;" alt="SVG Transform Translate">

- skewX
- skewY
- 3 by 3 matrix

## Styling

SVG elements are styled using Cascading Styel Sheets or CSS for short. The styling can be applied to individual elements as inline style, defined in a \<style\> tag within the SVG document, or defined in a .css file.

{{<highlight svg>}}
<circle cx="300" cy="150" r="50" style="..."></circle>
{{</highlight>}}

### Fill

Two basic styles are the fill and stroke of a shape or path. The fill controls the color of the interior and the stroke controls the color of the perimeter.

<form style="display:grid; grid-template-columns:auto auto; width:300px;">
<label for="fill">Fill</label>
<input id="fill" name="fill" type="color" value="#4287f5" style="width:100%">
<label for="stroke">Stroke</label>
<input id="stroke" name="stroke" type="color" value="#333333" style="width:100%">
<label for="stroke-width">Stroke Width</label>
<input id="stroke-width" name="stroke-width" type="number" value="1">
</form>

### Stroke

### Gradient

### Effects

onhover, etc

## Typography

{{< highlight svg>}}
<text></text>
{{< /highlight >}}

{{< highlight svg>}}
<tspan></tspan>
{{< /highlight >}}

{{< highlight svg>}}
<!-- aligning text -->
{{< /highlight >}}

{{< highlight svg>}}
<!-- superscript & subscript text -->
{{< /highlight >}}

{{< highlight javascript>}}
// how to convert typography to paths?
{{< /highlight >}}

## Scripting

It is common to extend the functionality of SVG documents by adding scripting to make them interactive. This section is going to use Javascript and WEB APIs as an example, but other languages work just as well. Also, at this point I would like to add a shameless plug for [vector.js](https://kurtbruns.github.io/vector/) - a library written specifically for creating interactive SVG documents.

### Creating SVG Elements

To create a SVG element using the vanilla web APIs you create an element using the w3 namespace and add it into the DOM (document object model). This example demonstrates generating a SVG root element, adding a circle element, and embeding them into a simple static web page.

<div class="filename">create-element.js</div>

{{< highlight javascript >}}
// Get an element in the DOM to append the svg into
let container = document.getElementById('container');

// Creates a root svg element and appends it into HTML the container
let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
svg.setAttribute('width', '720px');
svg.setAttribute('height', '200px');
container.appendChild(svg);

// Creates a circle element and appends it into the svg element
let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
circle.setAttribute('cx', '100');
circle.setAttribute('cy', '100');
circle.setAttribute('r', '50');
svg.appendChild(circle);
{{< /highlight >}}

<div class="filename">index.html</div>

{{< highlight html >}}

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Create Element</title>
  </head>
  <body>
    <div id='container'></div>
    <script src='./create-element.js'></script>
  </body>
</html>
{{< /highlight >}}

<img src="/images/create-element.svg" width="704px" style="margin:auto; display:block;">

### Manipulating SVG Elements

{{< highlight javascript>}}
// select element by id
let element = document.getElementById("my-element-id");
{{< /highlight >}}

{{< highlight javascript>}}
// select elements by tag
let list = document.getElementsByTagName("circle");
{{< /highlight >}}

{{< highlight javascript>}}
// select elements by class
let list = document.getElementsByClassName("my-class");
{{< /highlight >}}

{{< highlight javascript>}}
element.setAttribute("some-attribute", "some-value");
element.getAttribute("some-attribute");
{{< /highlight >}}

{{< highlight javascript>}}
// add / remove class
// access style property for inline styling
// get bounding client rectangle
{{< /highlight >}}

### Basic Interactive

{{< highlight javascript>}}
// register event listener
{{< /highlight >}}


### SVG Scripting Libraries

- Vector.js
- D3
- svgjs
