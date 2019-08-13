---
title: Animate Along Path
description:
---

{{< highlight javascript>}}
let circle = interactive.circle( 75, 75, 20);
let path = interactive.path("...");

circle.animateAlongPath( path, true, SPEED);
{{< /highlight >}}

<img src="/images/trace-animation.svg" width="100%">
