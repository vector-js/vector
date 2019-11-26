import Rectangle from '../svg/rectangle.js';
import Text from '../svg/text.js';

import Input from './input.js';

/**
* A button that when pressed fires an onclick event.
*/
export default class HoverBox extends Input {

    box: Rectangle;

    label: Text;

    _x: number;

    _xBound: number = null;

    _y:number;

    _yBound: number = null;

    constructor(str:string) {
        super();
        // Create a text element
        this.label = new Text(0, 1, str);
        this.label.root.setAttribute('alignment-baseline','middle');
        this.label.root.style.textAnchor = 'middle';

        this.box = this.rectangle( 0, -16, this.label.length*2 + 16, 32);
        this.box.root.setAttribute('rx', '2px');
        this.box.fill = 'white';
        this.box.stroke = 'black';
        this.box.style.fillOpacity = '0.9';
        this.label.x = this.box.x + this.box.width/2;
        this.appendChild(this.label);

        this._x = this.box.x;
        this._y = this.box.y;
        this.root.setAttribute('visibility','hidden');
    }

    set x(value: number){
        if(this._xBound){
            if(value >= this._xBound - this.box.width)
                value = this._xBound - this.box.width;
        }
        this._x = value;
        this.box.x = this._x;
        this.label.x = this.box.x + this.box.width/2;
    }

    set y(value: number){
        if(this._yBound){
            if(value >= this._yBound - this.box.height)
                value = this._yBound - this.box.height;
            else if(value <= this.box.height)
                value = this.box.height;
        }

        this._y = value;
        this.box.y = this._y - 37;
        this.label.y = this.box.y + this.box.height/2;
    }

    setBounds(x:number, y:number){
        this._xBound = x;
        this._yBound = y;
    }

    setText(str: string){
        this.label.contents = str;
        this.label.x = this.box.x + this.box.width/2;
        this.label.y = this.box.y + this.box.height/2;
        this.box.width = this.label.length*2 + 16;
    }

    updatePosition(x:number,y:number){
        this.x = x;
        this.y = y;
    }

    showHoverBox(){
        this.root.removeAttribute('visibility');
    }

    hideHoverBox(){
        this.root.setAttribute('visibility','hidden');
    }
}