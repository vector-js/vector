import { ResponsiveArtboard } from '@vector-js/vector';

export class ResponsiveArtboardExample extends ResponsiveArtboard {
	
	constructor(container) {
		super(container, {
			width: 300,
			height: 200,
			maxWidth:400,
			align: 'center'
		});

		this.style.overflow = 'visible';
		this.drawGrid(false, false);
		this.container.style.overflow = 'hidden';
		this.container.style.outline = '1px solid #cccccc';

		let border = this.rect(1, 1, this.width - 2, this.height - 2);
    border.style.fill = 'none';
    border.style.stroke = 'var(--green--b)';
    border.style.strokeWidth = '2';

    this.container.style.border = 'none';
    this.container.style.maxWidth = `720px`;
		this.container.style.resize = 'horizontal'
		
		let control = this.control(100,100);
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

