import SVG from "../elements/svg/svg";
import { Group } from "../index";

interface Configuration {
    maxWidth?:number;
    origin?:string;
}

/**
 * A responsive SVG document that is optimized to prevent cumulative layout shift in the browser 
 * and draw SVG documents within a horizontally constrained vertical layout.
 */
export class SVGResponsiveTemplate extends SVG {

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
        this.root.style.width = '100%';
        this.root.style.height = 'auto';
        this.root.style.display = 'block';
        if( config.maxWidth ) {
            this.root.style.maxWidth = `${config.maxWidth}`;
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
            let x = viewBox.x;
            let y = viewBox.y;
            let width = viewBox.width;
            let height = viewBox.height;
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
    
            let rect = this.rect(x,y,width, height);
            rect.style.strokeWidth = '2px';
            rect.style.stroke = 'blue';
            rect.style.fill = 'none';
        }
    }
}