/**
* @title Prime Factorization
* @description This interactive visualizes the prime factorization tree for a given number.
* @input There is a number input that takes a number less than one-hundred million.
* @tags [math, graph]
* @weight 1
*/
import { nextPrime } from '../../util/math.js';
import { Interactive, getScriptName } from '../../index.js';
export default function main(id) {
    let interactive = new Interactive(id);
    interactive.width = 736;
    interactive.height = 400;
    interactive.border = true;
    let graph = interactive.graph({ directed: true });
    // this HTML input element controls the current tree being drawn
    let inputContainer = document.createElement('div');
    inputContainer.classList.add('input-container');
    let input = document.createElement('input');
    input.type = 'number';
    input.value = '12';
    input.id = getScriptName() + '-number-input';
    input.classList.add('input');
    interactive.container.parentElement.insertBefore(inputContainer, interactive.container);
    inputContainer.appendChild(input);
    inputContainer.style.width = '736px';
    inputContainer.style.maxWidth = '100%';
    input.onchange = function () {
        if (parseInt(input.value) < 2) {
            input.value = '2';
        }
        else if (parseInt(input.value) > 1000000) {
            input.value = '1000000';
        }
        drawGraph();
    };
    function drawGraph() {
        // remove all the graph elements
        graph.clear();
        // redraw the prime factorization tree
        primeFactors(parseInt(input.value), 0, 0, 0, null);
        let rect = graph.root.getBBox();
        if (graph.size() == 1) {
            interactive.setViewBox(rect.x - 50, rect.y - 50, rect.width + 100, rect.height + 100);
        }
        else if (graph.size() < 4) {
            interactive.setViewBox(rect.x - 32, rect.y - 32, rect.width + 64, rect.height + 64);
        }
        else {
            interactive.setViewBox(rect.x - 8, rect.y - 8, rect.width + 16, rect.height + 16);
        }
    }
    // draw the initial prime factorization tree for the current input
    let radius = 30;
    drawGraph();
    /**
    * This is a recursive function that draws the prime factorization tree for the
    * input number n.
    */
    function primeFactors(n, p, x, y, prev) {
        if (n <= 1) {
            graph.addNode(x, y, n.toString(), radius);
        }
        while (n > 1) {
            // base case
            if (n == p) {
                let leaf = graph.addNode(x, y, n.toString(), radius, radius);
                leaf.nodeEllipse.style.stroke = '#1bc075';
                if (prev != null) {
                    let edge = graph.addEdge(prev, leaf).style.stroke = '#333333';
                }
                return;
            }
            // check if the current prime divides the current number. If so, draw the
            // and the prime factor nodes with an edge between them. Otherwise, call this
            // function again with the next prime number.
            if (n % p == 0) {
                // draw nodes and edges
                let node = graph.addNode(x, y, n.toString(), radius, radius);
                node.nodeEllipse.style.stroke = '#333333';
                let leaf = graph.addNode(x - 64, y + 64, p.toString(), radius, radius);
                if (prev) {
                    graph.addEdge(prev, node).style.stroke = '#333333';
                }
                graph.addEdge(node, leaf).style.stroke = '#333333';
                leaf.nodeEllipse.style.stroke = '#1bc075';
                // update variables
                n = n / p;
                x += 64;
                y += 64;
                prev = node;
            }
            else {
                p = nextPrime(p);
            }
        }
    }
    return input;
}
//# sourceMappingURL=prime-factorization.js.map