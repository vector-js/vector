import { StandardAngleFigure } from "../figures/standard-angle.js";
import { TAU } from "../../util/constants.js";

export default function main(id:string) {
	new StandardAngleFigure(id, {
		radius: 100,
		width: 300,
		margin:50,
		radians: true,
		tics: 100,
		ticStepBig: 5,
		labelStep: 10,
		min: 0,
		max: TAU,
		value: TAU/8,
		loop: true
	});
}