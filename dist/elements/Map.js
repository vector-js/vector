import { usData } from "../mapsJson.js";
import Element from '../elements/Element.js';
/**
*
*/
export default class Map extends Element {
    constructor(test, mapName, width, height) {
        super();
        this.mapName = mapName;
        this.interactive = test;
        this.interactive.width = width;
        this.interactive.height = height;
        this.generatePaths();
        let bbox = this.interactive.background.getBBox();
        this.interactive.root.setAttribute('transform', 'scale(1,-1)');
        this.interactive.setViewBox(bbox.x, bbox.y, bbox.width, bbox.height);
    }
    getJson(mapName) {
        if (mapName == 'united-states') {
            return usData;
        }
        return usData;
    }
    generatePaths() {
        let json = this.getJson(this.mapName);
        var k = 0;
        var c = 0;
        var i = 1;
        for (let c = 0; c < json.features.length; c++) {
            for (let k = 0; k < json.features[c].geometry.coordinates.length; k++) {
                if (json.features[c].geometry.coordinates[k].length == 1) {
                    let path = this.interactive.path('M 0 0');
                    path.root.classList.add('country');
                    path.root.classList.remove("default");
                    path.root.setAttribute("name", json.features[c].properties.name);
                    path.style.stroke = '#333333';
                    path.style.fill = 'ffffff';
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
                    let path = this.interactive.path('M 0 0');
                    path.root.classList.add('country');
                    path.root.classList.remove("default");
                    path.root.setAttribute("name", json.features[c].properties.name);
                    path.style.stroke = '#333333';
                    path.style.fill = 'ffffff';
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
    }
}
//# sourceMappingURL=Map.js.map