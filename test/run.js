// model / util tests
import '../dist/tests/linked-list.test.js';
import '../dist/tests/dependency-graph.test.js';
import '../dist/tests/math.test.js';

// interactive tests
import '../dist/tests/element.test.js';
import '../dist/tests/interactive.test.js';
import '../dist/tests/svg.test.js';

mocha.checkLeaks();
mocha.run();
