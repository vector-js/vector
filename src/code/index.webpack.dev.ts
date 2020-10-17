import { SVGOverflowTemplate } from "./templates/svg-overflow";
import { SVGResponsiveTemplate } from "./templates/svg-responsive";
import { File } from "./index";
import '../styles/sandbox.css';

let body = document.getElementsByTagName("body")[0];

let count = 0;
function createContainer() {
    let container = document.createElement('div');
    container.id = `container-${count++}`;
    container.style.marginBottom = '1.5rem';
    return container;
}

let alignment = [
    'left',
    // 'center',
    // 'right'
]

for( let i = 0; i < alignment.length; i++) {
    let svg = new SVGOverflowTemplate(432, 288, {align:alignment[i]});
    svg.root.style.overflow = 'visible';
    let container = createContainer();
    container.style.overflow = 'hidden';
    container.style.maxWidth = '720px';
    container.style.display = 'block';
    container.style.margin = '0 auto 1.5rem auto';
    container.style.border = '1px solid grey';
    body.appendChild(container).appendChild(svg.root);
    svg.drawGrid();
}

// Multiples of 16*9 to make for better scaling
let sizes = [
    1*144, // 144
    2*144, // 288
    3*144, // 432
    4*144, // 576
]

let aspectRatios = {
    '3:1':{width: 3, height:1},
    '2:1':{width: 2, height:1},
    '16:9':{width:16, height:9},
    '4:3':{width: 4, height:3},
    '1:1':{width: 1, height:1},
};

for( let i = 0; i < sizes.length; i++) {
    let width = sizes[i];
    for( let r in aspectRatios) {
        let aspectRatio = aspectRatios[r];
        let height = width/aspectRatio.width*aspectRatio.height;
        let svg = new SVGResponsiveTemplate(width, height, {maxWidth:width, origin:'center'});
        body.appendChild(createContainer()).appendChild(svg.root);
        svg.drawGrid(true, false);
    }
}
(window as any).download = File.download;

