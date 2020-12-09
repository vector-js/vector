import { ElementExample } from "../example-element";

export class GroupExample extends ElementExample {
	
	constructor(container) {
		super(container);
		let group1 = this.group();
		let group2 = this.group();
		group1.style.fill = 'lightgreen';
		group2.style.fill = 'lightblue';

		let rows = 3;
		let cols = 3;
		for( let i = 0; i < rows*cols; i++ ) {
			let group;
			if( i % 2) {
				group = group1;
			} else {
				group = group2;
			}
			let x = i % cols;
			let y = Math.floor(i/cols);
			group.circle(x*100 + 50,y*100 + 50, 15);
		}
	}
}