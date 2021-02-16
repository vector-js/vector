import { ResponsiveArtboard } from '@vector-js/vector';

export class ArtboardExample extends ResponsiveArtboard {
	
	constructor(container) {

		let padding = 16;
		super(container, {
			width:400,
			height:300,
			maxWidth:400,
			align: 'left'
		});

		this.container.style.overflow = 'hidden';

		this.drawGrid(false, true);
		this.style.overflow = 'visible';

		// Custom handle margin because of constraint on control point
		this.style.padding = `${padding}px`;
		// this.style.margin = '1rem auto 1.5rem auto';
		this.container.style.margin = '0';
		// template.root.style.outline = '1px solid #cccccc';

		// template.text(template.x + template.width/2, template.y + template.height + 24, `${template.width}px`);
		// template.text(template.x + template.width/2, template.y + template.height + 24, `${template.width}px`);

		let control = this.control(100,100);
		control.constrainWithinBox(0,0, this.width, this.height);
		let text = this.text(0,0,'');

		text.addDependency(control);
		text.update = () => {
			text.x = control.x + 16;
			text.y = control.y + 16;
			text.contents = `(${control.x.toFixed(0)}, ${control.y.toFixed(0)})`;
		};
    text.update();
  }
}

