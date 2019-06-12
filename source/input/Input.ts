import Element from '../elements/Element.js';

export default class Input extends Element {

  set label( label:string ) {
    this.root.setAttribute('data-label', label);
  }

  set description( description:string ) {
    this.root.setAttribute('data-description', description);

  }

}
