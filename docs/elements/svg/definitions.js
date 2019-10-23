import Element from './element.js';
export default class Definitions extends Element {
    constructor() {
        let defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        super(defs);
    }
}
//# sourceMappingURL=definitions.js.map