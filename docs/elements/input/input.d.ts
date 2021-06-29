import Group from '../svg/group.js';
/**
* An object that takes in user input in the form of user events.
*/
export default class Input extends Group {
    private _onchange;
    /**
    * Constructs a new input group.
    */
    constructor();
    /**
    * This function is called whenever the state of an input element changes. The
    * default behavior of this function is to update the dependents of this
    * element. WARNING: changing this function can have unintented side effects.
    */
    set onchange(func: () => void);
    get onchange(): () => void;
}
