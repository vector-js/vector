/**
* @title Population of the United States
* @description Every state of the United States colored by population density.
* @input Input the name of the map you want to see, and the size of the map.
* @tags [maps]
* @weight 1
*/
import { Interactive, getScriptName } from '../../index.js';
import * as data from '../../../maps/maps-json.js';
let densityMap = { "Alabama": 94.65, "Alaska": 1.264, "Arizona": 57.05, "Arkansas": 56.43, "California": 241.7, "Colorado": 49.33, "Connecticut": 739.1, "Delaware": 464.3, "District of Columbia": 10065, "Florida": 353.4, "Georgia": 169.5, "Hawaii": 214.1, "Idaho": 19.15, "Illinois": 231.5, "Indiana": 181.7, "Iowa": 54.81, "Kansas": 35.09, "Kentucky": 110, "Louisiana": 105, "Maine": 43.04, "Maryland": 596.3, "Massachusetts": 840.2, "Michigan": 173.9, "Minnesota": 67.14, "Mississippi": 63.5, "Missouri": 87.26, "Montana": 6.858, "Nebraska": 23.97, "Nevada": 24.8, "New Hampshire": 147, "New Jersey": 1189, "New Mexico": 17.16, "New York": 412.3, "North Carolina": 198.2, "North Dakota": 9.916, "Ohio": 281.9, "Oklahoma": 55.22, "Oregon": 40.33, "Pennsylvania": 284.3, "Rhode Island": 1006, "South Carolina": 155.4, "South Dakota": 98.07, "Tennessee": 88.08, "Texas": 98.07, "Utah": 34.3, "Vermont": 67.73, "Virginia": 204.5, "Washington": 102.6, "West Virginia": 77.06, "Wisconsin": 105.2, "Wyoming": 5.851, "Puerto Rico": 1082, };
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
//# sourceMappingURL=population-of-united-states.js.map