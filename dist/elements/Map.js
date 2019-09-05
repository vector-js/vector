//let rawdata = fs.readFileSync('us-states.json');
//let rawdata = fs.readFileSync('lowresworld.json');
import { usData as json } from "../mapsJson";
import Interactive from '../Interactive.js';
var k = 0;
var c = 0;
var i = 1;
let interactive = new Interactive('map-element');
interactive.width = 1000;
interactive.height = 1000;
console.log(`plotting ${json.features.length} countries`);
for (let c = 0; c < json.features.length; c++) {
    for (let k = 0; k < json.features[c].geometry.coordinates.length; k++) {
        if (json.features[c].geometry.coordinates[k].length == 1) {
            let path = interactive.path('M 0 0');
            path.root.classList.add('country');
            path.style.stroke = '#333333';
            path.style.strokeWidth = '.1px';
            let startX = json.features[c].geometry.coordinates[k][0][0][0];
            let startY = json.features[c].geometry.coordinates[k][0][0][1];
            // draw the path of the country
            path.d = `M ${startX} ${startY}  `;
            for (i = 1; i < json.features[c].geometry.coordinates[k][0].length; i++) {
                let x = json.features[c].geometry.coordinates[k][0][i][0];
                let y = json.features[c].geometry.coordinates[k][0][i][1];
                path.d += `L ${x} ${y} `;
            }
        }
        else {
            let path = interactive.path('M 0 0');
            path.root.classList.add('country');
            path.style.stroke = '#333333';
            path.style.strokeWidth = '.1px';
            let startX = json.features[c].geometry.coordinates[k][0][0];
            let startY = json.features[c].geometry.coordinates[k][0][1];
            path.d = `M ${startX} ${startY} `;
            for (i = 1; i < json.features[c].geometry.coordinates[k].length; i++) {
                let x = json.features[c].geometry.coordinates[k][i][0];
                let y = json.features[c].geometry.coordinates[k][i][1];
                path.d += `L ${x} ${y} `;
            }
        }
    }
}
let bbox = interactive.background.getBBox();
interactive.root.setAttribute('transform', 'scale(1,-1)');
interactive.setViewBox(bbox.x, bbox.y, bbox.width, bbox.height);
//# sourceMappingURL=Map.js.map