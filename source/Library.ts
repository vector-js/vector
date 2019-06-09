/**
* This file exposes the objects and functionality of our library in one place
* allowing for backward (non-module) compatability using a tool such as rollup
* or webpack.
*/

import Control from './elements/Control.js';
import Ellipse from './elements/Ellipse.js';
import Element from './elements/Element.js';
import Line from './elements/Line.js';
import Path from './elements/Path.js';
import Rectangle from './elements/Rectangle.js';
import Text from './elements/Text.js';

import Interactive from './Interactive.js';
import SVG from './SVG.js';

// Add to the global (window) namespace
(window as any).Control = Control;
(window as any).Element = Element;
(window as any).Ellipse = Ellipse;
(window as any).Interactive = Interactive;
(window as any).Line = Line;
(window as any).Path = Path;
(window as any).Rectangle = Rectangle;
(window as any).SVG = SVG;
(window as any).Text = Text;

// Export object for module use
export {
  Control,
  Element,
  Ellipse,
  Line,
  Path,
  Rectangle,
  SVG,
  Text
};
