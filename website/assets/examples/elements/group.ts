import { ElementExample } from "../example-element";

export class GroupExample extends ElementExample {
	
	constructor(container) {
		super(container);
		let group = this.group();
		group.style.fill = '#4bb77e'; // green

		let rows = 3;
		let cols = 3;
		for( let i = 0; i < rows*cols; i++ ) {
			let x = i % cols;
			let y = Math.floor(i/cols);
			group.circle(x*100 + 50,y*100 + 50, 15);
		}
	}
}