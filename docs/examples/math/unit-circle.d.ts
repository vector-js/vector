/**
* @title Unit Circle
* @description This interactive demonstrates the properties of the unit circle in relation to the trigonometric functions sine, cosine, and tangent.
* @tags [math]
* @date October 9, 2019
* @author Kurt Bruns
* @weight 1
*/
interface InteractiveOptions {
    angle?: number;
    func?: (x: number) => number;
}
/**
* This main interactive contains the four components: the unit circle, the
* function graph, the variables, and the trigonometric functions.
*/
export default function main(id: string, opts: InteractiveOptions): void;
export {};
