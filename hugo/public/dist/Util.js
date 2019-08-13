/**
* Returns the current script name.
*/
export function getScriptName(trimExtension = true) {
    // Variables
    let error = new Error();
    let source;
    let lastStackFrameRegex = new RegExp(/.+\/(.*?):\d+(:\d+)*$/);
    let currentStackFrameRegex = new RegExp(/getScriptName \(.+\/(.*):\d+:\d+\)/);
    let name;
    // Get the script name
    if ((source = lastStackFrameRegex.exec(error.stack.trim())) && source[1] != "") {
        name = source[1];
    }
    else if ((source = currentStackFrameRegex.exec(error.stack.trim()))) {
        name = source[1];
    }
    else {
        return error.message;
    }
    // Return name
    if (trimExtension) {
        let position = name.lastIndexOf(".");
        return name.substr(0, position);
    }
    else {
        return name;
    }
}
/**
* Returns the point where two lines intersect. The first line is defined by the
* points p1 and p2. The second line is defined by the points p3 and p4.
*/
export function PointWhereTwoLinesIntersect(p1, p2, p3, p4) {
    let slope1 = (p2.y - p1.y) / (p2.x - p1.x);
    let slope2 = (p4.y - p3.y) / (p4.x - p3.x);
    let b1 = (p2.y - p2.x * slope1);
    let b2 = (p4.y - p4.x * slope2);
    let x = (b2 - b1) / (slope1 - slope2);
    let y;
    if (!isFinite(slope1)) {
        x = p1.x;
        y = p3.y + slope2 * (x - p3.x);
    }
    else if (!isFinite(slope2)) {
        x = p3.x;
        y = p1.y + slope1 * (x - p1.x);
    }
    else {
        y = p1.y + slope1 * (x - p1.x);
    }
    return { x: x, y: y };
}
//# sourceMappingURL=Util.js.map