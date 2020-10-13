import SVG from "../elements/svg/svg";
import { Group } from "../index";

type alignment = 'left' | 'center' | 'right';

interface Configuration {
    align?:string;
    origin?:string;
}

/**
 * A responsive SVG document that is optimized to prevent cumulative layout shift in the browser 
 * and draw SVG documents within a horizontally constrained vertical layout.
 */
export class SVGOverflowTemplate extends SVG {

    private _grid : Group;
    private _lines1 : Group;
    private _lines2 : Group;

    /**
     * Constructs a responsive SVG Document that is optimized to prevent cumulative layout shift in 
     * the browser. The width and height measurements are used to define 1) the aspect ratio of the 
     * rendered SVG and 2) the internal coordinate system used for drawing. The maxWidth argument 
     * optionally specifies the maximum display width of the SVG, otherwise the default is to fill 
     * the availablespace.
     */
    constructor( width:number, height:number, config:Configuration ) {

        let defaultConfig = {
            origin: 'default'
        }

        // Construct a SVG with the provided dimensions
        super(width, height);

        // Combine default with custom config. where custom has precedence
        config = { ...defaultConfig, ...config};

        // Fill available space
		this.root.style.display = 'block';
		this.root.style.maxWidth = '100%';
		this.root.style.height = 'auto';

		switch(config.align) {
			case 'center':
				this.root.style.margin = 'auto';
				break;
			case 'right':
				this.root.style.marginLeft = 'auto';
                break;
            case 'left':
                this.root.style.marginRight = 'auto';
                break;
            default:
                throw new Error(`Unknown alignment option: ${config.align}.`);
        }

        // Define the origin used for drawing
        switch(config.origin) {
            case 'center':
                this.setViewBox(-width/2, -height/2, width, height);
                break;
            case 'centerY':
                this.setViewBox(0, -height/2, width, height);
                break;
            case 'default':
                this.setViewBox(0, 0, width, height);
                break;
            default:
                throw new Error(`Unrecognized origin: ${origin}. Please provide a valid orign`);
        }
    }

    /**
     * This helper method draws a grid to visualize the coordinate system used for drawing SVG 
     * ELements.
     */
    drawGrid() {

        if( !this._grid ) {
            this._grid = this.group();
            this._lines1 = this._grid.group();
            this._lines2 = this._grid.group();
    
            this._lines1.style.stroke = '#fafafa';
            this._lines2.style.stroke = '#eeeeee';
    
            let viewBox = this.root.viewBox.baseVal;
            // let x = viewBox.x;
            // let y = viewBox.y;
            // let width = viewBox.width;
            // let height = viewBox.height;
            let max = 1000;
            let x = -max;
            let y = -max;
            let width = 2*max;
            let height = 2*max;
            let xMax = x + width;
            let yMax = y + height;
    
            let origin = this._grid.circle(0,0,3);
            origin.style.fill = '#81cfd9';
            origin.style.stroke = '#485bfc';
            origin.style.strokeWidth = '1px';
            
            for( let i = Math.floor(x/10)*10; i < xMax; i += 10) {
            
                let group = this._lines1;;
                if( i % 100 === 0) {
                    group = this._lines2;
                }
                group.line(i, y, i, yMax);
            }
            for( let i = Math.floor(y/10)*10; i < yMax; i += 10) {
            
                let group = this._lines1;;
                if( i % 100 === 0) {
                    group = this._lines2;
                }
                group.line(x, i, xMax, i);
            }
    
            let rect = this.rect(0,0,this.width, this.height);
            rect.style.strokeWidth = '1px';
            rect.style.stroke = 'blue';
            rect.style.fill = 'none';
        }
    }
}