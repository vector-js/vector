import {Interactive, getScriptName} from '../../index.js';

let interactive = new Interactive(getScriptName());
let graph = `a->b
b->c
a->c`;

// interactive.flowGraph(graph);
