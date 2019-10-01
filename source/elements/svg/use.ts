import Element from '../element.js';

export default class Use extends Element {
  constructor() {
    let use = document.createElementNS( 'http://www.w3.org/2000/svg', 'use');
    super(use);
  }
}
