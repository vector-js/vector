import { ElementExample } from "../example-element";

export class LineExample extends ElementExample {
	
	constructor(idOrElement) {
		
		super(idOrElement);

    let line = this.line(50, 200, 250, 100);
    line.classList.add('default')
	}
}