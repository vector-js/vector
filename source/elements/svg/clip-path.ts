import Circle from './circle.js';
import Ellipse from './ellipse.js';
import Line from './line.js';
import Path from './path.js';
import Polygon from './polygon.js';
import Rectangle from './rectangle.js';

import Element from './element.js';
import { Descriptive, Shape } from './content-model.js';
import Description from './description.js';
import MetaData from './meta-data.js';
import Title from './title.js';

export default class ClipPath extends Element implements Descriptive, Shape {

  declare root:SVGClipPathElement;

  constructor() {
    let clipPath = document.createElementNS( 'http://www.w3.org/2000/svg', 'clipPath') as SVGClipPathElement;
    super(clipPath);
  }

  circle(cx: number, cy: number, r: number): Circle {
    return this.appendChild(new Circle(cx, cy, r));
  }
  ellipse(cx: number, cy: number, rx: number, ry: number): Ellipse {
    return this.appendChild(new Ellipse(cx, cy, rx, ry));
  }
  line(x1: number, y1: number, x2: number, y2: number): Line {
    return this.appendChild(new Line(x1, y1, x2, y2));
  }
  path(d: string): Path {
    return this.appendChild(new Path(d));
  }
  polygon(points: string): Polygon {
    return this.appendChild(new Polygon(points));
  }
  rectangle(x: number, y: number, width: number, height: number): Rectangle {
    return this.appendChild(new Rectangle(x, y, width, height));
  }


  description(): Description {
    return this.appendChild(new Description());
  }
  metadata(): MetaData {
    return this.appendChild(new MetaData());
  }
  title(): Title {
    return this.appendChild(new Title());
  }
}
