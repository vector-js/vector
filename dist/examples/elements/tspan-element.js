/**
* @title Text Span Element
* @description This interactive demonstrates the text span element.
* @tags [elements]
*/
import Interactive from '../../interactive.js';
import { getScriptName } from '../../util.js';
let interactive = new Interactive(getScriptName());
interactive.width = 768;
interactive.height = 150;
interactive.style.border = "1px solid grey";
// Pose the question
interactive.text(50, 55, "Would you like more coffee?");
// Generic Answer
let responseString = 'Coffee, you think I want more coffee? Boy do I need more coffee.';
// Randomly choose a word in the response string to emphasize
let responseArray = responseString.split(' ');
let index = Math.floor(Math.random() * responseArray.length);
let start = responseArray.slice(0, index).join(' ');
let emphasize = responseArray.slice(index, index + 1).join(' ');
let end = responseArray.slice(index + 1, responseArray.length).join(' ');
// Add the response as three tspan elements within the text element
let response = interactive.text(50, 105);
response.tspan(start);
response.tspan(` ${emphasize} `).style.fontWeight = '600';
response.tspan(end);
//# sourceMappingURL=tspan-element.js.map