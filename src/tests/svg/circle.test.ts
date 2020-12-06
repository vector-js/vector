import { SVG } from '../..';
import { Circle } from '../../elements/svg/circle'

function createSVG() {
  let container = document.createElement('div');
  let svg = container.appendChild(new SVG().root);
}

beforeEach(() => {
  createSVG();
});

it('renders correctly', () => {
  const circle = new Circle(1, 2, 3)
  expect(circle.root.outerHTML).toMatchSnapshot();
});