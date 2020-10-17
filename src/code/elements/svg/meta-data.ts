import Element from './element'

export default class MetaData extends Element {
  constructor() {
    let metadata = document.createElementNS( 'http://www.w3.org/2000/svg', 'metadata');
    super(metadata);
  }
}
