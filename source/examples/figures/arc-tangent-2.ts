// import Interactive from 'https://unpkg.com/@interactive-svg/library/dist/Interactive.js';
import {Interactive, Point, Control, Path, Text, AnimationPlayer, Circle, Group} from '../../index.js';
import { TAU } from '../../util/constants.js';

export interface Configuration {

	radius?:number;
	width?:number;
	margin?:number;
	radians?:boolean;
	smallRadius?:number;

	pointRadius?:number;
	pointAngle?:number;

	tics?: number;
	ticStepBig?: number;
	labelStep?: number;
	fixedAngle?: boolean;
}

/**
*
*/
export class ArcTangent2 extends Interactive {

	constructor(id:string, config:Configuration) {
    super(id);
  }



}