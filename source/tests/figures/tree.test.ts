import Container from '../container.js';
import {download, Template, Interactive, Slider } from '../../index.js';

/* import figures */
import { TreeFigure } from '../../examples/figures/tree.js';
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

      let figure = new TreeFigure(container.id);

			let template = new Template(container.id, {
				interactive:figure
			});

			let levelsSlider = template.addSlider( 0, TreeFigure.maxLevels, 2);
			let branchingSlider = template.addSlider( 1, 5, 3);

      levelsSlider.onchange = () => {
        figure.setLevels(levelsSlider.value)
        levelsSlider.updateDependents();
      };

      branchingSlider.onchange = () => {
        figure.setBranchingFactor(branchingSlider.value)
        branchingSlider.updateDependents();
      };

      template.addVariableDisplay('y', levelsSlider);
      template.addVariableDisplay('b', branchingSlider);
      let interactive = template.addContainer();
      let text = interactive.text(interactive.width/2, 25, '');
      text.classList.add('katex-main', 'text-middle');
      text.tspan('x').classList.add('katex-variable');
      text.tspan(' = ');
      let value = text.tspan(`${figure.leaves}`);
      text.addDependency(levelsSlider, branchingSlider);
      text.update = () => {
        value.text = `${figure.leaves}`;
      };



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
