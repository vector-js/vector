/**
* @title Map Element Two
* @description This interactive demonstrates the interactive world map element.
* @tags [elements, maps]
*/
import { Interactive, getScriptName } from '../../index.js';
import * as data from '../../../resources/maps/maps-json.js';
import { usDensityMap as densityMap } from './map-element-two-data.js';
let interactive = new Interactive(getScriptName());
interactive.root.style.border = "1px solid grey";
let map = interactive.map(data.usData);
let text = interactive.text(430, 25, "");
let title = interactive.text(270, 25, "Population Density of ");
let states = map.getFeatureElements();
states.forEach(element => {
    let islands = map.getFeatureElements();
    element.setAttribute("style", `stroke:black;stroke-width:0.15px;fill:${getColor(densityMap[element.getAttribute("name")])};`);
    element.addEventListener("mouseenter", function () {
        islands.forEach(inner => {
            if (inner.getAttribute("name") == element.getAttribute("name")) {
                inner.setAttribute("style", `stroke:black;stroke-width:0.35px;fill:#03dffc;`);
            }
        });
        text.contents = element.getAttribute("name") + ': ' + densityMap[element.getAttribute("name")];
    });
    element.addEventListener("mouseleave", function () {
        islands.forEach(inner => {
            if (inner.getAttribute("name") == element.getAttribute("name")) {
                inner.setAttribute("style", `stroke:black;stroke-width:0.15px;fill:${getColor(densityMap[element.getAttribute("name")])};`);
            }
        });
        text.contents = "";
    });
});
function getColor(d) {
    return d > 1000 ? '#800026' :
        d > 500 ? '#BD0026' :
            d > 200 ? '#E31A1C' :
                d > 100 ? '#FC4E2A' :
                    d > 50 ? '#FD8D3C' :
                        d > 20 ? '#FEB24C' :
                            d > 10 ? '#FED976' :
                                '#FFEDA0';
}
//# sourceMappingURL=map-element-two.js.map