import Element from './element'

export default class Description extends Element {
  constructor() {
    let desc = document.createElementNS( 'http://www.w3.org/2000/svg', 'desc');
    super(desc);
  }
}
