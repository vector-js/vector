import SVG from '../SVG.js';
import Slider from './Slider.js';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NydWJiZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zb3VyY2UvZWxlbWVudHMvU2NydWJiZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxHQUFHLE1BQU0sV0FBVyxDQUFDO0FBQzVCLE9BQU8sTUFBTSxNQUFNLGFBQWEsQ0FBQztBQUVqQyxNQUFNLENBQUMsT0FBTyxPQUFPLFFBQVMsU0FBUSxNQUFNO0lBNkIxQyx1SEFBdUg7SUFDdkgsd0RBQXdEO0lBQ3hELHFDQUFxQztJQUVyQzs7TUFFRTtJQUNGLFlBQWEsQ0FBUSxFQUFFLENBQVEsRUFBRSxRQUFlLEdBQUc7UUFDakQsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFaEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7UUFDbEIsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7UUFFbEIsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksVUFBVSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNoRCxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7UUFFbEMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxZQUFZLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLE1BQU0sSUFBSSxDQUFDO3NDQUNYLE1BQU0sR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxFQUFFLEdBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEVBQUUsR0FBQyxD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