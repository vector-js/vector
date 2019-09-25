import Element from './element.js';
import SVG from '../svg.js';

export default class Icon extends Element {

  root:SVGGElement;

  constructor( x:number, y:number ) {
    super(SVG.Group());
    // TODO: make this a default behavior
    this.root.classList.add('icon');
  }
}
