/**
* @ignore true
*/

import numberWheelMain from './modular-arithmetic-wheel.js';

/**
* Exposes a function that creates a number wheel within the provided id. The
* configuration controls the look and feel of the number wheel.
*/
export default function main(id:string) {

  numberWheelMain(id, {
    modulusSlider:false,
    modulo:3,
    rotations:3,
    width: 420,
    height: 420
    });

}
