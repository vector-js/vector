import { ElementExample } from "../example-element";

export class RectangleExample extends ElementExample {
	
	constructor(idOrElement) {
		super(idOrElement);

    let line = this.template.line(50, 75, 200, 150);
    line.classList.add('default')
	}
}