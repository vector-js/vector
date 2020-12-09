import { ElementExample } from "../example-element";

export class TextSpanExample extends ElementExample {
	
	constructor(container) {
		super(container);
		let text = this.text(100, 100);
		text.tspan('fly ')
		text.tspan('you ').style.fontWeight = '700';
		text.tspan('fools');
		text.style.fontSize = '50px';
	}
}