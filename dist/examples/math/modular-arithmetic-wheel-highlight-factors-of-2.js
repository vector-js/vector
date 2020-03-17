/**
* @ignore true
*/
import numberWheelMain from './modular-arithmetic-wheel.js';
function highlight(n) {
    return n % 2 === 0;
}
/**
* Exposes a function that creates a number wheel within the provided id. The
* configuration controls the look and feel of the number wheel.
*/
export default function main(id) {
    numberWheelMain(id, { modulo: 2, highlight: highlight });
}
//# sourceMappingURL=modular-arithmetic-wheel-highlight-factors-of-2.js.map