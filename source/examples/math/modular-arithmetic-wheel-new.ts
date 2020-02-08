/**
* @ignore true
*/

// import Interactive from 'https://unpkg.com/@interactive-svg/library/dist/Interactive.js';
import {Interactive, Path, Text, Group} from '../../index.js';
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

class Section extends Group {

  static selected:Section = null;
  static onchange = () => {};

  static defaultColor = `transparent`;
  static hoverColor = `#f1f1f1`;
  static highlightColor = `ffeea8`;
  static fontSize = '20px';

  num:number;
  fill:string;

  private _group:Group;
  private _path:Path;
  private _label:Text;

  constructor(num:number) {
    super();
    this.root.dataset.number = num.toString();
    this.num = num;
    this._path = this.path('');
    if( isPrime(num)) {
      this.fill = `cornflowerblue`;
    } else {
      this.fill = Section.defaultColor;
    }
    // this.fill = Section.defaultColor; // toggle
    this._path.style.fill = this.fill;

    this._label = this.text( 0, 0, num.toString());
    this._label.style.fontSize = Section.fontSize;
    this._label.style.fontFamily = 'KaTeX_Main';
    this._label.style.alignmentBaseline = 'middle';
    this._label.style.textAnchor = 'middle';


    // register mouse over event
    this.root.onmouseover = (event) => {
      if( Section.selected != this ) {
        this._path.style.fill = Section.hoverColor;
      }
    };

    // register mouse down event
    this.root.onmousedown = (event) => {

      // deselect the current selection if it is selected and clicked
      if (Section.selected === this ) {
        Section.selected = null;
        this._path.style.fill = Section.hoverColor;
        Section.onchange();
        return;
      } else if( Section.selected != null ) {
        Section.selected._path.style.fill = Section.selected.fill;
      }
      this._path.style.fill = Section.highlightColor;
      Section.selected = this;
      Section.onchange();
    };

    // regist mouse out event
    this.root.onmouseout = (event) => {
      if( Section.selected != this ) {
        this._path.style.fill = this.fill;
      }
    };
  }

  draw(x1:number, y1:number, x2:number, y2:number, r1:number, r2:number, labelX:number, labelY:number) {

    this._label.x = labelX;
    this._label.y = labelY;
    this._path.d = `M ${r1*x1} ${-r1*y1}
                    A ${r1} ${r1} 0 0 0 ${r1*x2} ${-r1*y2}
                    L ${r2*x2} ${-r2*y2}
                    A ${r2} ${r2} 0 0 1 ${r2*x1} ${-r2*y1}
                    Z`;
  }
}

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
    height: 25,
    originX: config.width/2
  });
  controls.classList.add('default', 'center');

  // Initalize the element for the math expression
  let container = document.createElement('div');
  document.getElementById(id).appendChild(container);
  // Create three control points
  let radius = config.radius;
  let borderRadius = (config.rotations + config.spacing)*radius;

  let slider = controls.slider( -interactive.width/2 + 25, controls.height/2, {
    value:config.modulo,
    min:2,
    max:config.max,
    width: interactive.width - 50
  });
  let tempFunc = slider.onchange;
  slider.onchange = () => {
    Section.onchange();
    tempFunc();
  };

  let selected = null;
  let sections:Section[] = [];
  Section.fontSize = `${config.fontSize}px`;

  // Draw the radius circles
  let group = interactive.group();
  let n = slider.value;
  let initialized = false;
  group.addDependency(slider);
  // group.style.strokeOpacity = '.2';
  group.root.setAttribute('vector-effect','non-scaling-stroke');
  group.update = function() {

    let v = Math.floor(slider.value)
    if ( v === n && initialized) {
      return;
    }
    n = v;
    initialized = true;

    let num = 0;
    for( let i = config.spacing; i < config.rotations + config.spacing; i++) {

      let currentRadius = i*radius;

      // label the sections corresponding to each number
      let delta = TAU/n;
      for( let j = 0; j < TAU - .0001; j += delta) {

        let section:Section
        if( sections.length <= num ) {
          section = new Section(num);
          sections.push(section);
          group.appendChild(section);
        } else {
          section = sections[num];
        }

        // Calculate the section sahpe
        let angle = j;
        let r1 = currentRadius;
        let r2 = currentRadius + radius;
        let x1 = Math.cos(angle);
        let y1 = Math.sin(angle);
        let x2 = Math.cos(angle + delta);
        let y2 = Math.sin(angle + delta);

        // Calculate the position of the label within the section
        let a = j + delta/2;
        let x = currentRadius*Math.cos(a);
        let y = currentRadius*Math.sin(a);
        let offset = radius/2;
        let labelX = x + (offset)*Math.cos(a);
        let labelY = -y - (offset)*Math.sin(a);

        // redraw the section
        section.draw(x1, y1, x2, y2, r1, r2, labelX, labelY);
        section.root.style.display = '';

        num++;
      }
    }
    while ( num < sections.length) {
      sections[num].root.style.display = 'none';
      num++;
    }
  }
  Section.onchange = function() {
    if ( Section.selected == null ) {
      render(container, null, n);
    } else {
      render(container, Section.selected.num, n);
    }
  }
  group.update();
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
