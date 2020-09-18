/**
* @title Right Triangle
* @description This interactive demonstrates the properties of a right triangle.
* @tags [math]
*/

import {Interactive} from '../../index.js';
import { TAU } from '../../util/constants.js';

export default function main( id:string ){

  // Initialize the interactive
  let interactive = new Interactive(id);
  interactive.classList.add('default');
  interactive.border = true;
  interactive.width = 600;
  interactive.height = 300;
  interactive.originX = interactive.width/2;
  interactive.originY = interactive.height/2;;

  // Create two control points
  let a = TAU/6;
  let p1 = interactive.control( 100*Math.cos(1*TAU/3 + a), 100*Math.sin(1*TAU/3 + a));
  let p2 = interactive.control( 100*Math.cos(2*TAU/3 + a), 100*Math.sin(2*TAU/3 + a));
  let p3 = interactive.control( 100*Math.cos(3*TAU/3 + a), 100*Math.sin(3*TAU/3 + a));

  let group = interactive.group();

  // Create a line between the points
  let triangle = group.path('');
  // triangle.root.style.fill = 'rgb(236,236,236)';
  triangle.style.stroke = 'none';
  triangle.addDependency(p1, p2, p3);
  triangle.update = function() {
    this.d = `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y}z`;
  };
  triangle.update();

  let mirrorTriangle = interactive.path(triangle.d);
  mirrorTriangle.addDependency(triangle);
  mirrorTriangle.update = function() {
    mirrorTriangle.d = triangle.d;
  };

  mirrorCircle( p1);
  mirrorCircle( p2);
  mirrorCircle( p3);

  function mirrorCircle( point ) {
    let circle = group.circle( point.x, point.y, 30);
    circle.root.style.fill = 'grey';
    circle.root.style.fillOpacity = '.3';
    circle.addDependency(point);
    circle.update = function() {
      this.cx = point.x;
      this.cy = point.y;
    };
    circle.update();
  }

  // Draw a triangle for display
  let clipPath = interactive.clipPath();
  let display_triangle = clipPath.path('');
  display_triangle.root.style.strokeWidth = '2px';
  display_triangle.addDependency(triangle);
  display_triangle.update = function() {
    this.d = triangle.d;
  };
  display_triangle.update();
  group.root.setAttribute('clip-path', `url(#${clipPath.id})`);

}
