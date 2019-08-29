import { getScriptName } from '../../Util.js';
import Interactive from '../../Interactive.js';
import Element from '../../elements/Element.js';
import Edge from '../../elements/Edge.js';
import Node from '../../elements/Node.js';

let interactive = new Interactive(getScriptName());

// let input = document.createElement('input');
// input.type = 'text';
// input.style.width = '600px';
// interactive.container.prepend(input);

let primes = [ 2, 3, 5, 7, 11, 13, 17, 23];
let radius = 30;

let slider = interactive.slider( 16, 16, interactive.width - 16, 2);

slider.control.onchange = function() {
  primeFactors( slider.value, 0, interactive.width/2, 60, null);
};
slider.control.onchange();


function primeFactors( n:number, i:number, x:number, y:number, prev:Node ) {

  // draw a node at the current location

  // base case
  if( n == primes[i] ) {
    let leaf = interactive.node( x, y, 30, n.toString());
    if( prev != null ) {
      interactive.edge( prev, leaf, true);
    }
    return;
  }

  if( n % primes[i] == 0 ) {
    let node = interactive.node( x, y, radius, n.toString());
    let leaf = interactive.node( x - 64, y + 64, radius, primes[i].toString());
    if( prev ) {
      interactive.edge( prev, node, true);
    }
    interactive.edge( node, leaf, true);
    primeFactors( n/primes[i], i, x + 64, y + 64, node);
  } else {
    primeFactors( n, i + 1, x, y, prev);
  }
}
