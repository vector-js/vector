import { Control, OverflowArtboard, Path, SideBarLayout, TAU } from '@vector-js/vector';


function normalize( angle:number ) : number {
	if( angle > 0 ) {
		return angle;
	} else {
		return 2*Math.PI + angle;
	}
}

function createDisplayAnlge( path:Path, c0:Control, c1:Control, c2:Control ) {
		// Create a path
		let radius = 100;
		path.root.style.fill = 'rgb(236,236,236)';
		path.root.style.fillOpacity = '0.6';
		path.style.stroke = '#333333';
		path.update = function() {
		  let a1 = Math.atan2( c1.y - c0.y, c1.x - c0.x);
		  let a2 = Math.atan2( c2.y - c0.y, c2.x - c0.x);
		  let angle = normalize( a2 - a1);
		  let largeArcFlag = ( angle > Math.PI ) ? false : true;
		  let r = 100/3;
		  let x1 = r*Math.cos(a1) + c0.x;
		  let y1 = r*Math.sin(a1) + c0.y;
		  let x2 = r*Math.cos(a2) + c0.x;
		  let y2 = r*Math.sin(a2) + c0.y;
		  path.d = `M ${c0.x} ${c0.y}
		            L ${x1} ${y1}
		            A ${r} ${r} 0 ${+largeArcFlag} 0 ${x2} ${y2}
		            z`;
		};
		path.update();
		path.addDependency(c0, c1, c2);
}

export class AngleExample extends SideBarLayout {
	
	constructor(container) {

		super(container, {
			right:true
		});
		let button = this.addButton(this.sidebar, 'Reset');
		button.style.width = '100%';
		let checkbox = this.addCheckbox(this.sidebar, false, 'Radians');
		
		let artboard = new OverflowArtboard(this.main, {
			width:300,
			height:300,
			align: 'left',
		});
		artboard.drawGrid();
		this.main.style.overflow = 'hidden';
		artboard.style.overflow = 'visible';

		let vertex = artboard.control(100,100);
		let vector1 = artboard.control(250,150);
		let vector2 = artboard.control(150,250)

		button.onclick = () => {
			vertex.translate(100,100);
			vector1.translate(250,150);
			vector2.translate(150,250);
		};

		vector1.addDependency(vertex);
		vector1.update = () => {
			vector1.x += vertex.dx;
			vector1.y += vertex.dy;
		}

		vector2.addDependency(vertex);
		vector2.update = () => {
			vector2.x += vertex.dx;
			vector2.y += vertex.dy;
		}

		let line1 = artboard.line(vertex.x, vertex.y, vector1.x, vector1.y);
		let line2 = artboard.line(vertex.x, vertex.y, vector2.x, vector2.y);
		line1.classList.add('default');
		line2.classList.add('default');
		line1.addDependency(vertex, vector1);
		line1.update = () => {
			line1.x1 = vertex.x;
			line1.y1 = vertex.y;
			line1.x2 = vector1.x;
			line1.y2 = vector1.y;
		}
		line2.addDependency(vertex, vector2);
		line2.update = () => {
			line2.x1 = vertex.x;
			line2.y1 = vertex.y;
			line2.x2 = vector2.x;
			line2.y2 = vector2.y;
		}

		let path = artboard.path('');

		createDisplayAnlge(path, vertex, vector2, vector1);

		this.addCustomVariableDisplay(this.sidebar, 'a', () => {
			let a1 = Math.atan2( vector1.y - vertex.y, vector1.x - vertex.x);
			let a2 = Math.atan2( vector2.y - vertex.y, vector2.x - vertex.x);
			let angle = normalize( a2 - a1);
			if( checkbox.checked ) {
				return `${(angle/TAU).toFixed(3)} τ`;
			} else {
				return `${(angle/TAU*360).toFixed(0)} °`;
			}
		});
		checkbox.onchange = () => {
			this.updateDependents();
		}

		this.addDependency(vector1, vector2);

  }
		
}

