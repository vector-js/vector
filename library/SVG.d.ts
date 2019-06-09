/**
* This wrapper class provides static methods for creating SVG Elements. As it is
* elements are creating and appending into the current SVG document.
*/
export default class SVG {
    /**
    * Constructs a
    */
    static SVG(id: string, width?: number, height?: number): SVGElement;
    /**
    * Constructs a text element at the position (x,y) with the provided string.
    */
    static Text(x: number, y: number, str: string): SVGTextElement;
    /**
    * Constructs a rectangle with the provided attributes.
    */
    static Rectangle(x: number, y: number, width: number, height: number): SVGRectElement;
    /**
    * Constructs an ellipse with the provided attributes.
    */
    static Ellipse(cx: number, cy: number, rx: number, ry: number): SVGEllipseElement;
    /**
    * Constructs a line element with the provided attributes.
    */
    static Line(x1: number, y1: number, x2: number, y2: number): SVGLineElement;
    /**
    * Constructs a circle element with the provided attributes.
    */
    static Circle(cx: number, cy: number, radius: number, classes?: string[]): SVGCircleElement;
    /**
    * Constructs a group element with the provided attributes.
    */
    static Group(classes?: string[]): SVGGElement;
    /**
    * Constructs a path element with the provided attributes.
    */
    static Path(d: string, classes?: string[]): SVGPathElement;
}
