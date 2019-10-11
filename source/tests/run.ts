// model
import './model/linked-list.test.js';
import './model/dependency-graph.test.js';

// util
import './util/math.test.js';

// svg
import './elements/svg/element.test.js';
import './elements/svg/svg.test.js';
import './elements/svg/group.test.js';

// interactive / custom elements
import './elements/interactive.test.js';
import './elements/math/plot.test.js';

// Disabled leak checking because google analytics was causing test failures.
// Possible solution would be to run the tests within an embedded HTML page
// using the iframe element or something.
// mocha.checkLeaks();
mocha.run();
