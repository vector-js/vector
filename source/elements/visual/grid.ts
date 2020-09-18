import { SVG } from "../../index.js";

/**
* A grid is
*/
export default class Grid {

	constructor() {

	}

	/**
	* Sets the top-left x position of the grid.
	*/
	set x( x:number ) {
		throw new Error('not implemented');
	}

	/**
	* Returns the top-left x position of the grid.
	*/
	get x() : number {
		throw new Error('not implemented');
	}

	/**
	* Sets the top-left y position of the grid.
	*/
	set y( x:number ) {
		throw new Error('not implemented');
	}

	/**
	* Returns the top-left y position of the grid.
	*/
	get y() : number {
		throw new Error('not implemented');
	}

	/**
	* Returns the width of the grid measured from left to right.
	*/
	get width() : number {
		throw new Error('not implemented');
	}

	/**
	* Returns the height of the grid measured from top to bottom.
	*/
	get height() : number {
		throw new Error('not implemented');
	}

	/**
	* Sets the horizontal scaling of the grid object.
	*/
	set scaleX( scale:number ) {
		throw new Error('not implemented');
	}

	/**
	* Returns the horizontal scaling of the grid object.
	*/
	get scaleX() : number {
		throw new Error('not implemented');
	}

	/**
	* Sets the vertical scaling of the grid object.
	*/
	set scaleY( scale:number ) {
		throw new Error('not implemented');
	}

	/**
	* Returns the vertical scaling of the grid object.
	*/
	get scaleY() : number {
		throw new Error('not implemented');
	}

	/**
	* Sets the x position of the origin of the grid.
	*/
	set originX( scale:number ) {
		throw new Error('not implemented');
	}

	/**
	* Returns the x position of the origin of the grid.
	*/
	get originX() : number {
		throw new Error('not implemented');
	}

	/**
	* Sets the y position of the origin of the grid. NOTE: While the coordinate
	* system of the grid is measured in typical math orientation where up is
	* positive, this measurement is a top down measurement to the origin.
	*/
	set originY( scale:number ) {
		throw new Error('not implemented');
	}

	/**
	* Returns the y position of the origin of the grid. NOTE: While the coordinate
	* system of the grid is measured in typical math orientation where up is
	* positive, this measurement is a top down measurement to the origin.
	*/
	get originY() : number {
		throw new Error('not implemented');
	}

}