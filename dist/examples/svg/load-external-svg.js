/**
* @title Load External SVG
* @description This interactive demonstrates how to load and use an external svg.
* @tags [svg]
*/
import { Interactive, getScriptName } from '../../index.js';
import { getURL } from '../../util/file.js';
import { parseSVG } from '../../util/svg.js';
let map = getURL('/maps/united-states.svg');
let data = getURL('/maps/us-population-data.json');
Promise.all([map, data]).then(function (response) {
    let myInteractive = new Interactive(getScriptName());
    let svg = myInteractive.background.root.appendChild(parseSVG(response[0]));
    let bbox = svg.getBBox();
    myInteractive.setViewBox(bbox.x, bbox.y, bbox.width, bbox.height);
    let json = JSON.parse(response[1]);
    for (let i = 0; i < json.data.length; i++) {
        console.log(json.data[i]);
        // console.log(svg.querySelector())
    }
}).catch(function (error) {
    throw error;
});
//# sourceMappingURL=load-external-svg.js.map