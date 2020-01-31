import Container from '../container.js';
import {Interactive, download, Plot} from '../../index.js';
import {TAU} from '../../util/constants.js';
import {trapezoidalWave} from '../../util/math.js';

export function helper( fn, container, userOptions = {} ) {

  let interactive = new Interactive(container, {
    width:600,
    height:150
  });

  let defaultOptions = {
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
  }

  let options = { ...defaultOptions, ...userOptions};
  let plot = interactive.plot( fn, options);
  return plot;
}

describe('Wave Interactives', function () {

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
    });
    it('Triangular', function() {
      let fn = (x) => {
        return Math.abs(4*(x/4 - Math.floor(x/4)) - 2) - 1;
      }
      plot = helper( fn, container);
    });
    it('Trapezoidal', function(){
      plot = helper( trapezoidalWave(-TAU*1/3, 2, TAU), container, {
        scaleX: 300/Math.PI,
        scaleY: 150/Math.PI,
        originY: 150
      });
      let str = plot.fPath.d;
      plot.fPath.d = 'M -1200 0 ' + str.substr( str.indexOf('L'), str.length) + 'L 1200 0';
      plot.fPath.style.fill = 'rgb(255, 0, 0)';
      plot = helper( trapezoidalWave(TAU*0/3, 2, TAU), container, {
        scaleX: 300/Math.PI,
        scaleY: 150/Math.PI,
        originY: 150
      });
      plot.fPath.style.fill = 'rgb(0, 255, 0)';
      plot = helper( trapezoidalWave(TAU*1/3, 2, TAU), container, {
        scaleX: 300/Math.PI,
        scaleY: 150/Math.PI,
        originY: 150
      });
      plot.fPath.style.fill = 'rgb(0, 0, 255)';
    });
  });
});
