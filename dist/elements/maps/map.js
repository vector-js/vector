import Group from "../svg/group.js";
/**
* Map class for displaying geographic maps of the world and its different parts.
*/
export default class GeoMap extends Group {
    /*
    * interactive: the object that called map()
    * mapName: the name of the map you wish to render
    * width: width of the map
    * height: height of the map
    */
    constructor(interactive, featureName, width, height, externalData) {
        super();
        this.featureName = featureName;
        this.interactive = interactive;
        this.interactive.width = width;
        this.interactive.height = height;
        this.externalJSON = externalData;
        this.loadExternalJSON(this.featureName);
        let bbox = this.interactive.background.root.getBBox();
        this.interactive.root.setAttribute('transform', 'scale(1,-1)');
        this.interactive.setViewBox(bbox.x, bbox.y, bbox.width, bbox.height);
    }
    /**
     * Clears the interactive of all Map paths.
     */
    clearPaths() {
        let mapDiv = document.getElementById(this.interactive.container.id);
        let t = mapDiv.getElementsByClassName('feature');
        let stop = t.length;
        let i = 0;
        for (i = 0; i < stop; i = (i + 1) % t.length) {
            mapDiv.children[0].children[0].removeChild(t[i]);
        }
    }
    /**
     * Returns an Array HTML Elements that are all of the plotted features.
     */
    getFeatureElements() {
        let myDiv = document.getElementById(this.interactive.container.id);
        return Array.from(myDiv.getElementsByClassName('feature'));
    }
    /**
     * Plots JSON into SVG paths. If the name param is provided only features that match
     * those names will be plotted.
     * @param name the optional name of the features you want to plot
     */
    loadExternalJSON(name) {
        var json = this.externalJSON;
        if (this.featureName != null)
            var listOfNames = listOfNames = name.split(',');
        var k = 0;
        var c = 0;
        var i = 1;
        for (let c = 0; c < json.features.length; c++) {
            for (let k = 0; k < json.features[c].geometry.coordinates.length; k++) {
                if (this.featureName != null) {
                    if (!listOfNames.includes(json.features[c].properties.name.toLowerCase())) {
                        continue;
                    }
                }
                if (json.features[c].geometry.coordinates[k].length == 1) {
                    let path = this.interactive.path('M 0 0');
                    path.root.classList.add('feature');
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
                    path.root.classList.add('feature');
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