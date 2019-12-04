import Use from '../svg/use.js';
export default class Icon extends Use {
    /**
    * Construct an icon element at the position (x,y) with the provided dimensions
    */
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.classList.add('icon');
    }
}
//# sourceMappingURL=icon.js.map