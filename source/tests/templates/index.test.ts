import Container from '../container.js';
import {HolyGrail } from '../../index.js';


describe('Interactive templates', function () {

	// create a new container before each test function
  let container: HTMLDivElement;
  let scripts = [];
  beforeEach(function() {
    container = Container.createContainer();
  });

  describe('Default', function() {
    it('should create a pancake stack', function() {
      let template = new HolyGrail(container.id);
      template.header.classList.add('purple');
      template.main.classList.add('blue');
      template.footer.classList.add('coral');
      template.addSlider(0,10,3);
      template.addSlider(0,10,3);
      let heading = document.createElement('h3');
      heading.innerText = 'Title';
      template.header.appendChild(heading)
    });
  });
});
