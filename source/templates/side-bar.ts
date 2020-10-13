import Interactive from '../elements/interactive';
import { Template } from './template';

export interface TemplateConfig {
  interactive?:Interactive;
  right?:boolean;
}

/**
* Renders an interactive "template" for creating responsive interactives. This
* generic template renders an interactive with a "header" and "footer" region
* for providing custom information and controls.
*/
export class SideBarTemplate extends Template {

  /**
  * The HTMLElement which the template is rendered within.
  */
  parent:HTMLElement;

  /**
  * The root of the template
  */
  root:HTMLDivElement;

  /**
  * The left side bar region of the template
  */
  sidebar:HTMLDivElement;

  /**
  * The main region of the template
  */
  main:HTMLDivElement;

  /**
  * Default configuration for all templates.
  */
  static config = {
    right:false
  };

  /**
  * Constructs a template within the DOM element corresponding to the id. If
  * user configuration is provided, the user configuration is prioritized over
  * the default configuration stored in the Template.config variable.
  */
  constructor(idOrElement:string|HTMLElement, options:TemplateConfig = {} )  {

    super();

    // combine the default configuration with the user's configuration
    let config = { ...SideBarTemplate.config, ...options };

    if (typeof idOrElement == "string") {
      this.parent = document.getElementById(idOrElement);
      if( this.parent === null || this.parent === undefined ) {
        throw new Error(`There is no HTML element with the id: ${idOrElement}`);
      }
    } else {
      this.parent = idOrElement;
    }

    this.root = document.createElement('div');
    this.root.classList.add((options.right ? 'right-side-bar' : 'left-side-bar'));

    this.sidebar = document.createElement('div');
    this.main = document.createElement('div');

    this.sidebar.classList.add('side-bar-region');
    this.main.classList.add('main-region');

    this.parent.append(this.root);
    this.root.append(this.main, this.sidebar);
  }
}