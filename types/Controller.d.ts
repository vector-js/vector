import DependencyGraph from './model/DependencyGraph.js';
import Element from './elements/Element.js';
/**
* Controls the interactions between user input and visual changes to the
* interactive
*/
export default class Controller {
    /**
    * Contains a map of unique identifiers to elements
    */
    elements: Map<string, Element>;
    /**
    * Contains the dependecies between elements
    */
    dependencyGraph: DependencyGraph<Element>;
    /**
    * Constructs a interactive.controller
    */
    constructor();
    /**
    * Adds an element to this controller.
    */
    add(element: Element): void;
    /**
    * Returns the element corresponding to the unique string identifier
    */
    get(id: string): Element;
    /**
    * Updates this element and all of its dependents
    */
    update(element: Element): void;
}
