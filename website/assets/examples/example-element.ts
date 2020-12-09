
import { OverflowArtboard } from '@vector-js/vector';

export class ElementExample extends OverflowArtboard {
	
	constructor(container, config:any = {}) {

		let defaultConfig = {
			width: 300,
			height: 300,
			align: 'left'
		}

		config = { ...defaultConfig, ...config};

		super(container, config);

		this.style.overflow = 'visible';
		this.drawGrid(false, false);
		this.container.style.overflow = 'hidden';
		this.container.style.outline = '1px solid #cccccc';

	}
}
