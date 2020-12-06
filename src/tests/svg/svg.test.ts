import { SVG } from '../..';
import { Circle } from '../../elements/svg/circle'

let svg : SVG;

beforeEach(() => {
  let container = document.createElement('div');
  document.body.appendChild(container);
  svg = SVG.SVG(container);
});

it('creates circle', () => {
  const element = svg.circle(2,3,5);
  expect(document.getElementById(element.id)).toMatchSnapshot();
});

it('creates rectangle', () => {
  const element = svg.rectangle(2,3,5, 7);
  expect(document.getElementById(element.id)).toMatchSnapshot();
});

it('creates ellipse', () => {
  const element = svg.ellipse(2,3,5, 7);
  expect(document.getElementById(element.id)).toMatchSnapshot();
});