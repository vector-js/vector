---
draft: true
---


## Interaction

There are two forms of handling interaction within our software system. The first form is reactive programming. Elements can be related together using dependency functions, similar to how cells are related together in a spreadsheet application. These dependencies are explicit and give dependents access to the data of the elements they rely on. These dependencies also define how the interactive should update elements and in what order the update should happen when an element's state is changed.

The second, more tradditional, form of handling interaction is event driven programming. Event handler properties are surfaced in elements where it seemed useful. Otherwise, access to all of the event handlers is available throught the root SVGElement and the native web APIs.

### Reactive Programming

All elements contain the ability to define dependencies to other elements. An element declares what it is dependent on using the "addDependency" function and then defines an update function which describes how the element should update itself. Circular dependencies will cause an exception. By convention, an element should only use the data of the elements it has declared itself dependent on.

<!-- TODO: hopefully in the future this will be strictly enforced,  -->

{{< highlight javascript>}}
let control1 = interactive.control( 100, 100);
let control2 = interactive.control( 200, 200);
control2.addDependency(control1);
control2.update = function(){
  this.x += control1.dx;
};
{{< /highlight >}}

{{<example "dependency-function">}}

An example of how this approach can be used to generate complicated interactives is given by the Riemann Sum example below. In this example, there are a fair number more elements that have been related together using the reactive approach.

{{<example "riemann-sum">}}

To visualize what is happening, the elements that are related together are highlighted and labeled in blue. Then the dependency graph on the right shows the user defined depencies represented as arrows. For example, the dependency between the control point the control point “control1” (B) and the text “label” (E), is represented as B → E in the graph.

<div class="flex-row container">
  <img src="/images/riemann-sum-highlighted.svg" alt="Rieman Sum Highlighted" width="50%">
  <img src="/images/riemann-sum-dependency-graph.svg" alt="Rieman Sum Dependency Graph" width="50%">
</div>

### Event Handling

#### Keyboard Input

Key board input can be used to change the state of an interactive as well as control different elements within the interactive. The example below highlights the numbers one through five with the corresponding key on the keyboard when pressed.

<!-- TODO: make an interactive of the whole keyboard -->

{{< highlight javascript>}}
window.onkeydown = function( event ) {
  ...
}
{{< /highlight >}}

{{<example "keyboard">}}

#### Mouse Input

Mouse input can be used to change the state of an interactive. Mouse input consists of the mouse's position, when the users clicks the interactive, etc.

<!-- TODO: add mouse into the depedency eco-system? -->
<!-- TODO: show velocity vector of mouse? -->
<!-- TODO: count mouse leave, mouse enter? -->

{{< highlight javascript>}}
// register a mouse click handler
interactive.root.onmouseclick = (event) => {
  // ...
}

// register a mouse move handlers
interactive.root.onmousemove = (event) => {
  // ...
}
{{< /highlight >}}

{{<example "mouse-interaction">}}
