import Interactive from '../elements/interactive'
import Slider from '../elements/input/slider'
import Input from '../elements/input/input'
import { Template } from './template';

export interface TemplateConfig {
  interactive?:Interactive
}

/**
* Renders an interactive "template" for creating responsive interactives. This
* generic template renders an interactive with a "header" and "footer" region
* for providing custom information and controls.
*/
export class PancakeTemplate extends Template {

  /**
  * The HTMLElement which the template is rendered within.
  */
  parent:HTMLElement;

  /**
  * The root of the template
  */
  root:HTMLDivElement;

  /**
  * The header region of the template
  */
  header:HTMLDivElement;

  /**
  * The main region of the template
  */
  main:HTMLDivElement;

  /*
  * The footer region of the template
  */
  footer:HTMLDivElement;

  /**
  * The interactive element
  */
  interactive:Interactive;

  /**
  * Default configuration for all templates.
  */
  static config = {

  }

  /**
  * Constructs a template within the DOM element corresponding to the id. If
  * user configuration is provided, the user configuration is prioritized over
  * the default configuration stored in the Template.config variable.
  */
  constructor(idOrElement:string|HTMLElement, options:TemplateConfig = {} )  {

    super();

    let defaultConfig = {};

    // combine the default configuration with the user's configuration
    let config = { ...defaultConfig, ...options };

    if (typeof idOrElement == "string") {
      this.parent = document.getElementById(idOrElement);
      if( this.parent === null || this.parent === undefined ) {
        throw new Error(`There is no HTML element with the id: ${idOrElement}`);
      }
    } else {
      this.parent = idOrElement;
    }

    this.root = document.createElement('div');
    this.root.classList.add('pancake');

    this.header = document.createElement('div');
    this.main = document.createElement('div');
    this.footer = document.createElement('div');

    this.header.classList.add('header-region');
    this.main.classList.add('main-region');
    this.footer.classList.add('footer-region');

    this.footer.style.display = 'flex';
    this.footer.style.flexDirection = 'column';

    this.parent.append(this.root);
    this.root.append(this.header, this.main, this.footer);

  }

}