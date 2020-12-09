import { ElementExample } from "../example-element";

export class PathExample extends ElementExample {
	
	constructor(container) {
		super(container);
		let path = this.path('M 50 100 Q 150 250 250 100');
    path.classList.add('default')
	}
}