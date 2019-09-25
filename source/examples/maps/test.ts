import UnitedStatesMap from '../../maps/united-states.js';
import Interactive from '../../interactive.js';
import { getScriptName } from '../../util.js';

let interactive = new Interactive(getScriptName());

let states = new UnitedStatesMap();
interactive.root.appendChild(states.root);
console.log(states);
