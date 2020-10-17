import {saveAs} from './save-as'

/**
 * A class of static utility functions for managing client-side
 */
export class File {

  /**
  * Returns the filename portion of a file path.
  */
  static parseName( path:string, trimExtension = true ) : string {
    let start = path.lastIndexOf("/") + 1;
    let end = trimExtension ? path.lastIndexOf(".") : path.length;
    return path.substr(start, end - start);
  }

  /**
  * Returns the current script name.
  */
  static getScriptName( trimExtension = true ) : string {

    // Variables
    let error = new Error();
    let source: any[] | RegExpExecArray;
    let lastStackFrameRegex = new RegExp(/.+\/(.*?):\d+(:\d+)*$/)
    let currentStackFrameRegex = new RegExp(/getScriptName \(.+\/(.*):\d+:\d+\)/);

    // Get the script name
    let name;
    if((source = lastStackFrameRegex.exec(error.stack.trim())) && source[1] != "") {
      name = source[1];
    } else if ((source = currentStackFrameRegex.exec(error.stack.trim()))) {
      name = source[1];
    } else if ( name = File.parseName(error.stack.trim(), trimExtension)) {
      return name;
    } else {
      return error.message;
    }

    // Return name
    if( trimExtension) {
      let position = name.lastIndexOf(".");
      return name.substr(0, position);
    } else {
      return name;
    }
  }

  /**
  * Downloads the current drawing as an svg file.
  */
  static download( id:string, filename:String ) : Promise<any> {

    return File.getURL('../style/vector.css').then((response) => {
      // Add the styling into the css document
      let svg = document.getElementById(id);
      let style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
      style.type = "text/css";
      style.innerHTML = response.toString();
      svg.appendChild(style);
      File.saveSVG( filename, (svg as HTMLElement).outerHTML);
      style.remove();
    });


    // svg.appendChild(style);
    // best piece of code i have written in 2019
    // style.remove();
  }

  static processRule(rule) {
    let result = "";
    for( let key of rule.styleMap ) {
      console.log(key);
    }
    return result;
  }

  static saveSVG( filename, data:string) {
    let blob = new Blob([data], {type: 'image/svg+xml'});
    saveAs(blob, filename, {});
  }

  /**
  * Returns a promise containing the response object.
  */
  static getURL( url:string ) : Promise<string> {
    // Return a new promise.
    return new Promise(function(resolve, reject) {
      // Do the usual XHR stuff
      var req = new XMLHttpRequest();
      req.open('GET', url);
      req.onload = function() {
        // This is called even on 404 etc so check the status
        if (req.status == 200) {
          // Resolve the promise with the response text
          resolve(req.response);
        }
        else {
          // Otherwise reject with the status text
          // which will hopefully be a meaningful error
          reject(Error(req.statusText));
        }
      };

      // Handle network errors
      req.onerror = function() {
        reject(Error("Network Error"));
      };

      // Make the request
      req.send();
    });
  }

  /**
  * Gets the URL parameters of the current session.
  */
  static getUrlParams( str:string ) : Map<string, string> {
      let hashes = str.slice(str.indexOf('?') + 1).split('&')
      let params = new Map<string, string>();
      for( let h of hashes ) {
        let value = h.split('=');
        params.set(value[0], value[1]);
      }

      return params
  }

  // TODO: this is unfinished
  static setUrlParams( param:string, value:string) {
    let url = new URL( window.location.href );
    let params = new URLSearchParams( url.search.slice(1));
    params.set(param, value);
    alert(url.href);
    // window.location.href = url.href;
    window.open( url.href);
  }

  /**
  * Loads the interactive script at the provided url into the provided HTMLElement.
  */
  static async loadScript( url:string, element:HTMLElement ) {
    const response = await File.getURL(url);
    let div = document.createElement('div');
    div.id = File.parseName(url);
    let script = document.createElement('script');
    script.type = 'module';
    script.src = url;
    element.appendChild(div);
    element.appendChild(script);
    return response;
  }

}
