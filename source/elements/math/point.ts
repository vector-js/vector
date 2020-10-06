import {BaseElement} from '../base-element'

/**
* A point has an x position and y position
*/
export default class Point extends BaseElement {
    x:number;
    y:number;
    constructor( x:number, y:number) {
      super();
      this.x = x;
      this.y = y;
    }
}