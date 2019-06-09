import SVG from './SVG.js';
import Control from './elements/Control.js';
import Ellipse from './elements/Ellipse.js';
import Path from './elements/Path.js';
import Circle from './elements/Circle.js';
import Text from './elements/Text.js';
/**
* This class exposes the high level functionality of our library. Elements can
* created and related together.
*/
export default class Interactive {
    /**
    * Constructs a new interactive object within the HTML element corresponding
    * to the id. If no element is found throws an error.
    */
    constructor(id) {
        // internal variables
        this._width = 0;
        this._height = 0;
        this._originX = 0;
        this._originY = 0;
        // store a reference to the container element
        this.root = document.getElementById(id);
        this.root.classList.add('interactive');
        // create and append the svg elements
        this.svg = this.root.appendChild(SVG.SVG(id));
        this.background = this.svg.appendChild(SVG.Group());
        this.controls = this.svg.appendChild(SVG.Group());
        // default configuration
        this.width = 600;
        this.height = 300;
        this.window = true;
    }
    /**
    * Sets the width of this interactive area.
    */
    set width(value) {
        this._width = value;
        this.svg.setAttribute('width', value.toString());
    }
    /**
    * Returns the width of this interactive area.
    */
    get width() {
        return this._width;
    }
    /**
    * Sets the height of this interactive area.
    */
    set height(value) {
        this._height = value;
        this.svg.setAttribute('height', value.toString());
    }
    /**
    * Returns the height of this interactive area.
    */
    get height() {
        return this._height;
    }
    /**
    * Sets the x coordinate of the origin.
    */
    set originX(value) {
        this._originX = value;
        this.setViewBox(this.minX, this.minY, this.width, this.height);
    }
    /**
    * Returns the value of the x-coordinate of the origin.
    */
    get originX() {
        return this._originX;
    }
    /**
    * Sets the y coordinate of the origin.
    */
    set originY(value) {
        this._originY = value;
        this.setViewBox(this.minX, this.minY, this.width, this.height);
    }
    /**
    * Returns the value of the x-coordinate of the origin.
    */
    get originY() {
        return this._originY;
    }
    /**
    * If set to true, styles the interactive to float on top of the background.
    * This feature is good for interactives where elements can be dragged out of
    * the bounds of the container element.
    */
    set window(value) {
        if (value) {
            this.svg.classList.add('window');
        }
        else {
            this.svg.classList.remove('window');
        }
    }
    // TODO: yikes that didn't work as expected
    // set flipCoordinateSystem( value:boolean ) {
    //   if( value ) {
    //     this.svg.style.transform = 'scale(1,-1)';
    //   } else {
    //     this.svg.style.transform = '';
    //   }
    // }
    /**
    * Returns the minimum x-coordinate of this interactive.
    */
    get minX() {
        return this.originX - this.width;
    }
    /**
    * Returns the minimum y-coordinate of this interactive.
    */
    get minY() {
        return this.originY - this.height;
    }
    // TODO: look into css transform-origin
    setViewBox(minX, minY, width, height) {
        this.svg.setAttribute('viewBox', `${minX} ${minY} ${width} ${height}`);
    }
    path(d) {
        let path = new Path(d);
        this.background.appendChild(path.root);
        return path;
    }
    ellipse(cx, cy, rx, ry) {
        let ellipse = new Ellipse(cx, cy, rx, ry);
        this.background.appendChild(ellipse.root);
        return ellipse;
    }
    circle(cx, cy, r) {
        let circle = new Circle(cx, cy, r);
        this.background.appendChild(circle.root);
        return circle;
    }
    control(x, y) {
        let control = new Control(x, y);
        this.controls.appendChild(control.root);
        return control;
    }
    text(x, y, contents) {
        let text = new Text(x, y, contents);
        this.background.appendChild(text.root);
        return text;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJhY3RpdmUuanMiLCJzb3VyY2VSb290IjoiLi9zb3VyY2UvIiwic291cmNlcyI6WyJJbnRlcmFjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEdBQUcsTUFBTSxVQUFVLENBQUM7QUFDM0IsT0FBTyxPQUFPLE1BQU0sdUJBQXVCLENBQUM7QUFFNUMsT0FBTyxPQUFPLE1BQU0sdUJBQXVCLENBQUM7QUFDNUMsT0FBTyxJQUFJLE1BQU0sb0JBQW9CLENBQUM7QUFDdEMsT0FBTyxNQUFNLE1BQU0sc0JBQXNCLENBQUM7QUFDMUMsT0FBTyxJQUFJLE1BQU0sb0JBQW9CLENBQUM7QUFFdEM7OztFQUdFO0FBQ0YsTUFBTSxDQUFDLE9BQU8sT0FBTyxXQUFXO0lBNkI5Qjs7O01BR0U7SUFDRixZQUFhLEVBQVM7UUFWdEIscUJBQXFCO1FBQ2IsV0FBTSxHQUFVLENBQUMsQ0FBQztRQUNsQixZQUFPLEdBQVUsQ0FBQyxDQUFDO1FBQ25CLGFBQVEsR0FBVSxDQUFDLENBQUM7UUFDcEIsYUFBUSxHQUFVLENBQUMsQ0FBQztRQVExQiw2Q0FBNkM7UUFDN0MsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUV2QyxxQ0FBcUM7UUFDckMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVB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SUFBSSxDQUFDLENBQUM7UUFDdkMsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU1ZHIGZyb20gJy4vU1ZHLmpzJztcbmltcG9ydCBDb250cm9sIGZyb20gJy4vZWxlbWVudHMvQ29udHJvbC5qcyc7XG5pbXBvcnQgRWxlbWVudCBmcm9tICcuL2VsZW1lbnRzL0VsZW1lbnQuanMnO1xuaW1wb3J0IEVsbGlwc2UgZnJvbSAnLi9lbGVtZW50cy9FbGxpcHNlLmpzJztcbmltcG9ydCBQYXRoIGZyb20gJy4vZWxlbWVudHMvUGF0aC5qcyc7XG5pbXBvcnQgQ2lyY2xlIGZyb20gJy4vZWxlbWVudHMvQ2lyY2xlLmpzJztcbmltcG9ydCBUZXh0IGZyb20gJy4vZWxlbWVudHMvVGV4dC5qcyc7XG5cbi8qKlxuKiBUaGlzIGNsYXNzIGV4cG9zZXMgdGhlIGhpZ2ggbGV2ZWwgZnVuY3Rpb25hbGl0eSBvZiBvdXIgbGlicmFyeS4gRWxlbWVudHMgY2FuXG4qIGNyZWF0ZWQgYW5kIHJlbGF0ZWQgdG9nZXRoZXIuXG4qL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW50ZXJhY3RpdmUgIHtcblxuICAvKipcbiAgKiBUaGUgY29udGFpbmVyIGVsZW1lbnQgZm9yIHRoaXMgaW50ZXJhY3RpdmUuXG4gICovXG4gIHJvb3Q6SFRNTEVsZW1lbnQ7XG5cbiAgLyoqXG4gICogVGhlIG1haW4gc3ZnIHRoYXQgZWxlbWVudHMgYXJlIGNyZWF0ZWQgd2l0aGluXG4gICovXG4gIHN2ZzpTVkdFbGVtZW50O1xuXG4gIC8qKlxuICAqIFRoZSBjb250cm9scyBncm91cHMgc2l0cyBvbiB0b3Agb2YgdGhlIGJhY2tncm91bmQgZ3JvdXAgYW5kIGVuc3VyZXMgdGhhdFxuICAqIGNvbnRyb2wgZWxlbWVudHMgd2lsbCBhbHdheXMgdmlzdWFsbHkgYXBwZWFyIGFib3ZlIGJhY2tncm91bmQgZWxlbWVudHMuXG4gICovXG4gIHByaXZhdGUgY29udHJvbHM6U1ZHR0VsZW1lbnQ7XG5cbiAgLyoqXG4gICogVGhlIGJhY2tncm91bmQgaXMgd2hlcmUgZXZlcnl0aGluZyB0aGF0IGlzIG5vdCBhIHByaW1hcnkgY29udHJvbCBpcyBkcmF3bi5cbiAgKi9cbiAgcHJpdmF0ZSBiYWNrZ3JvdW5kOlNWR0dFbGVtZW50O1xuXG4gIC8vIGludGVybmFsIHZhcmlhYmxlc1xuICBwcml2YXRlIF93aWR0aDpudW1iZXIgPSAwO1xuICBwcml2YXRlIF9oZWlnaHQ6bnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfb3JpZ2luWDpudW1iZXIgPSAwO1xuICBwcml2YXRlIF9vcmlnaW5ZOm51bWJlciA9IDA7XG5cbiAgLyoqXG4gICogQ29uc3RydWN0cyBhIG5ldyBpbnRlcmFjdGl2ZSBvYmplY3Qgd2l0aGluIHRoZSBIVE1MIGVsZW1lbnQgY29ycmVzcG9uZGluZ1xuICAqIHRvIHRoZSBpZC4gSWYgbm8gZWxlbWVudCBpcyBmb3VuZCB0aHJvd3MgYW4gZXJyb3IuXG4gICovXG4gIGNvbnN0cnVjdG9yKCBpZDpzdHJpbmcgKSB7XG5cbiAgICAvLyBzdG9yZSBhIHJlZmVyZW5jZSB0byB0aGUgY29udGFpbmVyIGVsZW1lbnRcbiAgICB0aGlzLnJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgdGhpcy5yb290LmNsYXNzTGlzdC5hZGQoJ2ludGVyYWN0aXZlJyk7XG5cbiAgICAvLyBjcmVhdGUgYW5kIGFwcGVuZCB0aGUgc3ZnIGVsZW1lbnRzXG4gICAgdGhpcy5zdmcgPSB0aGlzLnJvb3QuYXBwZW5kQ2hpbGQoU1ZHLlNWRyhpZCkpO1xuICAgIHRoaXMuYmFja2dyb3VuZCA9IHRoaXMuc3ZnLmFwcGVuZENoaWxkKFNWRy5Hcm91cCgpKTtcbiAgICB0aGlzLmNvbnRyb2xzID0gdGhpcy5zdmcuYXBwZW5kQ2hpbGQoU1ZHLkdyb3VwKCkpO1xuXG4gICAgLy8gZGVmYXVsdCBjb25maWd1cmF0aW9uXG4gICAgdGhpcy53aWR0aCA9IDYwMDtcbiAgICB0aGlzLmhlaWdodCA9IDMwMDtcbiAgICB0aGlzLndpbmRvdyA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgKiBTZXRzIHRoZSB3aWR0aCBvZiB0aGlzIGludGVyYWN0aXZlIGFyZWEuXG4gICovXG4gIHNldCB3aWR0aCggdmFsdWU6bnVtYmVyICl7XG4gICAgdGhpcy5fd2lkdGggPSB2YWx1ZTtcbiAgICB0aGlzLnN2Zy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgdmFsdWUudG9TdHJpbmcoKSk7XG4gIH1cblxuICAvKipcbiAgKiBSZXR1cm5zIHRoZSB3aWR0aCBvZiB0aGlzIGludGVyYWN0aXZlIGFyZWEuXG4gICovXG4gIGdldCB3aWR0aCgpOm51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3dpZHRoO1xuICB9XG5cbiAgLyoqXG4gICogU2V0cyB0aGUgaGVpZ2h0IG9mIHRoaXMgaW50ZXJhY3RpdmUgYXJlYS5cbiAgKi9cbiAgc2V0IGhlaWdodCggdmFsdWU6bnVtYmVyICl7XG4gICAgdGhpcy5faGVpZ2h0ID0gdmFsdWU7XG4gICAgdGhpcy5zdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCB2YWx1ZS50b1N0cmluZygpKTtcbiAgfVxuXG4gIC8qKlxuICAqIFJldHVybnMgdGhlIGhlaWdodCBvZiB0aGlzIGludGVyYWN0aXZlIGFyZWEuXG4gICovXG4gIGdldCBoZWlnaHQoKTpudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9oZWlnaHQ7XG4gIH1cblxuICAvKipcbiAgKiBTZXRzIHRoZSB4IGNvb3JkaW5hdGUgb2YgdGhlIG9yaWdpbi5cbiAgKi9cbiAgc2V0IG9yaWdpblgoIHZhbHVlOm51bWJlcikge1xuICAgIHRoaXMuX29yaWdpblggPSB2YWx1ZTtcbiAgICB0aGlzLnNldFZpZXdCb3goIHRoaXMubWluWCwgdGhpcy5taW5ZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gIH1cblxuICAvKipcbiAgKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGUgeC1jb29yZGluYXRlIG9mIHRoZSBvcmlnaW4uXG4gICovXG4gIGdldCBvcmlnaW5YKCk6bnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fb3JpZ2luWDtcbiAgfVxuXG4gIC8qKlxuICAqIFNldHMgdGhlIHkgY29vcmRpbmF0ZSBvZiB0aGUgb3JpZ2luLlxuICAqL1xuICBzZXQgb3JpZ2luWSggdmFsdWU6bnVtYmVyKSB7XG4gICAgdGhpcy5fb3JpZ2luWSA9IHZhbHVlO1xuICAgIHRoaXMuc2V0Vmlld0JveCggdGhpcy5taW5YLCB0aGlzLm1pblksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgfVxuXG4gIC8qKlxuICAqIFJldHVybnMgdGhlIHZhbHVlIG9mIHRoZSB4LWNvb3JkaW5hdGUgb2YgdGhlIG9yaWdpbi5cbiAgKi9cbiAgZ2V0IG9yaWdpblkoKTpudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9vcmlnaW5ZO1xuICB9XG5cbiAgLyoqXG4gICogSWYgc2V0IHRvIHRydWUsIHN0eWxlcyB0aGUgaW50ZXJhY3RpdmUgdG8gZmxvYXQgb24gdG9wIG9mIHRoZSBiYWNrZ3JvdW5kLlxuICAqIFRoaXMgZmVhdHVyZSBpcyBnb29kIGZvciBpbnRlcmFjdGl2ZXMgd2hlcmUgZWxlbWVudHMgY2FuIGJlIGRyYWdnZWQgb3V0IG9mXG4gICogdGhlIGJvdW5kcyBvZiB0aGUgY29udGFpbmVyIGVsZW1lbnQuXG4gICovXG4gIHNldCB3aW5kb3coIHZhbHVlOmJvb2xlYW4gKSB7XG4gICAgaWYoIHZhbHVlICl7XG4gICAgICB0aGlzLnN2Zy5jbGFzc0xpc3QuYWRkKCd3aW5kb3cnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdmcuY2xhc3NMaXN0LnJlbW92ZSgnd2luZG93Jyk7XG4gICAgfVxuICB9XG5cbiAgLy8gVE9ETzogeWlrZXMgdGhhdCBkaWRuJ3Qgd29yayBhcyBleHBlY3RlZFxuICAvLyBzZXQgZmxpcENvb3JkaW5hdGVTeXN0ZW0oIHZhbHVlOmJvb2xlYW4gKSB7XG4gIC8vICAgaWYoIHZhbHVlICkge1xuICAvLyAgICAgdGhpcy5zdmcuc3R5bGUudHJhbnNmb3JtID0gJ3NjYWxlKDEsLTEpJztcbiAgLy8gICB9IGVsc2Uge1xuICAvLyAgICAgdGhpcy5zdmcuc3R5bGUudHJhbnNmb3JtID0gJyc7XG4gIC8vICAgfVxuICAvLyB9XG5cbiAgLyoqXG4gICogUmV0dXJucyB0aGUgbWluaW11bSB4LWNvb3JkaW5hdGUgb2YgdGhpcyBpbnRlcmFjdGl2ZS5cbiAgKi9cbiAgZ2V0IG1pblgoKSA6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMub3JpZ2luWCAtIHRoaXMud2lkdGg7XG4gIH1cblxuICAvKipcbiAgKiBSZXR1cm5zIHRoZSBtaW5pbXVtIHktY29vcmRpbmF0ZSBvZiB0aGlzIGludGVyYWN0aXZlLlxuICAqL1xuICBnZXQgbWluWSgpIDogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5vcmlnaW5ZIC0gdGhpcy5oZWlnaHQ7XG4gIH1cblxuICAvLyBUT0RPOiBsb29rIGludG8gY3NzIHRyYW5zZm9ybS1vcmlnaW5cbiAgc2V0Vmlld0JveCggbWluWDpudW1iZXIsIG1pblk6bnVtYmVyLCB3aWR0aDpudW1iZXIsIGhlaWdodDpudW1iZXIgKSB7XG4gICAgdGhpcy5zdmcuc2V0QXR0cmlidXRlKCd2aWV3Qm94JywgYCR7bWluWH0gJHttaW5ZfSAke3dpZHRofSAke2hlaWdodH1gKTtcbiAgfVxuXG4gIHBhdGgoIGQ6IHN0cmluZyApOiBQYXRoIHtcbiAgICBsZXQgcGF0aCA9IG5ldyBQYXRoKGQpO1xuICAgIHRoaXMuYmFja2dyb3VuZC5hcHBlbmRDaGlsZChwYXRoLnJvb3QpO1xuICAgIHJldHVybiBwYXRoO1xuICB9XG5cbiAgZWxsaXBzZSggY3g6bnVtYmVyLCBjeTpudW1iZXIsIHJ4Om51bWJlciwgcnk6bnVtYmVyKSA6IEVsbGlwc2Uge1xuICAgIGxldCBlbGxpcHNlID0gbmV3IEVsbGlwc2UoIGN4LCBjeSwgcngsIHJ5KTtcbiAgICB0aGlzLmJhY2tncm91bmQuYXBwZW5kQ2hpbGQoZWxsaXBzZS5yb290KTtcbiAgICByZXR1cm4gZWxsaXBzZTtcbiAgfVxuXG4gIGNpcmNsZSggY3g6bnVtYmVyLCBjeTpudW1iZXIsIHI6bnVtYmVyKSA6IENpcmNsZSB7XG4gICAgbGV0IGNpcmNsZSA9IG5ldyBDaXJjbGUoIGN4LCBjeSwgcik7XG4gICAgdGhpcy5iYWNrZ3JvdW5kLmFwcGVuZENoaWxkKGNpcmNsZS5yb290KTtcbiAgICByZXR1cm4gY2lyY2xlO1xuICB9XG5cbiAgY29udHJvbCggeDpudW1iZXIsIHk6bnVtYmVyICkgOiBDb250cm9sIHtcbiAgICBsZXQgY29udHJvbCA9IG5ldyBDb250cm9sKCB4LCB5KTtcbiAgICB0aGlzLmNvbnRyb2xzLmFwcGVuZENoaWxkKGNvbnRyb2wucm9vdCk7XG4gICAgcmV0dXJuIGNvbnRyb2w7XG4gIH1cblxuICB0ZXh0KCB4Om51bWJlciwgeTpudW1iZXIsIGNvbnRlbnRzOnN0cmluZyApIDogVGV4dCB7XG4gICAgbGV0IHRleHQgPSBuZXcgVGV4dCggeCwgeSwgY29udGVudHMpO1xuICAgIHRoaXMuYmFja2dyb3VuZC5hcHBlbmRDaGlsZCh0ZXh0LnJvb3QpO1xuICAgIHJldHVybiB0ZXh0O1xuICB9XG59XG4iXX0=