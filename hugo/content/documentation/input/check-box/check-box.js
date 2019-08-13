// import Interactive from 'https://unpkg.com/@interactive-svg/library/dist/Interactive.js';
import Interactive from '/dist/Interactive.js';

// Initialize the interactive
let id = 'check-box';
let interactive = new Interactive(id);
interactive.window = true;
interactive.originX = interactive.width/2;
interactive.originY = interactive.height/2;

// Create a check box
let button = interactive.checkBox( 0, 0, "My Checkbox");
button.root.setAttribute('transform', "scale(2,2) translate(-50, 0)");
