---
title: Getting Started
description: Basic usage and documentation for the interactive svg library. Explains how to build a simple interactive and embed it in the browser.
image: /images/getting-started-tutorial.svg
video:
  src: https://player.vimeo.com/video/360629850
  width: 768
  height: 516
date: "2019-02-05T12:03:45-07:00"
layout: video
weight: 1
---

Welcome! To use this library, download the <a href="/getting-started.tgz" download>getting-started.tgz</a> tar ball and follow the instructions below. The tar ball contains a folder with an index.html file and script.js file. The HTML file links the library's style sheet, has an element with an unique id, and includes the script file.

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

The script file imports the Interactive class from the website, constructs an interactive within the HTML element with the id "my-interactive", and then constructs a control point which can be dragged around. It also prints out the control and interactive to the console to play around with.

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

To view the interactive, serve the folder containing the two files using a local server like <a href="https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?hl=en" target="_blank" rel="noopener">Web Server for Chrome</a> or your tool of choice. The result is a simple interactive with a draggable control point:

<img src="/images/getting-started.svg" alt="">
