import Container from '../container.js';
import {download, Interactive, Slider } from '../../index.js';

/* import figures */
import { TreeFigure } from '../../examples/figures/tree.js';
import { SideBar } from '../../templates/side-bar.js';
// import katex from '/katex/katex.module.js';

describe('Tree Scripts', function () {

  // create a new container before each test function
  let container: HTMLDivElement;
  let scripts = [];
  beforeEach(function() {
    container = Container.createContainer();
  });

  before(function() {
    (window as any).download = download;
  });

  after(function() {
    (window as any).run = () => {
      for( let i = 0; i < scripts.length; i++) {
        scripts[i]();
      }
    };
  });

  describe('Tree figure', function(){
    it('Should Create a Nice Base Template', function() {

      let template = new SideBar(container.id);

      let figure = new TreeFigure(template.main);
      // figure.root.style.border = '1px solid #dddddd';
      // figure.root.style.borderRadius = '5px';
      // figure.root.style.padding = '1rem 0';

      // figure.root.style.padding = '0 1rem';
      // figure.root.style.width = '100%';
      // figure.root.classList.add('blue');

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


		});
    // it('Continuous iteration 1', function() {
    //
    //     let figure = new TreeFigure(container.id);
    //
		// 		let template = new Template(container.id, {
		// 			interactive:figure
		// 		});
    //
		// 		let levelsSlider = template.addSlider( 0, TreeFigure.maxLevels, 3);
		// 		let branchingSlider = template.addSlider( 1, 5, 3);
    //
    //     levelsSlider.onchange = () => {
    //       figure.setLevels(levelsSlider.value)
    //     };
    //
    //     branchingSlider.onchange = () => {
    //       figure.setBranchingFactor(branchingSlider.value)
    //     };
    //
		// });
	});
});
