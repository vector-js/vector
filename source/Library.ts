/**
* This file exposes the objects and functionality of our library in one place
* allowing for backward (non-module) compatability using a tool such as rollup
* or webpack.
*/

import Control from './input/Control.js';
import CheckBox from './input/CheckBox.js';
import Slider from './input/Slider.js';
import Ellipse from './elements/Ellipse.js';
import Element from './elements/Element.js';
import Line from './elements/Line.js';
import Path from './elements/Path.js';
import Rectangle from './elements/Rectangle.js';
import Text from './elements/Text.js';

import Interactive from './Interactive.js';
import SVG from './SVG.js';

// Add interactive object to global variables
(window as any).Interactive = Interactive;

// Export object for module use
export {
  Control,
  Element,
  Ellipse,
  Interactive,
  Line,
  Path,
  Rectangle,
  SVG,
  Text
};
