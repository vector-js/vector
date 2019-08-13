---
title: Dependency Functions
---

All elements contain the ability to define dependencies to other elements. An element declares what it is dependent on using the function .addDependency and then (optionally?) defines an update function which describes how the element should update itself. Circular dependencies will cause an exception. By convention, although hopefully in the future this will be strictly enforced, only the element's data whom have been declared should be used within the update function.

{{< highlight javascript>}}
let control1 = interactive.control( 100, 100);
let control2 = interactive.control( 200, 200);
control2.addDependency(control1);
control2.update = function(){
  this.x += control1.dx;
};
{{< /highlight >}}

<div id="dependency-function"></div>

<script type="module" src="/examples/interaction/dependency-function.js">

</script>
