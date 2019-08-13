// import Interactive from 'https://unpkg.com/@interactive-svg/library/dist/Interactive.js';
import Interactive from '/dist/Interactive.js';

// Initialize the interactive
let id = 'check-box';
let interactive = new Interactive(id);
interactive.window = false;

// Create a button
let button = interactive.checkBox( 100, 100, "My Checkbox");
