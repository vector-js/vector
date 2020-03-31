/**
* @ignore true
*/

import {Interactive, Path, Text, Group, isPrime} from '../../index.js';
import {TAU} from '../../util/constants.js';
import katex from '/katex/katex.module.js';

/**
* This default configuration controls the look and feel for this interactive
*/
let defaultConfig = {
  modulo: 5,
  rotations: 4,
  radius: 60,
  max: 10,
  width: 500,
  height: 500,
  spacing:.2,
  fontSize: 20,
  modulusSlider:true,
  rotationSlider: false,
  highlight: null,
  dropDown: false
};

/**
* Exposes a function that creates a number wheel within the provided id. The
* configuration controls the look and feel of the number wheel.
*/
export default function main(id:string, config:any = defaultConfig) {

  let parent = document.getElementById(id);

  // accept user options over default configuration
  config = { ...defaultConfig, ...config};

  let titleDiv = document.createElement('div');
  titleDiv.style.fontSize = '18px';
  titleDiv.style.display = 'block';
  titleDiv.style.margin = 'auto';

  document.getElementById(id).appendChild(titleDiv);

  let numberWheel = new NumberWheel(id, config);
  if( config.highlight != null ) {
    numberWheel.highlight = config.highlight;
  }

  let m = config.modulo;
  if( config.modulusSlider ) {

    // Create a separate interactive to house the user controls (TODO: move)
    let controls1 = new Interactive(id, {
      width:config.width,
      height: 24,
      originX: config.width/2
    });
    controls1.classList.add('default', 'center');
    controls1.style.marginTop = '1rem';

    // Create three control points
    let modulusSlider = controls1.slider( -controls1.width/2 + 25, controls1.height/2, {
      value:config.modulo,
      min:2,
      max:config.max,
      width: config.width - 50
    });

    m = Math.floor(modulusSlider.value);
    modulusSlider.onchange = function() {
      m = Math.floor(modulusSlider.value);
      numberWheel.draw( m, r);
      render( container, numberWheel.selectedNumber, m);
      katex.render(`\\text{Modulus }${m}`, titleDiv, {
        displayMode: true,
      });
    }
  }

  let r = config.rotations;
  if( config.rotationSlider ) {

    let rotationSliderInteractive = new Interactive(id, {
      width:config.width,
      height: 24,
      originX: config.width/2
    });
    rotationSliderInteractive.classList.add('default', 'center');
    rotationSliderInteractive.style.marginTop = '1rem';

    let rotationSlider = rotationSliderInteractive.slider( -rotationSliderInteractive.width/2 + 25, rotationSliderInteractive.height/2, {
      value:config.rotations,
      min:3,
      max:3*config.max,
      width: config.width - 50
    });

    r = Math.floor(rotationSlider.value);
    rotationSlider.onchange = function() {
      r = Math.floor(rotationSlider.value);
      numberWheel.draw( m, r);
      render( container, numberWheel.selectedNumber, m);
    }
  }

  // Initalize a container for the math expression that the number wheel
  // is visualizing
  let container = document.createElement('div');
  document.getElementById(id).appendChild(container);

  numberWheel.draw( m, r);
  render( container, numberWheel.selectedNumber, m);

  numberWheel.onSelection = () => {
    render( container, numberWheel.selectedNumber, m);
  }

  katex.render(`\\text{Modulus }${m}`, titleDiv, {
    displayMode: true,
  });

  if( config.dropDown ) {
    let selectContainer = document.createElement('div');
    selectContainer.style.width = `${config.width}px`;
    selectContainer.style.display = 'block';
    selectContainer.style.margin = 'auto';
    parent.parentNode.insertBefore(selectContainer, parent.nextSibling);

    // let label = document.createElement('label');
    // label.setAttribute("for", `highlighting-${id}`);
    // label.innerText = "Highlight:";
    // selectContainer.appendChild(label);

    let select = document.createElement("select");
    select.name = 'highlight';
    select.id = `highlighting-${id}`;
    select.style.webkitAppearance = 'none';
    select.style.borderRadius = '4px';
    select.style.border = '1px solid #dedede';
    select.style.padding = '.75rem';
    select.style.outline = 'none';
    select.style.fontSize = '1rem';
    select.style.marginBottom = '.5rem';
    select.style.width = '100%';
    select.style.maxWidth = '500px';
    select.style.background = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAJCAYAAAA/33wPAAAAvklEQ…gSmvxFFMdxoOs6lliWBXEcuzokXRbRoJRyvqqqQvye+QDMDz1D6yuj9wAAAABJRU5ErkJggg==) right center no-repeat;';
    selectContainer.appendChild(select);

    function addOption( selectElement, str ) {
      let option = document.createElement("option");
      option.innerText = str;
      option.value = str;
      selectElement.appendChild(option);
      return option;
    }

    addOption(select, "None").selected = true;
    addOption(select, "Factors of 2");
    addOption(select, "Factors of 3");
    addOption(select, "Factors of 4");
    addOption(select, "Factors of 5");
    addOption(select, "Prime Numbers");

    // default highlight function
    let fn = (n:number) => {
      return false;
    };

    select.onchange = () => {
      switch( select.value ) {
        case "Factors of 2":
          fn =  isMultipleOf(2);
          break;
        case "Factors of 3":
          fn = isMultipleOf(3);
          break;
        case "Factors of 4":
          fn = isMultipleOf(4);
          break;
        case "Factors of 5":
          fn = isMultipleOf(5);
          break;
        case "Prime Numbers":
          fn = isPrime;
          break;
      }

      numberWheel.draw( m, r, true);
      numberWheel.highlight(fn);
    }
  }
}

