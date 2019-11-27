---
title: Map Module
description: The basics of how to use our Map module. This tutorial will detail the capabilites, limitations, and functionality of our Map module at a high level.
image: "/images/world-map.svg"
video:
  src: https://player.vimeo.com/video/373481993
  width: 768
  height: 516
layout: video
weight: 3
---

<div id="random-color-world"></div><script type="module" src="../../../../examples/maps/random-color-world.js"></script>

The Map Module is used to plot geographic data in SVG format. Our library supports <a href="https://geojson.org/" target="_blank" rel="noreferrer">GeoJson</a> which is the most popular data standard for representing geographical data. GeoJson can be downloaded from a variety of places off of the internet, or it could be retrieved with a javascript promise. In order to make our examples work on our website, we host a small amount of GeoJson at <a href="https://vectorjs.org/examples/maps/maps-json.js" target="_blank" rel="noreferrer">GeoJson for every country and United States</a>. Some helpful websites for editing and collecting GeoJson are: <a href="http://geojson.io/" target="_blank" rel="noreferrer">geojson.io</a>, <a href="https://geojson-maps.ash.ms/" target="_blank" rel="noreferrer">geojson-maps</a>.



Just like every other element in our library, to create a map you must first create an Interactive object (<a href="https://vectorjs.org/tutorials/getting-started/" target="_blank" rel="noreferrer">more information on this</a>).

{{< highlight javascript>}}
map(externalData: GeoJSON,featureName:string = null,options: MapOptions = {})
{{< /highlight >}}

Then you call the map method on that object, and pass in the GeoJson that you want plotted. The other two parameters are optional. The second paramter is featureName. If you only want to plot one specific feature from the data, then pass in that name and only that feature will be rendered. The last parameter is the options parameter. Here you can set some styling on all feature at the time the map is created. For more exact details see our API.

We recommend going to our examples page, and using the maps filter to see some examples of just exactly how our maps work.

We have a variety of helper methods that let you manipulate the paths, viewboxes, and elements of the Map. We do not currently support any form of 3D maps, or projections.
