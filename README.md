# Interactive SVG

Interactive SVG is a Javascript Library written in Typescript for creating Interactive Visuals in the browser. Visit the website for a sandbox editor, examples, and more. Consult the API for programmatic usage.

- [Website](.)
- [API](.)

## Test

<link rel="stylesheet" href="https://unpkg.com/@interactive-svg/library/dist/library.css">

<div id="my-id"></div>

<script type="module">
import Interactive from "https://unpkg.com/@interactive-svg/library/dist/Interactive.js";
let interactive = new Interactive("my-id");
let control = interactive.control(100,100);
</script>
