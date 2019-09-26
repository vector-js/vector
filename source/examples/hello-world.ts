/**
* @title Vector.js Hello World
* @description Hi!
* @tags []
*/

import Interactive from '../index.js';
let myInteractive = new Interactive('hello-world');
myInteractive.border = true;
myInteractive.control(100,100);

let slider = myInteractive.slider(100, 100, 100);
