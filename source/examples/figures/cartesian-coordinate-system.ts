// import Interactive from 'https://unpkg.com/@interactive-svg/library/dist/Interactive.js';
import {Interactive, Point, Control, Path, Text, AnimationPlayer, Circle, Group} from '../../index.js';
import Grid from '../../elements/math/grid.js';

export interface Configuration {


	tics?: number;
	ticStepBig?: number;
	labelStep?: number;
	fixedAngle?: boolean;
}

export class CartesianCoordinateSystem extends Grid {

	constructor( id:string, config:Configuration ) {

	}
}