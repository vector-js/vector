/**
* Returns the filename portion of a file path.
*/
export declare function parseName(path: string, trimExtension?: boolean): string;
/**
* Returns the current script name.
*/
export declare function getScriptName(trimExtension?: boolean): string;
/**
* Downloads the current drawing as an svg file.
*/
export declare function download(id: string, filename: String): void;
export declare function saveSVG(filename: any, data: any): void;
/**
* Returns a promise containing the response object.
*/
export declare function getURL(url: string): Promise<string>;
/**
* Gets the URL parameters of the current session.
*/
export declare function getUrlParams(str: string): Map<string, string>;
export declare function setUrlParams(param: string, value: string): void;
/**
* Loads the interactive script at the provided url into the provided HTMLElement.
*/
export declare function loadScript(url: string, element: HTMLElement): Promise<string>;
