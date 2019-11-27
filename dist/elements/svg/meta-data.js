import Element from './element.js';
export default class MetaData extends Element {
    constructor() {
        let metadata = document.createElementNS('http://www.w3.org/2000/svg', 'metadata');
        super(metadata);
    }
}
//# sourceMappingURL=meta-data.js.map