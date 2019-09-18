/**
* @title Map Element Two
* @description This interactive demonstrates the interactive world map element.
* @tags [elements, maps]
*/
import Interactive from '../../interactive.js';
import { getScriptName } from '../../util.js';
import { usDensityMap as densityMap } from './map-element-two-data.js';
let interactive = new Interactive(getScriptName());
interactive.root.style.border = "1px solid grey";
let map = interactive.map("united-states-detail", 768, 300);
let text = interactive.text(-270, -120, "");
text.style.transform = "scale(0.5,-0.5)";
let countries = map.getCountryElements();
countries.forEach(element => {
    element.setAttribute("style", `stroke:black;stroke-width:0.15px;fill:${getColor(densityMap[element.getAttribute("name")])};`);
    element.addEventListener("mouseenter", function () {
        element.setAttribute("style", `stroke:black;stroke-width:0.35px;fill:#03dffc;`);
        text.contents = element.getAttribute("name");
    });
    element.addEventListener("mouseleave", function () {
        text.contents = "";
        element.setAttribute("style", `stroke:black;stroke-width:0.15px;fill:${getColor(densityMap[element.getAttribute("name")])};`);
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