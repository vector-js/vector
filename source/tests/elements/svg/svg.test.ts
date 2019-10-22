import { descriptiveElements, shapeElements, structuralElements, aElement, clipPathElement, viewElement, scriptElement, markerElement, textElement } from './content-model.test.js';
import SVG from '../../../elements/svg/svg.js';
import Container from '../../container.js';

describe('SVG', function () {
  describe('constructor', function(){

    // create a new container before each test function
    let container : HTMLElement;
    beforeEach(function() {
      container = Container.createContainer();
      container.hidden = true;
    });
    it('should construct a new svg object', function(){
      let svg = new SVG();
      container.appendChild(svg.root);
      svg.x = 1;
      svg.y = 2;
      svg.width = 3;
      svg.height = 4;
      chai.expect(svg.x).to.equal(1);
      chai.expect(svg.y).to.equal(2);
      chai.expect(svg.width).to.equal(3);
      chai.expect(svg.height).to.equal(4);
    });
    it('should construct a new svg object with the provided properties', function(){
      let svg = new SVG(1, 2);
      container.appendChild(svg.root);
      chai.expect(svg.x).to.equal(1);
      chai.expect(svg.y).to.equal(2);
    });
    it('should construct a new svg object with the provided properties', function(){
      let svg = new SVG(1, 2, 3, 4);
      container.appendChild(svg.root);
      chai.expect(svg.x).to.equal(1);
      chai.expect(svg.y).to.equal(2);
      chai.expect(svg.width).to.equal(3);
      chai.expect(svg.height).to.equal(4);
    });
    it('should create an svg element within the HTML container with the corresponding id', function() {
      let interactive = SVG.SVG( container.id );
      chai.expect(container.contains( interactive.root )).to.be.true;
    });
    it('should create an svg element within the HTML container', function() {
      let interactive = SVG.SVG( container );
      chai.expect(container.contains( interactive.root )).to.be.true;
    });
    it('should throw an error when no corresponding id exists', function() {
      let badID = 'bad-id';
      chai.expect(()=>{ SVG.SVG(badID) }).to.throw(Error, `There is no HTML element with the id: ${badID}`);
    });
  });

  describe('content model', function(){
    let element : SVG;
    beforeEach(function() {
      element = new SVG();
      this.element = element;
    });

    // grouped elements
    descriptiveElements();
    shapeElements();
    structuralElements();

    // individual elements
    aElement();
    clipPathElement();
    // filterElement();
    // foreignObject();
    // imageElement();
    // markerElement();
    // maskElement();
    scriptElement();
    // styleElement(); // TODO: this conflicts with current style property
    // switchElement();
    textElement();
    viewElement();
  });

  describe('geometric properties', function(){

    let svg : SVG;
    beforeEach(function() {
      svg = SVG.SVG(Container.createContainer());
    });

    it('test', function(){
      // console.log(this);
      svg.circle(50, 50, 30);
    });

    // it('should have an x and y propertiy that specify the top-left corner of where an embedded svg is placed', function(){
    //   let nested = svg.svg()
    //   nested.x = 50;
    //   nested.y = 50;
    //   nested.width = 100;
    //   nested.height = 100;
    //   nested.style.border = '1px solid black';
    //   nested.setViewBox(0,0,nested.width,nested.height);
    //
    //   nested.circle(0,0,100);
    //
    //   // console.log(svg);
    //   document.body.appendChild(svg.root);
    // });
  });
});
