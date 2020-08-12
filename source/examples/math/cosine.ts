/**
* @title Cosine Function
* @description This interactive demonstrates the properties of the cosine function.
* @tags [math]
* @date May 6, 2020
* @ignore true
*/

import {AnimationPlayer, Interactive} from '../../index.js';
// import Group from '../../elements/svg/group.js';
// import Point from '../../elements/math/point.js';
// import Line from '../../elements/svg/line.js';
// import katex from '/katex/katex.module.js';

export default function main(id:string) {

  let radius = 70;
  let margin = 25;
  let height = 240;

  let player = new AnimationPlayer(id, {
    width: radius*2*Math.PI + 100
  });

  let circleInteractive = new Interactive(player.area, {
    width: 2*radius + margin,
    height: height,
    originX: radius + margin/2,
    originY: height/2,
  });
  circleInteractive.circle(0,0, radius).classList.add('default');
  circleInteractive.circle(0,0, 3).style.fill = '#404040';

  let interactive = new Interactive(player.area, {
    width:radius*2*Math.PI + 100,
    height:height
  });
  interactive.plot(Math.cos, {
    width:radius*2*Math.PI + 100,
    height:interactive.height,
    originX: 0,
    originY: (height-100)/2,
    scaleX: radius,
    scaleY: radius
  });

}
