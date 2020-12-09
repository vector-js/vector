import { BaseElement } from '../elements/base-element'

/**
* A point has an x position and y position
*/
export class Point extends BaseElement {
    x:number;
    y:number;
    constructor( x:number, y:number) {
      super();
      this.x = x;
      this.y = y;
    }
}