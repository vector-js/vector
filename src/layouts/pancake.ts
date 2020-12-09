import { Slider } from '../elements/input/slider'
import { Input } from '../elements/input/input'
import { Layout } from './layout';
import { Artboard } from '../index';

export interface Configuration {
  artboard?:Artboard
}

/**
* Renders an interactive "template" for creating responsive interactives. This
* generic template renders an interactive with a "header" and "footer" region
* for providing custom information and controls.
*/
export class PancakeLayout extends Layout {

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
  artboard:Artboard;

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
  constructor(idOrElement:string|HTMLElement, options:Configuration = {} )  {

    super(idOrElement);

    let defaultConfig = {};

    // combine the default configuration with the user's configuration
    let config = { ...defaultConfig, ...options };

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

    this.container.append(this.root);
    this.root.append(this.header, this.main, this.footer);

  }

}