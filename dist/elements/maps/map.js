import SVG from '../svg/svg.js';
/**
* Map class for displaying geographic maps of the world and its different parts.
*/
export default class GeoMap extends SVG {
    /*
    * mapName: the name of the map you wish to render
    * width: width of the map
    * height: height of the map
    */
    constructor(featureName, width, height, externalData) {
        super();
        this.featureName = featureName;
        this.externalJSON = externalData;
        this.draw(featureName);
    }
    draw(name) {
        this.clearPaths();
        if (name != "")
            this.featureName = name;
        else
            this.featureName = null;
        this.loadExternalJSON(name);
        let bbox = this.root.getBBox();
        this.setViewBox(bbox.x, bbox.y, bbox.width, bbox.height);
    }
    /**
     * Clears the interactive of all Map paths.
     */
    clearPaths() {
        let t = this.root.getElementsByClassName('feature');
        while (t.length > 0) {
            t[0].remove();
        }
    }
    /**
     * Returns an Array HTML Elements that are all of the plotted features.
     */
    getFeatureElements() {
        return Array.from(this.root.children);
    }
    /**
     * Plots JSON into SVG paths. If the name param is provided only features that match
     * those names will be plotted.
     * @param name the optional name of the features you want to plot
     */
    loadExternalJSON(name) {
        var json = this.externalJSON;
        var listOfNames = null;
        if (this.featureName != null)
            listOfNames = name.toLowerCase().split(',');
        var k = 0;
        var c = 0;
        var i = 1;
        try {
            for (let c = 0; c < json.features.length; c++) {
                for (let k = 0; k < json.features[c].geometry.coordinates.length; k++) {
                    if (this.featureName != null) {
                        if (listOfNames != null && !listOfNames.includes(json.features[c].properties.name.toLowerCase())) {
                            continue;
                        }
                    }
                    if (json.features[c].geometry.coordinates[k].length == 1) {
                        let path = this.path('M 0 0');
                        path.root.classList.add('feature');
                        path.root.classList.remove("default");
                        path.root.setAttribute("name", json.features[c].properties.name);
                        path.style.stroke = '#333333';
                        path.style.fill = 'ffffff';
                        path.style.strokeWidth = '.1px';
                        path.setAttribute('transform', 'scale(1,-1)');
                        let startX = json.features[c].geometry.coordinates[k][0][0][0];
                        let startY = json.features[c].geometry.coordinates[k][0][0][1];
                        path.d = `M ${startX} ${startY}  `;
                        for (i = 1; i < json.features[c].geometry.coordinates[k][0].length; i++) {
                            let x = json.features[c].geometry.coordinates[k][0][i][0];
                            let y = json.features[c].geometry.coordinates[k][0][i][1];
                            path.d += `L ${x} ${y} `;
                        }
                    }
                    else {
                        let path = this.path('M 0 0');
                        path.root.classList.add('feature');
                        path.root.classList.remove("default");
                        path.root.setAttribute("name", json.features[c].properties.name);
                        path.style.stroke = '#333333';
                        path.style.fill = 'ffffff';
                        path.style.strokeWidth = '.1px';
                        path.setAttribute('transform', 'scale(1,-1)');
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
        catch (e) {
            throw new Error('There was an error processing the provided GeoJSON.');
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