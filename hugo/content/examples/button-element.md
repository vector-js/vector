---
title: Button Element
id: button-element
script: /examples/elements/button-element.js
description: The button element is a user clickable button with some text inside of it.
input: undefined
tags: [elements, input]
weight: undefined
draft: undefined
---

{{< highlight javascript >}}
/**
* @title Button Element
* @description The button element is a user clickable button with some text inside of it.
* @tags [elements, input]
*/
import Interactive from '../../Interactive.js';
import { getScriptName } from '../../Util.js';
let interactive = new Interactive(getScriptName());
interactive.width = 768;
interactive.height = 150;
interactive.root.style.border = "1px solid grey";
let button = interactive.button(100, 75, "My Button");
// interactive.button( 250, 75, "a");
// interactive.button( 400, 75, "abcdefghijklmnopqrstuvwxyz");
//# sourceMappingURL=button-element.js.map
{{</ highlight >}}

