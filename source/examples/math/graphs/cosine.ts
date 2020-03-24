import { Interactive } from "../../../index.js";

export function graph( id:string, title:string, f ) {
	let interactive = new Interactive(id);
	let scaleX = 50;
	let scaleY = 50;
	let plot = interactive.plot(f, {
		title: title,
		scaleX: scaleX,
		scaleY: scaleY,
	});
}

export function cosineGraph(id:string) {
	graph(id, "cosine", Math.cos);
}

export function sineGraph(id:string) {
	graph(id, "sine", Math.cos);
}

export function tangentGraph(id:string) {
	graph(id, "sine", Math.cos);
}
