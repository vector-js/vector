import Controller from './controller.js';
/**
* A basic element of the interactive ecosystem. Each element has an unique
* identifier, an update function to be defined by the user, and the ability to
* add dependencies on other elements.
*/
export default abstract class BaseElement {
    /**
    * Allows for the events attatched to elements to be disabled.
    */
    static disable: boolean;
    /**
    * The controller manages the dependencies between elements. Every element
    * is added to this controller upon creation.
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
    * The update function describes how this element should update itself
    */
    update: () => void;
    /**
    * Constructs the elements and adds it into the current controller.
    */
    constructor();
    /**
    * Clears the static data structures holding elements and resets the count.
    */
    static clear(disable?: boolean): void;
    /**
    * Returns the unique generated identifier associated with this element.
    */
    get id(): string;
    /**
    * Removes this element from the DOM and from the Element controller.
    */
    remove(): void;
    /**
    * Declares this element dependent on the provided element(s).
    */
    addDependency(...elements: BaseElement[]): void;
    /**
    * Updates all of the elements that depend on this element.
    */
    updateDependents(): void;
}
