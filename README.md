# Interactive SVG

Interactive SVG is a Javascript Library written in Typescript for creating Interactive Visuals in the browser. Visit [the website](.) for a sandbox editor, examples, and more.

<!-- TODO: link actual website -->

## Usage

Import the module in a Javascript file.

```js
import Interactive from "https://unpkg.com/@interactive-svg/library/dist/Interactive.js";
let interactive = new Interactive("my-id");
let control = interactive.control(100,100);
```

Then include the script in a html page.

```html
<link rel="stylesheet" href="https://unpkg.com/@interactive-svg/library/dist/library.css">
<div id="my-id"></div>
<script type="module" src="my-script.js"></script>
```

If you prefer, <a href="https://unpkg.com/@interactive-svg/library/library.tar.gz" download> download </a> and host the library yourself.
