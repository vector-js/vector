import { getScriptName, nextPrime, download } from '../../Util.js';
import Interactive from '../../Interactive.js';
import Node from '../../elements/Node.js';

let interactive = new Interactive(getScriptName());
interactive.height = 400;

let graph = interactive.graph();

// this HTML input element controls the current tree being drawn
let input = document.createElement('input');
input.type = 'number';
input.style.width = '600px';
input.value = '60';
input.name = 'number';
input.min = '0';
input.max = '100000';
input.id = getScriptName() + '-number-input';
input.style.padding = '.25rem';
input.style.webkitAppearance = 'textfield'
input.style.fontSize = '14px';
interactive.container.parentElement.insertBefore(input, interactive.container);
input.onchange = function() {

  // remove all the graph elements
  // let elements = graph.root;
  // while( elements.firstChild ){
  //   elements.removeChild(elements.firstChild);
  // }
  graph.clear();

  // redraw the prime factorization tree
  primeFactors( parseInt(input.value), 0, 0, 0, null);

  let rect = (graph.root as SVGGraphicsElement).getBBox();

  console.log(graph.size());
  if(graph.size() == 1)
  {
    interactive.setViewBox(rect.x-32, rect.y-32, rect.width + 64, rect.height + 64)
  }
  else{
    interactive.setViewBox(rect.x-8, rect.y-8, rect.width + 16, rect.height + 16)
  }
};

// draw the initial prime factorization tree for the current input
let radius = 30;
primeFactors( parseInt(input.value), 0, interactive.width/2, 60, null);

/**
* This is a recursive function that draws the prime factorization tree for the
* input number n.
*/
function primeFactors( n:number, p:number, x:number, y:number, prev:Node ) {

  // base case
  if( n == p || n <= 1 ) {
    let leaf = graph.addNode( x, y, n.toString(), radius);
    if( prev != null ) {
      graph.addEdge( prev, leaf, true)
    }
    return;
  }

  // check if the current prime divides the current number. If so, draw the
  // and the prime factor nodes with an edge between them. Otherwise, call this
  // function again with the next prime number.
  if( n % p == 0 ) {
    let node = graph.addNode( x, y, n.toString(),radius,);
    let leaf = graph.addNode( x - 64, y + 64, p.toString(), radius );
    if( prev ) {
      graph.addEdge( prev, node, true);
    }
    graph.addEdge( node, leaf, true);
    primeFactors( n/p, p, x + 64, y + 64, node);
  } else {
    primeFactors( n, nextPrime(p), x, y, prev);
  }
}

// add a save function to the window to save the current prime factorization
// tree
(window as any).save = function() {
  download(interactive.root.id, `prime-factorization-${input.value}.svg`);
}
