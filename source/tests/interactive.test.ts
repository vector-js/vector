import Interactive from '../interactive.js';

describe('Interactive', function () {

  let container : HTMLElement;
  let count = 0;
  let str = 'identifier';

  function createContainer( display:string = '' ) : HTMLElement {
    let container = document.createElement('div');
    container.id = `${str}-${count++}`;
    container.style.display = display;
    container.style.cssFloat = 'left';
    container.style.margin = '1rem';
    document.body.appendChild(container);
    return container;
  }

  describe('Creation', function () {

    // create a new container before each test function
    beforeEach(function() {
      container = createContainer('none');
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

    describe('shapes', function(){
      describe('circle', function () {
        it('should create circle within the interactive', function() {
          let circle = interactive.circle( 50, 50, 40);
        });
      });
      describe('rectangle', function () {
        it('should create rectangle within the interactive', function() {
          let rectangle = interactive.rectangle( 10, 10, 80, 80);
        });
      });
      describe('ellipse', function () {
        it('should create rectangle within the interactive', function() {
          let ellipse = interactive.ellipse( 50, 50, 40, 20);
        });
      });
    });
    describe('structural', function(){

    });

  });
});
