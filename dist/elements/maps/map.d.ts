import { GeoJSON } from "./geo-json.js";
import SVG from '../svg/svg.js';
import Group from "../svg/group.js";
export interface MapOptions {
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    nonScalingStroke?: boolean;
}
/**
* Map class for displaying geographic maps of the world and its different parts.
*/
export default class GeoMap extends SVG {
    featureName: string;
    externalJSON: GeoJSON;
    /**
     * Maps feature names to group elements that contain the feature paths.
     */
    private featuresMap;
    /**
     * The options used when constructing the map.
     * Consists of: fill,stroke,strokeWidth,nonScalingStroke
     */
    mapOptions: MapOptions;
    constructor(featureName: string, externalData: GeoJSON, options?: MapOptions);
    /**
     * Renders the geo json onto the webpage.
     * @param name name of the feature you want to draw. If left blank will draw all features
     */
    draw(name: string): void;
    /**
     * remove the feature with the passed in name from the geo map
     * @param name the name of the feature you want to remove
     */
    removeFeature(name: string): void;
    /**
     * Clears the interactive of all Map paths.
     */
    clearPaths(): void;
    /**
     * Returns the path for the given feature name
     * @param name name of the feature you want the path for
     */
    getPathForFeatureName(name: string): Group;
    /**
     * Returns all of the paths for the current map.
     */
    getAllFeaturePaths(): Array<Group>;
    /**
     * Returns an Array HTML Elements that are all of the plotted features.
     */
    getHTMLFeatureElements(): Array<Element>;
    /**
     * sets the viewbox of the interactive to the specified feature
     */
    setViewBoxToFeature(name: string): void;
    /**
     * Resets the viewbox to the entire map
     */
    resetViewBox(): void;
    /**
     * Sets up a group for the passsed in feature name
     * @param name name of the feature
     */
    private setupGroup;
    /**
     * Plots JSON into SVG paths. If the name param is provided only features that match
     * those names will be plotted.
     * @param name the optional name of the features you want to plot
     */
    private loadExternalJSON;
    /**
    * The default behavior is to update its dependents on change.
    */
    onchange(): void;
}
