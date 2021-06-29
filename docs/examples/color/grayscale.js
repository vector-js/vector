/**
* @title Grayscale Interactive
* @description This interactive demonstrates the range of possible gray values from black to white.
* @tags [color]
* @ignore false
* @date 2020-01-16
* @author Kurt Bruns
*/
import { Interactive } from "../../index.js";
let defaultConfig = {
    n: 360,
    width: 720,
    height: 100
};
/**
* Constructs a rectangle that draws a grayscale spectrum from black to white,
* left to right. The variable n controls how many sub-rectangles
*/
export default function main(id, config = defaultConfig) {
    // accept user options over default configuration
    config = { ...defaultConfig, ...config };
    // construct a narrow, wide interactive
    let myInteractive = new Interactive(id, {
        width: 720,
        height: config.height,
        border: true
    });
    // controls how many sub-rectangles there are that make up the gradient scale
    let n = config.n;
    // loop through and draw rectangle the increasingly get lighter
    let width = myInteractive.width / n;
    for (let i = 0; i < n; i++) {
        let x = (i / n) * myInteractive.width;
        let y = 0;
        let rect = myInteractive.rectangle(x, y, width, myInteractive.height);
        let value = i / (n - 1) * 255;
        rect.style.fill = `rgb( ${value}, ${value}, ${value})`;
    }
}
//# sourceMappingURL=grayscale.js.map