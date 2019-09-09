/**
* @title Load External SVG
* @description This interactive demonstrates how to load and use an external svg.
*/
import Interactive from '../../Interactive.js';
import { getScriptName } from '../../Util.js';
let myInteractive = new Interactive(getScriptName());
let svg = myInteractive.loadSVG('./test.svg');
svg.then(function (data) {
    // data.setAttribute('blah', 'hello');
    console.log(data);
});
//# sourceMappingURL=load-svg.js.map