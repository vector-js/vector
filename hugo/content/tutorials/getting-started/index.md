---
title: Getting Started
description: Basic usage and documentation for the interactive svg library. Explains how to build a simple interactive and embed it in the browser.
image: /images/getting-started-tutorial.svg
date: "2019-02-05T12:03:45-07:00"
weight: 1
---

<p class="vertical-center">
  <iframe src="https://player.vimeo.com/video/360629850" width="768" height="516" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
</p>

Hi and welcome to vector js. In this tutorial we are going to create a simple interactive using the vector.js library. First, navigate the the website vectorjs.org and download the <a href="/getting-started.tgz" download>getting-started.tgz</a> tar ball. Open the tar ball file to get a directory containing an index.html file and script.js file.

<div class="filename">index.html</div>

{{< highlight html>}}
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Getting Started</title>
    <link rel="stylesheet" href="https://vectorjs.org/library.css">
  </head>
  <body>
    <div id="my-interactive"></div>
    <script type="module" src="script.js"></script>
  </body>
</html>
{{< /highlight >}}

<div class="filename">script.js</div>

{{< highlight javascript>}}
import Interactive from "https://vectorjs.org/Interactive.js";

// Construct an interactive within the HTML element with the id "my-interactive"
let myInteractive = new Interactive("my-interactive");
myInteractive.border = true;

// Construct a control point at the the location (100, 100)
let control = myInteractive.control(100, 100);

// Print the two objects to the console
console.log( control, myInteractive);
{{< /highlight >}}

The HTML file links the library's style sheet, has an element with an unique id, and includes the script file. To view the interactive serve this HTML file with a local server using Web Server for Chrome. Select the getting-started directory. The result is a simple interactive with a draggable control point.

## Onward

To learn more follow other tutorials, browse and fork examples, or read the documentation.

- [Tutorials](/tutorials/)
- [Examples](/examples/)
