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
    * Returns a SVGTSpanElement element with the provided attributes.
    */
    static TSpan(str) {
        let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1ZHLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc291cmNlL1NWRy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7RUFFRTtBQUNGLE1BQU0sQ0FBQyxPQUFPLE9BQU8sR0FBRztJQUV0Qjs7O01BR0U7SUFDRixNQUFNLENBQUMsR0FBRyxDQUFFLFFBQWUsR0FBRyxFQUFFLFNBQWdCLEdBQUc7UUFFakQsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBRSw0QkFBNEIsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN6RSxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBQyw0QkFBNEIsQ0FBQyxDQUFDO1FBQ3ZELEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQzNDLEdBQUcsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVEOztNQUVFO0lBQ0YsTUFBTSxDQUFDLElBQUksQ0FBRSxDQUFRLEVBQUUsQ0FBUSxFQUFFLEdBQVU7UUFFekMsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBRSw0QkFBNEIsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMzRSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztRQUNyQixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7TUFFRTtJQUNGLE1BQU0sQ0FBQyxLQUFLLENBQUUsR0FBVTtRQUN0QixJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFFLDRCQUE0QixFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO1FBQ3JCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOztNQUVFO0lBQ0YsTUFBTSxDQUFDLFNBQVMsQ0FBRSxDQUFRLEVBQUUsQ0FBUSxFQUFFLEtBQVksRUFBRSxNQUFhO1FBRS9ELDJDQUEyQztRQUMzQyxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFFLDRCQUE0QixFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzlCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOztNQUVFO0lBQ0YsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFTLEVBQUMsRUFBUyxFQUFDLEVBQVMsRUFBQyxFQUFTO1FBRXBELElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUUsNEJBQTRCLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDN0UsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDdEMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDdEMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDdEMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDdEMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0IsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBRUQ7O01BRUU7SUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLEVBQVUsRUFBRSxFQUFVLEVBQUUsRUFBVSxFQUFFLEVBQVU7UUFFeEQsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQyw0QkFBNEIsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM5QixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7TUFFRTtJQUNGLE1BQU0sQ0FBQyxNQUFNLENBQUUsRUFBVSxFQUFFLEVBQVUsRUFBRSxNQUFjO1FBRW5ELElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUUsNEJBQTRCLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDL0UsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUM3QixNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQzdCLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7UUFDaEMsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVEOztNQUVFO0lBQ0YsTUFBTSxDQUFDLEtBQUs7UUFFVixJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFFLDRCQUE0QixFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3pFLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVEOztNQUVFO0lBQ0YsTUFBTSxDQUFDLElBQUksQ0FBRSxDQUFRO1FBRW5CLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUUsNEJBQTRCLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDMUIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7O01BRUU7SUFDRixNQUFNLENBQUMsUUFBUTtRQUViLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUUsNEJBQTRCLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDbkYsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztDQUNGIn0=