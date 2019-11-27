import DependencyGraph from '../model/dependency-graph.js';
import Element from './base-element.js';
/**
* This controller manages the dependencies between elements.
*/
export default class Controller {
    /**
    * Contains a map of unique identifiers to elements
    */
    elements: Map<string, Element>;
    /**
    * Contains the dependencies between elements
    */
    dependencyGraph: DependencyGraph<Element>;
    /**
    * Constructs a controller
    */
    constructor();
    /**
    * Clears all the elements from this controller.
    */
    clear(): void;
    /**
    * Adds an element to this controller.
    */
    add(element: Element): void;
    /**
    * Removes an element from this controller.
    */
    remove(element: Element): void;
    /**
    * Returns the element corresponding to the unique string identifier
    */
    get(id: string): Element;
    /**
    * Updates this element and all of its dependents
    */
    update(element: Element): void;
}
