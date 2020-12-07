import { SVGOverflowTemplate, SVGResponsiveTemplate } from 'vector-js';
import { Example } from './example';


export class DrawingArea extends Example {
	
	constructor(idOrElement) {
		super(idOrElement);

		let template = new SVGResponsiveTemplate(400, 300, {
			maxWidth:400
		});
		this.container.appendChild(template.root);
		this.container.style.overflow = 'hidden';

		template.drawGrid(false, true);
		template.style.overflow = 'visible';

		// Custom handle margin because of constraint on control point
		template.style.margin = '1rem auto 1.5rem auto';
		this.container.style.margin = '0';
		// template.root.style.outline = '1px solid #cccccc';

		// template.text(template.x + template.width/2, template.y + template.height + 24, `${template.width}px`);
		// template.text(template.x + template.width/2, template.y + template.height + 24, `${template.width}px`);

		let control = template.control(100,100);
		control.constrainWithinBox(0,0, template.width, template.height);
		let text = template.text(0,0,'');

		text.addDependency(control);
		text.update = () => {
			text.x = control.x + 16;
			text.y = control.y + 16;
			text.contents = `(${control.x.toFixed(0)}, ${control.y.toFixed(0)})`;
		};
    text.update();
  }
}


export class OverflowDrawingArea extends Example {
	
	constructor(idOrElement) {
		super(idOrElement);

		let template = new SVGOverflowTemplate(300, 300, {align:'left'})
		template.style.overflow = 'visible';
		template.drawGrid(false, false);
		template.root.style.overflow = 'visible';
		this.container.style.overflow = 'hidden';
		this.container.appendChild(template.root);
		this.container.style.outline = '1px solid #cccccc';
		// this.container.style.height = `${template.height}px`;

    let border = template.rect(template.x + 1, template.y + 1, template.width - 2, template.height - 2);
    border.style.fill = 'none';
    border.style.stroke = 'var(--green--b)';
    border.style.strokeWidth = '2';

    this.container.style.border = 'none';
    this.container.style.maxWidth = `720px`;
    this.container.style.resize = 'horizontal'

		let control = template.control(100,100);
		let text = template.text(0,0,'');

		text.addDependency(control);
		text.update = () => {
			text.x = control.x + 16;
			text.y = control.y + 16;
			text.contents = `(${control.x.toFixed(0)}, ${control.y.toFixed(0)})`;
		};
    text.update();
    

	}
}

export class ResponsiveDrawingArea extends Example {
	
	constructor(idOrElement) {
		super(idOrElement);

		let maxWidth = 400;
		let template = new SVGResponsiveTemplate(300, 200, {
			maxWidth:maxWidth
		})
		template.style.overflow = 'visible';
		template.drawGrid(false, false);
		template.root.style.overflow = 'visible';
		this.container.style.overflow = 'hidden';
		this.container.appendChild(template.root);
		this.container.style.outline = '1px solid #cccccc';
		// this.container.style.height = `${template.height/template.width*maxWidth}px`;

		let border = template.rect(1, 1, template.width - 2, template.height - 2);
    border.style.fill = 'none';
    border.style.stroke = 'var(--green--b)';
    border.style.strokeWidth = '2';

    this.container.style.border = 'none';
    this.container.style.maxWidth = `720px`;
		this.container.style.resize = 'horizontal'
		
		let control = template.control(100,100);
		let text = template.text(0,0,'');

		text.addDependency(control);
		text.update = () => {
			text.x = control.x + 16;
			text.y = control.y + 16;
			text.contents = `(${control.x.toFixed(0)}, ${control.y.toFixed(0)})`;
		};
    text.update();
	}
}

