import Element from './element.js';
import Circle from './circle.js';
import SVG from './svg.js';
import { Structural, Shape, Descriptive } from '../content-model.js';

/**
* A group is a structural element that allows for elements to be grouped
* together and have styles and transformations applied to the elements in the
* group.
*/
export default class Group extends Element implements Descriptive, Shape, Structural {
  description(): void {
    throw new Error("Method not implemented.");
  }
  metadata(): void {
    throw new Error("Method not implemented.");
  }
  title(): void {
    throw new Error("Method not implemented.");
  }

  // make the type of the root to be more specific
  root: SVGGElement;

  /**
  * Constructs a rectangle element at the position (x,y)
  */
  constructor() {
   super(SVG.Group());
  }

  // Structural methods

  defs(): void {
    throw new Error("Method not implemented.");
  }

  group(): Group {
    return this.appendChild(new Group());
  }

  svg(): SVG {
    return this.appendChild(new SVG());
  }

  use(): void {
    throw new Error("Method not implemented.");
  }

  // Shape methods

  circle(cx: number, cy: number, r: number): Circle {
    return this.appendChild(new Circle(cx, cy, r));
  }

  ellipse(): import("./ellipse.js").default {
    throw new Error("Method not implemented.");
  }
  line(): import("./line.js").default {
    throw new Error("Method not implemented.");
  }
  path(): import("./path.js").default {
    throw new Error("Method not implemented.");
  }
  polygon(): void {
    throw new Error("Method not implemented.");
  }
  rectangle(): import("./rectangle.js").default {
    throw new Error("Method not implemented.");
  }
}
