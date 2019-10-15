import { descriptiveTests, shapeTests, structuralTests, typographyTests, aTest } from './content-model.test.js';
import Group from '../../../elements/svg/group.js';

describe('Group', function () {

  beforeEach(function() {
    this.element = new Group();
  });

  describe('content model', function(){
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
		describe('\'a\' element', function(){
			aTest();
		});
  });

});
