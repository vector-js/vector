/**
* @ignore true
*/
import numberWheelMain from './modular-arithmetic-wheel.js';
import { isPrime } from '../../util/math.js';
/**
* Exposes a function that creates a number wheel within the provided id. The
* configuration controls the look and feel of the number wheel.
*/
export default function main(id) {
    numberWheelMain(id, { highlight: isPrime });
}
//# sourceMappingURL=modular-arithmetic-wheel-highlight-primes.js.map