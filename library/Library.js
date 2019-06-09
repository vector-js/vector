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
window.Control = Control;
window.Element = Element;
window.Ellipse = Ellipse;
window.Interactive = Interactive;
window.Line = Line;
window.Path = Path;
window.Rectangle = Rectangle;
window.SVG = SVG;
window.Text = Text;
// Export object for module use
export { Control, Element, Ellipse, Line, Path, Rectangle, SVG, Text };
