import Group from '../svg/group.js';
export default class UnitedStates extends Group {
    states: Map<string, SVGPathElement>;
    constructor();
    getState(postalCode: string): SVGPathElement;
}
