import Interactive from '../interactive.js';

describe('Interactive', function () {

  let container : HTMLElement;
  let count = 0;
  let str = 'identifier';

  function createContainer( hidden:boolean = false ) : HTMLElement {
    let container = document.createElement('div');
    container.id = `${str}-${count++}`;
    container.hidden = hidden;
    container.classList.add('interactive-container');
    document.body.appendChild(container);
    return container;
  }

  describe('Creation', function () {

    // create a new container before each test function
    beforeEach(function() {
      container = createContainer(true);
    });

    describe('constructor', function () {
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
    });
  });

  describe('Usage', function () {

    let interactive : Interactive;

    // create a new container before each test function
    beforeEach(function() {
      container = createContainer();
      interactive = new Interactive(container);
      interactive.width = 100;
      interactive.height = 100;
    });

    it('should create circle within the interactive', function() {
      let circle = interactive.circle( 50, 50, 40);
    });

    it('should create rectangle within the interactive', function() {
      let rectangle = interactive.rectangle( 10, 10, 80, 80);
    });

    it('should create rectangle within the interactive', function() {
      let ellipse = interactive.ellipse( 50, 50, 40, 20);
    });

    it('should visually create input elements on top of other non-input elements', function() {
      chai.expect.fail('not implemented');
    });

  });
});
