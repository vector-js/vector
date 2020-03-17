/**
* @ignore true
*/
import { Interactive, Group } from '../../index.js';
import { TAU } from '../../util/constants.js';
import { isPrime } from '../../util/math.js';
import katex from '/website/static/katex/katex.module.js'; // TODO: change
// import katex from '/katex/katex.module.js';
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
    spacing: .2,
    fontSize: 20,
    modulusSlider: true,
    rotationSlider: false,
    highlight: "none"
};
/**
* Exposes a function that creates a number wheel within the provided id. The
* configuration controls the look and feel of the number wheel.
*/
export default function main(id, config = defaultConfig) {
    // accept user options over default configuration
    config = { ...defaultConfig, ...config };
    let titleDiv = document.createElement('div');
    titleDiv.style.fontSize = '18px';
    titleDiv.style.display = 'block';
    titleDiv.style.margin = 'auto';
    document.getElementById(id).appendChild(titleDiv);
    let numberWheel = new NumberWheel(id, config);
    switch (config.highlight) {
        case "primes":
            numberWheel.highlight = isPrime;
            break;
        case "factors of 2":
            numberWheel.highlight = isMultipleOf(2);
            break;
        case "factors of 3":
            numberWheel.highlight = isMultipleOf(3);
            break;
        case "factors of 4":
            numberWheel.highlight = isMultipleOf(4);
            break;
        case "factors of 5":
            numberWheel.highlight = isMultipleOf(5);
            break;
    }
    let m = config.modulus;
    if (config.modulusSlider) {
        // Create a separate interactive to house the user controls (TODO: move)
        let controls1 = new Interactive(id, {
            width: config.width,
            height: 56,
            originX: config.width / 2
        });
        controls1.classList.add('default', 'center');
        // Create three control points
        let radius = config.radius;
        let modulusSlider = controls1.slider(-controls1.width / 2 + 25, controls1.height / 2, {
            value: config.modulo,
            min: 2,
            max: config.max,
            width: config.width - 50
        });
        m = Math.floor(modulusSlider.value);
        modulusSlider.onchange = function () {
            m = Math.floor(modulusSlider.value);
            Section.selected = null;
            numberWheel.draw(m, r);
            render(container, numberWheel.selectedNumber, m);
            katex.render(`\\text{Modulus }${m}`, titleDiv, {
                displayMode: true,
            });
        };
    }
    let r = config.rotations;
    if (config.rotationSlider) {
        let rotationSliderInteractive = new Interactive(id, {
            width: config.width,
            height: 50,
            originX: config.width / 2
        });
        rotationSliderInteractive.classList.add('default', 'center');
        let rotationSlider = rotationSliderInteractive.slider(-rotationSliderInteractive.width / 2 + 25, 2 * rotationSliderInteractive.height / 3, {
            value: config.rotations,
            min: 3,
            max: 3 * config.max,
            width: config.width - 50
        });
        r = Math.floor(rotationSlider.value);
        rotationSlider.onchange = function () {
            r = Math.floor(rotationSlider.value);
            numberWheel.draw(m, r);
            render(container, numberWheel.selectedNumber, m);
        };
    }
    // Initalize a container for the math expression that the number wheel
    // is visualizing
    let container = document.createElement('div');
    document.getElementById(id).appendChild(container);
    numberWheel.draw(m, r);
    render(container, numberWheel.selectedNumber, m);
    Section.onchange = function () {
        render(container, numberWheel.selectedNumber, m);
    };
    katex.render(`\\text{Modulus }${m}`, titleDiv, {
        displayMode: true,
    });
}
/**
* A number wheel is a visual representation of the set of integers that spirals
* around the center and counts up starting at 0, 1, 2, 3, and so on. The wheel
* has a "modulus" that corresponds to how many numbers fit around one rotation
* along the wheel.
*/
class NumberWheel {
    /**
    * Constructs a new number wheel within either the element corresponding to
    * the string id or, if passed the element, within the element itself.
    */
    constructor(idOrElement, config) {
        this._initialized = false;
        this._modulus = config.modulus;
        this._radius = config.radius;
        this._rotations = config.rotations;
        this._sections = [];
        this._spacing = config.spacing;
        this.highlight = (n) => {
            return false;
        };
        // Initialize the interactive that contains the number wheel
        this.interactive = new Interactive(idOrElement, {
            width: config.width,
            height: config.height,
            originX: config.width / 2,
            originY: config.height / 2,
        });
        this.interactive.style.overflow = 'visible';
        this.interactive.classList.add('default', 'center');
        Section.fontSize = `${config.fontSize}px`;
        this.group = this.interactive.group();
        this.group.root.setAttribute('vector-effect', 'non-scaling-stroke');
    }
    /**
    * Returns he current selected section corresponding to a number. Null if no
    * number is selected
    */
    get selectedNumber() {
        if (this._selected === null) {
            return null;
        }
        else {
            return this._selected.num;
        }
    }
    /**
    * Draws or redraws the number wheel with the new modulus.
    */
    draw(modulus, rotations) {
        let m = Math.floor(modulus);
        let r = Math.floor(rotations);
        if (m === this._modulus && r === this._rotations && this._initialized) {
            return;
        }
        this._modulus = m;
        this._rotations = r;
        this._initialized = true;
        let num = 0;
        for (let i = this._spacing; i < this._rotations + this._spacing; i++) {
            let currentRadius = i * this._radius;
            // label the sections corresponding to each number
            let delta = TAU / this._modulus;
            for (let j = 0; j < TAU - .0001; j += delta) {
                let section;
                if (this._sections.length <= num) {
                    section = new Section(num);
                    this._sections.push(section);
                    this.group.appendChild(section);
                }
                else {
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
                let a = j + delta / 2;
                let x = currentRadius * Math.cos(a);
                let y = currentRadius * Math.sin(a);
                let offset = this._radius / 2;
                let labelX = x + (offset) * Math.cos(a);
                let labelY = -y - (offset) * Math.sin(a);
                // redraw the section
                section.draw(x1, y1, x2, y2, r1, r2, labelX, labelY);
                section.root.style.display = '';
                // highlight the section
                if (this.highlight(num)) {
                    section.fill = `cornflowerblue`;
                }
                else {
                    section.fill = Section.defaultColor;
                }
                // apply the fill
                section.applyFill();
                num++;
            }
        }
        // hide excess sections if there are any
        while (num < this._sections.length) {
            this._sections[num].root.style.display = 'none';
            num++;
        }
        // resize if necessary
        let bbox = this.group.getBoundingBox();
        this.interactive.setViewBox(bbox.x, bbox.y, bbox.width, bbox.height);
    }
}
function isMultipleOf(x) {
    return (n) => {
        return n % x === 0;
    };
}
class Section extends Group {
    constructor(num) {
        super();
        this.root.dataset.number = num.toString();
        this.num = num;
        this._path = this.path('');
        this._path.style.fill = Section.defaultColor;
        this._label = this.text(0, 0, num.toString());
        this._label.style.fontSize = Section.fontSize;
        this._label.style.fontFamily = 'KaTeX_Main';
        this._label.style.alignmentBaseline = 'middle';
        this._label.style.textAnchor = 'middle';
        // register mouse over event
        this.root.onmouseover = (event) => {
            if (Section.selected != this) {
                this._path.style.fill = Section.hoverColor;
            }
        };
        // register mouse down event
        this.root.onmousedown = (event) => {
            // deselect the current selection if it is selected and clicked
            if (Section.selected === this) {
                Section.selected = null;
                this._path.style.fill = Section.hoverColor;
                Section.onchange();
                return;
            }
            else if (Section.selected != null) {
                Section.selected._path.style.fill = Section.selected.fill;
            }
            this._path.style.fill = Section.highlightColor;
            Section.selected = this;
            Section.onchange();
        };
        // regist mouse out event
        this.root.onmouseout = (event) => {
            if (Section.selected != this) {
                this._path.style.fill = this.fill;
            }
        };
    }
    set fill(str) {
        this._fill = str;
    }
    get fill() {
        return this._fill;
    }
    // something is wonk about this
    applyFill() {
        this._path.style.fill = this.fill;
    }
    draw(x1, y1, x2, y2, r1, r2, labelX, labelY) {
        this._label.x = labelX;
        this._label.y = labelY;
        this._path.d = `M ${r1 * x1} ${-r1 * y1}
                    A ${r1} ${r1} 0 0 0 ${r1 * x2} ${-r1 * y2}
                    L ${r2 * x2} ${-r2 * y2}
                    A ${r2} ${r2} 0 0 1 ${r2 * x1} ${-r2 * y1}
                    Z`;
    }
}
Section.selected = null;
Section.onchange = () => { };
Section.defaultColor = `transparent`;
Section.hoverColor = `#f1f1f1`;
Section.highlightColor = `ffeea8`;
Section.fontSize = '20px';
function render(container, n, m) {
    if (n === null) {
        katex.render(`x\\mod ${m}`, container, {
            displayMode: true,
        });
    }
    else {
        katex.render(`${n}\\mod ${m} = ${n % m}`, container, {
            displayMode: true,
        });
    }
}
//# sourceMappingURL=modular-arithmetic-wheel-new.js.map