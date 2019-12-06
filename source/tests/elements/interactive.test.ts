import Container from '../container.js';

import { Interactive, Input, Element } from '../../index.js';

describe('Interactive', function () {

	// initialize testing section
  let container : HTMLElement;

  // create a new container before each test function
  beforeEach(function() {
    container = Container.createContainer();
  });

  describe('Constructor', function () {

    // hide these tests from displaying in the browswer
    beforeEach(function() {
      container.hidden = true;
    });

    it('should create an interactive element within the HTML container', function() {
      let interactive = new Interactive(container);
      chai.expect(container.contains( interactive.root )).to.be.true;
    });
    it('should create an interactive element within the HTML container with the corresponding id', function() {
      let interactive = new Interactive( container.id );
      chai.expect(container.contains( interactive.root )).to.be.true;
    });
    it('should throw an error when no corresponding id exists', function() {
      let badID = 'bad-id';
      chai.expect(()=>{ new Interactive(badID) }).to.throw(Error, `There is no HTML element with the id: ${badID}`);
    });
    it('should construct an interactive ', function() {
      let badID = 'bad-id';
      chai.expect(()=>{ new Interactive(badID) }).to.throw(Error, `There is no HTML element with the id: ${badID}`);
    });
  });

  describe('Options', function () {

    function testBoundingBox( interactive:Interactive ) {
      let rectangle = interactive.rectangle(interactive.minX, interactive.minY, interactive.width, interactive.height);
      rectangle.classList.add('default');
      let circle = interactive.circle(0,0,4);
			circle.style.fill = '#333333';
      interactive.line(-1000,0,1000,0);
      interactive.line(0,-1000,0,1000);

			let b1 = rectangle.root.getBoundingClientRect();
			let b2 = interactive.root.getBoundingClientRect();

			chai.expect(b1.left).to.equal(b2.left);
			chai.expect(b1.right).to.equal(b2.right);
			chai.expect(b1.top).to.equal(b2.top);
			chai.expect(b1.bottom).to.equal(b2.bottom);
			chai.expect(b1.width).to.equal(b2.width);
			chai.expect(b1.height).to.equal(b2.height);

			// TODO: test origin position
    }

    it('default configuration ', function() {
      let interactive = new Interactive(container);
      chai.expect(interactive.width).to.equal(600);
      chai.expect(interactive.height).to.equal(300);
      chai.expect(interactive.originX).to.equal(0);
      chai.expect(interactive.originY).to.equal(0);
      chai.expect(interactive.viewBox).to.equal('0 0 600 300');
      testBoundingBox(interactive);
    });
    it('custom width and height ', function() {
      let interactive = new Interactive(container, {
        width:200,
        height:100
      });
      chai.expect(interactive.width).to.equal(200);
      chai.expect(interactive.height).to.equal(100);
      chai.expect(interactive.originX).to.equal(0);
      chai.expect(interactive.originY).to.equal(0);
      chai.expect(interactive.viewBox).to.equal('0 0 200 100');
			testBoundingBox(interactive);
    });
    it('custom origin', function() {
      let interactive = new Interactive(container, {
        originX:300,
        originY:150
      });
      chai.expect(interactive.width).to.equal(600);
      chai.expect(interactive.height).to.equal(300);
      chai.expect(interactive.originX).to.equal(300);
      chai.expect(interactive.originY).to.equal(150);
      chai.expect(interactive.viewBox).to.equal('-300 -150 600 300');
			testBoundingBox(interactive);
    });
    it('custom origin, width, and height', function() {
      let options = {
        width:100,
        height:150,
        originX:50,
        originY:75
      }
      let interactive = new Interactive(container, options);
      chai.expect(interactive.width).to.equal(options.width);
      chai.expect(interactive.height).to.equal(options.height);
      chai.expect(interactive.originX).to.equal(options.originX);
      chai.expect(interactive.originY).to.equal(options.originY);
      chai.expect(interactive.viewBox).to.equal(`${-options.originX} ${-options.originY} ${options.width} ${options.height}`);
			testBoundingBox(interactive);
    });
  });

  describe('Usage', function() {
    let interactive : Interactive;

    // create a new interactive before each test
    beforeEach(function() {
      interactive = new Interactive(container);
      interactive.width = 100;
      interactive.height = 100;
      interactive.border = true;
    });

    describe('Shapes', function () {
      it('should create circle within the interactive', function() {
        let cx = 50;
        let cy = 51;
        let r = 30;
        let circle = interactive.circle(cx, cy, r);
        circle.classList.add('default');

        chai.expect(circle.cx).to.equal(cx);
        chai.expect(circle.cy).to.equal(cy);
        chai.expect(circle.r ).to.equal(r);
        chai.expect(interactive.root.contains(circle.root));
      });
      it('should create an ellipse within the interactive', function() {
        let cx = 50;
        let cy = 51;
        let rx = 30;
        let ry = 20;
        let ellipse = interactive.ellipse(cx, cy, rx, ry);
        ellipse.classList.add('default');

        chai.expect(ellipse.cx).to.equal(cx);
        chai.expect(ellipse.cy).to.equal(cy);
        chai.expect(ellipse.rx).to.equal(rx);
        chai.expect(ellipse.ry).to.equal(ry);
        chai.expect(interactive.contains(ellipse));
      });

      it('should create an line within the interactive', function() {
        let x1 = 30;
        let y1 = 31;
        let x2 = 70;
        let y2 = 71;
        let line = interactive.line(x1, y1, x2, y2);
        line.classList.add('default');

        chai.expect(line.x1).to.equal(x1);
        chai.expect(line.y1).to.equal(y1);
        chai.expect(line.x2).to.equal(x2);
        chai.expect(line.y2).to.equal(y2);
        chai.expect(interactive.contains(line));
      });

      it('should create a path within the interactive', function() {
        let path = interactive.path(`M 20 50 l 50 30 l 0 -30 l -50 -30 z`);
        path.classList.add('default');
        chai.expect(interactive.contains(path));
      });

      it('should create a polygon within the interactive', function() {
        let path = interactive.polygon(`50,30 70,70 30,70`);
        path.classList.add('default');
        chai.expect(interactive.contains(path));
      });

      it('should create a rectangle within the interactive', function() {
        let x = 20;
        let y = 30;
        let w = 60;
        let h = 40;
        let rect = interactive.rectangle(x, y, w, h);
        rect.classList.add('default');

        chai.expect(rect.x).to.equal(x);
        chai.expect(rect.y).to.equal(y);
        chai.expect(rect.width).to.equal(w);
        chai.expect(rect.height).to.equal(h);
        chai.expect(interactive.contains(rect));
      });
    });

    describe('Input', function () {

      it('should create a button within the interactive', function() {
        let x = 15;
        let y = 51;
        let element = interactive.button(x, y, 'button');
        chai.expect(interactive.contains(element));
      });
      it('should create check box within the interactive', function() {
        let x = 20;
        let y = 51;
        let element = interactive.checkBox(x, y, 'c-box', false);
        // TODO: be able to move the coordinates of the check-box?
        chai.expect(interactive.contains(element));
      });
      it('should create control point within the interactive', function() {
        let x = 50;
        let y = 51;
        let element = interactive.control(x, y);
        chai.expect(element.x).to.equal(x);
        chai.expect(element.y).to.equal(y);
        chai.expect(interactive.contains(element));
      });
      it('should create control circle within the interactive', function() {
        let x = 50;
        let y = 51;
        let element = interactive.controlCircle(x, y);
        chai.expect(element.x).to.equal(x);
        chai.expect(element.y).to.equal(y);
        chai.expect(interactive.contains(element));
      });
      it('should create cradio control within the interactive', function() {
        let x = 25;
        let y = 40;
        let element = interactive.radioControl(x, y, ['opt1', 'opt2']);
        chai.expect(interactive.contains(element));
      });
      it('should create a slider within the interactive', function() {
        let x = 20;
        let y = 50;
        let element = interactive.slider(x, y, {
          width:60
        });
        chai.expect(interactive.contains(element));
      });
      it('should create a scrubber within the interactive', function() {
        let x = 30;
        let y = 50;
        interactive.width = 217;
        let element = interactive.scrubber(x, y, { width:160 });
        chai.expect(interactive.contains(element));
      });

      it('should visually create input elements on top of other non-input elements (clear-box)', function() {

        // hide this test from visually displaying
        container.hidden = true;

        // clear box testing
        let inputs = [];
        inputs.push(interactive.button(0,0, 'my-button'));
        inputs.push(interactive.checkBox(5,6, 'my-checkbox', false));
        inputs.push(interactive.control(0,0));
        inputs.push(interactive.radioControl(0,0, ['option-1', 'option-2']));
        inputs.push(interactive.scrubber(0,0, { width:100 }));
        inputs.push(interactive.slider(0,0, {}));
        inputs.forEach((input) => {
          chai.expect(interactive.input.contains(input)).to.be.true;
        });
      });

      it('should visually create input elements on top of other non-input elements (black-box)', function() {

        // hide this test from visually displaying
        container.hidden = true;

        // clear box testing
        let inputs:Input[] = [];
        let elements:Element[] = [];

        // create some elements before
        elements.push(interactive.circle(10,10,10));
        elements.push(interactive.circle(10,10,10));
        elements.push(interactive.circle(10,10,10));

        inputs.push(interactive.button(0,0, 'my-button'));
        inputs.push(interactive.checkBox(5,6, 'my-checkbox', false));
        inputs.push(interactive.control(0,0));
        inputs.push(interactive.radioControl(0,0, ['option-1', 'option-2']));
        inputs.push(interactive.scrubber(0,0, {width: 100}));
        inputs.push(interactive.slider(0,0,{}));

        // create some elements after
        elements.push(interactive.circle(10,10,10));
        elements.push(interactive.circle(10,10,10));
        elements.push(interactive.circle(10,10,10));

        // check that input elements come after ordinary elements in the DOM tree
        inputs.forEach((input) => {
          elements.forEach((element) => {
            if(element.root.compareDocumentPosition(input.root) & Node.DOCUMENT_POSITION_FOLLOWING) {
              chai.expect(true).to.be.true;
            } else {
              chai.expect(false, 'Input elements should come after ordinary elements in the DOM tree ').to.be.true;
            }
          });
        });
      });
    });

    describe('Custom Elements', function() {

      // TODO: make it up to the user to define where the icon is coming from?
      // uggh that seems like a security risk
      let baseURL:string;
      if( window.origin === 'http://localhost:8080' ) {
        baseURL = 'http://localhost:8080/resources/icons/';
      } else {
        baseURL = '/icons/';
      }

  		describe('Icon', function(){
  			let icons = [
  				'advanced-elements',
  				'animation',
  				'basic-elements',
  				'circle',
  				'clip-path',
  				'control',
  				'defs',
  				'elements',
  				'ellipse',
  				'favicon',
  				'full-screen-close',
  				'full-screen-view',
  				'full-screen',
  				'getting-started',
  				'github',
  				'graph',
  				'graphs',
  				'group',
  				'icon',
  				'instagram',
  				'javascript',
  				'line',
  				'mail',
  				'marker',
  				'mouse',
  				'path',
  				'rectangle',
  				'resume',
  				'scripting',
  				'stories',
  				'style',
  				'tree-structure',
  				'twitter',
  				'typography',
  				'utah'
  			]

  			it('should create an icon for each icon we have defined', function() {
  				interactive.width = 300;
  				interactive.height = 300;
  				let m = 2;
  				let size = Math.ceil(Math.sqrt(icons.length));
  				let w = interactive.width/size;
          for( let i = 0; i < icons.length; i++) {
            let c = (i % size);
            let r = Math.floor(i/size);
            interactive.icon( c*w + m, r*w + m, w - 2*m, w - 2*m, icons[i], {
              baseURL: baseURL
            });
          }
  			});

  			it('should repeatedly use an icon, but not have to re-add it', function() {
  				interactive.width = 300;
  				interactive.height = 300;
  				let icon = 'advanced-elements';
  				let margin = 2;
  				let size = 10;
  				let width = interactive.width/size;
  				for (let r = 0; r < size; r++) {
  					for (let c = 0; c < size; c++) {
  						interactive.icon( c*width + margin, r*width + margin, width - 2*margin, width - 2*margin, icon, {
                baseURL: baseURL
              });
  					}
  				}
  			});
  		});
  	});
  });
});
