import { PlayerLayout, ResponsiveArtboard } from '@vector-js/vector';

export class PlayerExample extends PlayerLayout {
	
	constructor(container) {

		let width = 720;

		super(container, {
			width:720
		});

		new ResponsiveArtboard(this.canvas, {
			width:720,
			height:300
		})

  }
		
}

