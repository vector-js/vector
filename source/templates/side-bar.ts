import Interactive from '../elements/interactive'
import Slider from '../elements/input/slider'
import Input from '../elements/input/input'

export interface TemplateConfig {
  interactive?:Interactive
}

/**
* Renders an interactive "template" for creating responsive interactives. This
* generic template renders an interactive with a "header" and "footer" region
* for providing custom information and controls.
*/
export class SideBar {

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

  }

  /**
  * Constructs a template within the DOM element corresponding to the id. If
  * user configuration is provided, the user configuration is prioritized over
  * the default configuration stored in the Template.config variable.
  */
  constructor(id:string, options:TemplateConfig = {} )  {

    // combine the default configuration with the user's configuration
    let config = { ...SideBar.config, ...options };

    // get a handle on the parent and resize if necessary
    this.parent = document.getElementById(id);

    this.root = document.createElement('div');
    this.root.classList.add('side-bar');

    this.sidebar = document.createElement('div');
    this.main = document.createElement('div');

    this.sidebar.classList.add('sidebar-region');
    this.main.classList.add('main-region');

    this.parent.append(this.root);
    this.root.append(this.main, this.sidebar);
  }

  addContainer( region:HTMLDivElement ) : Interactive {
    let container = document.createElement('div');
    container.classList.add('display-box');
    let interactive = new Interactive(container, {
      height:50,
      width: 200
    });
    region.appendChild(container);
    return interactive;
  }

  /**
  *
  */
  addSlider( region:HTMLDivElement, min:number, max:number, value:number) : Slider {

    let container = document.createElement('div');
    container.classList.add('display-box');

    // get a handle on the parent and resize if necessary
    let bbox = region.getBoundingClientRect();
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

    region.appendChild(container);

    return slider;
  }

  addVariableDisplay( region:HTMLDivElement, variable:string, control:Input) : HTMLDivElement {

    let container = document.createElement('div');
    container.classList.add('display-box');
    region.appendChild(container);

    let bbox = region.getBoundingClientRect();
    let interactive = new Interactive(container, {
      width: 200,
      height: 50
    });

    interactive.root.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    interactive.root.setAttribute('width', '100%');

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

    return container;
  }
}