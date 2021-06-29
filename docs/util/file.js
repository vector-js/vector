import { saveAs } from './save-as.js';
/**
* Returns the filename portion of a file path.
*/
export function parseName(path, trimExtension = true) {
    let start = path.lastIndexOf("/") + 1;
    let end = trimExtension ? path.lastIndexOf(".") : path.length;
    return path.substr(start, end - start);
}
/**
* Returns the current script name.
*/
export function getScriptName(trimExtension = true) {
    // Variables
    let error = new Error();
    let source;
    let lastStackFrameRegex = new RegExp(/.+\/(.*?):\d+(:\d+)*$/);
    let currentStackFrameRegex = new RegExp(/getScriptName \(.+\/(.*):\d+:\d+\)/);
    // Get the script name
    let name;
    if ((source = lastStackFrameRegex.exec(error.stack.trim())) && source[1] != "") {
        name = source[1];
    }
    else if ((source = currentStackFrameRegex.exec(error.stack.trim()))) {
        name = source[1];
    }
    else if (name = parseName(error.stack.trim(), trimExtension)) {
        return name;
    }
    else {
        return error.message;
    }
    // Return name
    if (trimExtension) {
        let position = name.lastIndexOf(".");
        return name.substr(0, position);
    }
    else {
        return name;
    }
}
/**
* Downloads the current drawing as an svg file.
*/
export function download(id, filename) {
    let svg = document.getElementById(id).firstChild;
    let styleSheet = null;
    for (let i = 0; i < document.styleSheets.length; i++) {
        // TODO: there is a better way to do this
        if (document.styleSheets[i].href != null && document.styleSheets[i].href.toLowerCase().includes("library.css")) {
            styleSheet = document.styleSheets[i];
            break;
        }
    }
    let style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
    style.type = "text/css";
    let css = "";
    for (let i = 0; i < styleSheet.rules.length; i++) {
        let rule = styleSheet.rules[i];
        css += rule.cssText + "\n";
    }
    style.innerHTML = css;
    svg.appendChild(style);
    // best piece of code i have written in 2019
    saveSVG(filename, svg.outerHTML);
    style.remove();
}
export function saveSVG(filename, data) {
    let blob = new Blob([data], { type: 'image/svg+xml' });
    saveAs(blob, filename, {});
}
/**
* Returns a promise containing the response object.
*/
export function getURL(url) {
    // Return a new promise.
    return new Promise(function (resolve, reject) {
        // Do the usual XHR stuff
        var req = new XMLHttpRequest();
        req.open('GET', url);
        req.onload = function () {
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
        req.onerror = function () {
            reject(Error("Network Error"));
        };
        // Make the request
        req.send();
    });
}
/**
* Gets the URL parameters of the current session.
*/
export function getUrlParams(str) {
    let hashes = str.slice(str.indexOf('?') + 1).split('&');
    let params = new Map();
    for (let h of hashes) {
        let value = h.split('=');
        params.set(value[0], value[1]);
    }
    return params;
}
// TODO: this is unfinished
export function setUrlParams(param, value) {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search.slice(1));
    params.set(param, value);
    alert(url.href);
    // window.location.href = url.href;
    window.open(url.href);
}
/**
* Loads the interactive script at the provided url into the provided HTMLElement.
*/
export async function loadScript(url, element) {
    const response = await getURL(url);
    let div = document.createElement('div');
    div.id = parseName(url);
    let script = document.createElement('script');
    script.type = 'module';
    script.src = url;
    element.appendChild(div);
    element.appendChild(script);
    return response;
}
//# sourceMappingURL=file.js.map