/**
* A number wheel is a visual representation of the set of integers that spirals
* around the center and counts up starting at 0, 1, 2, 3, and so on. The wheel
* has a "modulus" that corresponds to how many numbers fit around one rotation
* along the wheel.
*/
class NumberWheel {

  /**
  * Set to fault by default
  */
  private _initialized:boolean;
  private _modulus:number;
  private _radius:number;
  private _rotations:number;
  private _sections:Section[];
  private _selected:Section;
  private _spacing:number;

  /**
  * A highlight function that can be used to highlight a set of numbers.
  */
  private _highlight:(number)=>boolean;

  /**
  * A group that contains all of the sections
  */
  group:Group;

  /**
  * The root interactive container
  */
  interactive:Interactive;

  /**
  * Constructs a new number wheel within either the element corresponding to
  * the string id or, if passed the element, within the element itself.
  */
  constructor( idOrElement, config ) {

    this._initialized = false;
    this._modulus = config.modulus;
    this._radius = config.radius;
    this._rotations = config.rotations;
    this._sections = [];
    this._selected = null;
    this._spacing = config.spacing;

    // On default do not highlight any numbers in the wheel
    this._highlight = (n:number) => {
      return false;
    }

    // Initialize the interactive that contains the number wheel
    this.interactive = new Interactive(idOrElement, {
      width:config.width,
      height:config.height,
      originX:config.width/2,
      originY:config.height/2,
    });
    this.interactive.style.overflow = 'visible';
    this.interactive.classList.add('default', 'center');

    Section.fontSize = `${config.fontSize}px`;

    this.group = this.interactive.group();
    this.group.root.setAttribute('vector-effect','non-scaling-stroke');
  }

  /**
  * Returns he current selected section corresponding to a number. Null if no
  * number is selected
  */
  get selectedNumber():number {
    if( this._selected === null ) {
      return null;
    } else {
      return this._selected.num;
    }
  }

