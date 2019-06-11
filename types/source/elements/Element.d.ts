import Controller from '../Controller.js';
/**
* Represents an element that lives within the ecosystem of our interactives.
*/
export default class Element {
    /**
    * Allows for the events attatched to elements to be disabled.
    */
    static disable: boolean;
    /**
    * This controller handles the relationships between different visual elements.
    */
    static controller: Controller;
    /**
    * This number uniquely identifes elements
    */
    static count: number;
    /**
    * A unique identifier string
    */
    private _id;
    /**
    * The root element of this element
    */
    root: SVGElement;
    /**
    * The update function describes how this element should update itself
    */
    update: () => void;
    /**
    * Constructs the elements and adds it into the current controller
    */
    constructor();
    /**
    * Returns the unique generated identifier associated with this element.
    */
    readonly id: string;
    /**
    * Adds a dependency on the other element.
    */
    addDependency(element: Element): void;
    /**
    * Updates the elements that depend on this element.
    */
    updateDependents(): void;
}
