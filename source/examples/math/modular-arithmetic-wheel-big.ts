/**
* @ignore true
*/

// import Interactive from 'https://unpkg.com/@interactive-svg/library/dist/Interactive.js';
import {Interactive} from '../../index.js';
import {TAU} from '../../util/constants.js';
import {isPrime} from '../../util/math.js';
import katex from 'https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.mjs';

let defaultConfig = {
  modulo: 4,
  rotations: 4,
  radius: 60,
  max: 10,
  width: 600,
  height: 600,
  spacing:.2,
  fontSize: 20
};

export default function main(id:string, config:any = defaultConfig) {

  // accept user options over default configuration
  config = { ...defaultConfig, ...config};

  // Initialize the interactive
  // let margin = 32;
  let interactive = new Interactive(id, {
    width:config.width,
    height:config.height,
    originX:config.width/2,
    originY:config.height/2,
  });
  interactive.style.overflow = 'visible';
  interactive.classList.add('default', 'center');

  let controls = new Interactive(id, {
    width:config.width,
    height: 60,
    originX: config.width/2
  });
  controls.classList.add('default', 'center');


  // Initalize the element for the math expression
  let container = document.createElement('div');
  document.getElementById(id).appendChild(container);
  // Create three control points
  let radius = config.radius;
  let borderRadius = (config.rotations + config.spacing)*radius;

  let slider = controls.slider( -interactive.width/2 + 25, controls.height/3, {
    value:config.modulo,
    min:2,
    max:config.max,
    width: interactive.width - 50
  });
  let rotationSlider = controls.slider( -interactive.width/2 + 25, 2*controls.height/3, {
    value:config.rotations,
    min:1,
    max:100,
    width: interactive.width - 50
  });
  let tempFunc = slider.onchange;
  slider.onchange = () => {
    render(container, null, n);
    tempFunc();
  };
	rotationSlider.onchange = () => {
		tempFunc();
	}

  let selected = null;

  // Draw the radius circles
  let group = interactive.group();
  let n = slider.value;
  let initialized = false;
  group.addDependency(slider, rotationSlider);
  // group.style.strokeOpacity = '.2';
  group.root.setAttribute('vector-effect','non-scaling-stroke');
  group.update = function() {

    let v = Math.floor(slider.value)
    if ( v === n && initialized) {
      return;
    }
    n = v;
    initialized = true;

    // Clear elements out of the group
    while( group.root.firstChild ) {
      group.root.removeChild(group.root.firstChild);
    }

    let num = 0;
    let defaultColor = `transparent`;
    let hoverColor = `#f1f1f1`;
    // let hoverColor = `#ffeea8`;
    let highlightColor = `ffeea8`;
    // let highlightColor = `rgb(v)`;
    for( let i = config.spacing; i < rotationSlider.value + config.spacing; i++) {

      let currentRadius = i*radius;

      // draw the current circle
      // group.circle(0,0, currentRadius);

      // label the sections corresponding to each number
      let delta = TAU/n;
      for( let j = 0; j < TAU - .0001; j += delta) {

        // Draw the current section
        let angle = j;
        let section = group.group();
        section.root.dataset.number = num.toString();

        let r1 = currentRadius;
        let r2 = currentRadius + radius;
        let x1 = Math.cos(angle);
        let y1 = Math.sin(angle);
        let x2 = Math.cos(angle + delta);
        let y2 = Math.sin(angle + delta);

        let path = section.path(`M ${r1*x1} ${-r1*y1}
                  A ${r1} ${r1} 0 0 0 ${r1*x2} ${-r1*y2}
                  L ${r2*x2} ${-r2*y2}
                  A ${r2} ${r2} 0 0 1 ${r2*x1} ${-r2*y1}
                  Z`);
				if( isPrime(num)) {
					path.style.fill = 'cornflowerblue';
				} else {
					path.style.fill = defaultColor;
				}

        section.root.onmouseover = (event) => {
          if( selected != section ) {
            path.style.fill = hoverColor;
          }
        };
        section.root.onmousedown = (event) => {

          if (selected === section ) {
            selected = null;
            path.style.fill = hoverColor;
            render(container, null, n);
            return;
          } else if( selected != null ) {
            selected.root.firstElementChild.style.fill = defaultColor;
          }
          path.style.fill = highlightColor;
          selected = section;
          render(container, selected.root.dataset.number, n);
        };
        section.root.onmouseout = (event) => {
          if( selected != section ) {
            path.style.fill = defaultColor;
          }
        };

        let a = j + delta/2;
        let x = currentRadius*Math.cos(a);
        let y = currentRadius*Math.sin(a);
        let offset = radius/2;
        let label = section.text( x + (offset)*Math.cos(a), -y - (offset)*Math.sin(a), num.toString());
        label.style.fontSize = `${config.fontSize}px`;
        label.style.fontFamily = 'KaTeX_Main';
        label.style.alignmentBaseline = 'middle';
        label.style.textAnchor = 'middle';
        num++;
      }
    }

    // Draw the lines
    let delta = TAU/n;
    for( let i = 0; i < TAU; i += delta) {
      let x = borderRadius*Math.cos(i);
      let y = borderRadius*Math.sin(i);
      group.line(0, 0, x, -y);
    }

    let rect = (group.root as SVGGraphicsElement).getBBox();
		interactive.setViewBox(rect.x-8, rect.y-8, rect.width + 16, rect.height + 16)
  }
  group.update();
  render(container, null, n);
  let point = interactive.circle(0,0,config.spacing*config.radius);
  point.fill = '#ffffff';
  point.stroke = '#404040';
  let border = interactive.circle(0,0,borderRadius);
  border.stroke = '#404040';

}

function render( container, n, m) {
  if( n === null ) {
    katex.render(`x\\mod ${m}`, container, {
      displayMode: true,
    });
  } else {
    katex.render(`${n}\\mod ${m} = ${n% m}`, container, {
      displayMode: true,
    });
  }
}
