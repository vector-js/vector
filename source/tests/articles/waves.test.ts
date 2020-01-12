import Container from '../container.js';
import {Interactive, download, Plot} from '../../index.js';

function helper( fn, container) {
  let interactive = new Interactive(container, {
    width:600,
    height:150
  });
  let plot = interactive.plot( fn, {
    x: -50,
    y: -50,
    originX: 0,
    originY: 75,
    scaleX: 150/Math.PI,
    scaleY: 150/Math.PI,
    height: 250,
    width: 700,
    zoomable: false,
    grid:true,
    labels: false,
    border:false
  });
  return plot;
}


describe('Color Theory Interactives', function () {

  // create a new container before each test function
  let container;
  let plot : Plot;
  beforeEach(function() {
    container = Container.createContainer();
    (window as any).download = download;
  });

  afterEach(function(){
    plot.export(); // for exporting not testing
  });

  describe('Wave Interactives', function () {
    it('Sinusoidal', function() {
      plot = helper( Math.cos, container);
    });
    it('Square', function() {
      let fn = (x) => {
        return 2*Math.round(x/4 - Math.floor(x/4)) - 1;
      }
      plot = helper( fn, container);
    });
    it('Sawtooth', function() {
      let fn = (x) => {
        return 2*(x/4 - Math.floor(x/4)) - 1;
      }
      plot = helper( fn, container);
    })
    it('Triangular', function() {
      let fn = (x) => {
        return Math.abs(4*(x/4 - Math.floor(x/4)) - 2) - 1;
      }
      plot = helper( fn, container);
    })
  });
});
