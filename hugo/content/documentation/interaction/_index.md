---
title: Interaction
weight: 3
icon: /mouse.svg
---

There are two primary forms of interaction within our system. The first is dependencies; elements can be related together using dependency functions, similar to how cells are related together in a spreadsheet application. These dependencies are explicit and give dependents access to the data of the elements they rely on. These dependencies also define how the interactive should update elements and in what order when an element's state is changed.

The second form of interaction is the more tradditional event and handler architecture common to the web. Besides being used heavily within the implementation of this system, events are very useful when creating interactives.
