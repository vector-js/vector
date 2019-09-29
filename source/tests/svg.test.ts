import SVG from '../elements/svg/svg.js';
import { descriptiveTests, shapeTests, structuralTests, typographyTests } from './content-model.test.js';

describe('SVG', function () {

  describe('content model', function(){

    beforeEach(function() {
      this.element = new SVG();
    });

    describe('descriptive', function(){
      descriptiveTests();
    });
    describe('shape', function(){
      shapeTests();
    });
    describe('structural', function(){
      structuralTests();
    });
    describe('typography', function(){
      typographyTests();
    });
    // TODO: test creation of 'a' element
    // TODO: test creation of 'clipPath' element
    // TODO: test creation of 'script' element
    // TODO: test creation of 'style' element
    // TODO: test creation of 'view' element
  });

  describe('geometric properties', function(){

    // create a new svg element before each test in this block
    let svg : SVG;
    beforeEach(function() {
      svg = new SVG();
      svg.width = 100;
      svg.height = 100;
      let div = document.createElement('div');
      div.classList.add('test-container');
      div.style.border = '1px solid cornflowerblue';
      div.appendChild(svg.root);
      document.body.appendChild(div);
    });

    it('test', function(){
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
