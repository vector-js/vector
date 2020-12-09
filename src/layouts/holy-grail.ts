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
export class HolyGrailLayout extends Layout {

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
  * The left side bar region of the template
  */
  left:HTMLDivElement;

  /**
  * The main region of the template
  */
  main:HTMLDivElement;

  /**
  * The right side bar region of the template
  */
  right:HTMLDivElement;

  /*
  * The footer region of the template
  */
  footer:HTMLDivElement;


  /**
  * Default configuration for all templates.
  */
  static config:  Configuration= {

  }

  /**
  * Constructs a template within the DOM element corresponding to the id. If
  * user configuration is provided, the user configuration is prioritized over
  * the default configuration stored in the Template.config variable.
  */
  constructor(idOrElement:string|HTMLElement, options:Configuration = {} )  {

    super(idOrElement);

    // combine the default configuration with the user's configuration
    let config = { ...HolyGrailLayout.config, ...options };

    this.root = document.createElement('div');
    this.root.classList.add('holy-grail');

    this.header = document.createElement('div');
    this.left = document.createElement('div');
    this.main = document.createElement('div');
    this.right = document.createElement('div');
    this.footer = document.createElement('div');

    this.header.classList.add('header-region');
    this.left.classList.add('left-region');
    this.main.classList.add('main-region');
    this.right.classList.add('right-region');
    this.footer.classList.add('footer-region');

    this.footer.style.display = 'flex';
    this.footer.style.flexDirection = 'column';

    this.container.append(this.root);
    this.root.append(this.header, this.left, this.main, this.right, this.footer);

    // Create or append the existing interactive into the main area
    // if( !config.interactive ) {
    //   this.interactive = new Interactive(this.main);
    // } else {
    //   this.interactive = config.interactive;
    //   this.main.append(config.interactive.root);
    // }
    // this.interactive.root.classList.add('template-footer-region');
  }

}