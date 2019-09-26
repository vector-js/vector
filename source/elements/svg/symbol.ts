import Element from '../element.js';

export default class Symbol extends Element {

  constructor() {
    let symbol = document.createElementNS( 'http://www.w3.org/2000/svg', 'symbol');
    super(symbol);
  }

}
