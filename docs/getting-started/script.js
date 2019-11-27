import {Interactive} from "https://vectorjs.org/index.js";

// Construct an interactive within the HTML element with the id "my-interactive"
let myInteractive = new Interactive("my-interactive");
myInteractive.border = true;

// Construct a control point at the the location (100, 100)
let control = myInteractive.control(100, 100);

// Print the two objects to the console
console.log( control, myInteractive);
