import Group from './svg/group.js';
import Element from './element.js';
import Interactive from './interactive.js';
import Circle from './svg/circle.js';

export default class CustomElement extends Element {
  rootElement : Element;
  constructor( element:Element ) {
    super(element.root);
    this.rootElement = element;

  }
}

class CustomComplexElement extends CustomElement {
  rootElement : Group;
  constructor() {
    super(new Group());
    this.rootElement.circle(0,0,10);
    this.rootElement.group();
  }
}

class CustomShapeElement extends CustomElement {
  rootElement : Circle;
  constructor() {
    super(new Circle(0,0,0));
  }
}

class ComplexElement extends Group {
  constructor() {
    super();
    this.circle(0,0,10);
    this.group();
  }
}

// example
// let interactive = new Interactive('');
// let complexElement = interactive.complexElement();


// Possible Solution (Extend SVG elements)
// Library elements extend SVG elements and add functionality to them. Cons:
// doesn't seem to make sense to have, for example, a button element or a graph
// element be able to create random SVG element within them. Also potentially
// confusing for Library elements to behave as svg elements.

// Possible Solution (Mix SVG & Library Elements Together)
// Have library elements be a blend of SVG elements & Custom elements. Custom
// elements inherit from the base class & use svg elements internally.
// Structural elements are able to create other elements within them, for example
// svg, group, etc. Otherwise shapes and custom elements would typically act as
// "leaf" elements and never contain other elements.

// Possible Solution (Separate Library and SVG elements from one another):
// Implement new basic library elements that are separate from but use SVG elements
// Base Element that everything inherit from (id's and dependencies)
//    - SVG element that svg elements inherit from (inherits base element)
//    - Custom element that library elements inherit from (inherits base element)
