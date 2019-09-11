import { getScriptName, nextPrime, download } from '../../Util.js';
import Interactive from '../../Interactive.js';
let interactive = new Interactive(getScriptName());
interactive.width = 704;
interactive.height = 400;
interactive.border = true;
let graph = interactive.graph();
let allArrays = [];
// this HTML input element controls the current tree being drawn
let input = document.createElement('input');
input.type = 'textfield';
input.style.width = '704px';
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
    let arr = input.value.split(/[ ,]+/);
    let numArr = [];
    for (let i = 0; i < arr.length; i++) {
        numArr.push(parseInt(arr[i]));
    }
    createArrays(numArr);
    console.log(allArrays);
};
function drawGraph(levels) {
    graph.clear();
    for (let i = 0; i < allArrays.length; i++) {
    }
    // let rect = (graph.root as SVGGraphicsElement).getBBox();
    //
    // console.log(graph.size());
    // if(graph.size() == 1)
    // {
    //   interactive.setViewBox(rect.x-32, rect.y-32, rect.width + 64, rect.height + 64)
    // }
    // else{
    //   interactive.setViewBox(rect.x-8, rect.y-8, rect.width + 16, rect.height + 16)
    // }
}
function drawVis(n, p, x, y, prev) {
    // base case
    if (n == p || n <= 1) {
        let leaf = graph.addNode(x, y, n.toString(), radius);
        if (prev != null) {
            graph.addEdge(prev, leaf, true);
        }
        return;
    }
    // check if the current prime divides the current number. If so, draw the
    // and the prime factor nodes with an edge between them. Otherwise, call this
    // function again with the next prime number.
    if (n % p == 0) {
        let node = graph.addNode(x, y, n.toString(), radius);
        let leaf = graph.addNode(x - 64, y + 64, p.toString(), radius);
        if (prev) {
            graph.addEdge(prev, node, true);
        }
        graph.addEdge(node, leaf, true);
        primeFactors(n / p, p, x + 64, y + 64, node);
    }
    else {
        primeFactors(n, nextPrime(p), x, y, prev);
    }
}
// draw the initial prime factorization tree for the current input
/**
* This is a recursive function that draws the prime factorization tree for the
* input number n.
*/
function createArrays(list) {
    allArrays = [];
    mergeSort(list, 0);
}
export function mergeSort(array, level) {
    if (array.length <= 1) {
        return array;
    }
    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);
    if (allArrays[level] === undefined) {
        allArrays.push([left, right]);
    }
    else {
        allArrays[level].push(left);
        allArrays[level].push(right);
    }
    return merge(mergeSort(left, level + 1), mergeSort(right, level + 1));
}
/** Merge (conquer) step of mergeSort */
function merge(left, right) {
    const array = [];
    let lIndex = 0;
    let rIndex = 0;
    while (lIndex + rIndex < left.length + right.length) {
        const lItem = left[lIndex];
        const rItem = right[rIndex];
        if (lItem == null) {
            array.push(rItem);
            rIndex++;
        }
        else if (rItem == null) {
            array.push(lItem);
            lIndex++;
        }
        else if (lItem < rItem) {
            array.push(lItem);
            lIndex++;
        }
        else {
            array.push(rItem);
            rIndex++;
        }
    }
    return array;
}
// add a save function to the window to save the current prime factorization
// tree
window.save = function () {
    download(interactive.root.id, `prime-factorization-${input.value}.svg`);
};
//# sourceMappingURL=mergesort.js.map