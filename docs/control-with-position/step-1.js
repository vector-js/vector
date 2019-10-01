import Interactive from '/interactive.js';

// Initialize the interactive
let interactive = new Interactive("step-1");
interactive.border = true;
interactive.root.style.width = '100%';

// Create a control point at the location (100, 100)
let control = interactive.control( 100, 100);

// Create a text element at the location (150,150);
let text = interactive.text(150, 150, "myText");
