import UnitedStatesMap from '../../elements/maps/united-states.js';
import Interactive, { getScriptName } from '../../index.js';
let interactive = new Interactive(getScriptName());
let states = new UnitedStatesMap();
interactive.root.appendChild(states.root);
console.log(states);
//# sourceMappingURL=test.js.map