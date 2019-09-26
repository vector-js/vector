import Group from '../svg/group.js';

export default class Icon extends Group {

  constructor( x:number, y:number ) {
    super();
    // TODO: make this a default behavior
    this.root.setAttribute('transform',`translate(${x}, ${y})`);
    this.root.classList.add('icon');
  }
}
