import SVG from '../svg.js';
import Slider from './slider.js';
export default class Scrubber extends Slider {
    // TODO: When the scrubber control is grabbed, active should be set to false and the animation cycle should be stopped.
    // TODO: Reset done variable when the control is changed
    // TODO: Show darker line of progress
    /**
    *
    */
    constructor(x, y, width = 486) {
        super(x + 80, y, width - 80, 0);
        this.active = false;
        this.loop = false;
        this.done = false;
        let circleRadius = 16;
        let playCircle = SVG.Circle(0, 0, circleRadius);
        playCircle.style.fill = '#eeeeee';
        let radius = 8;
        let playTriangle = SVG.Path(` M ${radius} ${0}
                                  L ${radius * Math.cos(-2 * Math.PI / 3)} ${radius * Math.sin(-2 * Math.PI / 3)}
                                  L ${radius * Math.cos(-4 * Math.PI / 3)} ${radius * Math.sin(-4 * Math.PI / 3)}
                                  Z`);
        playTriangle.style.fill = '#333333';
        this.playButton = SVG.Group();
        this.playButton.appendChild(playCircle);
        this.playButton.appendChild(playTriangle);
        this.playButton.setAttribute('transform', `translate( ${x}, ${y})`);
        let pauseCircle = SVG.Circle(0, 0, circleRadius);
        pauseCircle.style.fill = '#eeeeee';
        // TODO: style the lines with rounded end points
        let pauseLines = SVG.Path(` M ${-3.5} ${-5}
                                L ${-3.5} ${5}
                                M ${3.5} ${-5}
                                L ${3.5} ${5}`);
        pauseLines.style.stroke = '#333333';
        pauseLines.style.strokeWidth = '2';
        pauseLines.style.strokeLinecap = 'round';
        this.pauseButton = SVG.Group();
        this.pauseButton.appendChild(pauseCircle);
        this.pauseButton.appendChild(pauseLines);
        this.pauseButton.setAttribute('transform', `translate( ${x + 42}, ${y})`);
        this.root.appendChild(this.playButton);
        this.root.appendChild(this.pauseButton);
        let scrubber = this;
        this.playButton.addEventListener('click', function () {
            scrubber.play();
        });
        this.pauseButton.addEventListener('click', function () {
            scrubber.pause();
        });
    }
    play() {
        if (!this.active) {
            let scrubber = this;
            scrubber.active = true;
            if (this.done) {
                this.value = this.min;
                this.done = false;
                // TODO: change this.done to true when the control is "scrubbed" to the end
            }
            let step = function (timestamp) {
                scrubber.value = (scrubber.value + .2);
                if (scrubber.value > scrubber.max && !scrubber.loop) {
                    scrubber.value = scrubber.max;
                    scrubber.pause();
                    // TODO: change play icon to reset icon
                    scrubber.done = true;
                }
                else {
                    scrubber.value = scrubber.value % scrubber.max;
                    scrubber.requestID = window.requestAnimationFrame(step);
                }
            };
            // start animating
            window.requestAnimationFrame(step);
        }
    }
    pause() {
        this.active = false;
        window.cancelAnimationFrame(this.requestID);
    }
}
//# sourceMappingURL=scrubber.js.map