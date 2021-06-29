import Element from './element.js';
/**
* A symbol is a reusable graphic.
*/
export default class Symbol extends Element {
    constructor();
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    get width(): number;
    set width(value: number);
    get height(): number;
    set height(value: number);
    get preserveAspectRatio(): string;
    set preserveAspectRatio(value: string);
    get viewBox(): string;
    set viewBox(value: string);
    get refX(): number;
    set refX(value: number);
    get refY(): number;
    set refY(value: number);
}
