import { GeoJSON } from "./geo-json.js";
import SVG from '../svg/svg.js';
import Group from "../svg/group.js";

export interface MapOptions {
	fill?:string,
	stroke?:string,
	strokeWidth?:number,
	nonScalingStroke?:boolean
}
/**
* Map class for displaying geographic maps of the world and its different parts.
*/
export default class GeoMap extends SVG {
  /*
  * if featureName is provided to the constructor, then only that feature will be drawn
  */
 featureName: string;

  /*
  * the GeoJSON used to make the map
  */
  externalJSON: GeoJSON;

  /**
   * Maps feature names to group elements that contain the feature paths.
   */
  private featuresMap: Map<string, Group>;

  /**
   * The options used when constructing the map.
   * Consists of: fill,stroke,strokeWidth,nonScalingStroke
   */
  mapOptions: MapOptions;
  /*
  * mapName: the name of the map you wish to render
  * width: width of the map
  * height: height of the map
  */
  constructor(featureName: string, externalData: GeoJSON, options: MapOptions = {}) {
    super();
    let defaultOptions = {
      fill: "white",
      stroke: "black",
      strokeWidth : 0.5,
      nonScalingStroke: true
    }

    this.mapOptions = {...defaultOptions,...options};
    this.featureName = featureName;
    this.externalJSON = externalData;
    this.featuresMap = new Map();

    this.draw(featureName);
  }

  /**
   * Renders the geo json onto the webpage.
   * @param name name of the feature you want to draw. If left blank will draw all features
   */
  draw(name: string){
    this.clearPaths();
    if(name != "")
      this.featureName = name;
    else
      this.featureName = null;
    this.loadExternalJSON(name);
    this.featuresMap.forEach(element => {
      this.appendChild(element);
    });
    let bbox = this.root.getBBox();
    this.setViewBox( bbox.x, bbox.y, bbox.width, bbox.height);
  }

  /**
   * remove the feature with the passed in name from the geo map
   * @param name the name of the feature you want to remove
   */
  removeFeature(name: string){
    if(this.featuresMap.has(name)){
      let c = this.featuresMap.get(name);
      c.remove();
      this.featuresMap.delete(name);
    }
  }

  /**
   * Clears the interactive of all Map paths.
   */
  clearPaths(){
    let t = this.root.getElementsByClassName('feature');

    while(t.length > 0){
      t[0].remove();
    }
    this.featuresMap = new Map();
  }

  /**
   * Returns the path for the given feature name
   * @param name name of the feature you want the path for
   */
  getPathForFeatureName(name: string){
    return this.featuresMap.get(name);
  }

  /**
   * Returns all of the paths for the current map.
   */
  getAllFeaturePaths(): Array<Group>{
    return Array.from(this.featuresMap.values());
  }

  /**
   * Returns an Array HTML Elements that are all of the plotted features.
   */
  getHTMLFeatureElements(): Array<Element>{
    return Array.from(this.root.children);
  }

  /**
   * sets the viewbox of the interactive to the specified feature
   */
  setViewBoxToFeature(name: string){
    if(this.featuresMap.has(name)){
      let bbox = this.featuresMap.get(name).root.getBBox();
      this.setViewBox(bbox.x, bbox.y, bbox.width, bbox.height);
    }
  }

  /**
   * Resets the viewbox to the entire map
   */
  resetViewBox(){
    let bbox = this.root.getBBox();
    this.setViewBox( bbox.x, bbox.y, bbox.width, bbox.height);
  }

  /**
   * Sets up a group for the passsed in feature name
   * @param name name of the feature
   */
  private setupGroup(name: string): Group{
    let g = new Group();
    g.classList.remove("element");
    g.root.setAttribute("name",name);
    g.style.stroke = this.mapOptions.stroke;
    g.style.fill = this.mapOptions.fill;
    g.style.strokeWidth = this.mapOptions.strokeWidth.toString();
    g.classList.add("feature");
    return g;
  }

  /**
   * Plots JSON into SVG paths. If the name param is provided only features that match
   * those names will be plotted.
   * @param name the optional name of the features you want to plot
   */
  private loadExternalJSON(name: string){
    var json = this.externalJSON;
    var listOfNames = null;
    if(this.featureName != null)
      listOfNames = name.toLowerCase().split(',');

    var k = 0;
    var c = 0;
    var i = 1;
    try{
      for(let c = 0; c < json.features.length; c++){
        for(let k = 0; k < json.features[c].geometry.coordinates.length; k++){
          let currentFeatureName = json.features[c].properties.name;
          if(this.featureName != null){
            if(listOfNames != null && !listOfNames.includes(currentFeatureName.toLowerCase())){
              continue;
            }
            else{
              if(!this.featuresMap.has(currentFeatureName)){
                let g = this.setupGroup(currentFeatureName);
                this.featuresMap.set(currentFeatureName,g);
              }
            }
          }
          else{
            if(!this.featuresMap.has(currentFeatureName)){
              let g = this.setupGroup(currentFeatureName);
              this.featuresMap.set(currentFeatureName,g);
            }
          }
          if(json.features[c].geometry.coordinates[k].length == 1) {
            let path = this.featuresMap.get(currentFeatureName).path('M 0 0');
            if(this.mapOptions.nonScalingStroke)
              path.root.setAttribute("vector-effect",'non-scaling-stroke');
  
            let startX = json.features[c].geometry.coordinates[k][0][0][0];
            let startY = json.features[c].geometry.coordinates[k][0][0][1];
  
            path.d = `M ${startX} ${-1*startY}  `;
            for(i = 1; i < json.features[c].geometry.coordinates[k][0].length; i++){
              let x = json.features[c].geometry.coordinates[k][0][i][0];
              let y = json.features[c].geometry.coordinates[k][0][i][1];
              path.d += `L ${x} ${-1*y} `;
            }
          }
          else{
            let path = this.featuresMap.get(currentFeatureName).path('M 0 0');
            if(this.mapOptions.nonScalingStroke)
              path.root.setAttribute("vector-effect",'non-scaling-stroke');
  
            let startX = json.features[c].geometry.coordinates[k][0][0];
            let startY = json.features[c].geometry.coordinates[k][0][1];
  
            path.d = `M ${startX} ${-1*startY} `;
            for(i = 1; i < json.features[c].geometry.coordinates[k].length; i++){
              let x = json.features[c].geometry.coordinates[k][i][0];
              let y = json.features[c].geometry.coordinates[k][i][1];
              path.d += `L ${x} ${-1*y} `;
            }
          }
        }
      }
    }
    catch(e){
      throw new Error('There was an error processing the provided GeoJSON: '+e); 
    }
  }

  /**
  * The default behavior is to update its dependents on change.
  */
  onchange() {
    this.updateDependents();
  }
}
