import Group from '../svg/group.js';
import Rectangle from '../svg/rectangle.js';
import Text from '../svg/text.js';
import Input from './input.js';
/**
*  Dropdown with menu item labels that can be selected.
*/
export default class DropdownControl extends Input {
    optionLabels: string[];
    currentIndex: number;
    textWidth: number;
    expanded: boolean;
    currSelection: Group;
    currSelectionBox: Rectangle;
    currSelectionText: Text;
    collapsedView: Group;
    expandedView: Group;
    x: number;
    y: number;
    /**
     * Constructs a dropdown control with given option labels at the given (x,y) position
     * and with the default selection as the label at the given default index.
     */
    constructor(x: number, y: number, optionLabels: string[], defaultIndex: number);
    get value(): string;
    /**
    *  Updates the expanded view of menu options.
    */
    updateExpandedView(): void;
    /**
    * Returns the text of the current selection in from the dropdown menu.
    */
    getCurrentSelection(): string;
    /**
    * Returns the longest string in the given string array.
    */
    getLongestString(list: string[]): string;
}
