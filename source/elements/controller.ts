import DependencyGraph from '../model/dependency-graph'
import {BaseElement} from './base-element'

/**
* This controller manages the dependencies between elements.
*/
export default class Controller {

  /**
  * Contains a map of unique identifiers to elements
  */
  elements : Map<string, BaseElement>;

  /**
  * Contains the dependencies between elements
  */
  dependencyGraph : DependencyGraph<BaseElement>;

  /**
  * Constructs a controller
  */
  constructor() {
    this.dependencyGraph = new DependencyGraph<BaseElement>();
    this.elements = new Map<string, BaseElement>();
  }

  /**
  * Clears all the elements from this controller.
  */
  clear() {
    this.dependencyGraph = new DependencyGraph<BaseElement>(); // TODO: implement clear method
    this.elements.clear()
  }

  /**
  * Adds an element to this controller.
  */
  add( element: BaseElement ) {
    this.dependencyGraph.add(element);
    this.elements.set( element.id, element);
  }

  /**
  * Removes an element from this controller.
  */
  remove( element:BaseElement) {
    this.dependencyGraph.remove(element);
    this.elements.delete(element.id);
  }

  /**
  * Returns the element corresponding to the unique string identifier
  */
  get( id:string ) : BaseElement {
    return this.elements.get(id);
  }

  /**
  * Updates this element and all of its dependents
  */
  update( element: BaseElement ) {
    let deps = this.dependencyGraph.getDependents( element);
    for( let d of deps) {
      d.update();
    }
  }
}
