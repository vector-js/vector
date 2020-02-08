/**
* @ignore true
*/

// import Interactive from 'https://unpkg.com/@interactive-svg/library/dist/Interactive.js';
import {Interactive, getScriptName} from '../../index.js';


export default function main(id:string) {

	// Initialize the interactive
	let interactive = new Interactive(id);
	interactive.border = true;
	interactive.originX = 0;
	interactive.originY = interactive.height/2;;

	let margin = 30;
	let input = interactive.control(margin + 163, 0);
	let n = interactive.control(margin + 100, margin);
	let line = interactive.line(interactive.minX + margin, 0, interactive.maxX - margin, 0);
	let mod = interactive.line(interactive.minX + margin, margin, n.x, margin);

	input.constrainWithinBox(line.x1, line.y1, line.x2, line.y2);
	n.constrainWithinBox(line.x1 + margin, line.y1 + margin, line.x2, line.y2 + margin);
	mod.addDependency(n);
	mod.update = function() {
		mod.x2 = n.x;
	};

	let group = interactive.group();
	group.addDependency(n)
	group.update = function() {
		// clear old lines
		while( group.root.firstChild ) {
			group.root.firstChild.remove();
		}
		// draw new lines
		for( let i = line.x1; i < line.x2; i += (mod.x2 - mod.x1)) {
			group.line(i, -4, i, 4);
		}
	}
	group.update();

	let text = interactive.text(margin, 100, '');
	text.addDependency(input, n);
	text.update = function() {
		let a = input.x - margin;
		let b = n.x - margin;
		text.contents = `${a} mod ${b} = ${a % b}`;
	};
	text.update();

}
