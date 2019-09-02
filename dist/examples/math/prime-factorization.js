import { getScriptName, nextPrime, download } from '../../Util.js';
import Interactive from '../../Interactive.js';
let interactive = new Interactive(getScriptName());
interactive.height = 400;
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
input.style.webkitAppearance = 'textfield';
input.style.fontSize = '14px';
interactive.container.parentElement.insertBefore(input, interactive.container);
input.onchange = function () {
    // remove all the graph elements
    let background = interactive.root.firstChild;
    while (background.firstChild) {
        background.removeChild(background.firstChild);
    }
    // redraw the prime factorization tree
    primeFactors(parseInt(input.value), 0, interactive.width / 2, 60, null);
};
// draw the initial prime factorization tree for the current input
let radius = 30;
primeFactors(parseInt(input.value), 0, interactive.width / 2, 60, null);
/**
* This is a recursive function that draws the prime factorization tree for the
* input number n.
*/
function primeFactors(n, p, x, y, prev) {
    // base case
    if (n == p || n <= 1) {
        let leaf = interactive.node(x, y, 30, n.toString());
        if (prev != null) {
            interactive.edge(prev, leaf, true);
        }
        return;
    }
    // check if the current prime divides the current number. If so, draw the
    // and the prime factor nodes with an edge between them. Otherwise, call this
    // function again with the next prime number.
    if (n % p == 0) {
        let node = interactive.node(x, y, radius, n.toString());
        let leaf = interactive.node(x - 64, y + 64, radius, p.toString());
        if (prev) {
            interactive.edge(prev, node, true);
        }
        interactive.edge(node, leaf, true);
        primeFactors(n / p, p, x + 64, y + 64, node);
    }
    else {
        primeFactors(n, nextPrime(p), x, y, prev);
    }
}
// add a save function to the window to save the current prime factorization
// tree
window.save = function () {
    download(interactive.root.id, `prime-factorization-${input.value}.svg`);
};
//# sourceMappingURL=prime-factorization.js.map