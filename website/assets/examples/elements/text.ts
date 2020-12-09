import { ElementExample } from "../example-element";

export class TextExample extends ElementExample {
	
	constructor(container) {
		super(container);
		let text = this.text(100, 100, 'fly you fools');
		text.classList.add('default');
		text.style.fontSize = '50px';
	}
}