---
title: Animate Along Path
description:
---

{{< highlight javascript>}}
let circle = interactive.circle( 75, 75, 20);
let path = interactive.path("...");

circle.animateAlongPath( path, true, SPEED);
{{< /highlight >}}

<div style="border-radius:6px; border:1px solid #333333; width:100%; height:150px; background:#dddddd; margin-bottom:16px;"></div>
