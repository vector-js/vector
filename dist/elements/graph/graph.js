import Node from './node.js';
import Edge from './edge.js';
import Group from '../svg/group.js';
export default class Graph extends Group {
    nodes;
    options;
    /**
    * Constructs a graph
    */
    constructor(options) {
        super();
        this.nodes = [];
        this.options = options;
        let defs = this.defs();
        defs.root.innerHTML = `<marker id="arrow" refX="10" refY="5" markerWidth="10" markerHeight="10" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" style="fill:#333333;"></path></marker>`;
        this.appendChild(defs);
    }
    /**
    * Clears all nodes and all edges from the graph, removes them from the dom.
    */
    clear() {
        for (var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].edges.forEach(function (item) {
                item.remove();
            });
            this.nodes[i].remove();
        }
        this.nodes = [];
    }
    /**
    * Adds a node at the given location with the given text. radius defaults to 20, 20
    */
    addNode(x, y, text, rx = 20, ry = 20) {
        let node = new Node(x, y, rx, ry, text);
        this.root.appendChild(node.root);
        this.nodes.push(node);
        return node;
    }
    /**
    * Adds an edge without direction between the two given nodes.
    */
    addEdge(from, to) {
        let edge = new Edge(from, to, this.options.directed);
        if (this.options.directed) {
            edge.root.setAttribute('marker-end', `url(#arrow)`);
        }
        this.root.prepend(edge.root);
        from.addEdge(edge);
        to.addEdge(edge);
        return edge;
    }
    /**
    * Getter for the list of all nodes inside this graph.
    */
    getNodes() {
        return this.nodes;
    }
    /**
    * Returns the size of this graph
    */
    size() {
        return this.nodes.length;
    }
    /**
    * The tidy algorithm. Assuming a tree for now, pass it the root.
    */
    tidy(root) {
        let orderedNodes = [];
        this.postTraverse(root, orderedNodes);
        let modMap = {};
        let centerMap = {};
        let min_dist = 100;
        for (let node of orderedNodes) {
            centerMap[node.id] = 0;
            node.cx = 0;
            if (node.children.length != 0) {
                node.children[0].cx == 0;
                for (let i = 1; i < node.children.length; i++) {
                    node.children[i].cx = node.children[i - 1].cx + min_dist;
                }
                centerMap[node.id] = (node.children[0].cx + node.children[node.children.length - 1].cx) / 2;
            }
        }
        // console.log(centerMap);
        for (let node of orderedNodes) {
            // console.log(node.label);
            //Set the top y value
            node.cy = node.depth * 75 + 50;
            let leftSiblings = (node.parents[0] != undefined && node.parents[0].children[0] !== node);
            // console.log(leftSiblings);
            // console.log(centeredValue);
            if (!leftSiblings) {
                node.cx = centerMap[node.id];
                modMap[node.id] = 0;
            }
            else {
                node.cx = node.parents[0].children[node.parents[0].children.indexOf(node) - 1].cx + min_dist;
                modMap[node.id] = node.cx - centerMap[node.id];
            }
        }
        this.shiftChildrenByMod(root, 0, modMap);
        modMap = this.clearModMap(modMap);
        //dealing with conflicts, twice.
        // modMap = this.fixConflicts(root, orderedNodes, modMap);
        modMap = this.fixConflicts(root, orderedNodes, modMap);
        this.fixOffScreen(root, modMap);
        root.cx = (root.children[0].cx + root.children[root.children.length - 1].cx) / 2;
    }
    fixOffScreen(root, modMap) {
        let leftList = {};
        leftList = this.leftContour(root, leftList);
        let maxShift = 0;
        for (let i in leftList) {
            if (leftList[i] < maxShift) {
                maxShift = leftList[i];
            }
        }
        root.cx += maxShift + 50;
        modMap[root.id] += maxShift + 50;
        this.shiftChildrenByMod(root, 0, modMap);
    }
    fixConflicts(root, orderedNodes, modMap) {
        let nodeShifted = false;
        for (let node of orderedNodes) {
            let leftSiblings = (node.parents[0] != undefined && node.parents[0].children[0] !== node);
            if (leftSiblings) {
                let currPos = -1;
                for (let i = 0; i < node.parents[0].children.length; i++) {
                    if (node.parents[0].children[i] === node) {
                        currPos = i;
                        break;
                    }
                }
                for (let i = currPos - 1; i >= 0; i--) {
                    if (node.parents[0].children[i] === node) {
                        break;
                    }
                    else {
                        // console.log(node);
                        let leftContList = {};
                        leftContList = this.leftContour(node, leftContList);
                        let rightContList = {};
                        rightContList = this.rightContour(node.parents[0].children[i], rightContList);
                        let shift = this.calculateShift(leftContList, rightContList);
                        if (shift != 0) {
                            nodeShifted = true;
                        }
                        // console.log(shift);
                        node.cx += shift;
                        modMap[node.id] += shift;
                        this.shiftChildrenByMod(root, 0, modMap);
                        modMap = this.clearModMap(modMap);
                        let nodePos = 0;
                        for (let j = i; j < node.parents[0].children.length; j++) {
                            if (node.parents[0].children[j] === node) {
                                nodePos = j;
                                break;
                            }
                        }
                        for (let j = i + 1; j < nodePos; j++) {
                            node.parents[0].children[j].cx += shift / (nodePos - i);
                            modMap[node.parents[0].children[j].id] += shift / (nodePos - i);
                        }
                    }
                }
            }
        }
        // if(nodeShifted){
        //   modMap = this.fixConflicts(root, orderedNodes, modMap)
        // }
        return modMap;
    }
    shiftChildrenByMod(node, mod, modMap) {
        node.cx += mod;
        for (let child of node.children) {
            this.shiftChildrenByMod(child, mod + modMap[node.id], modMap);
        }
    }
    clearModMap(modMap) {
        for (let i in modMap) {
            modMap[i] = 0;
        }
        return modMap;
    }
    calculateShift(leftList, rightList) {
        let biggestOverlap = 0;
        for (let depth in leftList) {
            if (rightList[depth] !== undefined && leftList[depth] - 100 < rightList[depth]) {
                biggestOverlap = Math.abs(leftList[depth] - 100 - rightList[depth]);
            }
        }
        return biggestOverlap;
    }
    leftContour(node, contourList) {
        // console.log(node.id);
        // console.log(node.depth);
        if ((contourList[node.depth] === undefined) || contourList[node.depth] > node.cx) {
            contourList[node.depth] = node.cx;
        }
        for (let child of node.children) {
            contourList = this.leftContour(child, contourList);
        }
        return contourList;
    }
    rightContour(node, contourList) {
        if ((contourList[node.depth] === undefined) || contourList[node.depth] < node.cx) {
            contourList[node.depth] = node.cx;
        }
        for (let child of node.children) {
            contourList = this.rightContour(child, contourList);
        }
        return contourList;
    }
    postTraverse(node, list) {
        if (!node) {
            console.log("ERROR: Node was null");
        }
        if (node.children.length > 0) {
            node.children.forEach(childNode => {
                this.postTraverse(childNode, list);
            });
        }
        list.push(node);
        return list;
    }
}
//# sourceMappingURL=graph.js.map