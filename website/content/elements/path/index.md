---
title: Path
description: The path element is powerful and complex and deserves its own section. The path's shape is described by a series of commands and points. The command describes how the points should be used to draw the path.
properties:
  - name : d
    description : A series of commands that draw the path.
  - name : pathLength
    description : The length of the path.
shape: true
---

The path element is notorious for its power and difficulty. The path element has one attribute, the "d" attribute, which is a string containing a series of commands. Each command starts with a letter that describes the type of command followed by zero or more numbers separated by spaces.

{{< highlight svg>}}
<path d="..."></path>
{{< /highlight >}}

### Commands

| Name             | Syntax                                                |
| ---------------- | ----------------------------------------------------- |
| Move To          | `M x y`                                                 |
| Line             | `L x y`                                                 |
| Quadratic Bezier | `Q x1 y1 x2 y2`                                         |
| Cubic Bezier     | `C x1 y1 x2 y2 x3 y3`                                   |
| Arc              | `A rx ry x-axis-rotation large-arc-flag sweep-flag x y` |
| Close            | `Z`                                                     |

#### Path: Move To Command

Every path starts with a move command which describes where the path starts. A path can have multiple move to commands to start drawing the path elsewhere in the document.

#### Path: Line Command

{{< highlight svg>}}
<path d="L x y"></path>
{{< /highlight >}}

In the path below, the move command "M 150 150" begins the path at the coordinate (150, 150) and then the line command "L 450 50" draws a line to the coordinate (450, 50). Note, commands have the option to be absolute, represented with a capital letter, or relative, represented with a lowercase letter.

{{<example "svg-path-line">}}

#### Path: Quadratic Bezier Command

{{< highlight svg>}}
<path d="M x0 y0 Q x1 y1 x2 y2"></path>
{{< /highlight >}}

The quadratic bezier curve command draws a curve between two points: the current position of the path and the end point (x2, y2). The shape of the curve is described by the first position in the command (x1, y1). Mathematically the curve is a parameterized polynomial. <a href="https://pomax.github.io/bezierinfo/" target="_blank" rel="noreferrer">More info here</a>.

{{<example "svg-path-bezier-quadratic">}}

#### Path: Cubic Bezier Command

{{< highlight svg>}}
<path d="M x0 y0 C x1 y1 x2 y2 x3 y3"></path>
{{< /highlight >}}

The cubic bezier curve command is like the quadratic curve with an additional point to further control the shape of the curve.

{{<example "svg-path-bezier-cubic">}}

#### Path: Arc Command

{{< highlight svg>}}
<path d="M x0 y0 A rx ry x-axis-rotation large-arc-flag sweep-flag x y"></path>
{{< /highlight >}}

The arc command draws an arc between two points. The syntax of the command is "A rx ry x-axis-rotation large-arc-flag sweep-flag x y". The arc is drawn between the current position of the path and the end position (x,y). The numbers rx and ry define the shape of the ellipse which forms the arc. The x-axis rotation number controls what part of the ellipse's arc is being drawn between the points. The large arc flag determines whether to take the shorter arc or longer path between the two points. Finally, the sweep-flag chooses which of the two ellipsis that pass through the two points to draw.

{{<example "svg-path-arc">}}
