import Interactive from '../elements/interactive.js';
import { Slider, Control, Input } from '../index.js';

export interface TemplateConfig {
  interactive?:Interactive
}

/**
* Renders an interactive "template" for creating responsive interactives. This
* generic template renders an interactive with a "header" and "footer" region
* for providing custom information and controls.
*/
export class Template {

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
  constructor(id:string, options:TemplateConfig = {} )  {

    // combine the default configuration with the user's configuration
    let config = { ...Template.config, ...options };

    // get a handle on the parent and resize if necessary
    this.parent = document.getElementById(id);

    this.root = document.createElement('div');
    this.root.classList.add('template');
    this.root.style.display = 'flex';
    this.root.style.flexDirection = 'column';
    this.root.style.maxWidth = '800px';
    this.root.style.margin = 'auto';

    this.header = document.createElement('div');
    this.main = document.createElement('div');
    this.footer = document.createElement('div');

    this.header.classList.add('template-header-region');
    this.main.classList.add('template-main-region');
    this.footer.classList.add('template-footer-region');
    // this.main.style.marginBottom = '1rem';

    this.footer.style.display = 'flex';
    this.footer.style.flexDirection = 'column';

    this.parent.append(this.root);
    this.root.append(this.header, this.main, this.footer);

    // Create or append the existing interactive into the main area
    if( !config.interactive ) {
      this.interactive = new Interactive(this.main);
    } else {
      this.interactive = config.interactive;
      this.main.append(config.interactive.root);
    }
    this.interactive.root.classList.add('template-footer-region');
  }

  addContainer() : Interactive {
    let container = document.createElement('div');
    container.style.display = 'grid';
    container.style.alignItems = 'center';
    let bbox = this.footer.getBoundingClientRect();
    let interactive = new Interactive(container, {
      height:50,
      width: bbox.width - 20
    });
    this.footer.appendChild(container);
    return interactive;
  }

  /**
  *
  */
  addSlider( min:number, max:number, value:number) : Slider {

    let container = document.createElement('div');
    container.style.display = 'grid';
    container.style.alignItems = 'center';

    // get a handle on the parent and resize if necessary
    let bbox = this.footer.getBoundingClientRect();
    let interactive = new Interactive(container, {
      height:20,
      width: bbox.width - 20
    });
    interactive.root.style.overflow = 'visible';

    let slider = interactive.slider(10, 10, {
      min:min,
      max:max,
      value:value,
      width: interactive.width - 20
    });
    // interactive.root.style.border = '1px solid #808080';
    interactive.root.style.borderRadius = '5px';
    interactive.root.style.padding = '10px';

    this.footer.appendChild(container);

    return slider;
  }

  addVariableDisplay( variable:string, control:Input) {

    let container = document.createElement('div');
    container.style.display = 'grid';
    container.style.alignItems = 'center';
    this.footer.appendChild(container);

    let bbox = this.footer.getBoundingClientRect();
    let interactive = new Interactive(container, {
      width: bbox.width - 20,
      height: 50
    });

    if( control instanceof Slider ) {
      let text = interactive.text(interactive.width/2, 25, '');
      text.classList.add('katex-main', 'text-middle');
      text.tspan(variable).classList.add('katex-variable');
      text.tspan(' = ');
      let value = text.tspan(`${Math.floor(control.value)}`);
      text.addDependency(control);
      text.update = () => {
        value.text = `${Math.floor(control.value)}`;
      };
    } else {
      throw new Error('Not Implemented');
    }
  }
}