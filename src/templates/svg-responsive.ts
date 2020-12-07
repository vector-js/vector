import {Group} from "../elements/svg/group";
import {SVG} from "../elements/svg/svg";
import { Control, Input, Element } from "../index";

interface Configuration {
    maxWidth?:number;
    origin?:string;
    responsive?:boolean;
}

/**
 * A responsive SVG document that is optimized to prevent cumulative layout shift in the browser 
 * and draw SVG documents within a horizontally constrained vertical layout.
 */
export class SVGResponsiveTemplate extends SVG {

    private _grid : Group;
    private _lines1 : Group;
    private _lines2 : Group;

    controls : Group;
    background : Group;

    /**
     * Constructs a responsive SVG Document that is optimized to prevent cumulative layout shift in 
     * the browser. The width and height measurements are used to define 1) the aspect ratio of the 
     * rendered SVG and 2) the internal coordinate system used for drawing. The maxWidth argument 
     * optionally specifies the maximum display width of the SVG, otherwise the default is to fill 
     * the availablespace.
     */
    constructor( width:number, height:number, config:Configuration = {} ) {

        let defaultConfig = {
            origin: 'default',
            responsive: true,
        }

        // Construct a SVG with the provided dimensions
        super(width, height);

        // Combine default with custom config. where custom has precedence
        config = { ...defaultConfig, ...config};

        // Fill available space
        if( config.responsive ) {
          this.classList.add('responsive');
        }
        if( config.maxWidth ) {
            // Added px unit because firefox fails to set max-width if no unit is specified
            this.root.style.maxWidth = `${config.maxWidth}px`;
            this.root.style.margin = 'auto';
        }

        // Define the origin used for drawing
        switch(config.origin) {
            case 'center':
                this.setViewBox(-width/2, -height/2, width, height);
                break;
            case 'centerY':
                this.setViewBox(0, -height/2, width, height);
                break;
            case 'topLeft':
            case 'default':
                this.setViewBox(0, 0, width, height);
                break;
            default:
                throw new Error(`Unrecognized origin: ${origin}. Please provide a valid orign`);
        }

        // TODO: this is ugly, either template should extend the interactive object, or ... something better than this
        // TLDR: Duplicate code here and in Interactive
        this.background = new Group();
        this.controls = new Group();
        this.root.appendChild(this.background.root);
        this.root.appendChild(this.controls.root)
    }

    /**
     * Creates a control point within this interactive at the position (x,y).
     */
    control( x:number, y:number ) : Control {
        return this.controls.appendChild(new Control( x, y));
    }

        /**
     * Appends the element within the interactive. If the element is an "input"
     * element, places the element in the input group so that visually the element
     * is always placed above other graphical elements.
     */
    appendChild<T extends Element>( child:any ) : T {
      if( child instanceof Input ) {
          this.controls.appendChild(child);
      } else {
          this.background.appendChild(child);
      }
      return child;
  }


    /**
     * This helper method draws a grid to visualize the coordinate system used for drawing SVG 
     * ELements.
     */
    drawGrid( border:boolean = true, origin:boolean = true) {

        if( !this._grid ) {
            this._grid = this.group();
            this._lines1 = this._grid.group();
            this._lines2 = this._grid.group();
    
            this._lines1.style.stroke = 'var(--light1)';
            this._lines2.style.stroke = 'var(--light2)';
    
            let viewBox = this.root.viewBox.baseVal;
            let x = viewBox.x;
            let y = viewBox.y;
            let width = viewBox.width;
            let height = viewBox.height;
            let xMax = x + width;
            let yMax = y + height;
            
            if( origin ) {
                let origin = this._grid.circle(0,0,3);
                origin.classList.add('outline')
                origin.style.fill = '#81cfd9';
            }
            
            for( let i = Math.floor(x/10)*10; i <= xMax; i += 10) {
            
                let group = this._lines1;;
                if( i % 100 === 0) {
                    group = this._lines2;
                }
                group.line(i, y, i, yMax);
            }
            for( let i = Math.floor(y/10)*10; i <= yMax; i += 10) {
            
                let group = this._lines1;;
                if( i % 100 === 0) {
                    group = this._lines2;
                }
                group.line(x, i, xMax, i);
            }

            if( border ) {
                let rect = this.rect(x,y,width, height);
                rect.style.strokeWidth = '2px';
                rect.style.stroke = '#dddddd';
                rect.style.fill = 'none';
            }
        }
    }
}