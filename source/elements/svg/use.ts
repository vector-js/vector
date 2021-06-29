import Element from './element.js';

export default class Use extends Element {

	// make the type of root more specific
	declare root: SVGUseElement;

  constructor(x:number, y:number, width:number, height:number) {
    let element = document.createElementNS( 'http://www.w3.org/2000/svg', 'use');
		element.setAttributeNS(null, 'x', x.toString());
    element.setAttributeNS(null, 'y', y.toString());
    element.setAttributeNS(null, 'width', width.toString());
    element.setAttributeNS(null, 'height', height.toString());
    super(element);
  }

	get href() : string {
		return this.root.href.baseVal;
	}

	set href( value:string ) {
		this.root.href.baseVal = value;
	}

	/**
  * Returns the x position of the rectangle
  */
  get x() : number {
    return this.root.x.baseVal.value;
  }

  /**
  * Sets the x position of the rectangle
  */
  set x( n:number ) {
    this.root.x.baseVal.value = n;
  }

  /**
  * Returns the y position of the rectangle
  */
  get y():number {
    return this.root.y.baseVal.value;
  }

  /**
  * Sets the y position of the rectangle
  */
  set y( n:number){
    this.root.y.baseVal.value = n;
  }

  /**
  * Returns the width of the rectangle
  */
  get width() : number {
    return this.root.width.baseVal.value;
  }

  /**
  * Sets the width of the rectangle
  */
  set width( n:number ) {
    this.root.width.baseVal.value = n;
  }

  /**
  * Returns the height of the rectangle
  */
  get height() : number {
    return this.root.height.baseVal.value;
  }

  /**
  * Sets the height of the rectangle
  */
  set height( n:number ) {
    this.root.height.baseVal.value = n;
  }

}
