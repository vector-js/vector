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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlicmFyeS5qcyIsInNvdXJjZVJvb3QiOiIuL3NvdXJjZS8iLCJzb3VyY2VzIjpbIkxpYnJhcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7RUFJRTtBQUVGLE9BQU8sT0FBTyxNQUFNLHVCQUF1QixDQUFDO0FBQzVDLE9BQU8sT0FBTyxNQUFNLHVCQUF1QixDQUFDO0FBQzVDLE9BQU8sT0FBTyxNQUFNLHVCQUF1QixDQUFDO0FBQzVDLE9BQU8sSUFBSSxNQUFNLG9CQUFvQixDQUFDO0FBQ3RDLE9BQU8sSUFBSSxNQUFNLG9CQUFvQixDQUFDO0FBQ3RDLE9BQU8sU0FBUyxNQUFNLHlCQUF5QixDQUFDO0FBQ2hELE9BQU8sSUFBSSxNQUFNLG9CQUFvQixDQUFDO0FBRXRDLE9BQU8sV0FBVyxNQUFNLGtCQUFrQixDQUFDO0FBQzNDLE9BQU8sR0FBRyxNQUFNLFVBQVUsQ0FBQztBQUUzQix1Q0FBdUM7QUFDdEMsTUFBYyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDakMsTUFBYyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDakMsTUFBYyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDakMsTUFBYyxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7QUFDekMsTUFBYyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDM0IsTUFBYyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDM0IsTUFBYyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7QUFDckMsTUFBYyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFDekIsTUFBYyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFFNUIsK0JBQStCO0FBQy9CLE9BQU8sRUFDTCxPQUFPLEVBQ1AsT0FBTyxFQUNQLE9BQU8sRUFDUCxJQUFJLEVBQ0osSUFBSSxFQUNKLFNBQVMsRUFDVCxHQUFHLEVBQ0gsSUFBSSxFQUNMLENBQUMifQ==