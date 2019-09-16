import Editor from './editor';
import Element from './shapes/element';
import EllipseController from './tools/ellipse';
import PathController from './tools/path';
import RectangleController from './tools/rectangle';
import SelectController from './tools/select';
import TextController from './tools/text';
import PreviewController from './tools/preview';
import * as AColorPicker from '../node_modules/a-color-picker/dist/acolorpicker';
import SVG from "./shapes/svg";
import { saveAs } from 'file-saver';
export default class Controller {
    /**
    * Construct a new controller for this drawing application
    */
    constructor(view) {
        // Store the view
        this.view = view;
        this.selectedList = [];
        // Construct an instance of a text editor
        this.editor = new Editor('text-editor');
        this.view.textEditor = this.editor;
        // Store a local copy of this for registering events
        let controller = this;
        // Create controllers for tools
        this.ellipseController = new EllipseController(controller);
        this.pathController = new PathController(controller);
        this.rectangleController = new RectangleController(controller);
        this.selectController = new SelectController(controller);
        this.textController = new TextController();
        this.previewController = new PreviewController();
        // Keep track of the active tool control, set default to select
        this.toolController = this.selectController;
        // If there is a current svg document in local storage, load it
        let stored = localStorage.getItem('script');
        if (stored != null) {
            // TODO: load saved style too?
            this.editor.editor.setValue(stored, 1);
        }
        // Handle when use presses edit / preview toggle
        this.view.editPreviewToggle.onchange = function (event) {
            controller.handleEditPreviewToggle(event);
        };
        // Handle user keyboard input
        window.addEventListener('run', function (event) {
            controller.handleRun(event);
        });
        // Handle user keyboard input
        window.addEventListener('keydown', function (event) {
            controller.handleKeyDown(event);
        });
        // Handle user keyboard input
        window.addEventListener('keyup', function (event) {
            controller.handleKeyUp(event);
        });
        // Handle when a user selects a menu item.
        window.addEventListener('menu', function (event) {
            controller.handleMenu(event);
        });
        // Handle when a user selects a tool
        window.addEventListener('tool', function handleToolEvent(event) {
            controller.handleTool(event);
        });
        // handle when the mouse is released over the document
        window.addEventListener('mouseup', function handleMouseUp(event) {
            controller.toolController.handleMouseUp(event);
        });
        // handle when the user moves their mouse
        window.addEventListener('mousemove', function handleMouseMove(event) {
            controller.toolController.handleMouseMove(event);
        });
        // prevent the default behavior of two finger touch and wheel touch
        window.addEventListener('wheel', (e) => { e.preventDefault(); }, { passive: false });
        // handle when a user clicks the drawing area
        this.view.drawingArea.addEventListener('mousedown', function handleMouseDown(event) {
            // Ignore right click for now
            if (event.which != 3) {
                controller.toolController.handleMouseDown(event);
            }
            view.hideRightClickMenu();
        });
        // handle when a user clicks the drawing area
        this.view.drawingArea.addEventListener('click', function handleMouseClick(event) {
            // Ignore right click for now
            if (event.which != 3) {
                controller.toolController.handleMouseClick(event);
            }
            view.hideRightClickMenu();
        });
        // handle when a user wheel event over the drawing area
        view.drawingArea.addEventListener('wheel', function handleMouseWheel(event) {
        });
        // handle when the user opens a context menu (right click) on the drawing area
        view.drawingArea.addEventListener('contextmenu', function (event) {
            event.preventDefault();
            controller.handleContextMenu(event);
        }, false);
    }
    /**
    * Try and execute user defined code
    */
    loadListOfVars() {
        let regEx = /(let|const|var).*=\s*new/;
        let listOfVars = [];
        for (let i = 0; i < this.editor.editor.session.getLength(); i++) {
            let currLine = this.editor.editor.session.getLine(i);
            if (regEx.exec(currLine)) {
                listOfVars.push(currLine.split(" ")[1]);
            }
        }
        console.log(listOfVars);
        SVG.setNames(listOfVars);
    }
    execute(script) {
        this.selectController.deselectElements();
        // Remove all the elements from the root svg element
        let svg = document.getElementById('svg');
        while (svg.firstChild) {
            svg.removeChild(svg.firstChild);
        }
        this.loadListOfVars();
        SVG.clearCounter();
        // Blindly execute the users code
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval
        SVG.fillHex = '#aeaeae';
        SVG.strokeHex = '#000000';
        try {
            eval(script);
        }
        catch (e) {
            if (e instanceof SyntaxError) {
                alert('Syntax Error: ' + e.message);
            }
            else if (e instanceof EvalError) {
                alert('Evaluation Error: ' + e.message);
            }
            else {
                alert(e.message);
            }
        }
    }
    /**
    * Clears local storage and the current drawing.
    */
    reset() {
        localStorage.clear();
        this.editor.editor.setValue('', 1);
    }
    /**
    * Saves the current drawing to local storage
    */
    save() {
        localStorage.setItem('script', this.editor.getValue());
    }
    /**
    * Downloads the current drawing as an svg file.
    */
    download() {
        let svg = this.view.drawing.children[0].cloneNode(true);
        let styleSheet = document.styleSheets[1];
        let defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        let style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
        for (let i = 0; i < styleSheet.rules.length; i++) {
            let rule = styleSheet.rules[i];
            style.innerHTML += rule.cssText;
        }
        defs.appendChild(style);
        svg.appendChild(defs);
        let blob = new Blob([svg.outerHTML], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, 'example.svg');
    }
    handleRun(event) {
        this.execute(this.editor.getValue());
    }
    /**
    * Toggles the current perspective on the interactive between editing the
    * visual elements and interacting with the visual elements as the end user
    * would.
    */
    handleEditPreviewToggle(event) {
        if (this.view.editPreviewToggle.checked) {
            Element.disable = false;
            this.view.disableTools();
            this.tempController = this.toolController;
            this.toolController = this.previewController;
        }
        else {
            Element.disable = true;
            this.view.enableTools();
            this.toolController = this.tempController;
        }
    }
    handleKeyUp(event) {
        //shift key
        if (event.key == 'Shift') {
            this.toolController.shiftDown = false;
        }
        this.loadListOfVars();
    }
    handleStylingSelectedElements() {
        this.view.selectedList = this.selectedList;
        if (this.view.selecting) {
            this.view.hookSelectFill();
        }
        else {
            this.view.hookSelectStroke();
        }
    }
    clearViewSelection() {
        this.selectController.updateNamesUniqueList(this.view.selectedList);
        let printList = this.view.selectedList;
        let s = '';
        for (var i = 0; i < printList.length; i++) {
            s += printList[i].id + '.fill = \'' + AColorPicker.parseColor(printList[i].style.fill, "hexcss4") + '\';\n';
            s += printList[i].id + '.stroke = \'' + AColorPicker.parseColor(printList[i].style.stroke, "hexcss4") + '\';\n';
        }
        let range = 0;
        for (let i = this.editor.editor.session.getLength() - 1; i >= 0; i++) {
            if (this.editor.editor.session.getRowLength(i) != 0) {
                range = i + 1;
                break;
            }
        }
        this.editor.editor.session.insert({ row: range + i, column: 0 }, s);
        this.view.selectedList = [];
        this.view.closeStyleMenu();
    }
    /**
    * Handle user shortcuts and keystrokes
    */
    handleKeyDown(event) {
        // command and shiftkey pressed
        if (event.metaKey && event.shiftKey) {
            switch (event.key) {
                case 'p':
                    this.view.showSearch();
                    break;
                case 'f':
                default:
                    return;
            }
        }
        //shift key only
        else if (event.shiftKey) {
            this.toolController.shiftDown = true;
        }
        // command key only
        else if (event.metaKey) {
            switch (event.key) {
                // Executes user define code
                case 'b':
                    this.execute(this.editor.getValue());
                    event.preventDefault();
                    break;
                case 's':
                    this.save();
                    event.preventDefault();
                    break;
                case '=':
                    console.log('zoom in');
                    break;
                case '-':
                    console.log('zoom out');
                    break;
                case ',':
                    this.view.showSettings();
                    break;
                case 'y':
                    console.log('redo');
                    break;
                case 'z':
                    console.log('undo');
                    break;
                case 'x':
                    console.log('cut');
                    break;
                case 'c':
                    console.log('copy');
                    break;
                case 'v':
                    console.log('paste');
                    break;
                case 'v':
                    console.log('paste');
                    break;
                default:
                    return;
            }
        }
        // Prevent the default behavior for all shorcuts handled here
        // event.preventDefault();
    }
    /**
    * Handle when a user selects a menu item
    */
    handleMenu(event) {
        switch (event.detail) {
            case 'new':
                this.reset();
                break;
            case 'save':
                this.save();
                break;
            case 'download':
                this.download();
                break;
            case 'settings':
                this.view.showSettings();
                console.log('display settings');
                break;
            case 'undo':
                console.log('undo');
                break;
            case 'redo':
                console.log('redo');
                break;
            case 'search':
                this.view.showSearch();
                break;
            default:
                console.log('menu : ' + event.detail);
        }
    }
    handleTool(event) {
        this.clearViewSelection();
        switch (event.detail) {
            case 'circle':
                this.toolController = this.ellipseController;
                break;
            case 'path':
                this.toolController = this.pathController;
                break;
            case 'rectangle':
                this.toolController = this.rectangleController;
                break;
            //If either of these, then we do not want to clear the selectedList, so we return.
            case 'select-shape':
            case 'select-point':
                this.toolController = this.selectController;
                return;
            case 'text':
                this.toolController = this.textController;
                break;
            default:
                console.log('not implemented, switch controller to :' + event.detail);
                this.toolController = this.selectController;
        }
        this.selectController.deselectElements();
    }
    handleContextMenu(event) {
        let x = event.clientX;
        let y = event.clientY;
        this.view.showRightClickMenu(x, y);
        return false;
    }
}
//# sourceMappingURL=controller.js.map