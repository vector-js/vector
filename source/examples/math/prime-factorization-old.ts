import { getScriptName, nextPrime } from '../../Util.js';
import Interactive from '../../Interactive.js';
import Element from '../../elements/Element.js';
import Edge from '../../elements/Edge.js';
import Node from '../../elements/Node.js';

let interactive = new Interactive(getScriptName());
let graph = interactive.graph();

let radius = 30;

let slider = interactive.slider( 16, 16, interactive.width - 32, 2*2*3*5);

slider.control.onchange = function() {
  console.log('change');
  // primeFactors( slider.value, 0, interactive.width/2, 60, null);
};
// slider.control.onchange();
primeFactors( slider.value, 0, interactive.width/2, 60, null);

function primeFactors( n:number, p:number, x:number, y:number, prev:Node ) {

  // draw a node at the current location

  // base case
  if( n == p ) {
    let leaf = interactive.node( x, y, 30, n.toString());
    if( prev != null ) {
      interactive.edge( prev, leaf, true);
    }
    return;
  }

  if( n % p == 0 ) {
    let node = interactive.node( x, y, radius, n.toString());
    let leaf = interactive.node( x - 64, y + 64, radius, p.toString());
    if( prev ) {
      interactive.edge( prev, node, true);
    }
    interactive.edge( node, leaf, true);
    primeFactors( n/p, p, x + 64, y + 64, node);
  } else {
    primeFactors( n, nextPrime(p), x, y, prev);
  }
}
