export default class SVG {
    get strokeHex() {
        return this.strokeHex;
    }
    set strokeHex(s) {
        this.strokeHex = s;
    }
    get fillHex() {
        return this.fillHex;
    }
    set fillHex(s) {
        this.fillHex = s;
    }
    static addToMap(geom, ele) {
        this.svgToElementMap.set(geom, ele);
    }
    static getElementFromSvg(geom) {
        return this.svgToElementMap.get(geom);
    }
    static containsName(s) {
        return this.nameSet.has(s);
    }
    static getNameAt(i) {
        return this.nameList[i];
    }
    /**
    * Constructs a rectangle with the provided attributes.
    */
    static Rectangle(x, y, width, height) {
        let rect = document.createElementNS(this.namespace, 'rect');
        rect.style.fill = this.fillHex;
        rect.style.stroke = this.strokeHex;
        rect.setAttribute('id', this.nameList[this.count]);
        rect.setAttribute('customCount', this.count.toString());
        this.count++;
        rect.setAttribute('x', x.toString());
        rect.setAttribute('y', y.toString());
        rect.setAttribute('width', width.toString());
        rect.setAttribute('height', height.toString());
        rect.classList.add('default');
        SVG.svg.appendChild(rect);
        return rect;
    }
    static clearCounter() {
        SVG.count = 0;
    }
    static setNames(names) {
        this.nameSet.clear();
        for (let i = 0; i < names.length; i++) {
            this.nameSet.add(names[i]);
        }
        this.nameList = names;
    }
    static Ellipse(cx, cy, rx, ry) {
        let ell = document.createElementNS(this.namespace, 'ellipse');
        ell.style.fill = this.fillHex;
        ell.style.stroke = this.strokeHex;
        ell.setAttribute('id', this.nameList[this.count]);
        ell.setAttribute('customCount', this.count.toString());
        this.count++;
        ell.setAttribute('cx', cx.toString());
        ell.setAttribute('cy', cy.toString());
        ell.setAttribute('rx', rx.toString());
        ell.setAttribute('ry', ry.toString());
        ell.classList.add('default');
        SVG.svg.appendChild(ell);
        return ell;
    }
    static Line(x1, y1, x2, y2) {
        let line = document.createElementNS(SVG.namespace, 'line');
        line.style.fill = SVG.fillHex;
        line.style.stroke = SVG.strokeHex;
        line.setAttribute('id', SVG.nameList[SVG.count++]);
        line.setAttribute('x1', x1.toString());
        line.setAttribute('y1', y1.toString());
        line.setAttribute('x2', x2.toString());
        line.setAttribute('y2', y2.toString());
        line.classList.add('default');
        SVG.svg.appendChild(line);
        return line;
    }
    /**
    *
    */
    static Circle(cx, cy, radius, classes = ['default']) {
        // create element and assign unique id
        let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('id', this.nameList[this.count]);
        this.count++;
        // initialize attribute values
        circle.cx.baseVal.value = cx;
        circle.cy.baseVal.value = cy;
        circle.r.baseVal.value = radius;
        circle.classList.add(...classes);
        // add into root svg element
        SVG.svg.appendChild(circle);
        return circle;
    }
    static Group(classes = ['default']) {
        // create element and assign unique id
        let group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.setAttribute('id', this.nameList[this.count++]);
        group.classList.add(...classes);
        // add into root svg element
        SVG.svg.appendChild(group);
        return group;
    }
}
// Store a number for generating unique ids
SVG.count = 0;
SVG.nameList = [];
SVG.nameSet = new Set();
SVG.svgToElementMap = new Map();
// Namespace for creating svg elements
SVG.namespace = 'http://www.w3.org/2000/svg';
// The root element where all svg elements will be created
// TODO: this should probably be changed in the long term
SVG.svg = document.getElementById('svg');
SVG.strokeHex = '#000000';
SVG.fillHex = '#aeaeae';
//# sourceMappingURL=svg.js.map