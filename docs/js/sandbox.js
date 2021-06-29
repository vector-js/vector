import { getUrlParams, getURL, loadScript, parseName, download } from '/util/file.js';
import { saveAs } from '/util/save-as.js';
import Element from '/elements/base-element.js';

// variables
let script;
let id;
let container;
let editor;

// initialize the sandbox
initialize();

// Register keyboard shortcuts
addKeyboardShortcut('R', run);
addKeyboardShortcut('J', downloadScript);
addKeyboardShortcut('S', downloadSVG);

// Register button events to handlers
document.getElementById('run').onclick = run;
document.getElementById('svg').onclick = downloadSVG;
document.getElementById('download').onclick = downloadScript;

/**
* Initializes the sandbox
*/
function initialize() {

  // initialize the ace editor
  editor = ace.edit("editor");
  // editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/javascript");
  editor.session.setUseWrapMode(true);

  // get the current url parameters and check if there is script defined
  let params = getUrlParams(window.location.search);
  if (params.has('script')) {

    script = params.get('script');
    container = document.getElementById("interactive-container");
    id = parseName(script);
    let text = getURL( script).then(function(response){
      editor.setValue(response, 1);
      run();
    });
  } else {
    console.log('no url parameter script.');
  }
}

/**
* Downloads the script in the text editor.
*/
function downloadScript() {
  let blob = new Blob([editor.getValue()], { type: 'text/javascript' });
  saveAs(blob, `${id}.js`, {});
}

/**
* Downloads the current state of the interactive as an SVG document.
*/
function downloadSVG() {
  download(id, `${id}.svg`);
}

/**
* Takes the script in the editor and executes it.
*/
function run() {

  // Remove all the elements from the interactive container
  while( container.firstChild) {
    container.removeChild(container.firstChild);
  }

  // Clear all the elements
  Element.clear( Element.disable);

  // Execute the user script
  try{
    let div = document.createElement('div');
    div.id = id;
    let script = document.createElement('script');
    script.type = 'module';
    let contents = editor.getValue();
    script.innerHTML = contents;
    if( contents.includes('export default') ) {
      script.innerHTML += `\nmain("${id}");`;
    }
    container.appendChild(div);
    container.appendChild(script);
  }
  catch(e){
    if(e instanceof SyntaxError){
      alert('Syntax Error: '+e.message);
    }
    else if (e instanceof EvalError){
      alert('Evaluation Error: '+e.message);
    }
    else{
      alert(e.message);
    }
  }
}

/**
* Adds a andler to a shortcut for the window.
*/
function addKeyboardShortcut(key, handler) {
  window.addEventListener('keydown', function(event){
    if( event.key == key) {
        handler();
    }
  });
}
