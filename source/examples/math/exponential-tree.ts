
import { TreeFigure } from "../figures/tree.js";
import { SideBar } from "../../templates/side-bar.js";

export default function main(id:string) {

	let template = new SideBar(id);
	let figure = new TreeFigure(template.main);

	let levelsSlider = template.addSlider( template.sidebar, 0, 3, 2);
	let branchingSlider = template.addSlider( template.sidebar, 1, 5, 3);

	levelsSlider.onchange = () => {
		figure.setLevels(levelsSlider.value)
		levelsSlider.updateDependents();
	};

	branchingSlider.onchange = () => {
		figure.setBranchingFactor(branchingSlider.value)
		branchingSlider.updateDependents();
	};

	let interactive = template.addContainer(template.sidebar);
	interactive.root.setAttribute('preserveAspectRatio', 'xMidYMid meet');
	interactive.root.setAttribute('width', '100%');

	let text = interactive.text(interactive.width/2, 25, '');
	text.classList.add('katex-main', 'text-middle');
	text.tspan('x').classList.add('katex-variable');
	text.tspan(' = ');
	let value = text.tspan(`${figure.leaves}`);
	text.addDependency(levelsSlider, branchingSlider);
	text.update = () => {
		value.text = `${figure.leaves}`;
	};

	let levelsContainer = template.addVariableDisplay(template.sidebar, 'y', levelsSlider);
	let branchingContainer = template.addVariableDisplay(template.sidebar, 'b', branchingSlider);

}


