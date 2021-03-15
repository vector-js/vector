import { OverflowArtboard } from 'vector'

export class OverflowArtboardExample2 extends OverflowArtboard {
	
	constructor(container) {
		super(container, {
			width: 300,
			height: 300,
			align: 'left',
			origin: 'default'
		});

		this.style.overflow = 'visible';
		this.drawGrid2(150 - 720/2, 0, 1000, 300, false, false);
		this.container.style.overflow = 'hidden';
		this.container.style.outline = '1px solid #cccccc';
		// this.container.style.height = `${template.height}px`;

    let border = this.rect(this.x + 1, this.y + 1, this.width - 2, this.height - 2);
    border.style.fill = 'none';
    border.style.stroke = 'var(--green--b)';
    border.style.strokeWidth = '2';

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
