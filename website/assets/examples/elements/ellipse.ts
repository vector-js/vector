import { ElementExample } from "../example-element";

export class EllipseExample extends ElementExample {
	
	constructor(container) {
		super(container);

    let ellipse = this.ellipse(150, 150, 100, 75);
    ellipse.classList.add('default')
    ellipse.style.stroke = '#404040';
    ellipse.style.strokeWidth = '1';
	}
}