/**
* @title Load External SVG
* @description This interactive demonstrates how to load and use an external svg.
* @tags []
*/
import Interactive from '../../interactive.js';
import { getScriptName } from '../../util.js';
let myInteractive = new Interactive(getScriptName());
let svg = myInteractive.loadSVG('/images/united-states.svg');
svg.then(function (data) {
    let bbox = data.root.getBBox();
    myInteractive.setViewBox(bbox.x, bbox.y, bbox.width, bbox.height);
    console.log(data);
});
//# sourceMappingURL=load-external-svg.js.map