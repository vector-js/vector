import * as AColorPicker from '../node_modules/a-color-picker/dist/acolorpicker';
import SVG from "./shapes/svg";
/**
* This file contains code for initializing the view of our web application. The
* implemenation relies heavily on the contents of the index.html file, as html
* elements are selected and manipulated with the javascript found here.
*/
export default class View {
    /**
    * Constructs and initializes the view of the application. Registers basic
    * event listeners for basic UI logic.
    */
    constructor() {
        // Variables that contain the state of the view
        this.changeFill = false;
        this.changeStroke = false;
        this.activeTools = true;
        this.openPanel = false;
        this.resize = false;
        this.activeModal = null;
        this.activeMenu = null;
        this.activeTool = document.querySelector('#select-shape');
        this.fillToolRect = document.getElementById('fill-tool-rect');
        this.strokeToolRect = document.getElementById('stroke-tool-rect');
        // Elements of the view
        this.tools = document.querySelector('#tools');
        this.toolsContainer = document.querySelector('#tools-container');
        this.menu = document.querySelector('#menu');
        this.editor = document.querySelector('#editor');
        this.drawingArea = document.querySelector('#drawing-area');
        this.drawing = document.querySelector('#drawing');
        this.divider = document.querySelector('#divider');
        this.runButton = document.querySelector('#run-button');
        this.editPreviewToggle = document.querySelector('#edit-preview-checkbox');
        this.dividerHandle = document.querySelector('#divider-handle');
        this.sidePanelContainer = document.querySelector('#side-panel-container');
        this.sidePanel = document.querySelector('#side-panel');
        this.panel = document.querySelector('#open-right-panel');
        this.tab = document.querySelector('#panel-tab');
        this.circle = document.querySelector('#circle-tab');
        this.settingsModal = document.querySelector('#settings-modal');
        this.searchModal = document.querySelector('#search-modal');
        this.rightClickMenu = document.querySelector('#right-click-menu');
        this.selectionRect = document.querySelector('#active-selection-rectangle');
        //style panel
        this.styleTool = document.getElementById('style-tool');
        this.radioButtons = document.getElementsByName('radio-style');
        this.selecting = false;
        this.selectedList = [];
        this.slinky_string = '//MUST BE IN PREVIEW MODE FOR INTERACTIVE\n' +
            'let x = 300;\n' +
            'let y = 200;\n' +
            'let radius = 20;\n' +
            'let circle = new Ellipse(300,200, radius, radius);\n' +
            'circle.fill = \'none\';\n' +
            'let circles = [ circle ];\n' +
            'let d = 2;\n' +
            'let n = 500;\n' +
            'for( let i = 1; i < n; i++) {\n' +
            '    let prev = circles[ circles.length - 1 ];\n' +
            '    let circle = new Ellipse(x,y, radius, radius);\n' +
            '    circle.fill = \'none\';\n' +
            '    circle.stroke = \'#216821\';\n' +
            '    circle.update = function() {\n' +
            '        if( Math.hypot( circle.cy - prev.cy, circle.cx - prev.cx ) >= d-1) {\n' +
            '            let angle = Math.atan2( circle.cy - prev.cy, circle.cx - prev.cx );\n' +
            '            circle.cx = prev.cx + (d-0.5)*Math.cos(angle);\n' +
            '            circle.cy = prev.cy + (d-0.5)*Math.sin(angle);\n' +
            '        }\n' +
            '    };\n' +
            '    circle.addDependency(prev);\n' +
            '    circles.push(circle);\n' +
            '}\n' +
            'let control = new Control(x,y);\n' +
            'control.onchange = function() {\n' +
            '    control.updateDependents();\n' +
            '};\n' +
            'circle.addDependency(control);\n' +
            'circle.update = function() {\n' +
            '    circle.cx = control.x;\n' +
            '    circle.cy = control.y;\n' +
            '};';
        this.ripple_string = '//MUST BE IN PREVIEW MODE FOR INTERACTIVE\n' +
            'let animate = false;//set to true for animation\n' +
            '//-------------------------------------------------\n' +
            'let x = 300;\n' +
            'let y = 300;\n' +
            'let control = new Control(x,y);\n' +
            'control.onchange = function() {\n' +
            '    control.updateDependents();\n' +
            '};\n' +
            'let radius = 20;\n' +
            'let circle = new Ellipse(x,y, radius, radius);\n' +
            'circle.fill = \'none\';\n' +
            'circle.addDependency(control);\n' +
            'circle.update = function() {\n' +
            '    circle.cx = control.x;\n' +
            '    circle.cy = control.y;\n' +
            '};\n' +
            'let circles = [ circle ];\n' +
            'let d = 2;\n' +
            'let n = 350;\n' +
            'for( let i = 1; i < n; i++) {\n' +
            '    let prev = circles[ circles.length - 1 ];\n' +
            '    let circle = new Ellipse(x,y, radius+d*i, radius+d*i);\n' +
            '    circle.fill = \'none\';\n' +
            '    circle.update = function() {\n' +
            '        if( Math.hypot( circle.cy - prev.cy, circle.cx - prev.cx ) >= d-1) {\n' +
            '            let angle = Math.atan2( circle.cy - prev.cy, circle.cx - prev.cx );\n' +
            '            circle.cx = prev.cx + (d-0.5)*Math.cos(angle);\n' +
            '            circle.cy = prev.cy + (d-0.5)*Math.sin(angle);\n' +
            '        }\n' +
            '    };\n' +
            '    circle.addDependency(prev);\n' +
            '    circles.push(circle);\n' +
            '}\n' +
            'var start = null;\n' +
            'var toggle = false;\n' +
            'if(animate){\n' +
            '    function step(timestamp) {\n' +
            '        if(control.x >= 600){\n' +
            '            toggle = false;\n' +
            '        }\n' +
            '        if(control.x <= 0){\n' +
            '            toggle = true;\n' +
            '        }\n' +
            '        // initialize start time\n' +
            '        if (!start) start = timestamp;\n' +
            '        if(toggle){\n' +
            '            control.x++;\n' +
            '        }\n' +
            '        else{\n' +
            '            control.x--;\n' +
            '        }\n' +
            '        control.y = y + 50*Math.sin(-(timestamp-start)/500);\n' +
            '        control.updateDependents();\n' +
            '        window.requestAnimationFrame(step);\n' +
            '    }\n' +
            '    window.requestAnimationFrame(step);\n' +
            '}\n';
        this.planet_orbit_string = '// Orbit variables\n' +
            'let x = 290;\n' +
            'let y = 300;\n' +
            'let radius = 200;\n' +
            'let angle = 0;\n' +
            '//earths orbit line\n' +
            'let orbit = new Ellipse(x,y,200,200);\n' +
            'orbit.fill = \'#ffffff00\';\n' +
            '//moons orbit line\n' +
            'let moonOrbit = new Ellipse(x,y-50,50,50);\n' +
            'moonOrbit.fill = \'#ffffff00\';\n' +
            '//sun\n' +
            'let sun = new Ellipse(x,y,50,50);\n' +
            'sun.fill = \'#ffae00ff\';\n' +
            'sun.stroke = sun.fill;\n' +
            '// Planets\n' +
            'let earth = new Ellipse( x, y-50, 25, 25);\n' +
            'earth.fill = \'#00ff26\';\n' +
            'earth.stroke = \'#00ff26\';\n' +
            'let moon = new Ellipse( x+radius, y, 10, 10);\n' +
            'moon.stroke = moon.fill;\n' +
            '//define update functions\n' +
            'earth.update = function() {\n' +
            '    earth.cx = x + radius*Math.cos(angle);\n' +
            '    earth.cy = y + radius*Math.sin(angle);\n' +
            '};\n' +
            'moon.update = function() {\n' +
            '    moon.cx = earth.cx + 50*Math.cos(-angle/2);\n' +
            '    moon.cy = earth.cy + 50*Math.sin(-angle/2);\n' +
            '};\n' +
            'moonOrbit.update = function(){\n' +
            '    moonOrbit.cx = x + radius*Math.cos(angle);\n' +
            '    moonOrbit.cy = y + radius*Math.sin(angle);\n' +
            '};\n' +
            '//add dependencies\n' +
            'moon.addDependency(earth);\n' +
            'moonOrbit.addDependency(moon);\n' +
            'var start = null;\n' +
            '// Animate this interactive by changing the angle and then updating elements\n' +
            'function step(timestamp) {\n' +
            '    // initialize start time\n' +
            '    if (!start) start = timestamp;\n' +
            '    angle = -2*Math.PI*(timestamp - start)/(10000);\n' +
            '    // update the y position of the rectangle\n' +
            '    earth.update();\n' +
            '    earth.updateDependents();\n' +
            '    // set up the next animation frame\n' +
            '    window.requestAnimationFrame(step);\n' +
            '}\n' +
            '// Start the animation cycle\n' +
            'window.requestAnimationFrame(step);\n';
        // Store a local instance of this for binding events. This may seem very
        // weird, but it is because this gets re-bound in the event listener
        // function to the object that the listener is being registered to.
        let view = this;
        // When the user clicks the run button, dispatch a custom run event
        this.runButton.onclick = function () {
            window.dispatchEvent(new CustomEvent('run'));
        };
        // Whenever a user clicks a tool, fire a "tool" event to update active tool
        for (let i = 0; i < view.tools.children.length - 2; i++) {
            let tool = view.tools.children[i];
            tool.addEventListener('click', function (event) {
                if (view.activeTools) {
                    view.activeTool.classList.remove('active');
                    this.classList.add('active');
                    view.activeTool = this;
                    window.dispatchEvent(new CustomEvent('tool', { detail: this.id }));
                }
            });
        }
        // Whenever a user selects a menu heading, toggle the contents of the menu
        let menus = document.getElementsByClassName('menu-title');
        for (let i = 0; i < menus.length; i++) {
            let menu = menus[i];
            // Toggle the open menu
            menu.addEventListener('click', function (event) {
                let target = event.target;
                let menu = target.parentNode;
                view.toggleMenu(menu);
            });
            // Show the menu if it is different from the current open menu
            menu.addEventListener('mouseover', function (event) {
                if (view.activeMenu != null) {
                    let target = event.target;
                    let menu = target.parentNode;
                    view.showMenu(menu);
                }
            });
        }
        // If the contents of a menu are actively displaying and the user selects
        // somewhere else in the document, hide the contents.
        document.addEventListener('click', function (event) {
            let target = event.target;
            if (!target.classList.contains('menu-title') && view.activeMenu != null) {
                view.hideMenu(view.activeMenu);
                event.preventDefault();
            }
        });
        // Whenever a user selects a menu item, fire a "menu" event
        let menuItems = document.querySelectorAll('.menu-item, .footer-item, .right-click-item');
        for (let i = 0; i < menuItems.length; i++) {
            let item = menuItems[i];
            item.addEventListener('click', function () {
                window.dispatchEvent(new CustomEvent('menu', { detail: this.id }));
                if (this.classList.contains('right-click-item')) {
                    view.hideRightClickMenu();
                }
            });
        }
        // Allow the editor to be resized
        view.dividerHandle.addEventListener('mousedown', function (event) {
            view.resize = true;
            view.editor.style.cursor = 'ew-resize';
        });
        // Resize the editor
        document.addEventListener('mousemove', function (event) {
            if (view.resize) {
                let x = event.clientX - 36;
                if (x < 0) {
                    x = 0;
                }
                view.editor.style.gridTemplateColumns = '36px ' + x + 'px 1px auto';
            }
        });
        // Stop resizing the editor
        document.addEventListener('mouseup', function (event) {
            view.resize = false;
            view.editor.style.cursor = '';
        });
        // Opens and closes the side panel when the user clicks the circle tab
        view.circle.addEventListener('click', function () {
            if (view.openPanel) {
                view.changeFill = false;
                view.changeStroke = false;
                view.closeStyleMenu();
            }
            else {
                view.openStyleMenu();
            }
        });
        document.getElementsByName('radio-style').forEach(element => {
            element.addEventListener('change', function () {
                let type = element.getAttribute('value');
                if (!view.selecting) {
                    if (type == 'radio-fill') {
                        view.changeFill = true;
                        view.hookFill();
                        view.changeStroke = false;
                    }
                    else {
                        view.changeStroke = true;
                        view.hookStroke();
                        view.changeFill = false;
                    }
                }
                else {
                    if (type == 'radio-fill') {
                        view.hookSelectFill();
                    }
                    else {
                        view.hookSelectStroke();
                    }
                }
            });
        });
        this.styleTool.addEventListener('click', function () {
            if (!view.openPanel) {
                view.openStyleMenu();
            }
            else {
                view.closeStyleMenu();
                view.changeFill = false;
                view.changeStroke = false;
            }
        });
        document.getElementById('orbit-example').addEventListener('click', function () {
            view.textEditor.editor.session.setValue(view.planet_orbit_string);
        });
        document.getElementById('slinky-example').addEventListener('click', function () {
            view.textEditor.editor.session.setValue(view.slinky_string);
        });
        document.getElementById('ripple-example').addEventListener('click', function () {
            view.textEditor.editor.session.setValue(view.ripple_string);
        });
        // Get the <span> elements that closes the modal
        let spans = document.getElementsByClassName("close");
        for (let i = 0; i < spans.length; i++) {
            spans[i].addEventListener('click', function (event) {
                let modal = this.parentNode.parentNode;
                modal.hidden = true;
            });
        }
        // Create a color picker using the selector
        this.colorPicker = AColorPicker.from('#color-picker', { showAlpha: true, useAlphaInPalette: true })[0];
        //AColorPicker.parseColor("red", "hex");
    }
    disableTools() {
        this.activeTools = false;
        this.toolsContainer.style.opacity = '.5';
    }
    enableTools() {
        this.activeTools = true;
        this.toolsContainer.style.opacity = '';
    }
    /**
    * Toggles the menu container to be open or closed. If the container is open
    * this function closes the menu, otherwise it opens the menu.
    */
    toggleMenu(menu) {
        let contents = menu.children[1];
        if (contents.hidden) {
            this.showMenu(menu);
        }
        else {
            this.hideMenu(menu);
        }
    }
    /**
    * Shows the menu container if it is not already displayed.
    */
    showMenu(menu) {
        if (this.activeMenu != null) {
            this.hideMenu(this.activeMenu);
        }
        let title = menu.children[0];
        let contents = menu.children[1];
        title.style.background = 'rgb(90	140	255)';
        contents.hidden = false;
        this.activeMenu = menu;
    }
    /**
    * Hides the menu container.
    */
    hideMenu(menu) {
        let title = menu.children[0];
        let contents = menu.children[1];
        title.style.background = '';
        contents.hidden = true;
        this.activeMenu = null;
    }
    /**
    * Shows the settings modal.
    */
    showSettings() {
        this.settingsModal.hidden = false;
        this.activeModal = this.settingsModal;
    }
    /**
    * Shows the search modal.
    */
    showSearch() {
        this.searchModal.hidden = false;
        this.activeModal = this.searchModal;
    }
    hideSelectionRect() {
        this.selectionRect.hidden = true;
    }
    /**
    * Hides the right click menu.
    */
    hideRightClickMenu() {
        this.rightClickMenu.hidden = true;
    }
    hookSelectFill() {
        var radios = document.getElementsByName('radio-style');
        for (var i = 0, length = radios.length; i < length; i++) {
            let c = radios[i];
            if (c.value == 'radio-fill') {
                this.changeFill = c.checked;
            }
            else {
                this.changeStroke = c.checked;
            }
        }
        this.colorPicker.off("change");
        this.colorPicker.on("change", (picker, color) => {
            for (var i = 0; i < this.selectedList.length; i++) {
                this.selectedList[i].style.fill = AColorPicker.parseColor(color, "hexcss4");
            }
        });
    }
    hookSelectStroke() {
        var radios = document.getElementsByName('radio-style');
        for (var i = 0, length = radios.length; i < length; i++) {
            let c = radios[i];
            if (c.value == 'radio-fill') {
                this.changeFill = c.checked;
            }
            else {
                this.changeStroke = c.checked;
            }
        }
        this.colorPicker.off("change");
        this.colorPicker.on("change", (picker, color) => {
            for (var i = 0; i < this.selectedList.length; i++) {
                this.selectedList[i].style.stroke = AColorPicker.parseColor(color, "hexcss4");
            }
        });
    }
    hookFill() {
        this.changeFill = true;
        this.changeStroke = false;
        this.colorPicker.off("change");
        this.colorPicker.on("change", (picker, color) => {
            SVG.fillHex = AColorPicker.parseColor(color, "hexcss4");
            this.fillToolRect.style.fill = SVG.fillHex;
            this.fillToolRect.style.stroke = SVG.fillHex;
        });
    }
    hookStroke() {
        this.changeStroke = true;
        this.changeFill = false;
        this.colorPicker.off("change");
        this.colorPicker.on("change", (picker, color) => {
            SVG.strokeHex = AColorPicker.parseColor(color, "hexcss4");
            this.strokeToolRect.style.fill = SVG.strokeHex;
            this.strokeToolRect.style.stroke = SVG.strokeHex;
        });
    }
    openStyleMenu() {
        var radios = document.getElementsByName('radio-style');
        let c = radios[0];
        if (this.selecting) {
            if (c.value == 'radio-fill') {
                if (c.checked) {
                    this.hookSelectFill();
                }
                else {
                    this.hookSelectStroke();
                }
            }
            else {
                if (c.checked) {
                    this.hookSelectStroke();
                }
                else {
                    this.hookSelectFill();
                }
            }
        }
        else {
            if (c.value == 'radio-fill') {
                if (c.checked) {
                    this.hookFill();
                }
                else {
                    this.hookStroke();
                }
            }
            else {
                if (c.checked) {
                    this.hookStroke();
                }
                else {
                    this.hookFill();
                }
            }
        }
        let view = this;
        view.sidePanelContainer.classList.add('open');
        view.openPanel = true;
        view.sidePanel.hidden = false;
        document.getElementById('tab-arrow').setAttribute('transform', '');
    }
    closeStyleMenu() {
        if (this.selecting) {
            console.log("close with selected");
        }
        let view = this;
        view.sidePanelContainer.classList.remove('open');
        view.openPanel = false;
        view.sidePanel.hidden = true;
        document.getElementById('tab-arrow').setAttribute('transform', 'rotate(180 15 25)');
    }
    /**
    * Shows the right click menu.
    */
    showRightClickMenu(x, y) {
        this.rightClickMenu.style.left = x.toString() + 'px';
        this.rightClickMenu.style.top = y.toString() + 'px';
        this.rightClickMenu.hidden = false;
    }
}
//# sourceMappingURL=view.js.map