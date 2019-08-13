// import Interactive from 'https://unpkg.com/@interactive-svg/library/dist/Interactive.js';
import Interactive from '../../Interactive.js';
import { getScriptName } from '../../Util.js';
// Initialize the interactive
let interactive = new Interactive(getScriptName());
interactive.width = 300;
interactive.height = 150;
let button = interactive.button(100, 75, 'My Button');
//# sourceMappingURL=button-element.js.map