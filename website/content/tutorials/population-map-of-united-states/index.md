---
title: Population Map
description: How to create a map of the United States and color states by their populations with respect to the total population of the United States. Introduces users to basics of working with maps, styling of shapes, and user events in our library.
image: "/images/population-of-united-states.svg"
weight: 3
---

<div id="population-of-united-states"></div><script type="module" src="../../../../examples/maps/population-of-united-states.js"></script>

In this tutorial we will create the interactive map of the United States shown above. Each state is colored by its population density (population density is a ratio of total population to size of an area). You can also hover over states with your mouse, to see the state name and it's population density.

The first step in using our mapping module is always to pull in your GeoJson data. For more information on this step, see our API or the Map Module tutorial. We also want to import our Interactive object, as well as the data that contains the states population density.

{{< highlight javascript>}}
import * as data from './maps-json.js';
import {Interactive, getScriptName} from '../../index.js';
import {usDensityMap as densityMap} from './map-element-two-data.js';
{{< /highlight >}}

Now that we have the imports out of the way, we can start coding. Just like in other modules, we need to create an Interactive object that has the ID of the HTML element you want it to live in. And for this example we are doing a map of the united states, so we pass that GeoJson to the Map constructor. At this time we can also make our hover box. The interesting part here is the setBounds method, which makes sure the hover box doesnt go off the screen.

{{< highlight javascript>}}
let interactive = new Interactive(getScriptName());
interactive.root.style.border = "1px solid grey";

let map = interactive.map(data.usData);
let hover = interactive.hoverBox("");
hover.setBounds(interactive.width,interactive.height);
{{< /highlight >}}

Thats all of the variables we need! Now we just have to color the states and implement the event handling of the mouse. 

Lets focus on coloring the states first. Using the getAllFeaturePaths method, we can loop through the states and color them based off of the density map we imported at the top. The getColor method can be changed to whatever colors you like!

{{< highlight javascript>}}
let states = map.getAllFeaturePaths();

states.forEach(element => {   
    element.setAttribute("style",`stroke:black;stroke-width:0.15px;fill:${getColor(densityMap[element.root.getAttribute("name")])};`);
});

function getColor(d) {
	return d > 1000 ? '#0022ff' :
	       d > 500  ? '#1971ff' :
	       d > 200  ? '#458cff' :
	       d > 100  ? '#6ea5ff' :
	       d > 50   ? '#87b5ff' :
	       d > 20   ? '#a1c5ff' :
           d > 10   ? '#a1c5ff' :
           d < 5    ? '#ffffff' :
	                  '#e6efff';
}
{{< /highlight >}}

Now all we have to do is handle the mouse events. Were already looping through all of the states to assign them colors, so lets use that same loop to assign them each event listeners. Here are the things I want the interactive to do: Show the name of the state in the hover box when the mouse enters a state; Make the hover box go away when its not over a state; Update the position of the hover box while its moving within a state. Those 3 interactions can be handled by the mouseenter, mouseleave, and mousemove events. This means that each state will get an event listener for each of those 3 events.

Mouse Move: When the user is moving the mouse within a state, we want the hover box to move with the cursor. To achieve this we have to get the x and y position of the mouse, and just call update position on the hover box. The only tricky part is we have to to take the mouse movements relative to the box it is in. So we take the events x and y, and subtract them from the bounding box of our interactive.

Mouse Enter: We want to highlight the currently hovered over state, so we change its fill. Then we have to update the text of the hover box, so we call set text on the hover box. Lastly we have to show the hover box so we call showHoverBox.

Mouse Leave: Mouse leave should undo everything mouse enter did. That means resetting the fill based on the density map, and hiding the hover box.

{{< highlight javascript>}}
states.forEach(element => {   
    element.setAttribute("style",`stroke:black;stroke-width:0.15px;fill:${getColor(densityMap[element.root.getAttribute("name")])};`);

    element.root.addEventListener('mousemove', e => {
        let x = e.clientX - interactive.root.getBoundingClientRect().left;
        let y = e.clientY - interactive.root.getBoundingClientRect().top;
        hover.updatePosition(x,y);
      });
    element.root.addEventListener("mouseenter", function(){
        element.setAttribute("style",`stroke:black;stroke-width:0.35px;fill:#ff8e61;`);
        hover.setText(element.root.getAttribute('name')+': '+densityMap[element.root.getAttribute("name")]);
        hover.showHoverBox();
    });
    element.root.addEventListener("mouseleave", function(){
        element.setAttribute("style",`stroke:black;stroke-width:0.15px;fill:${getColor(densityMap[element.root.getAttribute("name")])};`);
        hover.hideHoverBox();
    });
});
{{< /highlight >}}

Thats it! This hopefully shows you how to connect different pieces of our library and bring them together in one cohesive interactive. If you are confused about any of the elements, please refer to our API or our tutorials page for more help.