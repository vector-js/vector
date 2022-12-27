// model
import './model/linked-list.test.js';
import './model/dependency-graph.test.js';
// util
import './util/math.test.js';
// base svg element
import './elements/svg/element.test.js';
// svg
import './elements/svg/circle.test.js';
import './elements/svg/ellipse.test.js';
import './elements/svg/group.test.js';
import './elements/svg/line.test.js';
import './elements/svg/polygon.test.js';
import './elements/svg/path.test.js';
import './elements/svg/rectangle.test.js';
import './elements/svg/svg.test.js';
import './elements/svg/circle.test.js';
import './elements/svg/ellipse.test.js';
import './elements/svg/polygon.test.js';
import './elements/svg/path.test.js';
import './elements/svg/text.test.js';
import './elements/svg/line.test.js';
import './elements/svg/text.test.js';
// interactive / custom elements
import './elements/interactive.test.js';
import './elements/geometry.test.js';
// input tests
import './elements/input/control.test.js';
// plot tests
import './elements/math/plot.test.js';
import './elements/maps/map.test.js';
// math
// import './math/interactives.test.js';
// import './math/modular-arithmetic-wheel.script.js';
// article interactives
import './articles/color.test.js';
import './articles/waves.test.js';
// graph
import './elements/graph/node.test.js';
// Disabled leak checking because google analytics was causing test failures.
// Possible solution would be to run the tests within an embedded HTML page
// using the iframe element or something.
// mocha.checkLeaks();
mocha.run();
//# sourceMappingURL=run.js.map