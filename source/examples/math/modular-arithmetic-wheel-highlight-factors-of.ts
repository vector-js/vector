/**
* @ignore true
*/

import numberWheelMain from './modular-arithmetic-wheel.js';

function isMultipleOf(x) {
    return (n) => {
        return n % x === 0;
    };
}
/**
* Exposes a function that creates a number wheel within the provided id. The
* configuration controls the look and feel of the number wheel.
*/
export default function main(id:string) {

  let numberWheels = [];
  for( let i = 2; i < 5; i++) {
    let wheel = numberWheelMain(id, {
      modulusSlider:true,
      rotationSlider:true,
      width:240,
      height:240,
      modulus:i,
      highlight:isMultipleOf(i)
    });
    numberWheels.push(wheel);
  }
}
