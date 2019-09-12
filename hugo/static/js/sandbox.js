import { getUrlParams, getURL, loadScript, parseName, download } from '/Util.js';
import { saveAs } from '/util/file.js';
import Element from '/elements/Element.js';

let id = 'hello-world';
let editor = ace.edit("editor");
// editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/javascript");
editor.session.setUseWrapMode(true);

// get the current url parameters and check if there is script defined
let params = getUrlParams(window.location.search);
if (params.has('script')) {

  let script = params.get('script');
  let element = document.getElementById("interactive-container");
  id = parseName(script);
  let text = loadScript( script, element).then(function(response){
    editor.setValue(response, 1);
  });
} else {
  console.log('no url parameter script.');
}

// TODO: add key board short cuts
// command + r : Run
// command + s : Save SVG Image

// TODO: add buttons / drop down menus

let container = document.getElementById('interactive-container');

document.getElementById('run').onclick = run;
document.getElementById('svg').onclick = svg;
document.getElementById('download').onclick = downloadScript;

function downloadScript() {
  let blob = new Blob([editor.getValue()], { type: 'text/javascript' });
  saveAs(blob, `${id}.js`, {});
}

function svg() {
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
    script.innerHTML = editor.getValue();
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

window.run = run;
