---
title: Getting Started
description: Basic usage and documentation for the interactive svg library. Explains how to build a simple interactive and embed it in the browser.
weight: 1
icon: /getting-started.svg
---

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
import Interactive from '{{< baseURL >}}Interactive.js';
let interactive = new Interactive("my-interactive");
interactive.border = true;
let control = interactive.control( 100, 100);
{{< /highlight >}}

Serve the HTML page from a local folder over the network. <a href="https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?hl=en" target="_blank" rel="noopener">Web Server for Chrome</a> is a handy tool for doing this. The result is the following interactive: a blank SVG image with the default dimensions of 600 by 300 pixels. TODO: Download starter pack or watch the getting started tutorial.

<img src="/images/getting-started.svg" alt="" >
