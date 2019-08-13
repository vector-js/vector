/**
* This wrapper class provides static methods for creating SVG Elements.
*/
export default class SVG {
    /**
    * Constructs and returns a SVG element. The default dimensions is 600 by 300
    * units.
    */
    static SVG(width = 600, height = 300) {
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        svg.setAttribute('width', width.toString());
        svg.setAttribute('height', height.toString());
        return svg;
    }
    /**
    * Returns a SVGTextElement element with the provided attributes.
    */
    static Text(x, y, str) {
        let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x.toString());
        text.setAttribute('y', y.toString());
        text.innerHTML = str;
        return text;
    }
    /**
    * Returns a SVGRectElement with the provided attributes.
    */
    static Rectangle(x, y, width, height) {
        // constructs and initializes the rectangle
        let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x.toString());
        rect.setAttribute('y', y.toString());
        rect.setAttribute('width', width.toString());
        rect.setAttribute('height', height.toString());
        rect.classList.add('default');
        return rect;
    }
    /**
    * Returns a SVGEllipseElement with the provided attributes.
    */
    static Ellipse(cx, cy, rx, ry) {
        let ell = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        ell.setAttribute('cx', cx.toString());
        ell.setAttribute('cy', cy.toString());
        ell.setAttribute('rx', rx.toString());
        ell.setAttribute('ry', ry.toString());
        ell.classList.add('default');
        return ell;
    }
    /**
    * Returns a SVGLineElement element with the provided attributes.
    */
    static Line(x1, y1, x2, y2) {
        let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1.toString());
        line.setAttribute('y1', y1.toString());
        line.setAttribute('x2', x2.toString());
        line.setAttribute('y2', y2.toString());
        line.classList.add('default');
        return line;
    }
    /**
    * Returns a SVGCircleElement element with the provided attributes.
    */
    static Circle(cx, cy, radius) {
        let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.cx.baseVal.value = cx;
        circle.cy.baseVal.value = cy;
        circle.r.baseVal.value = radius;
        return circle;
    }
    /**
    * Constructs a group element with the provided attributes.
    */
    static Group() {
        let group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        return group;
    }
    /**
    * Constructs a path element with the provided attributes.
    */
    static Path(d) {
        let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', d);
        return path;
    }
    /**
    * Constructs and returns a clip path element
    */
    static ClipPath() {
        let clipPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
        return clipPath;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1ZHLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc291cmNlL1NWRy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7RUFFRTtBQUNGLE1BQU0sQ0FBQyxPQUFPLE9BQU8sR0FBRztJQUV0Qjs7O01BR0U7SUFDRixNQUFNLENBQUMsR0FBRyxDQUFFLFFBQWUsR0FBRyxFQUFFLFNBQWdCLEdBQUc7UUFFakQsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBRSw0QkFBNEIsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN6RSxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBQyw0QkFBNEIsQ0FBQyxDQUFDO1FBQ3ZELEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQzNDLEdBQUcsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVEOztNQUVFO0lBQ0YsTUFBTSxDQUFDLElBQUksQ0FBRSxDQUFRLEVBQUUsQ0FBUSxFQUFFLEdBQVU7UUFFekMsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBRSw0QkFBNEIsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMzRSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztRQUNyQixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7TUFFRTtJQUNGLE1BQU0sQ0FBQyxTQUFTLENBQUUsQ0FBUSxFQUFFLENBQVEsRUFBRSxLQUFZLEVBQUUsTUFBYTtRQUUvRCwyQ0FBMkM7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