/**
* Parses and returns the SVG documented represented by the string argument.
*/
export function parseSVG(svg) : SVGElement {
    let parser = new DOMParser();
    let doc = parser.parseFromString(svg, 'image/svg+xml');
    return doc.documentElement as unknown as SVGElement;
}
