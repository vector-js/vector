
import { SVGOverflowTemplate } from 'vector-js';
import { Example } from './example';

export class ElementExample extends Example {
	template:SVGOverflowTemplate;
	constructor(idOrElement) {
		super(idOrElement);

		this.template = new SVGOverflowTemplate(300, 300, {align:'left'})
		this.template.style.overflow = 'visible';
		this.template.drawGrid(false, false);
		this.template.root.style.overflow = 'visible';
		this.container.style.overflow = 'hidden';
		this.container.appendChild(this.template.root);
		this.container.style.outline = '1px solid #cccccc';

	}
}
