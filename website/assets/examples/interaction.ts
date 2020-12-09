import { Artboard, OverflowArtboard, SideBarLayout } from '@vector-js/vector';

export class InteractionExample extends SideBarLayout {
	
	constructor(container) {

		super(container, {
			right:true
		});
		let button = this.addButton(this.sidebar, 'Reset');
		let checkbox = this.addCheckbox(this.sidebar, true, 'Checkbox');
		let slider = this.addSlider(this.sidebar, 0, 100, 50);
		
		let artboard = new OverflowArtboard(this.main, {
			width:300,
			height:300,
			align: 'left',
		});
		artboard.drawGrid();
		this.main.style.overflow = 'hidden';

		artboard.style.overflow = 'visible';

		let group = artboard.group();


		let control1 = artboard.control(50,50);
		let control2 = artboard.control(250,150);
		let control3 = artboard.control(100,200);


		let boundingbox = artboard.rect(100,100,200,200);
		boundingbox.style.fill = 'lightgreen';
		boundingbox.style.fillOpacity = `${parseInt(slider.value)/150}`;
		boundingbox.classList.add('default');


		slider.oninput = () => {
			boundingbox.style.fillOpacity = `${parseInt(slider.value)/150}`;
		}

		// TODO: this presents a hacky problem
		group.appendSelfWithin( artboard.input.root);
		control1.appendSelfWithin(group.root);
		control2.appendSelfWithin(group.root);
		control3.appendSelfWithin(group.root);

		boundingbox.addDependency(control1, control2, control3)
		boundingbox.update = () => {
			boundingbox.x = Math.min( control1.x, control2.x, control3.x);
			boundingbox.y = Math.min( control1.y, control2.y, control3.y);
			boundingbox.width =  Math.max( control1.x, control2.x, control3.x) - boundingbox.x;
			boundingbox.height = Math.max( control1.y, control2.y, control3.y) - boundingbox.y;
		}
		boundingbox.update();

		checkbox.onchange = () => {
			if( checkbox.checked) {
				boundingbox.style.display = '';
			} else {
				boundingbox.style.display = 'none';
			}
		}

		button.onclick = () => {
			control1.translate( 50, 50);
			control2.translate(250, 150);
			control3.translate(100, 200);
			checkbox.checked = true;
			slider.value = '50';
			if( checkbox.checked) {
				boundingbox.style.display = '';
			} else {
				boundingbox.style.display = 'none';
			}
		}

  }
		
}

