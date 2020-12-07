import { Group, SVG } from '../..';

let group : Group;

beforeEach(() => {
  let container = document.createElement('div');
  document.body.appendChild(container);
  let svg = SVG.SVG(container);
  group = svg.group();
});

describe('group', () => {

  it('should render a circle with cx=1 cy=2 and r=3', () => {
    const element = group.circle(1,2,3);
    expect(document.getElementById(element.id)).toMatchSnapshot();
  });

  it('should render an ellipse with cx=1 cy=2 rx=3 and ry=4', () => {
    const element = group.ellipse(1,2,3,4);
    expect(document.getElementById(element.id)).toMatchSnapshot();
  });

  it('should render a line with x1=1 y1=2 x2=3 and y2=4', () => {
    const element = group.line(1,2,3,4);
    expect(document.getElementById(element.id)).toMatchSnapshot();
  });

  it('should render a path with d="M1 2 L 2 3"', () => {
    const element = group.path('M1 2 L 3 4');
    expect(document.getElementById(element.id)).toMatchSnapshot();
  });

  it('should render a polygon with points="1,2 3,4"', () => {
    const element = group.polygon('1,2 3,4');
    expect(document.getElementById(element.id)).toMatchSnapshot();
  });

  it('should render a rectangle with x=1 y=2 width=3 and height=4', () => {
    const element = group.rectangle(1,2,3,4);
    expect(document.getElementById(element.id)).toMatchSnapshot();
  });
  
});