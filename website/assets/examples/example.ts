export class Example {

    container: HTMLElement;

    /**
     * 
     * @param idOrElement Container element to render the interactive within
     */
    constructor(idOrElment:string|HTMLElement) {

        // If the user passes in a string identifier check to see if such an
        // element exists in the current document.
        let element:HTMLElement= null;
        if (typeof idOrElment == "string") {
            element = document.getElementById(idOrElment);
            if( element === null || element === undefined ) {
                throw new Error(`There is no HTML element with the id: ${idOrElment}`);
            }
        } else {
            element = idOrElment;
        }
        this.container = element;
    }
}