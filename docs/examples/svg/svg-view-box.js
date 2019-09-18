/**
* @title SVG View Box Attribute
* @description This interactive demonstrates how the view box attribute can be applied to a SVG element to change the view port of the image.
* @tags [svg]
*/
import Interactive from '../../interactive.js';
import { getScriptName } from '../../util.js';
let viewBoxControl = new Interactive(getScriptName());
viewBoxControl.border = true;
viewBoxControl.width = 704 / 2;
let viewBox = new Interactive(getScriptName());
viewBox.border = true;
viewBox.width = 704 / 2;
let margin = 30;
for (let i = margin; i < viewBoxControl.width - margin; i += margin) {
    for (let j = margin; j < viewBoxControl.height - margin; j += margin) {
        let r1 = viewBoxControl.rectangle(i, j, 10, 10);
        let r2 = viewBox.rectangle(i, j, 10, 10);
        let red = Math.floor(255 * i / (viewBoxControl.width - margin));
        let green = Math.floor(255 * j / (viewBoxControl.height - margin));
        r1.style.fill = `rgb(${red}, ${green}, 255)`;
        r2.style.fill = `rgb(${red}, ${green}, 255)`;
        r1.style.opacity = '.7';
        r2.style.opacity = '.7';
    }
}
let rect = viewBoxControl.rectangle(0, 0, 0, 0);
rect.root.style.strokeWidth = '1.5px';
let c1 = viewBoxControl.control(110, 110);
let c2 = viewBoxControl.control(110 + 90, 110 + 90 * viewBox.height / viewBox.width);
c2.update = function () {
    this.x += c1.dx;
    this.y += c1.dy;
};
c2.addDependency(c1);
rect.update = function () {
    this.x = c1.x;
    this.y = c1.y;
    this.width = c2.x - c1.x;
    this.height = c2.y - c1.y;
};
rect.update();
rect.addDependency(c1);
rect.addDependency(c2);
viewBox.addDependency(rect);
viewBox.update = function () {
    if (rect.width < 0 || rect.height < 0) {
    }
    else {
        viewBox.setViewBox(rect.x, rect.y, rect.width, rect.height);
    }
};
viewBox.update();
//# sourceMappingURL=svg-view-box.js.map