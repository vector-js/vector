import { ElementInterface } from './elements/element.js';
import Group from './elements/group.js';
import SVG from './svg.js';
import Circle from './elements/circle.js';
import Ellipse from './elements/ellipse.js';
import Line from './elements/line.js';
import Path from './elements/path.js';
import Rectangle from './elements/rectangle.js';

type Constructor<T = {}> = new (...args: any[]) => T;

export { Descriptive, Shape, Structural };

/**
* Adds functions for creating descriptive elements to the base class.
*/
function Descriptive<TBase extends Constructor>(Base: TBase) {
  return class extends Base implements ElementInterface {

    root: SVGElement;
    style: CSSStyleDeclaration;
    update: () => void;

    /**
    * Creates and appends a description element within this element.
    */
    description() : void {
      throw new Error('not implemented');
    }

    /**
    * Creates and appends a metadata element within this element.
    */
    metadata() : void {
      throw new Error('not implemented');
    }

    /**
    * Creates and appends a title element within this element.
    */
    title() : void {
      throw new Error('not implemented');
    }
  };
}

/**
* Adds functions for creating shape elements to the base class.
*/
function Shape<TBase extends Constructor>(Base: TBase) {
  return class extends Base implements ElementInterface {

    root: SVGElement;
    style: CSSStyleDeclaration;
    update: () => void;

    /**
    * Constructs and appends a circle within this element.
    */
    circle(cx:number, cy:number, r:number) : Circle {
      let circle = new Circle(cx, cy, r);
      this.root.appendChild(circle.root);
      return circle;
    }

    ellipse() : Ellipse {
      throw new Error('not implemented');
    }

    line() : Line {
      throw new Error('not implemented');
    }

    path() : Path {
      throw new Error('not implemented');
    }

    polygon() : void {
      throw new Error('not implemented');
    }

    rectangle() : Rectangle {
      throw new Error('not implemented');
    }
  };
}

/**
* Adds functions for creating structural elements to the base class.
*/
function Structural<TBase extends Constructor>(Base: TBase) {
  return class extends Base implements ElementInterface {

    root: SVGElement;
    style: CSSStyleDeclaration;
    update: () => void;

    defs() : void {
      throw new Error('not implemented');
    }

    group() : Group {
      let group = new Group();
      this.root.appendChild(group.root);
      return group;
    }

    svg() : SVG {
      let svg = new SVG();
      this.root.appendChild(svg.root);
      return svg;
    }

    use() : void {
      throw new Error('not implemented');
    }
  };
}
