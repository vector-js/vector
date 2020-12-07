import { ElementExample } from "../example-element";

export class RectangleExample extends ElementExample {
	
	constructor(idOrElement) {
		super(idOrElement);

    let rect = this.template.rect(50, 75, 200, 150);
    rect.classList.add('default')
	}
}