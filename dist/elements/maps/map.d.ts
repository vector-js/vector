import Interactive from '../interactive.js';
import Group from "../svg/group.js";
import { GeoJSON } from "./geo-json.js";
/**
* Map class for displaying geographic maps of the world and its different parts.
*/
export default class GeoMap extends Group {
    featureName: string;
    externalJSON: GeoJSON;
    interactive: Interactive;
    constructor(interactive: Interactive, featureName: string, width: number, height: number, externalData: GeoJSON);
    /**
     * Clears the interactive of all Map paths.
     */
    clearPaths(): void;
    /**
     * Returns an Array HTML Elements that are all of the plotted features.
     */
    getFeatureElements(): Array<Element>;
    /**
     * Plots JSON into SVG paths. If the name param is provided only features that match
     * those names will be plotted.
     * @param name the optional name of the features you want to plot
     */
    loadExternalJSON(name: string): void;
    /**
    * The default behavior is to update its dependents on change.
    */
    onchange(): void;
}
