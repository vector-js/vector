import { range, fromEvent } from 'rxjs';
import { map, pluck, filter } from 'rxjs/operators'

let textInput:HTMLInputElement = document.querySelector('#text-input') 
let rangeInput:HTMLInputElement = document.querySelector('#range-input') 



fromEvent(textInput, 'change')
  .pipe(pluck('event','target.value'))
  .subscribe((x) => console.log(x));

fromEvent(rangeInput, 'input')
  .subscribe(() => console.log(rangeInput.value));

// range(1, 200)
//   .pipe(
//     filter(x => x % 2 === 1),
//     map(x => x + x)
//   )
//   .subscribe(x => console.log(x));