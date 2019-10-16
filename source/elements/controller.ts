import DependencyGraph from '../model/dependency-graph.js';
import Element from './base-element.js';

/**
* This controller manages the dependencies between elements.
*/
export default class Controller {

  /**
  * Contains a map of unique identifiers to elements
  */
  elements : Map<string, Element>;

  /**
  * Contains the dependencies between elements
  */
  dependencyGraph : DependencyGraph<Element>;

  /**
  * Constructs a controller
  */
  constructor() {
    this.dependencyGraph = new DependencyGraph<Element>();
    this.elements = new Map<string, Element>();
  }

  /**
  * Clears all the elements from this controller.
  */
  clear() {
    this.dependencyGraph = new DependencyGraph<Element>(); // TODO: implement clear method
    this.elements.clear()
  }

  /**
  * Adds an element to this controller.
  */
  add( element: Element ) {
    this.dependencyGraph.add(element);
    this.elements.set( element.id, element);
  }

  /**
  * Removes an element from this controller.
  */
  remove( element:Element) {
    this.dependencyGraph.remove(element);
    this.elements.delete(element.id);
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
