---
title: Radio Control Element
id: radio-control-element
script: /examples/elements/radio-control-element.js
description: This interactive demonstrates the radio control element.
input: undefined
tags: [elements, input]
weight: undefined
draft: undefined
---

{{< highlight javascript >}}
/**
* @title Radio Control Element
* @description This interactive demonstrates the radio control element.
* @tags [elements, input]
*/
import Interactive from '../../Interactive.js';
import { getScriptName } from '../../Util.js';
let interactive = new Interactive(getScriptName());
interactive.width = 768;
interactive.height = 150;
interactive.root.style.border = "1px solid grey";
let radio = interactive.radioControl(["blue", "red", "green", "yellow"], 20, 20);
let ellipse = interactive.ellipse(400, 75, 50, 50);
ellipse.addDependency(radio);
ellipse.update = function () {
    ellipse.style.fill = radio.getCurrentValue();
};
ellipse.update();
//# sourceMappingURL=radio-control-element.js.map
{{</ highlight >}}

