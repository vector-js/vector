import Container from '../container.js';
import {download, HolyGrail, Interactive, Slider } from '../../index.js';

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

      let template = new HolyGrail(container.id);
      template.root.style.maxWidth = '500px';

      let figure = new TreeFigure(template.main);
      // figure.root.style.border = '1px solid #dddddd';
      // figure.root.style.borderRadius = '5px';
      // figure.root.style.padding = '1rem 0';

      figure.root.style.marginBottom = '1rem';
      // figure.root.classList.add('blue');

			let levelsSlider = template.addSlider( template.footer, 0, 3, 2);

			let branchingSlider = template.addSlider( template.footer, 1, 5, 3);

      levelsSlider.onchange = () => {
        figure.setLevels(levelsSlider.value)
        levelsSlider.updateDependents();
      };

      branchingSlider.onchange = () => {
        figure.setBranchingFactor(branchingSlider.value)
        branchingSlider.updateDependents();
      };

      let interactive = template.addContainer(template.right);
      let text = interactive.text(interactive.width/2, 25, '');
      text.classList.add('katex-main', 'text-middle');
      text.tspan('x').classList.add('katex-variable');
      text.tspan(' = ');
      let value = text.tspan(`${figure.leaves}`);
      text.addDependency(levelsSlider, branchingSlider);
      text.update = () => {
        value.text = `${figure.leaves}`;
      };

      let levelsContainer = template.addVariableDisplay(template.right, 'y', levelsSlider);
      let branchingContainer = template.addVariableDisplay(template.right, 'b', branchingSlider);


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
