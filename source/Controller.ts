import DependencyGraph from './model/DependencyGraph';
import Element from './elements/Element';

/**
* Controls the interactions between user input and visual changes to the
* interactive
*/
export default class Controller {

  /**
  * Contains a map of unique identifiers to elements
  */
  elements : Map<string, Element>;

  /**
  * Contains the dependecies between elements
  */
  dependencyGraph : DependencyGraph<Element>;

  /**
  * Constructs a new Controller
  */
  constructor() {
    this.dependencyGraph = new DependencyGraph<Element>();
  }

  /**
  * Adds an element to this controller.
  */
  add( element: Element ) {
    this.dependencyGraph.add(element);
  }

  /**
  * Returns the element corresponding to the unique string identifier
  */
  get( id:string ) : Element {
    return this.elements.get(id);
  }

  /**
  * Updates this element and all of its dependents
  */
  update( element: Element ) {
    let deps = this.dependencyGraph.getDependents( element);
    for( let d of deps) {
      d.update();
    }
  }

}
