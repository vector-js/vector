import * as data from "../maps-json.js";
import OurElement from '../elements/element.js';
import SVG from "../svg.js";
/**
* Map class for displaying geographic maps of the world and its different parts.
*/
export default class GeoMap extends OurElement {
    /*
    * interactive: the object that called map()
    * mapName: the name of the map you wish to render
    * width: width of the map
    * height: height of the map
    */
    constructor(interactive, mapName, width, height, externalData) {
        super(SVG.Group());
        this.mapName = mapName;
        this.interactive = interactive;
        this.interactive.width = width;
        this.interactive.height = height;
        this.externalJSON = externalData;
        if (externalData != null) {
            this.loadExternalJson();
        }
        else {
            if (mapName.toLowerCase() == 'world' || mapName.toLowerCase() == 'globe')
                this.generatePaths();
            else if (mapName.toLowerCase() == 'united-states-detail')
                this.generateStates();
            else
                this.findPathForString(mapName);
        }
        let bbox = this.interactive.background.getBBox();
        this.interactive.root.setAttribute('transform', 'scale(1,-1)');
        this.interactive.setViewBox(bbox.x, bbox.y, bbox.width, bbox.height);
    }
    clearPaths() {
        let mapDiv = document.getElementById(this.interactive.container.id);
        let t = mapDiv.getElementsByClassName('country');
        let stop = t.length;
        let i = 0;
        for (i = 0; i < stop; i = (i + 1) % t.length) {
            mapDiv.children[0].children[0].removeChild(t[i]);
        }
    }
    /*
    * Get the json for the selected map name
    */
    getJson(mapName) {
        switch (mapName) {
            case "united-states-detail":
                return data.usData;
            case "globe":
                return data.globalData;
            default:
                return data.globalData;
        }
        ;
    }
    getCountryElements() {
        let myDiv = document.getElementById(this.interactive.container.id);
        return Array.from(myDiv.getElementsByClassName('country'));
    }
    generateStates() {
        let json = data.usData;
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
                    path.root.setAttribute("density", json.features[c].properties.density.toString());
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
                    path.root.setAttribute("density", json.features[c].properties.density.toString());
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
    /*
    * Process the geo json and create all paths
    */
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
    loadExternalJson() {
        // var json = this.externalJSON;
        // var k = 0;
        // var c = 0;
        // var i = 1;
        // for(let c = 0; c < json.features.length; c++){
        //   for(let k = 0; k < json.features[c].geometry.coordinates.length; k++){
        //     if(json.features[c].geometry.coordinates[k].length == 1) {
        //       let path = this.interactive.path('M 0 0');
        //       path.root.classList.add('country');
        //       path.root.classList.remove("default");
        //       path.root.setAttribute("name",json.features[c].properties.name)
        //       path.style.stroke = '#333333';
        //       path.style.fill = 'ffffff';
        //       path.style.strokeWidth = '.1px';
        //       let startX = json.features[c].geometry.coordinates[k][0][0][0];
        //       let startY = json.features[c].geometry.coordinates[k][0][0][1];
        //       // draw the path of the country
        //       path.d = `M ${startX} ${startY}  `;
        //       for(i = 1; i < json.features[c].geometry.coordinates[k][0].length; i++){
        //         let x = json.features[c].geometry.coordinates[k][0][i][0];
        //         let y = json.features[c].geometry.coordinates[k][0][i][1];
        //         path.d += `L ${x} ${y} `;
        //       }
        //     }
        //     else{
        //       let path = this.interactive.path('M 0 0');
        //       path.root.classList.add('country');
        //       path.root.classList.remove("default");
        //       path.root.setAttribute("name",json.features[c].properties.name)
        //       path.style.stroke = '#333333';
        //       path.style.fill = 'ffffff';
        //       path.style.strokeWidth = '.1px';
        //       let startX = json.features[c].geometry.coordinates[k][0][0];
        //       let startY = json.features[c].geometry.coordinates[k][0][1];
        //       path.d = `M ${startX} ${startY} `;
        //       for(i = 1; i < json.features[c].geometry.coordinates[k].length; i++){
        //         let x = json.features[c].geometry.coordinates[k][i][0];
        //         let y = json.features[c].geometry.coordinates[k][i][1];
        //         path.d += `L ${x} ${y} `;
        //       }
        //     }
        //   }
        // }
    }
    findPathForString(name) {
        var listOfNames = listOfNames = name.split(',');
        var json = data.globalData;
        var k = 0;
        var c = 0;
        var i = 1;
        for (let c = 0; c < json.features.length; c++) {
            for (let k = 0; k < json.features[c].geometry.coordinates.length; k++) {
                if (!listOfNames.includes(json.features[c].properties.name.toLowerCase())) {
                    continue;
                }
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
    /**
    * The default behavior is to update its dependents on change.
    */
    onchange() {
        this.updateDependents();
    }
}
//# sourceMappingURL=map.js.map