import Control from './elements/Control';
import Ellipse from './elements/Ellipse';
import Element from './elements/Element';
import Line from './elements/Line';
import Path from './elements/Path';
import Rectangle from './elements/Rectangle';
import SVG from './elements/SVG';
import Text from './elements/Text';

// Add to the global (window) namespace
(window as any).Control = Control;
(window as any).Element = Element;
(window as any).Ellipse = Ellipse;
(window as any).Line = Line;
(window as any).Path = Path;
(window as any).Rectangle = Rectangle;
(window as any).SVG = SVG;
(window as any).Text = Text;

export {
  Control,
  Element,
  Ellipse,
  Line,
  Path,
  Rectangle
};
