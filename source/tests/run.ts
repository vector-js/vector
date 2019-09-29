// model / util tests
import './linked-list.test.js';
import './dependency-graph.test.js';
import './math.test.js';

// interactive tests
import './element.test.js';
import './svg.test.js';
import './group.test.js';
import './interactive.test.js';

mocha.checkLeaks();
mocha.run();
