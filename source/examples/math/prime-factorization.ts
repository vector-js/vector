/**
* @title Prime Factorization
* @description This interactive visualizes the prime factorization tree for a given number.
* @input There is a number input that takes a number less than one-hundred million.
* @weight 1
*/

import { getScriptName, nextPrime, download } from '../../Util.js';
import Interactive from '../../Interactive.js';
import Node from '../../elements/Node.js';

let interactive = new Interactive(getScriptName());
interactive.width = 736;
interactive.height = 400;
interactive.border = true;

let graph = interactive.graph();

// this HTML input element controls the current tree being drawn
let inputContainer = document.createElement('div');
inputContainer.style.width = '100%';
inputContainer.style.height = '2rem';
inputContainer.style.marginBottom = '1rem';

let input = document.createElement('input');
input.type = 'number';
input.value = '12';
input.name = 'number';
input.min = '0';
input.max = '100000';
input.id = getScriptName() + '-number-input';
// input.style.paddingLeft = '.25rem';
// input.style.paddingRight = '.25rem';
input.style.width = '100%';
input.style.height = '2rem';
input.style.paddingLeft = '8px';
input.style.webkitAppearance = 'textfield'
input.style.border = '1px solid grey'
input.style.borderRadius = '4px';
input.style.fontSize = '14px';
interactive.container.parentElement.insertBefore(inputContainer, interactive.container);
inputContainer.appendChild(input);
input.onchange = function() {
  drawGraph();

};

function drawGraph(){
  // remove all the graph elements
  graph.clear();

  // redraw the prime factorization tree
  primeFactors( parseInt(input.value), 0, 0, 0, null);

  let rect = (graph.root as SVGGraphicsElement).getBBox();
  if(graph.size() >= 11) {
    interactive.setViewBox(-rect.width/2 - 32, rect.y - 32, rect.width + 64, rect.height + 64);
  } else {
    interactive.setViewBox(-interactive.width/2, rect.y-32, interactive.width, interactive.height);
  }
}

// draw the initial prime factorization tree for the current input
let radius = 30;
drawGraph();
/**
* This is a recursive function that draws the prime factorization tree for the
* input number n.
*/
function primeFactors( n:number, p:number, x:number, y:number, prev:Node ) {

  if( n <= 1 ) {
    graph.addNode( x, y, n.toString(), radius);
  }

  while( n > 1 ) {

    // base case
    if( n == p ) {
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

      // draw nodes and edges
      let node = graph.addNode( x, y, n.toString(),radius,);
      let leaf = graph.addNode( x - 64, y + 64, p.toString(), radius );
      if( prev ) {
        graph.addEdge( prev, node, true);
      }
      graph.addEdge( node, leaf, true);

      // update variables
      n = n/p;
      x += 64;
      y += 64;
      prev = node;

    } else {
      p = nextPrime(p);
    }
  }
}