  /**
  * Draws or redraws the number wheel with the new modulus.
  */
  draw( modulus:number, rotations:number, force:boolean = false ) {

    let m = Math.floor(modulus);
    let r = Math.floor(rotations);
    if ( m === this._modulus && r === this._rotations && this._initialized && !force) {
      return;
    }
    this._modulus = m;
    this._rotations = r;
    this._initialized = true;

    let num = 0;
    for( let i = this._spacing; i < this._rotations + this._spacing; i++) {

      let currentRadius = i*this._radius;

      // label the sections corresponding to each number
      let delta = TAU/this._modulus;
      for( let j = 0; j < TAU - .0001; j += delta) {

        let section:Section
        if( this._sections.length <= num ) {
          section = new Section(num);
          this.initializeSection(section);
          this._sections.push(section);
          this.group.appendChild(section);
        } else {
          section = this._sections[num];
        }

        // Calculate the section sahpe
        let angle = j;
        let r1 = currentRadius;
        let r2 = currentRadius + this._radius;
        let x1 = Math.cos(angle);
        let y1 = Math.sin(angle);
        let x2 = Math.cos(angle + delta);
        let y2 = Math.sin(angle + delta);

        // Calculate the position of the label within the section
        let a = j + delta/2;
        let x = currentRadius*Math.cos(a);
        let y = currentRadius*Math.sin(a);
        let offset = this._radius/2;
        let labelX = x + (offset)*Math.cos(a);
        let labelY = -y - (offset)*Math.sin(a);

        // redraw the section
        section.draw(x1, y1, x2, y2, r1, r2, labelX, labelY);
        section.root.style.display = '';

        // highlight the section
        if( this._highlight(num) ) {
          section.fill = `cornflowerblue`;
        } else {
          section.fill = Section.defaultColor;
        }

        // apply the fill
        section.applyFill();

        num++;
      }
    }

    // hide excess sections if there are any
    while ( num < this._sections.length) {
      this._sections[num].root.style.display = 'none';
      num++;
    }

    // resize if necessary
    let bbox = this.group.getBoundingBox();
    this.interactive.setViewBox( bbox.x, bbox.y, bbox.width, bbox.height);
  }

  initializeSection(section) {

    // register mouse over event
    section.root.onmouseover = (event) => {
      if( this._selected != section ) {
        section._path.style.fill = Section.hoverColor;
      }
    };

    // register mouse down event
    section.root.onmousedown = (event) => {

      // deselect the current selection if it is selected and clicked
      if (this._selected === section ) {
        this._selected = null;
        section._path.style.fill = Section.hoverColor;
        this.draw( this._modulus, this._rotations);
        return;
      } else if( this._selected != null ) {
        this._selected._path.style.fill = this._selected.fill;
      }
      section._path.style.fill = Section.highlightColor;
      this._selected = section;
      this.onSelection(section.num);
    };

    // regist mouse out event
    section.root.onmouseout = (event) => {
      if( this._selected != section ) {
        section._path.style.fill = section.fill;
      }
    };
  }

  onSelection(num: any) {
    throw new Error("Method not implemented.");
  }

  /**
  * Highlights the numbers which return true from the anonymous function that
  * is passed as an argument to this function.
  */
  highlight( fn:(n:number)=>boolean ) {
    for( let i = 0; i < this._modulus*this._rotations; i++ ) {
      let section = this._sections[i];
      if( fn(section.num)) {
        section.fill = `cornflowerblue`;
      } else {
        section.fill = Section.defaultColor;
      }
      section.applyFill(); // TODO: change this
    }
    this._highlight = fn;
  }
}

function isMultipleOf( x:number ) {
  return (n:number) => {
    return n % x === 0;
  }
}

class Section extends Group {

  static onchange = () => {};
  static defaultColor = `transparent`;
  static hoverColor = `#f1f1f1`;
  static highlightColor = `ffeea8`;
  static fontSize = '20px';

  num:number;

  private _group:Group;
  _path:Path;
  private _label:Text;
  private _fill:string;

  constructor(num:number) {

    super();
    this.root.dataset.number = num.toString();
    this.num = num;
    this._path = this.path('');

    this._path.style.fill = Section.defaultColor;

    this._label = this.text( 0, 0, num.toString());
    this._label.style.fontSize = Section.fontSize;
    this._label.style.fontFamily = 'KaTeX_Main';
    this._label.style.alignmentBaseline = 'middle';
    this._label.style.textAnchor = 'middle';

  }

  set fill(str:string) {
    this._fill = str;
  }

  get fill() {
    return this._fill;
  }

  // something is wonk about this
  applyFill() {
    this._path.style.fill = this.fill;
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



function render( container, n, m) {
  if( n === null ) {
    katex.render(`x\\bmod ${m}`, container, {
      displayMode: true,
    });
  } else {
    katex.render(`${n}\\bmod ${m} = ${n% m}`, container, {
      displayMode: true,
    });
  }
}
