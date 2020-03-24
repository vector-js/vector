import { Interactive } from "../../../index.js";
export function graph(id, title, f) {
    let interactive = new Interactive(id);
    let scaleX = 50;
    let scaleY = 50;
    let plot = interactive.plot(f, {
        title: title,
        scaleX: scaleX,
        scaleY: scaleY,
    });
}
export function cosineGraph(id) {
    graph(id, "cosine", Math.cos);
}
export function sineGraph(id) {
    graph(id, "sine", Math.cos);
}
export function tangentGraph(id) {
    graph(id, "sine", Math.cos);
}
//# sourceMappingURL=cosine.js.map