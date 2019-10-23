import { GeoJSON } from "./geo-json.js";
import SVG from '../svg/svg.js';
/**
* Map class for displaying geographic maps of the world and its different parts.
*/
export default class GeoMap extends SVG {
    featureName: string;
    externalJSON: GeoJSON;
    constructor(featureName: string, width: number, height: number, externalData: GeoJSON);
    draw(name: string): void;
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
